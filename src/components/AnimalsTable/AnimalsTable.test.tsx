import api from "./../../services/api";
import MockAdapter from "axios-mock-adapter";
import { render, screen, waitFor } from "@testing-library/react";
import { AnimalsTable } from "./AnimalsTable";
import { mockAnimals } from "../../tests/mocks";

let mock: MockAdapter;

beforeEach(() => {
  mock = new MockAdapter(api);
});

afterEach(() => {
  mock.restore();
});

test("renders error alert when an error occurs", async () => {
  mock.onGet("/animals").reply(500, new Error("Network Error"));

  render(<AnimalsTable />);

  const alertElement = await screen.findByRole("alert");
  await waitFor(() => {
    expect(alertElement).toHaveTextContent(
      "Failed to fetch data, check console log for more details."
    );
  });
});

test("renders info alert when no animals are found", async () => {
  mock.onGet("/animals").reply(200, []);

  render(<AnimalsTable />);

  const infoAlert = await screen.findByRole("alert");
  await waitFor(() => {
    expect(infoAlert).toHaveTextContent("No animals found");
  });
});

test("matches snapshot", async () => {
  mock.onGet("/animals").reply(200, mockAnimals);

  const { asFragment } = render(<AnimalsTable />);

  for (const animal of mockAnimals) {
    const nameEl = await screen.findByText(animal.name);
    expect(nameEl).toBeInTheDocument();
  }

  expect(asFragment()).toMatchSnapshot();
});
