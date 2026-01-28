// netlify/functions/save-content.js
exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Missing GITHUB_TOKEN' }) };
    }

    const owner = process.env.REPO_OWNER || 'mohamedmafaz007';
    const repo = process.env.REPO_NAME || 'mazzo-di-rosa';
    const path = 'public/content.json';

    try {
        const bodyContent = JSON.parse(event.body);

        // 1. Get current SHA
        const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        const getResp = await fetch(getUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Netlify-Function'
            }
        });

        let sha = null;
        if (getResp.ok) {
            const data = await getResp.json();
            sha = data.sha;
        }

        // 2. Commit update
        // GitHub API requires content to be base64 encoded
        const contentStr = JSON.stringify(bodyContent, null, 2);
        const contentBase64 = Buffer.from(contentStr).toString('base64');

        const putResp = await fetch(getUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Netlify-Function',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Update content via Admin Panel',
                content: contentBase64,
                sha: sha
            })
        });

        if (!putResp.ok) {
            const errorText = await putResp.text();
            throw new Error(`GitHub API Error: ${putResp.status} ${errorText}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
