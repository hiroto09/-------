//キャンバスの所得
let can = document.getElementById("can");
let con = can.getContext("2d");

//local
// localStorage.setItem("zandaka",0);
let zandaka_num=parseInt(localStorage.getItem("zandaka"));

//キャンバスのサイズ(画面)
can.width = 600;//横
can.height = 780;//縦

//キャンバスの縁の色
can.style.border = "4px solid green"; 


//仮想キャンバスの所得(フィールド)
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");



//仮想キャンバスのサイズ(フィールド)
vcan.width = can.width;
vcan.height = can.height*3;

//仮想キャンバスの所得（リザルト）
let re = document.createElement("canvas");
let rese = re.getContext("2d");

//仮想キャンバスのサイズ(リザルト)
re.width = can.width;
re.height = can.height;



//カメラの初期位置
let camera_y=vcan.height-can.height;


//移動距離の決定
const idoukyori = 30;


//主人公の画像を宣言
var image = new Image();
  image.src = "自転車.png";//主人公の画像
//こけた主人公
var koketa = new Image();
 koketa.src = "こける.png";

//主人公の描画サイズを定義
const swidth = idoukyori;
const sheight = idoukyori*2;

// 主人公の初期座標を定義
var x = can.width/2;
var y = vcan.height-idoukyori*4;

//障害物画像の宣言
var isi = new Image();
isi.src = "石.png";

//障害物の大きさの宣言
const isi_width = 30;
const isi_height = 30;

//当たり判定
let hantei = 0;
let tmphantei = 0;

//お金画像の宣言
var okane = new Image();
okane.src = "お金.png";

//お金の大きさの宣言
const okane_width = 30;
const okane_height = 30;

//コイン一枚の金額の宣言
const coinnedan=100;
document.getElementById('coinget').innerHTML = "+"+coinnedan+"円";

let combo =  0;
let maxcombo = 0;
document.getElementById('combo').innerHTML = combo+" COMBO";


//ゲームスピード
const GAME_SPEED = 500;

//残高の設定
let zandaka = 1000;
zandaka = zandaka_num;
document.getElementById('zandaka').innerHTML = "残高："+zandaka+"円";

//ダメージを受けた際に減るお金の量
let damage = 100;
document.getElementById('damage').innerHTML = "-"+damage+"円";

//リザルト表示用
let kakutokucoin=0;
let  lostcoin=0;
let syokizandaka = zandaka;

//クリアフラグ
let clear = 0;

//入力されたキーを記録する変数
var idou;

