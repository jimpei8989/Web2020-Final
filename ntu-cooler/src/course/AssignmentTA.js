import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useRouteMatch, NavLink } from "react-router-dom";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Snackbar,
} from "@material-ui/core";
import {
  Edit,
  Check,
  AccessTime,
  AccessAlarm,
  PieChart,
  DoneAll,
} from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { GET_ASSIGNMENT, SHOW_GRADE } from "../graphql";
import Loading from "../components/Loading";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 480,
  },
  title: {
    marginTop: "6%",
    marginBottom: "1%",
    fontFamily: `'Crete Round', serif`,
  },
  button: {
    marginTop: "1%",
    marginRight: theme.spacing(1),
  },
  navlink: {
    color: "inherit",
    textDecoration: "none",
  },
}));

export default function AssignmentTA(props) {
  const { isTA } = props;
  const classes = useStyles();
  const { aid } = useParams();
  const match = useRouteMatch();
  const [open, setOpen] = useState(false);
  const { loading, data } = useQuery(GET_ASSIGNMENT, {
    variables: { aid: aid },
    fetchPolicy: "no-cache",
  });
  const [showGrade] = useMutation(SHOW_GRADE);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Typography variant="h4" component="h2" className={classes.title}>
        {data.assignment.info.name}
      </Typography>
      <hr />
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessTime />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Begin Time"
            secondary={new Date(
              parseInt(data.assignment.info.beginTime, 10)
            ).toString()}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessAlarm />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="End Time"
            secondary={new Date(
              parseInt(data.assignment.info.endTime, 10)
            ).toString()}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PieChart />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Weight"
            secondary={data.assignment.info.weight}
          />
        </ListItem>
        <ListItem>
          <NavLink
            to={{ pathname: `${match.url}/edit`, state: { isTA: isTA } }}
            className={classes.navlink}
          >
            <Button
              variant="outlined"
              className={classes.button}
              startIcon={<Edit />}
            >
              Edit
            </Button>
          </NavLink>
          <NavLink
            to={{ pathname: `${match.url}/grading`, state: { isTA: isTA } }}
            className={classes.navlink}
          >
            <Button
              variant="outlined"
              className={classes.button}
              startIcon={<Check />}
            >
              Grading
            </Button>
          </NavLink>
          <Button
            variant="outlined"
            className={classes.button}
            startIcon={<DoneAll />}
            onClick={async () => {
              await showGrade({
                variables: {
                  aid: aid,
                },
              });
              setOpen(true);
            }}
          >
            Show Grade
          </Button>
        </ListItem>
      </List>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Assignments have been graded.
        </Alert>
      </Snackbar>
    </>
  );
}
