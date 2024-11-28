const API_URL = 'http://localhost:3000/api/items';

// Fetch and display items
async function fetchItems() {
    try {
        const response = await fetch(API_URL);
        const items = await response.json();
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';

        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.appendChild(createDeleteButton(item.id));
            itemList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

// Add a new item
async function addItem() {
    const itemName = document.getElementById('itemName').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: itemName }),
        });

        if (response.ok) {
            fetchItems();
            document.getElementById('itemName').value = '';
        } else {
            console.error('Error adding item');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Delete an item
async function deleteItem(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

        if (response.ok) {
            fetchItems();
        } else {
            console.error('Error deleting item');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Create a delete button
function createDeleteButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.onclick = () => deleteItem(id);
    return button;
}

// Initialize the app
fetchItems();
