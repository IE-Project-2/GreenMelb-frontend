import * as React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import styles from './styles.module.css'; 
import CompostRatioCalculator from './CompostRatioCalculator.tsx';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

export default function CompostingTips() {
  const alignCenter = { display: 'flex', alignItems: 'center' };
  
  return (
    <div>
      <Header />
      <div className={styles.background} />

      <Parallax pages={5}>
        <ParallaxLayer offset={0} speed={0.5} style={{ ...alignCenter, justifyContent: 'center' }}>
        <p style={{ fontSize: '4rem', fontFamily: 'monospace', fontWeight: 'bolder' , position: 'relative', top: '-150px'}}>Manage organic waste using composting</p>
        </ParallaxLayer >

        <ParallaxLayer offset={0} speed={0.5} style={{ ...alignCenter, justifyContent: 'center' }}>
          <p className={styles.subtext}>Composting turns food scraps and yard waste into nutrient-rich compost by mixing them with air and moisture, creating soil to enrich plants.</p>
        
        </ParallaxLayer >

        

        <ParallaxLayer sticky={{ start: 1, end: 1.5 }} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
          <div className={`${styles.card} ${styles.sticky}`}>
            <p>Step 1: Set up bin</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.purple}`}>
            <p>Choose a shaded spot with drainage.</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.25} speed={0.75} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.blue}`}>
          <p>Use a bin or make one with pallets or mesh.
          </p>
           </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.5} speed={1} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
            <p>Start with a layer of twigs or straw.
            </p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={1.25} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
            <p>Ensure good airflow for faster composting.</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 2.25, end: 1.5 }} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
          <div className={`${styles.card} ${styles.sticky2}`}>
            <p>Step 2: Add Materials</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.purple}`}>
            <p>Alternate layers of greens (food scraps) and browns (dry leaves).</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2.25} speed={0.75} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.blue}`}>
            <p>Maintain a 2:1 ratio of browns to greens.</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2.5} speed={1} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
            <p>Chop materials for quicker breakdown.</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2.75} speed={1.25} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
            <p>Avoid meat, dairy, or oily foods.
            </p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer sticky={{ start: 3.25, end: 1.5 }} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
          <div className={`${styles.card} ${styles.sticky3}`}>
            <p>Step 3: Maintain & Use</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.purple}`}>
            <p>Turn the pile weekly for aeration.</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={3.25} speed={0.75} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.blue}`}>
            <p>Keep the compost moist but not soggy.</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={3.5} speed={1} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
            <p>Add water or browns as needed for balance.</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={3.75} speed={1.25} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.green}`}>
            <p>Compost is ready when dark and crumbly.</p>
          </div>
        </ParallaxLayer>
        


        <ParallaxLayer offset={4} speed={1.75} style={{ ...alignCenter, justifyContent: 'center', zIndex: 10 }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <p style={{ fontSize: '3rem', fontFamily: 'monospace', fontWeight: 'bolder' }}>
            Ready to compost?
        </p>
        <p style={{ fontSize: '1.5rem', fontFamily: 'monospace', fontWeight: 'bolder' }}>
            Calculate your compost ratio
        </p>
        
        <CompostRatioCalculator /> {/* Calculator component */}
    </div>
</ParallaxLayer>

         <ParallaxLayer sticky={{ start: 0.35, end: 3 }} speed={1} style={{ zIndex: 1 }}>
        <div
  style={{
    display: 'flex',
    flexDirection: 'column', // Stack the image on top of the text
    justifyContent: 'center', // Center vertically
    alignItems: 'flex-end',   // Align both image and text to the right
    height: '80vh',            
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
        
      </Parallax>


      
    </div>
  );
}
