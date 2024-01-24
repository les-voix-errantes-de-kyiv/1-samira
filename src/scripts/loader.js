var loadingWrapper = document.getElementById("loadingWrapper");
var progressbar = document.getElementById('progressbar')
var load_text = document.getElementById('load_text')

var progress = 0;
progressbar.style.width = "calc(0% - 5px)";
load_text.innerHTML = "Chargement en cours...";

window.addEventListener("DOMContentLoaded", (event) => {

    progress = 50;
    progressbar.style.width = "calc("+progress+"% - 5px)";

})

window.addEventListener("load", (event) => {

    progress = 100;
    progressbar.style.width = "calc("+progress+"% - 5px)";

    
        setTimeout(function() {
            loadingWrapper.style.opacity = '0'; 

            setTimeout(function() {
                loadingWrapper.style.display = 'none'; 
            }, 500); 
        }, 300);  
    

  });