// src/routes/api/csv/+server.ts
import { json } from '@sveltejs/kit';

export const POST = async () => {
  // Sample data to return as CSV
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mark Brown', email: 'mark@example.com' }
  ];

  // Convert data to CSV format
  const csvHeader = 'ID,Name,Email\n';
  const csvRows = data.map((row) => `${row.id},${row.name},${row.email}`).join('\n');
  const csvContent = csvHeader + csvRows;

  // Return CSV content as file with appropriate headers
  return new Response(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="sample.csv"'
    }
  });
};