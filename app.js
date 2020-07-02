const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const expand = () => {
    searchBtn.classList.toggle("close");
    input.classList.toggle("square");

};


searchBtn.addEventListener("click", expand);



function handleSubmit(event) {
    const input = document.querySelector(".input").value;
    const searchQuery = input.trim();
    console.log(searchQuery);

    fetchResults(searchQuery);


    event.preventDefault();
}

function fetchResults(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const results = data.query.search;
            displayResults(results);
        })
        .catch(() => console.log('An error occurred'));
}


function displayResults(results) {
    const searchResults = document.querySelector(".searchResults");
    searchResults.innerHTML = '';

    results.forEach(result => {
        const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
        searchResults.insertAdjacentHTML('beforeend',
            `<div class="resultItem">
        <h3 class="resultItem-title">
        <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
        </h3>
        <span class="resultItem-snippet">${result.snippet}...</span>
        <br>
        <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
        </div>`);
        document.getElementById('search').style.display = 'none';

    });
    console.log(results);
}

const form = document.querySelector(".search-form");
form.addEventListener('submit', handleSubmit);