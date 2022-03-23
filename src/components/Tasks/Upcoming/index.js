import React from "react";
import { useAuth } from "../../shared/Auth";

import List from "../../shared/Tasks/List";

const Upcoming = () => {
  const { upcomingTasks } = useAuth();
  let title = `Upcoming`;
  return (
    <div>
      <List
        title={title}
        tasks={upcomingTasks}
        showCompleted={false}
        upcoming={true}
      />
    </div>
  );
};

export default Upcoming;
