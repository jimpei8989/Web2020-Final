import React, { useState } from "react";
import { Container, Grid, Typography } from "@material-ui/core";

import Selector from "./Selector";
import Highlighter from "./Highlighter";
import ControlPanel from "./ControlPanel";
import { getStudentResponse } from "../utils";

const Grader = (props) => {
  const { assignmentID, problems, students } = props;

  const [studentID, setStudentID] = useState(students[0].studentID);
  const [problemID, setProblemID] = useState(problems[0].problemID);
  const [problem, setProblem] = useState(problems[0]);

  // Each instance is an object that has two properties, "score" and "comments"
  const [scores, setScores] = useState(
    students.reduce(
      (o, s) => ({ ...o, [s.studentID]: { score: undefined, comment: "" } }),
      {}
    )
  );

  const studentResponse = getStudentResponse(
    assignmentID,
    problemID,
    studentID
  );

  return (
    <Container maxWidth="lg">
      {/* Problem-related */}
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={9}>
          <Typography variant="h5" component="h2">
            Q: {problem.statement}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Selector
            name="Problems"
            value={problemID}
            updateFunc={(value) => {
              setProblemID(value);
            }}
            options={problems.map((ele) => ({
              ID: ele.problemID,
              description: `Prob. ${ele.index}`,
            }))}
            style={{ width: "80%" }}
          />
        </Grid>
      </Grid>

      {/* Student Related */}
      <Grid container style={{ marginTop: "20px" }} spacing="3">
        <Grid item xs={8}>
          <Highlighter
            text={studentResponse.text}
            keywords={problem.keywords}
          ></Highlighter>
        </Grid>
        <Grid item xs={4}>
          <ControlPanel
            students={students}
            studentID={studentID}
            setStudentID={setStudentID}
            scores={scores}
            setScores={setScores}
            problemID={problem.problemID}
            maxScore={problem.maxScore}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Grader;