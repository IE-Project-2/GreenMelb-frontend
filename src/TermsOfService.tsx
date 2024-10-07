import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';


const TermsOfService: React.FC = () => {
    const navigate = useNavigate(); // To navigate to Map Page and Composting Guide
    useEffect(() => {
      document.title = "Terms of Service - Green Melb";
  }, []);
  return (
    <div>
        <Header/>
      <h1>Terms of Service</h1>
      <p>Last updated: 7/10/2024</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using our website, you agree to comply with and be bound by these terms and conditions.
      </p>

      <h2>2. Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting on the site.
      </p>

      <h2>3. Use of the Website</h2>
      <p>
        You agree to use the website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
      </p>

      <h2>4. Intellectual Property Rights</h2>
      <p>
        All content and materials available on this website are the property of GreenMelb.com or its licensors and are protected by intellectual property laws.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        In no event shall GreenMelb.com be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the website.
      </p>

      <h2>6. Governing Law</h2>
      <p>
        These terms shall be governed by and construed in accordance with the laws of [Insert Your Country/State].
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about these Terms of Service, please contact us at [Insert Contact Information].
      </p>
      <Footer/>
    </div>
  );
};

export default TermsOfService;
