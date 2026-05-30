export async function fetchUserProfile(userId: string) {
const token = localStorage.getItem('token') ?? '';
    const tokenFromCookie = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1] ?? '';
    const finalToken = token || tokenFromCookie;
  const response = await fetch(`${process.env.HT6_API_URL}/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${finalToken}` },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return response.json();
}
