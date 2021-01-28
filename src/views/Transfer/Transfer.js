import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";

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

const accounts = ["test1", "test2"];

const useStyles = makeStyles(styles);

export default function Transfer() {
  const classes = useStyles();
  const [state, setState] = React.useState();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(state),
    };
    fetch("/api/transfer", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
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
                  {accounts.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
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
