exports.handler = async (event, context) => {
  console.log('🔧 Simple test function called');
  console.log('Event:', JSON.stringify(event, null, 2));
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      message: 'Simple test working',
      timestamp: new Date().toISOString()
    }, null, 2),
  };
};
