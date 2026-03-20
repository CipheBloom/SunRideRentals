exports.handler = async (event, context) => {
  console.log('🔧 Simple test function called');
  console.log('Path:', event.path);
  
  let responseData = {
    message: 'Simple test working',
    timestamp: new Date().toISOString()
  };
  
  // Return different mock data based on the path
  if (event.path.includes('/bookings')) {
    responseData = [];
  } else if (event.path.includes('/users')) {
    responseData = [];
  } else if (event.path.includes('/rider-applications')) {
    responseData = [];
  }
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(responseData, null, 2),
  };
};
