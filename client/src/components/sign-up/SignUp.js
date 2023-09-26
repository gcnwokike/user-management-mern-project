import React, { useState, Fragment } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { Redirect } from "react-router-dom";
import Alert from "../alert/Alert";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignUp({ register, isAuthenticated }) {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    oname: "",
    password: "",
    password2: ""
  });

  const [openp, setOpen] = useState(false);
  const [opene, setOpene] = useState(false);
  const [openl, setOpenl] = useState(false);

  const { fname, lname, email, password, password2, oname } = formData;

  const onChange = async e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (fname === "") {
      setOpene(true);
    } else if (lname === "") {
      setOpene(true);
    } else if (oname === "") {
      setOpene(true);
    } else if (password === "") {
      setOpene(true);
    } else if (password2 === "") {
      setOpene(true);
    } else if (email === "") {
      setOpene(true);
    } else if (password !== password2) {
      setOpen(true);
    } else if (password.length < 6) {
      setOpenl(true);
    } else {
      register(fname, lname, oname.toLowerCase(), email, password);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpene(false);
    setOpenl(false);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else if (!isAuthenticated) {
    return (
      <Fragment>
        <Dialog
          open={openp}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ color: "red" }}>
            {"Passwords do not match"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The values for the Password and the Confirm Password fields do not
              match ensure you are are typing the correct passwords for both
              fields and try again
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Exit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openl}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ color: "red" }}>
            {"Password is less than 6 characters"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your Password is less than 6 charaters ensure you have more than 6
              characters in your password field and try again
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Exit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={opene}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ color: "red" }}>
            {"All fields Are Required"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Kindly fill out all feilds before submitting the registration form
              as all fields are needed to create an account for your
              organization.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Exit
            </Button>
          </DialogActions>
        </Dialog>
        <Container component="main" maxWidth="xs">
          <Alert />
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center">
              Sign up for Your Chatfeedback Account
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="fname"
                    variant="outlined"
                    required={true}
                    value={fname}
                    onChange={e => onChange(e)}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lname"
                    value={lname}
                    onChange={e => onChange(e)}
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="oname"
                    name="oname"
                    variant="outlined"
                    required
                    value={oname}
                    onChange={e => onChange(e)}
                    fullWidth
                    id="oganization"
                    label="Organization Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password2"
                    value={password2}
                    onChange={e => onChange(e)}
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    autoComplete="current-password"
                  />
                </Grid>

                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => onSubmit(e)}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}></Box>
        </Container>
      </Fragment>
    );
  }
}

SignUp.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { register })(SignUp);
