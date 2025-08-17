/* - - - - - - - -


STSRT for Contact page


- - - - - - - -*/

document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".PS-section-FAQ-question");
  questions.forEach((question) => {
    question.addEventListener("click", () => {
      question.classList.toggle("active");
      const answer = question.nextElementSibling;
      const icon = question.querySelector(".PS-icon");

      if (answer.style.display == "block") {
        answer.style.display = "none";
        icon.textContent = "+";
      } else {
        answer.style.display = "block";
        icon.textContent = "-";
      }
    });
  });
});

/* - - - - - - - -


END for Contact page


- - - - - - - - */

/* mainslider______LM START */
const slides = document.querySelectorAll(".lmslide");
const dots = document.querySelectorAll(".lmdots .lmdot");
let current = 0;

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("lmslideactive", index === current);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("lmactivedot", index === current);
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    current = index;
    updateSlides();
  });
});

setInterval(() => {
  current = (current + 1) % slides.length;
  updateSlides();
}, 5000);

/* mainslider______LM END */

/* - - - - - - - -



START for List page 



- - - - - - - -*/

/* ეს კოდი არის ძებნის ველისათვის (დასაწყისი) */

function filterContent() {
  var input, filter, cards, card, i, txtValue;
  input = document.getElementById("mySearchInput");
  filter = input.value.toUpperCase(); // Get input value and convert to uppercase for case-insensitive search
  cards = document.getElementById("PS-result-cards");
  card = cards.getElementsByClassName("PS-result-card"); // Get all list items

  // Loop through all list items, and hide those that don't match the search query
  for (i = 0; i < card.length; i++) {
    txtValue = card[i].textContent || card[i].innerText; // Get the text content of the list item
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      card[i].style.display = ""; // Show the item if it matches
    } else {
      card[i].style.display = "none"; // Hide the item if it doesn't match
    }
  }
}

// function resetInput() {
//   document.getElementById("mySearchInput").value =
//     document.getElementById("mySearchInput").defaultValue;
// }

function clearInput() {
  document.getElementById("mySearchInput").value = "";
  filterContent();
}

/* ეს კოდი არის ძებნის ველისათვის (დასასრული) */

/* 



ეს კოდი არის ანაზღაურების ფილტრისათვის (დასაწისი)



*/

const slider = document.querySelector(".range-slider");
const progress = slider.querySelector(".progress");
const minPriceInput = slider.querySelector(".min-price");
const maxPriceInput = slider.querySelector(".max-price");
const minInput = slider.querySelector(".min-input");
const maxInput = slider.querySelector(".max-input");

const updateProgress = () => {
  const minValue = parseInt(minInput.value);
  const maxValue = parseInt(maxInput.value);

  // get the total range of the slider
  const range = maxInput.max - minInput.min;
  // get the selected value range of the progress
  const valueRange = maxValue - minValue;
  // calculate the width percentage
  const width = (valueRange / range) * 100;
  // calculate the min thumb offset
  const minOffset = ((minValue - minInput.min) / range) * 100;

  // update the progress width
  progress.style.width = width + "%";
  // update the progress left position
  progress.style.left = minOffset + "%";

  // update the number inputs
  minPriceInput.value = minValue;
  maxPriceInput.value = maxValue;
};

const updateRange = (event) => {
  const input = event.target;

  let min = parseInt(minPriceInput.value);
  let max = parseInt(maxPriceInput.value);

  if (input === minPriceInput && min > max) {
    max = min;
    maxPriceInput.value = max;
  } else if (input === maxPriceInput && max < min) {
    min = max;
    minPriceInput.value = min;
  }

  minInput.value = min;
  maxInput.value = max;

  updateProgress();
};

minPriceInput.addEventListener("input", updateRange);
maxPriceInput.addEventListener("input", updateRange);

minInput.addEventListener("input", () => {
  if (parseInt(minInput.value) >= parseInt(maxInput.value)) {
    maxInput.value = minInput.value;
  }
  updateProgress();
});

maxInput.addEventListener("input", () => {
  if (parseInt(maxInput.value) <= parseInt(minInput.value)) {
    minInput.value = maxInput.value;
  }
  updateProgress();
});

let isDragging = false;
let startOffsetX;

