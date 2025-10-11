import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, debounceTime, filter, of, switchMap } from 'rxjs';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { SearchResultComponent } from './search-result/search-result.component';
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

  search = this.fb.control('', [Validators.required, Validators.minLength(3)]);

  searchResult = toSignal(
    this.search.valueChanges.pipe(
      filter(() => this.search.valid),
      debounceTime(500),
      switchMap((character) =>
        this.searchService.searchCharacters(character!).pipe(
          catchError((e) => {
            console.error(e);
            return of('');
          }),
        ),
      ),
    ),
  );

  ngOnInit(): void {
    this.search.valueChanges.subscribe(console.log);
  }
}
