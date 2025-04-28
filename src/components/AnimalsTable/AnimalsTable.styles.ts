import { TableCell, Table } from "@mui/material";
import styled from "styled-components";

export const TableStyled = styled(Table)`
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
`;

export const TableCellStyled = styled(TableCell)`
  text-align: left;
`;

export const AnimalImage = styled.img`
  width: 24px;
  height: 24px;
`;

export const Checkbox = styled.input.attrs({
  type: "checkbox",
  readOnly: true,
})``;
