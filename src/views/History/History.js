import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function HistoryTable() {
  const classes = useStyles();

  const [history, setHistory] = React.useState();

  React.useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    fetch("/api/transactions", requestOptions)
      .then((response) => response.json())
      .then((json) => setHistory(json));
  }, []);

  return <div></div>;
}
