import { useState } from "react";

import { Button, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import AddSubTask from "./AddSubTask";
import List from "./List";

const SubTasksTab = ({ task }) => {
  const [showAddSubTask, setShowAddSubTask] = useState(false);
  return (
    <Box sx={{ maxHeight: "280px", overflowY: "auto" }}>
      {showAddSubTask ? (
        <AddSubTask task={task} setShowAddSubTask={setShowAddSubTask} />
      ) : (
        <Button
          sx={{ color: "#de4c4a", textTransform: "none" }}
          variant="text"
          startIcon={<AddCircleIcon />}
          size="small"
          onClick={() => setShowAddSubTask(!showAddSubTask)}
        >
          Add Sub-Task
        </Button>
      )}

      <List task={task} subTasks={task.subTasks} />
    </Box>
  );
};

export default SubTasksTab;
