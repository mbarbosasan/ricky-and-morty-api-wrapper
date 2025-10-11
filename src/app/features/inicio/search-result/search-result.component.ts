import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { SearchEmptyStateComponent } from '../search-empty-state/search-empty-state.component';
import { SearchResultItemComponent } from '../search-result-item/search-result-item.component';
import { CharacterSearchResultWithFavorites, CharacterWithFavorite } from '../services/model/character.model';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [SearchEmptyStateComponent, SearchResultItemComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent {
  result = input.required<CharacterSearchResultWithFavorites | null>();
  addFavorite = output<CharacterWithFavorite>();
  removeFavorite = output<CharacterWithFavorite>();

  emitAddFavorite(character: CharacterWithFavorite) {
    this.addFavorite.emit(character);
  }

  emitRemoveFavorite(character: CharacterWithFavorite) {
    this.removeFavorite.emit(character);
  }
}
