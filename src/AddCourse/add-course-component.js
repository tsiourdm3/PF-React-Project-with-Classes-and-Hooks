import React, { Component } from "react";
import TutorialDataService from "../services/course.service.js";
import InstructorsDataService from "../services/instructors.service";
import { Container, Card } from 'react-bootstrap';
import { CardHeader } from "reactstrap";
import { Button, Grid, Typography, Checkbox } from '@material-ui/core';


export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onSimpleChange = this.onSimpleChange.bind(this);             //for text inputs
    this.onChangeInstructor = this.onChangeInstructor.bind(this);     //for instructors
    this.onChangeBool = this.onChangeBool.bind(this);                 //for boolean inputs
    this.onChangePrice = this.onChangePrice.bind(this);               //for prices
    this.saveTutorial = this.saveTutorial.bind(this);                 //get form data
    this.newTutorial = this.newTutorial.bind(this);                   //new form
    this.retrieveInstructors = this.retrieveInstructors.bind(this);

    this.state = this.newTutorial();
  }

  onSimpleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onChangeBool(e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  onChangePrice(e) {
    const object = this.state['price'];
    object[e.target.name] = e.target.value;
    this.setState(object)
  }

  onChangeInstructor(e) {
    const object = this.state['instructors'];
    const target = e.target;
    if (target.checked) {
      object.push(target.name);
    }
    else if (this.state.instructors.indexOf(target.name) !== -1) {
      object.splice(this.state.instructors.indexOf(target.name), 1);
    }

    this.setState(object)
  }


  saveTutorial() {
    var data = {
      id: this.state.id,
      title: this.state.title,
      imagePath: this.state.imagePath,
      price: this.state.price,
      dates: { start_date: this.state.start_date, end_date: this.state.end_date },
      duration: this.state.duration,
      open: this.state.open,
      instructors: this.state.instructors,
      description: this.state.description
    };

    TutorialDataService.create(data)
      .then(response => {

        this.setState({
          id: response.data.id,
          title: response.data.title,
          imagePath: response.data.imagePath,
          price: { normal: response.data.normal, early_bird: response.data.early_bird },
          dates: { start_date: response.data.start_date, end_date: response.data.end_date },
          duration: response.data.duration,
          open: response.data.open,
          instructors: [{ id: response.data.instructors }],
          description: response.data.description
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    return {
      id: null,
      title: "",
      imagePath: "",
      price: {
        normal: "",
        early_bird: ""
      },
      start_date: "",
      end_date: "",
      duration: "",
      open: false,
      instructors: [],
      description: "",
      possible_instructors: [],
      submitted: false
    };
  }

  componentDidMount() {
    this.retrieveInstructors();
  }

  retrieveInstructors() {
    InstructorsDataService.getAll()
      .then((response) => {
        this.setState({
          possible_instructors: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });

  }
  render() {

    return (
      <Container>
        <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
          <CardHeader>
            <h2>Add Course</h2>
            <div className="submit-form">
              {this.state.submitted ? (
                <Grid container>
                  <Typography variant="h5">  You submitted successfully!  </Typography><br />
                  <Button variant="outlined" onClick={this.setState(this.newTutorial())} className="btn btn-success"> Add </Button>
                </Grid>
              ) : (
                  <form onSubmit={this.saveTutorial}>
                    <div>
                      <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                          variant="outlined"
                          type="text"
                          className="form-control"

                          id="title"
                          value={this.state.title}
                          onChange={this.onSimpleChange}
                          name="title"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="duration">Duration</label>
                        <input
                          variant="outlined"
                          type="text"
                          className="form-control"
                          id="duration"
                          value={this.state.duration}
                          onChange={this.onSimpleChange}
                          name="duration"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="imagePath">Image Path</label><br></br>
                        <input
                          variant="outlined"
                          type="file"
                          id="img"
                          value={this.state.imagePath}
                          onChange={this.onSimpleChange}
                          name="imagePath"
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Bookable
          <Checkbox
                            variant="outlined"
                            name="open"
                            type="checkbox"
                            label="Bookable"
                            checked={this.state.open}
                            onChange={this.onChangeBool} />
                        </label>
                      </div>
                      <hr></hr>
                      <h3>Instructors</h3>
                      <div className="form-group">
                        {this.state.possible_instructors.map((instructor, idx) => (
                          <span key={idx}><label>

                            <Checkbox 
                              variant="outlined"
                              data-variable="instructors"
                              data-format="push"
                              name={instructor.id}
                              value={instructor.id}
                              type="checkbox"

                              checked={this.state.instructors.indexOf(instructor.id) !== -1}
                              onChange={this.onChangeInstructor} />
          {instructor.name.first} {instructor.name.last}
                          </label> <br></br></span>
                        ))}
                        <br></br>

                      </div>


                      <hr></hr>

                      <div className="form-group">
                        <label htmlFor="description">Description</label><br></br>
                        <textarea variant="outlined" name='description' style={{ width: '100%' }} value={this.state.value} onChange={this.onSimpleChange} />
                      </div>

                      <hr></hr>

                      <h3>Dates</h3>

                      <div className="form-group">
                        <label htmlFor="start_date">Start Date</label>
                        <input
                          variant="outlined"
                          type="date"
                          placeholder="Start date"
                          className="form-control"
                          id="start_date"
                          value={this.state.start_date}
                          onChange={this.onSimpleChange}
                          name="start_date"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="end_date">End Date</label>
                        <input
                          variant="outlined"
                          type="date"
                          placeholder="End date"
                          className="form-control"
                          id="end_date"
                          value={this.state.end_date}
                          onChange={this.onSimpleChange}
                          name="end_date"
                        />
                      </div>
                      <hr></hr>

                      <h3>Prices</h3>

                      <div className="form-group">
                        <label htmlFor="early_bird">Early Bird</label>
                        <input
                          variant="outlined"
                          data-variable="price"
                          data-format="change"
                          type="number"
                          placeholder="0"
                          className="form-control"
                          id="early_bird"

                          value={this.state.price.early_bird}
                          onChange={this.onChangePrice}
                          name="early_bird"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="normal_price">Normal Price</label>
                        <input
                          variant="outlined"
                          data-variable="price"
                          data-format="change"
                          type="number"
                          placeholder="0"
                          className="form-control"
                          id="normal_price"
                          value={this.state.price.normal}
                          onChange={this.onChangePrice}
                          name="normal"
                        />
                      </div>
                      <hr></hr>
                      <button className="btn btn-primary" style={{ float: 'right' }}>
                        Add Course
            </button>
                    </div>
                  </form>
                )}

            </div>

          </CardHeader>
        </Card>
      </Container>
    );

  }
}