var gameColor=["green","red","yellow","blue"];
var gameSequence=[];
var userClickPattern=[];
var levelNumber=0;
var initial=true;

$ (".box").click(clickDetector);

//initiating the game--
$(document).keypress(function(){
    if(initial){
        gamePattern();
        initial=false;
    }
})


//functions---

function gamePattern() {
    levelNumber++;
    $ (".title").text("level "+ levelNumber);

    var colorIndex= Math.floor(Math.random()*4);
    var chosenColor= gameColor[colorIndex];
    gameSequence.push(chosenColor);

    //effects--
    $ ("#"+ chosenColor).fadeOut(150).fadeIn(150);
    sound(chosenColor);
}

function sound(name){
    var gameAudio= new Audio("./sounds/"+ name + ".mp3");
    gameAudio.play();
}

function animate(color){
    $("#"+ color).addClass("pressed");
    setTimeout(function(){ $("#"+ color).removeClass("pressed") } , 100 );
}


function clickDetector(){
    //functioning
    var chosenColor= $(this).attr("id");
    userClickPattern.push(chosenColor);

    //effects
    sound(chosenColor);
    animate(chosenColor);

    checkAnswer(chosenColor);
}

function checkAnswer(color){
    if(color===gameSequence[userClickPattern.length-1]){
        if(gameSequence.length===userClickPattern.length){
            userClickPattern=[];
            setTimeout(gamePattern,1000);
        }
    } else{
        $(".title").text("Game over. Press any key to restart");
        var overAudio= new Audio("./sounds/wrong.mp3");
        overAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){ $("body").removeClass("game-over"); 200});
        levelNumber=0;
        gameSequence=[];
        userClickPattern=[];
        initial=true;
    }
}