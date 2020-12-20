import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import TutorialDataService from "../services/course.service.js";
import { Link } from "react-router-dom";


const Courses = () => {
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setCourses(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  return (
    <Container fluid>
      <Row>
        {courses &&
          courses.map((courses, index) => (
            <Card
              style={{
                margin: "5rem",
                marginTop: "20px",
                marginBottom: "20px",
                width: "18rem",
              }}
              key={courses.id}
            >
              <Card.Title>{courses.title}</Card.Title>
              <Card.Img variant="top" src={courses.imagePath}></Card.Img>
              <Card.Body>
                <Card.Text>
                  <span>
                    Price:{courses.price.normal} | Bookable:{" "}
                    {` ${courses.open ? "Yes" : "No"}`}
                  </span>
                  <br></br>
                  <span>Duration: {courses.duration}</span>
                  <br></br>
                  <span>
                    Dates: {courses.dates.start_date} - {courses.dates.end_date}
                  </span>
                  <br></br>
                </Card.Text>
                <Link
                  to={"/CourseDetails/" + courses.id}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button
                    variant="primary"
                    title="ViewDeatails"
                    className="view_details"
                  >
                    View Details
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
      </Row>
    </Container>
  );
};

export default Courses;
