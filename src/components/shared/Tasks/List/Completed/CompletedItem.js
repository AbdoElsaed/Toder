/* eslint-disable no-restricted-globals */
import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { pink } from "@mui/material/colors";

import { useAuth } from "../../../Auth";
import { editTask } from "../../../../../utils/db/tasks";

const CompletedItem = ({ task }) => {
  const [checked, setChecked] = useState(true);

  const { refreshTasks, tasksDB } = useAuth();

  const onHover = () => {
    setChecked(!checked);
  };

  const handleUnComplete = async () => {
    task.completed = false;
    const res = await editTask(tasksDB, task);
    await refreshTasks();
    console.log({ res });
  };

  return (
    <>
      <ListItem sx={{ margin: "0px 15px" }} disablePadding>
        <ListItemIcon>
          <Checkbox
            size="medium"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            onClick={handleUnComplete}
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": task.name }}
            color="success"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ maxWidth: "85%", textDecoration: "line-through" }}
          primary={task.name}
          secondary={task.description ? task.description : null}
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default CompletedItem;
