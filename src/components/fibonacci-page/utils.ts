export const fibonacci = (number: number) => {
  let arr: number[] = [1, 1];
  for (let i = 2; i < number + 1; i++) {
    arr.push(arr[i - 2] + arr[i -1]);
  }
 return arr;
};