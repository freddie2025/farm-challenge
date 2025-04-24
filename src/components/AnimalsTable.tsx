import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Animal } from "../interfaces";
import { useEffect, useState } from "react";
import FarmService from "../services/FarmService";

const AnimalsTable = () => {
  const [rows, setRows] = useState<Array<Animal>>([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const animals = await FarmService.getAnimals();
        setRows(animals);
      } catch (error) {
        console.error("Failed to fetch animals:", error);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <>
      <h2>Animals</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Worth</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">IsAlive</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={`./animals/${row.animalType}.png`}
                    alt={row.name}
                    style={{ width: 24, height: 24 }}
                  />
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.age}</TableCell>
                <TableCell align="left">{row.worth}</TableCell>
                <TableCell align="left">{row.gender}</TableCell>
                <TableCell align="left">{row.animalType}</TableCell>
                <TableCell align="left">
                  <input type="checkbox" checked={row.isAlive} readOnly />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AnimalsTable;
