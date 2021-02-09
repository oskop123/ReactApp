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
import TablePagination from "@material-ui/core/TablePagination";

import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import Button from "components/CustomButtons/Button.js";

//functions
import authorisedFetch from "functions/authorisedFetch.js";
import { ROW_SELECTED } from "@material-ui/data-grid";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
});

const headCells = [
  {
    id: "date",
    alignRight: false,
    label: "Date",
  },
  { id: "amount", alignRight: true, label: "Amount" },
  { id: "old_balance", alignRight: true, label: "Old Balance" },
  {
    id: "new_balance",
    alignRight: true,
    label: "New Balance",
  },
  {
    id: "message",
    alignRight: true,
    label: "Message",
  },
  { id: "from", alignRight: true, label: "From" },
  { id: "to", alignRight: true, label: "To" },
  { id: "download", alignRight: true, label: "Download" },
];

export default function BasicTable() {
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [accounts, setAccounts] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const [state, setState] = React.useState({});
  const [numRows, setNumRows] = React.useState(0);
  const [reload, setReload] = React.useState(0);

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setReload(reload + 1);
    //handleSubmit(0, event.target.value);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setReload(reload + 1);
    //handleSubmit(newPage, rowsPerPage);
  };

  React.useEffect(() => {
    authorisedFetch("/api/accounts", "GET")
      .then((response) => response.json())
      .then((json) => setAccounts(json));
    handleSubmit();
  }, [reload]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const getRaport = (idTransactions) => {
    authorisedFetch("/api/transactions/pdf", "POST", { idTransactions })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", idTransactions + `.pdf`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  };

  const handleSubmit = () => {
    if (state.hasOwnProperty("fromDate")) {
      state.fromDate = state.fromDate.replace("T", " ");
    }
    if (state.hasOwnProperty("toDate")) {
      state.toDate = state.toDate.replace("T", " ");
    }

    for (const key in state) {
      if (state[key] === "") {
        delete state[key];
      }
    }

    authorisedFetch("/api/transactions", "POST", {
      ...state,
      limit: rowsPerPage.toString(),
      offset: (page * rowsPerPage).toString(),
    })
      .then((response) => response.json())
      .then((json) => {
        setNumRows(parseInt(json[0].rowsNumber, 10));
        setRows(json.slice(1));
      });
  };

  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>History</h4>
      </CardHeader>
      <CardBody>
        <Paper>
          <Card>
            <CardBody>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    variant="outlined"
                    required
                    name="customerNumber"
                    id="Account"
                    label="Account"
                    margin="normal"
                    select
                    fullWidth
                    onChange={handleChange}
                  >
                    {accounts.map((account) => (
                      <MenuItem
                        key={account["number"]}
                        value={account["number"]}
                      >
                        {account["number"]}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <TextField
                    variant="outlined"
                    id="from"
                    label="Start Date"
                    name="fromDate"
                    fullWidth
                    margin="normal"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <TextField
                    variant="outlined"
                    id="from"
                    label="End Date"
                    name="toDate"
                    fullWidth
                    margin="normal"
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <TextField
                    variant="outlined"
                    id="from"
                    label="From Amount"
                    name="fromAmount"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <TextField
                    variant="outlined"
                    id="from"
                    label="To Amount"
                    name="toAmount"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <TextField
                    variant="outlined"
                    id="from"
                    label="Credit Card"
                    name="idCreditCard"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <TextField
                    variant="outlined"
                    id="fromacc"
                    label="From Account"
                    name="foreignNumber"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                </Grid>
                <Button color="success" onClick={handleSubmit} fullWidth="true">
                  Search
                </Button>
              </Grid>
            </CardBody>
          </Card>
        </Paper>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.alignRight ? "right" : "left"}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.idTransactions}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="right">{row.amountOfTransaction}</TableCell>
                  <TableCell align="right">{row.old_balance}</TableCell>
                  <TableCell align="right">{row.new_balance}</TableCell>
                  <TableCell align="right">{row.message}</TableCell>
                  <TableCell align="right">{row.idAccounts}</TableCell>
                  <TableCell align="right">
                    {row.idAccountsOfRecipient}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={() => getRaport(row.idTransactions)}>
                      Get
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={numRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </CardBody>
    </Card>
  );
}
