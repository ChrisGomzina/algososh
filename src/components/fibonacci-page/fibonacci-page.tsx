import React, { ChangeEvent } from "react";
import styles from "./fibonacci-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { fibonacci } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<number>(0);
  const [fibonacciNums, setFibonacciNums] = React.useState<number[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  const handleClick = async () => {
    setIsLoading(true);
    const fibonacciArr = fibonacci(inputValue);
    for (let i = 0; i < fibonacciArr.length; i++) {
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      setFibonacciNums(fibonacciArr.slice(0, i + 1));
    }
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form}>
        <Input
          extraClass={styles.input}
          type="number"
          max={19}
          isLimitText={true}
          onChange={handleChange}
        />
        <Button 
          extraClass={styles.button}
          text="Рассчитать" 
          isLoader={isLoading} 
          disabled={inputValue >= 1 && inputValue <= 19 ? false : true}
          onClick={handleClick}
          type="submit"
        />
      </form>
      <div className={styles.list}>
        {fibonacciNums.map((num, index) => (
          <Circle 
            letter={`${num}`} 
            key={index}
            index={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
