export function generateRandomUsername(name: string) {
    return name + Math.floor(Math.random() * 1000);
}

export function formatDate(date: Date) {
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    
    return `${day}/${month} ${hours}:${minutes}`;
}