import React, { useState } from 'react';
import styles from './PreventWaste.module.css';

const PreventWaste: React.FC = () => {
  // State for inputs
  const [plasticBags, setPlasticBags] = useState<number | null>(null);
  const [organicWaste, setOrganicWaste] = useState<number | null>(null);
  const [paperWaste, setPaperWaste] = useState<number | null>(null);
  const [glassBottles, setGlassBottles] = useState<number | null>(null);
  const [aluminumCans, setAluminumCans] = useState<number | null>(null);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // Validation function
  const validateInput = (value: string, maxLimit: number) => {
    const parsedValue = parseInt(value, 10);
    if (!value) return null;
    if (isNaN(parsedValue)) return 'Please enter a valid number';
    if (parsedValue < 0) return 'Value cannot be negative';
    if (parsedValue > maxLimit) return `Please enter a value less than ${maxLimit}`;
    return null;
  };

  // Handler for input changes
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<number | null>>,
    maxLimit: number
  ) => {
    const value = event.target.value;
    const validationError = validateInput(value, maxLimit);
    setError(validationError);
    if (!validationError) {
      setFunction(parseInt(value, 10) || null);
    } else {
      setFunction(null);
    }
  };

  // Generate output message
  const generateMessage = () => {
    let message = 'Here is your contribution summary:\n';

    if (plasticBags) {
      message += `- Saving ${plasticBags} plastic bags per month could reduce carbon emissions by ${(plasticBags * 0.1).toFixed(2)} kg.\n`;
    }

    if (organicWaste) {
      message += `- Reducing ${organicWaste} kg of organic waste per month could save ${organicWaste * 1.5} kg of methane emissions.\n`;
    }

    if (paperWaste) {
      message += `- Saving ${paperWaste} sheets of paper per month could save ${paperWaste * 0.05} trees.\n`;
    }

    if (glassBottles) {
      message += `- Recycling ${glassBottles} glass bottles per month could save ${glassBottles * 0.3} kg of CO2 emissions.\n`;
    }

    if (aluminumCans) {
      message += `- Recycling ${aluminumCans} aluminum cans per month could save enough energy to power a TV for ${(aluminumCans * 3).toFixed(2)} hours.\n`;
    }

    return message;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Prevent Waste at Home</h1>

      {/* Interactive Tips Section */}
      <div className={styles['parallax-section']}>
        <div className={styles['tip-box']} style={{ backgroundColor: '#ffefb6' }}>
          <h3>Tip 1: Reuse Containers</h3>
          <p>Store food in reusable containers rather than single-use plastics to reduce waste.</p>
        </div>
        <div className={styles['tip-box']} style={{ backgroundColor: '#b6ffee' }}>
          <h3>Tip 2: Compost Organic Waste</h3>
          <p>Compost food scraps to divert waste from landfills and reduce methane emissions.</p>
        </div>
        <div className={styles['tip-box']} style={{ backgroundColor: '#ffd4b6' }}>
          <h3>Tip 3: Avoid Excess Packaging</h3>
          <p>Buy products with minimal packaging and recycle whenever possible.</p>
        </div>
        <div className={styles['tip-box']} style={{ backgroundColor: '#c4ffb6' }}>
          <h3>Tip 4: Use Energy Efficient Appliances</h3>
          <p>Switch to energy-efficient appliances to save electricity and reduce your carbon footprint.</p>
        </div>
      </div>
      <div className={styles.container}>
      <h1 className={styles.heading}>Let's set a goal!</h1>
      </div>

      {/* Input Fields */}
      <div>
        <label className={styles['dropdown-label']} htmlFor="plastic-bags">
          I will save:
        </label>
        <input
          id="plastic-bags"
          type="number"
          placeholder="Plastic bags per month (Max 100)"
          onChange={(e) => handleInputChange(e, setPlasticBags, 100)}
        />
      </div>

      <div>
        <label className={styles['dropdown-label']} htmlFor="organic-waste">
          I will reduce:
        </label>
        <input
          id="organic-waste"
          type="number"
          placeholder="Kg of organic waste per month (Max 500)"
          onChange={(e) => handleInputChange(e, setOrganicWaste, 500)}
        />
      </div>

      <div>
        <label className={styles['dropdown-label']} htmlFor="paper-waste">
          I will save:
        </label>
        <input
          id="paper-waste"
          type="number"
          placeholder="Sheets of paper per month (Max 1000)"
          onChange={(e) => handleInputChange(e, setPaperWaste, 1000)}
        />
      </div>

      <div>
        <label className={styles['dropdown-label']} htmlFor="glass-bottles">
          I will recycle:
        </label>
        <input
          id="glass-bottles"
          type="number"
          placeholder="Glass bottles per month (Max 500)"
          onChange={(e) => handleInputChange(e, setGlassBottles, 500)}
        />
      </div>

      <div>
        <label className={styles['dropdown-label']} htmlFor="aluminum-cans">
          I will recycle:
        </label>
        <input
          id="aluminum-cans"
          type="number"
          placeholder="Aluminum cans per month (Max 1000)"
          onChange={(e) => handleInputChange(e, setAluminumCans, 1000)}
        />
      </div>

      {/* Display error message */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Output the message if at least one input has been entered */}
      {(plasticBags || organicWaste || paperWaste || glassBottles || aluminumCans) && !error && (
        <div className={styles['fact-output']}>
          <h2>Your Contribution:</h2>
          <pre>{generateMessage()}</pre>
        </div>
      )}
    </div>
  );
};

export default PreventWaste;
