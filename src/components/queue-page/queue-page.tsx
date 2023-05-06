import React from "react";
import styles from "./queue-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
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
      <div className={styles.list}>

      </div>
    </SolutionLayout>
  );
};
