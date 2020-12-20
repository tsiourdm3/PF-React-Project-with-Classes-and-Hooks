import React, {useState, useEffect} from 'react';
import {Table} from 'reactstrap';
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import TutorialDataService from "../services/course.service.js";
import Icon from '@material-ui/core/Icon';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
 

  useEffect(() => {
    retrieveTutorials();
  }, []);


  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then(response => {
        setCourses(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  
    
    return (
      <Table>
        <thead>
          <tr style={{backgroundColor:"#E0E0E0"}}>
            <th colSpan="6" tooltip="Course List" style={{textAlign: 'center'}}>
              Last 5 courses
            </th>
          </tr>
          <tr>
            <th tooltip="Item">Item</th>
            <th tooltip="Title">Title</th>
            <th tooltip="Bookable">Bookable</th>
            <th tooltip="Price">Price</th>
            <th tooltip="Date">Date</th>
            <th tooltip="Actions">Actions</th>
          </tr>
        </thead>
        <tbody>
        {courses && courses.slice(Math.max(courses.length - 5, 0)).map( (courses, index) => (
      
              <tr  key={courses.id}>
              <td><Icon  color="primary">info</Icon></td>
              <td>{courses.title}</td>
              <td><Icon color="secondary">{(courses.open ? "check" : "close")}</Icon></td>
              <td>{courses.price.normal}</td>
              <td>{courses.dates.start_date}</td>
             
              <td>
              
                  <div className="course">
                  <Link to={"/CourseDetails/" +courses.id} style={{ textDecoration: 'none', color: 'white' }} ><Button variant="primary" title="ViewDeatails" className="view_details" >View Details</Button></Link>
                  </div>
              
              </td>
              </tr>
               
          ))}
          
          <tr style={{backgroundColor:"#E0E0E0"}}>
          <th colSpan="6" style={{textAlign: 'right'}}>
          <Button variant="primary"><Link to="/Courses" style={{ textDecoration: 'none', color: 'white' }}>View All</Link></Button>
          </th>
          </tr>
          </tbody>
      </Table>
    );
  }
export default CourseList;