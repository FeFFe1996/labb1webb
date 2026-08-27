async function fetchData() {
    const response = await fetch('./data/recept.json');

    if (!response.ok) {
        throw new Error("Something went wrong returning the file: " + response.status);
    }

    const data = await response.json();
    console.log(data);

    addTitle(data);
}

function addTitle(data) {
    const container = document.querySelector('#data');

    for (let i = 0; i < data.recept.length; i++){
        const title = document.createElement('li');
        const rowBreak = document.createElement('br');
        title.innerHTML = `<a href="recept.html?id=${data.recept[i].id}">${data.recept[i].recept}</a>`;
        container.appendChild(title);
        container.appendChild(rowBreak);
    }
}

fetchData();
