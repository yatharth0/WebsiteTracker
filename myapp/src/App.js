// import React, { useEffect, useState } from 'react';

// const App = () => {
//   const [visitCount, setVisitCount] = useState(0);

//   useEffect(() => {
//     // Fetch visit count from backend
//     const fetchVisitCount = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/visitcount');
//         const data = await response.json();
//         setVisitCount(data.visits);
//       } catch (error) {
//         console.error('Error fetching visit count:', error);
//       }
//     };

//     fetchVisitCount();

//     // Establish WebSocket connection for real-time updates
//     const ws = new WebSocket('ws://localhost:5000');

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       setVisitCount(data.visits);
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Mysite - Visit Counter</h1>
//         <h2>Visit Count: {visitCount}</h2>
//       </header>
//     </div>
//   );

// };

// export default App;

import React, { useEffect, useState } from 'react';

const App = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/visitcount');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setVisitCount(data.visits);
      } catch (error) {
        console.error('Error fetching visit count:', error);
      }
    };

    fetchVisitCount();

    const ws = new WebSocket('ws://localhost:5000');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setVisitCount(data.visits);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mysite - Visit Counter</h1>
        <h2>Visit Count: {visitCount}</h2>
      </header>
    </div>
  );
};

export default App;

