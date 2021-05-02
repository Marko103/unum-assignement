import React, { useEffect, useState } from "react";
import NumberBox from "../components/numberBox/numberBox";
import { useCalculate } from "../helpers/customHooks";
import "./unumContainer.scss";

const UnumContainer: React.FC = (props) => {
  const [inputValues, setInputValues] = useState<Array<number | undefined>>([
    undefined,
  ]);
  const { calculate, responses, toggleClearInput } = useCalculate(inputValues);

  const onAdd = () => {
    setInputValues([...inputValues, undefined]);
  };

  const onRemove = () => {
    if (inputValues.length === 1) return;

    inputValues.length -= 1;

    setInputValues([...inputValues]);
  };

  const onInputChanged = (key: number, value: string) => {
    setInputValues((prev) => {
      prev[key] = value === "" ? undefined : +value;
      return [...prev];
    });
  };

  const isCalculateDisabled = () => {
    for (let i = 0; i < inputValues.length; i++) {
      if (inputValues[i] === undefined) {
        return true;
      }
    }

    return false;
  };

  const renderInputs = () => {
    const inputs: Array<React.ReactNode> = [];

    for (let i = 0; i < inputValues.length; i++) {
      inputs.push(
        <NumberBox key={i} boxKey={i} onInputChanged={onInputChanged} toggleClearInput={toggleClearInput} />
      );
    }

    return inputs;
  };

  useEffect(() => {
      setInputValues(new Array(inputValues.length));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleClearInput]);

  return (
    <div>
      <div>
        <button type="button" onClick={onAdd}>
          +
        </button>
        <button type="button" onClick={onRemove}>
          -
        </button>
        <button
          type="button"
          onClick={calculate}
          disabled={isCalculateDisabled()}
        >
          Calculate
        </button>
        <div>{renderInputs()}</div>
      </div>

      <div>
        <h3>Result table</h3>
        <table>
          <thead>
            <tr>
              <td>Numbers</td>
              <td>Min</td>
              <td>Max</td>
              <td>Avg</td>
            </tr>
          </thead>
          <tbody>
            {responses.map((res) => (
              <tr>
                <td>{res.numbers}</td>
                <td>{res.min}</td>
                <td>{res.max}</td>
                <td>{res.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnumContainer;
