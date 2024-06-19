/**
  引数のマップチップ数が通れないと判定される
  objectマップかどうか
*/
function isObjectMap(mapNumber){
    if(mapNumber == 1 || mapNumber == 3){
      return true;
    }
    return false;
}

/**
  引数のマップチップ番号が
  コインのマップチップかどうか返す

  mapNumber : マップチップ番号
*/
function isCoinMap(mapNumber){
  if(mapNumber == 2){
    return true;
  }
  return false;
}

/**
  対象のマップチップに空のマップに入れ替える

  map : マップチップ配列
  mapX : map indexX
  mapY : map indexY
*/
function replaceEmptyMap(map,mapX,mapY){
  map[mapY][mapX] = NOT_DRAW_MAP;
}