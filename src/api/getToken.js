export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
  const response = await fetch('https://iam.cloud.ibm.com/identity/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify({
            // Your body parameters for the token request
            apiKey: process.env.IBM_API_KEY, // Ideally, store sensitive info in environment variables
          }),
        });

        if (!response.ok) {
          throw new Error(`Error fetching token: ${response.statusText}`);
        }

        const data = await response.json();
        res.status(200).json({ token: data.access_token });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
