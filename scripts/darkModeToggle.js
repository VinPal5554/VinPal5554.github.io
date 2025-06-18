 document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggleButton = document.getElementById('dark-mode-toggle');

    // 1. Apply saved theme on page load
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }

    // 2. Handle toggle and save preference
    darkModeToggleButton.addEventListener('click', function() {
      const isDarkMode = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
  });