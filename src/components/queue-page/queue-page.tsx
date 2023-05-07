import React from "react";
import styles from "./queue-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

import { queue } from "./Queue";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [array, setArray] = React.useState<string[]>([]);
  const [isLoadingAdd, setIsLoadingAdd] = React.useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);
  const [animationColor, setAnimationColor] = React.useState(ElementStates.Default);
  const [actionType, setActionType] =  React.useState<string>("");

  React.useEffect(() => {
    setArray([...queue.getElements()]);
    return () => {
      queue.deleteElements();
      setArray([...queue.getElements()]);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClickAdd = async () => {
    setIsLoadingAdd(true);
    setActionType("push");
    await changeAnimationColor();
    queue.enqueue(inputValue);
    setArray([...queue.getElements()]);
    setInputValue("");
    setIsLoadingAdd(false);
  };

  const handleClickDelete = async () => {
    setIsLoadingDelete(true);
    setActionType("");
    await changeAnimationColor();
    queue.dequeue();
    setArray([...queue.getElements()]);
    setIsLoadingDelete(false);
  };

  const handleClickReset = () => {
    queue.deleteElements();
    setArray([...queue.getElements()]);
    setInputValue("");
  };

  const changeAnimationColor = async () => {
    setAnimationColor(ElementStates.Changing);
    await new Promise<void>((resolve) => setTimeout(resolve, 500));
    setAnimationColor(ElementStates.Default);
  };

  return (
    <SolutionLayout title="Очередь">
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
          isLoader={isLoadingAdd}
          disabled={isLoadingDelete || !inputValue || queue.isFull()}
          onClick={handleClickAdd}
        />
        <Button 
          text="Удалить"
          isLoader={isLoadingDelete}
          disabled={isLoadingAdd || !!queue.isEmpty()}
          onClick={handleClickDelete}
        />
        <Button 
          extraClass={styles.button_type_reset}
          text="Очистить"
          disabled={isLoadingAdd || isLoadingDelete || !!queue.isEmpty()}
          onClick={handleClickReset}
        />
      </form>
      <div className={styles.list}>
        {array.map((letter, index) => (
          <Circle
            letter={letter}
            key={index}
            index={index}
            head={index === queue.head && letter ? "head" : ""}
            tail={index === queue.tail - 1 && letter ? "tail" : ""}
            state={
              actionType === "push"
                ? index === queue.tail
                  ? animationColor
                  : ElementStates.Default
                : index === queue.head
                ? animationColor
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
