import { Animal, AnimalFilter, CustomSelectOption } from "../interfaces";
import { BaseService } from "./BaseService";

export class FarmService extends BaseService {
  public static getAnimals(params?: AnimalFilter): Promise<Array<Animal>> {
    return BaseService.getData<Animal>("/animals", params);
  }

  public static getAnimalSortOptions(): Promise<Array<CustomSelectOption>> {
    return BaseService.getData<CustomSelectOption>("/animal-sort-options");
  }

  public static getAnimalTypes(): Promise<Array<CustomSelectOption>> {
    return BaseService.getData<CustomSelectOption>("/animal-types");
  }
}
