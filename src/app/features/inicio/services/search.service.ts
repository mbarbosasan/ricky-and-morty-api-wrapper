import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly http = inject(HttpClient);

  constructor() {}

  searchCharacters(character: string) {
    return this.http.get(`${API_URL}/character`, {
      params: {
        name: character,
      },
    });
  }
}
