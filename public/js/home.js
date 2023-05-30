function updateFileName() {
    const fileInput = document.getElementById('csv');
    const fileLabel = document.getElementById('csv-label');
    const fileName = fileInput.value.split('\\').pop(); // Extracts only the file name from the input value
    fileLabel.textContent = fileName; // Updates the label text with the selected file name
}

document.getElementById('search-input').addEventListener('input',function(){
    var searchValue = this.value;
    searchHTMLFiles(searchValue);
})

function searchHTMLFiles(fileName){
    var fileElements = document.getElementsByClassName("card");

    for(var i=0;i<fileElements.length;i++){
        var fileElement = fileElements[i];
        var fileNameElement = fileElement.querySelector('.file-name');

        if(fileNameElement.textContent.includes(fileName)){
            fileElement.style.display = "block";
        }else{
            fileElement.style.display = "none";
        }
    }
}