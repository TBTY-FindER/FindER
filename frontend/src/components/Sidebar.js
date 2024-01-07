import React from 'react';
// import Form from './Form'; // Import the Form component

function SidebarContent({ address, setAddress, gender, setGender, age, setAge, situation, setSituation }) {
    const contentStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '20px', // Add padding for spacing inside the sidebar
    };
  
    const inputStyle = {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      background: '#f8f8f8', // Background color similar to the form's input
    };
  
    const labelStyle = {
      marginBottom: '5px',
      fontWeight: 'bold',
    };
  
    const radioGroupStyle = {
      display: 'flex',
      flexDirection: 'column', // Stack radio buttons vertically
      gap: '10px',
    };
  
    return (
      <div style={contentStyle}>
        <div>
          <p id="h4">Current Location<span>*</span></p>
          <input
            type="text"
            style={inputStyle}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        </div>
        <div>
          <p id="h4">What is the individual's birth assigned gender?<span>*</span></p>
          <div style={radioGroupStyle}>
            {["female", "male", "other", "prefer not to disclose"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={gender === option}
                  onChange={(e) => setGender(e.target.value)}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)} {/* Capitalize the first letter */}
              </label>
            ))}
          </div>
        </div>
        <div>
          <p id="h4">Age<span>*</span></p>
          <input
            type="number"
            style={inputStyle}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <p id="h4">Please describe the emergency situation:<span>*</span></p>
          <textarea
            style={inputStyle}
            rows="5"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="Describe the situation"
          ></textarea>
        </div>
      </div>
    );
  }
  


function Sidebar({ isVisible, closeSidebar, address, setAddress, gender, setGender, age, setAge, situation, setSituation }) {
    const sidebarStyle = {
        height: '100vh',
        width: isVisible ? '300px' : '0', // Control width based on visibility
        position: 'fixed',
        zIndex: '1',
        top: '0',
        left: isVisible ? '0' : '-300px', // Slide in from the left
        backgroundColor: '#fff', // White background
        overflowX: 'hidden',
        transition: '0.5s',
        padding: isVisible ? '20px' : '0',
      };

  return (
    <div style={sidebarStyle}>
      <SidebarContent
        address={address}
        setAddress={setAddress}
        gender={gender}
        setGender={setGender}
        age={age} // Add age prop
        setAge={setAge}
        situation={situation}
        setSituation={setSituation}
      />
    </div>
  );
}

export default Sidebar;
