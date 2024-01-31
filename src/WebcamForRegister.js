import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "./API";

function WebcamForRegister({ onCameraSetup }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let context;
  const [isStreaming, setIsStreaming] = useState(false);
  const [empCode, setEmpCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [adharNo, setAdharNo] = useState("");
  const [address, setAddress] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [retirementDate, setRetirementDate] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsStreaming(true);

      // Notify the parent component that the camera is set up
      if (onCameraSetup) {
        onCameraSetup();
      }
    };

    if (!isStreaming) {
      setupCamera();
    }
  }, [isStreaming, onCameraSetup]);

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });

        if (result.state === 'granted') {
          // Geolocation is already allowed
          requestLocation();
        } else if (result.state === 'prompt') {
          // Geolocation permission hasn't been decided yet
          console.log('Location permission is pending.');
        } else if (result.state === 'denied') {
          // Geolocation permission is denied
          console.log('Geolocation permission is denied.');
        }
      } catch (error) {
        console.error('Error checking geolocation permission:', error);
      }
    };

    checkLocationPermission();
  }, []);

  useEffect(() => {
    if (empCode.trim() !== '') {
      const url=API_BASE_URL+`/fetchEmployeeByEmpCode?employeeCode=${empCode}`
      axios.get(url)
        .then(response => {
          const data=response.data;
          setEmployeeName(data[0][2]+" "+data[0][3]+" "+data[0][4]);
          setMobileNo(data[0][12]);
          setAdharNo(data[0][21]);
//          setAddress(data[0][2]);
          setJoiningDate(data[0][9]);
          setRetirementDate(data[0][10]);
//          setCurrentAddress(data[0][2]);
        })
        .catch(error => {
          console.error('Error fetching employee data:', error);
        });
    }
  }, [empCode]);
  

  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          console.log(null);
        },
        (error) => {
            console.log(`Error getting location: ${error.message}`);
        }
      );
    } else {
        console.log('Geolocation is not supported in this browser.');
    }
  };

  function register_new_user_ok() {
    if (videoRef.current && canvasRef.current) {
        context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, 400, 300);
  
        canvasRef.current.toBlob((blob) => {
          const apiUrl = API_BASE_URL + "/register_new_user";
          const file = new File([blob], "webcam-frame.png", {
            type: "image/png",
          });
          const formData = new FormData();
          formData.append("file", file);
          formData.append("employeeCode",empCode);
          formData.append("employeeName",employeeName);
          formData.append("mobileNo",mobileNo);
          formData.append("adharNo",adharNo);
          formData.append("address",address);
          formData.append("joiningDate",joiningDate);
          formData.append("retirementDate",retirementDate);
          formData.append("currentAddress",currentAddress);

          console.log(empCode);
          axios
            .post(apiUrl, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.registration_status === 200) {
                    alert("User was registered successfully!");
                    setEmpCode("");
                    setEmployeeName("");
                    setMobileNo("");
                    setAdharNo("");
                    setAddress("");
                    setJoiningDate("");
                    setRetirementDate("");
                    setCurrentAddress("");
                }
              })
              .catch((error) => {
                console.error("Error sending image to API:", error);
              });
         });
       }
  }

  return (
    <>
      <div className="webcam">
        <canvas ref={canvasRef} width={400} height={300} />
        <video ref={videoRef} autoPlay playsInline />
      </div>
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginLeft: '10px', width: '400px' }}>
            {/* Registration Form */}
            <h2 style={{ textAlign: 'center' }}>Registration Form</h2>
            <form>
              <label>
                Employee Code:
                <input type="text" name="employeeCode" value={empCode} onChange={(event) => setEmpCode(event.target.value)} className='register-text'/>
              </label>
              <br />
              <label>
                Employee Name:
                <input type="text" name="employeeName" value={employeeName} onChange={(event) => setEmployeeName(event.target.value)} className='register-text'/>
              </label>
              <br />
              <label>
                Mobile No.:
                <input type="text" name="mobileNo" value={mobileNo} onChange={(event) => setMobileNo(event.target.value)} className='register-text'/>
              </label>
              <br />
              <label>
                Adhar No.:
                <input type="text" name="adharNo" value={adharNo} onChange={(event) => setAdharNo(event.target.value)} className='register-text'/>
              </label>
              <br />
              <label>
                Address:
                <input type="text" name="address" value={address}  onChange={(event) => setAddress(event.target.value)} className='register-text'/>
              </label>
              <br />
              {/* <label>
                Joining Date:
                <input type="text" name="joiningDate" value={joiningDate} onChange={(event) => setJoiningDate(event.target.value)} className='register-text'/>
              </label>
              <br />
              <label>
                Retirement Date:
                <input type="text" name="retirementDate" value={retirementDate} onChange={(event) => setRetirementDate(event.target.value)} className='register-text'/>
              </label>
              <br /> */}
              <label>
                Current Address:
                <input type="text" name="currentAddress" value={currentAddress} onChange={(event) => setCurrentAddress(event.target.value)} className='register-text'/>
              </label>
              <br />
            </form>
          </div>
      <button type="submit" style={{ width: '30%', padding: '10px', fontSize: '16px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',position:'absolute',left:500,bottom:0 }}
            onClick={async () => {
                register_new_user_ok();
            }}
          >
            Capture & Submit
          </button>
    </>
  );
}

export default WebcamForRegister;
