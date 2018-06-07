// Main styling, injecting into the header
if(/queue.tafe.rocks\/index.php/.test(window.location.href)){
    document.querySelector('head').innerHTML += '<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous"><style>body{background-color:rgb(28,28,33);color:#fff;font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;background:linear-gradient(221deg,#0d204e,#6f0b70,#6f0b70);background-size:600% 600%;animation:AnimationName 30s ease infinite}@keyframes AnimationName{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}fieldset{border:none}input[type=text]{background-color:rgba(28,28,33,0);border:none;border-bottom:solid 1px #fff;color:white;outline:none transition:border-bottom .25s ease-in-out}input[type=text]:hover{border-bottom:solid 1px #7bbbca;transition:border-bottom .25s ease-in-out}input[type=text]:focus{outline:none;border-bottom:solid 1px #28bcde;transition:border-bottom .25s ease-in-out}input[type="button"]{border:none;background-color:#00000052;color:#fff;padding:.25em 1em;border-radius:15px; outline: none; transition: background-color .25s ease; cursor: pointer;}input[type="button"]:hover{cursor: pointer;background-color: #000000ad; transition: background-color .5s ease}input[type="button"]:active{background-color: #7b7b7bad; transition: background-color .25s ease}input[type="submit"]{cursor: pointer;border:none;background-color:#33333382;color:white;font-size:1.25em;padding:1% 5%;float:right;border-radius:29px; transition: background-color .5s ease-in-out; outline: none;}input[type="submit"]:hover{background-color: #333333db; transition: background-color .25s ease-in-out}input[type="submit"]:active{background-color: #676767a8; transition: background-color .125s ease}legend{text-align:center;font-size:5em;text-transform:uppercase;text-shadow:0 1px 0 rgb(204,204,204),0 2px 0 rgb(201,201,201),0 3px 0 rgb(187,187,187),0 4px 0 rgb(185,185,185),0 5px 0 rgb(170,170,170),0 6px 1px rgba(0,0,0,.0980392),0 0 5px rgba(0,0,0,.0980392),0 1px 3px rgba(0,0,0,.298039),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.247059),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.14902)}fieldset{text-align:center}label{padding:0 2em}#queuelist{padding:5% 15%}.queuerow{display:grid;grid-template-columns:10% 35% 35% 15% 5%; text-shadow: text-shadow: 0px 3px 5px rgba(0, 0, 0, 0.5);}span>a{color:#4bbbff;font-weight:700;text-decoration:none;transition:color .75s ease}span>a:hover{color:#9ad9ff;font-weight:700;text-decoration:none;transition:color .25s ease}</style>';
    // Renaming buttons
    document.querySelector('input[type=button]').value = 'Post issue';
    // Select the node that will be observed for mutations
    var targetNode = document.getElementById('queuelist');
    var targetNode2 = document.getElementById('description');
    // Options for the observer (which mutations to observe)
    var config = { childList: true };
    // Callback function to execute when mutations are observed
    // Using mutations due to javascript updating childnodes in the id
    // Also using mutations over DOMSubtreeModified since it's deprecciated and causes browser crashes
    // https://developer.mozilla.org/en-US/docs/Web/Events/DOMSubtreeModified
    var callback = function(mutationsList) {
        for(var mutation of mutationsList) {
            // Executing mutation based on items been added or removed
            if (mutation.type == 'childList') {
                list()
            }
        }
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
    function list(){
        for(var i = 0; i < document.getElementsByClassName('queuerow').length; i++){ //Row items
            for(var l = 0; l < document.getElementsByClassName('queuerow')[i].childNodes.length; l++){ // Span items
                var item = document.getElementsByClassName('queuerow')[i].childNodes[l];
                if(l ==0){ // User ID
                    item.innerHTML = '<strong>'+item.innerHTML+'</strong>'; // Styling the ID to be bold
                }
                if(l == 1){ // Problem
                    if(item.innerHTML != ''){
                        if(/problem/i.test(item.innerHTML) != true){
                            item.innerHTML = '<strong>Problem: </strong>' + item.innerHTML; // Adding a tag to easily identify, ditto for description
                        }
                    }
                }
                if(l == 2){ // Description
                    if(item.innerHTML != ''){
                        // Url finder, attempts to find any urls in the description string and returns them as a acnchor tag with the domain man attached
                        var regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g; // Search for url (/g is a global search call and returns arrays of the result)
                        var loop_count = item.innerHTML.match(regexp).length;  // Grab the length of the regex
                        var href = /href="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"/g; // Search for url that are contained in a href=""
                        for(var o = 0; o < loop_count; o++){
                            if(href.test(item.innerHTML) != true){
                                var url = item.innerHTML.match(regexp)[o];
                                var domain = url.split(".");
                                var replace = item.innerHTML.replace(regexp, '<a href="'+url+'">'+domain[1]+'</a>');
                                item.innerHTML = replace;
                            }
                            console.log(o);
                        }
                        if(/description/i.test(item.innerHTML) != true){
                            item.innerHTML = '<strong>Description: </strong>' + item.innerHTML;
                        }
                    }
                }
                if(l == 3){ // Making the date human readable through json object and maths
                    if(item.innerHTML.split("-").length > 2){
                        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        var date = new Date(item.innerHTML);
                        var day = date.getDate();
                        var month = date.getMonth();
                        var year = date.getFullYear();
                        var hour = date.getHours();
                        var minute = date.getMinutes();
                        if (hour > 13) {
                            var hour = hour - 12;
                            var am_pm = 'pm';
                        } else {
                            var am_pm = 'am';
                        }
                        if (hour == 0) {
                            var hour = 12
                        }
                        if (hour < 10) { //Just adds a 0 (as a string) before the hour to keep it formatted well
                            var hour = '0' + hour;
                        }
                        if (minute < 10) {
                            var minute = '0' + minute;
                        }
                        var formattedDate = monthNames[month] + ' ' + day + ', ' + year + ' At ' + hour + ':' + minute + ' ' + am_pm;
                        item.innerHTML = formattedDate;
                    }
                }
                if(l == 4){ // Replace the a 'onclick' with custom functions onclick (just adds a comma and this tag)
                    var dequeue_item = item.childNodes[0].onclick
                    var str = String(dequeue_item).replace(/[^0-9.]/g, '') // Converts to string
                    dequeue_item = 'deQueue(' + str.replace(/[^0-9.]/g, '') +',this);'; //str replace only grabs numbers and replaces everything else with nothing
                    item.innerHTML = '<a href="#" onclick="'+dequeue_item+'"><i class="fas fa-times"></i></a><a href="#" onclick="hide(this)" style="float: right"><i class="far fa-eye-slash"></i></a>'; // Replacing the inside of the node with the custom onclick
                }
            }
        }
    }
    function hide(item){
        item.parentNode.parentNode.style = 'display: none';
    }
    function deQueue(num, item){
        item.parentNode.parentNode.style = 'display: none;'; // Making the site more PWA standard
        var queueURL = "ws/ws.php?getData=dequeue&queueid=" + num;
        $.ajax({
            url: queueURL,
            method: 'get',
            datatype: 'json',
            success: function(res) {
                if(res.deQueued == 1) {
                    getNoInQueue();
                } else {
                    alert('you can\'t do that');
                    item.parentNode.parentNode.style = ''; // Make the item re-appear if failed
                }
            },
            error: function(err) {
                item.parentNode.parentNode.style = ''; // Make the item re-appear if failed
                getQueue()
                console.log('err');
                console.log(err); 
            }
        });
    }
    document.getElementById('description').setAttribute("onkeyup", "max_limit(2048, this)");
    document.getElementById('problem').setAttribute("onkeyup", "max_limit(256, this)");
    function max_limit(max, item){
        if(item.value.length > max){
            item.style = 'border-bottom: solid 1px #cc3e1e;';
        }else{
            item.style = 'border-bottom: solid 1px #fff';
        }
    }
    list() // Calling list since otherwise it would only update on dom changes
    // Custom message when the code is excuted
    console.clear();
    console.log('%c¯\\_(ツ)_\/¯ Yeet', 'font-size:6em;background-color: #232729; padding: .5em 1em; color: white; text-align: center;text-shadow:0 1px 0#ccc,0 2px 0  #c9c9c9 ,0 3px 0  #bbb ,0 4px 0  #b9b9b9 ,0 5px 0  #aaa ,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);')
}else{
    console.clear();
    console.log('%c', 'padding: 20em 22em; background-image: url("https://i.imgflip.com/12ic6x.jpg")');
}
