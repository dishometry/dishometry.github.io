module.exports.handler = async function (event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const longUrl = event.queryStringParameters ? event.queryStringParameters.url : null;

        if (!longUrl) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Не указан параметр url' })
            };
        }

        const clckResponse = await fetch(`https://clck.ru/--?url=${encodeURIComponent(longUrl)}`);
        
        const shortUrl = await clckResponse.text();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ shorturl: shortUrl })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Ошибка сервера: ' + error.message })
        };
    }
};