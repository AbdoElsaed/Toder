import React from "react";
import { useAuth } from "../../shared/Auth";

import List from "../../shared/Tasks/List";

const Today = () => {
  const { overdueTasks } = useAuth();
  let title = `Overdue Tasks`;
  return (
    <div>
      <List
        title={title}
        tasks={overdueTasks}
        overdue={true}
      />
    </div>
  );
};

export default Today;
