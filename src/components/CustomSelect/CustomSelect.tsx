import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import { CustomSelectOption } from "../../interfaces/index";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

export const CustomSelect = ({
  label,
  fetchFunction,
  onChange,
}: {
  label: string;
  fetchFunction: () => Promise<CustomSelectOption[]>;
  onChange: (value: string) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  const { data: options, error } =
    useFetch<CustomSelectOption[]>(fetchFunction);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={selectedValue} onChange={handleChange}>
        <MenuItem key={"none"} value={""}>
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.type} value={option.type}>
            {option.displayName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
