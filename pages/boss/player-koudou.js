//通常攻撃
async function player_tuuzyou() {
    bun.innerText = "ぼくの　攻撃";
    dame = kougeki_dame(player.a);   //ダメーーーーーーーじ
    console.log('ダメージ'+dame);
    boss.hp -= dame;
    await sleep(mati_1);
    bun.innerText += "\nボスは　" + dame + "ダメージ　受けた";
    update_BossHp();
    await sleep(mati_2);
  }
  //お金行動
  async function player_tokusyu(coin_kind) { 
    switch (coin_kind){

      case 1: //猫にこばn
        bun.innerText = "ぼくは　猫にこばん　をくりだした";
        await sleep(mati_2);
        bun.innerText += "\n飼い猫に　お金を　見せつけた";
        await sleep(mati_2);
        if(Math.random()<0.5){
          dame = Math.floor(kougeki_dame(player.a) * 3);   //ダメーーーーーーーじ
          console.log('ダメージ'+dame);
          boss.hp -= dame;
          bun.innerText = "ボスが　お金に目を取られた";
          await sleep(mati_1);
          bun.innerText += "\nそして　ねこにつまずいて　転んだ";
          await sleep(mati_2);
          bun.innerText += "\nボスは　" + dame + "ダメージ　受けた";
          update_BossHp();  
        } else {
          bun.innerText = "なにも　起こらなかった";
        }
        break;

      case 2: //散財 
        bun.innerText = "ぼくは　散財　をくりだした";
        await sleep(mati_2);
        bun.innerText += "\n物欲が　";
        await sleep(mati_1);
        bun.innerText += "衝動が　";
        await sleep(mati_1);
        bun.innerText += "止まらない";
        await sleep(mati_2);
        player.hp +=  sanzai_hp;
        update_Hp();
        bun.innerText = "ぼくの　HPが　" + sanzai_hp +"　回復した";
        break;

      case 3: //風呂
        bun.innerText = "ぼくは　札風呂　をくりだした";
        await sleep(mati_2);
        bun.innerText += "\nこれが　あの　札風呂";
        await sleep(mati_1);
        bun.innerText = "...　";
        await sleep(mati_1);
        bun.innerText += "体が　休まらなかった";
        await sleep(mati_1);
        bun.innerText += "\nしかし　心は　満たされた！";
        await sleep(mati_2);
        player.hp +=  satuburo_hp;
        update_Hp();
        bun.innerText = "ぼくの　HPが　" + satuburo_hp +"　回復した";
        break;

      case 4: //時は金成
        bun.innerText = "ぼくは　時は金なり　をくりだした\n";
        await sleep(mati_2);
        bun.innerText += "時間を　無駄にしては　いけない！\n";
        await sleep(mati_2);
        if(round_num <= 3){
          bun.innerText = "早めに　動いた　ぼくは偉い！\n";
          dame = Math.floor(kougeki_dame(player.a) * (6-round_num));   //ダメーーーーーーーじ
        } else {
          bun.innerText = "もう　遅かった！\n";
          dame = Math.floor(kougeki_dame(player.a) * 0.1 );   //ダメーーーーーーーじ
        }
        console.log('ダメージ'+dame);
        boss.hp -= dame;
        await sleep(mati_1);
        bun.innerText += "ボスは　" + dame + "ダメージ　受けた";
        update_BossHp(); 
        break;

    case 5: //薄利多売
        let kaisuu = getRandomInt(2,5);
        let sum_dame = 0;
        console.log('タネマシンガン'+kaisuu);
        bun.innerText = "ぼくは　薄利多売　をくりだした";
        await sleep(mati_2);
        bun.innerText = "小銭を　投げつけるぞ！\n";
        await sleep(mati_2);
        for(let i=1; i<=kaisuu ; i++){
            dame = Math.floor(kougeki_dame(player.a) * (0.4));   //ダメーーーーーーーじ
            boss.hp -= dame;
            update_BossHp(); 
            bun.innerText +=  dame + "ダメージ、";
            sum_dame += dame ;
            await sleep(mati_1);
        }
        bun.innerText = "合計で　" + sum_dame + "ダメージ　与えた";
        break;

    case 6: //こちゅういってき
        const saiteigen = 10000;
        bun.innerText = "ぼくは　孤注いってき　をくりだした";
        await sleep(mati_2);
        bun.innerText = "博打だ！\n";
        await sleep(mati_2);
        let kakuritu = player_hozon.coin / saiteigen * 10;
        if(kakuritu > 50) kakuritu = 50;
        let flag_kakuritu = getRandomInt(0, 100);
        console.log('kakuritu'+kakuritu);
        console.log('flag_kakuritu'+flag_kakuritu);
        
        if( player_hozon.coin < saiteigen ) {
            bun.innerText +=  "お金が少なすぎた！";
            bun.innerText +=  "\n" + saiteigen + "以上は　欲しいぞ";
            await sleep(mati_1);
        } else if(flag_kakuritu <= kakuritu){
            bun.innerText +=  "勝った、博打に勝ったぞ！";
            boss.hp=0;
            update_BossHp();
            await sleep(mati_2);
        } else {
            bun.innerText +=  "残念　ハズレだ";
        }
        break;

    case 7: //金ツラ
        bun.innerText = "ぼくは　金で面を張る　をくりだした";
        await sleep(mati_2);
        bun.innerText = "ぼく　こどもだけど　お金　これだけ持ってるよ！\n";
        await sleep(mati_2);
        bun.innerText += "おじさんは...　あ、";
        await sleep(mati_2);
        if( player.s >=1 ) {
            let hirumu_kakuritu = 30 ;
            let flag_kakuritu = getRandomInt(0, 100);
            console.log('hirumu_kakuritu'+hirumu_kakuritu);
            console.log('flag_kakuritu'+flag_kakuritu);
            if(hirumu_kakuritu >= flag_kakuritu) boss_hirumu = 1;
        }
        dame = kougeki_dame(player.a);   //ダメーーーーーーーじ
        console.log('ダメージ'+dame);
        boss.hp -= dame;
        await sleep(mati_1);
        bun.innerText += "\nボスは　" + dame + "ダメージ　受けた";
        update_BossHp();
        break;

    case 8: //バフ
        bun.innerText = "ぼくは　阿弥陀の光も　をくりだした";
        await sleep(mati_2);
        bun.innerText = "阿弥陀に　お金を捧げ　祈った\n";
        await sleep(mati_2);
        bun.innerText += "結局は　阿弥陀も　お金には負けるのだ\n";
        await sleep(mati_2);
        amida = 4;
        document.getElementById('player-a-up').style.display = 'block';
        player.a = player_hozon.a + Math.round(player_hozon.a * 0.25);
        console.log('主人公火力'+ player.a);
        bun.innerText += "ぼくの　攻撃力が　上がった\n";
        break;

    case 9: //デバフ
        bun.innerText = "ぼくは　地獄の沙汰も　をくりだした";
        await sleep(mati_2);
        bun.innerText = "閻魔に　賄賂を　送ろう\n";
        await sleep(mati_2);
        bun.innerText += "結局は　閻魔も　お金には負けるのだ\n";
        await sleep(mati_2);
        enma = 4;
        document.getElementById('boss-a-down').style.display = 'block';
        boss.a = Math.round(boss_hozon.a*0.75);
        console.log('ボス火力'+ boss.a);
        bun.innerText += "ボスの　攻撃力が　下がった\n";
        break;

    case 10: //リジェネお金
        bun.innerText = "ぼくは　辛抱する木に　をくりだした";
        await sleep(mati_2);
        bun.innerText = "いやなことも　我慢の先に　幸福があるんだ\n";
        await sleep(mati_2);
        kaneganaru = 5;
        bun.innerText += "ダメージに応じて　お金が　手に入るぞ\n";
        document.getElementById('kaneganaru').style.display = 'block';
        break;
    }

    
    await sleep(mati_2);
  }


  //プレーヤーが行動する
  async function player_koudou(coin_kind) {
    if (coin_kind == 0) await player_tuuzyou(); //通常攻撃
    else await player_tokusyu(coin_kind); //お金攻撃
    if(amida>0){
        amida--;
        if(amida==0){
            document.getElementById('player-a-up').style.display = 'none';
            player.a = player_hozon.a ;
            console.log('主人公火力'+ player.a);
            bun.innerText = "ぼくの　攻撃力が　元に戻った\n";
            await sleep(mati_3);
        }
    }
    if(kaneganaru>0){
        kaneganaru--;
        if(kaneganaru==0){
            document.getElementById('kaneganaru').style.display = 'none';
            bun.innerText = "辛抱する木に　の効果が　なくなった\n";
            await sleep(mati_3);
        }
    }
  }
