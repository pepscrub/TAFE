window.onload = function(){
    hamburger_click();
}
function hamburger_click(){
    var hamburger = document.getElementById('hamburger_menu');
    var bars = document.getElementsByClassName('bar');
    hamburger.onclick = (function(){
        for(var i = 0; i < bars.length; i++){
            bars[i].classList.toggle('close_'+(i+1));
        }
    })
    hamburger.onmouseover = (function(){
        for(var i = 0; i < bars.length; i++){
            var regex = bars[i].className.split(' ').some(function(c){return /close/i.test(c)});
            if(regex == false){
                bars[i].classList.add('hover_'+(i+1));
            }else{
                bars[i].classList.remove('hover_'+(i+1));
            }
        }
    })
    hamburger.onmouseleave = (function(){
        for(var i = 0; i < bars.length; i++){
            var regex = bars[i].className.split(' ').some(function(c){return /close/i.test(c)});
            if(regex == false){
                bars[i].classList.remove('hover_'+(i+1));
            }
        }
    })
}