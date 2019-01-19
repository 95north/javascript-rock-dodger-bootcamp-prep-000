/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null
var dodger = document.getElementById('DODGER');
var rock = null;




function checkCollision(rock) {               // rock - passed in from createRock. 
                                              // should I call checkCollision (ROCKS[last])


  // implement me!    use the comments below to guide you!
  const top = positionToInteger( (rock.style.top.replace('px', '')) );   // positionToInteger - defined @ end
  var dodgerLeftNumber = (positionToInteger(DODGER.style.left.replace('px', '')) + 39);
  var rockLeftNumber = (positionToInteger(rock.style.left.replace('px', '')) + 19);      
                                             // .log says rock is undefined here.... !!!!
  console.log("left position to Int is: " +  ((positionToInteger(DODGER.style.left) ) + 39) );
  // ^ returns an Integer, okay!! 

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
                             //when bottom/rock is pixel just above dodger bottom
    const dodgerLeftEdge = ( positionToInteger(DODGER.style.left.replace('px', '')) );

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = (positionToInteger(DODGER.style.left.replace('px', '')) + 39);

    const rockLeftEdge = ( positionToInteger(rock.style.left.replace('px', '')) );

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    // WAS: const rockRightEdge = `${( (positionToInteger(ROCK.style.left.replace('px', '')) ))+= 19}px`;
    const rockRightEdge = (positionToInteger(rock.style.left.replace('px', '')) + 19);  

    if ( (top <= 360 ) ||
        (
          ( (rockLeftEdge < dodgerLeftEdge)  &&  (rockRightEdge < dodgerLeftEdge) ) || 
          //( (rockLeftEdge > dodgerLeftEdge)  &&  (rockRightEdge > dodgerRightEdge) ) ||
          ( (rockLeftEdge > dodgerRightEdge)  &&  (rockRightEdge > dodgerRightEdge) ) 
        ) ) { return false;  

              // is returning undefined bc comparing #s w 'px' at the end... 

               /*false /**. IF  Rock edges do not overlap w dodger edges. 
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge
               */

      } else {
      console.log("CHECK COLLISION IS RETURNING TRUE!")
      return true;
    }
             // ends if top > 360  --moved this elsewhere... 
}             // ends function checkCollision





 function createRock(gameInterval) {                   // x is passed in from start, gameInterval
  const rock = document.createElement('div');         // returns rock

  rock.className = 'rock';
  rock.style.left = `${gameInterval}px`;              // was x, changed to gameInterval. @11.17

      // Hmmm, why would we have used `var` here?
  var top = 0;

  if ( checkCollision === true){                       // added 12.16  4 PM
    return;
  }


  rock.style.top = top;
  //console.log(createRock);
  console.log(gameInterval);                          // it works. 
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.  -- where are we doing this? w/in moveRock?
   * const GAME = document.getElementById('game')
   */ 

  GAME.append(rock);                                 // worked and rocks display w this

  console.log("Check Collision is:" + checkCollision(rock) ); // it's undefined!
   // prints to log alternating with gameInterval.
  console.log("rock.style.top is : " + rock.style.top);

  function moveRock(rock) {                         // is within createRock
    // implement me!        move rock 2 pixels at a time
    /**
     * If a rock collides with the DODGER,          // call checkCollision above
     * we should call endGame()

     * Otherwise, if the rock hasn't reached the bottom of
     * the GAME, we want to move it again.

     * But if the rock *has* reached the bottom of the GAME,
     * we should remove the rock from the DOM
     */

    //var top = 0;   // two variables w same name... probably a problem. 

  function step(){                                // this might be held up bc checkC undefined!!!
        rock.style.top = `${top += 2}px`
        if (checkCollision(rock) === true) {           // ***NOT SURE***. does this run check Collision?
          console.log("checkCollision is *TRUE* within moveRock: step function");
          endGame();                                  // added parameter (rock) to checkC @ 11.22
                                                      // was >= 358. "rock is undefined here"... 
     //else if ( (rock.style.top.replace('px', ''))  >= 0 ){          // rock's top <=0; WAIT IS THIS DISTANCE FM TOP
     //  rock.style.top= `${top +2}px`;               // or  top -= 2; ...?   have to acct for px !!!
        } else if( top <= 400 ){
          console.log ("New # for rock top is : " + top);
          //top += 2; 
          //rock.style.top = `${top}px`
          window.requestAnimationFrame(step)          //11.24 changed from moveRock to step
          // was :  window.requestAnimationFrame(moveRock)
        } else { 
          ROCKS.shift();                              // shift returns the string that was "shifted out":   THIS WORKS
        }
      }                                               // ends step 

  
    window.requestAnimationFrame(step);   
  }  // ends moveRock

 

  moveRock(rock);                                   // "rock is undefined here"...  

  // We should kick of the animation of the rock around here

  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock);
  console.log("ROCKS is : " + ROCKS);               // prints 1x for ea: [object HTMLDivElement],[ob..
  //console.log("const rock  is : " + rock);        //  is: [object HTMLDivElement]
  return rock;
}



