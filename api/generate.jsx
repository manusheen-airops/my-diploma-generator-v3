export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || 'Friend';
  
  return new Response(`If you can see this, the routing is WORKING and the name is ${name}.`, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}
