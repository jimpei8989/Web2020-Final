import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COURSE_INFO, UPDATE_COURSE_INFO } from "../graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  title: {
    marginTop: "6%",
    marginBottom: "3%",
  },
}));

export default function AccountEdit() {
  const classes = useStyles();
  const { cid } = useParams();
  const [classroom, setClassroom] = useState("");
  const [classTime, setClassTime] = useState("");
  const [description, setDescription] = useState("");
  const { loading, data } = useQuery(GET_COURSE_INFO, {
    variables: { cid: cid },
  });

  useEffect(() => {
    if (!loading) {
      setClassroom(data.course.classroom);
      setClassTime(data.course.classTime);
      setDescription(data.course.describe);
    }
  }, [loading, data]);

  const [updateCourseInfo] = useMutation(UPDATE_COURSE_INFO);

  const handleButtonClick = async () => {
    await updateCourseInfo({
      variables: {
        cid: cid,
        name: data.course.name,
        teacher: data.course.teacher,
        describe: description,
        classTime: classTime,
        classroom: classroom,
      },
    });
  };

  if (loading) return "Loading";

  return (
    <>
      <Typography variant="h4" component="h2" className={classes.title}>
        Course Settings
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="course-name"
          label="Course Name"
          style={{ margin: 16, width: "50%" }}
          placeholder="Course Name"
          margin="normal"
          value={data.course.name}
          disabled
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="instructor"
          label="Instructor"
          style={{ margin: 16, width: "50%" }}
          placeholder="Instructor"
          margin="normal"
          value={data.course.teacher}
          disabled
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="class-time"
          label="Class Time"
          style={{ margin: 16, width: "50%" }}
          placeholder="Class Time"
          margin="normal"
          value={classTime}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setClassTime(e.target.value)}
        />
        <TextField
          id="classroom"
          label="Classroom"
          style={{ margin: 16, width: "50%" }}
          placeholder="Classroom"
          margin="normal"
          value={classroom}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setClassroom(e.target.value)}
        />
        <TextField
          id="description"
          label="Description"
          style={{ margin: 16, width: "50%" }}
          placeholder="Description"
          margin="normal"
          multiline
          rows="3"
          value={description}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 16, display: "block" }}
        onClick={handleButtonClick}
      >
        Save
      </Button>
    </>
  );
}
