import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AccountIcon from "@material-ui/icons/AccountBalance";
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

export default function Accounts() {
  const classes = useStyles();

  const [accounts, setAccounts] = React.useState([]);
  const [reload, setReload] = React.useState(true);

  React.useEffect(() => {
    authorisedFetch("/api/accounts", "GET")
      .then((response) => response.json())
      .then((json) => setAccounts(json));
  }, [reload]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await authorisedFetch("/api/accounts", "POST");
    setReload(!reload);
  };

  const handleRemove = async (id) => {
    await authorisedFetch("/api/accounts", "DELETE", { idAccounts: id });
    setReload(!reload);
  };

  return (
    <GridContainer>
      {accounts.map((account) => (
        <GridItem xs={12} sm={12} md={4}>
          <Card key={account.idAccounts}>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <AccountIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Number</p>
              <h3 className={classes.cardTitle}>{account.number}</h3>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={6} sm={6} md={6}>
                  <p className={classes.cardCategory}>Balance: </p>
                  <h3 className={classes.cardTitle}>{account.balance} $</h3>
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                  <p className={classes.cardCategory}>Creation Date: </p>
                  <h3 className={classes.cardTitle}>{account.dataOpened}</h3>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter
              stats
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                color="danger"
                onClick={() => handleRemove(account.idAccounts)}
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
            <CardBody
              stats
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="submit" color="success" onClick={handleSubmit}>
                Add Account
              </Button>
            </CardBody>
          </form>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
