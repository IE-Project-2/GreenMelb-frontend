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
  const [streamUrl, setStreamUrl] = useState('');
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [showOverlay, setShowOverlay] = useState(true);
  const [classificationDetected, setClassificationDetected] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch video feed from backend
    const videoFeedUrl = `http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}/api/videoclassifier/video_feed/`;

    const fetchVideoFeed = async () => {
      try {
        const response = await fetch(videoFeedUrl, {
          headers: {
            Authorization: 'Basic ' + btoa('ta12:ta12'),
          },
        });

        if (response.ok) {
          setStreamUrl(videoFeedUrl); // Use backend video stream for classification
        } else {
          console.error('Failed to load video feed');
        }
      } catch (error) {
        console.error('Error fetching video feed:', error);
      }
    };

    fetchVideoFeed();
  }, []);

  useEffect(() => {
    document.title = 'Live Classification - Green Melb';
  }, []);

  const handleAddItem = async () => {
    try {
      const response = await fetch(`http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}/api/videoclassifier/capture_and_classify_frame/`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to capture and classify frame');
      }

      const data = await response.json();
      console.log('Backend response:', data);

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

          {/* Video feed from backend */}
          {streamUrl ? (
            <img src={streamUrl} alt="Live Waste Classification" className="live-stream" />
          ) : (
            <p className="loading-text">Loading live stream...</p>
          )}

          {!classificationDetected && <div className="error-message">{errorMessage}</div>}

          <div className="add-item-section">
            <button onClick={handleAddItem} className="add-button">
              Add to Table
            </button>
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
              <p>
                Looks like you have Ewaste or recyclable items. You can find nearby recycling
                centers.
              </p>
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
