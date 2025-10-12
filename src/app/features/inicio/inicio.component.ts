import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, combineLatest, debounceTime, filter, first, map, of, switchMap, tap } from 'rxjs';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { FavoriteCharactersService } from '../favoritos/services/favorite-characters.service';
import { SearchResultComponent } from './search-result/search-result.component';
import { CharactersSearchResultToView } from './services/model/character.model';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [InputComponent, SearchResultComponent, ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly searchService = inject(SearchService);
  private readonly favoriteCharacterService = inject(FavoriteCharactersService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  search = this.fb.control('', [Validators.required]);
  page = new BehaviorSubject<string>('1');
  page$ = this.page.asObservable();

  searchResult = toSignal(
    combineLatest([this.search.valueChanges, this.page$]).pipe(
      filter(() => this.search.valid),
      debounceTime(500),
      switchMap(([name, page]) =>
        this.searchService.searchCharacters(name!, page).pipe(
          switchMap((characters) =>
            combineLatest([of(characters), this.favoriteCharacterService.favoriteCharacters$]).pipe(
              map(([characters, favorites]) => CharactersSearchResultToView(characters, favorites)),
            ),
          ),
          catchError((e) => {
            console.error(e);
            return of(null);
          }),
        ),
      ),
      tap(() => this.registerSearchOnQueryParams(this.search, this.page.value)),
    ),
    {
      initialValue: null,
    },
  );

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(first()).subscribe((query) => {
      this.search.setValue(query.get('name'));
      this.page.next(query.get('page') || '1');
    });
  }

  registerSearchOnQueryParams(form: FormControl, page: string) {
    this.router.navigate([], {
      queryParams: {
        name: form.value,
        page,
      },
    });
  }

  pageChanged(page: number) {
    this.page.next(page.toString());
  }
}
