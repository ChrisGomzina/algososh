import React from "react";
import styles from "./stack-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <Input 
          extraClass={styles.input}
          type="text"
          isLimitText={true}
          maxLength={4}
        />
        <Button 
          text="Добавить"
        />
        <Button 
          text="Удалить"
        />
        <Button 
          extraClass={styles.button_type_reset}
          text="Очистить"
        />
      </form>
      <div>

      </div>
    </SolutionLayout>
  );
};
