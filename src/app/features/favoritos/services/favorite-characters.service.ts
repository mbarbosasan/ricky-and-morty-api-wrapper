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
    this.favoriteCharacters.next([
      ...this.favoriteCharacters.value,
      {
        ...character,
        favorite: true,
      },
    ]);
  }

  removeFavorite(character: CharacterWithFavorite) {
    this.favoriteCharacters.next(this.favoriteCharacters.value.filter((fav) => fav.name !== character.name));
  }
}
