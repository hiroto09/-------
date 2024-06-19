const HP_COST = 1000;
const A_COST = 1000;
const S_COST = 1000;
const HP_INCREMENT = 3000;
const A_INCREMENT = 300;
const S_INCREMENT = 1;
const tarinai = '残高が足りません';
const herasenai = 'これ以上減らせません';
// syoki_player オブジェクトから値を取得して表示する
document.getElementById('syoki-hp').textContent = syoki_player.hp;
document.getElementById('syoki-a').textContent = syoki_player.a;
document.getElementById('syoki-s').textContent = syoki_player.s;
document.getElementById('coin').textContent = player.coin;
document.getElementById('use-hp').textContent = HP_COST;
document.getElementById('use-a').textContent = A_COST;
document.getElementById('use-s').textContent = S_COST;
// HPを増やすボタン
document.getElementById('hp-up-btn').addEventListener('click', function () {
    if (player.coin >= HP_COST && player_kyouka.hp < 30000) {
        player_kyouka.hp += HP_INCREMENT;
        document.getElementById('hp-increase').innerText = '(+' + player_kyouka.hp + ')'; // 増加分を表示
        player.coin -= HP_COST; // 残高を減らす
        document.getElementById('coin').textContent = player.coin; // 残高を更新
    }
    else if (player_kyouka.hp >= 30000) {
        alert('上限です');
    }
    else {
        alert(tarinai);
    }
});
document.getElementById('hp-down-btn').addEventListener('click', function () {
    if (player_kyouka.hp > 0) {
        player_kyouka.hp -= HP_INCREMENT;
        player.coin += HP_COST;
        document.getElementById('hp-increase').innerText = '(+' + player_kyouka.hp + ')'; // 増加分を表示
        document.getElementById('coin').textContent = player.coin; // 残高を更新
    }
    else {
        alert(herasenai);
    }
});

// 攻撃力を増やすボタン
document.getElementById('a-up-btn').addEventListener('click', function () {
    if (player.coin >= A_COST && player_kyouka.a < 3000) {
        player_kyouka.a += A_INCREMENT;
        document.getElementById('a-increase').innerText = '(+' + player_kyouka.a + ')'; // 増加分を表示
        player.coin -= A_COST;
        document.getElementById('coin').textContent = player.coin; // 残高を更新
    }
    else if (player_kyouka.hp >= 3000 || player_kyouka.a >= 3000) {
        alert('上限です');
    }
    else {
        alert(tarinai);
    }
});
document.getElementById('a-down-btn').addEventListener('click', function () {
    if (player_kyouka.a > 0) {
        player_kyouka.a -= A_INCREMENT;
        player.coin += A_COST;
        document.getElementById('a-increase').innerText = '(+' + player_kyouka.a + ')'; // 増加分を表示
        document.getElementById('coin').textContent = player.coin; // 残高を更新
    }
    else {
        alert(herasenai);
    }
});

// 先行を増やすボタン
document.getElementById('s-up-btn').addEventListener('click', function () {
    if (player.coin >= S_COST && player_kyouka.s == 0) {
        player_kyouka.s += S_INCREMENT;
        document.getElementById('s-increase').innerText = '(+' + player_kyouka.s + ')'; // 増加分を表示
        player.coin -= S_COST;
        document.getElementById('coin').textContent = player.coin; // 残高を更新
    }
    else if (player_kyouka.s == 1) {
        alert('0か１にしてください');
    }
    else {
        alert(tarinai);
    }
});
document.getElementById('s-down-btn').addEventListener('click', function () {
    if (player_kyouka.s > 0) {
        player_kyouka.s -= S_INCREMENT;
        player.coin += S_COST; // 
        document.getElementById('s-increase').innerText = '(+' + player_kyouka.s + ')'; // 増加分を表示
        document.getElementById('coin').textContent = player.coin; // 残高を更新
    }
    else {
        alert(herasenai);
    }
});

//戻る
document.getElementById('modoru-btn').addEventListener('click', function () {
        //ここでホームに戻る　zamdaka_num(全残高)
        location.href = '/pages/home/index.html';    
});

 //戦闘開始ボタンが押されたときの処理
 document.getElementById("start-battle-btn").addEventListener("click", function () {
    document.getElementById("kyouka").style.display = "none";
    document.getElementById("monny-command-window").style.display = "none";

    //強化分を足す
    player.hp += player_kyouka.hp;
    player.a += player_kyouka.a;
    player.s += player_kyouka.s;

    player_hozon.hp = player.hp;
    player_hozon.s = player.s;
    player_hozon.a = player.a;
    player_hozon.coin = player.coin;


    //ステータス　メッセージ 表示
    update_Coin();
    update_Hp();
    update_BossHp();        
    bun.innerText = "ぼくは　ボスを　たおしにきた\nどうする？";


      zandaka_num  -= player.coin;//ステータス分の残高
      console.log(zandaka_num);
      console.log(player_hozon.hp);
      console.log(player.hp);
  });