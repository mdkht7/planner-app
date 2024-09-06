import {Exercise} from "./exercise";

export interface Category {
  id: string;
  name: string;
  exercises: Exercise[];
}

