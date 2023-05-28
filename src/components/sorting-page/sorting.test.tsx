import { selectionSort, bubbleSort } from "./utils";

describe("Сортировка выбором", () => {
  const setIndex = jest.fn();
  const setCurrentIndex = jest.fn();
  const setArray = jest.fn();
  const setLoading = jest.fn();

  describe("по возрастанию", () => {
    it("пустой массив", async () => {
      const array: number[] = [];
      const result = await selectionSort(array, "up", 0, setIndex, setCurrentIndex, setArray, setLoading);
      expect(result).toStrictEqual([]);
    });
    it("массив из одного элемента", async () => {
      const array: number[] = [1];
      const result = await selectionSort(array, "up", 0, setIndex, setCurrentIndex, setArray, setLoading);
      expect(result).toStrictEqual([1]);
    });
    it("массив из нескольких элементов", async () => {
      const array: number[] = [-10, 100, 0, 50, 25];
      const result = await selectionSort(array, "up", 0, setIndex, setCurrentIndex, setArray, setLoading);
      expect(result).toStrictEqual([-10, 0, 25, 50, 100]);
    });
  });

  describe("по убыванию", () => {
    it("пустой массив", async () => {
      const array: number[] = [];
      const result = await selectionSort(array, "down", 0, setIndex, setCurrentIndex, setArray, setLoading);
      expect(result).toStrictEqual([]);
    });
    it("массив из одного элемента", async () => {
      const array: number[] = [1];
      const result = await selectionSort(array, "down", 0, setIndex, setCurrentIndex, setArray, setLoading);
      expect(result).toStrictEqual([1]);
    });
    it("массив из нескольких элементов", async () => {
      const array: number[] = [-10, 100, 0, 50, 25];
      const result = await selectionSort(array, "down", 0, setIndex, setCurrentIndex, setArray, setLoading);
      expect(result).toStrictEqual([100, 50, 25, 0, -10]);
    });
  });
});


describe("Сортировка пузырьком", () => {
  const setIndex = jest.fn();
  const setCurrentIndex = jest.fn();
  const setLastIndex = jest.fn();
  const setArray = jest.fn();
  const setLoading = jest.fn();


  describe("по возрастанию", () => {
    it("пустой массив", async () => {
      const array: number[] = [];
      const result = await bubbleSort(array, "up", 0, setIndex, setCurrentIndex, setLastIndex, setArray, setLoading);
      expect(result).toStrictEqual([]);
    });
    it("массив из одного элемента", async () => {
      const array: number[] = [1];
      const result = await bubbleSort(array, "up", 0, setIndex, setCurrentIndex, setLastIndex, setArray, setLoading);
      expect(result).toStrictEqual([1]);
    });
    it("массив из нескольких элементов", async () => {
      const array: number[] = [-10, 100, 0, 50, 25];
      const result = await bubbleSort(array, "up", 0, setIndex, setCurrentIndex, setLastIndex, setArray, setLoading);
      expect(result).toStrictEqual([-10, 0, 25, 50, 100]);
    });
  });
  
  describe("по убыванию", () => {
    it("пустой массив", async () => {
      const array: number[] = [];
      const result = await bubbleSort(array, "down", 0, setIndex, setCurrentIndex, setLastIndex, setArray, setLoading);
      expect(result).toStrictEqual([]);
    });
    it("массив из одного элемента", async () => {
      const array: number[] = [1];
      const result = await bubbleSort(array, "down", 0, setIndex, setCurrentIndex, setLastIndex, setArray, setLoading);
      expect(result).toStrictEqual([1]);
    });
    it("массив из нескольких элементов", async () => {
      const array: number[] = [-10, 100, 0, 50, 25];
      const result = await bubbleSort(array, "down", 0, setIndex, setCurrentIndex, setLastIndex, setArray, setLoading);
      expect(result).toStrictEqual([100, 50, 25, 0, -10]);
    });
  });
});

