import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from 'src/app/shared/ui/button/button.component';
import { CharactersListComponent } from 'src/app/shared/ui/characters-list/characters-list.component';
import { EmptyStateComponent } from 'src/app/shared/ui/empty-state/empty-state.component';
import { CharacterWithFavorite } from '../inicio/services/model/character.model';
import { FavoriteCharactersService } from './services/favorite-characters.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CharactersListComponent, EmptyStateComponent, ButtonComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritosComponent {
  private readonly favoritesCharacterService = inject(FavoriteCharactersService);

  favoritesCharacter = toSignal(this.favoritesCharacterService.favoriteCharacters$, { initialValue: [] });

  removeFavorite(character: CharacterWithFavorite) {
    this.favoritesCharacterService.removeFavorite(character);
  }
}
