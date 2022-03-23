import { useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import AddTask from "../modals/AddTask";
import AddProject from "../modals/AddProject";

const styles = {
  root: {
    position: "fixed",
    bottom: 20,
    right: 20,
    height: 320,
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  SpeedDial: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
};

const actions = [
  { icon: <AssignmentIcon />, name: "Task" },
  { icon: <AccountTreeIcon />, name: "Project" },
];

export default function BasicSpeedDial() {

  const [taskModal, setTaskModal] = useState(false);
  const [projectModal, setProjectModal] = useState(false);

  const handleClick = (name) => {
    if(name === 'Task') {
      setTaskModal(true);
    } else if (name === 'Project') {
      setProjectModal(true);
    }
  }

  return (
    <Box sx={styles.root}>
      <SpeedDial
        ariaLabel="SpeedDial"
        sx={styles.SpeedDial}
        icon={<SpeedDialIcon />}
        FabProps={{ color: "secondary", position: "fixed" }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => handleClick(action.name)}
          />
        ))}
      </SpeedDial>


      <AddTask open={taskModal} setOpen={setTaskModal} />
      <AddProject open={projectModal} setOpen={setProjectModal} />

    </Box>
  );
}
