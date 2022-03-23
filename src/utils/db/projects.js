export const createProject = async (db, doc) => {
  const obj = {
    name: doc.name,
    category: doc.category,
    isFav: doc.isFav,
    created_at: Date.now(),
    completed: false,
    tasks: [],
    sections: {
      todo: [],
      inprogress: [],
      done: [],
    },
  };
  const result = await db.post(obj);
  return result;
};

export const getAllProjects = async (db) => {
  const projectsDocs = await db.allDocs({
    include_docs: true,
    descending: true,
  });
  const res = projectsDocs.rows.map((row) => row.doc);
  return res;
};

export const getProjectById = async (db, id) => {
  const res = await db.get(id);
  return res;
};

export const editProject = async (db, project, options = {}) => {
  const res = await db.put(project, options);
  return res;
};


export const deleteProject = async (db, id) => {
  const doc = await db.get(id);
  const res = await db.remove(doc);
  return res;
};