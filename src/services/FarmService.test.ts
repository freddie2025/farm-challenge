import api from "./api";
import MockAdapter from "axios-mock-adapter";
import { FarmService } from "./FarmService";
import { mockAnimals } from "../tests/mocks/Animal";
import { mockAnimalSortOptions, mockAnimalTypes } from "../tests/mocks";

describe("FarmService", () => {
  const mock: MockAdapter = new MockAdapter(api);

  afterEach(() => {
    mock.reset();
  });

  it("should fetch animals with filters", async () => {
    mock.onGet("/animals", { params: { name: "Cow" } }).reply(200, mockAnimals);

    const result = await FarmService.getAnimals({ name: "Cow" });

    expect(result).toEqual(mockAnimals);
    expect(mock.history.get[0].url).toBe("/animals");
    expect(mock.history.get[0].params).toEqual({ name: "Cow" });
  });

  it("should fetch animal sort options", async () => {
    mock.onGet("/animal-sort-options").reply(200, mockAnimalSortOptions);

    const result = await FarmService.getAnimalSortOptions();

    expect(result).toEqual(mockAnimalSortOptions);
    expect(mock.history.get[0].url).toBe("/animal-sort-options");
  });

  it("should fetch animal types", async () => {
    mock.onGet("/animal-types").reply(200, mockAnimalTypes);

    const result = await FarmService.getAnimalTypes();

    expect(result).toEqual(mockAnimalTypes);
    expect(mock.history.get[0].url).toBe("/animal-types");
  });

  it("should handle API errors gracefully", async () => {
    mock.onGet("/animals").reply(500, { message: "Internal Server Error" });

    await expect(FarmService.getAnimals()).rejects.toThrow(
      "Request failed with status code 500"
    );
  });
});
