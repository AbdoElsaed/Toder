import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import IssueOptionsMenu from "../../shared/menus/IssueOptionsMenu";
import EditIssueView from "./EditIssueView";
import { useAuth } from "../../shared/Auth";
import { editProject } from "../../../utils/db/projects";

const styles = {
  item: {
    border: "1px solid #333",
    margin: "8px",
    padding: "10px",
    backgroundColor: "#282828",
    borderRadius: "6px",
    wordWrap: "break-word",
    maxWidth: "100%",
    position: "relative",
  },
  title: {},
  description: {
    color: "#888",
    maxWidth: "23%",
  },
  moreIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "#666",
    cursor: "pointer",
  },
};

const SingleItem = ({
  task,
  project,
  setProject,
  type,
  setTodoTasks,
  setInprogressTasks,
  setDoneTasks,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMoreIcon, setShowMoreIcon] = useState(false);
  const [editView, setEditView] = useState(false);

  const { projectsDB } = useAuth();

  const optionsMenuOpen = Boolean(anchorEl);

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionsClose = () => {
    setAnchorEl(null);
    setShowMoreIcon(false);
  };

  let actions = {
    todo: setTodoTasks,
    inprogress: setInprogressTasks,
    done: setDoneTasks,
  };

  const handleDeleteIssue = async () => {
    let sections = ["todo", "inprogress", "done"];
    let issues = project.sections[type];
    const newIssues = issues.filter((s) => s._id !== task._id);
    actions[type](newIssues);
    project.sections[type] = newIssues;
    if (sections.includes(type)) {
      let p = await projectsDB.get(project._id);
      p.sections[type] = newIssues;
      setProject(p);
      await editProject(projectsDB, p);
    }
    handleOptionsClose();
  };

  return (
    <div>
      {!editView ? (
        <div
          style={styles.item}
          onMouseEnter={() => setShowMoreIcon(true)}
          onMouseLeave={() => setShowMoreIcon(false)}
        >
          {showMoreIcon ? (
            <MoreHorizIcon
              style={styles.moreIcon}
              onClick={handleOptionsClick}
            />
          ) : null}
          <span style={styles.title}> {task.name} </span> <br />
          <span style={styles.description}>
            {task.description && task.description.length > 32
              ? task.description.slice(0, 32) + "..."
              : task.description}
          </span>
          <IssueOptionsMenu
            anchorEl={anchorEl}
            open={optionsMenuOpen}
            handleClose={handleOptionsClose}
            setEditView={setEditView}
            task={task}
            handleDeleteIssue={handleDeleteIssue}
          />
        </div>
      ) : (
        <EditIssueView
          task={task}
          setEditView={setEditView}
          project={project}
          setProject={setProject}
          type={type}
          setTodoTasks={setTodoTasks}
          setInprogressTasks={setInprogressTasks}
          setDoneTasks={setDoneTasks}
        />
      )}
    </div>
  );
};

export default SingleItem;
