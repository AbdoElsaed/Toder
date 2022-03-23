import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useAuth } from "../Auth";


const TaskFormAutocomplete = ({ project, setProject, size, editView }) => {
  const { projects } = useAuth();

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={projects}
      value={project}
      onChange={(e, newVal) => {
        setProject(newVal);
      }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      sx={{
        width: "100%",
        marginTop: "15px",
        marginLeft: editView ? "10px" : "0px",
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      renderInput={(params) => (
        <TextField {...params} label="Select a project" />
      )}
    />
  );
};

export default TaskFormAutocomplete;
