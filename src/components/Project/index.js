import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Typography, Box } from "@mui/material";

import { useAuth } from "../shared/Auth";

import TasksLists from "./Lists";

const Project = () => {
  let [project, setProject] = useState("");
  let params = useParams();
  const { projectsDB, projects } = useAuth();

  useEffect(() => {
    (async () => {
      let res = await projectsDB.get(params.projectId);
      console.log({ res });
      setProject(res);
    })();
  }, [params.projectId, projectsDB, projects]);

  return (
    <Box sx={{}}>
      <Typography
        sx={{ color: "#DDD", textAlign: "center", mb: "50px" }}
        variant="h6"
        component="div"
        gutterBottom
      >
        {project && project.name.charAt(0).toUpperCase() + project.name.slice(1)}
      </Typography>

      <TasksLists setProject={setProject} project={project} />
    </Box>
  );
};

export default Project;
