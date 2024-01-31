// import React, { useRef, useEffect, useState } from "react";
// import axios from "axios";
// import API_BASE_URL from "./API";
// import * as faceapi from "face-api.js";
// import Webcam from "./Webcam";

// // Load face-api.js models
// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
//   faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//   faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//   faceapi.nets.faceExpressionNet.loadFromUri("/models"),
// ]);

// let videoRef;
// let canvasRef;
// let context;

// function MasterComponent() {
//   let [lastFrame, setLastFrame] = useState(null);
//   const [showWebcam, setShowWebcam] = useState(true);
//   const [showImg, setShowImg] = useState(false);

//   async function downloadLogs() {
//     const response = await axios.get(API_BASE_URL + "/get_attendance_logs", {
//       responseType: "blob",
//     });

//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "logs.zip");
//     document.body.appendChild(link);
//     link.click();
//   }

//   function send_img_login() {
//     if (videoRef.current && canvasRef.current) {
//       context = canvasRef.current.getContext("2d");
//       context.drawImage(videoRef.current, 0, 0, 400, 300);

//       canvasRef.current.toBlob((blob) => {
//         const apiUrl = API_BASE_URL + "/login";
//         const file = new File([blob], "webcam-frame.png", {
//           type: "image/png",
//         });
//         const formData = new FormData();
//         formData.append("file", file);

//         axios
//           .post(apiUrl, formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           })
//           .then((response) => {
//             console.log(response.data);
//             if (response.data.match_status === true) {
//               alert("Welcome back " + response.data.user + " !");
//             } else {
//               alert("Unknown user! Please try again or register new user!");
//             }
//           })
//           .catch((error) => {
//             console.error("Error sending image to API:", error);
//           });
//       });
//     }
//   }

//   function send_img_logout() {
//     if (videoRef.current && canvasRef.current) {
//       context = canvasRef.current.getContext("2d");
//       context.drawImage(videoRef.current, 0, 0, 400, 300);

//       canvasRef.current.toBlob((blob) => {
//         const apiUrl = API_BASE_URL + "/logout";
//         const file = new File([blob], "webcam-frame.png", {
//           type: "image/png",
//         });
//         const formData = new FormData();
//         formData.append("file", file);

//         axios
//           .post(apiUrl, formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           })
//           .then((response) => {
//             console.log(response.data);
//             if (response.data.match_status === true) {
//               alert("Goodbye " + response.data.user + " !");
//             } else {
//               alert("Unknown user! Please try again or register new user!");
//             }
//           })
//           .catch((error) => {
//             console.error("Error sending image to API:", error);
//           });
//       });
//     }
//   }

  // function register_new_user_ok(text) {
  //   if (lastFrame) {
  //     const apiUrl = API_BASE_URL + "/register_new_user";

  //     const formData = new FormData();
  //     formData.append("text", text);

  //     fetch(lastFrame)
  //       .then((response) => response.blob())
  //       .then((blob) => {
  //         const file = new File([blob], "webcam-frame.png", {
  //           type: "image/png",
  //         });
  //         formData.append("file", file);

  //         axios
  //           .post(apiUrl, formData, {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //             },
  //           })
  //           .then((response) => {
  //             console.log(response.data);
  //             if (response.data.registration_status === 200) {
  //               alert("User was registered successfully!");
  //             }
  //           })
  //           .catch((error) => {
  //             console.error("Error sending image to API:", error);
  //           });
  //       });
  //   }
  // }

//   return (
//     <div className="master-component">
//       {showWebcam ? (
//         <Webcam lastFrame={lastFrame} setLastFrame={setLastFrame} />
//       ) : (
//         <img className="img" src={lastFrame} alt="Webcam frame" />
//       )}
//       <Buttons
//         lastFrame={lastFrame}
//         setLastFrame={setLastFrame}
//         setShowWebcam={setShowWebcam}
//         showWebcam={showWebcam}
//         setShowImg={setShowImg}
//         send_img_login={send_img_login}
//         send_img_logout={send_img_logout}
//         register_new_user_ok={register_new_user_ok}
//         downloadLogs={downloadLogs}
//       />
//     </div>
//   );
// }

