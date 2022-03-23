import { useState } from "react";

import { Box, Button, TextField } from "@mui/material";

import { getUniqueId } from "../../../utils/helpers/tasksAndProjects";
import { useAuth } from "../../shared/Auth";
import { editProject } from "../../../utils/db/projects";

const AddIssue = ({
  type,
  project,
  toggleAddIssue,
  setTodoTasks,
  setInprogressTasks,
  setDoneTasks,
  setProject,
}) => {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  const { projectsDB } = useAuth();
  let actions = {
    todo: setTodoTasks,
    inprogress: setInprogressTasks,
    done: setDoneTasks,
  };
  const handleSubmit = async () => {
    let sections = ["todo", "inprogress", "done"];
    let issue = {
      _id: getUniqueId(),
      name: taskName,
      description: taskDesc,
    };
    let newTasks = [...project?.sections[type], issue];
    actions[type](newTasks);
    if (sections.includes(type)) {
      let p = await projectsDB.get(project._id);
      p.sections[type] = newTasks;
      setProject(p);
      await editProject(projectsDB, p);
    }
    setTaskName("");
    setTaskDesc("");
  };

  return (
    <>
      <Box
        sx={{
          width: "90%",
          backgroundColor: "#1c1b1b",
          border: "1px solid #444",
          borderRadius: "8px",
          paddingBottom: 2,
          paddingTop: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
            padding: "0px 10px",
          }}
        >
          <TextField
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            label=""
            placeholder="Issue"
            variant="standard"
            size="small"
            sx={{ width: "100%", mb: "10px", border: "none" }}
            // InputProps={{
            //   disableUnderline: true,
            // }}
          />
          <TextField
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            label=""
            placeholder="description"
            variant="standard"
            size="small"
            sx={{ width: "100%" }}
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
          variant="contained"
          sx={{ ml: 1 }}
          color="success"
          disabled={!taskName}
        >
          Add Task
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          sx={{ ml: 1 }}
          onClick={toggleAddIssue}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default AddIssue;
