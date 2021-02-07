import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import AccountIcon from "@material-ui/icons/AccountBalance";

import Snackbar from "components/Snackbar/Snackbar.js";

//functions
import authorisedFetch from "functions/authorisedFetch.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Accounts() {
  const classes = useStyles();

  const [users, setUsers] = React.useState([]);
  const [state, setState] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState();
  const [msg, setMsg] = React.useState();

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
    authorisedFetch("/api/accounts", "POST", state).then((response) =>
      response
        .json()
        .then((data) => showNotification(response.status, data["msg"]))
    );
  };

  const handleRemove = async (id) => {
    authorisedFetch("/api/accounts", "DELETE", {
      idAccounts: id,
    }).then((response) =>
      response
        .json()
        .then((data) => showNotification(response.status, data["msg"]))
    );
  };

  React.useEffect(() => {
    authorisedFetch("/api/accounts", "GET")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, [open]);

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
        {users.map((user) => (
          <GridItem xs={12} sm={12} md={4}>
            <Card key={user.idAccounts}>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <AccountIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Number</p>
                <h3 className={classes.cardTitle}>{user.number}</h3>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={6} sm={6} md={6}>
                    <p className={classes.cardCategory}>Balance: </p>
                    <h3 className={classes.cardTitle}>{user.balance} $</h3>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6}>
                    <p className={classes.cardCategory}>Creation Date: </p>
                    <h3 className={classes.cardTitle}>{user.dataOpened}</h3>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter
                stats
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  color="danger"
                  onClick={() => handleRemove(user.idAccounts)}
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        ))}

        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <AccountIcon />
              </CardIcon>
            </CardHeader>
            <form
              className={classes.form}
              noValidate
              method="post"
              onSubmit={handleSubmit}
            >
              <CardBody>
                <TextField
                  variant="outlined"
                  required
                  id="balance"
                  name="balance"
                  label="Balance"
                  margin="normal"
                  fullWidth
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">PLN</InputAdornment>
                    ),
                  }}
                />
              </CardBody>
              <CardFooter
                stats
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button type="submit" color="success" onClick={handleSubmit}>
                  Add
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
