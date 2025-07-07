document.addEventListener('DOMContentLoaded', () => {
  const artGrid = document.querySelector('.art-grid');
  const searchInput = document.getElementById('search-art');
  const resolutionFilter = document.getElementById('resolution-filter');
  let msnry; // Store Masonry instance

  function renderArt(filteredArtworks) {
  artGrid.innerHTML = ''; // Clear grid

  // Add grid-sizer for Masonry column width
  const gridSizer = document.createElement('div');
  gridSizer.classList.add('grid-sizer');
  artGrid.appendChild(gridSizer);

  filteredArtworks.forEach(({ src, alt, title, resolution }) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || title;
    img.classList.add('art-image', resolution);
    artGrid.appendChild(img);
  });

  imagesLoaded(artGrid, function () {
    if (msnry) msnry.destroy();

    msnry = new Masonry(artGrid, {
      itemSelector: 'img.art-image',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      gutter: 16,
      fitWidth: false,
      horizontalOrder: true,
    });

    setupLightbox();
  });
}


function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  // Event delegation: attach click handler after render
  document.querySelectorAll('img.art-image').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });

  // close on outside click
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