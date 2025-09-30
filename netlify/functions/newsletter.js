const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const { email } = JSON.parse(event.body);
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid email address' })
            };
        }

        // Add to your email service (Mailchimp, ConvertKit, etc.)
        // Example with Mailchimp:
        const response = await addToMailchimp(email);

        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Successfully subscribed to newsletter' })
            };
        } else {
            throw new Error('Failed to subscribe');
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};

async function addToMailchimp(email) {
    // Implement your Mailchimp integration here
    // This is a placeholder implementation
    return { ok: true };
}
