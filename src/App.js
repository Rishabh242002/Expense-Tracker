import React from "react";
import { Grid } from "@material-ui/core";
import { useSpeechContext } from "@speechly/react-client";
import Main from "./components/Main/Main";
import Details from "./components/Details/Details";
import useStyles from "./styles";
import { FaMicrophone } from "react-icons/fa";

function App() {
  const classes = useStyles();
  const { listening, attachMicrophone, start, stop } = useSpeechContext();

  const handleClick = async () => {
    if (listening) {
      await stop();
    } else {
      await attachMicrophone();
      await start();
    }
  };

  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} sm={4} className={classes.mobile}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.main}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.desktop}>
          <Details title="Income" />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.last}>
          <Details title="Expense" />
        </Grid>
        <button onClick={handleClick}>
          <FaMicrophone size={42}/>
        </button>
      </Grid>
    </div>
  );
}

export default App;
