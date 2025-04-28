import { FormControl, TextField } from "@mui/material";
import { ChangeEvent } from "react";

export const NameFilter = ({
  onChange,
}: {
  onChange: (name: string) => void;
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      <FormControl fullWidth>
        <TextField
          label="Name"
          variant="outlined"
          onChange={handleInputChange}
        />
      </FormControl>
    </>
  );
};
