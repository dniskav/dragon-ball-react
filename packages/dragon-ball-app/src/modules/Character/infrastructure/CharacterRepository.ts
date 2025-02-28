import { fetchCharacters, fetchCharacterById } from "./CharacterAPI";

export const CharacterRepository = {
  getAll: async () => {
    return fetchCharacters();
  },
  getById: async (id: number) => {
    return fetchCharacterById(id);
  },
};

