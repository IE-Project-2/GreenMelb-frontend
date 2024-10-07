import React from 'react';
import Footer from './Footer.tsx';
import Header from './Header.tsx'

const ProductVideo: React.FC = () => {
  return (
    <div>
        <Header />
      <h1 style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold' }}>
        Feature Video
      </h1>
      <p style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 'bold', fontSize: '18px' }}>
        Watch our GreenMelb product video to learn more about sustainable waste management!
      </p>

      {/* Embedded YouTube Video */}
      <div className="video-container">
        <iframe
          width="860"
          height="515"
          src="https://www.youtube.com/embed/nnLZ3XG1srI"
          title="Feature Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <Footer/>
    </div>
  );
};

export default ProductVideo;
