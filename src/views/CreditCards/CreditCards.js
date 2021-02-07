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
import Payment from "@material-ui/icons/Payment";
import CardFooter from "components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import Snackbar from "components/Snackbar/Snackbar.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

//functions
import authorisedFetch from "functions/authorisedFetch.js";

const useStyles = makeStyles(styles);

export default function Cards() {
  const classes = useStyles();

  const [state, setState] = React.useState({});
  const [cc, setCC] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);
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
    }
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    authorisedFetch("/api/credit_cards", "POST", state).then((response) =>
      response
        .json()
        .then((data) => showNotification(response.status, data["msg"]))
    );
  };

  const handleRemove = async (cc) => {
    authorisedFetch("/api/credit_cards", "DELETE", {
      idCard: cc,
    }).then((response) =>
      response
        .json()
        .then((data) => showNotification(response.status, data["msg"]))
    );
  };

  const refresh = async () => {
    authorisedFetch("/api/credit_cards", "GET")
      .then((response) => response.json())
      .then((json) => setCC(json));
  };

  React.useEffect(() => {
    refresh();

    authorisedFetch("/api/accounts", "GET")
      .then((response) => response.json())
      .then((json) => setAccounts(json));
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
        {cc.map((card) => (
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Payment />
                </CardIcon>
                <p className={classes.cardCategory}>ID:</p>
                <h3 className={classes.cardTitle}>{card.idCreditCards}</h3>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={6} sm={6} md={6}>
                    <p className={classes.cardCategory}>Limit: </p>
                    <h3 className={classes.cardTitle}>{card.maximumLimit}</h3>
                    <TextField
                      variant="outlined"
                      required
                      name="idAccount"
                      id="idAccount"
                      label="Limit: "
                      margin="normal"
                      select
                      fullWidth
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6}>
                    <p className={classes.cardCategory}>Expiry Date: </p>
                    <h3 className={classes.cardTitle}>{card.expiryDate}</h3>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter
                stats
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  color="danger"
                  onClick={() => handleRemove(card.idCreditCards)}
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
                <Payment />
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
                  name="idAccount"
                  id="idAccount"
                  label="idAccounts"
                  margin="normal"
                  select
                  fullWidth
                  onChange={handleChange}
                >
                  {accounts.map((account) => (
                    <MenuItem
                      key={account["idAccounts"]}
                      value={account["idAccounts"]}
                    >
                      {account["idAccounts"]}
                    </MenuItem>
                  ))}
                </TextField>
              </CardBody>
              <CardFooter
                stats
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button type="submit" color="success">
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
