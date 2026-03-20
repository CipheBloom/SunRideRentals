exports.handler = async (event, context) => {
  console.log('🔧 Rider applications function called');
  
  try {
    // Return simple empty array for now to test
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify([], null, 2),
    };
  } catch (error) {
    console.error('❌ Error in rider-applications function:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      }),
    };
  }
};
