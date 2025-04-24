import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { AnimalType } from "../interfaces";
import FarmService from "../services/FarmService";
import { useFetch } from "../hooks/useFetch";

const AnimalTypeSelect = () => {
  const { data: animalTypes } = useFetch<AnimalType[]>(
    FarmService.getAnimalTypes
  );

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="animal-type-label">Animal Type</InputLabel>
        <Select
          labelId="animal-type-label"
          id="animal-type"
          label="Animal Type"
        >
          {animalTypes?.map((animalType) => (
            <MenuItem key={animalType.type} value={animalType.type}>
              {animalType.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default AnimalTypeSelect;
