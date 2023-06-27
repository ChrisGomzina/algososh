import React from "react";
import styles from "./list-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import image from "../../images/chevron-right.svg"

import { list } from "./LinkedList";
import { ElementStates } from "../../types/element-states";
import { ButtonTypes } from "../../types/button-types";

type TNode = {
  value: string;
  index: number | null;
  head: boolean;
};

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [indexValue, setIndexValue] = React.useState<string>("");
  const [array, setArray] = React.useState<string[]>([]);
  const [node, setNode] = React.useState<TNode>({ value: "", index: null, head: true });
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonType, setButtonType] = React.useState<string>("");
  const [animationColor, setAnimationColor] = React.useState(ElementStates.Default);

  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChangeIndexValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value);
  };

  React.useEffect(() => {
    setArray([...list.getArrayValues()]);
    return () => {
      setArray(["0", "34", "8", "1"]);
    };
  }, []);

  console.log(indexValue);
  console.log(inputValue);

  const handleClickPrepend = async () => {
    setIsLoading(true);
    setButtonType(ButtonTypes.AddToHead);
    list.prepend(inputValue);
    setNode({ value: inputValue, index: 0, head: true });
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setArray([...list.getArrayValues()]);
    setNode({ value: "", index: 0, head: true });
    setInputValue("");
    setIndexValue("");
    await changeAnimationColor();
    setIsLoading(false);
  };

  const handleClickAppend = async () => {
    setIsLoading(true);
    setButtonType(ButtonTypes.AddToTail);
    list.append(inputValue);
    setNode({ value: inputValue, index: list.size - 2, head: true });
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setArray([...list.getArrayValues()]);
    setNode({ value: "", index: list.size - 1, head: true });
    setInputValue("");
    setIndexValue("");
    await changeAnimationColor();
    setIsLoading(false);
  };

  const handleClickDeleteHead = async () => {
    setIsLoading(true);
    setButtonType(ButtonTypes.DeleteHead);
    list.deleteHead();
    setNode({ value: "", index: 0, head: false });
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setArray([...list.getArrayValues()]);
    setNode({ value: "", index: null, head: false });
    setInputValue("");
    setIndexValue("");
    setIsLoading(false);
  };

  const handleClickDeleteTail = async () => {
    setIsLoading(true);
    setButtonType(ButtonTypes.DeleteTail);
    list.deleteTail();
    setNode({ value: "", index: list.size, head: false });
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setArray([...list.getArrayValues()]);
    setNode({ value: "", index: null, head: false });
    setInputValue("");
    setIndexValue("");
    setIsLoading(false);
  };

  const handleClickInsertByIndex = async () => {
    setIsLoading(true);
    setButtonType(ButtonTypes.AddByIndex);
    const index = Number(indexValue);
    if (index < 0 || index > list.size) {
      setIsLoading(false);
      return;
    };
    list.insertAt(inputValue, index);
    for (let i = 0; i <= index; i++) {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      setNode({ value: inputValue, index: i, head: true });
      setAnimationColor(ElementStates.Changing);
    };
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setArray([...list.getArrayValues()]);
    setNode({ value: "", index: index, head: true });
    setInputValue("");
    setIndexValue("");
    await changeAnimationColor();
    setIsLoading(false);
  };

  const handleClickDeleteByIndex = async () => {
    setIsLoading(true);
    setButtonType(ButtonTypes.DeleteByIndex);
    const index = Number(indexValue);
    if (index < 0 || index > list.size) {
      setIsLoading(false);
      return;
    };
    list.deleteAt(index);
    for (let i = 0; i <= index; i++) {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      setNode({ value: inputValue, index: i, head: false });
      setAnimationColor(ElementStates.Changing);
    };
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setNode({ value: "", index: index, head: false });
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setArray([...list.getArrayValues()]);
    setNode({ value: "", index: null, head: true });
    setInputValue("");
    setIndexValue("");
    await changeAnimationColor();
    setIsLoading(false);
  };

  const changeAnimationColor = async () => {
    setAnimationColor(ElementStates.Modified);
    await new Promise<void>((resolve) => setTimeout(resolve, 500));
    setAnimationColor(ElementStates.Default);
  };

  return (
    <SolutionLayout title="Связный список">
      <form>
        <div className={styles.container}>
          <Input 
            extraClass={styles.input}
            type="text"
            isLimitText={true}
            maxLength={4}
            value={inputValue}
            onChange={handleChangeInputValue}
          />
          <Button 
            extraClass={styles.button}
            text="Добавить в head"
            isLoader={isLoading && buttonType === ButtonTypes.AddToHead}
            disabled={!inputValue || isLoading}
            onClick={handleClickPrepend}
            type="submit"
          />
          <Button 
            extraClass={styles.button}
            text="Добавить в tail"
            isLoader={isLoading && buttonType === ButtonTypes.AddToTail}
            disabled={!inputValue || isLoading}
            onClick={handleClickAppend}
            data-testid={"addToTail"}
          />
          <Button 
            extraClass={styles.button}
            text="Удалить из head"
            isLoader={isLoading && buttonType === ButtonTypes.DeleteHead}
            disabled={list.isEmpty() || isLoading}
            onClick={handleClickDeleteHead}
            data-testid={"deleteHead"}
          />
          <Button 
            extraClass={styles.button}
            text="Удалить из tail"
            isLoader={isLoading && buttonType === ButtonTypes.DeleteTail}
            disabled={list.isEmpty() || isLoading}
            onClick={handleClickDeleteTail}
            data-testid={"deleteTail"}
          />
        </div>
        <div className={`${styles.container} mt-6 `}>
          <Input 
            extraClass={styles.input}
            type="number"
            value={indexValue}
            onChange={handleChangeIndexValue}
          />
          <Button 
            extraClass={styles.button}
            text="Добавить по индексу"
            isLoader={isLoading && buttonType === ButtonTypes.AddByIndex}
            disabled={
              !inputValue ||
              !indexValue ||
              isLoading ||
              Number(indexValue) > list.getLength() - 1
            }
            onClick={handleClickInsertByIndex}
            data-testid={"addByIndex"}
          />
          <Button 
            extraClass={styles.button}
            text="Удалить по индексу"
            isLoader={isLoading && buttonType === ButtonTypes.DeleteByIndex}
            disabled={
              !indexValue || list.isEmpty() ||
              isLoading ||
              Number(indexValue) > list.getLength() - 1
            }
            onClick={handleClickDeleteByIndex}
            data-testid={"deleteByIndex"}
          />
        </div>
        <div className={styles.list}>
        {array.map((letter, index) => (
          <div className={styles.item} key={index}>
            <Circle
              letter={letter}
              index={index}
              head={
                node.head && node.value && index === node.index ? (
                  <Circle
                    letter={node.value}
                    isSmall={true}
                    state={ElementStates.Changing}
                  />
                ) : index === 0 ? (
                  "head"
                ) : null
              }
              tail={
                !node.head && !node.value && index === node.index ? (
                  <Circle
                    letter={letter}
                    isSmall={true}
                    state={ElementStates.Changing}
                  />
                ) : index === array.length - 1 ? (
                  "tail"
                ) : null
              }
              state={index === node.index ? animationColor : ElementStates.Default}
            />
            <div className={styles.image}>
              <img src={image} />
            </div>
          </div>
        ))}
        </div>
      </form>
    </SolutionLayout>
  );
};
