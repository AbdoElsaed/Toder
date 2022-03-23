import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import TaskTabs from "../shared/Tabs";

const styles = {
  boxStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: 500,
    maxHeight: 500,
    bgcolor: "background.paper",
    boxShadow: "1px 1px 1px #222",
    p: 4,
    border: "1px solid #222",
    borderRadius: "5px",
    paddingTop: 3,
    backgroundColor: "#222",
  },
  input: {
    marginBottom: "8px",
  },
  btn: {
    marginTop: "25px",
    fontWeight: 550,
    // backgroundColor: "#1C54B2",
    // "&:hover": {
    //   backgroundColor: "#2b5384",
    // },
  },
  projectStyle: {
    color: "#999",
    padding: "5px 10px",
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
  },
};

export default function ShowTask({ open, setOpen, task }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box component="div" sx={styles.boxStyle}>
          <div style={{ marginBottom: "20px" }}>
            <Typography sx={styles.projectStyle} variant="p">
              <AccountTreeIcon sx={{ color: '#B1361E', marginRight: 1, fontSize: '24px' }} />
              {task.project.name ? task.project.name : task.project}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ marginLeft: 3 }}>
              {task.name}
            </Typography>
            <Typography sx={{ color: "#CCC", marginLeft: 3}} variant="p" >
              {task.description}
            </Typography>
          </div>

          <TaskTabs task={task} />
        </Box>
      </Modal>
    </div>
  );
}
