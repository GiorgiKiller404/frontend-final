document.addEventListener('DOMContentLoaded', function() {
    const newsId = new URLSearchParams(window.location.search).get('id');
    if (newsId) {
        fetchNewsData(newsId);
    }

    document.getElementById('update-news-form').addEventListener('submit', function(event) {
        event.preventDefault();
        updateNews(newsId);
    });

    function fetchNewsData(newsId) {
        fetch(`https://btu-ex-2025-0bf797fecbae.herokuapp.com/news/${newsId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched news data:', data); // Check if the fetched data includes the category
                document.getElementById('title').value = data.title;
                document.getElementById('description').value = data.description;
                populateCategories(data.category);
                document.getElementById('editorFirstName').value = data.editorFirstName;
                document.getElementById('editorLastName').value = data.editorLastName;
            })
            .catch(error => console.error('Error fetching news details:', error));
    }

    function populateCategories(selectedCategory) {
        const categories = ['Politics', 'Science', 'Lifestyle', 'Technology', 'Health']; 
        const categorySelect = document.getElementById('category');

        console.log('Selected category:', selectedCategory); // Log the selected category to ensure it is being passed

        // Clear previous options
        categorySelect.innerHTML = '';

        categories.forEach(category => {
            let option = document.createElement('option');
            option.value = category;
            option.text = category;

            // Set the selected attribute if the category matches the selected category
            if (category === selectedCategory) {
                option.selected = true;
            }

            categorySelect.appendChild(option);
        });
    }

    function updateNews(newsId) {
        const updatedData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            category: document.getElementById('category').value,
            editorFirstName: document.getElementById('editorFirstName').value,
            editorLastName: document.getElementById('editorLastName').value
        };

        fetch(`https://btu-ex-2025-0bf797fecbae.herokuapp.com/news/${newsId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Update successful', data);
            window.location.href = 'index.html'; 
        })
        .catch(error => console.error('Error updating news:', error));
    }
});
