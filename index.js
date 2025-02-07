document.addEventListener('DOMContentLoaded', function() {
    fetchNews();
    
    function fetchNews() {
        fetch('https://btu-ex-2025-0bf797fecbae.herokuapp.com/news')
        .then(response => response.json())
        .then(data => displayNews(data))
        .catch(error => console.error('Error fetching news:', error));
    }
    
    function displayNews(news) {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';
        const table = document.createElement('table');
        const header = table.createTHead();
        const headerRow = header.insertRow();
    
        ['Id', 'Title', 'Category', 'Likes', 'Date Updated', 'Date Created', ''].forEach(text => {
            const cell = headerRow.insertCell();
            cell.textContent = text;
        });
    
        const createNewsCell = headerRow.insertCell();
        const createNewsButton = document.createElement('button');
        createNewsButton.textContent = 'Create';
        createNewsButton.onclick = function() {
            window.location.href = 'create.html';
        };
        createNewsCell.appendChild(createNewsButton);
    
        news.forEach(item => {
            const row = table.insertRow();
            row.setAttribute('data-id', item.id);
            let formattedDateUpdated = formatDate(item.dateUpdated);
            let formattedDateCreated = formatDate(item.dateCreated);
            [item.id, item.title, item.category, item.likes, formattedDateUpdated, formattedDateCreated, ''].forEach(text => {
                const cell = row.insertCell();
                cell.textContent = text;
            });
    
            addButtons(row, item.id);
        });
    
        newsContainer.appendChild(table);
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    
    function addButtons(row, id) {
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNews(id);
        deleteCell.appendChild(deleteButton);
    
        const updateCell = row.insertCell();
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = () => window.location.href = `update.html?id=${id}`;
        updateCell.appendChild(updateButton);
    }
    
    function deleteNews(id) {
        const row = document.querySelector(`tr[data-id='${id}']`);
        row.classList.add('fade-out');
    
        row.addEventListener('transitionend', () => {
            fetch(`https://btu-ex-2025-0bf797fecbae.herokuapp.com/news/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        row.remove();
                        console.log('News deleted successfully');
                    } else {
                        row.classList.remove('fade-out');
                        alert('Failed to delete the news item.');
                    }
                })
                .catch(error => {
                    console.error('Error deleting news:', error);
                    row.classList.remove('fade-out');
                    alert('Error deleting the news item.');
                });
        }, { once: true });
    }
});
