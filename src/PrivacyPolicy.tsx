import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate(); // To navigate to Map Page and Composting Guide
  useEffect(() => {
    document.title = "Privacy policy - Green Melb";
}, []);
  return (
    <div>
        <Header />
      <h1>Privacy Policy</h1>
      <p>Last updated: 7/10/24</p>

      <h2>1. Information We Collect</h2>
      <p>
        We may collect personal information from you when you visit our site, register, subscribe to our newsletter, or interact with other activities, services, features, or resources we make available on our site.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        We may use the information we collect for various purposes, including:
      </p>
      <ul>
        <li>To improve customer service</li>
        <li>To personalize user experience</li>
        <li>To process transactions</li>
        <li>To send periodic emails</li>
      </ul>

      <h2>3. Data Protection</h2>
      <p>
        We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
      </p>

      <h2>4. Sharing Your Information</h2>
      <p>
        We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or servicing you.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to request copies of your personal information, request corrections, and request deletion of your personal information under certain conditions.
      </p>

      <h2>6. Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at [Insert Contact Information].
      </p>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
