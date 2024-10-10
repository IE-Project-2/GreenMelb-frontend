import React, { useState, useEffect } from 'react';
import axios from 'axios';
// @ts-ignore
import Header from "./Header.tsx";
// @ts-ignore
import Footer from "./Footer.tsx";
import './PlantRecommendation.css'; // Import the global CSS file

const PlantRecommendation: React.FC = () => {
  const [category, setCategory] = useState('');
  const [floweringCategory, setFloweringCategory] = useState('');
  const [location, setLocation] = useState('');
  const [maintenanceType, setMaintenanceType] = useState('');
  const [plant, setPlant] = useState<any>(null);
  const [error, setError] = useState('');  // Add error state to show in case of failure
  const [buttonText, setButtonText] = useState('Get Recommendations');  // State for button text

  useEffect(() => {
    document.title = "Recommend Plant - Green Melb";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form inputs before submitting
    if (!category) {
      setError('Please select a category.');
      return;
    }
    if (!floweringCategory) {
      setError('Please select a flowering category.');
      return;
    }
    if (!maintenanceType) {
      setError('Please select a maintenance type.');
      return;
    }

    try {
      const apiUrl = `http://${process.env.REACT_APP_ENDPOINT}:${process.env.REACT_APP_PORT}/api/plants/PlantRecommendation/`;

      const response = await axios.get(apiUrl, {
        params: {
          category,
          flowering_category: floweringCategory,
          location: location || '',  // Handle empty location
          maintenance_type: maintenanceType,
        },
      });

      setPlant(response.data);  // Update with the fetched plant data
      setError('');  // Clear the error message
      setButtonText('Get Another');  // Change button text after first click
    } catch (error) {
      console.error('Error fetching plant recommendations:', error);
      setError('No plants found. Please refine your search.');
    }
  };

  return (
    <div className="pageContainer">
      <Header />
      <div className="contentWrapper">
        <h1 className="title">Plant Recommendations</h1>

        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label>
              <span className="labelText">Category:</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="dropdown">
                <option value="">Select a category</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
              </select>
            </label>
          </div>

          <div className="formGroup">
            <label>
              <span className="labelText">Flowering Category:</span>
              <select value={floweringCategory} onChange={(e) => setFloweringCategory(e.target.value)} className="dropdown">
                <option value="">Select a flowering category</option>
                <option value="Non-flowering">Non-flowering</option>
                <option value="Flowering">Flowering</option>
              </select>
            </label>
          </div>

          <div className="formGroup">
            <label>
              <span className="labelText">Maintenance Type:</span>
              <select value={maintenanceType} onChange={(e) => setMaintenanceType(e.target.value)} className="dropdown">
                <option value="">Select maintenance type</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
          </div>

          <button type="submit" className="getRecommendationButton">{buttonText}</button>
        </form>

        {/* Display Error or Plant Information */}
        {error && <p className="error">{error}</p>}

        <div className="plantContainer">
          {plant ? (
            <div className="plantBox">
              <h2 className="plantName">{plant.name} <span className="scientificName">({plant.scientific_name})</span></h2>
              <div className="imageFrame">
                <img src={plant.photo_url} alt={plant.name} className="plantImage" />
              </div>
              <p className="description">{plant.description}</p>
              <p><strong>Watering:</strong> {plant.watering_needs}</p>
            </div>
          ) : (
            !error && <p></p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlantRecommendation;
