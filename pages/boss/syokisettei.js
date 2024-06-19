//ローカルストレージ用
let zandaka_num = localStorage.getItem("zandaka")
//zandaka_num = 30000;

// 勇者 ステータス 初期値
const syoki_player = {
    hp: 1000,
     s: 0,
     a: 100,
     coin: zandaka_num
};
let player = {
    hp: syoki_player.hp,
     s: syoki_player.s,
     a: syoki_player.a,
    coin: syoki_player.coin
};
let player_kyouka = {
    hp: 0,
     s: 0,
     a: 0
};
// ボス　ステータス
const maxhp = 40000;
let boss = {
    hp: maxhp,
     s: 0,
     a: 1600,
    max_hp: maxhp,
};
let boss_hozon = {
    hp: boss.hp,
     a: boss.a,
};

let player_hozon = {
    hp: 0,
    s: 0,
    a: 0,
    coin: 0
};

//boss.hp = 16000