// function saveLastFrame(
//   canvasRef,
//   lastFrame,
//   setLastFrame,
//   setShowWebcam,
//   showWebcam,
//   setShowImg
// ) {
//   requestAnimationFrame(() => {
//     if (!showWebcam && lastFrame) {
//       setShowImg(true);
//     } else {
//       setShowImg(false);
//     }

//     if (videoRef.current && canvasRef.current) {
//       context = canvasRef.current.getContext("2d");
//       context.drawImage(videoRef.current, 0, 0, 400, 300);

//       canvasRef.current.toBlob((blob) => {
//         setLastFrame(URL.createObjectURL(blob));
//       });
//       setShowWebcam(false);
//       setShowImg(true);
//     }
//   });
// }

// // function Webcam({ lastFrame, setLastFrame }) {
// //   videoRef = useRef(null);
// //   canvasRef = useRef(null);
// //   const [isStreaming, setIsStreaming] = useState(false);

// //   useEffect(() => {
// //     const setupCamera = async () => {
// //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //       videoRef.current.srcObject = stream;
// //       setIsStreaming(true);
// //     };
// //     if (!isStreaming) {
// //       setupCamera();
// //     }
// //   }, [isStreaming]);

// //   useEffect(() => {
// //     if (isStreaming) {
// //       context = canvasRef.current.getContext("2d");
// //       context.drawImage(videoRef.current, 0, 0, 400, 300);

// //       requestAnimationFrame(() => {
// //         setTimeout(() => {
// //           context.drawImage(videoRef.current, 0, 0, 400, 300);

// //           canvasRef.current.toBlob((blob) => {
// //             setLastFrame(URL.createObjectURL(blob));
// //           });
// //         }, 33);
// //       });
// //     }
// //   }, [isStreaming]);

// //   useEffect(() => {
// //     const detectBlink = async () => {
// //       if (isStreaming) {
// //         const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
// //         if (detections.length > 0) {
// //           const leftEye = detections[0].landmarks.getLeftEye();
// //           const rightEye = detections[0].landmarks.getRightEye();

// //           const leftEyeOpenProbability = detections[0].expressions["eyeLeftOpen"];
// //           const rightEyeOpenProbability = detections[0].expressions["eyeRightOpen"];

// //           const isBlinking = leftEyeOpenProbability < 0.1 && rightEyeOpenProbability < 0.1;

// //           if (isBlinking) {
// //             console.log("Blink detected!");
// //             // Handle blink event here
// //           }
// //         }
// //       }
// //     };

// //     const intervalId = setInterval(detectBlink, 100); // Adjust the interval as needed

// //     return () => clearInterval(intervalId);
// //   }, [isStreaming]);

// //   return (
// //     <div className="webcam">
// //       <canvas ref={canvasRef} width={400} height={300} />
// //       <video ref={videoRef} autoPlay playsInline />
// //     </div>
// //   );
// // }

// function Buttons({
//   lastFrame,
//   setLastFrame,
//   setShowWebcam,
//   showWebcam,
//   setShowImg,
//   send_img_login,
//   send_img_logout,
//   register_new_user_ok,
//   downloadLogs,
// }) {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);

//   const [zIndexAdmin, setZIndexAdmin] = useState(1);
//   const [zIndexRegistering, setZIndexRegistering] = useState(1);

//   const changeZIndexAdmin = (newZIndex) => {
//     setZIndexAdmin(newZIndex);
//   };

//   const changeZIndexRegistering = (newZIndex) => {
//     setZIndexRegistering(newZIndex);
//   };

//   const [value, setValue] = useState("");
//   const [employeeName, setEmployeeName] = useState("");
//   const [empMobile, setEmpMobile] = useState("");

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };

//   const resetTextBox = () => {
//     setValue("");
//   };

