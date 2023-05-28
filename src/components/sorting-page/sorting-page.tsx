import React from "react";
import styles from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";

import { ElementStates } from "../../types/element-states";
import { selectionSort, bubbleSort } from "./utils";

export const SortingPage: React.FC = () => {
  const [isLoadingUp, setIsLoadingUp] = React.useState(false);
  const [isLoadingDown, setIsLoadingDown] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState<string>("selection");
  const [array, setArray] = React.useState<number[]>([]);
  const [index, setIndex] = React.useState<number>();
  const [currentIndex, setCurrentIndex] = React.useState<number>();
  const [lastIndex, setLastIndex] = React.useState<number>();

  const makeNewArray = () => {
    setIndex(undefined);
    setCurrentIndex(undefined);
    setLastIndex(undefined);
    const array: number[] = [];
    let arrayLength = 3 + Math.round(Math.random() * 14);

    for (let i = 0; i < arrayLength; i++) {
      let arrayItem = Math.round(Math.random() * 100);
      array.push(arrayItem);
    }
    setArray([...array]);
  };

  React.useEffect(() => {
    makeNewArray()
  }, []);

  const handleClickSortUp = () => {
    if (radioValue === "selection") {
      selectionSort(array, "up", 500, setIndex, setCurrentIndex, setArray, setIsLoadingUp);
    } else {
      bubbleSort(array, "up", 500, setIndex, setCurrentIndex, setLastIndex, setArray, setIsLoadingUp);
    }
  };

  const handleClickSortDown = () => {
    if (radioValue === "selection") {
      selectionSort(array, "down", 500, setIndex, setCurrentIndex, setArray, setIsLoadingDown);
    } else {
      bubbleSort(array, "down", 500, setIndex, setCurrentIndex, setLastIndex, setArray, setIsLoadingDown);
    }
  };

  const changeColumnColorSelect = (
    itemIndex: number,
    index: number | undefined,
    currentIndex: number | undefined
  ) => {
    if(index !== undefined) {
      if (itemIndex === index || itemIndex === currentIndex) {
        return ElementStates.Changing;
      } else if (itemIndex < index) {
        return ElementStates.Modified;
      }
      return ElementStates.Default;
    }
  };

  const changeColumnColorBubble = (
    itemIndex: number,
    index: number | undefined,
    currentIndex: number | undefined,
    lastIndex: number | undefined
  ) => {
    if(lastIndex) {
      if (itemIndex === index || itemIndex === currentIndex) {
        return ElementStates.Changing;
      } else if (itemIndex > lastIndex) {
        return ElementStates.Modified;
      }
      return ElementStates.Default;
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput
          label="Выбор"
          name="sort"
          value="selection"
          checked={radioValue === "selection" ? true : false}
          onChange={() => setRadioValue("selection")}
        />
        <RadioInput 
          extraClass="ml-20"
          name="sort"
          label="Пузырёк"
          value="bubble"
          checked={radioValue === "bubble" ? true : false}
          onChange={() => setRadioValue("bubble")}
        />
        <Button
          extraClass={`ml-30 mr-6 ${styles.button_type_up}`}
          text="По возрастанию"
          sorting={Direction.Ascending}
          onClick={handleClickSortUp}
          isLoader={isLoadingUp}
          disabled={isLoadingDown}
        />
        <Button
          extraClass={`mr-40 ${styles.button_type_down}`}
          text="По убыванию"
          sorting={Direction.Descending}
          onClick={handleClickSortDown}
          isLoader={isLoadingDown}
          disabled={isLoadingUp}
        />
        <Button
          extraClass={styles.button}
          text="Новый массив"
          disabled={isLoadingDown || isLoadingUp}
          onClick={makeNewArray}
        />
      </form>
      <div className={styles.list}>
        {array.map((item: number, itemIndex: number) => (
          <Column
            index={item}
            key={itemIndex}
            state={
              radioValue === "selection"
                ? changeColumnColorSelect(itemIndex, index, currentIndex)
                : changeColumnColorBubble(itemIndex, index, currentIndex, lastIndex)
            }
          />
        ))}
      </div>

    </SolutionLayout>
  );
};
