export function generateRandomUsername(name: string) {
    return name + Math.floor(Math.random() * 1000);
}

export function formatDate(date: Date) // for display
{
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function getDateString(date: string) // for javascript
{
    return new Date(date).toISOString().slice(0, 16);
}