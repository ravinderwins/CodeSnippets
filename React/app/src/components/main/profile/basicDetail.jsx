import React, { Component } from "react";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import moment from "moment";
import FormValidator from "../../common/FormValidator";

//Child component of profile page to show basic details
class BasicDetails extends React.Component {
  constructor() {
    super();

    this.validator = new FormValidator([
      {
        field: "firstname",
        method: "isEmpty",
        validWhen: false,
        message: "First name is required"
      },
      {
        field: "lastname",
        method: "isEmpty",
        validWhen: false,
        message: "Last name is required"
      },
      {
        field: "fathername",
        method: "isEmpty",
        validWhen: false,
        message: "Father name is required"
      },
      {
        field: "nationality",
        method: "isEmpty",
        validWhen: false,
        message: "Nationality is required"
      },
      {
        field: "dob",
        method: "isEmpty",
        validWhen: false,
        message: "Date of birth is required"
      },
      {
        field: "dateofjoining",
        method: "isEmpty",
        validWhen: false,
        message: "Date of joining is required"
      }
    ]);
    this.state = {
      firstname: "",
      middlename: "",
      lastname: "",
      fathername: "",
      mothername: "",
      nationality: "",
      gender: "",
      bloodgroup: "",
      meritalstatus: "",
      religion: "",
      hobbies: "",
      options: [
        { id: "0", value: "Male" },
        { id: "1", value: "Female" },
        { id: "2", value: "Other" }
      ],
      dob: moment(),
      dateofjoining: moment(),
      anniversarydate: moment(),
      validation: this.validator.valid()
    };
    this.submitted = false;
  }

  handledob = moment => {
    let newState = this.state;
    newState.dob = moment;
    this.setState(newState);
  };
  handledoj = moment => {
    let newState = this.state;
    newState.dateofjoining = moment;
    this.setState(newState);
  };
  handleAnniversary = moment => {
    let newState = this.state;
    newState.anniversarydate = moment;
    this.setState(newState);
  };
  handleInputChange = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      let blocking = true;
      this.props.handler(blocking);
      var data = {
          firstname: this.refs.firstname.value,
          middlename: this.refs.middlename.value,
          lastname: this.refs.lastname.value,
          fathername: this.refs.fathername.value,
          mothername: this.refs.mothername.value,
          nationality: this.refs.nationality.value,
          gender: this.refs.gender.value,
          bloodgroup: this.refs.bloodgroup.value,
          meritalstatus: this.refs.meritalstatus.value,
          dob: this.refs.dob.value,
          anniversarydate: this.refs.anniversarydate.value,
          dateofjoining: this.refs.dateofjoining.value,
          religion: this.refs.religion.value,
          hobbies: this.refs.hobbies.value
        },
        url = "http://localhost:64519/CommonAPI/AddBasicDetails";
      this.props
        .APICall(url, data)
        .then(res => {
          let blocking = false;
          this.props.handler(blocking);
          if (res.Success) {
            this.handleRedirect();
          } else {
            alert(res.Message);
          }
        })
        .catch(error => {
          let blocking = false;
          this.props.handler(blocking);
          alert(error + "catch block executed");
        });
    }
  };

  render() {
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <h2 className="card-inside-title">Please enter your basic details</h2>
        <div className="row clearfix">
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  ref="firstname"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <label
                className={validation.firstname.isInvalid ? "error" : ""}
              >
                {validation.firstname.message}
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="middlename">Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Middle Name"
                  ref="middlename"
                  name="middlename"
                  value={this.state.middlename}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  ref="lastname"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <label
                className={validation.lastname.isInvalid ? "error" : ""}
              >
                {validation.lastname.message}
              </label>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="fathername">Father Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Father Name"
                  ref="fathername"
                  name="fathername"
                  value={this.state.fathername}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <label
                className={validation.fathername.isInvalid ? "error" : ""}
              >
                {validation.fathername.message}
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="mothername">Mother Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mother Name"
                  ref="mothername"
                  name="mothername"
                  value={this.state.mothername}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="nationality">Nationality</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nationality"
                  ref="nationality"
                  name="nationality"
                  value={this.state.nationality}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <label
                className={validation.nationality.isInvalid ? "error" : ""}
              >
                {validation.nationality.message}
              </label>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="gender">Gender</label>
                <select
                  className="form-control"
                  ref="gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.handleInputChange}
                >
                  {this.state.options.map(o => {
                    return (
                      <option value={o.id} key={o.id}>
                        {o.value}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="bloodgroup">Blood Group</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Blood Group"
                  ref="bloodgroup"
                  name="bloodgroup"
                  value={this.state.bloodgroup}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="meritalstatus">Marital Status</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Marital Status"
                  ref="meritalstatus"
                  name="meritalstatus"
                  value={this.state.meritalstatus}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="dob">Date Of Birth</label>
                <DatetimePickerTrigger
                  name="dob"
                  moment={this.state.dob}
                  onChange={e => this.handledob(e)}
                  showTimePicker={false}
                  closeOnSelectDay={true}
                  format="DD'/'MM'/'YYYY"
                >
                  <input
                    type="text"
                    placeholder="Date Of Birth"
                    ref="dob"
                    value={this.state.dob.format("DD-MM-YYYY")}
                    readOnly
                  />
                </DatetimePickerTrigger>
              </div>
              <label
                className={validation.dob.isInvalid ? "error" : ""}
              >
                {validation.dob.message}
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="anniversarydate">Anniversary Date</label>
                <DatetimePickerTrigger
                  name="anniversarydate"
                  moment={this.state.anniversarydate}
                  onChange={e => this.handleAnniversary(e)}
                  showTimePicker={false}
                  closeOnSelectDay={true}
                  format="DD'/'MM'/'YYYY"
                >
                  <input
                    type="text"
                    placeholder="Anniversary Date"
                    ref="anniversarydate"
                    value={this.state.anniversarydate.format("DD-MM-YYYY")}
                    readOnly
                  />
                </DatetimePickerTrigger>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="dateofjoining">Date Of Joining</label>
                <DatetimePickerTrigger
                  name="dateofjoining"
                  moment={this.state.dateofjoining}
                  onChange={e => this.handledoj(e)}
                  showTimePicker={false}
                  closeOnSelectDay={true}
                  format="DD'/'MM'/'YYYY"
                >
                  <input
                    type="text"
                    placeholder="Date Of Joining"
                    ref="dateofjoining"
                    value={this.state.dateofjoining.format("DD-MM-YYYY")}
                    readOnly
                  />
                </DatetimePickerTrigger>
              </div>
              <label
                className={validation.dateofjoining.isInvalid ? "error" : ""}
              >
                {validation.dateofjoining.message}
              </label>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="religion">Religion</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Religion"
                  ref="religion"
                  name="religion"
                  value={this.state.religion}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="hobbies">Hobbies</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Hobbies"
                  ref="hobbies"
                  name="hobbies"
                  value={this.state.hobbies}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary waves-effect" type="submit">
          SUBMIT
        </button>
      </form>
    );
  }
}

export default BasicDetails;
