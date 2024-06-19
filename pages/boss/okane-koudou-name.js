// お金コマンド一覧のホバーイベント
document.getElementById("okane1").addEventListener("mouseover", function () {
    okaneHover.innerText = "飼い猫に　お金を見せつける\nうまくいけば　ボスにダメージを　あたえるかも";
    okane_syouhi_coin.textContent = okane1;
  });
  document.getElementById("okane1").addEventListener("mouseout", function () {
    okaneHover.innerText = "";
    okane_syouhi_coin.textContent = "";
  });

  document.getElementById("okane2").addEventListener("mouseover", function () {
    okaneHover.innerText = "物欲のまにまに　買いまくるぞ\nHPを　回復するよ";
    okane_syouhi_coin.textContent = okane2;
  });
  document.getElementById("okane2").addEventListener("mouseout", function () {
    okaneHover.innerText = "";
    okane_syouhi_coin.textContent = "";
  });

  document.getElementById("okane3").addEventListener("mouseover", function () {
    okaneHover.innerText = "お札の　お風呂に　入ろう！\n心が満たされ　HPを大きく　回復するよ";
    okane_syouhi_coin.textContent = okane3;
  });
  document.getElementById("okane3").addEventListener("mouseout", function () {
    okaneHover.innerText = "";
    okane_syouhi_coin.textContent = "";
  });




  document.getElementById("okane4").addEventListener("mouseover", function () {
    okaneHover.innerText = "ボスに　ダメージを与える\n早いうちに使うほど　ダメージが大きいぞ";
    okane_syouhi_coin.textContent = okane4;
  });
  document.getElementById("okane4").addEventListener("mouseout", function () {
    okaneHover.innerText = "";
    okane_syouhi_coin.textContent = "";
  });

  document.getElementById("okane5").addEventListener("mouseover", function () {
    okaneHover.innerText = "ボスに小銭を　何回か投げつける\n1回のダメージは　小さいけどね";
    okane_syouhi_coin.textContent = okane5;
  });
  document.getElementById("okane5").addEventListener("mouseout", function () {
    okaneHover.innerText = "";
    okane_syouhi_coin.textContent = "";
  });

  document.getElementById("okane6").addEventListener("mouseover", function () {
    okaneHover.innerText = "いちげきひっさつ！\n全額使って　もしかすると　ボスを倒せるかもね\n残高が多いほど　確率が上がるぞ";
    okane6 = player.coin
    okane_syouhi_coin.textContent = "全額(" + okane6 + ")";
  });
  document.getElementById("okane6").addEventListener("mouseout", function () {
    okaneHover.innerText = "";
    okane_syouhi_coin.textContent = "";
  });





  
  document.getElementById("okane7").addEventListener("mouseover", function () {
    okaneHover.innerText = "大金を見せつけて　マウントを取るぞ\nボスに精神的に ダメージを与えよう\n先に動いていれば　もしかしたら　ボスがひるむかも";
    okane_syouhi_coin.textContent = okane7;
  });
  document.getElementById("okane7").addEventListener("mouseout", function () {
    okaneHover.innerText = "";
    okane_syouhi_coin.textContent = "";
  });

  document.getElementById("okane8").addEventListener("mouseover", function () {
    okaneHover.innerText = "金次第\nお金を払えば　阿弥陀如来の　ご利益が！\nしばらくの間　攻撃力が　上がるぞ";
    okane_syouhi_coin.textContent = okane8;
  });
  document.getElementById("okane8").addEventListener("mouseout", function () {
    okaneHover.innerText = "";
    okane_syouhi_coin.textContent = "";
  });

  document.getElementById("okane9").addEventListener("mouseover", function () {
    okaneHover.innerText = "金次第\nお金があれば　閻魔の裁きも　こちらのもの\nしばらくの間　ボスの攻撃力が　下がるぞ";
    okane_syouhi_coin.textContent = okane9;
  });
  document.getElementById("okane9").addEventListener("mouseout", function () {
    okaneHover.innerText = "";
    okane_syouhi_coin.textContent = "";
  });

  document.getElementById("okane10").addEventListener("mouseover", function () {
    okaneHover.innerText = "金が成る\n財産は　コツコツ　貯めるもの\nしばらくの間　受けたダメージに応じて　お金をゲットする";
    okane_syouhi_coin.textContent = okane10;
  });
  document.getElementById("okane10").addEventListener("mouseout", function () {
    okaneHover.innerText = "";
    okane_syouhi_coin.textContent = "";
  });


  //猫にこばん
  document.getElementById("okane1").addEventListener("click", function () {
    if(player.coin < okane1){
      alert('残高不足');
      return;
    }
    player.coin -= okane1;
    update_Coin();
    round(1);  
  });
  //散財
  document.getElementById("okane2").addEventListener("click", function () {
    if(player.coin < okane2){
      alert('残高不足');
      return;
    }
    player.coin -= okane2;
    update_Coin();
    round(2);  
  });
  //札風呂
  document.getElementById("okane3").addEventListener("click", function () {
    if(player.coin < okane3){
      alert('残高不足');
      return;
    }
    player.coin -= okane3;
    update_Coin();
    round(3);  
  });
  //時は金成
  document.getElementById("okane4").addEventListener("click", function () {
    if(player.coin < okane4){
      alert('残高不足');
      return;
    }
    player.coin -= okane4;
    update_Coin();
    round(4);  
  });
  //薄利多売
  document.getElementById("okane5").addEventListener("click", function () {
    if(player.coin < okane5){
      alert('残高不足');
      return;
    }
    player.coin -= okane5;
    update_Coin();
    round(5);  
  });
  //孤注いってき
  document.getElementById("okane6").addEventListener("click", function () {
    player_hozon.coin = player.coin ;
    player.coin = 0;
    update_Coin();
    round(6);  
  });
  //金ツラ
  document.getElementById("okane7").addEventListener("click", function () {
    if(player.coin < okane7){
      alert('残高不足');
      return;
    }
    player.coin -= okane7;
    update_Coin();
    round(7);  
  });
   //阿弥陀
  document.getElementById("okane8").addEventListener("click", function () {
    if(player.coin < okane8){
      alert('残高不足');
      return;
    }
    player.coin -= okane8;
    update_Coin();
    round(8);  
  });
  //閻魔
  document.getElementById("okane9").addEventListener("click", function () {
    if(player.coin < okane9){
      alert('残高不足');
      return;
    }
    player.coin -= okane9;
    update_Coin();
    round(9);  
  });
  //金なるき
  document.getElementById("okane10").addEventListener("click", function () {
    if(player.coin < okane10){
      alert('残高不足');
      return;
    }
    player.coin -= okane10;
    update_Coin();
    round(10);  
  });