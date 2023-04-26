import { swap } from "../../utils/utils";

export const reverseString = async (str: string[], timeout: number) => {
  const mid = Math.floor(str.length / 2);

  for (let i = 0; i < mid; i++) {
    let j = str.length - 1 - i;
    swap(str, i, j);
    await new Promise<void>((resolve) => setTimeout(resolve, timeout));
  }

  return str;
};