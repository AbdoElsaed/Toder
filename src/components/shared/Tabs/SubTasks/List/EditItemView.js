import { useState } from "react";
import { Box, TextField, Stack, Button } from "@mui/material";

import { editTask } from "../../../../../utils/db/tasks";
import { useAuth } from "../../../Auth";

const styles = {
  boxStyle: {
    width: "100%",
    margin: "10px 5px",
    boxShadow: "1px 1px 1px #222",
    p: 2,
    border: "1px solid #222",
    borderRadius: "10px",
    backgroundColor: "#1c1b1b",
  },
  input: {
    marginBottom: "8px",
    marginLeft: "10px",
  },
  btn: {
    // backgroundColor: "#DE4C4A",
    // "&:hover": {
    //   backgroundColor: "#DE4C4A",
    // },
  },
};

const EditItemView = ({ task, subTask, setEditView }) => {
  const [name, setName] = useState(subTask.name ? subTask.name : "");
  const [description, setDescription] = useState(
    subTask.description ? subTask.description : ""
  );

  const { tasksDB, refreshTasks } = useAuth();

  const handleCancel = () => {
    setEditView(false);
  };

  const handleSubmit = async () => {
    const subs = task.subTasks.map((s) => {
      if (s.name === subTask.name && s._id === subTask._id) {
        s.name = name;
        s.description = description;
      }
      return s;
    });
    task.subTasks = subs;
    const res = await editTask(tasksDB, task);
    await refreshTasks();
    console.log({ res });
    handleCancel();
  };

  return (
    <Box sx={styles.boxStyle}>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={styles.input}
            id="standard-basic"
            label="Task name"
            variant="standard"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
          />
          <TextField
            sx={styles.input}
            id="standard-basic"
            label="Description"
            variant="standard"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
          />
        </div>

        <Stack direction="row" spacing={2} mt={2}>
          <Button
            color="success"
            size="small"
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button size="small" variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </div>
    </Box>
  );
};

export default EditItemView;
