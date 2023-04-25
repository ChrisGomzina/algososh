import React, { ChangeEvent } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [string, setString] = React.useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setString(e.target.value.split(""));
  }

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
          disabled={string.length < 2}
        />
      </form>
      <ul className={styles.list}>
        {string.map((item, index) => (
          <li key={index}>
            <Circle letter={item}/>
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
