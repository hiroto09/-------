var CANVAS_WIDTH = 960;

var RIGHT_DIR = 1;
var LEFT_DIR = 0;

var MAX_MAP_X = 30;
var MAX_MAP_Y = 15;

var DASH_SPEED = 5;
var NORMAL_SPEED = 3;

// 重力値
var GRAVITY_POWER = 1;
// 最大の重力量
var MAX_GRAVITY = 8;
// マップの大きさ
var MAP_SIZE = 32;
var HALF_MAP_SIZE = MAP_SIZE / 2;

// x座標のスクロール開始地点
var SCROLL_POINT_X = (CANVAS_WIDTH / 2) - (MAP_SIZE / 2);
// マップチップの最大描画範囲(画面外+1のマップチップも描画させる)
var DRAW_MAX_MAP_X = MAX_MAP_X + 1;
// 最大のマップチップ量X
var MAX_MAP_CHIP_X = 1120;

var NORMAL_STATE = 1;
// 死んだ時のアニメーション
var DEAD_ACTION = 100;
// 死んでいる状態
var DEAD = 101;

var DEAD_ANIM_FRAME = 60;
var STEP_UP_NUM = 13;

var NOT_DRAW_MAP = 0;

var INACTIVE = -1;

let INVINCIBLE_TIME = 120;

let NONE_ANIMATION = -1;
let GOAL_ANIMATION_DOWN = 2;
let GOAL_ANIMATION_WALK = 3;
let GOAL_ANIMATION_TIME_CNT = 4;
let GOAL_ANIMATION_END = 5;

// 各々のステージごとに決められた制限時間
let STAGE_TIMES = 30;