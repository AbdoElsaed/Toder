import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import CompletedItem from "./CompletedItem";

const CompletedList = ({ tasks }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "65%",
        bgcolor: "background.paper",
        marginTop: "60px",
        marginBottom: "50px",
      }}
      component="nav"
      aria-labelledby="completed-tasks"
    >
      <div
        style={{
          display: "flex",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <Button
          size="small"
          variant="outlined"
          endIcon={open ? <ExpandLess /> : <ExpandMore />}
          sx={{ border: "none", "&:hover": { border: "none" } }}
        >
          Show completed tasks
        </Button>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {tasks.map((task) => (
            <CompletedItem key={task._id} task={task} />
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default CompletedList;
