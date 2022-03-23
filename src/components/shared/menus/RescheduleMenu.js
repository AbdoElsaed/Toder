/* eslint-disable no-restricted-globals */
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import TodayIcon from "@mui/icons-material/Today";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import NextWeekIcon from "@mui/icons-material/NextWeek";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";
import Grid from "@mui/material/Grid";

import add from "date-fns/add";

import { rescheduleTasks } from "../../../utils/db/tasks";
import { useAuth } from "../Auth";

const minDate = new Date(`${new Date().getFullYear()}-01-01T00:00:00.000`);
const maxDate = new Date(`${new Date().getFullYear()}-12-31T00:00:00.000`);

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#2F2F2F",
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 250,
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

export default function RescheduleMenu({ anchorEl, open, handleClose }) {
  const { tasksDB, overdueTasks, refreshTasks } = useAuth();
  const [date, setDate] = useState(new Date());

  const handleReschedule = async (date) => {
    let tasks = overdueTasks.map((t) => {
      t.scheduleDate = date;
      t.scheduled_at = new Date(date).setHours(0, 0, 0, 0);
      return t;
    });
    handleClose();
    await rescheduleTasks(tasksDB, tasks);
    await refreshTasks();
  };

  const handleCalenderChange = async (newDate) => {
    setDate(newDate);
    await handleReschedule(newDate);
  };

  const handleClick = async (type) => {
    if (type === "today") {
      let today = new Date();
      return await handleReschedule(today);
    } else if (type === "tomorrow") {
      let tomorrow = add(new Date(), {
        days: 1,
      });
      return await handleReschedule(tomorrow);
    } else if (type === "nextweek") {
      let nextweek = add(new Date(), {
        days: 7,
      });
      return await handleReschedule(nextweek);
    }
  };

  return (
    <div>
      <StyledMenu
        id="reschedule-menu"
        MenuListProps={{
          "aria-labelledby": "reschedule-menu",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClick("today")} disableRipple>
          <TodayIcon style={{ color: "green" }} />
          Today
        </MenuItem>
        <MenuItem onClick={() => handleClick("tomorrow")} disableRipple>
          <Brightness4Icon style={{ color: "#e68d17" }} />
          Tomorrow
        </MenuItem>
        <MenuItem onClick={() => handleClick("nextweek")} disableRipple>
          <NextWeekIcon style={{ color: "#5297ff" }} />
          Next Week
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={1}>
            <CalendarPicker
              sx={{ padding: 0 }}
              views={["month", "day"]}
              disablePast
              date={date}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(newDate) => handleCalenderChange(newDate)}
            />
          </Grid>
        </LocalizationProvider>
      </StyledMenu>
    </div>
  );
}
