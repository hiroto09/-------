var g_Canvas;
var g_Ctx;

// texture
var gMarioTex;
var gMapTex;
var gBackgroundMapTex;
var gTitleTex;

var gMario;

// key
var gSpacePush = false; // space
var gLeftPush = false;	// left
var gRightPush = false;	// right
var gUpPush = false;	// up
var gDownPush = false;	// down
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


/**
  マップ
*/
var gBackGroundMapChip = [
        [1,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,1,2,3],
        [28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,28,29,30,31],
        [56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,56,57,58,59],
        [84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,84,85,86,87],
        [112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,112,113,114,115],
        [140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,140,141,142,143],
        [168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,168,169,170,171],
        [196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,196,197,198,199],
        [224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,224,225,226,227],
        [252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,252,253,254,255],
        [280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,280,281,282,283],
        [308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,308,309,310,311],
        [336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,336,337,338,339],
        [74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74],
        [74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74,74],
    ];

var gMapChip = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];

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

    g_Ctx = g_Canvas.getContext('2d');          // ctx
    loadTexture();
    gMario = new Mario(0,384);

    // キーの登録
    window.addEventListener('keydown', keyDown, true);     
    window.addEventListener('keyup', keyUp, true);
    requestNextAnimationFrame(animate);		// loopスタート 
};

document.addEventListener('DOMContentLoaded', (event) => {
    document.addEventListener('keydown', function (event) {
        if (event.code === 'Enter') {
            window.location.href = '../game/index.html';
        }
    });
});

/*
	テクスチャのロード
*/
function loadTexture(){
    gMapTex = new Image();
    gMapTex.src = "../game/resource/stage.png";
    gBackgroundMapTex = new Image();
    gBackgroundMapTex.src = "../game/resource/background.png";
    gTitleTex = new Image();
    gTitleTex.src = "resource_title/title.png";

	gMarioTex = new Image();
    if (gRightPush || gLeftPush)  {
        if (gSpacePush) {
            gMarioTex.src = `../game/resource/run-${gRightPush ? "right" : "left"}-${
                "00" + Math.floor(runningCount / runRange)
              }.png`;
        }else {
            gMarioTex.src = `../game/resource/walk-${gRightPush ? "right" : "left"}-${
                "00" + Math.floor(walkingCount / walkRange)
              }.png`;
        }
    }else {
        gMarioTex.src = `../game/resource/stand-${isgRightPushBefore ? "right" : "left"}.png`;
    }
}

function animate(now) {
    move();
    // 描画
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
    g_Ctx.drawImage(gTitleTex, 960 / 2 - 305, 480 / 2 - 156 - 50);
    drawMap(gMapChip, gMapTex);
	gMario.draw(g_Ctx,gMarioTex);

    g_Ctx.fillStyle = "#F28350";	
    g_Ctx.fillRect(0, 480 - 64, 960, 64);
    g_Ctx.fillStyle = "#FFFFFF";
    g_Ctx.font = "bold 24px Inter";
    g_Ctx.fillText("Enterでゲームスタート", 480 - 130, 480 - 24);
    document.getElementById("money").textContent = `所持金：${moneyTotal}円`;
    document.getElementById("time").textContent = "あと " + `${STAGE_TIMES}`
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

    // アニメーション処理
    if (gSpacePush && (gRightPush || gLeftPush)) {
        runningCount = (runningCount + 1) % (runRange * 2);
    }else if (gRightPush || gLeftPush) {
        walkingCount = (walkingCount + 1) % (walkRange * 2);
    } else {
        walkingCount = 0;
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