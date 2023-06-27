import renderer from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Корректная отрисовка", () => {
  it("кнопки с текстом", () => {
    const button = renderer.create(<Button text="text" />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("кнопки без текста", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("заблокированной кнопки", () => {
    const button = renderer.create(<Button disabled={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("кнопки с индикацией загрузки", () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("вызова колбека при клике на кнопку", () => {
    window.alert = jest.fn();
    const onClick = () => alert("Кнопка нажата");
    render(<Button onClick={onClick} text={"text"} />);
    const button = screen.getByText("text");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("Кнопка нажата");
  });
});