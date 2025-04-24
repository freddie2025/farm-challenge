import { Animal, AnimalSortOptions, AnimalType } from "../interfaces";
import api from "./api";

class FarmService {
  private static getData = async <T extends object>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<Array<T>> => {
    console.log(
      "Fetching data from endpoint:",
      endpoint,
      "with params:",
      params
    );

    const response = await api.get<Array<T>>(endpoint, { params });

    console.log("Response data:", response.data);

    if (!response || response.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    return response.data;
  };

  public static getAnimals(
    name?: string,
    type?: string,
    order?: number
  ): Promise<Array<Animal>> {
    return this.getData<Animal>("/animals", { name, type, order });
  }

  public static getAnimalSortOptions(): Promise<Array<AnimalSortOptions>> {
    return this.getData<AnimalSortOptions>("/animal-sort-options");
  }

  public static getAnimalTypes(): Promise<Array<AnimalType>> {
    return this.getData<AnimalType>("/animal-types");
  }
}

export default FarmService;
