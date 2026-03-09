const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

putWallsAroundCanvas(0,0,canvas.clientWidth, canvas.clientHeight);
let randomObjects = [];

//10 body object with random arguments
for(let addBody = 0; addBody < 10; addBody++){
    let x0 = randInt(100, canvas.clientWidth-100);
    let y0 = randInt(100, canvas.clientHeight-100);
    let x1 = x0 + randInt(-50, 50);
    let y1 = y0 + randInt(-50, 50);
    let r = randInt(10, 30);
    let m = randInt(0, 10);
    
    
    if(addBody%4 === 0){
        let ballObj = new Ball(x0, y0, r, m);
        ballObj.setPosition(100,100);
        ballObj.color = "red";
        ballObj.layer = 1;
        randomObjects.push(ballObj);
    }
    if(addBody%4 === 1){
        let boxObj = new Box(x0, y0, x1, y1, r, m);
        boxObj.setPosition(200,200);
        boxObj.color = "blue";
        boxObj.layer = 2;
        randomObjects.push(boxObj);
    }
    if(addBody%4 === 2){
        let capsObj = new Capsule(x0, y0, x1, y1, r, m);
        capsObj.setPosition(300,300);
        capsObj.color = "lightgreen";
        capsObj.layer = 3;
        randomObjects.push(capsObj);
    }
    if (addBody%4  === 3){
        let starObj = new Star(x0,y0,r+20,m);
        starObj.setPosition(400,400);
        starObj.color = "yellow";
        starObj.layer = 4;
        randomObjects.push(starObj);
    }
};

for (let i in randomObjects){
    if(randomObjects[i].m !== 0){
        randomObjects[i].vel.set(Math.random()*4-2, Math.random()*4-2);
    }
}
let playerBall = new Ball(320, 240, 10, 5);

playerBall.player = true;
playerBall.maxSpeed = 3;
playerBall.color = "#5B2C6F";


function gameLogic(){
    for (let i in randomObjects){
        if(collide(randomObjects[i], playerBall)){
            //playerBall.remove();
            randomObjects[i].remove();
            randomObjects.splice(i,1);
        }
    }
}

userInput(playerBall);
requestAnimationFrame(mainLoop);
