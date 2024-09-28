function toggleDropdown(event) {
    event.stopPropagation();
    const element = event.target;
    dropdown = element.firstElementChild;
    if (dropdown == null) return
    dropdown.classList.toggle("show");
}