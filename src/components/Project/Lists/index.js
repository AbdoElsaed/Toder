import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import SingleList from "./SingleList";
import { editProject } from "../../../utils/db/projects";
import { useAuth } from "../../shared/Auth";

const TasksLists = ({ project, setProject }) => {
  let [generalTasks, setGeneralTasks] = useState([]);
  let [todoTasks, setTodoTasks] = useState([]);
  let [inprogressTasks, setInprogressTasks] = useState([]);
  let [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    setGeneralTasks(project.tasks);
    setTodoTasks(project?.sections?.todo);
    setInprogressTasks(project?.sections?.inprogress);
    setDoneTasks(project?.sections?.done);

    return () => {
      setGeneralTasks([]);
      setTodoTasks([]);
      setInprogressTasks([]);
      setDoneTasks([]);
    };
  }, [project]);

  const { projectsDB } = useAuth();

  const deleteItem = (list, index) => {
    return list.splice(index, 1);
  };
  const handleOnDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "todo") {
        let tempList = todoTasks;
        const [removed] = deleteItem(tempList, source.index);
        tempList.splice(destination.index, 0, removed);
        setTodoTasks(tempList);
      } else if (source.droppableId === "inprogress") {
        let tempList = inprogressTasks;
        const [removed] = deleteItem(tempList, source.index);
        tempList.splice(destination.index, 0, removed);
        setInprogressTasks(tempList);
      } else if (source.droppableId === "done") {
        let tempList = doneTasks;
        const [removed] = deleteItem(tempList, source.index);
        tempList.splice(destination.index, 0, removed);
        setDoneTasks(tempList);
      }
    } else {
      let todoList = todoTasks;
      let inprogressList = inprogressTasks;
      let doneList = doneTasks;

      if (source.droppableId === "todo") {
        const [removed] = deleteItem(todoList, source.index);
        setTodoTasks(todoList);
        if (destination.droppableId === "inprogress") {
          inprogressList.splice(destination.index, 0, removed);
          setInprogressTasks(inprogressList);
        } else if (destination.droppableId === "done") {
          doneList.splice(destination.index, 0, removed);
          setDoneTasks(doneList);
        }
      } else if (source.droppableId === "inprogress") {
        const [removed] = deleteItem(inprogressList, source.index);
        setInprogressTasks(inprogressList);
        if (destination.droppableId === "todo") {
          todoList.splice(destination.index, 0, removed);
          setTodoTasks(todoList);
        } else if (destination.droppableId === "done") {
          doneList.splice(destination.index, 0, removed);
          setDoneTasks(doneList);
        }
      } else if (source.droppableId === "done") {
        const [removed] = deleteItem(doneList, source.index);
        setDoneTasks(doneList);
        if (destination.droppableId === "todo") {
          todoList.splice(destination.index, 0, removed);
          setTodoTasks(todoList);
        } else if (destination.droppableId === "inprogress") {
          inprogressList.splice(destination.index, 0, removed);
          setInprogressTasks(inprogressList);
        }
      }
    }
    // update project
    let p = await projectsDB.get(project._id);
    p.sections.todo = todoTasks;
    p.sections.inprogress = inprogressTasks;
    p.sections.done = doneTasks;
    await editProject(projectsDB, p, { force: true });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div
        style={{ padding: "10px 50px", display: "flex", flexDirection: "row" }}
      >
        {/* <SingleList
          setProject={setProject}
          setDoneTasks={setDoneTasks}
          setInprogressTasks={setInprogressTasks}
          setTodoTasks={setTodoTasks}
          project={project}
          tasks={generalTasks}
          type="general"
        /> */}
        <SingleList
          setProject={setProject}
          setDoneTasks={setDoneTasks}
          setInprogressTasks={setInprogressTasks}
          setTodoTasks={setTodoTasks}
          project={project}
          tasks={todoTasks}
          type="todo"
        />
        <SingleList
          setProject={setProject}
          setDoneTasks={setDoneTasks}
          setInprogressTasks={setInprogressTasks}
          setTodoTasks={setTodoTasks}
          project={project}
          tasks={inprogressTasks}
          type="inprogress"
        />
        <SingleList
          setProject={setProject}
          setDoneTasks={setDoneTasks}
          setInprogressTasks={setInprogressTasks}
          setTodoTasks={setTodoTasks}
          project={project}
          tasks={doneTasks}
          type="done"
        />
      </div>
    </DragDropContext>
  );
};

export default TasksLists;
