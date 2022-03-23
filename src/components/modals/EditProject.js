import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { editProject } from "../../utils/db/projects";
import { useAuth } from "../shared/Auth";

const styles = {
  boxStyle: {
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxWidth: 500,
    bgcolor: "background.paper",
    boxShadow: "1px 1px 1px #222",
    p: 4,
    border: "1px solid #222",
    borderRadius: "10px",
    paddingTop: 3,
    backgroundColor: "#222",
  },
  input: {
    marginBottom: "8px",
  },
  btn: {
    marginTop: "25px",
    fontWeight: 550,
    // backgroundColor: "#3C7EBB",
    // "&:hover": {
    //   backgroundColor: "#2b5384",
    // },
  },
};

export default function EditProject({ open, setOpen, project }) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(project.name);
  const [category, setCategory] = useState(project.category);
  const [isFav, setIsFav] = useState(project.isFav);

  const { projectsDB, refreshProjects } = useAuth();

  const resetForm = () => {
    setName(project.name);
    setCategory(project.category);
    setIsFav(project.isFav);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSubmit = async () => {
    setLoading(true);
    project.name = name;
    project.category = category;
    project.isFav = isFav;
    const res = await editProject(projectsDB, project);
    if (res.ok === true) {
      setLoading(false);
      handleClose();
      await refreshProjects();
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={styles.boxStyle}
        >
          <Typography
            sx={{ textAlign: "center" }}
            variant="h6"
            gutterBottom
            component="div"
          >
            Edit Project
          </Typography>
          <div>
            <TextField
              sx={styles.input}
              id="standard-basic"
              label="Project name"
              variant="standard"
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              sx={styles.input}
              id="standard-basic"
              label="Category"
              variant="standard"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <FormControlLabel
              sx={{ marginTop: "10px" }}
              control={
                <Switch
                  checked={isFav}
                  onChange={(e) => setIsFav(e.target.checked)}
                />
              }
              label="Add to favorites"
            />
            <br />
            <LoadingButton
              color="success"
              onClick={handleSubmit}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              sx={styles.btn}
            >
              Edit
            </LoadingButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
