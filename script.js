document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("movement-form");
    const successMessage = document.getElementById("success-message");
    

    
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const movement = {
                title: document.getElementById("title").value,
                photo: document.getElementById("photo").value,
                bio: document.getElementById("bio").value,
                status: document.getElementById("status").value,
                members: document.getElementById("members").value,
                advocates: document.getElementById("advocates").value
            };

            // Save movement to localStorage
            let movements = JSON.parse(localStorage.getItem("movements")) || [];
            movements.push(movement);
            localStorage.setItem("movements", JSON.stringify(movements));

            // Show success message
            form.style.display = "none";
            successMessage.style.display = "block";
        });
    }

    // Home Page: Display movements
    const movementsList = document.getElementById("movements-list");
    if (movementsList) {
        const movements = JSON.parse(localStorage.getItem("movements")) || [];
        movements.forEach((movement) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${movement.photo}" alt="${movement.title}">
                <h3>${movement.title}</h3>
                <p>${movement.bio}</p>
                <div class="progress-bar">
                    <div style="width: ${movement.status === 'Just Started!' ? '10%' :
                        movement.status === 'Planning' ? '30%' :
                        movement.status === 'Fundraising' ? '50%' :
                        movement.status === 'Gathering Resources' ? '70%' :
                        movement.status === 'Reaching out to lobbyists' ? '80%' :
                        movement.status === 'Writing down documents' ? '90%' : '100%'}"></div>
                </div>
                <div class="columns-for-join-advocate">
                  <div class="join-container"
                    <p>Members: ${movement.members}</p>
                    <button class="button-join">Join this movement</button>
                  </div>  
                  <div class="advocates-container"
                    <p>Advocates: ${movement.advocates}</p>
                    <button class="button-advocate">Advocate</button>
                  </div>
                </div>        
            `;
            movementsList.appendChild(card);
        });

        // Initialize the slider
        const leftArrow = document.querySelector(".arrow.left");
        const rightArrow = document.querySelector(".arrow.right");
        let scrollPosition = 0;
        const cardWidth = movementsList.querySelector(".card").offsetWidth + 20; // card width + margin
        const totalCards = movements.length;

        function updateSliderPosition() {
            movementsList.style.transform = `translateX(-${scrollPosition}px)`;
        }

        rightArrow.addEventListener("click", () => {
            if (scrollPosition < (totalCards - 3) * cardWidth) {
                scrollPosition += cardWidth;
                updateSliderPosition();
            }
        });

        leftArrow.addEventListener("click", () => {
            if (scrollPosition > 0) {
                scrollPosition -= cardWidth;
                updateSliderPosition();
            }
        });
    }
});
