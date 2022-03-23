import { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Droppable, Draggable } from "react-beautiful-dnd";

import SingleItem from "./SingleItem";
import AddIssue from "./AddIssue";

const styles = {
  root: {
    width: "100%",
    maxWidth: "28%",
    bgcolor: "background.paper",
    margin: "0px 20px",
  },
  container: {
    padding: "5px 10px",
    borderRadius: "10px",
    maxHeight: "400px",
    overflowY: "hidden",
    scrollMargin: '0px 0px 0px 0px',
    scrollPadding: '0px 0px 0px 0px'
  },
  item: {
    border: "1px solid #333",
    margin: "8px",
    padding: "10px",
    backgroundColor: "#282828",
    borderRadius: "6px",
  },
  addTaskContainer: {
    margin: "15px 20px",
  },
  addBox: {},
};

const SingleList = ({
  tasks,
  type,
  project,
  setDoneTasks,
  setInprogressTasks,
  setTodoTasks,
  setProject,
}) => {
  const [showAddIssue, setShowAddIssue] = useState(false);
  const [overflowStatus, setOverflowStatus] = useState("hidden");

  const toggleAddIssue = () => {
    setShowAddIssue(!showAddIssue);
  };

  return (
    <>
      <Droppable droppableId={type}>
        {(provided) => (
          <Box
            sx={styles.root}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Typography sx={{ color: "#DDD", ml: "10px" }} variant="span">
              {(type === "inprogress" ? "in progress" : type).toUpperCase()}
            </Typography>
            <div
              style={{ ...styles.container, overflowY: overflowStatus }}
              onMouseEnter={() => setOverflowStatus("auto")}
              onMouseLeave={() => setOverflowStatus("hidden")}
            >
              {tasks && tasks.length
                ? tasks.map((task, index) => {
                    return (
                      <Draggable
                        key={task._id}
                        draggableId={`${task._id}-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            key={index}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SingleItem task={task} />
                          </div>
                        )}
                      </Draggable>
                    );
                  })
                : null}
            </div>
            {provided.placeholder}
            <div style={styles.addTaskContainer}>
              {showAddIssue ? (
                <AddIssue
                  type={type}
                  project={project}
                  setTodoTasks={setTodoTasks}
                  setInprogressTasks={setInprogressTasks}
                  setDoneTasks={setDoneTasks}
                  toggleAddIssue={toggleAddIssue}
                  setProject={setProject}
                />
              ) : (
                <Button
                  sx={{ color: "#de4c4a", textTransform: "none" }}
                  variant="text"
                  startIcon={<AddCircleIcon />}
                  size="small"
                  onClick={toggleAddIssue}
                >
                  Add Issue
                </Button>
              )}
            </div>
          </Box>
        )}
      </Droppable>
    </>
  );
};

export default SingleList;
