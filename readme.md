collection:

product:
GET getAllproducts: http://localhost:4000/api/v1/products
GET getProductById: http://localhost:4000/api/v1/products/productId

ShoppingCart:
GET getShoppingCartById: http://localhost:4000/api/v1/shoppingcarts/shoppingCartId
POST createNewShoppingCart http://localhost:4000/api/v1/shoppingcarts

PUT updateShoppingCart http://localhost:4000/api/v1/shoppingcarts/shoppingcartId
Body: {
"productId" : "63eb4f41f59802bf61888",
"quantity": "9"
}

DELETE deleteShoppingCartById http://localhost:4000/api/v1/shoppingcarts/shoppingCartId

DELETE deleteCartItemById http://localhost:4000/api/v1/shoppingcarts/shoppingcartId/productID