/**
 * End the game by clearing `gameInterval`,  // gameInterval is a global var, defined @ top
 * removing all ROCKS from the DOM,  *** REMOVE ALL ROCKS FROM DOM, NOT CLEAR THE ARRAY !!!
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  console.log("YOU LOSE!!!!!!!  AND IT SHOULD ALERT AS WELL");
  //gameInterval = null;            // *** NOT SURE, testing  
  //ROCKS = [];                     // reset to empty array??   !!!! CANT OVERWRITE CONST
                                  // instead tell the CSS not to express class .rocks
  //ROCKS.stopPropagation;          // was rocks, not rock or ROCKS... 
    // rock.style.display = "none"  // trying something else...
    //document.getElementsByClassName("rock").style.display = "none"; // added in 12.16, tested 12.28. was #rock
    //document.getElementById("start").style.display = "none";
    // document.getElementsByClassName(“rock”).remove;  // works too well, game doesnt start now.. 
    // document.getElementsByClassName(rock).parentNode.removeChild(.rock);
    //$(".rock").stop(stopAll);  // trying 1.4.  NOPE. 
    
    window.clearInterval(gameInterval);   // gameInterval = the interval ID?? 
    
    
    for (var j = ROCKS.length; j > 0; j--){
    console.log("I am in endGame: ROCKS.shift loop. ROCKS.length is : " + ROCKS.length);
    ROCKS.shift();
  }
  
  
  window.removeEventListener('keydown', moveDodger);  // no trabaja   was window.
  //document.removeEventListener(keydown); // no trabaja
  //moveDodger.preventDefault();    // Syntax: event.preventDefault()
  
  console.log("Is ROCKS array empty? : " + ROCKS );
  
  alert("YOU LOSE!");
}




function moveDodger(e) {        // e = the event Listened. WHERE IS E CREATED // PASSED FM?
  if (e.which === 37){
    moveDodgerLeft();
  }
  if (e.which === 39){
    moveDodgerRight();
  }


  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}



function moveDodgerLeft() {
  function step () { 
    //DODGER.style.left = `${ DODGER.style.left -= 4 }px`;        // *** NOT SURE, testing
    var leftNumbers = DODGER.style.left.replace('px', '')
    var left = parseInt(leftNumbers, 10)
    if (left > 0){
      DODGER.style.left = `${left - 2}px`
    }
  }
  
  window.requestAnimationFrame(step);
  //|
  // implement me!
  /**
   * This function should move DODGER to the left
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}


function moveDodgerRight() {
  function stepRight () { 
    //DODGER.style.left = `${ DODGER.style.left += 4 }px`;           // *** NOT SURE, testing
    //var rightNumbers = DODGER.style.right.replace('px', '')
    //var right = parseInt(rightNumbers, 10)
    var leftNumbersR = DODGER.style.left.replace('px', '')
    var right = (parseInt(leftNumbersR, 10) ); 
    console.log(right);
    right += 0;           // was += 39; to correlate to where R edge would be

    if (right < 360){
      DODGER.style.left = `${right + 2}px`
    }

  }
  
  window.requestAnimationFrame(stepRight);

  // implement me!  //. ***Need to make sure dodger cant go out of bounds?????? 
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */  
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger); 

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000);
}

// window.addEventListener('keydown', start);      // bad bc 
start();
// createRock();
// checkCollision(ROCKS[ROCKS.length -1]);

