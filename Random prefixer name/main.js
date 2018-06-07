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
        var jsonItems = Object.keys(Myjson);
        var count = 0;
        var item = '|';
        for(var o = 0; o < char.length; o++){
            var curr_char = char.split('')[o];
            console.log(curr_char)
            for(var l = 0; l < jsonItems.length; l++){
                var words = jsonItems[l].charAt(0);
                console.log(words)
                if(words == curr_char){
                    item += jsonItems[l] + '|';
                    count++;
                }
            }
            var random = Math.floor((Math.random() * count) + 1);
            var prefix = item.split("|")[random];
            for(var i = 0; i < char.length; i++){
                output.value += char.charAt(i) + ': '+prefix+'\n'; 
            }
        }
    })
    document.querySelector('input').removeAttribute('disabled', '')
}