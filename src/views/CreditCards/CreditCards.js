import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Payment from "@material-ui/icons/Payment";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
// functions
import authorisedFetch from "functions/authorisedFetch.js";
// styles
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Cards() {
  const classes = useStyles();

  const [state, setState] = React.useState({});
  const [cc, setCC] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);
  const [limit, setLimit] = React.useState({});
  const [reload, setReload] = React.useState(true);

  React.useEffect(() => {
    authorisedFetch("/api/accounts", "GET")
      .then((response) => response.json())
      .then((json) => setAccounts(json));
  }, []);

  React.useEffect(() => {
    authorisedFetch("/api/credit_cards", "GET")
      .then((response) => response.json())
      .then((json) => setCC(json));
  }, [reload]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const limitChange = (event, id) => {
    limit[id] = event.target.value;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await authorisedFetch("/api/credit_cards", "POST", state);
    setReload(!reload);
  };

  const handleLimit = async (idCard) => {
    await authorisedFetch("/api/credit_cards/limit", "POST", {
      idCard,
      limit: limit[idCard],
    });
    setReload(!reload);
  };

  const handleRemove = async (cc) => {
    await authorisedFetch("/api/credit_cards", "DELETE", { idCard: cc });
    setReload(!reload);
  };

  return (
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
                  <TextField
                    variant="outlined"
                    required
                    name="limit"
                    id="limit"
                    label="Limit"
                    margin="normal"
                    defaultValue={card.maximumLimit}
                    fullWidth
                    onChange={(event) => limitChange(event, card.idCreditCards)}
                    type="number"
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
                color="success"
                onClick={() => handleLimit(card.idCreditCards)}
              >
                Change
              </Button>
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
                name="accountNumber"
                id="accountNumber"
                label="Account"
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
  );
}
