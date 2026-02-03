import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CharacterWithFavorite } from 'src/app/features/inicio/services/model/character.model';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
    selector: 'app-characters-list',
    imports: [CharacterCardComponent],
    templateUrl: './characters-list.component.html',
    styleUrl: './characters-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersListComponent {
  charactersList = input.required<CharacterWithFavorite[]>();
  addFavorite = output<CharacterWithFavorite>();
  removeFavorite = output<CharacterWithFavorite>();

  emitAddFavorite(character: CharacterWithFavorite) {
    this.addFavorite.emit(character);
  }

  emitRemoveFavorite(character: CharacterWithFavorite) {
    this.removeFavorite.emit(character);
  }
}
