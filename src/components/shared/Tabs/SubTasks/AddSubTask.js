import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useAuth } from "../../Auth";
import { editTask } from "../../../../utils/db/tasks";

import { getUniqueId } from "../../../../utils/helpers/tasksAndProjects";

const AddSubTask = ({ setShowAddSubTask, task }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { tasksDB, refreshTasks } = useAuth();

  const handleSubmit = async () => {
    const subtask = {
      _id: getUniqueId(),
      name,
      description,
      completed: false,
    };
    task.subTasks =
      task.subTasks && task.subTasks.length
        ? [...task.subTasks, subtask]
        : [subtask];

    const res = await editTask(tasksDB, task);
    await refreshTasks();
    if (res) {
      // setShowAddSubTask(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#1c1b1b",
          border: "1px solid #333",
          borderRadius: "10px",
          paddingBottom: 2,
          paddingTop: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="name"
            variant="standard"
            size="small"
            sx={{ width: "45%" }}
          />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="description"
            variant="standard"
            size="small"
            sx={{ width: "45%" }}
          />
        </div>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          flexDirection: "row",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={handleSubmit}
          size="small"
          variant="outlined"
          sx={{ ml: 1 }}
          disabled={!name}
        >
          Add
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          sx={{ ml: 1 }}
          onClick={() => setShowAddSubTask(false)}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default AddSubTask;
