import { useEffect, useState } from "react";
import "./numberBox.scss";

export interface INumberBox {
  boxKey: number;
  toggleClearInput: boolean;

  onInputChanged(key: number, value: string): void;
}

const NumberBox: React.FC<INumberBox> = (props) => {
  const { boxKey, toggleClearInput, onInputChanged } = props;
  const [inputValue, setInputValue] = useState("");

  const onChange = (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
    onInputChanged(boxKey, e.target.value);
  };

  useEffect(() => {
    setInputValue("");
  }, [toggleClearInput]);

  return (
    <div className="number-box">
      <label>
        {props.boxKey + 1}.
        <input
          data-testid={"input" + boxKey}
          type="text"
          key={boxKey}
          className="number-box__input"
          onChange={onChange}
          value={inputValue}
        />
      </label>
    </div>
  );
};

export default NumberBox;
