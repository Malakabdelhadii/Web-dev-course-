
function addName() {
    const input = document.getElementById('name');
    const name = input.value.trim();

    if (!name) return; // Ignore empty input

    document.getElementById('title').textContent = `Hello, ${name}!`;

    const li = document.createElement('li');
    li.textContent = name;

    document.getElementById('list').appendChild(li);

    input.value = ''; // Clear input box
}

function removeName(e) {
    if (e.target.nodeName === 'LI') {
        const name = e.target.textContent;

        document.getElementById('title').textContent =
            `Goodbye, ${name}! See you later.`;

        e.target.remove(); // Remove clicked list item
    }
}

// Attach event listeners
document.getElementById('greet').addEventListener('click', addName);
document.getElementById('list').addEventListener('click', removeName);
