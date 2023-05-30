function updateFileName() {
    const fileInput = document.getElementById('csv');// Get the file input element
    const fileLabel = document.getElementById('csv-label');// Get the label element
    const fileName = fileInput.value.split('\\').pop(); // Extract the file name from the input value by splitting on the file path separator
    fileLabel.textContent = fileName; // Update the label text with the selected file name
}

document.getElementById('search-input').addEventListener('input', function () {
    var searchValue = this.value;
    searchHTMLFiles(searchValue);
})

function searchHTMLFiles(fileName) {
    var fileElements = document.getElementsByClassName("card");// Get all elements with the class name 'card'

    for (var i = 0; i < fileElements.length; i++) {
        var fileElement = fileElements[i];// Get the current file element
        var fileNameElement = fileElement.querySelector('.file-name');// Get the element with class name 'file-name' within the file element

        if (fileNameElement.textContent.includes(fileName)) {
            fileElement.style.display = "block";// Show the file element if the file name includes the search term
        } else {
            fileElement.style.display = "none";// Hide the file element if the file name does not include the search term
        }
    }
}