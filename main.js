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
    return

}

function eventlistener(e){
    console.log('<-- Next Round -->')
    card = e.currentTarget
    
    console.log('previous card: %s', previous_kaart.innerText)
    console.log('previous card: %s', card.innerText)
    //kleur = cardstyle.getPropertyValue('background-color')
    
    kaart_flip_count += 1

    card.style.backgroundColor = 'blue'
    
    console.log(card.style.backgroundColor)

    
    //check if 2 cards are flipped
    if (kaart_flip_count == 2){
        //Wait 3 seconds, than verify cards
        setTimeout(function(){
            if (card.innerText == previous_kaart.innerText) {
                console.log('Je hebt 2 kaarten geraden');
                //remove event listener to always show the cards
                previous_kaart.style.backgroundColor = 'green'
                
                card.style.backgroundColor = 'green'
        
                score += 1
            
                //Check if the score == 3, than you have won
                if (score == 3){
                    alert('Gefeliciteerd')
                    score = 0;
                }
                //remove eventlistener
                card.removeEventListener('click', eventlistener)
                previous_kaart.removeEventListener('click',eventlistener)
                
            }
            //Save card_value in previous_card_value
            else { 
                // return cards
                card.style.backgroundColor = 'black';
                previous_kaart.style.backgroundColor = 'black';    
            }
            previous_kaart = '';
            kaart_flip_count = 0;
        }, 3000)
        //check if cards are qual    
    }
    else {
        previous_kaart = card;
    }
     
}

var kaart_div = document.getElementsByClassName('kaart');
//Add for loop
for (i=0; i in kaart_div; i++){    
    var card = kaart_div[i]
    card.addEventListener('click', eventlistener)
}

