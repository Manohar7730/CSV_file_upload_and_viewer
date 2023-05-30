window.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('dataTable');// Get the table element
    const searchInput = document.getElementById('searchInput');// Get the search input element
    const rows = Array.from(table.rows);// Convert the table rows into an array

    const filterTable = () => {
        const searchValue = searchInput.value.trim().toLowerCase();// Get the trimmed and lowercase search value

        rows.forEach((row) => {
            const cells = Array.from(row.cells);// Convert the row cells into an array
            const hasMatch = cells.some((cell) => cell.innerText.trim().toLowerCase().includes(searchValue));// Check if any cell value matches the search value
            row.style.display = hasMatch || searchValue === '' ? '' : 'none';// Show or hide the row based on the match or empty search value
        });
    };
    searchInput.addEventListener('input', filterTable);// Attach the filterTable function to the input event of the search input element
});