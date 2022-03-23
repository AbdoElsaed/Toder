import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";

import PouchDB from "pouchdb";
import {
  getAllTasks,
  getTodayTasks,
  getUpcomingTasks,
  getOverdueTasks,
} from "../../utils/db/tasks";

import { getAllProjects } from "../../utils/db/projects";

PouchDB.plugin(require("pouchdb-find").default);

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

let tasksDB = new PouchDB("tasks", { auto_compaction: true });
let projectsDB = new PouchDB("projects", { auto_compaction: true });

export const AuthProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [completedTodayTasks, setCompletedTodayTasks] = useState([]);
  const [unCompletedTodayTasks, setUnCompletedTodayTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const componentMounted = useRef(true);

  useEffect(() => {
    // initialize db config
    if (componentMounted.current) {
      refreshTasks();
      refreshProjects();
    }
    return () => {
      componentMounted.current = false;
    };
  }, []);

  const refreshTasks = async () => {
    const todayDocs = await getTodayTasks(tasksDB);
    setTodayTasks(todayDocs);

    const completedTodayDocs = todayDocs.filter(
      (doc) => doc.completed === true
    );
    setCompletedTodayTasks(completedTodayDocs);

    const unCompletedTodayDocs = todayDocs.filter(
      (doc) => doc.completed === false
    );
    setUnCompletedTodayTasks(unCompletedTodayDocs);

    const upcomingDocs = await getUpcomingTasks(tasksDB);
    setUpcomingTasks(upcomingDocs);

    const overdueDocs = await getOverdueTasks(tasksDB);
    setOverdueTasks(overdueDocs);

    const allDocs = await getAllTasks(tasksDB);
    setAllTasks(allDocs);

    console.log({ todayDocs });
    console.log({ upcomingDocs });
    console.log({ allDocs });
    console.log({ completedTodayDocs });
    console.log({ unCompletedTodayDocs });
    console.log({ overdueDocs });
  };

  const refreshProjects = async () => {
    const allProjects = await getAllProjects(projectsDB);
    setProjects(allProjects);
    console.log({ allProjects });
  };

  return (
    <AuthContext.Provider
      value={{
        allTasks,
        setAllTasks,
        todayTasks,
        upcomingTasks,
        overdueTasks,
        setTodayTasks,
        tasksDB,
        projectsDB,
        refreshTasks,
        refreshProjects,
        completedTodayTasks,
        unCompletedTodayTasks,
        projects,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
