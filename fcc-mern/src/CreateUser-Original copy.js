import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

export default function CreateUser() {
  const classes = useStyles();
  const [formState, setFromState] = useState({
    fname: "",
    lname: "",
    password: "",
    password2: "",
    email: "",
    role: {
      admin: false,
      genuser: false,
      agent: false
    }
  });

  const { fname, lname, password, password2, email, role } = formState;

  const onChange = e => {
    setFromState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    axios
      .post("http://localhost:5000/api/users", formState)
      .then(res => console.log(res));
    var delayinmilliseconds = 1000;
    setTimeout(() => {
      window.location = "/";
    }, delayinmilliseconds);
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <React.Fragment>
          <Typography
            component="h6"
            variant="h6"
            align="center"
            style={{ fontWeight: "bold" }}
          >
            Create User
          </Typography>
          <Typography component="h6" variant="h6" gutterBottom>
            User Creation Form
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="fname"
                label="First name"
                value={fname}
                onChange={e => onChange(e)}
                fullWidth
                autoComplete="fname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lname"
                label="Last name"
                value={lname}
                onChange={e => onChange(e)}
                fullWidth
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                value={email}
                onChange={e => onChange(e)}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={e => onChange(e)}
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                value={password2}
                onChange={e => onChange(e)}
                id="password2"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={e => onSubmit(e)}
          >
            Submit
          </Button>
        </React.Fragment>
      </Paper>
    </main>
  );
}
