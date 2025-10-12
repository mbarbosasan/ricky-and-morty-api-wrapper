import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, combineLatest, debounceTime, filter, first, map, of, switchMap, tap } from 'rxjs';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { FavoriteCharactersService } from '../favoritos/services/favorite-characters.service';
import { SearchResultComponent } from './search-result/search-result.component';
import {
  CharacterSearchResultWithFavorites,
  CharactersSearchResultToView,
  CharacterWithFavorite,
} from './services/model/character.model';
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

  searchResult = toSignal(
    this.search.valueChanges.pipe(
      filter(() => this.search.valid),
      debounceTime(500),
      switchMap((name) =>
        this.searchService.searchCharacters(name!).pipe(
          switchMap((characters) =>
            combineLatest([of(characters), this.favoriteCharacterService.favoriteCharacters$]).pipe(
              map(([characters, favorites]) => CharactersSearchResultToView(characters, favorites)),
            ),
          ),
          catchError((e) => {
            console.error(e);
            return of({} as CharacterSearchResultWithFavorites);
          }),
        ),
      ),
      tap(() => this.registerSearchOnQueryParams(this.search)),
    ),
    {
      initialValue: {} as CharacterSearchResultWithFavorites,
    },
  );

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(first()).subscribe((query) => {
      this.search.setValue(query.get('name'));
    });
  }

  registerSearchOnQueryParams(form: FormControl) {
    this.router.navigate([], {
      queryParams: {
        name: form.value,
      },
    });
  }

  removeFavorite(character: CharacterWithFavorite) {
    this.favoriteCharacterService.removeFavorite(character);
  }

  addFavorite(character: CharacterWithFavorite) {
    this.favoriteCharacterService.addFavorite(character);
  }
}
