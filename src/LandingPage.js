import React, { useState,useRef  } from 'react';
import Webcam from './Webcam';
import axios from "axios";
import API_BASE_URL from "./API";
import WebcamForRegister from './WebcamForRegister';

const LandingPage = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showVerifyForm, setShowVerifyForm] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let context;
  let isCameraSetup = false; // Track whether the camera is set up

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
    setShowVerifyForm(false);
  };

  const handleVerifyClick = () => {
    setShowVerifyForm(true);
    setShowRegistrationForm(false);
  };

  const handleBackClick = () => {
    setShowRegistrationForm(false);
    setShowVerifyForm(false);
  };

  const handleCameraSetup = () => {
    isCameraSetup = true;
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      {/* Left Div for Registration */}
      <div style={{ display: showRegistrationForm || showVerifyForm ? 'none' : 'block', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginRight: '10px', width: '200px' }}>
        <h2 style={{ textAlign: 'center' }}>Registration</h2>
        <img
          src="https://via.placeholder.com/150"
          alt="Registration Image"
          style={{ width: '100%', marginBottom: '20px', borderRadius: '8px' }}
        />
        <button
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={handleRegisterClick}
        >
          Register
        </button>
      </div>

      {/* Left Div for Verification */}
      <div style={{ display: showRegistrationForm || showVerifyForm ? 'none' : 'block', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginLeft: '10px', width: '200px' }}>
        <h2 style={{ textAlign: 'center' }}>Verification</h2>
        <img
          src="https://via.placeholder.com/150"
          alt="Verification Image"
          style={{ width: '100%', marginBottom: '20px', borderRadius: '8px' }}
        />
        <button
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={handleVerifyClick}
        >
          Verify
        </button>
      </div>

      {/* Back button */}
      {(showRegistrationForm || showVerifyForm) && (
        <button
          style={{
            width: '100px',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#ccc',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px',
            position:'absolute',
            left:0,
            top:0,
          }}
          onClick={handleBackClick}
        >
          Back
        </button>
      )}

      {/* Display webcam and registration/verification form based on state */}
      {showRegistrationForm && (
        <>
          {/* Webcam Component */}
          <WebcamForRegister videoRef={videoRef} canvasRef={canvasRef} onCameraSetup={handleCameraSetup}/>
        </>
      )}

      {showVerifyForm && (
        <>
          {/* Webcam Component */}
          <Webcam videoRef={videoRef} canvasRef={canvasRef} onCameraSetup={handleCameraSetup} />
        
          {/* Right Div for Verification Form */}
          {/* <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginLeft: '10px', width: '400px' }}>
            <h2 style={{ textAlign: 'center' }}>Verification Form</h2>
            <form>
              <label>
                Employee Code:
                <input type="text" name="employeeCode" className='register-text' readOnly/>
              </label>
              <br />
              <label>
                Employee Name:
                <input type="text" name="employeeName" className='register-text' readOnly/>
              </label>
              <br />
              <label>
                Mobile No.:
                <input type="text" name="mobileNo" className='register-text' readOnly/>
              </label>
              <br />
              <label>
                Adhar No.:
                <input type="text" name="adharNo" className='register-text' readOnly/>
              </label>
              <br />
              <label>
                Address:
                <input type="text" name="address" className='register-text' readOnly/>
              </label>
              <br />
              <label>
                Joining Date:
                <input type="text" name="joiningDate" className='register-text' readOnly/>
              </label>
              <br />
              <label>
                Retirement Date:
                <input type="text" name="retirementDate" className='register-text' readOnly/>
              </label>
              <br />
              <label>
                Current Address:
                <input type="text" name="currentAddress" className='register-text' readOnly/>
              </label>
              <br />
              <button type="submit" style={{ width: '100%', padding: '10px', fontSize: '16px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Submit
              </button>
            </form>
          </div> */}
        </>
      )}
    </div>
  );
};

export default LandingPage;
