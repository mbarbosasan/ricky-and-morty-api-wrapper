export type CharacterGenericObject = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'Unknown';
  species: string[];
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: CharacterGenericObject;
  location: CharacterGenericObject;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharacterWithFavorite = Character & {
  favorite: boolean;
};

export type CharacterSearchInfo = {
  count: number;
  pages: number;
  next: string;
  prev: null;
};

export type CharacterSearchResult = {
  info: CharacterSearchInfo;
  results: Character[];
};

export type CharacterSearchResultWithFavorites = {
  info: CharacterSearchInfo;
  results: Array<CharacterWithFavorite>;
};

export const CharactersSearchResultToView = (
  searchResult: CharacterSearchResult,
  favoriteCharacters: CharacterWithFavorite[],
): CharacterSearchResultWithFavorites => ({
  info: searchResult.info,
  results: searchResult.results.map((character) => ({
    ...character,
    favorite: favoriteCharacters.some((fav) => fav.name === character.name),
  })),
});