progress.addEventListener("mousedown", (e) => {
  e.preventDefault(); // prevent text selection

  isDragging = true;

  startOffsetX = e.clientX - progress.getBoundingClientRect().left;

  slider.classList.toggle("dragging", isDragging);
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    // get the size and position of the slider
    const sliderRect = slider.getBoundingClientRect();
    const progressWidth = parseFloat(progress.style.width || 0);

    // calculate the new left position for the progress element
    let newLeft =
      ((e.clientX - sliderRect.left - startOffsetX) / sliderRect.width) * 100;

    // ensure the progress is not exceeding the slider boundaries
    newLeft = Math.min(Math.max(newLeft, 0), 100 - progressWidth);

    // update the progress position
    progress.style.left = newLeft + "%";

    // calculate the new min thumb position
    const range = maxInput.max - minInput.min;
    const newMin = Math.round((newLeft / 100) * range) + parseInt(minInput.min);
    const newMax = newMin + parseInt(maxInput.value) - parseInt(minInput.value);

    // update the min input
    minInput.value = newMin;
    maxInput.value = newMax;

    // update the progress
    updateProgress();
  }
  slider.classList.toggle("dragging", isDragging);
  filterItems();
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
  }
  slider.classList.toggle("dragging", isDragging);
});

updateProgress();

/* For Search Code */

const minPriceSlider = document.getElementById("min-price-slider");
const maxPriceSlider = document.getElementById("max-price-slider");
const minPriceDisplay = document.getElementById("min-price-display");
const maxPriceDisplay = document.getElementById("max-price-display");
const itemList = document.getElementById("PS-result-cards");
const items = itemList.querySelectorAll(".PS-result-card");

function filterItems() {
  const minPrice = parseInt(minPriceSlider.value);
  const maxPrice = parseInt(maxPriceSlider.value);

  minPriceDisplay.textContent = minPrice;
  maxPriceDisplay.textContent = maxPrice;

  items.forEach((item) => {
    const itemPrice = parseInt(item.dataset.price);
    if (itemPrice >= minPrice && itemPrice <= maxPrice) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}

minPriceDisplay.addEventListener("input", filterItems);
minPriceSlider.addEventListener("input", filterItems);
maxPriceSlider.addEventListener("input", filterItems);

// Initial filter on page load
filterItems();

/* 



ეს კოდი არის ანაზღაურების ფილტრისათვის (დასასრული) 



*/

/* ეს კოდი არის ფავორიტების ველისათვის (დასაწყისი) */

// document.addEventListener("DOMContentLoaded", function () {
//   const parentDiv = document.querySelectorAll(".PS-result-card");
//   const childDiv = parentDiv.querySelectorAll(".PS-heart-div");

//   childDiv.addEventListener("click", function () {
//     parentDiv.classList.toggle("PS-favorite");
//     // childDiv.classList.toggle("PS-favorite");
//   });
// });

function updateItemCount() {
  const items = document.querySelectorAll(".PS-favorite"); // Select all elements with class 'item'
  const itemCount = items.length; // Get the count of selected elements
  document.getElementById("countDisplay").textContent = itemCount; // Update the display div
}

/* ეს კოდი ამატებს და აცილებს ფავორიტის კლასს */
document.addEventListener("DOMContentLoaded", function () {
  const childDivs = document.querySelectorAll(".PS-heart-div"); // Select all child divs

  childDivs.forEach((childDiv) => {
    childDiv.addEventListener("click", function () {
      // 'this' refers to the clicked childDiv
      // .parentNode gets the immediate parent element
      this.parentNode.classList.toggle("PS-favorite"); // Toggle a class on the parent
    });
  });
});

/* ეს კოდი ითვლის და გვიჩვენებს ფავორიტის კლასს */

// document.addEventListener("DOMContentLoaded", function () {
//   const items = document.querySelectorAll("PS-favorite");
//   const itemCount = items.length;

//   const resultDiv = document.getElementById("result-display");
//   resultDiv.textContent = `${itemCount}`;
// });

// Function to count elements and update display

// Call the function initially to display the count on page load
// updateItemCount();

// If items are added or removed dynamically, call updateItemCount() again
// For example, if you add a new item with JavaScript:
// const newItem = document.createElement("div");
// newItem.classList.add("PS-favorite");
// newItem.textContent = "New Item";
// document.body.appendChild(newItem);
// updateItemCount(); // Call to update the count after adding the new item

/* ეს კოდი არის ფავორიტების ველისათვის (დასასრული) */

/* - - - - - - - -



END for List page 



- - - - - - - - */
