document.addEventListener('DOMContentLoaded', () => {
  const artGrid = document.querySelector('.art-grid');
  const searchInput = document.getElementById('search-art');
  const resolutionFilter = document.getElementById('resolution-filter');

  function renderArt(filteredArtworks) {
    artGrid.innerHTML = '';
    filteredArtworks.forEach(({ src, alt, title }) => {
      const card = document.createElement('div');
      card.classList.add('project-card');
      card.innerHTML = `
        <img src="${src}" class="img-fluid mb-2" alt="${alt}">
        <hr class="project-divider">
        <h3><strong>${title}</strong></h3>
      `;
      artGrid.appendChild(card);
    });
  }

  function applyFilters() {
    const query = searchInput.value.toLowerCase();
    const selectedRes = resolutionFilter.value;

    const filtered = artworks.filter(art =>
      art.title.toLowerCase().includes(query) &&
      (selectedRes === "all" || art.resolution === selectedRes)
    );

    renderArt(filtered);
  }

  // Initial render
  renderArt(artworks);

  // Event listeners
  searchInput.addEventListener('input', applyFilters);
  resolutionFilter.addEventListener('change', applyFilters);
});