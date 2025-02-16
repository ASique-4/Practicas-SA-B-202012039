document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;

    fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, quantity, price })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('addProductForm').reset();
        loadInventory();
    });
});

document.getElementById('searchProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('searchName').value;

    fetch(`http://localhost:3000/products/search/${name}`)
    .then(response => response.json())
    .then(product => {
        const searchResult = document.getElementById('searchResult');
        if (product) {
            searchResult.textContent = `Nombre: ${product.name}, Cantidad: ${product.quantity}, Precio: ${product.price}`;
        } else {
            searchResult.textContent = 'Producto no encontrado';
        }
    });
});

document.getElementById('refreshInventory').addEventListener('click', loadInventory);
document.getElementById('sortByPrice').addEventListener('click', () => loadInventory('price'));
document.getElementById('sortByQuantity').addEventListener('click', () => loadInventory('quantity'));

function loadInventory(sortBy) {
    let url = 'http://localhost:3000/products';
    if (sortBy) {
        url += `/sorted?sortBy=${sortBy}`;
    }

    fetch(url)
    .then(response => response.json())
    .then(products => {
        const inventoryList = document.getElementById('inventoryList');
        inventoryList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `Nombre: ${product.name}, Cantidad: ${product.quantity}, Precio: ${product.price}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => deleteProduct(product.name));
            li.appendChild(deleteButton);
            inventoryList.appendChild(li);
        });
    });
}

function deleteProduct(name) {
    fetch(`http://localhost:3000/products/${name}`, {
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadInventory();
    });
}

// Load inventory on page load
loadInventory();