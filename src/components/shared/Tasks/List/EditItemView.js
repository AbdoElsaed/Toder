import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import TaskFormAutocomplete from "../../Inputs/ProjectsAutocomplete";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/lab";

import { editTask } from "../../../../utils/db/tasks";
import { useAuth } from "../../Auth";

const styles = {
  boxStyle: {
    width: "100%",
    margin: "10px 5px",
    bgcolor: "background.paper",
    boxShadow: "1px 1px 1px #222",
    p: 2,
    border: "1px solid #222",
    borderRadius: "10px",
    backgroundColor: "#222",
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

const EditItemView = ({ task, setEditView }) => {
  const [name, setName] = useState(task.name ? task.name : "");
  const [description, setDescription] = useState(
    task.description ? task.description : ""
  );
  const [project, setProject] = useState(task.project ? task.project : "");
  const [schedule, setSchedule] = useState(
    task.scheduled_at ? task.scheduled_at : new Date()
  );

  const { tasksDB, refreshTasks } = useAuth();

  const handleCancel = () => {
    setEditView(false);
  };

  const handleSchedule = (newValue) => {
    setSchedule(newValue);
  };

  const handleSubmit = async () => {
    const obj = {
      ...task,
      name,
      description,
      scheduleDate: schedule,
      scheduled_at: new Date(schedule).setHours(0, 0, 0, 0),
      project,
    };
    await editTask(tasksDB, obj);
    await refreshTasks();
    handleCancel();
  };

  return (
    <Box component="form" noValidate autoComplete="off" sx={styles.boxStyle}>
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

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disablePast
              label="Schedule"
              inputFormat="MM/dd/yyyy"
              value={schedule}
              onChange={handleSchedule}
              renderInput={(params) => (
                <TextField
                  size="small"
                  sx={{ marginTop: "15px", width: "100%" }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <TaskFormAutocomplete
            size="small"
            project={project}
            setProject={setProject}
            editView={true}
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
