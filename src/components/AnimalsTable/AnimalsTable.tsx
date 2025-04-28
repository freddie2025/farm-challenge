import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";
import { Animal } from "../../interfaces";
import { FarmService } from "../../services/FarmService";
import useFetch from "../../hooks/useFetch";
import { AnimalFilter } from "../../interfaces/index";
import {
  TableStyled,
  AnimalImage,
  Checkbox,
  TableCellStyled,
} from "./AnimalsTable.styles";

export const AnimalsTable = (params?: AnimalFilter) => {
  const { data: animals, error } = useFetch<Animal[], AnimalFilter>(
    FarmService.getAnimals,
    params
  );

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (animals?.length === 0) {
    return <Alert severity="info">No animals found</Alert>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <TableStyled size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCellStyled>Name</TableCellStyled>
              <TableCellStyled>Age</TableCellStyled>
              <TableCellStyled>Worth</TableCellStyled>
              <TableCellStyled>Gender</TableCellStyled>
              <TableCellStyled>Type</TableCellStyled>
              <TableCellStyled>IsAlive</TableCellStyled>
            </TableRow>
          </TableHead>
          <TableBody>
            {animals?.map(
              ({ _id, name, age, worth, gender, animalType, isAlive }) => (
                <TableRow key={_id}>
                  <TableCell>
                    <AnimalImage
                      src={`./animals/${animalType}.png`}
                      alt={name}
                    />
                  </TableCell>
                  <TableCellStyled>{name}</TableCellStyled>
                  <TableCellStyled>{age}</TableCellStyled>
                  <TableCellStyled>{worth}</TableCellStyled>
                  <TableCellStyled>{gender}</TableCellStyled>
                  <TableCellStyled>{animalType}</TableCellStyled>
                  <TableCellStyled>
                    <Checkbox checked={isAlive} />
                  </TableCellStyled>
                </TableRow>
              )
            )}
          </TableBody>
        </TableStyled>
      </TableContainer>
    </>
  );
};
