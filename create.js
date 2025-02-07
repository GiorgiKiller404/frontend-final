document.addEventListener('DOMContentLoaded', function() {
    populateCategories();
    addFormSubmitListener();

    function populateCategories() {
        const categories = ['Politics', 'Science', 'Lifestyle', 'Technology', 'Health'];
        const categorySelect = document.getElementById('category');
        categories.forEach(category => {
            let option = document.createElement('option');
            option.value = category;
            option.text = category;
            categorySelect.appendChild(option);
        });
    }

    function addFormSubmitListener() {
        document.getElementById('create-news-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                category: document.getElementById('category').value,
                editorFirstName: document.getElementById('editorFirstName').value,
                editorLastName: document.getElementById('editorLastName').value
            };

            fetch('https://btu-ex-2025-0bf797fecbae.herokuapp.com/news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location.href = 'index.html'; 
            })
            .catch((error) => {
                console.error('Error:', error); 
            });
        });
    }
});
