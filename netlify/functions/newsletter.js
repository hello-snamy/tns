// netlify/functions/newsletter.js
exports.handler = async (event) => {
    // Handle preflight OPTIONS request for CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const { email } = JSON.parse(event.body);
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'దయచేసి సరైన ఈమెయిల్ చిరునామా నమోదు చేయండి' })
            };
        }

        // Here you can integrate with your email service
        // For now, we'll just log and return success
        console.log('Newsletter subscription:', email);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                message: 'వార్తాలేఖకు చందా పూర్తి అయ్యింది! ధన్యవాదాలు.',
                email: email
            })
        };
    } catch (error) {
        console.error('Newsletter error:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'దయచేసి మళ్లీ ప్రయత్నించండి' })
        };
    }
};
