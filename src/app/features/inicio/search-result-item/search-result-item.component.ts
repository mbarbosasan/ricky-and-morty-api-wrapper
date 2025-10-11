import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CharacterWithFavorite } from '../services/model/character.model';

@Component({
  selector: 'app-search-result-item',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './search-result-item.component.html',
  styleUrl: './search-result-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultItemComponent {
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
