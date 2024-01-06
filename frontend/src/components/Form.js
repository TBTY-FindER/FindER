import React from "react";

class Form extends React.Component {
  render() {
    return (
      <div className="testbox">
        <form action="/">
          <p id="h1">Feedback Form</p>
          <p id="h4">Name</p>
          <input
            placeholder="Enter your full name"
            type="text"
            className="input"
          />
          <p id="h4">
            Email<span>*</span>
          </p>
          <input placeholder="Enter your email" type="text" className="input" />
          <p id="h4">
            What is your overall impression?<span>*</span>
          </p>
          <table>
            <tbody>
              <tr>
                <th className="first-col"></th>
                <th>Very Satisfied</th>
                <th>Satisfied</th>
                <th>Unsatisfied</th>
                <th>Very Unsatisfied</th>
              </tr>
              <tr>
                <td className="first-col">Professional</td>
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
          <p id="h4">Feel free to add any other comments or suggestions:</p>
          <textarea rows="5"></textarea>
          <div className="btn-block">
            <button type="submit">Send Feedback</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
