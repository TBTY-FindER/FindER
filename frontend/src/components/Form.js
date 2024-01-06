import React from "react";

class Form extends React.Component {
  render() {
    return (
      <div className="testbox">
        <form action="/">
          <p id="h1">Emergency Information From</p>
          <p id="h4">
            Address of the incident<span>*</span>
          </p>
          <input
            placeholder="Enter your address"
            type="text"
            className="input"
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
                <th className="gender-options">Non-Binary</th>
                <th className="gender-options">Prefer not to disclose</th>
              </tr>
              <tr>
                <td className="first-col">Gender</td>
                <td>
                  <input name="point#2" value="none" type="radio" />
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
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;