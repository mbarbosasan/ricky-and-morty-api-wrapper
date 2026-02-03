import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CharacterWithFavorite } from 'src/app/features/inicio/services/model/character.model';

@Component({
    selector: 'app-character-card',
    imports: [NgOptimizedImage],
    templateUrl: './character-card.component.html',
    styleUrl: './character-card.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterCardComponent {
  character = input.required<CharacterWithFavorite>();
  addFavorite = output<CharacterWithFavorite>();
  removeFavorite = output<CharacterWithFavorite>();

  emitAddFavorite(character: CharacterWithFavorite) {
    this.addFavorite.emit(character);
  }

  emitRemoveFavorite(character: CharacterWithFavorite) {
    this.removeFavorite.emit(character);
  }
}
