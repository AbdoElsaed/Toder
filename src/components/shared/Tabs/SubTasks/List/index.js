import { useState, useEffect } from "react";
import { Box, List, Divider } from "@mui/material";

import Item from "./Item";
// import CompletedTasks from "./Completed";

const SubTasksList = ({ task, subTasks }) => {
  const [unCompletedSubTasks, setUnCompletedSubTasks] = useState([]);
  const [completedSubTasks, setCompletedSubTasks] = useState([]);

  useEffect(() => {
    let completed = subTasks.filter((t) => t.completed);
    setCompletedSubTasks(completed);
    let unCompleted = subTasks.filter((t) => !t.completed);
    setUnCompletedSubTasks(unCompleted);
  }, [subTasks]);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <List sx={{ width: "100%" }}>
        {unCompletedSubTasks.length
          ? unCompletedSubTasks.map((subTask) => (
              <Item
                key={subTask._id}
                subTask={subTask}
                task={task}
                completedItem={false}
              />
            ))
          : null}

        {unCompletedSubTasks.length && completedSubTasks.length ? (
          <Divider />
        ) : null}

        {completedSubTasks.length
          ? completedSubTasks.map((subTask) => (
              <Item
                key={subTask._id}
                subTask={subTask}
                task={task}
                completedItem={true}
              />
            ))
          : null}
      </List>
    </Box>
  );
};

export default SubTasksList;