//ランダムな数字を生成する
function rand(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

//カメラ移動
function cameraidou(){
  if(camera_y!=0){camera_y-=idoukyori;}
  if(y+sheight>camera_y+can.height){y=camera_y+can.height-sheight;drow();}
}

//主人公を自動的に移動させる
function zidouidou(){
  y-=idoukyori;drow();
  atarihantei();
}

//定められた感覚で動かす関数まとめ
function clock(){
  cameraidou();
  zidouidou();
  danmaku();
  coinseisei();
  coinidou();
}
 //主人公を移動させる
function kyaraidou(){
switch(idou) {
  case 'ArrowUp': //上
      if(y>idoukyori&&y-idoukyori>camera_y||camera_y==0){y-=idoukyori}else{y=camera_y;}
      idou = ''; 
      break;
  case 'ArrowDown': //下
      if(y<(vcan.height-sheight)-idoukyori&&y+sheight+idoukyori<camera_y+can.height){y+=idoukyori}else{y=camera_y+can.height-idoukyori*2;};
      idou = '';
      break;
    case 'ArrowRight': //右
      if (x<(vcan.width-swidth)-idoukyori){x+=idoukyori;}else{x=vcan.width-idoukyori;}
      idou='';
      break;
    case 'ArrowLeft'://左
      if(x>idoukyori){x-=idoukyori;}else{x=0;}
      idou='';
      break;
}
atarihantei();
if(hantei==1&&tmphantei==0)zandakadamage();
}

 //弾幕に関する変数の宣言
 let danmakuiti;//弾幕を生成するx座標
 let danmakukazu = -1;//生成されている弾幕の数-1
 var nort = [[,]];//生成された弾幕を格納する配列の宣言[x,y]
 

//弾幕ノーツ生成
 function danmaku(){
if(camera_y!=0){
  danmakukazu++;
 danmakuiti  = (rand (1,(vcan.width-idoukyori)/idoukyori))*idoukyori;
 nort.push([danmakuiti,camera_y]);
}
}

//弾幕にあたった際残高更新
function zandakadamage(){
  tmphantei=1;
  if(maxcombo<combo){maxcombo=combo;}
  combo = 0;
  document.getElementById('combo').innerHTML = combo+" COMBO";
  if(zandaka-damage<=0){zandaka=0;}else{zandaka=zandaka-damage;lostcoin+=damage;}//残高の更新
  document.getElementById('zandaka').innerHTML = ("残高："+zandaka+"円");//残高表記の更新
}

//判定をリセットする
function hanteiclock(){
  hantei=0;
}

//コイン生成
let coinkazu=-1;
let coiniti;
var coin = [[,]];//生成されたコインを格納する配列の宣言[x,y,拾ったかどうか]0=拾ってない1=拾った
var coinste=[];

function  coinseisei(){
  if(camera_y!=0){
    // if(rand(1,5)==1){
      coiniti  = (rand (1,(vcan.width-idoukyori)/idoukyori))*idoukyori;
    coinkazu++;
      coin.push([coiniti,camera_y]);
      coinste.push([0]);
    }
    
  }
// }

//コインを移動させる
function coinidou(){
  for(let i=0;i<=coinkazu;i++){
    coin[i][1]+=idoukyori;
  }
}

//コインを獲得したことによる残高の更新
function coinget(){
  combo++;
  document.getElementById('combo').innerHTML = combo+" COMBO";
  zandaka=zandaka+coinnedan;//残高の更新
  kakutokucoin += coinnedan;
  document.getElementById('zandaka').innerHTML = ("残高："+zandaka+"円");//残高表記の更新
}



//表示する関数
function drow(){
  // 画面全体をクリア
  rese.clearRect(0, 0, re.width,re.height);
  vcon.clearRect(0, 0, vcan.width,vcan.height);
  con.clearRect(0, 0, can.width,can.height);

  vcon.fillStyle = '#ff4500';
  vcon.rect(0, 0, vcan.width,30);
  vcon.fill();
  // vcon.stroke();
  
  if(clear==0){
    //クリア前のキャンバス
  if(hantei==0){tmphantei=0;vcon.drawImage(image, x, y, swidth,sheight);//正常主人公を仮想キャンバスに表示

  }else{
    tmphantei=1;
    vcon.drawImage(koketa, x, y, swidth,sheight);//こけた主人公を仮想キャンバスに表示
    setTimeout(hanteiclock(),1000);//正常に戻す
    }
  for(var i=0;i<=danmakukazu;i++){vcon.drawImage(isi, nort[i][0], nort[i][1], isi_width,isi_height);}//弾幕の表示
  for(var i=0;i<=coinkazu;i++){if(coinste[i]==0){vcon.drawImage(okane, coin[i][0], coin[i][1], okane_width,okane_height);}}//コインの表示

  con.drawImage(vcan,0,camera_y,can.width,can.height,0,0,can.width,can.height);//仮想キャンバスをキャンバスにコピー
}else{
  //クリア後のキャンバス
  rese.font = "50px 游明朝";
  rese.fillStyle="#6b8e23";
  rese.fillText("初期残高："+syokizandaka+"円", 10, 50);
  rese.fillText("獲得したお金：+"+kakutokucoin+"円", 10, 100);
  rese.fillText("失ったお金：-"+lostcoin+"円", 10, 150);
  rese.fillText("--------------------------------", 10, 200);
  rese.fillText("最大コンボ："+maxcombo+" COMBO", 10, 250);
  rese.fillText("コンボボーナス：+"+bonasucombo+"円", 10, 300);
  if(lostcoin==0){rese.fillText("ノーミス：+"+nomiss+"円", 10, 350);}
  rese.fillText("残高："+zandaka+"円", 10, 450);
  rese.fillStyle="#47b9ce";
  rese.fillText("Spaceで戻る", 130, 700);
  con.drawImage(re,0,0,re.width,re.height,0,0,can.width,can.height);
}
}


//当たり判定
let coinhantei=0;
let cointmphantei=0;

function atarihantei(){
  //弾幕用
  for(var i=0;i<=danmakukazu;i++){
    if(x==nort[i][0] && y==nort[i][1]||x==nort[i][0] && y+idoukyori==nort[i][1]){
      hantei=1;
    }
  }
  //コイン用
  for(var i=0;i<=coinkazu;i++){
    if(coinste[i]==0){
      if(x==coin[i][0] && y==coin[i][1]||x==coin[i][0] && y+idoukyori==coin[i][1]){
        coinste[i]=1;
       coinget();
      }
    }
    
}
}

let bonasucombo = 0;
const nomiss = 500;

function bonasu(){
  if(bonasucombo==0){
    
    bonasucombo=((maxcombo/2)*100);
    if(lostcoin==0){zandaka+=nomiss;}
    zandaka += bonasucombo;
  }
}


// 画面を更新する関数を定義 (繰り返しここの処理が実行される)
function update() {

  //主人公を移動させる
  kyaraidou();
  
  if(y<0){clear=1;
  }//ゲームのクリア判定

  if(clear==1){//ゲームクリア後の動き
    if(maxcombo<combo){maxcombo=combo;}
    bonasu();
    localStorage.setItem("zandaka",zandaka);
    document.addEventListener('keydown',function(e){

      if(e.code=='Space'){window.location.href = '/pages/home/index.html'};
  });
  }

  //表示する
  drow();
  
  
   // 再描画
   window.requestAnimationFrame(update);
  
  }
  
//----------------以下➖---------------------

//入力されたキーを記録する
document.addEventListener('keydown',function(e){
  idou = e.code;
});

// ロード時に画面描画の処理が実行されるようにする
window.addEventListener("load", update);

//定められた感覚で動かす
 setInterval(clock,GAME_SPEED);

