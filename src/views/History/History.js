import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const headCells = [
  {
    id: "date",
    numeric: false,
    label: "Dessert (100g serving)",
  },
  { id: "amount", numeric: true, label: "Calories" },
  { id: "old_balance", numeric: true, label: "Fat (g)" },
  {
    id: "new_balance",
    numeric: true,
    label: "Carbs (g)",
  },
  {
    id: "message",
    numeric: false,
    label: "Protein (g)",
  },
  { id: "from", numeric: false, label: "Protein (g)" },
  { id: "to", numeric: false, label: "Protein (g)" },
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>History</h4>
      </CardHeader>
      <CardBody>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? "right" : "left"}
                    //sortDirection={orderBy === headCell.id ? order : false}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}
