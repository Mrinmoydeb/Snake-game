//variable declaration

var lastPaintTime = 0;
let displayHighscore = document.getElementById('HigestScore');
let displayScore = document.getElementById("scoreBox");
let score = 0;
let inputDirection ={x: 0, y: 0};
const speed = 6;
const mainBox = document.getElementById("mainbox");
let snakeBody =[{x:15, y:13}]
    food = { x:18, y:20};


//game logic declare here
function mainFunction(currentTime){
    window.requestAnimationFrame(mainFunction)
    if((currentTime - lastPaintTime)/1000 < 1/speed) return;
    lastPaintTime=currentTime;
    gameEngine();
}




function colLaps(snkArray){
//if you collaps into your self
for(let i = 1; i<snakeBody.length; i++){
if(snkArray[i].x === snkArray[0].x && snkArray[i].y === snkArray[0].y){
    return true;
}
}
// if you collaps into the wall
if( snkArray[0].x >=30 || snkArray[0].x <=0 ||snkArray[0].y >=30 || snkArray[0].y <=0){
return true; 
}

}





function gameEngine(){
  
    if(colLaps(snakeBody)){
        // updating snake arry and food
        inputDirection ={x: 0, y: 0};
        alert("Game Over. Press any key to play again!");
        snakeBody =[{x:15, y:13}];
        score = 0;
    };
    // food eating logic
    if(snakeBody[0].y === food.y && snakeBody[0].x === food.x){
        score += 1;
        if(score>highScore){
            highScorevalue = score;
            localStorage.setItem("HigestScore",JSON.stringify(highScorevalue));
            displayHighscore.innerHTML = "Higest Score :" + highScorevalue;
        }
        displayScore.innerHTML = "Score:" + score;
        snakeBody.unshift({x: snakeBody[0].x + inputDirection.x, y: snakeBody[0].y + inputDirection.y}); // adding head 
        let a=2;
        let b=29;
        food = {x: Math.round(a + (b - a)*Math.random()),y: Math.round(a+(b - a)*Math.random())}
    }
    //moving the snake
    for ( i = snakeBody.length-2; i >= 0; i--) {
        snakeBody[i+1] ={...snakeBody[i]};
    } 
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    

    // displaying food and snake
    mainBox.innerHTML = " ";
    snakeBody.forEach((e,index)=>{
const snakeEl = document.createElement("div");
snakeEl.style.gridColumnStart = e.x;
snakeEl.style.gridRowStart = e.y;
if(index === 0){
    snakeEl.classList.add("snakehead");
    
}else{
    snakeEl.classList.add("snakebody");
}
mainBox.appendChild( snakeEl);
    });
    const foodEl = document.createElement("div");
foodEl.style.gridColumnStart = food.x;
foodEl.style.gridRowStart = food.y;
foodEl.classList.add("food");
mainBox.appendChild(foodEl);

}



//main logic declate here
let highScore = localStorage.getItem("HigestScore");
if(highScore === null){
    highScorevalue = 0;
    localStorage.setItem("HigestScore",JSON.stringify(highScorevalue))
}else{
    highScorevalue = JSON.parse(highScore)
displayHighscore.innerHTML = "Higest Score :" + highScore;
} 

window.requestAnimationFrame(mainFunction)
window.addEventListener('keydown', e=>{
inputDirection ={x: 0, y: 1}; //start then game
switch (e.key) {
    case "ArrowUp":
        inputDirection.x =0;
        inputDirection.y =-1;
        break;
    case "ArrowDown":
        inputDirection.x =0;
        inputDirection.y =1;
        break;
    case "ArrowLeft":
        inputDirection.x =-1;
        inputDirection.y =0;
        break;
    case "ArrowRight":
        inputDirection.x =1;
        inputDirection.y =0;
        break;
    default:
        break;
}
});


function reStart(){
    window.location= location.href
}