// Wait until the DOM is fully loaded before adding the event listener
document.addEventListener('DOMContentLoaded', function() {
  // Get the button element by its ID
  const darkModeToggleButton = document.getElementById('dark-mode-toggle');

  // Add event listener for the button click
  darkModeToggleButton.addEventListener('click', function() {
    // Toggle the 'dark-mode' class on the <body> element
    document.body.classList.toggle('dark-mode');
  });
});