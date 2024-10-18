export default async function getAllUser() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return data
}
