import { useState } from "react";
import { fetcher } from "./fetcher";

interface IUnumResponse {
  numbers: string;
  min: number;
  max: number;
  avg: number;
}

export const useCalculate = (values: Array<number | undefined>) => {
  const [responses, setResponses] = useState<Array<IUnumResponse>>([]);
  const [toggleClearInput, setToggleClearInput] = useState<boolean>(false);

  const calculate = async () => {
    setToggleClearInput((prev) => !prev);
    const response = await fetcher<IUnumResponse>("unum/calculate", {
      method: "POST",
      body: JSON.stringify(values)
    });

    setResponses([...responses, response]);
  };

  return {
    responses,
    calculate,
    toggleClearInput,
  };
};
