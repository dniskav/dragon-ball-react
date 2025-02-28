import { CharacterResponse } from "../domain/CharacterTypes";

const URL = "https://dragonball-api.com/api/characters";

export const fetchCharacters = async (): Promise<CharacterResponse> => {
  const response = await fetch(`${URL}?limit=50`);
  return response.json();
};

export const fetchCharacterById = async (id: number): Promise<CharacterResponse> => {
  const response = await fetch(`${URL}/${id}`);
  return response.json();
};