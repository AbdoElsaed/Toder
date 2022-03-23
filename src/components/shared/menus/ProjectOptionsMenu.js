/* eslint-disable no-restricted-globals */
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import {
  Archive as ArchiveIcon,
  Delete as DeleteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

import { useAuth } from "../Auth";
import { deleteProject, editProject } from "../../../utils/db/projects";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function OptionsMenu({
  anchorEl,
  open,
  handleClose,
  project,
  favList,
  setProjectModal,
}) {
  const { projectsDB, refreshProjects } = useAuth();

  const handleOpenEditProject = () => {
    setProjectModal(true);
    handleClose();
  };

  const handleDeleteProject = async () => {
    if (confirm(`Are you sure you want to delete ${project.name} project ?`)) {
      await deleteProject(projectsDB, project._id);
      await refreshProjects();
      handleClose();
    }
    handleClose();
  };

  const handleAddToFav = async () => {
    project.isFav = !project.isFav;
    await editProject(projectsDB, project);
    await refreshProjects();
    handleClose();
  };

  return (
    <div>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenEditProject} disableRipple>
          <EditIcon />
          Edit project
        </MenuItem>
        {favList ? (
          <MenuItem onClick={handleAddToFav} disableRipple>
            <FavoriteBorderIcon />
            {project.isFav ? "Remove from favorites" : "Add to favorites"}
          </MenuItem>
        ) : !project.isFav ? (
          <MenuItem onClick={handleAddToFav} disableRipple>
            <FavoriteBorderIcon />
            Add to favorites
          </MenuItem>
        ) : null}
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <MenuItem onClick={handleDeleteProject} disableRipple>
          <DeleteIcon />
          Delete project
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
