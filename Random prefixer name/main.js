window.onload = (function(){
    var output = document.getElementById('output');
})
function input(char){
    console.log(char);
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
        var curr_char = char.split('');
        var items = '';
        for(var i = 0; i < jsonItems.length; i++){
            for(var l = 0; l < char.length; l++){
                var str = '^['+curr_char[l]+']';
                var re = new RegExp(str, 'gi');
                if(re.test(jsonItems[i])){
                    var random = Math.floor((Math.random() * jsonItems.length) + 1);
                    items += jsonItems[i]+'|';
                    output.value += char.split('')[l] + ': '+items.split('|')[random]+'\n'; 
                }   
            }
        }
    })
    document.querySelector('input').removeAttribute('disabled', '')
}