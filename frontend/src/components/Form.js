import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genderHandler: props.genderHandler,
      situationHandler: props.situationHandler,
      addressHandler: props.addressHandler,
      address: props.address,
      submitHandler: props.submitHandler,
      ageHandler: props.ageHandler,
      situation: "",
      gender: "",
    };
  }

  setGender = (e) => {
    this.setState({ gender: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state.address);
    console.log(this.state.gender);
    console.log(this.state.situation);
    this.state.addressHandler(this.state.address);
    this.state.genderHandler(this.state.gender);
    this.state.situationHandler(this.state.situation);
    this.state.submitHandler();
  };

  render() {
    return (
      <div className="testbox">
        <form action="/">
          <p id="h1">Emergency Information From</p>
          <p id="h4">
            Current Locaiton<span>*</span>
          </p>
          <input
            placeholder="Enter your address"
            type="text"
            className="input"
            value={this.state.address}
            onChange={(e) => this.setState({ address: e.target.value })}
          />
          <p id="h4">
            What is the individual's birth assigned gender?<span>*</span>
          </p>
          <table>
            <tbody>
              <tr>
                <th className="first-col"></th>
                <th className="gender-options">Female</th>
                <th className="gender-options">Male</th>
                <th className="gender-options">Other</th>
                <th className="gender-options">Prefer not to disclose</th>
              </tr>
              <tr>
                <td className="first-col">Gender</td>
                <td>
                  <input
                    name="point#2"
                    value="female"
                    type="radio"
                    onClickCapture={this.setGender}
                  />
                </td>
                <td>
                  <input
                    name="point#2"
                    value="male"
                    type="radio"
                    onClickCapture={this.setGender}
                  />
                </td>
                <td>
                  <input
                    name="point#2"
                    value="other"
                    type="radio"
                    onClickCapture={this.setGender}
                  />
                </td>
                <td>
                  <input
                    name="point#2"
                    value="prefer not to disclose"
                    type="radio"
                    onClickCapture={this.setGender}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <p id="h4">Please describe the emergency situation:</p>
          <textarea
            rows="5"
            value={this.state.situation}
            onChange={(e) => this.setState({ situation: e.target.value })}
          ></textarea>
          <div className="btn-block">
            <button onClick={this.submitHandler}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
