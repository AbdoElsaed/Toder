import { useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import TodayIcon from "@mui/icons-material/Today";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SingleListItem from "./SingleProjectListItem";

import { useAuth } from "../shared/Auth";

export default function DrawerNav({
  handleDrawerOpen,
  handleDrawerClose,
  isOpen,
}) {
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);

  const { projects } = useAuth();
  let navigate = useNavigate();

  const handleClickProjects = () => {
    setProjectsOpen(!projectsOpen);
  };
  const handleClickFav = () => {
    setFavOpen(!favOpen);
  };

  return (
    <List
      onMouseOver={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: 300,
        bgcolor: "#282828",
        marginTop: 0,
      }}
      component="nav"
    >
      <ListItemButton onClick={() => navigate(`/`)}>
        <ListItemIcon>
          <TodayIcon sx={{ color: "#2C8042" }} />
        </ListItemIcon>
        <ListItemText primary="Today" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate(`/upcoming`)}>
        <ListItemIcon>
          <EventAvailableIcon sx={{ color: "#CCC" }} />
        </ListItemIcon>
        <ListItemText primary="Upcoming" />
      </ListItemButton>

      <ListItemButton onClick={handleClickFav}>
        <ListItemIcon>
          <FavoriteIcon sx={{ color: "#3C7EBB" }} />
        </ListItemIcon>
        <ListItemText primary="Favorites" />
        {favOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={favOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {projects.length
            ? projects
                .filter((p) => p.isFav)
                .map((project) => (
                  <SingleListItem key={project._id} project={project} isOpen={isOpen} favList={true}/>
                ))
            : null}
        </List>
      </Collapse>

      <ListItemButton onClick={handleClickProjects}>
        <ListItemIcon>
          <AccountTreeIcon sx={{ color: "#B1361E" }} />
        </ListItemIcon>
        <ListItemText primary="projects" />
        {projectsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={projectsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {projects.length
            ? projects.map((project) => (
                <SingleListItem key={project._id} project={project} isOpen={isOpen} handleDrawerClose={handleDrawerClose}/>
              ))
            : null}
        </List>
      </Collapse>
    </List>
  );
}
