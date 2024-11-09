let cnt = document.getElementById("cnt");
let prodDetails = "";
let products = [];


function fetchData() {
    fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((result) => {
            products = result.products;
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts(products);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}


function displayProducts(products) {

    if (products) {
        products?.map((val, index) => {
            const rating = val.rating.toFixed(1);

            prodDetails += `
            <div class="product-item">
                <img src="${val.images[0]}" alt="${val.title}" />
                <p class="title">${val.title}</p>
                <div class="rating">
                <span class="rating-chip">
                ${rating}
                <span class="star">
                <i class="fa-solid fa-star"></i>
                </span>
                </span>
                </div>
                <div class="price-button">  
                <p class="price">$${val.price}</p>
                <button class=" btn-success" onclick="addToCart(${val.id})">Add to cart </button>
                </div>
            </div>
            `;
        });
        cnt.innerHTML = prodDetails;

    }
    else {
        cnt.innerHTML = `<h1>Loading......</h1>`;

    }
}
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let product = products.find(p => p.id === productId);

    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
    } else {
        console.error("Product not found");
    }
}



fetchData();
