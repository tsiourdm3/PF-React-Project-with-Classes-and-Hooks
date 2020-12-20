import React, { Component } from "react";
import TutorialDataService from "../services/course.service";
import InstructorsDataService from "../services/instructors.service.js";
import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import { Checkbox } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";



export default class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSimpleChange = this.onSimpleChange.bind(this);
    this.onChangeBool = this.onChangeBool.bind(this);
    this.onChangeInstructor = this.onChangeInstructor.bind(this);
    this.retrieveInstructors = this.retrieveInstructors.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      imagePath: "",
      price: { normal: "", early_bird: "" },
      dates: { start_date: "", end_date: "" },
      duration: "",
      open: true,
      instructors: [""],
      description: "",
      instructor: [],
      message: ""
    }
     
  }

    componentDidMount = () => {
      this.getTutorial(this.props.match.params.id);
    };

    onSimpleChange(e) {
      this.setState({
        [e.target.id]: e.target.value
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
    
    getTutorial = (id) => {
      TutorialDataService.get(id)
        .then((response) => {
          this.retrieveInstructors(response.data);
          
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    retrieveInstructors(currentState) {
      InstructorsDataService.getAll()
        .then((response) => {
          currentState.instructor = response.data;
          this.setState(
            currentState
          );
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    updateTutorial = () => {
      const updatePackage = this.state;
      delete updatePackage.message;
      delete updatePackage.instructor;
      TutorialDataService.update(
        this.state.id,
        updatePackage
      )
        .then((response) => {
          console.log(response.data);
          this.setState({
            message: "The course was updated successfully!",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };

    deleteTutorial = () => {
      TutorialDataService.delete(this.state.id)
        .then((response) => {
          console.log(response.data);
          this.props.history.push("/courses");
        })
        .catch((e) => {
          console.log(e);
        });
    };

    state = {
      isOpen: false,
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    state = {
      Open: false,
    };

    open = () => this.setState({ Open: true });
    close = () => this.setState({ Open: false });

    render() {
      console.log(this.state);

      return (
        <div>
          <div style={{ marginLeft: "15px" }}>
            <h2 className="title">
              {this.state.title} ({this.state.id})
          </h2>
          </div>
          <div className="container-fluid" style={{ width: "100%" }}>
            <img
              src={this.state.imagePath}
              alt="img"
              style={{ width: "100%", height: "500px" }}
            ></img>
          </div>
          <hr />
          <div className="moneyduration">
            <div style={{ marginLeft: "15px" }}>
              <h4>Normal Price:{this.state.price.normal}</h4>
              <br />
              <h4>
                Bookable:
              <Icon color="secondary">
                  {this.state.open ? "check" : "close"}
                </Icon>
              </h4>
            </div>
            <br />
            <div style={{ marginLeft: "15px" }}>
              <h4>Duration: {this.state.duration}</h4>
              <br />
              <h4>
                Dates: {this.state.dates.start_date} -{" "}
                {this.state.dates.end_date}
              </h4>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: this.state.description }}
            className="container-fluid"
            style={{ marginTop: "70px", width: "100%", float: "rigth" }}
          ></div>

          <div className="buttons" style={{ marginLeft: "15px" }}>
            <Button
              type="submit"
              className="btn btn-info"
              onClick={this.openModal}
            >
              Edit
          </Button>

            <Button
              className="btn btn-danger"
              onClick={this.open}
              style={{ margin: "2px" }}
            >
              Delete
          </Button>
          </div>
          <hr />

          <div>
            <h2 style={{ marginLeft: "15px" }}>Instructors</h2>
            {this.state.instructor &&
              this.state.instructor.map((instructor, idx) => (
                <span key={idx}>


                  {this.state.instructors.indexOf(instructor.id) !== -1 ?
                    <div>

                      <h6 style={{ marginLeft: "15px" }}>
                        Name: {instructor.name.first} {instructor.name.last}
                      </h6>
                      <br></br>

                      <h6 style={{ marginLeft: "15px" }}>Email:{instructor.email}</h6>
                      <br></br>

                      <h6 style={{ marginLeft: "15px" }}>Bio: {instructor.bio} </h6><br></br><br></br>
                    </div>
                    : ""}
                </span>
              ))}
          </div>

          <hr />

          <Modal show={this.state.isOpen} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit {this.state.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="edit-form">
                <h4>Tutorial</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={this.state.title}
                      onChange={this.onSimpleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="duration">Duration</label>
                    <input
                      variant="outlined"
                      type="text"
                      className="form-control"
                      id="duration"
                      required
                      value={this.state.duration}
                      onChange={this.onSimpleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="imagePath">Image Path</label>
                    <input
                      variant="outlined"
                      type="text"
                      className="form-control"
                      id="imagePath"
                      required
                      value={this.state.imagePath}
                      onChange={this.onSimpleChange}
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
                        onChange={this.onChangeBool}
                      />
                    </label>
                  </div>
                  <hr></hr>
                  <h3>Instructors</h3>
                  <div className="form-group">
                    {this.state.instructor && this.state.instructor.map(
                      (instructor, idx) => (
                        <span key={idx}>
                          <label>
                            <Checkbox
                              variant="outlined"
                              data-variable="instructors"
                              data-format="put"
                              name={instructor.id}
                              value={instructor.id}
                              type="checkbox"
                              checked={this.state.instructors.indexOf(instructor.id) !== -1}

                              onChange={this.onChangeInstructor}
                            />
                            {instructor.name.first} {instructor.name.last}
                          </label>{" "}
                          <br></br>
                        </span>
                      )
                    )}
                    <br></br>
                  </div>

                  <hr></hr>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <br></br>
                    <textarea
                      variant="outlined"
                      style={{ width: "100%" }}
                      id="description"
                      value={this.state.description}
                      onChange={this.onSimpleChange}
                      required
                    />
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
                       value={this.state.dates.start_date}
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
                      value={this.state.dates.end_date}
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
                      className="form-control"
                      id="normal_price"
                      value={this.state.price.normal}
                      onChange={this.onChangePrice}
                      name="normal"
                    />
                  </div>
                </form>

                <p>{this.state.message}</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-primary"
                variant="primary"
                style={{ backgroundColor: "blue" }}
                onClick={this.updateTutorial}
              >
                Save changes
            </Button>
              <Button variant="secondary" onClick={this.closeModal}>
                Cancel
            </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.Open} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Delete {this.state.title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure that you want to delete the course with Title{" "}
              {this.state.title} ?
          </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-primary"
                variant="primary"
                style={{ backgroundColor: "blue" }}
                onClick={this.deleteTutorial}
              >
                Yes
            </Button>
              <Button variant="secondary" onClick={this.close}>
                No
            </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
