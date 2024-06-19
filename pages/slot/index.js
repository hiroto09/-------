let slot_frame = document.getElementById("slot-frame");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let start_btn = document.getElementById("start-btn");
let stop_btn = document.getElementsByClassName("stop-btn");

let slot_pattern = [];
let bet = document.getElementById("bet");
let zandaka = document.getElementById("zandaka_money");
let sec = 70; //スロットのリール回転速度(実行毎秒数)
let stopReelFlag = []; //スロットのリール停止フラグ
let reelCounts = []; //どの画像をどの位置にさせるか
let slotFrameHeight; //フレームの大きさ
let slotReelsHeight; //リール(画像)全体の大きさ
let slotReelItemHeight; //リール(画像)1個の大きさ
let slotReelStartHeight; //画像の初期値
let zandaka_num = 0;
let bet_num = 0;

zandaka_num = localStorage.getItem("zandaka");
zandaka_num = parseInt(zandaka_num);

zandaka.textContent = zandaka_num;
bet.textContent = bet_num;

let Slot = {
  init: function () {
    //初期化
    stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
    //[false, false, false]　回転させていたら止まらない状態
    reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
    //[0, 0, 0] 最初に中央にくる画像の設定
  },
  start: function () {
    //クリックイベント
    Slot.init();
    for (let index = 0; index < 3; index++) {
      Slot.animation(index); //スロット３つ動かす
    }
  },
  stop: function (i) {
    //ストップボタンのクリックイベント
    stopReelFlag[i] = true; //animateのループから抜け出せる

    if (stopReelFlag[0] && !stopReelFlag[1] && !stopReelFlag[2]) {
      slot_pattern.push(
        reels[0].children[8 - reelCounts[0]].getAttribute("data-val")
      );
    } else if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
      slot_pattern.push(
        reels[1].children[8 - reelCounts[1]].getAttribute("data-val")
      );
    } else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
      slot_pattern.push(
        reels[2].children[8 - reelCounts[2]].getAttribute("data-val")
      );
    }

    if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
      start_btn.removeAttribute("disabled"); //スタートボタンの機能を機能させる
      if (slot_pattern.every((value) => value === slot_pattern[0])) {
        hit_img = slot_pattern[0];
        Slot.hit();
      }
      bet_num = 0;
      bet.textContent = bet_num;
      slot_pattern = [];
      localStorage.setItem("zandaka", zandaka_num);
    }
  },

  hit: function () {
    console.log(hit_img);
    if (bet_num === 0) {
      alert("揃いましたおめでとう！");
    } else if (hit_img === "yakuza") {
      alert("ヤクザが揃いました。BET金額がそのまま変換されます。");
      zandaka_num = zandaka_num + bet_num * 1;
    } else if (hit_img === "boku") {
      alert("僕が揃いました。BET金額が2倍になります。");
      zandaka_num = zandaka_num + bet_num * 2;
    } else if (hit_img === "neko") {
      alert("猫が揃いました。BET金額が3倍になります。");
      zandaka_num = zandaka_num + bet_num * 3;
    } else if (hit_img === "taiyaki") {
      alert("たい焼きが揃いました。BET金額が4倍になります。");
      zandaka_num = zandaka_num + bet_num * 4;
    } else if (hit_img === "jitensya") {
      alert("自転車が揃いました。BET金額が5倍になります。");
      zandaka_num = zandaka_num + bet_num * 5;
    } else if (hit_img === "okane") {
      alert("お金が揃いました。BET金額が6倍になります。");
      zandaka_num = zandaka_num + bet_num * 6;
    } else if (hit_img === "osatu") {
      alert("お札が揃いました。BET金額が7倍になります。");
      zandaka_num = zandaka_num + bet_num * 7;
    } else if (hit_img === "hukuro_kane") {
      alert("袋のお金が揃いました。BET金額が8倍になります。");
      zandaka_num = zandaka_num + bet_num * 8;
    }

    console.log(bet_num);
    bet_num = 0;
    zandaka.textContent = zandaka_num;
    bet.textContent = bet_num;
  },
  resetLocationInfo: function () {
    //最初の位置を設定
    slotFrameHeight = slot_frame.offsetHeight;

    slotReelsHeight = reels[0].offsetHeight;

    slotReelItemHeight = reel[0].offsetHeight;

    slotReelStartHeight = -slotReelsHeight;
    slotReelStartHeight =
      slotReelStartHeight +
      slotFrameHeight -
      slotFrameHeight / 2 +
      (slotReelItemHeight * 3) / 2;

    for (let i = 0; i < reels.length; i++) {
      reels[i].style.top = String(slotReelStartHeight) + "px";
    }
  },
  animation: function (index) {
    //スロットを動かす
    if (reelCounts[index] >= 8) {
      reelCounts[index] = 0;
    }
    //animate( CSSプロパティ, 速度, イージング関数名, アニメーション完了後に実行する関数 );
    $(".reels")
      .eq(index)
      .animate(
        {
          top: slotReelStartHeight + reelCounts[index] * slotReelItemHeight,
          //indexが増えるたびに、画像１つ分下がる
        },
        {
          duration: sec, //回転速度
          easing: "linear", //常に一定の速度
          complete: function () {
            if (stopReelFlag[index]) {
              //stopReelFlag[index]がtrueになるまでループ
              return;
            }
            reelCounts[index]++;
            Slot.animation(index);
          },
        }
      );
  },
};

window.onload = function () {
  Slot.init();
  Slot.resetLocationInfo();
  start_btn.addEventListener("click", function (e) {
    e.target.setAttribute("disabled", true); //スタートボタンを無効化
    Slot.start();
    for (let i = 0; i < stop_btn.length; i++) {
      stop_btn[i].removeAttribute("disabled"); //ストップボタンを機能させる
    }
  });
  for (let i = 0; i < stop_btn.length; i++) {
    stop_btn[i].addEventListener("click", function (e) {
      Slot.stop(e.target.getAttribute("data-val")); //どのボタンをストップさせるか
      e.target.setAttribute("disabled", true); //ストップボタンを無効化
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.getElementById("popupButton");
  const popup = document.getElementById("popup");
  const closeButton = document.getElementById("closeButton");

  openButton.addEventListener("click", function () {
    console.log("click");
    popup.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    popup.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const up = document.getElementById("up");
  const down = document.getElementById("down");

  up.addEventListener("click", function () {
    if (zandaka_num === 0) {
      alert("残高がありません。");
    } else if (bet_num < 1000) {
      bet_num += 100;
      zandaka_num -= 100;

      bet.textContent = bet_num;
      zandaka.textContent = zandaka_num;
    }
  });
  down.addEventListener("click", function () {
    if (bet_num >= 100) {
      bet_num -= 100;
      zandaka_num += 100;

      bet.textContent = bet_num;
      zandaka.textContent = zandaka_num;
    }
  });
});
