export async function getLocations(start: number, limit = 3) {
  const res = await fetch('http://localhost:1234/v2/confidence/locations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Username: process.env.REACT_APP_USERNAME || '',
    },
    body: JSON.stringify({
      start,
      limit,
    }),
  });
  return res.json();
}
