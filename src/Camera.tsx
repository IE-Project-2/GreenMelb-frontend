import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Camera.css';
import Footer from './Footer.tsx';
import Header from './Header.tsx';

interface DetectedItem {
  snapshot: string;
  category: string;
}

const Camera = () => {
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [showOverlay, setShowOverlay] = useState(true);
  const [classificationDetected, setClassificationDetected] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null); // Reference for video element
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Reference for canvas to capture frames
  const navigate = useNavigate(); // Navigation for other pages
  
  useEffect(() => {
    // Request access to the user's camera
    const getUserMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream; // Set the camera stream to the video element
        }
      } catch (error) {
        console.error("Error accessing camera: ", error);
        setErrorMessage('Failed to access the camera.');
      }
    };

    getUserMedia();

    return () => {
      // Stop camera stream when component is unmounted
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    document.title = 'Live Classification - Green Melb';
  }, []);

  const handleAddItem = async () => {
    if (!canvasRef.current || !videoRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (context) {
      // Draw the video frame on the canvas
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      // Convert the canvas to a Blob (image data)
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          // Send the captured frame to the backend for classification
          const formData = new FormData();
          formData.append('image', blob, 'frame.jpg');

          try {
            const response = await fetch(`http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}/api/videoclassifier/capture_and_classify_frame/`, {
              method: 'POST',
              body: formData,
            });

            const data = await response.json();

            const { classifications } = data;
            if (classifications && (classifications.recyclable > 0 || classifications.ewaste > 0 || classifications.organic > 0)) {
              const snapshotUrl = `http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}${data.processed_file_url}`;

              const newItem: DetectedItem = {
                snapshot: snapshotUrl,
                category: data.detected_categories,
              };

              setDetectedItems((prevItems) => [...prevItems, newItem]);
              setClassificationDetected(true);
              setErrorMessage(null);
            } else {
              setClassificationDetected(false);
              setErrorMessage('No valid waste classification detected. Please try again.');
            }
          } catch (error) {
            console.error('Error classifying frame:', error);
            setErrorMessage('Failed to capture and classify frame.');
          }
        }
      }, 'image/jpeg'); // Capture frame as a JPEG image
    }
  };

  const openModal = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl('');
  };

  const handleOverlayDismiss = () => {
    setShowOverlay(false);
  };

  return (
    <>
      <Header />
      <div className="camera-page">
        {showOverlay && (
          <div className="overlay">
            <div className="overlay-content">
              <h2>Welcome to Live Waste Classification</h2>
              <p>Instructions:</p>
              <ul>
                <li>Click "Add" to classify the waste item.</li>
                <li>View the classified items in the table below.</li>
                <li>You can click on the Snapshot column of the table to expand the image.</li>
              </ul>
              <button className="understand-button" onClick={handleOverlayDismiss}>
                I Understand
              </button>
            </div>
          </div>
        )}

        <div className="camera-container">
          <h1 className="camera-title">Live Waste Classification</h1>

          {/* Video stream from the user's camera */}
          <video ref={videoRef} autoPlay playsInline muted className="live-stream"></video>
          <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas> {/* Hidden canvas */}

          {!classificationDetected && <div className="error-message">{errorMessage}</div>}

          <div className="add-item-section">
            <button onClick={handleAddItem} className="add-button">
              Add to Table
            </button>
          </div>
        </div>

        {detectedItems.length > 0 && (
          <div className="items-table">
            <h2>Added Items</h2>
            <table>
              <thead>
                <tr>
                  <th>Snapshot</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {detectedItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.snapshot}
                        alt="Snapshot"
                        className="snapshot-img"
                        onClick={() => openModal(item.snapshot)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
                    <td>{item.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={closeModal}>
                &times;
              </span>
              <img src={modalImageUrl} alt="Full-size snapshot" className="modal-image" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Camera;
