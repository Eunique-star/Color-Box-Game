let score = 0; // Initialize score
        let correctColor = null; // For storing the correct color

        // Function to update score display
        function updateScoreDisplay() {
            document.getElementById("score").innerHTML = `<p>Score: ${score}</p>`;
        }

        // Function to generate a random color in RGB format
        function getRandomColor() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return { r, g, b, rgb: `rgb(${r}, ${g}, ${b})` };
        }

        // Function to generate random shades of a given color
        function generateShades(baseColor, numShades = 6) {
            let shades = [];
            // Ensure that shades are not too similar
            while (shades.length < numShades) {
                let shadeFactor = (Math.random() * 1.5) + 0.3; // Higher range to make them more distinct
                let newR = Math.min(255, Math.floor(baseColor.r * shadeFactor));
                let newG = Math.min(255, Math.floor(baseColor.g * shadeFactor));
                let newB = Math.min(255, Math.floor(baseColor.b * shadeFactor));

                // Check if color is distinct enough from the existing shades
                let newShade = `rgb(${newR}, ${newG}, ${newB})`;
                if (!shades.includes(newShade)) {
                    shades.push(newShade);
                }
            }
            return shades;
        }

        function createConfetti() {
    for (let i = 0; i < 50; i++) { // Increased number of confetti pieces
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        document.body.appendChild(confetti);

        // Random position
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.top = `0px`;

        // Random animation speed and rotation
        confetti.style.animationDuration = `${Math.random() * 1 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;

        // Random color effect
        confetti.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 2000);
    }
}

        // Apply colors to the box and buttons
        function applyColors() {
            const boxFaces = document.getElementsByClassName("face");
            const buttons = document.querySelectorAll(".color-button");

            // Generate a base color for the box
            const baseColor = getRandomColor();
            correctColor = baseColor.rgb; // Store the box's color as the correct answer
            const shades = generateShades(baseColor, buttons.length); // Generate shades for the buttons

            // Apply base color to the box
            for (let face of boxFaces) {
                face.style.backgroundColor = baseColor.rgb;
            }

            // Apply scattered shades to buttons, ensuring one button matches the box color
            let correctButtonIndex = Math.floor(Math.random() * buttons.length); // Pick a random button to be correct
            buttons.forEach((button, index) => {
                if (index === correctButtonIndex) {
                    button.style.backgroundColor = baseColor.rgb; // Set the correct button color
                } else {
                    button.style.backgroundColor = shades[index]; // Set the other buttons to the shades
                }
                
                // Button click logic
                button.onclick = function () {
                    const status = document.getElementById("status");
                    const box = document.getElementById("box");

                    // Check if the clicked button's color matches the correct color
                    if (button.style.backgroundColor === correctColor) {
                        score += 2; // Add 2 points for correct guess
                        updateScoreDisplay();

                        // Display success message
                        status.innerText = "You got it right!";
                        status.style.color = "green";
                        status.style.display = "block";
                        createConfetti();

                        // Delay before applying new colors
                        setTimeout(function() {
                        status.style.display = "none";   
                        applyColors();
                          }, 1500);
                    } else {
                        // Wrong message
                        status.innerText = "You are wrong, try again!";
                        status.style.color = "red";
                        status.style.display = "block";

                    }
                };
            });
            updateScoreDisplay();
        }

        // Function to reset the game
        function resetGame() {
            const confirmReset = window.confirm("Are you sure you want to reset the game?");
            
            if (confirmReset) {
                score = 0; // Reset score
                updateScoreDisplay();
                
                //Clear status message
                document.getElementById("status").innerText = "";
                
                applyColors(); // Restart the game with new colors
            }
        }

        // Attach event listener to reset button
        document.getElementById("reset").addEventListener("click", resetGame);

        // Run function when the page loads
        document.addEventListener("DOMContentLoaded", applyColors);