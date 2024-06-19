var g_Canvas;
var g_Ctx;

// texture
var gMarioTex;
var gMapTex;
var gBackgroundMapTex;

let gKuriboTex = []; 
const enemyNum = 33;

var gMario;
let gKuribo = []; 

// ゴールオブジェクト
let gGoal;

// key
var gSpacePush = false;
var gLeftPush = false;
var gRightPush = false;
var gUpPush = false;
var gDownPush = false;
var isgRightPushBefore = true; // 直前はrightか否か

// keyの定義
var SPACE_KEY = 32;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var UP_KEY = 38;
var DOWN_KEY = 40; 

// 移動中の場合にカウントする
var walkingCount = 0;
var runningCount = 0;

// カウントに対して画像を切り替える単位
const runRange = 9;
const walkRange = 15; //値が大きいほどアニメーションが遅くなる

var isCountdown = 1;

/**
	onload
	最初に呼び出される関数
*/
onload = function () {
    // キャンバスに代入
    g_Canvas = document.getElementById('id_canvas'); 
    // canvasに対応していない
    if (!g_Canvas || !g_Canvas.getContext) {
        alert("html5に対応していないので、実行できません");
        return false;
    }

    g_Ctx = g_Canvas.getContext('2d'); 
    loadTexture();
    gGoal = new Goal(32*MAX_MAP_CHIP_X - 32*10);

    gMario = new Mario(0,384);

    gKuribo[ 0] = new Kuribo(MAP_SIZE *  25, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[ 1] = new Kuribo(MAP_SIZE *  75, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[ 2] = new Kuribo(MAP_SIZE *  80, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[ 3] = new Kuribo(MAP_SIZE *  53, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[ 4] = new Kuribo(MAP_SIZE * 110, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[ 5] = new Kuribo(MAP_SIZE * 100, MAP_SIZE* 4,LEFT_DIR);
    gKuribo[ 6] = new Kuribo(MAP_SIZE * 137, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[ 7] = new Kuribo(MAP_SIZE * 155, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[ 8] = new Kuribo(MAP_SIZE * 190, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[ 9] = new Kuribo(MAP_SIZE * 255, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[10] = new Kuribo(MAP_SIZE * 282, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[11] = new Kuribo(MAP_SIZE * 360, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[12] = new Kuribo(MAP_SIZE * 375, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[13] = new Kuribo(MAP_SIZE * 400, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[14] = new Kuribo(MAP_SIZE * 420, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[15] = new Kuribo(MAP_SIZE * 444, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[16] = new Kuribo(MAP_SIZE * 486, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[17] = new Kuribo(MAP_SIZE * 517, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[18] = new Kuribo(MAP_SIZE * 535, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[19] = new Kuribo(MAP_SIZE * 545, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[20] = new Kuribo(MAP_SIZE * 555, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[21] = new Kuribo(MAP_SIZE * 570, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[22] = new Kuribo(MAP_SIZE * 625, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[23] = new Kuribo(MAP_SIZE * 688, MAP_SIZE* 12,LEFT_DIR);
    gKuribo[24] = new Kuribo(MAP_SIZE * 736, MAP_SIZE*  8,LEFT_DIR);
    gKuribo[25] = new Kuribo(MAP_SIZE * 718, MAP_SIZE*  8,LEFT_DIR);
    gKuribo[26] = new Kuribo(MAP_SIZE * 812, MAP_SIZE*  8,LEFT_DIR);
    gKuribo[27] = new Kuribo(MAP_SIZE * 858, MAP_SIZE*  5,LEFT_DIR);
    gKuribo[28] = new Kuribo(MAP_SIZE * 913, MAP_SIZE*  7,LEFT_DIR);
    gKuribo[29] = new Kuribo(MAP_SIZE * 946, MAP_SIZE*  7,LEFT_DIR);
    gKuribo[30] = new Kuribo(MAP_SIZE * 990, MAP_SIZE*  7,LEFT_DIR);
    gKuribo[31] = new Kuribo(MAP_SIZE * 1015,MAP_SIZE* 12,LEFT_DIR);
    gKuribo[32] = new Kuribo(MAP_SIZE * 1067,MAP_SIZE* 12,LEFT_DIR);

    // キーの登録
    window.addEventListener('keydown', keyDown, true);     
    window.addEventListener('keyup', keyUp, true);
    requestNextAnimationFrame(animate);		// loopスタート
    countdownTimer();
};

/*
	テクスチャのロード
*/
function loadTexture(){
    gMapTex = new Image();
    gMapTex.src = "resource/stage.png";

    gBackgroundMapTex = new Image();
    gBackgroundMapTex.src = "resource/background.png";

	gMarioTex = new Image();
    if (gRightPush || gLeftPush) {
        if (gSpacePush) {
            gMarioTex.src = `resource/run-${gRightPush ? "right" : "left"}-${"00" + Math.floor(runningCount / runRange)}.png`;
        }else {
            gMarioTex.src = `resource/walk-${gRightPush ? "right" : "left"}-${"00" + Math.floor(walkingCount / walkRange)}.png`;
        }
    }else {
        gMarioTex.src = `resource/stand-${isgRightPushBefore ? "right" : "left"}.png`;
    }

    for (let i = 0; i < enemyNum; i++) {
        gKuriboTex[i] = new Image();
        gKuriboTex[i].src = `resource/enemy.png`;
    }
    
}

function animate(now) {
    move();
    Draw();
    loadTexture();
    requestNextAnimationFrame(animate);
}

/*
	60fps毎に処理を実行
*/
window.requestNextAnimationFrame =
(function () {
   var originalWebkitRequestAnimationFrame = undefined,
       wrapper = undefined,
       callback = undefined,
       geckoVersion = 0,
       userAgent = navigator.userAgent,
       index = 0,
       self = this;

   // Workaround for Chrome 10 bug where Chrome
   // does not pass the time to the animation function

   if (window.webkitRequestAnimationFrame) {
      // Define the wrapper

      wrapper = function (time) {
        if (time === undefined) {
           time = +new Date();
        }
        self.callback(time);
      };

      // Make the switch

      originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;

      window.webkitRequestAnimationFrame = function (callback, element) {
         self.callback = callback;

         // Browser calls the wrapper and wrapper calls the callback

         originalWebkitRequestAnimationFrame(wrapper, element);
      }
   }

   // Workaround for Gecko 2.0, which has a bug in
   // mozRequestAnimationFrame() that restricts animations
   // to 30-40 fps.

   if (window.mozRequestAnimationFrame) {
      // Check the Gecko version. Gecko is used by browsers
      // other than Firefox. Gecko 2.0 corresponds to
      // Firefox 4.0.

      index = userAgent.indexOf('rv:');

      if (userAgent.indexOf('Gecko') != -1) {
         geckoVersion = userAgent.substr(index + 3, 3);

         if (geckoVersion === '2.0') {
            // Forces the return statement to fall through
            // to the setTimeout() function.

            window.mozRequestAnimationFrame = undefined;
         }
      }
   }

   return window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||

      function (callback, element) {
         var start,
             finish;


         window.setTimeout( function () {
            start = +new Date();
            callback(start);
            finish = +new Date();

            self.timeout = 1000 / 60 - (finish - start);

         }, self.timeout);
      };
   }
)
();

/*
	Draw
	描画
*/
function Draw(){
    
    drawMap(gBackGroundMapChip, gBackgroundMapTex);
    for (let i = 0; i < gKuribo.length; i++) gKuribo[i].draw(g_Ctx,gKuriboTex[i],gMario.mapScrollX);
    drawMap(gMapChip, gMapTex);
	gMario.draw(g_Ctx,gMarioTex);
    
    document.getElementById("money").textContent = `所持金：${moneyTotal}円`;
}

/**
  マップチップの描画

  map:対象のマップチップ配列
*/
function drawMap(map, mapTex){
    // y軸
    for(var y = 0; y < MAX_MAP_Y; ++y){
        // x軸
        for(var x = gMario.minDrawMapX;x < gMario.maxDrawMapX;++x){
            if(map[y][x] != NOT_DRAW_MAP){
                var indexX = 32 * ((map[y][x] + 28) % 28);
                var indexY = 32 * Math.floor(map[y][x] / 28);
                g_Ctx.drawImage(mapTex, indexX, indexY , 32, 32, (x * 32) - gMario.mapScrollX, y * 32, 32, 32);
            }
        }
    }
}


function move(){
    gMario.update(gMapChip);
    enemyMove();
    gGoal.update(gMario);

    // アニメーション処理
    if (gSpacePush && (gRightPush || gLeftPush)) {
        runningCount = (runningCount + 1) % (runRange * 2);
    }else if (gRightPush || gLeftPush) {
        walkingCount = (walkingCount + 1) % (walkRange * 2);
    } else {
        walkingCount = 0;
    }
}

function enemyMove(){
    for (let i = 0; i < gKuribo.length; i++) {
        gKuribo[i].update(gMapChip,gMario,1);   
    }
}

function countdownTimer() {
    if (STAGE_TIMES >= 0) {
        document.getElementById("time").textContent = "あと " + `${STAGE_TIMES}`;
        if (!(gMario.goalAnimationState == GOAL_ANIMATION_END)) {
            STAGE_TIMES--;
            setTimeout(countdownTimer, 1000);
        }
    } else {
        document.getElementById("time").textContent = "あと " +  0;
        gMario.goalAnimationState = GOAL_ANIMATION_END;
    }
}

/*
	キーを押した時の操作
*/
function keyDown(event) {
	var code = event.keyCode;       // どのキーが押されたか
	switch(code) {
	    // スペースキー
	    case SPACE_KEY:
            // スクロールさせないため
            event.returnValue = false;		// ie
            event.preventDefault();		// firefox
	        gSpacePush = true;
	        break;
	    // ←キー
	    case LEFT_KEY:
	        gLeftPush = true;
            isgRightPushBefore = false;
	        break;
	    // →キー
	    case RIGHT_KEY:
	        gRightPush = true;
            isgRightPushBefore = true;
	        break;
	    // ↑キー
	    case UP_KEY:
            event.returnValue = false;	// ie
        	event.preventDefault();	// firefox
	        gUpPush = true;
	        break;
            // ↓キー
	    case DOWN_KEY:
            event.returnValue = false;	// ie
        	event.preventDefault();	// firefox
	    	gDownPush = true;
	        break;
	}
}

/*
	キーを離した時のイベント
*/
function keyUp(event) {
	code = event.keyCode;
	switch(code) {
	    // スペースキー
	    case SPACE_KEY:
	        gSpacePush = false;
	        break;
	    // ←キー
	    case LEFT_KEY:
	        gLeftPush = false;
	        break;
	    case RIGHT_KEY:
	        // →キー
	        gRightPush = false;
	        break;
	    case UP_KEY:
	        // ↑キー
		    gUpPush = false;
	        break;
	    case DOWN_KEY:
	        // ↓キー
		    gDownPush = false;
	        break;
	}
}