//   return (
//     <div className="buttons-container">
//       <div
//         className={`${
//           isRegistering ? "visible" : "hidden"
//         } register-text-container`}
//         style={{
//           zIndex: zIndexRegistering,
//         }}
//       >
//         <input
//           className="register-text"
//           type="text"
//           placeholder="Enter Employee Code"
//           value={value}
//           onChange={handleChange}
//         />

//         <input
//           className="register-text"
//           type="text"
//           placeholder="Employee Name"
//           value={value}
//           onChange={handleChange}
//         />

//       </div>
//       <div
//         className="register-ok-container"
//         style={{
//           zIndex: zIndexRegistering,
//         }}
//       >
//         <button
//           className={`${
//             isRegistering ? "visible" : "hidden"
//           } register-ok-button`}
//           onClick={async () => {
//             setIsAdmin(false);
//             setIsRegistering(false);

//             changeZIndexAdmin(1);
//             changeZIndexRegistering(1);

//             setShowWebcam(true);
//             setShowImg(false);
//             register_new_user_ok(value);
//           }}
//         >Register</button>
//       </div>
//       <div
//         className="register-cancel-container"
//         style={{
//           zIndex: zIndexRegistering,
//         }}
//       >
//         <button
//           className={`${
//             isRegistering ? "visible" : "hidden"
//           } register-cancel-button`}
//           onClick={async () => {
//             setIsAdmin(false);
//             setIsRegistering(false);

//             changeZIndexAdmin(1);
//             changeZIndexRegistering(1);

//             setShowWebcam(true);
//             setShowImg(false);
//           }}
//         >Cancel</button>
//       </div>
//       <div className="login-container">
//         <button
//           className={`${
//             isAdmin || isRegistering ? "hidden" : "visible"
//           } login-button`}
//           onClick={async () => {
//             send_img_login();
//           }}
//         ></button>
//       </div>
//       <div className="logout-container">
//         <button
//           className={`${
//             isAdmin || isRegistering ? "hidden" : "visible"
//           } logout-button`}
//           onClick={() => {
//             send_img_logout();
//           }}
//         ></button>
//       </div>
//       <div className="admin-container">
//         <button
//           className={`${
//             isAdmin || isRegistering ? "hidden" : "visible"
//           } admin-button`}
//           onClick={() => {
//             setIsAdmin(true);
//             setIsRegistering(false);

//             changeZIndexAdmin(3);
//             changeZIndexRegistering(1);
//           }}
//         ></button>
//       </div>
//       <div
//         className="register-container"
//         style={{
//           zIndex: zIndexAdmin,
//         }}
//       >
//         <button
//           className={`${isAdmin ? "visible" : "hidden"} register-button`}
//           onClick={() => {
//             setIsAdmin(false);
//             setIsRegistering(true);

//             changeZIndexAdmin(1);
//             changeZIndexRegistering(3);

//             saveLastFrame(
//               canvasRef,
//               lastFrame,
//               setLastFrame,
//               setShowWebcam,
//               showWebcam,
//               setShowImg
//             );
//             resetTextBox();
//           }}
//         ></button>
//       </div>
//       <div
//         className="goback-container"
//         style={{
//           zIndex: zIndexAdmin,
//         }}
//       >
//         <button
//           className={`${isAdmin ? "visible" : "hidden"} goback-button`}
//           onClick={() => {
//             setIsAdmin(false);
//             setIsRegistering(false);

//             changeZIndexAdmin(1);
//             changeZIndexRegistering(1);
//           }}
//         ></button>
//       </div>
//       <div
//         className="download-container"
//         style={{
//           zIndex: zIndexAdmin,
//         }}
//       >
//         <button
//           className={`${isAdmin ? "visible" : "hidden"} download-button`}
//           onClick={() => {
//             setIsAdmin(false);
//             setIsRegistering(false);

//             changeZIndexAdmin(1);
//             changeZIndexRegistering(1);

//             downloadLogs();
//           }}
//         ></button>
//       </div>
//     </div>
//   );
// }

// export default MasterComponent;
