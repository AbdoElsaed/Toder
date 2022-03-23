/* eslint-disable no-undef */
// export const checkAndInitDesignDoc_Tasks = async (db) => {
//   db.get("_design/tasksQueries")
//     .then(function (doc) {
//       console.log("tasks design document exists");
//     })
//     .catch(function (err) {
//       if (err.status === 404) {
//         let ddoc = {
//           _id: "_design/tasksQueries",
//           views: {
//             byToday: {
//               map: function (doc) {
//                 if (
//                   new Date(doc.scheduled_at).setHours(0, 0, 0, 0) ===
//                   new Date().setHours(0, 0, 0, 0)
//                 ) {
//                   emit(doc.scheduled_at, doc.name);
//                 }
//               }.toString(),
//             },
//             byUpcoming: {
//               map: function (doc) {
//                 if (
//                   new Date(doc.scheduled_at).setHours(0, 0, 0, 0) >
//                   new Date().setHours(0, 0, 0, 0)
//                 ) {
//                   emit(doc.scheduled_at, doc.name);
//                 }
//               }.toString(),
//             },
//           },
//         };

//         db.put(ddoc)
//           .then(function (res) {
//             console.log("tasks design document created successfully");
//           })
//           .catch(function (err) {
//             console.log(`err creating tasks design document, ${err}`);
//           });
//       } else {
//         console.log(err);
//       }
//     });
// };

export const getTodayTasks = async (db) => {
  // const res = await db.query("tasksQueries/byToday", {
  //   include_docs: true,
  //   descending: true,
  // });
  // const docs = res.rows.map((row) => row.doc);
  // return docs.length ? docs : [];

  db.createIndex({
    index: { fields: ["scheduled_at"] },
  });
  const res = await db.find({
    selector: { scheduled_at: { $eq: new Date().setHours(0, 0, 0, 0) } },
    sort: ["scheduled_at"],
  });
  return res.docs;
};

export const getUpcomingTasks = async (db) => {
  // const res = await db.query("tasksQueries/byUpcoming", {
  //   include_docs: true,
  //   descending: true,
  // });
  // const docs = res.rows.map((row) => row.doc);
  // return docs.length ? docs : [];

  db.createIndex({
    index: { fields: ["scheduled_at"] },
  });
  const res = await db.find({
    selector: { scheduled_at: { $gt: new Date().setHours(0, 0, 0, 0) } },
    sort: ["scheduled_at"],
  });
  return res.docs;
};

export const getOverdueTasks = async (db) => {
  db.createIndex({
    index: { fields: ["scheduled_at"] },
  });
  const res = await db.find({
    selector: {
      scheduled_at: { $lt: new Date().setHours(0, 0, 0, 0) },
      completed: { $eq: false },
    },
    sort: ["scheduled_at"],
  });
  return res.docs;
};

export const getAllTasks = async (db) => {
  const result = await db.allDocs({ include_docs: true, descending: true });
  const docs = result.rows.map((row) => row.doc);
  return docs.length ? docs : [];
};

export const createTask = async (db, doc) => {
  const obj = {
    name: doc.name,
    description: doc.description,
    project: doc.project,
    scheduleDate: doc.scheduled_at,
    scheduled_at: new Date(doc.scheduled_at).setHours(0, 0, 0, 0),
    created_at: Date.now(),
    completed: false,
    subTasks: [],
    comments: [],
    status: doc.status ? doc.status : "general",
  };
  const result = await db.post(obj);
  return result;
};

export const editTask = async (db, doc) => {
  const res = await db.put(doc);
  return res;
};

export const deleteTask = async ({ db, id }) => {
  const doc = await db.get(id);
  const res = await db.remove(doc);
  return res;
};

export const addSubTask = async ({ db, task }) => {
  const res = await db.put(task);
  return res;
};

export const rescheduleTasks = async (db, tasks) => {
  try {
    const res = await db.bulkDocs(tasks);
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};
