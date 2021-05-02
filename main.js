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



var kaart_flip_count = 0;
var previous_kaart = '';

var score = 0;

/* 
function kaartclick(clicked){ 
    return

} */

function sleep(miliseconds){
    const date = Date.now();

    let currentDate = null;

    do {
        currentDate = Date.now();

    }while (currentDate- date < miliseconds)
}


/* 
To-do

Doe de animatie waneer je op een div klikt

Ga doormiddel van een promis door naar de volgende code
*/



function eventlistener(e){
    console.log('<-- Start -->')
    card = e.currentTarget
    
    cardText = card.childNodes[1]

    

    cardText.style.visibility = 'visible'

    console.log('card: %s',card.innerText)
    console.log('prev card: %s', previous_kaart.innerText)

    //kleur = cardstyle.getPropertyValue('background-color')
    
    kaart_flip_count += 1

    card.classList.add('click')
    
    
    prevList = previous_kaart.classList
    
    var cardAnimation = card.getAnimations()[0]
     
    cardClick = new Promise(function(resolve, reject) {
            return  resolve(cardAnimation.finished)
        });

    cardClick.then(
        function(result){
            //check if 2 cards are flipped
            console.log('kaart flip count: %s', kaart_flip_count)
            if (kaart_flip_count == 2 ){
            
                //check if cards are equal
                if (card.innerText == previous_kaart.innerText) {
                    //guess correct
                    //add new classes to activate animation
                    card.classList.add('guess_correct');
                    previous_kaart.classList.add('guess_correct');

                    let correctCard = card.getAnimations()[0]
                    
                    correctPromis = new Promise(function(resolve, reject){
                        return resolve(correctCard.finished)
                    })
                    
                    correctPromis.then(
                        function(result){
                                
                        score += 1
                        if (score == 3){
                            alert('gefeliciteerd je hebt gewonnen')
                        }

                        card.removeEventListener('click', eventlistener)
                        previous_kaart.removeEventListener('click',eventlistener)

                        previous_kaart = '';
                        kaart_flip_count = 0;
                        console.log('<-- End of success -->')        
                        }
                    )
                }
                else{
                    //Guess incorrect
                    //add new classes to activate animation
                    card.classList.add('guess_incorrect')
                    previous_kaart.classList.add('guess_incorrect')
                    
                    
                    console.log('card: %s',card.innerText)
                    console.log('prev card: %s', previous_kaart.innerText)
    
                    let cardAnimation = card.getAnimations()[0]
                    
                    //Wait for animation to finish, then return to normal state
                    returnDefaultStyle = new Promise(function(resolve, reject){
                        return resolve(cardAnimation.finished)
                    })
                    returnDefaultStyle.then(
                        function(){
                            
                            prevCardText = previous_kaart.childNodes[1]
                            //Make cards not invisible
                            prevCardText.style.visibility = 'hidden'
                            cardText.style.visibility = 'hidden'
                            
                            card.classList.remove('guess_incorrect','click')
                            previous_kaart.classList.remove('guess_incorrect','click')
                            
                            previous_kaart = '';
                            kaart_flip_count = 0;
                            console.log('<-- End of incorrect animation -->')

                        }
                    )                    
                }
                
                
            }
            else{
                previous_kaart = card;
                console.log('<-- End of 1 card clicked -->')
            }    
            console.log('<-- Final End -->')
        }
    )
    
    
    //check if 2 cards are flipped
    /* if (kaart_flip_count == 2){
        
        if (card.innerText == previous_kaart.innerText) {
            console.log('Je hebt 2 kaarten geraden');
            //remove event listener to always show the cards
            //Cards are correct
            previous_kaart.classList.add('guess_correct');
            card.classList.add('guess_correct');
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
            
            // card.style.backgroundColor = 'black'
            // previous_kaart.style.backgroundColor = 'black';    
            card.classList.add('guess_incorrect')
            previous_kaart.classList.add('guess_incorrect')
            
            console.log('hierzo')

        }
        previous_kaart = '';
        kaart_flip_count = 0;
    }
    else {
        previous_kaart = card;
    } */
     
}

var kaart_div = document.getElementsByClassName('kaart');
//Add for loop
for (i=0; i in kaart_div; i++){    
    var card = kaart_div[i]
    card.addEventListener('click', eventlistener)
}

