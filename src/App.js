import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from "./components/Navbar.js";
import Head from "./components/Head.js";
import CourseList from "./components/TableofCourses.js";
import Stats from "./components/Stats.js";
import AddTutorial from "./AddCourse/add-course-component";
import Courses from "./Courses/Courses.js";
import CourseDetails from "./Courses/CourseDetails.js";


const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Head />
            <Stats />
            <CourseList />
          </Route>
          <Route path="/Courses" component={Courses} />
          <Route path="/AddCourse" component={AddTutorial} />
          <Route path="/CourseDetails/:id" component={CourseDetails} />

        </Switch>


      </div>
    </BrowserRouter>
  );
}

export default App;
