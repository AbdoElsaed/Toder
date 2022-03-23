import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, List, Typography, Button } from "@mui/material";
import MoreTimeIcon from "@mui/icons-material/MoreTime";

import Item from "./Item";
import CompletedTasks from "./Completed";
import RescheduleBtn from "../../Buttons/RescheduleBtn";

const TasksList = ({
  title,
  date,
  tasks,
  completed,
  showCompleted,
  upcoming,
  showOverdueBtn,
  overdue,
}) => {
  const [itemIsEdited, setItemIsEdited] = useState(false);
  let navigate = useNavigate();
  return (
    <>
      {showOverdueBtn ? (
        <Button
          variant="text"
          size="small"
          startIcon={<MoreTimeIcon />}
          sx={{ color: "#de4c4a", textTransform: "none" }}
          onClick={() => navigate("/overdue")}
        >
          Overdue Tasks
        </Button>
      ) : null}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{ color: "#DDD" }}
          variant="h6"
          component="div"
          gutterBottom
        >
          {title}
          <span style={{ color: "#999", fontSize: "14px" }}> {date} </span>
        </Typography>
        {overdue && tasks.length ? <RescheduleBtn /> : null}
        <List
          sx={{ width: "100%", maxWidth: "65%", bgcolor: "background.paper" }}
        >
          {tasks.length ? (
            tasks.map((task) => (
              <Item
                key={task._id}
                task={task}
                itemIsEdited={itemIsEdited}
                setItemIsEdited={setItemIsEdited}
                upcoming={upcoming}
              />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              {overdue
                ? 'No overdue tasks :)'
                : upcoming
                ? "Start planning for ur future!"
                : "No tasks yet, start adding your tasks!"}
            </p>
          )}
        </List>
        {showCompleted && completed.length ? (
          <CompletedTasks tasks={completed} />
        ) : null}
      </Box>
    </>
  );
};

export default TasksList;
