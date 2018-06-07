window.onload = (function(){
    var output = document.getElementById('output');
})
function input(char){
    document.getElementById('output').value = '';
    // Fetching the json file (basically ajax)

    var jsonRequest = new Request('dictionary.json');
    document.querySelector('input').setAttribute('disabled', '')
    fetch(jsonRequest)
    .then(function(response){
        return response.json();
    })
    .then(function(Myjson){
        var jsonItems = JSON.stringify(Object.keys(Myjson)).replace(/[\["\]]/g, '');
        var curr_char = char.split('');
        var random = Math.floor((Math.random() * 2) + 1);
        console.log(jsonItems.split(',')[random])
        // var prefix = item.split("|")[random];
        for(var i = 0; i < char.length; i++){
            output.value += char.split('')[i] + ': '+curr_char+'\n'; 
        }
    })
    document.querySelector('input').removeAttribute('disabled', '')
}