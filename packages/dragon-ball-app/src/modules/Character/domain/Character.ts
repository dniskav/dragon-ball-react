import { Ki, Race, Gender, ImageURL } from "./CharacterVO";
import { TransformationVO } from "./TransformationVO";

export interface Planet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: ImageURL;
  deletedAt: string | null;
}

export interface Transformation {
  id: number;
  name: string;
  image: ImageURL;
  ki: Ki;
  deletedAt: string | null;
}

export interface Character {
  id: number;
  name: string;
  ki: Ki;
  maxKi: Ki;
  race: Race;
  gender: Gender;
  description: string;
  image: ImageURL;
  affiliation: string;
  deletedAt: string | null;
  originPlanet?: Planet;
  transformations?: TransformationVO[];
}