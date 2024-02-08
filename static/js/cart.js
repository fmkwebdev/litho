var updateBtns = document.getElementsByClassName('update-cart');

for (i = 0; i < updateBtns.length; i++) {
    updateBtns[i].addEventListener('click', function(){
        var productId = this.dataset.product;
        var action = this.dataset.action;
        console.log('productId:', productId, 'Action:', action);
        console.log('USER:', user);

        if (user == 'AnonymousUser') {
            addCookieItem(productId, action);
        } else {
            updateUserOrder(productId, action);
        }
    });
}

function updateUserOrder(productId, action){
    console.log('User is authenticated, sending data...');
    var url = '/update_item/';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        }, 
        body: JSON.stringify({'productId': productId, 'action': action})
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // Set a session storage flag to indicate that the popup should be shown
        sessionStorage.setItem('showPopup', 'true');
    });
}

function addCookieItem(productId, action){
    console.log('User is not authenticated');

if (action == 'add') {
    // Check if the cart already contains the item
    if (Object.keys(cart).length === 0) {
        // Cart is empty, add the item to the cart with quantity 1
        cart[productId] = {'quantity': 1};
        console.log('Item added to cart');
        
        // Show success message
        var successHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                        '  Termék sikeresen hozzáadva a kosárhoz.' +
                        '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '    <span aria-hidden="true">&times;</span>' +
                        '  </button>' +
                        '</div>';
        document.getElementById('alertContainer').innerHTML = successHTML;
        } else if (cart[productId] === undefined) {
            // Cart is not empty and the item is not in the cart, add it with quantity 1
            cart = {};  // Clear the existing cart to allow only one item
            cart[productId] = {'quantity': 1};
            console.log('Item added to cart');
            var successHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                        '  Termék sikeresen hozzáadva a kosárhoz.' +
                        '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '    <span aria-hidden="true">&times;</span>' +
                        '  </button>' +
                        '</div>';
        document.getElementById('alertContainer').innerHTML = successHTML;
        } else {
            // Item is already in the cart, log a message or take appropriate action
            var alertHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                            ' Már van egy termék a kosárban. A kosár ikonra kattintva tudja megnézni illetve szerkeszteni.' +
                            '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '    <span aria-hidden="true">&times;</span>' +
                            '  </button>' +
                            '</div>';
            document.getElementById('alertContainer').innerHTML = alertHTML;
            console.log('Item already in cart!');
            // Hide the popup after 5 seconds
            setTimeout(function() {
                document.getElementById('alertContainer').innerHTML = '';
            }, 5000);
        }
    }

    if (action == 'remove') {
        cart[productId]['quantity'] -= 1;

        if (cart[productId]['quantity'] <= 0) {
            console.log('Item should be deleted');
            delete cart[productId];
        }
    }

    console.log('CART:', cart);
    document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/";
    setTimeout(function() {
        location.reload();
    }, 1050);
}

// Check if the session storage flag is set to show the popup
document.addEventListener('DOMContentLoaded', function() {
    var showPopup = sessionStorage.getItem('showPopup');
    if (showPopup === 'true') {
        // Show the popup
        var alertHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                        '  Product is already in your cart. You can manage your cart from the cart page.' +
                        '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                        '    <span aria-hidden="true">&times;</span>' +
                        '  </button>' +
                        '</div>';
        document.getElementById('alertContainer').innerHTML = alertHTML;

        // Clear the session storage flag after showing the popup
        sessionStorage.removeItem('showPopup');
    }
});