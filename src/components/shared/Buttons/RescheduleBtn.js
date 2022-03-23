import { useState } from "react";
import { Button } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

import RescheduleMenu from "../menus/RescheduleMenu";

function RescheduleBtn() {
  const [anchorEl, setAnchorEl] = useState(null);

  const optionsMenuOpen = Boolean(anchorEl);

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <Button
        variant="outlined"
        size="small"
        startIcon={<HistoryIcon />}
        onClick={handleOptionsClick}
      >
        Reschedule
      </Button>
      <RescheduleMenu
        anchorEl={anchorEl}
        open={optionsMenuOpen}
        handleClose={handleOptionsClose}
      />
    </div>
  );
}

export default RescheduleBtn;
