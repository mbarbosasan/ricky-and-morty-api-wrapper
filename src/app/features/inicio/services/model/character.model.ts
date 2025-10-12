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

export type CharacterSearchMetadata = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type CharacterSearchResult = {
  info: CharacterSearchMetadata;
  results: Character[];
};

export type CharacterSearchResultWithFavorites = {
  info: CharacterSearchMetadata;
  results: Array<CharacterWithFavorite>;
};

export const CharactersSearchResultToView = (
  searchResult: CharacterSearchResult,
  favoriteCharacters: CharacterWithFavorite[],
): CharacterSearchResultWithFavorites => ({
  info: {
    ...searchResult.info,
    next: getPageNumber(searchResult.info, 'next'),
    prev: getPageNumber(searchResult.info, 'prev'),
  },
  results: searchResult.results.map((character) => ({
    ...character,
    favorite: favoriteCharacters.some((fav) => fav.name === character.name),
  })),
});

const getPageNumber = (infoObject: CharacterSearchMetadata, key: string): string | null => {
  if (!infoObject.next) return null;
  const [_, query] = infoObject.next.split('?');
  if (!query) return null;
  const queryObject = query.split('&').reduce(
    (acc, item) => {
      const [key, value] = item.split('=');
      return (acc = {
        ...acc,
        [key]: value,
      });
    },
    {} as { page: string; name: string },
  );
  return queryObject['page'] ? queryObject['page'] : null;
}; 
