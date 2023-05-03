import React from "react";
import styles from "./sorting-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <RadioInput
          label="Выбор"
        />
        <RadioInput 
          extraClass="ml-20"
          label="Пузырёк"
        />
        <Button
          extraClass="ml-30 mr-6"
          text="По возрастанию"
          sorting={Direction.Ascending}
        />
        <Button
          extraClass="mr-40"
          text="По убыванию"
          sorting={Direction.Descending}
        />
        <Button
          extraClass={styles.button}
          text="Новый массив"
        />
      </form>

    </SolutionLayout>
  );
};
