import { FormControl, TextField } from "@mui/material";

const NameFilter = () => {
  return (
    <>
      <FormControl fullWidth>
        <TextField label="Name" variant="outlined" />
      </FormControl>
    </>
  );
};

export default NameFilter;
