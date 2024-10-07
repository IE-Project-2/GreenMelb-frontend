import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© GreenMelb.com. All rights reserved.</p>
        <div className="footer-links">
        <Link to="/TermsOfService">Terms of Service</Link>
        <Link to="/PrivacyPolicy">Privacy Policy</Link>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
