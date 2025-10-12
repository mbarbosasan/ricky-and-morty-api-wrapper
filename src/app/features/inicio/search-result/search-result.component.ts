import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CharactersListComponent } from 'src/app/shared/ui/characters-list/characters-list.component';
import { EmptyStateComponent } from 'src/app/shared/ui/empty-state/empty-state.component';
import { FavoriteCharactersService } from '../../favoritos/services/favorite-characters.service';
import { CharacterSearchResultWithFavorites, CharacterWithFavorite } from '../services/model/character.model';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CharactersListComponent, EmptyStateComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent {
  private readonly favoriteCharacterService = inject(FavoriteCharactersService);
  result = input.required<CharacterSearchResultWithFavorites>();

  addFavorite(character: CharacterWithFavorite) {
    this.favoriteCharacterService.addFavorite(character);
  }

  removeFavorite(character: CharacterWithFavorite) {
    this.favoriteCharacterService.removeFavorite(character);
  }
}
