import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import TaskFormAutocomplete from "../shared/Inputs/ProjectsAutocomplete";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/lab";

import { createTask } from "../../utils/db/tasks";
import { addTaskToProject } from "../../utils/helpers/tasksAndProjects";
import { useAuth } from "../shared/Auth";

const styles = {
  boxStyle: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxWidth: 500,
    bgcolor: "background.paper",
    boxShadow: "1px 1px 1px #222",
    p: 4,
    border: "1px solid #222",
    borderRadius: "10px",
    paddingTop: 3,
    backgroundColor: "#222",
  },
  input: {
    marginBottom: "8px",
  },
  btn: {
    marginTop: "25px",
    fontWeight: 550,
    // backgroundColor: "#1C54B2",
    // "&:hover": {
    //   backgroundColor: "#2b5384",
    // },
  },
};

export default function AddTask({ open, setOpen }) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState(null);
  const [schedule, setSchedule] = useState(new Date());

  const { tasksDB, refreshTasks, refreshProjects, projectsDB } = useAuth();

  const resetForm = () => {
    setName("");
    setDescription("");
    setProject("");
    setSchedule(new Date());
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSchedule = (newValue) => {
    setSchedule(newValue);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let p = project ? project : "random";
    const doc = { name, description, project: p, scheduled_at: schedule };
    const result = await createTask(tasksDB, doc);
    if (result.ok === true) {
      setLoading(false);
      handleClose();
      await refreshTasks();
      await addTaskToProject({
        tasksDB,
        projectsDB,
        taskID: result.id,
        project: p,
        refreshProjects,
      });
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={styles.boxStyle}
        >
          <Typography
            sx={{ textAlign: "center" }}
            variant="h6"
            gutterBottom
            component="div"
          >
            Add Task
          </Typography>
          <div>
            <TextField
              sx={styles.input}
              id="standard-basic"
              label="Task name"
              variant="standard"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              sx={styles.input}
              id="standard-basic"
              label="Description"
              variant="standard"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disablePast
                label="Schedule"
                inputFormat="MM/dd/yyyy"
                value={schedule}
                onChange={handleSchedule}
                renderInput={(params) => (
                  <TextField
                    sx={{ marginTop: "20px", width: "100%" }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>

            <TaskFormAutocomplete project={project} setProject={setProject} />

            <LoadingButton
              color="success"
              onClick={handleSubmit}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              sx={styles.btn}
              disabled={!name}
            >
              Add
            </LoadingButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
