/* eslint-disable no-restricted-globals */
import { useState } from "react";
import {ListItem, ListItemIcon, ListItemText, Checkbox, IconButton, Box} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { green } from "@mui/material/colors";

import EditItemView from "./EditItemView";

import { useAuth } from "../../../Auth";
import { editTask } from "../../../../../utils/db/tasks";

const Item = ({ subTask, task, completedItem }) => {
  const [editView, setEditView] = useState(false);
  const [checked, setChecked] = useState(completedItem ? true : false);
  const [showActions, setShowActions] = useState(false);

  const { refreshTasks, tasksDB } = useAuth();

  const onHover = () => {
    setChecked(!checked);
  };

  const handleShowAction = () => {
    if (editView || completedItem) {
      setShowActions(false);
    } else {
      setShowActions(true);
    }
  };

  const handleHideAction = () => {
    setShowActions(false);
  };

  const handleComplete = async () => {
    const subs = task.subTasks.map((s) => {
      if (s._id === subTask._id) {
        s.completed = !s.completed;
      }
      return s;
    });
    task.subTasks = subs;
    const res = await editTask(tasksDB, task);
    await refreshTasks();
    console.log({ res });
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${subTask.name} ?`)) {
      const subs = task.subTasks.filter((s) => s._id !== subTask._id);
      task.subTasks = subs;
      const res = await editTask(tasksDB, task);
      await refreshTasks();
      console.log({ res });
    }
  };

  const handleEditView = () => {
    setEditView(true);
    setShowActions(false);
  };

  return (
    <>
      <ListItem
        onMouseEnter={handleShowAction}
        onMouseLeave={handleHideAction}
        disablePadding
        secondaryAction={
          <div
            style={{ display: showActions && !editView ? "inline" : "none" }}
          >
            <IconButton
              sx={{ color: "#DDD" }}
              size="small"
              edge="end"
              aria-label="edit"
              onClick={handleEditView}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#DDD" }}
              size="small"
              onClick={handleDelete}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        }
      >
        {editView ? (
          <EditItemView
            task={task}
            subTask={subTask}
            setEditView={setEditView}
          />
        ) : (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <ListItemIcon>
              <Checkbox
                size="medium"
                onMouseEnter={onHover}
                onMouseLeave={onHover}
                onClick={handleComplete}
                edge="start"
                checked={checked}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": subTask.name }}
                color="success"
                sx={{
                  color: green[800],
                  "&.Mui-checked": {
                    color: green[600],
                  },
                }}
              />
            </ListItemIcon>
            <ListItemText
              sx={{
                maxWidth: "100%",
                textDecoration: completedItem ? "line-through" : null,
              }}
              primary={subTask.name}
              secondary={subTask.description ? subTask.description : null}
            />
          </Box>
        )}
      </ListItem>
    </>
  );
};

export default Item;
