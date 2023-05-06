import React from "react";
import styles from "./stack-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

import { stack } from "./Stack";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [array, setArray] = React.useState<string[]>([]);
  const [isLoadingAdd, setIsLoadingAdd] = React.useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);
  const [animationColor, setAnimationColor] = React.useState(ElementStates.Default);

  React.useEffect(() => {
    return () => {
      stack.deleteElements();
      setArray([]);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClickAdd = () => {
    setIsLoadingAdd(true);
    stack.push(inputValue);
    setArray([...stack.getContainer()]);
    setInputValue("");
    changeAnimationColor();
    setIsLoadingAdd(false);
  };

  console.log(inputValue);
  console.log(array);

  const handleClickDelete = async () => {
    setIsLoadingDelete(true);
    await changeAnimationColor();
    stack.pop();
    setArray([...stack.getContainer()]);
    setIsLoadingDelete(false);
  };

  const handleClickReset = () => {
    stack.deleteElements();
    setArray([...stack.getContainer()]);
    setInputValue("");
  };

  const changeAnimationColor = async () => {
    setAnimationColor(ElementStates.Changing);
    await new Promise<void>((resolve) => setTimeout(resolve, 500));
    setAnimationColor(ElementStates.Default);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <Input 
          extraClass={styles.input}
          type="text"
          isLimitText={true}
          maxLength={4}
          value={`${inputValue}`}
          onChange={handleChange}
        />
        <Button 
          text="Добавить"
          onClick={handleClickAdd}
          isLoader={isLoadingAdd}
          disabled={isLoadingDelete || !inputValue}
        />
        <Button 
          text="Удалить"
          onClick={handleClickDelete}
          isLoader={isLoadingDelete}
          disabled={isLoadingAdd || !array.length}
        />
        <Button 
          extraClass={styles.button_type_reset}
          text="Очистить"
          onClick={handleClickReset}
          disabled={isLoadingDelete || isLoadingAdd || !array.length}
        />
      </form>
      <div className={styles.list}>
        {array.map((letter, index, arr) => (
          <Circle
            letter={letter}
            key={index}
            index={index}
            head={index === arr.length - 1 ? "top" : null}
            state={index === arr.length - 1 ? animationColor : ElementStates.Default}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
