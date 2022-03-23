import { useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import FabBtn from "./components/shared/Fab";
import Drawer from "./components/Drawer";
import TodayTasks from "./components/Tasks/Today";
import OverdueTasks from "./components/Tasks/Overdue";
import UpcomingTasks from "./components/Tasks/Upcoming";
import Project from "./components/Project";
import { AuthProvider } from "./components/shared/Auth";

function App() {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          text: {},
          background: {
            default: "#1F1F1F",
            paper: "#1F1F1F",
          },
          secondary: {
            // main: '#222222'
            // main: '#262729'
            main: "#2979ff",
          },
          Fab: {
            main: "#2196f3",
          },
        },
      }),
    []
  );
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <AuthProvider>
          <Drawer>
            <Routes>
              <Route path="/" element={<TodayTasks />} exact />
              <Route path="upcoming" element={<UpcomingTasks />} exact />
              <Route path="overdue" element={<OverdueTasks />} exact />
              <Route path="/project/:projectId" element={<Project />} exact />
            </Routes>
            <FabBtn />
          </Drawer>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
