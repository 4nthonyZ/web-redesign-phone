  function toggleFilter() {
    const panel = document.getElementById('filterPanel');
    if (panel) {
      panel.classList.add('active');
    }
  }

  function closeFilter() {
    const panel = document.getElementById('filterPanel');
    if (panel) {
      panel.classList.remove('active');
    }
  }

function changeImage(thumbnail) {
  const mainImage = document.getElementById("mainImage");
  mainImage.src = thumbnail.src;


  document.querySelectorAll('.thumb').forEach(img => img.classList.remove('selected'));


  thumbnail.classList.add('selected');
}

