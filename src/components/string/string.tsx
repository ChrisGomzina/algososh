import React, { ChangeEvent } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { reverseString } from "./utils";

export const StringComponent: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [string, setString] = React.useState<string[]>([]);
  const [iterationIndexes, setIterationIndexes] = React.useState<number[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = async (timeout: number) => {
    setIterationIndexes([]);
    setIsLoading(true);
    await reverseString(inputValue, setString, setIterationIndexes, timeout);
    setIsLoading(false);
  };

  const changeCircleColor = (circleIndex: number, [startIndex, endIndex]: number[]) => {
    if (circleIndex < startIndex || circleIndex > endIndex) {
      return ElementStates.Modified;
    } else if (startIndex === endIndex && startIndex > 0 || endIndex - startIndex === 1) { 
      return ElementStates.Modified;
    } else if (circleIndex === startIndex || circleIndex === endIndex) {
      return ElementStates.Changing;
    } else {
      return ElementStates.Default;
    }
  };
 
  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <Input 
          extraClass={styles.input} 
          maxLength={11} 
          isLimitText={true}
          onChange={handleChange}
        />
        <Button 
          text="Развернуть" 
          isLoader={isLoading} 
          disabled={inputValue.length < 2}
          onClick={(e) => handleClick(1000)}
        />
      </form>
      <div className={styles.list}>
        {string.map((item, index) => (
            <Circle 
              letter={item} 
              key={index}
              state={changeCircleColor(index, iterationIndexes)} 
            />
        ))}
      </div>
    </SolutionLayout>
  );
};
