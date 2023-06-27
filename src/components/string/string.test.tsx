import { reverseString } from "./utils";

describe("Корректно разворачивает строку", () => {
  const setString = jest.fn();
  const setIterationIndexes = jest.fn();

  it("с чётным количеством символов", async () => {
    const string: string = "1234";
    const result = await reverseString(string, setString, setIterationIndexes, 0);
    expect(result).toBe("4321");
  });
  it("с нечетным количеством символов", async () => {
    const string: string = "12345";
    const result = await reverseString(string, setString, setIterationIndexes, 0);
    expect(result).toBe("54321");
  });
  it("с одним символом", async () => {
    const string: string = "a";
    const result = await reverseString(string, setString, setIterationIndexes, 0);
    expect(result).toBe("a");
  });
  it("пустую строку", async () => {
    const string: string = "";
    const result = await reverseString(string, setString, setIterationIndexes, 0);
    expect(result).toBe("");
  });
});