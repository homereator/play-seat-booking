const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Count only the selected seats
  const selectedSeatsCount = selectedSeats.length;

  // Set the text content of the count and total elements
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount;

  // Save the selected seats data to local storage
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      } else {
        seat.classList.add("available"); // Add "available" class to non-selected seats
      }
    });
  } else {
    seats.forEach((seat) => {
      seat.classList.add("available"); // Add "available" class to all seats if no data in local storage
    });
  }
}
console.log(populateUI())

// Seat click event
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
    if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
    } else {
      // Limit the selection to two seats
      const selectedSeats = document.querySelectorAll(".row .seat.selected");
      if (selectedSeats.length < 2) {
        e.target.classList.add("selected");
      }
    }
    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
