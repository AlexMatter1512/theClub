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

export function correctDateString(date_string: string) // for javascript
{
    const date = new Date(date_string);
    // Get the offset in minutes (Italy is typically UTC+1, or UTC+2 during daylight savings)
    const offset = date.getTimezoneOffset();
    // Adjust the date by the offset
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    // Format it to match the required input format: YYYY-MM-DDTHH:mm
    const formattedDate = localDate.toISOString().slice(0, 16);
    return formattedDate;
}

/**
 * Creates a FileList from an image URL.
 * @param {string} src - The source URL of the image.
 * @returns {Promise<FileList>} - A FileList containing the image file.
 */
export async function createFileListFromSrc(src: string): Promise<FileList> {
    const response = await fetch(src);
    const blob = await response.blob();
    const fileName = src.split('/').pop() || 'file';
    const fileObject = new File([blob], fileName, { type: blob.type });

    // Use DataTransfer to create a FileList
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(fileObject);

    return dataTransfer.files; // Return the FileList
}