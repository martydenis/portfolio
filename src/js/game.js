if (document.getElementById('back')) {
  document.getElementById('back').addEventListener('touchend', function(e) {
    e.stopPropagation();
  });

  document.getElementById('back').addEventListener('click', function(e) {
    e.stopPropagation();
  });
}