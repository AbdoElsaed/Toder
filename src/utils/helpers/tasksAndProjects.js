export const addTaskToProject = async ({
  tasksDB,
  projectsDB,
  taskID,
  project,
  refreshProjects,
}) => {
  if (project === "random") {
    return;
  }
  let task = await tasksDB.get(taskID);
  project.tasks = project.tasks.length ? [...project.tasks, task] : [task];
  await projectsDB.put(project);
  await refreshProjects();
};

export const getUniqueId = () => {
  return String(
    Math.floor(Math.random() * Math.floor(Math.random() * 100 * Date.now()))
  );
};
