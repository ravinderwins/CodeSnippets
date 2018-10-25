import React, { Component } from "react";
import FormValidator from "../../common/FormValidator";

// Child component of proffile page to show contact details
class ContactDetails extends React.Component {
  constructor() {
    super();

    this.validator = new FormValidator([
      {
        field: "personalemail",
        method: "isEmpty",
        validWhen: false,
        message: "Personal email is required"
      },
      {
        field: "personalemail",
        method: "isEmail",
        validWhen: true,
        message: "Email is not in valid format"
      },
      {
        field: "alternateemail",
        method: "isEmail",
        validWhen: true,
        message: "Email is not in valid format"
      },
      {
        field: "contactnumber",
        method: "isEmpty",
        validWhen: false,
        message: "Pleave provide a phone number"
      },
      {
        field: "contactnumber",
        method: "isNumeric",
        validWhen: true,
        message: "That is not a valid phone number"
      },
      {
        field: "contactnumber",
        method: "matches",
        args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/],
        validWhen: true,
        message: "That is not a valid phone number"
      },
      {
        field: "alternatenumber",
        method: "isNumeric",
        validWhen: true,
        message: "That is not a valid phone number"
      },
      {
        field: "alternatenumber",
        method: "matches",
        args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/],
        validWhen: true,
        message: "That is not a valid phone number"
      },
      {
        field: "address",
        method: "isEmpty",
        validWhen: false,
        message: "Address is required"
      },
      {
        field: "city",
        method: "isEmpty",
        validWhen: false,
        message: "City is required"
      },
      {
        field: "state",
        method: "isEmpty",
        validWhen: false,
        message: "State is required"
      },
      {
        field: "zipcode",
        method: "isEmpty",
        validWhen: false,
        message: "Zip code is required"
      },
      {
        field: "zipcode",
        method: "isNumeric",
        validWhen: true,
        message: "That is not a valid zip code"
      },
      {
        field: "country",
        method: "isEmpty",
        validWhen: false,
        message: "Coutry is required"
      },
      {
        field: "correspondencezipcode",
        method: "isNumeric",
        validWhen: true,
        message: "That is not a valid zip code"
      }
    ]);

    this.state = {
      personalemail: "",
      alternateemail: "",
      skypeid: "",
      contactnumber: "",
      alternatenumber: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      correspondenceaddress: "",
      correspondencecity: "",
      correspondencestate: "",
      correspondencecountry: "",
      correspondencezipcode: "",
      validation: this.validator.valid()
    };
    this.submitted = false;
  }

  handleSubmit = e => {
    e.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      let blocking = true;
      this.props.handler(blocking);
      var data = {
        UserBasicInformationId:localStorage.getItem('BasicInfoId'),
          personalemail: this.refs.personalemail.value,
          alternateemail: this.refs.alternateemail.value,
          skypeid: this.refs.skypeid.value,
          contactnumber: this.refs.contactnumber.value,
          alternatenumber: this.refs.alternatenumber.value,
          permanentaddress: this.refs.address.value,
          permanentcity: this.refs.city.value,
          permanentstate: this.refs.state.value,
          permanentzipcode: this.refs.zipcode.value,
          permanentcountry: this.refs.country.value,
          // sameaspermanent: this.refs.sameaspermanent.value,
          correspondenceaddress: this.refs.correspondenceaddress.value,
          correspondencecity: this.refs.correspondencecity.value,
          correspondencestate: this.refs.correspondencestate.value,
          correspondencecountry: this.refs.correspondencecountry.value,
          correspondencezipcode: this.refs.correspondencezipcode.value
        },
        url = "http://localhost:64519/CommonAPI/AddContactDetails";
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

  handleInputChange = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handlePermanentAddressChange = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
    this.handleSameAddress();
  };

  handleSameAddress = e => {
    let val = this.refs.sameaspermanent.checked;
    if (val) {
      this.setState({
        correspondenceaddress: this.refs.address.value,
        correspondencecity: this.refs.city.value,
        correspondencestate: this.refs.state.value,
        correspondencecountry: this.refs.country.value,
        correspondencezipcode: this.refs.zipcode.value
      });
    } else {
      this.setState({
        correspondenceaddress: "",
        correspondencecity: "",
        correspondencestate: "",
        correspondencecountry: "",
        correspondencezipcode: ""
      });
    }
  };

  render() {
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;
    return (
      // Section to submit contact details
      <form
        noValidate
        id="form_advanced_validation"
        method="POST"
        onSubmit={this.handleSubmit}
      >
        <h2 className="card-inside-title">Please enter your contact details</h2>
        <div className="row clearfix">
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="personalemail">Personal Email</label>
                <input
                  type="Email"
                  className="form-control"
                  placeholder="Personal Email"
                  ref="personalemail"
                  name="personalemail"
                  value={this.state.personalemail}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <label
                className={validation.personalemail.isInvalid ? "error" : ""}
              >
                {validation.personalemail.message}
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="alternateemail">Alternate Email</label>
                <input
                  type="Email"
                  className="form-control"
                  placeholder="Alternate Email"
                  ref="alternateemail"
                  name="alternateemail"
                  value={this.state.alternateemail}
                  onChange={this.handleInputChange}
                />
              </div>
              <label
                className={validation.alternateemail.isInvalid ? "error" : ""}
              >
                {validation.alternateemail.message}
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="skypeid">Skype Id</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Skype Id"
                  ref="skypeid"
                  name="skypeid"
                  value={this.state.skypeid}
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
                <label htmlFor="contactnumber">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contact Number"
                  ref="contactnumber"
                  name="contactnumber"
                  value={this.state.contactnumber}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
              <label
                className={validation.contactnumber.isInvalid ? "error" : ""}
              >
                {validation.contactnumber.message}
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="alternatenumber">Alternate Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Alternate Number"
                  ref="alternatenumber"
                  name="alternatenumber"
                  value={this.state.alternatenumber}
                  onChange={this.handleInputChange}
                />
              </div>
              <label
                className={validation.alternatenumber.isInvalid ? "error" : ""}
              >
                {validation.alternatenumber.message}
              </label>
            </div>
          </div>
        </div>
        <h2 className="card-inside-title">Permanent Address</h2>
        <div className="row clearfix">
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  ref="address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handlePermanentAddressChange}
                  required
                />
              </div>
              <label className={validation.address.isInvalid ? "error" : ""}>
                {validation.address.message}
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  ref="city"
                  name="city"
                  value={this.state.city}
                  onChange={this.handlePermanentAddressChange}
                  required
                />
              </div>
              <label className={validation.city.isInvalid ? "error" : ""}>
                {validation.city.message}
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  ref="state"
                  name="state"
                  value={this.state.state}
                  onChange={this.handlePermanentAddressChange}
                  required
                />
              </div>
              <label className={validation.state.isInvalid ? "error" : ""}>
                {validation.state.message}
              </label>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="zipcode">ZIP Code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ZIP Code"
                  ref="zipcode"
                  name="zipcode"
                  value={this.state.zipcode}
                  onChange={this.handlePermanentAddressChange}
                  required
                />
              </div>
              <label className={validation.zipcode.isInvalid ? "error" : ""}>
                {validation.zipcode.message}
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  ref="country"
                  name="country"
                  value={this.state.country}
                  onChange={this.handlePermanentAddressChange}
                  required
                />
              </div>
              <label className={validation.country.isInvalid ? "error" : ""}>
                {validation.country.message}
              </label>
            </div>
          </div>
        </div>
        <div style={{ display: "inline-block", width: "100%" }}>
          <h2 className="card-inside-title">Correspondence Address</h2>
          <div style={{ float: "right" }}>
            <input
              type="checkbox"
              id="md_checkbox_1"
              className="chk-col-red"
              defaultChecked=""
              ref="sameaspermanent"
              onChange={e => this.handleSameAddress(e)}
            />
            <label htmlFor="md_checkbox_1">Same As Permanent</label>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="correspondenceaddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  ref="correspondenceaddress"
                  name="correspondenceaddress"
                  value={this.state.correspondenceaddress}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="correspondencecity">City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  ref="correspondencecity"
                  name="correspondencecity"
                  value={this.state.correspondencecity}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="correspondencestate">State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  ref="correspondencestate"
                  name="correspondencestate"
                  value={this.state.correspondencestate}
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
                <label htmlFor="correspondencezipcode">ZIP Code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ZIP Code"
                  ref="correspondencezipcode"
                  name="correspondencezipcode"
                  value={this.state.correspondencezipcode}
                  onChange={this.handleInputChange}
                />
              </div>
              
              <label className={validation.correspondencezipcode.isInvalid ? "error" : ""}>
                {validation.correspondencezipcode.message}
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group">
              <div className="form-line">
                <label htmlFor="correspondencecountry">Country</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  ref="correspondencecountry"
                  name="correspondencecountry"
                  value={this.state.correspondencecountry}
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

export default ContactDetails;
