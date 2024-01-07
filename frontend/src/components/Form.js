import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genderHandler: props.genderHandler,
      situationHandler: props.situationHandler,
      addressHandler: props.addressHandler,
      address: props.address,
      situation: "",
    };
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state.address);
  };

  render() {
    return (
      <div className="testbox">
        <form action="/">
          <p id="h1">Emergency Information From</p>
          <p id="h4">Current Locaiton</p>
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
                  <input name="point#2" type="radio" />
                </td>
                <td>
                  <input name="point#2" value="none" type="radio" />
                </td>
                <td>
                  <input name="point#2" value="none" type="radio" />
                </td>
                <td>
                  <input name="point#2" value="none" type="radio" />
                </td>
              </tr>
            </tbody>
          </table>
          <p id="h4">Please describe the emergency situation:</p>
          <textarea rows="5"></textarea>
          <div className="btn-block">
            <button onClick={this.submitHandler}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
