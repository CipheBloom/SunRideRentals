exports.handler = async (event, context) => {
  // Test each endpoint individually
  const endpoints = [
    '/api/stats',
    '/api/bookings', 
    '/api/users',
    '/api/vehicles',
    '/api/rider-applications'
  ];
  
  const results = {};
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`https://sunriderentel.netlify.app${endpoint}`);
      const text = await response.text();
      
      // Try to parse as JSON
      try {
        const json = JSON.parse(text);
        results[endpoint] = { status: 'OK', type: 'JSON' };
      } catch (e) {
        results[endpoint] = { status: 'ERROR', type: 'HTML', preview: text.substring(0, 100) };
      }
    } catch (error) {
      results[endpoint] = { status: 'ERROR', type: 'FETCH_ERROR', error: error.message };
    }
  }
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(results, null, 2),
  };
};
