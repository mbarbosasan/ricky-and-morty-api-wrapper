import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from 'src/app/constants';
import { CharacterSearchResult } from './model/character.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly http = inject(HttpClient);

  constructor() {}

  searchCharacters(character: string) {
    return this.http.get<CharacterSearchResult>(`${API_URL}/character`, {
      params: {
        name: character,
      },
    });
  }
}
