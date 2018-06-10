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
        var jsonItems = Myjson;
        var curr_char = char.split('');
        var items = '';
        var letter_loop = 0;
        for(var i = 0; i < jsonItems.length; i++){
            for(var l = 0; l < char.length; l++){
                var str = '^['+curr_char[l]+']';
                var re = new RegExp(str, 'gi');
                if(re.test(jsonItems[i])){
                    var random = Math.floor((Math.random() * jsonItems.length) + 1);
                    console.log(jsonItems[random]);
                    if(letter_loop == char.length){
                        return; // Exit the loop if the length of the character are the same as the values iterated 
                    }else{
                        letter_loop++; // Incrimenting the letter loop value 
                    }
                }   
            }
        }
    })
    document.querySelector('input').removeAttribute('disabled', '')
}