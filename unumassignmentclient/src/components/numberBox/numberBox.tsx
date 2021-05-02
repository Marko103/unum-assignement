import { useEffect, useState } from "react";

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
    <input type="text" key={boxKey} onChange={onChange} value={inputValue} />
  );
};

export default NumberBox;
