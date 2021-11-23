var gamePattern=[];
var userClickedPattern=[];
var buttoncolours =["red","blue","green","yellow"];

var countKeypress=0;
var level=0;
$(document).keypress(function(){
    countKeypress++;
    if(countKeypress===1){
        $("h1").text("level " + level);
         nextSequence();


}});

function startOver(){
    level=0;
    gamePattern=[];
    countKeypress=0;
}




function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("level "+ level);
    var randomNumber= Math.floor(Math.random()*3)+1;

    var randomChosenColour= buttoncolours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);

    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}


$(".btn").click(function ()
{
    var userChosenColor=$(this).attr("id");


userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length -1);
// console.log(userClickedPattern);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    }
}
    else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);
         $("h1").text("Game Over, Press any key to Restart");
        startOver();

        console.log("wrong");
    }

}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
    }
