window.addEventListener('DOMContentLoaded',()=>{
    const table = document.getElementById('dataTable');
    const searchInput = document.getElementById('searchInput');
    const rows = Array.from(table.rows);

    const filterTable = ()=>{
        const searchValue = searchInput.value.trim().toLowerCase();

        rows.forEach((row)=>{
            const cells = Array.from(row.cells);
            const hasMatch = cells.some((cell)=> cell.innerText.trim().toLowerCase().includes(searchValue));
            row.style.display = hasMatch || searchValue === ''?'':'none';
        });
    };
    searchInput.addEventListener('input',filterTable);
})