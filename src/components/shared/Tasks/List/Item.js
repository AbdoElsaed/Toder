/* eslint-disable no-restricted-globals */
import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import { green } from "@mui/material/colors";

import EditItemView from "./EditItemView";

import ShowTask from "../../../modals/ShowTask";

import { useAuth } from "../../Auth";
import { deleteTask, editTask } from "../../../../utils/db/tasks";

const Item = ({ task, itemIsEdited, setItemIsEdited, upcoming }) => {
  const [editView, setEditView] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [openShowTask, setOpenShowTask] = useState(false);

  const { refreshTasks, tasksDB } = useAuth();

  const onHover = () => {
    setChecked(!checked);
  };

  const handleShowAction = () => {
    if (editView) {
      setShowActions(false);
    } else {
      setShowActions(true);
    }
  };

  const handleHideAction = () => {
    setShowActions(false);
  };

  const handleComplete = async () => {
    task.completed = true;
    const res = await editTask(tasksDB, task);
    await refreshTasks();
    console.log({ res });
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${task.name} ?`)) {
      await deleteTask({ db: tasksDB, id: task._id });
      await refreshTasks();
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
        secondaryAction={
          <div
            style={{ display: showActions && !editView ? "inline" : "none" }}
          >
            <IconButton
              sx={{ color: "#DDD" }}
              size="small"
              edge="end"
              aria-label="start focus session"
              onClick={() => {}}
              title="start focus session"
            >
              <PlayCircleOutlineIcon style={{ color: '#2c8042' }}/>
            </IconButton>
            <IconButton
              sx={{ color: "#DDD" }}
              size="small"
              edge="end"
              aria-label="edit"
              onClick={handleEditView}
              title="edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#DDD" }}
              size="small"
              onClick={handleDelete}
              edge="end"
              aria-label="delete"
              title="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        }
        disablePadding
      >
        {editView ? (
          <EditItemView task={task} setEditView={setEditView} />
        ) : (
          <ListItemButton role={undefined} dense>
            {!upcoming ? (
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
                  inputProps={{ "aria-labelledby": task.name }}
                  color="success"
                  sx={{
                    color: green[800],
                    "&.Mui-checked": {
                      color: green[600],
                    },
                  }}
                />
              </ListItemIcon>
            ) : null}
            <ListItemText
              sx={{ maxWidth: "85%" }}
              onClick={() => setOpenShowTask(true)}
              primary={task.name}
              secondary={task.description ? task.description : null}
            />
          </ListItemButton>
        )}
      </ListItem>
      <Divider component="li" />
      <ShowTask open={openShowTask} setOpen={setOpenShowTask} task={task} />
    </>
  );
};

export default Item;
