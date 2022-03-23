import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, ListItemText, ListItemButton } from "@mui/material";

import OptionsMenu from "../shared/menus/ProjectOptionsMenu";
import EditProject from "../modals/EditProject";

const SingleListItem = ({ project, isOpen, favList, handleDrawerClose }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [optionsListBtn, setOptionsListBtn] = useState(false);
  const [projectModal, setProjectModal] = useState(false);

  // close options list if it's not closed
  useEffect(() => {
    if (!isOpen) {
      setOptionsListBtn(false);
      setAnchorEl(null);
    }
  }, [isOpen]);

  const optionsMenuOpen = Boolean(anchorEl);

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionsClose = () => {
    setAnchorEl(null);
    setOptionsListBtn(false);
    handleDrawerClose();
  };

  let navigate = useNavigate();

  return (
    <div
      key={project._id}
      style={{ display: "flex" }}
      onMouseEnter={() => setOptionsListBtn(true)}
      onMouseLeave={() => setOptionsListBtn(false)}
    >
      <ListItemButton
        onClick={() => {
          navigate(`/project/${project._id}`);
        }}
        sx={{ pl: 4, pt: 1, pb: 1 }}
        style={{ background: "none" }}
      >
        <ListItemText
          primary={
            isOpen
              ? project.name.length < 14
                ? project.name
                : project.name.slice(0, 14) + "..."
              : ""
          }
        />
      </ListItemButton>
      {optionsListBtn && isOpen ? (
        <>
          <IconButton
            aria-label="options"
            component="span"
            style={{
              background: "none",
              position: "absolute",
              right: 0,
            }}
            onClick={handleOptionsClick}
          >
            <MoreHorizIcon style={{ color: "#777" }} />
          </IconButton>
          <OptionsMenu
            anchorEl={anchorEl}
            open={optionsMenuOpen}
            handleClose={handleOptionsClose}
            project={project}
            favList={favList}
            setProjectModal={setProjectModal}
          />
        </>
      ) : null}
      <EditProject open={projectModal} setOpen={setProjectModal} project={project}/>
    </div>
  );
};

export default SingleListItem;
