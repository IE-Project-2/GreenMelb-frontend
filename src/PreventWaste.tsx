import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from './PreventWaste.module.css';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

const PreventWaste: React.FC = () => {
  const [plasticBags, setPlasticBags] = useState<number | null>(null);
  const [organicWaste, setOrganicWaste] = useState<number | null>(null);
  const [paperWaste, setPaperWaste] = useState<number | null>(null);
  const [glassBottles, setGlassBottles] = useState<number | null>(null);
  const [aluminumCans, setAluminumCans] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number | null>>, maxLimit: number) => {
    const value = event.target.value;
    const validationError = validateInput(value, maxLimit);
    
    setError(validationError); 
    if (!validationError) {
      setter(parseInt(value, 10));
    } else {
      setter(null); 
    }
  };

  const validateInput = (value: string, maxLimit: number) => {
    const parsedValue = parseInt(value, 10);
    if (!value) return null;
    if (isNaN(parsedValue)) return 'Please enter a valid number';
    if (parsedValue < 0) return 'Value cannot be negative';
    if (parsedValue > maxLimit) return `Please enter a value less than ${maxLimit}`;
    return null;
  };

  const generateMessage = () => {
    const contributions: string[] = [];
  
    if (plasticBags) {
      contributions.push(
        `Saving ${plasticBags} plastic bags could reduce carbon emissions by ${(plasticBags * 0.1).toFixed(2)} kg.\nTip: Reuse plastic bags or switch to reusable bags to minimize plastic waste.`
      );
    }
  
    if (organicWaste) {
      contributions.push(
        `Reducing ${organicWaste} kg of organic waste could save ${organicWaste * 1.5} kg of methane emissions.\nTip: Compost food scraps and yard waste to create nutrient-rich soil.`
      );
    }
  
    if (paperWaste) {
      const treesSaved = (paperWaste * 0.05).toFixed(2);
      contributions.push(
        `Saving ${paperWaste} sheets of paper could save ${treesSaved} trees.\nTip: Opt for digital documents and use both sides of the paper when printing.`
      );
    }
  
    if (glassBottles) {
      contributions.push(
        `Recycling ${glassBottles} glass bottles could save ${(glassBottles * 0.3).toFixed(2)} kg of CO2 emissions.\nTip: Rinse glass bottles before recycling to ensure they are clean.`
      );
    }
  
    if (aluminumCans) {
      contributions.push(
        `Recycling ${aluminumCans} aluminum cans could save enough energy to power a TV for ${(aluminumCans * 3).toFixed(2)} hours.\nTip: Flatten aluminum cans before recycling to save space in your bin.`
      );
    }
  
    return contributions;
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = '/images/logo.jpg'; 
    logo.onload = () => {
      doc.addImage(logo, 'PNG', 14, 10, 50, 20); 
    };
    
    doc.setFontSize(24);
    doc.setFont('Courier', 'bold');
    doc.setTextColor(0, 51, 102); 
    doc.text('GreenMelb.com', 14, 40);
    
    doc.setFontSize(18);
    doc.setTextColor(0, 153, 51);
    doc.text('General Tips:', 14, 80);
    
    const tips = [
      '1. Always recycle your plastic, glass, and paper.',
      '2. Reduce food waste by planning meals.',
      '3. Use reusable bags when shopping.',
      '4. Participate in local clean-up events.',
      '5. Spread the word about recycling programs.'
    ];
    
    tips.forEach((tip, index) => {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(tip, 14, 95 + (index * 10)); 
    });
    
    const contributions = generateMessage();
    
    contributions.forEach((contribution, index) => {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`Goal ${index + 1}:`, 14, 145 + (index * 30)); 
      doc.setFontSize(12);
      doc.setTextColor(50, 50, 50);
  
      const contributionText = contribution.replace(/(\d+\.\d{2})\d+/g, '$1'); 
      doc.text(contributionText, 14, 155 + (index * 30)); 
  
      doc.setFontSize(16);
      doc.setFont('Courier', 'normal');
      doc.setTextColor(0, 102, 204);
      doc.text('Thank you for making Melbourne a cleaner city!', 14, 60);
    });
  
    doc.save('clean_melbourne_poster.pdf');
  };

  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.heading}>Prevent Waste at Home. Let's set a goal!</h1>

      {/* Input Fields */}
      <div>
  <label htmlFor="plastic-bags">Plastic bags I will save: </label>
  <input
    id="plastic-bags"
    type="number"
    className={styles['input-field']} // Add className for styling
    placeholder="Plastic bags per month (Max 100)"
    onChange={(e) => handleInputChange(e, setPlasticBags, 100)}
  />
  
</div>

<div>
  <label htmlFor="organic-waste">Organic waste that I will reduce:</label>
  <input
    id="organic-waste"
    type="number"
    className={styles['input-field']} // Add className for styling
    placeholder="Kg of organic waste per month (Max 500)"
    onChange={(e) => handleInputChange(e, setOrganicWaste, 500)}
  />
</div>

<div>
  <label htmlFor="paper-waste">Paper waste that I will save:</label>
  <input
    id="paper-waste"
    type="number"
    className={styles['input-field']} // Add className for styling
    placeholder="Sheets of paper per month (Max 1000)"
    onChange={(e) => handleInputChange(e, setPaperWaste, 1000)}
  />
</div>

<div>
  <label htmlFor="glass-bottles">Glass bottles I will recycle:</label>
  <input
    id="glass-bottles"
    type="number"
    className={styles['input-field']} // Add className for styling
    placeholder="Glass bottles per month (Max 500)"
    onChange={(e) => handleInputChange(e, setGlassBottles, 500)}
  />
</div>

<div>
  <label htmlFor="aluminum-cans">Cans I will recycle:</label>
  <input
    id="aluminum-cans"
    type="number"
    className={styles['input-field']} // Add className for styling
    placeholder="Aluminum cans per month (Max 1000)"
    onChange={(e) => handleInputChange(e, setAluminumCans, 1000)}
  />
</div>


      {error && <p className={styles.error}>{error}</p>}

      {(!error && (plasticBags || organicWaste || paperWaste || glassBottles || aluminumCans)) && (
        <div className={styles['fact-output']}>
          <h2>Your Contribution:</h2>
          <div className={styles['contribution-boxes']}>
            {generateMessage().map((message, index) => (
              <div key={index} className={`${styles.box} ${styles[`color-${index}`]}`}>
                <pre>{message}</pre>
              </div>
            ))}
          </div>
          <button onClick={handleGeneratePDF} className={styles['action-button']}>Take Action</button>
          <p  className={styles['text']}>Click to download a poster to remind you of your goals!</p>
        </div>
      )}

      {/* Button to navigate to WastePrediction */}
      <div className={styles['navigate-container']}>
        <button onClick={() => navigate('/WastePrediction')} className={styles['navigate-button']}>
          See how an average household produces waste
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default PreventWaste;
