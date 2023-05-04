import { swap } from "../../utils/utils";

export const selectionSort = async (
  array: number[],
  sortType: "up" | "down",
  timeout: number,
  setIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  const arr: number[] = [...array];

  for (let i = 0; i < arr.length; i++) {
    setIndex(i);
    let minIndex = i;

    for (let j = i + 1; j < arr.length + 1; j++) {
      await new Promise<void>((resolve) => setTimeout(resolve, timeout));
      setCurrentIndex(j);

      if (sortType === "up") {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      } else {
        if (arr[j] > arr[minIndex]) {
          minIndex = j;
        }
      };
    };

    swap(arr, i, minIndex);
    setArray([...arr]);
    setIndex(i + 1);
  };
  setLoading(false);
  return arr;
};

export const bubbleSort = async (
  array: number[],
  sortType: "up" | "down",
  timeout: number,
  setIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  setCurrentIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  setLastIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  const arr: number[] = [...array];

  for (let j = arr.length - 1; j >= -1; j--) {
    setLastIndex(j);

    for (let i = 0; i < j; i++) {
      await new Promise<void>((resolve) => setTimeout(resolve, timeout));

      setIndex(i);
      setCurrentIndex(i + 1);

      if (sortType === "up") {
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
      } else {
        if (arr[i] < arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
      };

      setArray([...arr]);
    };
    setCurrentIndex(undefined);
    setIndex(undefined);
  };
  setLoading(false);
  return arr;
};