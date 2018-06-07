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
        for(var i = 0; i < jsonItems.length; i++){
            var words = jsonItems[i].charAt(0);
            if(words == String(char)){
                item += jsonItems[i] + '|';
                count++;
                console.log(item);
            }
        }
        var random = Math.floor((Math.random() * count) + 1);
        var prefix = item.split("|")[random];
        for(var i = 0; i < char.length; i++){
            output.value += char.charAt(i) + ': '+prefix+'\n'; 
        }
    })
    document.querySelector('input').removeAttribute('disabled', '')
}