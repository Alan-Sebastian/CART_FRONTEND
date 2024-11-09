let searchInput = document.getElementById("searchProduct");
let search = document.getElementById("search");
// SEARCH LOADING
   
    searchInput.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            // if enter the search will store inside variable called query
            const query = event.target.value.trim();
           
            if (query) {
            // redirect towards search page along with query
                window.location.href = `search.html?query=${encodeURIComponent(query)}`;
            }
        }
    });

function searchFn(query) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let searchDetails = ""; // Resetting searchDetails
    console.log(query)
    products.forEach(val => {
        const rating = val.rating.toFixed(1);
        if (val.title.toLowerCase().includes(query.toLowerCase())) { // Filtering based on the query
            searchDetails += `
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
                    <button class="btn-success" onclick="addToCart(${val.id})">Add to cart</button>
                </div>
            </div>
            `;
  console.log(searchDetails);
        }
        
    });

        search.innerHTML = searchDetails;
   
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
