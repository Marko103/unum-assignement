import { fireEvent, render, screen } from "@testing-library/react";
import NumberBox from "./numberBox";

describe("NumberBox tests", () => {
  const setup = (
    params: {
      boxKey: number;
      toggleClearInput: boolean;
      onInputChanged: (key: number, value: string) => void;
    } = {
      boxKey: 0,
      toggleClearInput: true,
      onInputChanged: jest.fn(),
    }
  ) => {
    const { boxKey, toggleClearInput, onInputChanged } = params;

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

    const inputField = screen.getByTestId("input0");

    // change value in input field
    fireEvent.change(inputField, { target: { value: 23 } });

    // check if value is changed
    screen.getByDisplayValue("23");

    // rerender with changed toggle prop
    rerender(
      <NumberBox
        boxKey={0}
        toggleClearInput={false}
        onInputChanged={jest.fn()}
      ></NumberBox>
    );

    // input field should have been cleared
    expect(() => screen.getByDisplayValue("23")).toThrowError();

    screen.getByDisplayValue("");
  });

  test("Change value sent out", () => {
    const changeValue = "23";

    const onChange = (key: number, value: string) => {
      expect(value).toBeDefined();
      expect(value).not.toEqual("");
      expect(value).toEqual(changeValue);
    };

    setup({
      boxKey: 0,
      toggleClearInput: true,
      onInputChanged: onChange,
    });

    const inputField = screen.getByTestId("input0");

    // change value in input field
    fireEvent.change(inputField, { target: { value: changeValue } });
  });
});
