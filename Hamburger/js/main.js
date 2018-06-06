window.onload = function(){
    hamburger_click();
}
function hamburger_click(){
    var hamburger = document.getElementById('hamburger_menu');
    var bars = document.getElementsByClassName('bar');
    hamburger.onclick = (function(){ // Onclick event
        for(var i = 0; i < bars.length; i++){
            bars[i].classList.toggle('close_'+(i+1));
        }
    })
    hamburger.onmouseover = (function(){ // Hover event
        for(var i = 0; i < bars.length; i++){
            var regex = bars[i].className.split(' ').some(function(c){return /close/i.test(c)}); // Checking any of the bars contain a class called tag
            if(regex == false){ 
                bars[i].classList.add('hover_'+(i+1)); // If the bars dont contain a close class add the hover class
            }else{
                bars[i].classList.remove('hover_'+(i+1)); // If the bars do, remove the hover class
            }
        }
    })
    hamburger.onmouseleave = (function(){ // Hover leaving event
        for(var i = 0; i < bars.length; i++){
            var regex = bars[i].className.split(' ').some(function(c){return /close/i.test(c)}); 
            if(regex == false){
                bars[i].classList.remove('hover_'+(i+1)); // Remove once the mouse left the area and the closing styling isn't applied
            }
        }
    })
}