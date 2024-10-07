import React, { useEffect, useState, useRef } from 'react';
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
  const videoRef = useRef<HTMLVideoElement | null>(null); // Ref for user camera stream
  const tableRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing camera: ', error);
        setErrorMessage('Failed to access the camera.');
      }
    };

    getUserMedia();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    document.title = 'Live Classification - Green Melb';
  }, []);

  // Capture the current frame from the user's video and send it to the backend for classification
  const captureFrameAndSendToBackend = async () => {
    try {
      const canvas = document.createElement('canvas');
      const videoElement = videoRef.current;

      if (videoElement) {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const imageDataUrl = canvas.toDataURL('image/jpeg');

          const response = await fetch(`http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}/api/videoclassifier/classify_image/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: imageDataUrl }),
          });

          if (!response.ok) {
            throw new Error('Failed to classify image');
          }

          const data = await response.json();
          console.log('Backend response:', data);

          const { classifications } = data;
          if (classifications && (classifications.recyclable > 0 || classifications.ewaste > 0 || classifications.organic > 0)) {
            const snapshotUrl = imageDataUrl;

            const newItem: DetectedItem = {
              snapshot: snapshotUrl,
              category: data.detected_categories,  // Use backend-detected categories
            };

            setDetectedItems((prevItems) => [...prevItems, newItem]);
            setClassificationDetected(true);
            setErrorMessage(null);
          } else {
            setClassificationDetected(false);
            setErrorMessage('No valid waste classification detected. Please try again.');
          }
        }
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setErrorMessage('Failed to capture and classify frame. Please try again.');
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

  const handleDoneAdding = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOverlayDismiss = () => {
    setShowOverlay(false);
  };

  const hasRecyclableOrEwaste = detectedItems.some(item => item.category === 'Ewaste' || item.category === 'Recyclable');
  const hasOrganic = detectedItems.some(item => item.category === 'Organic');

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

          <div className="video-wrapper">
            <video ref={videoRef} autoPlay playsInline muted className="live-stream"></video>
          </div>

          {!classificationDetected && <div className="error-message">{errorMessage}</div>}

          <div className="add-item-section">
            <button onClick={captureFrameAndSendToBackend} className="add-button">Add to Table</button>
          </div>

          {detectedItems.length > 0 && (
            <button onClick={handleDoneAdding} className="done-button">
              Done Adding
            </button>
          )}
        </div>

        <div ref={tableRef} className="table-section">
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

          {hasRecyclableOrEwaste && (
            <div className="info-section">
              <p>Looks like you have Ewaste or recyclable items. You can find nearby recycling centers.</p>
              <button className="navigate-button" onClick={() => navigate('/MapPage')}>
                Find Recycling Centers
              </button>
            </div>
          )}

          {hasOrganic && (
            <div className="info-section">
              <p>Looks like you have organic waste. Here are some tips for composting.</p>
              <button className="navigate-button" onClick={() => navigate('/CompostingTips')}>
                Go to Composting Tips
              </button>
            </div>
          )}
        </div>

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
