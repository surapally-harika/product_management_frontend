import React from 'react';
import Navbar from './Navbar';

function Home() {
  // Inline styles as objects
  const styles = {
    container: {
      padding: '20px',
      textAlign: 'center',
    },
    header: {
      color: '#333',
      fontSize: '36px',
      marginTop: '50px',
      textAlign:'center',
    },
    
  };

  return (
    <div>
      <Navbar/>
      

      <div style={styles.container}>
        <h1 style={styles.header}>Welcome</h1>
      </div>
    </div>
  );
}

export default Home;
