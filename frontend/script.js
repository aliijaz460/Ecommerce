const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

async function fetchProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;
        productList.appendChild(li);
    });
}

productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const newProduct = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        stock: document.getElementById('stock').value
    };
    await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    });
    fetchProducts();
    productForm.reset();
});

fetchProducts();
