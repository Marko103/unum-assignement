import { fireEvent, render, screen } from "@testing-library/react";
import NumberBox from "./numberBox";

describe("NumberBox tests", () => {
  const setup = (
    boxKey: number = 0,
    toggleClearInput: boolean = false,
    onInputChanged: (key: number, value: string) => void = jest.fn()
  ) => {
    const renderProps = render(
      <NumberBox
        boxKey={boxKey}
        toggleClearInput={toggleClearInput}
        onInputChanged={onInputChanged}
      />
    );

    return { ...renderProps };
  };

  test("Initial values", () => {
    setup();

    screen.getByDisplayValue("");
  });

  test("Clear input value on toggle change", () => {
    const { rerender } = setup();

    const changeValue = "23";

    const inputField = screen.getByDisplayValue("");

    // change value in input field
    fireEvent.change(inputField, { target: { value: changeValue } });

    // check if value is changed
    screen.getByDisplayValue(changeValue);

    // rerender with changed toggle prop
    rerender(
      <NumberBox
        boxKey={0}
        toggleClearInput={true}
        onInputChanged={jest.fn()}
      ></NumberBox>
    );

    screen.getByDisplayValue("");
  });

  test("Change value sent out", () => {
    const changeValue = "23";

    const onChange = (key: number, value: string) => {
      expect(value).toBeDefined();
      expect(value).not.toEqual("");
      expect(value).toEqual(changeValue);
    };

    setup(0, false, onChange);

    const inputField = screen.getByTestId("input0");

    // change value in input field
    fireEvent.change(inputField, { target: { value: changeValue } });
  });
});
