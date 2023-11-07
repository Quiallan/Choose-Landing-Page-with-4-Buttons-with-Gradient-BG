//Rabbit-Hole JS
// Function to initialize Navbar Features
function initializeNavbarFeatures() {
    // Rotating quotes
    let quotes = ["Quote 1", "Quote 2", "Quote 3"];
    let currentQuoteIndex = 0;
    let textSliderElement = document.querySelector(".text-slider");
  
    setInterval(function() {
      textSliderElement.innerHTML = quotes[currentQuoteIndex];
      textSliderElement.style.animation = "none";
      setTimeout(() => {
        textSliderElement.style.animation = "moveUp 1s ease-in-out";
      }, 0);
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    }, 7000);
  
    // Dark Mode Toggle
    let toggleSwitchElement = document.querySelector(".slider");
    let toggleLabelElement = document.querySelector(".toggle-label");
    let circleElement = document.querySelector(".circle");
    let isDarkMode = false;
  
    toggleSwitchElement.addEventListener("click", function() {
      isDarkMode = !isDarkMode;
      if (isDarkMode) {
        toggleLabelElement.textContent = "On";
        document.body.style.backgroundColor = "black";
      } else {
        toggleLabelElement.textContent = "Off";
        document.body.style.backgroundColor = "white";
      }
      circleElement.style.left = isDarkMode ? "27.5px" : "2.5px";
    });
  
    // Scrolling Text
    let scrollingTextElement = document.querySelector(".scrolling-text");
    let textContent = "The Matrix is everywhere, Neo.";
    scrollingTextElement.innerHTML = textContent;
  
    setInterval(function() {
      let firstChar = textContent.charAt(0);
      let remainingText = textContent.slice(1);
      textContent = remainingText + firstChar;
      scrollingTextElement.innerHTML = textContent;
    }, 200);
  }
  
  // Fetch navbar.html and insert its content into the div with id="navbar"
  fetch('navbar.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      const navbarElement = document.getElementById('navbar');
      if (navbarElement) {
        navbarElement.innerHTML = data;
        initializeNavbarFeatures();  // Initialize navbar features after it is loaded
      } else {
        console.error('Navbar element not found in the DOM.');
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  


// Matrix Code

// Initialize canvas and context for the matrix effect
const matrixCanvas = document.getElementById('matrixCanvas');
const ctx = matrixCanvas.getContext('2d');

// Set canvas dimensions
function setMatrixCanvasSize() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
}

// Call this function to set initial size and whenever the window is resized
setMatrixCanvasSize();
window.addEventListener('resize', setMatrixCanvasSize);

// Matrix code logic
let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
characters = characters.split("");
const fontSize = 10;
const columns = matrixCanvas.width / fontSize;
let drops = [];
for (let x = 0; x < columns; x++) drops[x] = 1;

// Draw function for the matrix effect
function drawMatrix() {
  // Draw the gradient background in each frame
  const bgGradient = ctx.createLinearGradient(0, 0, 0, matrixCanvas.height);
  bgGradient.addColorStop(0, "black");
  bgGradient.addColorStop(1, "blue");
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  // Draw a semi-transparent black rectangle to create the trail effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  // Text color (Red)
  ctx.fillStyle = "#FF0000";
  ctx.font = `${fontSize}px arial`;

  for (let i = 0; i < drops.length; i++) {
    // Generate an even longer string of random characters to fill more space
    let text = "";
    for (let j = 0; j < 100; j++) {  // Increased from 50 to 100
      text += characters[Math.floor(Math.random() * characters.length)];
    }

    // Draw the string vertically in each column
    for (let j = 0; j < text.length; j++) {
      ctx.fillText(text[j], i * fontSize, (drops[i] - j) * fontSize);
    }

    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

// Slow down the speed by increasing the interval time
const matrixInterval = setInterval(drawMatrix, 100);  // Increased from 33 to 100


// Call the drawMatrix function every 33 milliseconds
//const matrixInterval = setInterval(drawMatrix, 33);

