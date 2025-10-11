import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CharacterWithFavorite } from '../../inicio/services/model/character.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteCharactersService {
  private readonly favoriteCharacters = new BehaviorSubject<CharacterWithFavorite[]>([]);

  favoriteCharacters$ = this.favoriteCharacters.asObservable();

  addFavorite(character: CharacterWithFavorite) {
    const alreadyExists = this.favoriteCharacters.value.some((fav) => fav.name === character.name);
    if (alreadyExists) return;
    this.favoriteCharacters.next([...this.favoriteCharacters.value, character]);
  }

  removeFavorite(character: CharacterWithFavorite) {
    const characterExists = this.favoriteCharacters.value.some((fav) => fav.name === character.name);
    if (!characterExists) return;
    this.favoriteCharacters.next([...this.favoriteCharacters.value, character]);
  }
}
