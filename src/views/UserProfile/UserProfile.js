import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
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
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [user, setUser] = React.useState({});

  const InputLabelProps = {
    shrink: true,
  };

  React.useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    };
    fetch("/api/customer", requestOptions)
      .then((response) => response.json())
      .then((json) => setUser(json));
  };

  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>User Profile</h4>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <TextField
              id="login"
              label="Login"
              value={user.login}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              margin="normal"
              InputLabelProps={InputLabelProps}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <TextField
              id="email"
              label="Email"
              value={user.email}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              margin="normal"
              InputLabelProps={InputLabelProps}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <TextField
              id="firstName"
              label="First Name"
              value={user.firstName}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              margin="normal"
              InputLabelProps={InputLabelProps}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <TextField
              id="lastName"
              label="Last Name"
              value={user.lastName}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              margin="normal"
              InputLabelProps={InputLabelProps}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <TextField
              id="phoneNumber"
              label="Phone Number"
              value={user.phone}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              margin="normal"
              InputLabelProps={InputLabelProps}
            />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
            <TextField
              id="opened"
              label="Opened"
              value={user.dataBecomeCustomer}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              margin="normal"
              InputLabelProps={InputLabelProps}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}
