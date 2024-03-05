document.addEventListener('DOMContentLoaded', function () {
    const addBookForm = document.getElementById('addBookForm');
    const bookList = document.getElementById('bookList');

    addBookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;

        fetch('/api/books/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                fetchBooks();
            })
            .catch(error => console.error('Error:', error));
    });
    function fetchBooks() {
        fetch('/api/books')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log the data received from the server
                bookList.innerHTML = '';
                data.forEach(book => {
                    const li = document.createElement('li');
                    li.textContent = `${book.title} by ${book.author}`;
                    bookList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching books:', error));
    }


    fetchBooks();
});
