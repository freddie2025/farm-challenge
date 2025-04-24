export interface Animal {
  _id: string;
  isAlive: boolean;
  worth: number;
  age: number;
  name: string;
  gender: "male" | "female";
  animalType: string;
}
