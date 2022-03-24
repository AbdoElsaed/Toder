/* eslint-disable no-restricted-globals */
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayCircleOutline as PlayCircleIcon,
} from "@mui/icons-material";

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
    backgroundColor: "#333232",
    borderRadius: 2,
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

export default function IssueOptionsMenu({
  anchorEl,
  open,
  handleClose,
  setEditView,
  task,
  handleDeleteIssue,
}) {
  const handleDeleteProject = async () => {
    if (confirm(`Are you sure you want to delete ${task.name} issue ?`)) {
      await handleDeleteIssue();
    }
    handleClose();
  };

  const handleEditView = () => {
    handleClose();
    setEditView(true);
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
        <MenuItem onClick={handleClose} disableRipple>
          <PlayCircleIcon style={{ color: "#2c8042" }} />
          Start Focus Session
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleEditView} disableRipple>
          <EditIcon />
          Edit Issue
        </MenuItem>
        <MenuItem onClick={handleDeleteProject} disableRipple>
          <DeleteIcon />
          Delete Issue
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
