
document.addEventListener("DOMContentLoaded", function() {
  // Adding event listener whenever the form is submitted
  document.getElementById("search-form").addEventListener("submit", searchTable);

  function searchTable(event) {
    event.preventDefault(); // Prevent the form from submitting and page refresh

    // Get the input value
    const input = document.getElementById("input").value.toLowerCase();
    // console.log(input);

    const vr = document.getElementsByClassName("mahi");

    for (let i = 0; i < vr.length; i++) {
      // Get the text content of every row and convert it into lowercase
      const trText = vr[i].textContent.toLowerCase();

      // If the input value is found
      if (trText.includes(input)) {
        // Adding a class attribute with name "Match" to it
        vr[i].classList.add("Match");
        console.log('Match is found');
      } else {
        // Removing the class attribute
        vr[i].classList.remove("Match");
        console.log('Match is not found');
      }
    }
  }
});
