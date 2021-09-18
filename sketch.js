var caminho,menino,dinheiro,diamantes,joias,espada;
var imgCaminho,imgMenino,imgDinheiro,imgDiamantes,imgJoias,imgEspada;
var colecaoTesouros = 0;
var dinheiroG,diamantesG,joiasG,grupoEspada,Fim,imgFim;

//Estados de jogo
var JOGAR=1;
var ENCERRAR=0;
var estadoJogo=1;

function preload(){
  imgCaminho = loadImage("Road.png");
  imgMenino = loadAnimation("Runner-1.png","Runner-2.png");
  imgDinheiro = loadImage("cash.png");
  imgDiamantes = loadImage("diamonds.png");
  imgJoias = loadImage("jwell.png");
  imgEspada = loadImage("sword.png");
  imgFim = loadImage("gameOver.png");
  
  
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// movendo o plano de fundo
caminho=createSprite(width/2,height/2);
caminho.addImage(imgCaminho);
caminho.velocityY = 4;


//criando o menino correndo
menino = createSprite(width/2,height/2+300,20,20);
menino.addAnimation("SahilRunning",imgMenino);
menino.scale=0.08;
  
Fim = createSprite(width/2,height/2,20,20);
Fim.addImage(imgFim);
Fim.scale = 0.8;
  
dinheiroG=new Group();
diamantesG=new Group();
joiasG=new Group();
grupoEspada=new Group();

}

function draw() {

  if(estadoJogo===JOGAR){
  background(0);
  menino.x = World.mouseX;
  
  Fim.visible = false ;
    
  edges= createEdgeSprites();
  menino.collide(edges);
  
  //código para resetar o plano de fundo
  if(caminho.y > height ){
    caminho.y = height/2+160;
  }
  
    criarDinheiro();
    criarDiamantes();
    criarJoias();
    criarEspadas();

    if (dinheiroG.isTouching(menino)) {
      dinheiroG.destroyEach();
      colecaoTesouros=colecaoTesouros+50;
    }
    else if (diamantesG.isTouching(menino)) {
      diamantesG.destroyEach();
      colecaoTesouros=colecaoTesouros+100;
      
    }else if(joiasG.isTouching(menino)) {
      joiasG.destroyEach();
      colecaoTesouros=colecaoTesouros+150;
      
    }else{
      if(grupoEspada.isTouching(menino)) {
     estadoJogo = ENCERRAR;
        menino.addAnimation('game_over',imgFim);
        menino.x = height/2 + 270;
        dinheiroG.destroyEach();
        diamantesG.destroyEach();
        joiasG.destroyEach();
        grupoEspada.destroyEach();
        Fim.visible = true;
        
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouros: "+ colecaoTesouros,width-140,30);
  }

}

function criarDinheiro() {
  if (World.frameCount % 200 == 0) {
  var dinheiro = createSprite(Math.round(random(50, 900),40, 10, 10));
  dinheiro.addImage(imgDinheiro);
  dinheiro.scale=0.12;
  dinheiro.velocityY = 4;
  dinheiro.lifetime = 250;
  dinheiroG.add(dinheiro);
  }
}

function criarDiamantes() {
  if (World.frameCount % 320 == 0) {
  var diamantes = createSprite(Math.round(random(50, 900),40, 10, 10));
  diamantes.addImage(imgDiamantes);
  diamantes.scale=0.03;
  diamantes.velocityY = 4;
  diamantes.lifetime = 250;
  diamantesG.add(diamantes);
}
}

function criarJoias() {
  if (World.frameCount % 410 == 0) {
  var joias = createSprite(Math.round(random(50, 900),40, 10, 10));
  joias.addImage(imgJoias);
  joias.scale=0.13;
  joias.velocityY = 4;
  joias.lifetime = 250;
  joiasG.add(joias);
  }
}

function criarEspadas(){
  if (World.frameCount % 430 == 0) {
  var espada = createSprite(Math.round(random(50, 900),40, 10, 10));
  espada.addImage(imgEspada);
  espada.scale=0.1;
  espada.velocityY = 4;
  espada.lifetime = 250;
  grupoEspada.add(espada);
  }
}