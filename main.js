/* 
    Javascript   
*/
/* randomize the array of pictures and add them to the card */
function loadwords() {
    
    var kaart_array = new Array();
    /* To-Do: leest de bestanden uit de map uit en maak een automatische lijst van */
    var kaarten = ['dog.jpg', 'dog.jpg', 'kat.jpg', 'kat.jpg', 'muis.jpg', 'muis.jpg' ,'olifant.jpg', 'olifant.jpg', 'giraffe.jpg', 'giraffe.jpg', 'meerkoet.jpg', 'meerkoet.jpg' ]

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
        
        //console.log('<-- Eerste Nodes -->')
        cardField = kaartClass[i]

        cardChildNodes = cardField.childNodes

        for(x=0; x in cardChildNodes; x++) {
            
            node = cardChildNodes[x]

            if(node.tagName == 'IMG'){
                node.src = 'img/' + random_array[i]
            }
            
        }
        
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
    console.log('Startgame')
    
    document.body.style.backgroundColor = '#50A6C2'
    kaart_flip_count = 0;
    previous_kaart = '';

    score = 0;

    let height = 0    

    var kaart_div = document.getElementsByClassName('kaart');
    //Add for loop
    for (i=0; i in kaart_div; i++){    
        var card = kaart_div[i]
        
        card.addEventListener('click', eventlistener)
    }
    
    card_rows = document.getElementsByClassName('card_row')

    for(i=0; i in card_rows; i ++){

        height += card_rows[i].offsetHeight
    }
    
    heightPX = height + 'px'


    startButton.classList.add('hide')
    stopButton.classList.remove('hide')
    cardContainer.style.height = heightPX
}
/* remove the pictures of the cards and hide the cards */
function stopGame(){
    
    let kaartDivs = document.getElementsByClassName('kaart')

    for(i=0; i in kaartDivs; i++){
        
        parent = kaartDivs[i]

        parent.classList.remove('click','guess_correct')
        
        while(parent.firstChild){
            parent.removeChild(parent.firstChild)
        }
        
        imgNode = document.createElement('IMG')
        imgNode.src = 'img/game_icon.jpg'
        
        parent.appendChild(imgNode)
    }
    startButton.classList.remove('hide')
    cardContainer.style.height = '0px'
    stopButton.classList.add('hide')
}

const popUpBtn = document.getElementById('pop-up-btn')
const popUpBox = document.getElementById('pop-up-container')

popUpBtn.addEventListener('click', closePopUp)

function closePopUp(){
    popUpBox.style.display = 'none'
    
}

var kaart_flip_count = 0;
var previous_kaart = '';

var score = 0;

function eventlistener(e){
    console.log('<-- Flip -->')
    card = e.currentTarget
    
    //cardImg = card.childNodes[card.childNodes.length -2]

    cardChildNodes = card.childNodes

    //Get image of Div
    for (i=0; i in cardChildNodes; i++){
        node = cardChildNodes[i]
        console.log(node)
        
        if (node.tagName == 'IMG'){
            cardImg = node
        }
    }
    
    if (previous_kaart != card){

    
        console.log('Card: %s',card)
        console.log('Prev card: %s', previous_kaart)

        kaart_flip_count += 1

        card.classList.add('click')
        
        var cardTransition = card.getTransition
        
        var cardAnimation = cardImg.getAnimations()[0]
        
        cardClick = new Promise(function(resolve, reject) {
                return  resolve(cardAnimation.finished)
            });

        cardClick.then(
            function(result){
                //check if 2 cards are flipped
                console.log('kaart flip count: %s', kaart_flip_count)
                
                
                if (kaart_flip_count == 2 ){
                    previous_kaartChildNodes = previous_kaart.childNodes
                    

                    for (i=0; i in previous_kaartChildNodes; i++){
                        node = previous_kaartChildNodes[i]
                        
                        if (node.tagName == 'IMG'){
                            prevCardImg = node
                        }
                    }
                     
                    //check if cards are equal
                    if (cardImg.src == prevCardImg.src) {
                        //guess correct
                        //add new classes to activate animation
                                    
                        score += 1

                        card.classList.add('guess_correct')
                        previous_kaart.classList.add('guess_correct')


                        if (score == 6){
                            
                            

                            popUpBox.style.display = 'block'

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
