import React, { useEffect,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Main CSS
import CursorAnimation from './CursorAnimation.tsx'; 
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import './Achievements.css';
import styles from './styles.module.css'; 
import Footer from './Footer.tsx';
import Header from './Header.tsx'

const images = {
    background: "/images/background.jpuyG", //change later to jpg
    pizza: "/images/pizza.png",
    bottle: "/images/bottle.png",
    battery: "/images/battery.png",
    banana: "/images/banana.png",
    can: "/images/can.png",
    bash: "/images/plasticbag.png",
    pizza1: "/images/pizza.png",
    landfill: "/images/file.jpg",
    sky: "/images/sky.jpg",
  }
const GreenMelbLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const parallax = useRef<IParallax>(null!);

  useEffect(() => {
    document.title = 'Home - Green Melb';
  }, []);

  const navigateToPage = (path: string) => {
    navigate(path);
  };

  return (
    <div className="container">
            <Header />

      <h1 className="main-heading">GreenMelb</h1>
      <p className="info-text"style={{ zIndex: 0,position: 'relative' }} >Manage waste. Right from your Home.</p>
      
      <button
  className="cta-button"
  onClick={() => navigateToPage('/Quiz')}
  style={{ zIndex: 4,position: 'relative' }} 
>
  Get Started
</button>

      <CursorAnimation />
      <Parallax ref={parallax} pages={4}>
        {/* Background layers */}
        <ParallaxLayer
    offset={1}
    speed={1}
    style={{ backgroundColor: '#ffa700', zIndex: 3,position: 'relative' }}>
    <div className={styles.headerContainer} style={{ zIndex: 3 }}>
      <h1 className='slider-text'>Be a part of the solution today</h1>
      <div className="steps-container" style={{ zIndex: 9 }}>
        <a href="#step1" className="step">Over 40,000 Tons of waste generated per year</a>
        <a href="#step2" className="step">75% ends up in landfills</a>
        <a href="#step3" className="step">Major landfills projected to reach capacity by 2030</a>
        <a href="#step4" className="step">Up to 30% of recycling bins contain non-recyclables</a>
      </div>       
          </div>
  
  </ParallaxLayer>


  <ParallaxLayer
    offset={2}
    speed={1}
    style={{ backgroundColor: '#001f3f', zIndex: 3, position: 'relative' }}
  >
    <div className={styles.headerContainer} style={{ zIndex: 3 }}>
      <h1 className='slider-text'>How we can help</h1>
      <div className="steps-container" style={{ zIndex: 4 }}>
        <a href="#step1" className="step">Step 1: Identify your waste</a>
        <a href="#step2" className="step">Step 2: Find recycling centers</a>
        <a href="#step3" className="step">Step 3: Manage organic waste</a>
        <a href="#step4" className="step">Step 4: Waste prevention</a>
      </div>       
          </div>
        </ParallaxLayer>
        
        {/* Custom satellite image */}
        <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <img src={images.pizza} style={{ width: '15%', marginLeft: '70%' }} />
          <img src={images.bash} style={{ display: 'block', width: '5%', marginLeft: '25%' }} />
          <img src={images.can} style={{ display: 'block', width: '5%', marginLeft: '5%' }} />
          <p></p>
        </ParallaxLayer>
        
        {/* Custom cloud images */}
        <ParallaxLayer offset={1} speed={-0.8} style={{ opacity: 0.9 , zIndex: 3}}>
          <img src={images.pizza} style={{ display: 'block', width: '20%', marginLeft: '90%' }} className="rotate-15" />
          <img src={images.battery} style={{ display: 'block', width: '10%', marginLeft: '5%' }} className="rotate-45" />
          <img src={images.bash} style={{ display: 'block', width: '5%', marginLeft: '15%' }} />
          <img src={images.banana} style={{ display: 'block', width: '5%', marginLeft: '5%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={-0.5} style={{ opacity: 0.1, zIndex: 3 }}>
          <img src={images.bottle} style={{ display: 'block', width: '20%', marginLeft: '70%' }} className="rotate-negative-25"/>
          <img src={images.battery} style={{ display: 'block', width: '10%', marginLeft: '40%' }} className="rotate-75" />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={-0.2} style={{ opacity: 0.2 , zIndex: 3}}>
          <img src={images.bottle} style={{ display: 'block', width: '10%', marginLeft: '10%' }} className="rotate-75"/>
          <img src={images.battery} style={{ display: 'block', width: '15%', marginLeft: '75%' }} className="rotate-negative-10"/>
          <img src={images.bash} style={{ display: 'block', width: '15%', marginLeft: '85%' }} className="rotate-45"/>
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.8 , zIndex: 3}}>
          <img src={images.bottle} style={{ display: 'block', width: '20%', marginLeft: '60%' }} className="rotate-75"/>
          <img src={images.battery} style={{ display: 'block', width: '5%', marginLeft: '30%' }} className="rotate-220"/>
          <img src={images.bottle} style={{ display: 'block', width: '10%', marginLeft: '80%' }} className="rotate-125"/>
          <img src={images.can} style={{ display: 'block', width: '20%', marginLeft: '80%' }}  className="rotate-45"/>
          <img src={images.banana} style={{ display: 'block', width: '20%', marginLeft: '5%' }}  className="rotate-45"/>
          <img src={images.banana} style={{ display: 'block', width: '30%', marginLeft: '95%' }}  className="rotate-45"/>
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={-0.4} style={{ opacity: 0.6, zIndex: 3 }}>
          <img src={images.pizza} style={{ display: 'block', width: '15%', marginLeft: '10%' }}className="rotate-negative-10"/>
          <img src={images.bottle} style={{ display: 'block', width: '10%', marginLeft: '5%' }} className="rotate-15"/>
          <img src={images.pizza} style={{ display: 'block', width: '15%', marginLeft: '75%' }}className="rotate-negative-10"/>
        </ParallaxLayer>


        <ParallaxLayer sticky={{ start: 0.35, end: 2.5 }} speed={1} style={{ zIndex: 2 }}>
        <div
  style={{
    display: 'flex',
    flexDirection: 'column', // Stack the image on top of the text
    justifyContent: 'center', // Center vertically
    alignItems: 'flex-end',   // Align both image and text to the right
    height: '100vh',            
    paddingRight: '20px',     // Space from the right side of the screen
    fontFamily: 'monospace', 
    fontSize: '1rem', 
    fontWeight: 'bolder',
    textAlign: 'right',       // Align text to the right
  }}
>
  {/* Scroll Image */}
  <img 
    src="/images/scroll.png" // Replace with the actual URL of the image
    alt="Scroll down"
    style={{ 
      width: '50px', // Adjust size
      height: 'auto',
      marginBottom: '-30px', // Space between image and text
      paddingRight: '5%'
    }} 
  />

  {/* Scroll Text */}
  <p style={{ marginRight: '20px' }}>Scroll to learn more</p>
</div>


</ParallaxLayer>


        <div className={styles.headerContainer}>
          <h1 className={`${styles.header4} ${styles.headerSize2}`}>Be a part of the solution today </h1>
        </div>
        
      </Parallax>
      
      
      
      
      
    </div>
    

  );
};

export default GreenMelbLandingPage;
