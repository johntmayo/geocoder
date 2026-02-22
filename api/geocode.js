export default async function handler(req, res) {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ error: 'address query parameter is required' });
    }

    const token = process.env.MAPBOX_TOKEN;
    if (!token) {
        return res.status(500).json({ error: 'MAPBOX_TOKEN environment variable is not set' });
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}`;

    const upstream = await fetch(url);
    const data = await upstream.json();

    return res.status(upstream.status).json(data);
}
