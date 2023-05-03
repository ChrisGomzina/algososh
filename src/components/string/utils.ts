import { swap } from "../../utils/utils";

export const reverseString = async (
  inputValue: string, 
  setString: React.Dispatch<React.SetStateAction<string[]>>,
  setIterationIndexes: React.Dispatch<React.SetStateAction<number[]>>, 
  timeout: number) => {

    const str: string[] = inputValue.split("");
    setString([...str]);

    await new Promise<void>((resolve) => setTimeout(resolve, timeout));

    const mid = Math.ceil(inputValue.length / 2);

    for (let startIndex = 0; startIndex < mid; startIndex++) {
      let endIndex = inputValue.length - 1 - startIndex;
      setIterationIndexes([startIndex, endIndex]);

      if (startIndex !== endIndex) {
        setString([...str]);
        await new Promise<void>((resolve) => setTimeout(resolve, timeout));
      }

      swap(str, startIndex, endIndex);
      setString([...str]);
    }
};