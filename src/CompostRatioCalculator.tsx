import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import './Calc.css';
import Header from './Header.tsx';
import Footer from './Footer.tsx'; // Import the Footer component
import styles from './styles.module.css';
import { useEffect } from 'react';


const CompostRatioCalculator: React.FC = () => {
    const navigate = useNavigate(); // Hook to navigate to different routes
    const [greens, setGreens] = useState<number | string>('');
    const [browns, setBrowns] = useState<number | string>('');
    const [ratio, setRatio] = useState<number | null>(null);
    const [balanceMessage, setBalanceMessage] = useState<string>('');
    const [balanceColor, setBalanceColor] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [showButtons, setShowButtons] = useState<boolean>(false); 

    const goToPlantRecommendation = () => {
        navigate('/PlantRecommendation'); 
    };
    useEffect(() => {
        document.title = "Compost Ratio - Green Melb"; 
      }, []);

    const calculateRatio = (e: React.FormEvent) => {
        e.preventDefault();
        if (greens && browns && +greens > 0 && +browns > 0) {
            const compostRatio = +browns / +greens;
            setRatio(compostRatio);

            if (compostRatio >= 2 && compostRatio <= 3) {
                setBalanceMessage("Your compost ratio is balanced!");
                setBalanceColor("#4CAF50");
            } else {
                setBalanceMessage("Adjust the ratio to have 2-3 parts browns to 1 part greens for optimal composting.");
                setBalanceColor("#FF9800");
            }
            setError(null);
            setShowButtons(true); // Show buttons when ratio is calculated
        } else {
            setError("Please enter valid amounts for both greens and browns.");
            setRatio(null);
            setBalanceMessage('');
            setBalanceColor('');
            setShowButtons(false); // Hide buttons if input is invalid
        }
    };

    const handlePlantRecommendations = () => {
        navigate('/PlantRecommendation'); // Navigate to plant recommendations page
    };

    const handleWastePrevention = () => {
        navigate('/waste-prevention'); // Navigate to waste prevention page
    };

    return (
        <div>
            <Header /> {/* Add Header here */}
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    className="box"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    style={{ padding: '20px', borderRadius: '8px', backgroundColor: '#f4f4f4', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', width: '100%' }}
                >
                    <h1 style={{ textAlign: 'center', color: '#333' }}>Compost Ratio Calculator</h1>

                    <form onSubmit={calculateRatio} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <label htmlFor="greens" style={{ fontSize: '18px', color: '#555' }}>Amount of Greens (kg):</label>
                        <input
                            type="number"
                            id="greens"
                            name="greens"
                            step="0.1"
                            value={greens}
                            onChange={(e) => setGreens(e.target.value)}
                            style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                        />

                        <label htmlFor="browns" style={{ fontSize: '18px', color: '#555' }}>Amount of Browns (kg):</label>
                        <input
                            type="number"
                            id="browns"
                            name="browns"
                            step="0.1"
                            value={browns}
                            onChange={(e) => setBrowns(e.target.value)}
                            style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
                        />

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            style={{ padding: '12px', backgroundColor: '#4CAF50', color: '#fff', fontSize: '18px', borderRadius: '5px', cursor: 'pointer', border: 'none' }}
                        >
                            Calculate Ratio
                        </motion.button>
                    </form>

                    {ratio && (
                        <motion.div
                            className="result"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            style={{ padding: '20px', marginTop: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', textAlign: 'center' }}
                        >
                            <p style={{ fontSize: '20px', color: '#333' }}>Your compost ratio (Browns to Greens) is: <strong>{ratio.toFixed(2)}</strong></p>
                            <p style={{ fontSize: '18px', color: balanceColor }}>{balanceMessage}</p>

                            <button className={styles.button} onClick={handlePlantRecommendations} style={{ padding: '12px', marginTop: '20px', backgroundColor: '#00796b', color: '#fff', fontSize: '18px', borderRadius: '5px', cursor: 'pointer', border: 'none' }}>
                                Get Plant Recommendations
                            </button>
                        </motion.div>
                    )}

                    {error && (
                        <motion.p
                            style={{ color: 'red', textAlign: 'center', marginTop: '20px', fontSize: '18px' }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            {error}
                        </motion.p>
                    )}

                    {/* Help Box */}
                    <motion.div
                        className="help-box"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        style={{ marginTop: '30px', padding: '20px', borderRadius: '8px', backgroundColor: '#e0f7fa' }}
                    >
                        <h2 style={{ fontSize: '20px', color: '#00796b' }}>Tips: Understanding Greens and Browns</h2>
                        <p style={{ fontSize: '16px' }}><strong>Greens:</strong> Nitrogen-rich materials like fruit and vegetable scraps, coffee grounds, and grass clippings. They are moist and high in protein.</p>
                        <p style={{ fontSize: '16px' }}><strong>Browns:</strong> Carbon-rich materials like dry leaves, straw, and cardboard. They are dry and high in fiber.</p>
                        <p style={{ fontSize: '16px' }}>Balance is key: aim for 2-3 parts browns to 1 part greens for optimal composting.</p>
                    </motion.div>
                </motion.div>
            </div>
            <Footer /> {/* Add Footer here */}
        </div>
    );
};

export default CompostRatioCalculator;
