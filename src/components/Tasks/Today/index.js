import React from "react";
import { useAuth } from "../../shared/Auth";

import List from "../../shared/Tasks/List";

const Today = () => {
  const { completedTodayTasks, unCompletedTodayTasks, overdueTasks } =
    useAuth();
  let title = `Today`;
  let date = new Date().toLocaleDateString();
  return (
    <div>
      <List
        title={title}
        date={date}
        tasks={unCompletedTodayTasks}
        completed={completedTodayTasks}
        showCompleted={true}
        showOverdueBtn={overdueTasks && overdueTasks.length ? true : false}
      />
    </div>
  );
};

export default Today;
