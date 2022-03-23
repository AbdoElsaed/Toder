import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { useAuth } from "../Auth";

const filter = createFilterOptions();

const TaskFormAutocomplete = ({ project, setProject, size, editView }) => {
  const { projects } = useAuth();

  return (
    <Autocomplete
      size={size}
      value={project}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setProject({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setProject({
            name: newValue.inputValue,
          });
        } else {
          setProject(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={projects}
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
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{
        width: "100%",
        marginTop: "15px",
        marginLeft: editView ? "10px" : "0px",
      }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Select a project" />
      )}
    />
  );
};

export default TaskFormAutocomplete;
