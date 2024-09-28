document.addEventListener('DOMContentLoaded', function() {
    fetch('./sidebar.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('sidebar-container').innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading sidebar:', error);
      });
});

function toggleNavbar() {
    var navbar = document.getElementById('sidebar');
    console.log("click");
    if (navbar.classList.contains('sidebar-show')) {
        navbar.classList.remove('sidebar-show');
        navbar.classList.add('sidebar-hidden');
    } else {
        navbar.classList.remove('sidebar-hidden');
        navbar.classList.add('sidebar-show');
    }
}