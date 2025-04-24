import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { AnimalSortOptions } from "../interfaces";
import FarmService from "../services/FarmService";

const SortOrderSelect = () => {
  const [sortOptions, setSortOptions] = useState<AnimalSortOptions[]>();

  useEffect(() => {
    const fetchSortOptions = async () => {
      const options = await FarmService.getAnimalSortOptions();
      setSortOptions(options);
    };

    fetchSortOptions();
  }, []);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="sort-order-label">Order By</InputLabel>
        <Select labelId="sort-order-label" id="sort-order" label="Order By">
          {sortOptions?.map((option) => (
            <MenuItem key={option.type} value={option.type}>
              {option.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SortOrderSelect;
