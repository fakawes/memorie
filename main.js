/* 
    Javascript 
    
*/

function loadwords() {
    
    var kaart_array = new Array();

    var kaarten = ['Hond', 'Hond', 'Kat', 'Kat', 'Muis', 'Muis']

    /*
    array = {} 
    
    Als lengte van Array != 0         
        Pak een random nummer tussen 0 en de lengte van de array
        Voeg de inhoud toe aan de nieuwe array 
    */
    random_array = new Array();
    
    var i = 0;
    while (kaarten.length != 0){
        // genarate a random int of length of the array
        var random = Math.floor(Math.random() * kaarten.length);        
        // push index of that array to a new array
        random_array.push(kaarten[random])
        // remove item from array
        kaarten.splice(random,1)
    }
    /* Pakk alle <p> tags en plaats hier de nieuwe gecreerde array in */
    var p_tag = document.getElementsByTagName("p")
    
    for (i in p_tag){
        p_tag[i].innerHTML = random_array[i]
    }

}

/* Stappenplan:

Als je op een kaartje klikt:

Wordt de kaart geopend

teller += 1 

Zijn er 2 kaarten aangeklikt dan begint het opnieuw

*/
var kaart_flip_count = 0;
var previous_kaart = '';

var score = 0;


function kaartclick(clicked){ 
    console.log('<-- Nextround -->')
    //Get text from div
    var kaart_value = document.getElementById(clicked)
    //Check if kaart_value == prev_kaart
    
    console.log('previous card: %s ',previous_kaart.innerText)
    console.log('current card: %s', kaart_value.innerText)
    kaart_flip_count += 1

    if (kaart_value.innerText == previous_kaart.innerText) {
        console.log('Je hebt 2 kaarten geraden');
        //remove event listener to always show the cards
        kaart_value.removeEventListener('click', eventlistener)
        previous_kaart.removeEventListener('click',eventlistener)
        
        previous_kaart.style.backgroundColor = 'blue'
        console.log(kaart_value)
        kaart_value.style.background = 'blue'

        score += 1
    
        //Check if the score == 3, than you have won
        if (score == 3){
            alert('Gefeliciteerd')
            
            score = 0;
        }
    }
    //Save card_value in previous_card_value
    else { 
        previous_kaart = kaart_value;
    }

    //Check if 2 cards are fliped, than reset score
    if (kaart_flip_count == 2){
        kaart_flip_count = 0;
        previous_kaart = '';
    }   
}

function eventlistener(e){
    card = e.currentTarget
    console.log(card.style.backgroundColor)
    if (card.style.backgroundColor == "green"){
        card.style.backgroundColor = 'red'    
    }
    else{
        card.style.backgroundColor = 'green'    
    }
    
}

var kaart_div = document.getElementsByClassName('kaart');
//Add for loop
for (i=0; i in kaart_div; i++){    
    var card = kaart_div[i]
    card.addEventListener('click', eventlistener)
}

