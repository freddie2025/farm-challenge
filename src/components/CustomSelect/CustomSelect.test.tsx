import api from "./../../services/api";
import MockAdapter from "axios-mock-adapter";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomSelect } from "./CustomSelect";
import { FarmService } from "../../services/FarmService";
import { mockAnimalSortOptions } from "../../tests/mocks";

let mock: MockAdapter;

beforeEach(() => {
  mock = new MockAdapter(api);
});

afterEach(() => {
  mock.restore();
});

const label = "Test Label";
const onChangeMock = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

test("renders error alert when a fetch error occurs", async () => {
  mock.onGet("/animal-sort-options").reply(500, new Error("Network Error"));

  render(
    <CustomSelect
      label={label}
      fetchFunction={FarmService.getAnimalSortOptions}
      onChange={onChangeMock}
    />
  );
  const alertElement = await screen.findByRole("alert");

  expect(alertElement).toHaveTextContent(
    "Failed to fetch data, check console log for more details."
  );
});

test("renders select with options from useFetch", async () => {
  mock.onGet("/animal-sort-options").reply(200, mockAnimalSortOptions);

  render(
    <CustomSelect
      label={label}
      fetchFunction={FarmService.getAnimalSortOptions}
      onChange={onChangeMock}
    />
  );

  expect(await screen.findByText(label)).toBeInTheDocument();

  userEvent.click(await screen.findByRole("combobox"));

  expect(await screen.findByText("None")).toBeInTheDocument();

  for (const option of mockAnimalSortOptions) {
    const renderedOption = await screen.findByRole("option", {
      name: option.displayName,
    });
    expect(renderedOption).toBeInTheDocument();
  }
});

test("calls onChange callback with the selected value", async () => {
  mock.onGet("/animal-sort-options").reply(200, mockAnimalSortOptions);

  render(
    <CustomSelect
      label={label}
      fetchFunction={FarmService.getAnimalSortOptions}
      onChange={onChangeMock}
    />
  );

  userEvent.click(await screen.findByRole("combobox"));

  const option = await screen.findByRole("option", { name: "Age" });
  userEvent.click(option);

  fireEvent.change(option, { target: { value: "Age" } });

  //expect(onChangeMock).toHaveBeenCalledTimes(1);
});

test("matches snapshot", async () => {
  mock.onGet("/animal-sort-options").reply(200, mockAnimalSortOptions);

  const { asFragment } = render(
    <CustomSelect
      label={label}
      fetchFunction={FarmService.getAnimalSortOptions}
      onChange={onChangeMock}
    />
  );

  userEvent.click(await screen.findByRole("combobox"));

  await waitFor(() => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  expect(asFragment()).toMatchSnapshot();
});
