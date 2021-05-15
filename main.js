/* 
    Javascript   
*/
/* randomize the array of pictures and add them to the card */
function loadwords() {
    
    var kaart_array = new Array();
    /* To-Do: leest de bestanden uit de map uit en maak een automatische lijst van */
    var kaarten = ['dog.jpg', 'dog.jpg', 'kat.jpg', 'kat.jpg', 'muis.jpg', 'muis.jpg']

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
    
    let kaartClass = document.getElementsByClassName('kaart')

    for (i=0; i in kaartClass; i++){
        cardField = kaartClass[i]
    
        imgNode = document.createElement('IMG')
        
        imgNode.src = 'img/' + random_array[i]
        
        cardField.appendChild(imgNode)
        
    }
}
function sleep(miliseconds){
    const start = Date.now();
    while (Date.now - start < miliseconds);
}

const startButton = document.getElementById('start-btn')
const cardContainer= document.getElementById('card-container')
const stopButton = document.getElementById('stop-btn')

startButton.addEventListener('click', startGame)
stopButton.addEventListener('click', stopGame)

/* when the startbutton is reset the score, and randomize the cards */
function startGame(){
    loadwords()
    console.log('Startgame',previous_kaart)
    
    document.body.style.backgroundColor = '#50A6C2'
    kaart_flip_count = 0;
    previous_kaart = '';

    score = 0;

    var kaart_div = document.getElementsByClassName('kaart');
    //Add for loop
    for (i=0; i in kaart_div; i++){    
        var card = kaart_div[i]
        
        card.addEventListener('click', eventlistener)
        
    }

    startButton.classList.add('hide')
    cardContainer.classList.remove('hide')
    stopButton.classList.remove('hide')
}
/* remove the pictures of the cards and hide the cards */
function stopGame(){
    
    let kaartDivs = document.getElementsByClassName('kaart')

    for(i=0; i in kaartDivs; i++){
        
        parent = kaartDivs[i]
        console.log(i)
        console.log(parent)

        parent.classList.remove('click','guess_correct')
        
        console.log(parent.classList)

        while(parent.firstChild){
            parent.removeChild(parent.firstChild)
        }    
    }
    startButton.classList.remove('hide')
    cardContainer.classList.add('hide')
    stopButton.classList.add('hide')
}

var kaart_flip_count = 0;
var previous_kaart = '';

var score = 0;

const kaart1 = document.getElementById('kaart1')

kaart1.addEventListener('transitionend', () => {
    
})

function eventlistener(e){
    console.log('<-- Start -->')
    card = e.currentTarget
    
    cardImg = card.childNodes[card.childNodes.length -1]
    console.log('Child Nodes = %s', cardImg)

    if (previous_kaart != card){

        //cardImg.style.visibility = 'visible'

        console.log('Card: %s',card)
        console.log('Prev card: %s', previous_kaart)

        kaart_flip_count += 1

        card.classList.add('click')
        
        
        var cardTransition = card.getTransition

        console.log(cardTransition)
        
        var cardAnimation = cardImg.getAnimations()[0]
        
        cardClick = new Promise(function(resolve, reject) {
                return  resolve(cardAnimation.finished)
            });

        cardClick.then(
            function(result){
                //check if 2 cards are flipped
                console.log('kaart flip count: %s', kaart_flip_count)
                
                console.log('opacity: %s', window.getComputedStyle(cardImg).getPropertyValue('opacity'))
                if (kaart_flip_count == 2 ){
                    
                    prevCardImg = previous_kaart.childNodes[previous_kaart.childNodes.length -1]
                    
                    
                    //check if cards are equal
                    if (cardImg.src == prevCardImg.src) {
                        //guess correct
                        //add new classes to activate animation
                                    
                        score += 1

                        card.classList.add('guess_correct')
                        previous_kaart.classList.add('guess_correct')


                        if (score == 3){
                            alert('gefeliciteerd je hebt gewonnen')
                            document.body.style.backgroundColor = 'green'
                        }

                        card.removeEventListener('click', eventlistener)
                        previous_kaart.removeEventListener('click',eventlistener)

                        previous_kaart = '';
                        kaart_flip_count = 0;
                        console.log('<-- End of success -->')
                    }
                    else{
                        //Guess incorrect
                        //add new classes to activate animation
                        card.classList.add('guess_incorrect')
                        previous_kaart.classList.add('guess_incorrect')
                        
                        
                        console.log('card: %s',card.innerText)
                        console.log('prev card: %s', previous_kaart.innerText)
        
                        let cardAnimation = cardImg.getAnimations()[0]
                        
                        console.log(cardAnimation)

                        //Wait for animation to finish, then return to normal state
                        returnDefaultStyle = new Promise(function(resolve, reject){
                            return resolve(cardAnimation.finished)
                        })
                        returnDefaultStyle.then(
                            function(){
                                
                                prevCardText = previous_kaart.childNodes[1]
                                //Make cards not invisible
                                
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
    }
    else {
        alert('you cannot click the card you already')
    }
}

// var kaart_div = document.getElementsByClassName('kaart');
// //Add for loop
// for (i=0; i in kaart_div; i++){    
//     var card = kaart_div[i]
//     card.addEventListener('click', eventlistener)
// }
