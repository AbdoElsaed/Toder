import { useState } from "react";
import { Box, TextField, Stack, Button } from "@mui/material";

import { useAuth } from "../../shared/Auth";
import { editProject } from "../../../utils/db/projects";

const styles = {
  boxStyle: {
    width: "100%",
    margin: "10px 5px",
    boxShadow: "1px 1px 1px #222",
    p: 2,
    border: "1px solid #333",
    borderRadius: "10px",
    backgroundColor: "#1C1B1B",
  },
  input: {
    marginBottom: "2px",
    marginLeft: "5px",
  },
};

const EditIssueView = ({
  task,
  setEditView,
  project,
  setProject,
  type,
  setTodoTasks,
  setInprogressTasks,
  setDoneTasks,
}) => {
  const [name, setName] = useState(task.name ? task.name : "");
  const [description, setDescription] = useState(
    task.description ? task.description : ""
  );

  const { projectsDB } = useAuth();

  let actions = {
    todo: setTodoTasks,
    inprogress: setInprogressTasks,
    done: setDoneTasks,
  };

  const handleCancel = () => {
    setEditView(false);
  };

  const handleSubmit = async () => {
    let sections = ["todo", "inprogress", "done"];
    let issues = project.sections[type];
    const newIssues = issues.map((s) => {
      if (s.name === task.name && s._id === task._id) {
        s.name = name;
        s.description = description;
      }
      return s;
    });
    actions[type](newIssues);
    project.sections[type] = newIssues;
    if (sections.includes(type)) {
      let p = await projectsDB.get(project._id);
      p.sections[type] = newIssues;
      setProject(p);
      await editProject(projectsDB, p);
    }
    handleCancel();
  };

  return (
    <Box sx={styles.boxStyle}>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={styles.input}
            id="standard-basic"
            placeholder="Task name"
            variant="standard"
            required
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            InputProps={{ disableUnderline: true }}
          />
          <TextField
            sx={styles.input}
            id="standard-basic"
            placeholder="Description"
            variant="standard"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
            InputProps={{ disableUnderline: true }}
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

export default EditIssueView;
