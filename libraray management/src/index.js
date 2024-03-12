const form = document.querySelector('form');
const author = document.querySelector('#author');
const id = document.querySelector('#id');
const title = document.querySelector('#title');
const container = document.querySelector('.container')
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id1 = id.value;
    const author1 = author.value;
    const title1 = title.value;
    const newDiv = document.createElement('span');
    newDiv.classList.add('container1');
    newDiv.innerHTML = `<header style="text-align:end;font-size:20px;cursor:pointer">&times</header><p>BOOK-ID:${id1}</p><br><p>AUTHOR:${author1}</p><br><p>TITLE:${title1}</p>`

    container.appendChild(newDiv);
    try {
        const response = await fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id1, author: author1, title: title1 })
        });
        if (!response.ok) {
            throw new Error('Failed to add book');
        }
        const responseData = await response.json();
        console.log(responseData); // Log response from server
        // Optionally, update UI or perform other actions based on response
    } catch (error) {
        console.error('Error:', error.message);
        // Handle error
    }

})

