document.addEventListener('DOMContentLoaded', () => {
  const artGrid = document.querySelector('.art-grid');
  const searchInput = document.getElementById('search-art');
  const resolutionFilter = document.getElementById('resolution-filter');
  let pckry; // Store Packery instance

  function renderArt(filteredArtworks) {
    artGrid.innerHTML = ''; // Clear grid

    // Add grid-sizer for consistent base width
    const gridSizer = document.createElement('div');
    gridSizer.classList.add('grid-sizer');
    artGrid.appendChild(gridSizer);

    filteredArtworks.forEach(({ src, alt, title, resolution }) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('grid-item', resolution);

      const img = document.createElement('img');
      img.src = src;
      img.alt = alt || title;
      img.classList.add('art-image');

      wrapper.appendChild(img);
      artGrid.appendChild(wrapper);
    });

    imagesLoaded(artGrid, function () {
      if (pckry) pckry.destroy();

      pckry = new Packery(artGrid, {
        itemSelector: '.grid-item',
        gutter: 16,
        percentPosition: false,
        // columnWidth not used in Packery like in Masonry
      });

      setupLightbox();
    });
  }

  function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');

    document.querySelectorAll('.art-image').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
      });
    });

    closeBtn.addEventListener('click', () => {
      lightbox.classList.add('hidden');
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
      }
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