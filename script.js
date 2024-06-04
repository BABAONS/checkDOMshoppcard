document.addEventListener("DOMContentLoaded", function() {
    const decreaseButtons = document.querySelectorAll(".fas.fa-minus-circle");
    const increaseButtons = document.querySelectorAll(".fas.fa-plus-circle");
    const deleteButtons = document.querySelectorAll(".fas.fa-trash-alt");
    const likeButtons = document.querySelectorAll(".fas.fa-heart");
    const totalPriceElement = document.querySelector(".total");

    // Fonction pour mettre à jour la quantité et le prix total
    function updateQuantity(element, increment) {
        const quantityElement = element.parentElement.querySelector(".quantity");
        let quantity = parseInt(quantityElement.textContent);
        if (increment) {
            quantity++;
        } else {
            if (quantity > 0) {
                quantity--;
            }
        }
        quantityElement.textContent = quantity;
        updateTotalPrice();
    }

    // Fonction pour mettre à jour le prix total
    function updateTotalPrice() {
        let totalPrice = 0;
        const items = document.querySelectorAll(".card-body");
        items.forEach(item => {
            const quantity = parseInt(item.querySelector(".quantity").textContent);
            const price = parseFloat(item.querySelector(".unit-price").textContent);
            totalPrice += quantity * price;
        });
        totalPriceElement.textContent = totalPrice.toFixed(2) + " $";
    }
    

    // Attacher des écouteurs d'événements aux boutons de diminution
    decreaseButtons.forEach(button => {
        button.addEventListener("click", function() {
            updateQuantity(button, false);
        });
    });

    // Attacher des écouteurs d'événements aux boutons d'augmentation
    increaseButtons.forEach(button => {
        button.addEventListener("click", function() {
            updateQuantity(button, true);
        });
    });

    // Attacher des écouteurs d'événements aux boutons de suppression
    deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
            const cardParent = button.closest(".card-body");
            cardParent.parentElement.remove();
            updateTotalPrice();
        });
    });

    // Attacher des écouteurs d'événements aux boutons "J'aime"
    likeButtons.forEach(button => {
        button.addEventListener("click", function() {
            button.classList.toggle("text-danger");
        });
    });

    // Mettre à jour le prix total au chargement de la page
    updateTotalPrice();
});