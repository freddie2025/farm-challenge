import { render, screen } from "@testing-library/react";
import { NameFilter } from "./NameFilter";
import userEvent from "@testing-library/user-event";

/* not using axios mock adapter */
/* no snapshot */

test('renders a TextField with label "Name"', () => {
  render(<NameFilter onChange={() => {}} />);
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
});

test("calls onChange callback when input changes", async () => {
  const onChangeMock = jest.fn();
  render(<NameFilter onChange={onChangeMock} />);

  const inputElement = screen.getByLabelText(/name/i);

  await userEvent.type(inputElement, "John");
  expect(onChangeMock).toHaveBeenLastCalledWith("John");
  expect(onChangeMock).toHaveBeenCalledTimes(4);
});
