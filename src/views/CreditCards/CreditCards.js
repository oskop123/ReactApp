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

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const accounts = ["acc1", "acc2"];

export default function Cards() {
  const classes = useStyles();

  const [state, setState] = React.useState({});
  const [cc, setCC] = React.useState([]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    };
    fetch("/api/add_account", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
  };

  React.useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    fetch("/api/credit_cards", requestOptions)
      .then((response) => response.json())
      .then((json) => setCC(json));
  }, []);

  return (
    <div>
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
                <Button color="danger">Remove</Button>
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
                  name="account"
                  id="account"
                  label="account"
                  margin="normal"
                  select
                  fullWidth
                  onChange={handleChange}
                >
                  {accounts.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
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
