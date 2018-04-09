const canvas=document.querySelector("canvas");
const ctx=canvas.getContext('2d');
const score=document.querySelector(".box");
//config
canvas.width=1000;
canvas.height=500;
const cw=canvas.width;
const ch=canvas.height;
//
const ballSize=20;
let ballX=cw/2-ballSize/2;
let ballY=ch/2-ballSize/2;
//
let paddleHeight=100;
const paddleWidth=20;

const paddlePushAway=70;
const playerX=paddlePushAway;
const aiX=cw-paddlePushAway-paddleWidth;
let playerY=200;
let aiY=200;

const lineWidth=6;
const lineHeight=16;
//starter
let ballSpeedX=7;
let ballSpeedY=4;
let speedLimit=16;
let speedIncrease=1;
let difficulty=0.8; //0 to 1 only
let offSetTopCanv=canvas.offsetTop;

let x=ballSpeedX;
let y=ballSpeedY;

let aiScore=0;
let playerScore=0;



const drawTable = () =>{
    ctx.fillStyle = '#111111';
    ctx.fillRect(0,0,cw,ch);
    ctx.fillStyle="#333333";
    for(let linePosition=20; linePosition<ch; linePosition+=30){
        ctx.fillRect(cw/2-lineWidth/2,linePosition,lineWidth,lineHeight);
    }
};

const drawPlayer=()=>{
    ctx.fillStyle="#42dcf4";
    ctx.fillRect(playerX,playerY,paddleWidth,paddleHeight);
};

const drawAI=()=>{
    ctx.fillStyle="#42dcf4";
    ctx.fillRect(aiX,aiY,paddleWidth,paddleHeight);
}


const speedUp=()=>{
    //dla x  << o >>
    if(ballSpeedX > 0 && ballSpeedX<speedLimit){
        ballSpeedX+=speedIncrease;
    }
    if(ballSpeedX < 0 && ballSpeedX>-speedLimit){
        ballSpeedX-=speedIncrease;
    }
    //dla y
    if(ballSpeedY > 0 && ballSpeedY<speedLimit ){
        ballSpeedY+=speedIncrease;
    }
    if(ballSpeedY < 0 && ballSpeedY>-speedLimit){
        ballSpeedY-=speedIncrease;
    }
};



const drawBall=()=>{
    ctx.fillStyle="#ffffff";
    ctx.fillRect(ballX,ballY,ballSize,ballSize);
    ballX+=ballSpeedX;
    ballX=Number(ballX.toFixed(0));
    ballY+=ballSpeedY;
    ballY=Number(ballY.toFixed(0));
    if(ballY<=0 || ballY+ballSize>=ch){
        ballSpeedY=-ballSpeedY;
        speedUp();
    }
    if(ballX<=0 || ballX+ballSize>=cw){
        ballSpeedX=-ballSpeedX;
        speedUp();
    }
    //Gracz
    if(ballSpeedX<0){
      if(ballX+ballSpeedX-speedIncrease<playerX+paddleWidth && (ballY+ballSize>=playerY && ballY<=playerY+paddleHeight) ){
        ballX=playerX+paddleWidth;
        ballSpeedX=-ballSpeedX;
      }
    }
    if(ballSpeedX>0){
      if(ballX+ballSize+ballSpeedX+speedIncrease>=aiX && (ballY+ballSize>=aiY && ballY<=aiY+paddleHeight) ){
        ballX=aiX-paddleWidth;
        ballSpeedX=-ballSpeedX;
      }
    }

    if(ballX<playerX-paddlePushAway+ballSize){
        ballSpeedX=1+Number((Math.random()*x).toFixed(0));
        ballSpeedY=1+Number((Math.random()*y).toFixed(0));

        ballX=cw/2-ballSize/2;
        ballY=ch/2-ballSize/2;
        aiScore++;
    }

    if(ballX>aiX+paddlePushAway-ballSize){
        ballSpeedX=1+Number((Math.random()*x).toFixed(0));
        ballSpeedY=3+Number((Math.random()*y).toFixed(0));

        ballX=cw/2-ballSize/2;
        ballY=ch/2-ballSize/2;
        playerScore++;
    }

};

const playerPosition=(event)=>{
    playerY=event.clientY-offSetTopCanv-paddleHeight/2;
    if(playerY<=0){
        playerY=0;
    }
    if(playerY>=ch-paddleHeight){
        playerY=ch-paddleHeight;
    }
    //aiY=playerY;
}

const aiPosition=()=>{
  /* unwinnable
  if(ballY>=0 && ballY<=paddleHeight/2){
    aiY=0;
  }
  else if(ballY<=ch && ballY>=ch-paddleHeight/2){
    aiY=ch-paddleHeight;
  }
  else {
    aiY=ballY-paddleHeight/2;
  }
  */
  let ballMiddle=ballY+ballSize/2;
  let paddleMiddle=aiY+paddleHeight/2;

  if(ballMiddle<paddleMiddle){
      aiY-=Math.abs(ballSpeedY*difficulty);//ballSpeedY*difficulty;
  } else if(ballMiddle>paddleMiddle){
      aiY+=Math.abs(ballSpeedY*difficulty);//ballSpeedY*difficulty;
  }
  if(aiY<=0){
      aiY=0;
  }
  if(aiY+paddleHeight>=ch){
      aiY=ch-paddleHeight;
  }
}


canvas.addEventListener("mousemove",playerPosition);
let playTill=5;

const game=()=>{
    drawTable();
    if(playerScore<playTill && aiScore<playTill){
      drawBall();
      drawPlayer();
      drawAI();
      aiPosition();
      score.innerHTML="Player score: " + playerScore +"    AI score: " + aiScore;
    } else {
      if(playerScore>aiScore){
        score.innerHTML="Brawo, pokonałeś bota N4Wrr07, bot jest smutny ;c  |F5 to restart";
        //return
      } else{
        score.innerHTML="Bot N4Wrr07 wygrywa |F5 to restat";
        //return

      }

    }


}

setInterval(game,1000/60);
