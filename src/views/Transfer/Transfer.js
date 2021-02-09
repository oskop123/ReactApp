import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Snackbar from "components/Snackbar/Snackbar.js";
// functions
import authorisedFetch from "functions/authorisedFetch.js";

const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function Transfer() {
  const classes = useStyles();
  const [state, setState] = React.useState();
  const [accounts, setAccounts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState();
  const [msg, setMsg] = React.useState();

  React.useEffect(() => {
    authorisedFetch("/api/accounts", "GET")
      .then((response) => response.json())
      .then((json) => setAccounts(json));
  }, []);

  const showNotification = (statusCode, message) => {
    if (open === false) {
      switch (statusCode) {
        case 200:
          setColor("success");
          break;
        case 401:
          setColor("warning");
          break;
        default:
          setColor("danger");
      }
      setOpen(true);
      setMsg(message);
      setTimeout(function () {
        setOpen(false);
      }, 6000);
    }
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    authorisedFetch("/api/transfer", "POST", state).then((response) =>
      response
        .json()
        .then((data) => showNotification(response.status, data["msg"]))
    );
  };

  return (
    <div>
      <Snackbar
        place="bc"
        color={color}
        message={msg}
        open={open}
        closeNotification={() => setOpen(false)}
        close
      />
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Cash Transfer</h4>
            </CardHeader>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <CardBody>
                <TextField
                  variant="outlined"
                  required
                  id="Title"
                  label="Title"
                  name="title"
                  margin="normal"
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  required
                  id="Amount"
                  name="amount"
                  label="Amount"
                  margin="normal"
                  fullWidth
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">PLN</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  variant="outlined"
                  required
                  id="accountNumber"
                  name="accountNumber"
                  label="Account Number"
                  margin="normal"
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  variant="outlined"
                  required
                  name="fromAccount"
                  id="fromAccount"
                  label="From Account"
                  margin="normal"
                  select
                  fullWidth
                  onChange={handleChange}
                >
                  {accounts.map((account) => (
                    <MenuItem key={account["number"]} value={account["number"]}>
                      {account["number"]}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  color="success"
                >
                  Send
                </Button>
              </CardBody>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
