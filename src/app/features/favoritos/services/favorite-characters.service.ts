import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CharacterWithFavorite } from '../../inicio/services/model/character.model';

@Injectable({
  providedIn: 'root',
})
export class FavoriteCharactersService {
  private readonly favoriteCharacters = new BehaviorSubject<CharacterWithFavorite[]>([]);
  private readonly sessionStorageKey = 'favoriteCharacters';

  favoriteCharacters$ = this.favoriteCharacters.asObservable();

  syncSessionStorage() {
    const favoriteCharactersSaved = JSON.parse(
      sessionStorage.getItem(this.sessionStorageKey) || '{}',
    ) as CharacterWithFavorite[];
    if (!Array.isArray(favoriteCharactersSaved)) return;

    this.favoriteCharacters.next([
      ...this.favoriteCharacters.value,
      ...favoriteCharactersSaved.filter(
        (character) => !this.favoriteCharacters.value.some((fav) => fav.name === character.name),
      ),
    ]);
  }

  addFavorite(character: CharacterWithFavorite) {
    const alreadyExists = this.favoriteCharacters.value.some((fav) => fav.name === character.name);
    if (alreadyExists) return;

    const newFavoriteCharacters = [
      ...this.favoriteCharacters.value,
      {
        ...character,
        favorite: true,
      },
    ];

    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(newFavoriteCharacters));

    this.favoriteCharacters.next(newFavoriteCharacters);
  }

  removeFavorite(character: CharacterWithFavorite) {
    const newFavoriteCharacters = this.favoriteCharacters.value.filter((fav) => fav.name !== character.name);

    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(newFavoriteCharacters));
    this.favoriteCharacters.next(newFavoriteCharacters);
  }
}
