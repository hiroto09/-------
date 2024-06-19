//ボスが行動する
let boss_hirumu = 0;

async function boss_koudou() {
  if (boss_hirumu === 1) {
    bun.innerText = "ボスは　ひるんで動けない";
    boss_hirumu = 0;
    await sleep(mati_2);
    return; 
  }
    if(boss_kaihukusita == 0 && boss_kaihukusuru == 1){
      bun.innerText = "ボスが　薬を吸い始めた";
      await sleep(mati_1);
      boss.hp += Math.floor(maxhp/2) ;
      boss.a = boss_hozon.a*2;
      boss_hozon.a = boss.a;
      if(enma>0){
          boss.a = Math.round(boss_hozon.a*0.75);
      } 
      update_BossHp();
      bun.innerText = "ボスの　HPが　" + Math.floor(maxhp/3)+"　回復した";
      await sleep(mati_1);
      bun.innerText += "\nボスの　攻撃が　これまでより　強力になってしまった";
      console.log('ボス火力'+boss.a)
      await sleep(mati_3);
      boss_kaihukusita = 1;
    }
    else{
      boss_patterm = Math.floor(Math.random() * 5) + 1;
      console.log("ボスパターン"+boss_patterm);
      if(boss_patterm <= 3) {
        bun.innerText = "ボスの　攻撃";
        dame = kougeki_dame(boss.a);    //ダメーーーーーーーじ
        console.log('ダメージ'+dame);
        player.hp -= dame;
        await sleep(mati_1);
        bun.innerText += "\nぼくは　" + dame + "ダメージ　受けた";
        update_Hp();
        await sleep(mati_2);
        await kaneganatta(dame);
        //boss_patterm++;
      }
      else if(boss_patterm <= 4){
        bun.innerText = "ボスが　蹴り上げてきた";
        dame = kougeki_dame(boss.a) * 2;   //ダメーーーーーーーじ
        console.log('ダメージ'+dame);
        player.hp -= dame;
        await sleep(mati_1);
        bun.innerText += "\nぼくは　" + dame + "ダメージ　受けた";
        update_Hp();
        await sleep(mati_2);
        await kaneganatta(dame);
        //boss_patterm++;
      }
      else if(boss_patterm <= 6){
      bun.innerText = "ボスが　お金を取ろうとしている";
        dame = kougeki_dame(boss.a) ;  //お金にダメーーーーーーーじ
        console.log('ダメージ'+dame);
        player.coin -= dame;
        await sleep(mati_1);
        bun.innerText += "\nお金を　" + dame + "　取られた";
        update_Coin();
        await sleep(mati_2);
        //boss_patterm=1;
      }
    }  
    if(enma>0){
      enma--;
      if(enma==0){
          document.getElementById('boss-a-down').style.display = 'none';
          boss.a = boss_hozon.a;
          console.log('ボス火力'+ boss.a);
          bun.innerText = "ボスの　攻撃力が　元に戻った\n";
          await sleep(mati_3);
      }
    }
  }

  async function kaneganatta (bokuni_dame){
    if(kaneganaru <= 0) return;
    let get = Math.round(kougeki_dame(bokuni_dame)*0.2); 
    player.coin += get; 
    update_Coin();
    bun.innerText = "金がなった\n";
    await sleep(mati_1);
    bun.innerText += "ぼくは　" +get+ "　手に入れた";
    await sleep(mati_3);
  }