// Replace 'YOUR_GOOGLE_SHEET_ID' with the actual ID of your Google Sheet.
const sheetId = '16P_tWrdS6ztdxOSwb7s4kr6HqyUAkT56h7WL88rTykE';
const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

function searchData() {
    const searchInput = document.getElementById('searchInput').value;

    // Construct the query to filter data based on the search input.
    const query = `SELECT * WHERE A CONTAINS '${searchInput}'`;

    fetch(`${sheetUrl}&tq=${encodeURIComponent(query)}`)
        .then(response => response.text())
        .then(data => {
            const json = JSON.parse(data.substring(47).slice(0, -2));
            displayResults(json.table.rows);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(rows) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (rows.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    const table = document.createElement('table');
    table.border = '1';

    // Create header row
    const headerRow = table.insertRow();
    for (const header of rows[0].c) {
        const cell = headerRow.insertCell();
        cell.innerText = header.v;
    }

    // Create data rows
    for (let i = 1; i < rows.length; i++) {
        const dataRow = table.insertRow();
        for (const cellData of rows[i].c) {
            const cell = dataRow.insertCell();
            cell.innerText = cellData.v;
        }
    }

    resultsContainer.appendChild(table);
}
