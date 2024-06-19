function Kuribo(posX,posY,dir){
    this.posX = posX;
    this.posY = posY - 32;
    // 敵の移動
	this.addPosX = 0;
    this.direction = dir;

    // マップチップ座標
    this.rightMapX = 0;
    this.leftMapX = 0;
    this.upMapY = 0;
    this.downMapY = 0;

	this.state = NORMAL_STATE;
	this.height = 32;

	this.animY = 0;
	this.deadCnt = 0;
}
  
  /**
    描画関数
    ctx:context
    texture:img class
    scrollX:X軸のスクロール量
  */
Kuribo.prototype.draw = function(ctx,texture,scrollX){
	if(this.state != DEAD){
    	ctx.drawImage(texture,0,0,32,64,this.posX - scrollX,this.posY,32,64);
	}
}

/*
	動かす役割

	moveNum:移動量
*/
Kuribo.prototype.move = function(mapChip,moveNum){
    this.updateMapPosition();
	// 向きにより加算量を調整する
	moveNum = this.direction == LEFT_DIR ? -moveNum : moveNum;
	// 加算量を代入する
	this.addPosX = moveNum;
    // マップチップとの当たり判定
    this.collisionX(mapChip,this.posX + this.addPosX);
	this.posX += this.addPosX;
}

/**
	x軸方向のマップチップ座標の更新

	posX : マップチップ更新対象となるx座標
*/
Kuribo.prototype.updateMapPositionX = function(posX){
	// x座標
	this.leftMapX = Math.floor(posX / MAP_SIZE);
	this.rightMapX = Math.floor((posX + MAP_SIZE - 1) / MAP_SIZE);

	// 配列外チェック
	if(this.leftMapX >= MAX_MAP_CHIP_X) this.leftMapX = MAX_MAP_CHIP_X - 1;
	if(this.leftMapX < 0) this.leftMapX = 0;
	if(this.rightMapX >= MAX_MAP_CHIP_X) this.rightMapX = MAX_MAP_CHIP_X - 1;
	if(this.rightMapX < 0) this.rightMapX = 0;
}

/**
	Y軸方向のマップチップの更新
*/
Kuribo.prototype.updateMapPositionY = function(posY){
	// y
	this.upMapY = Math.floor(posY / MAP_SIZE);
	this.downMapY = Math.floor((posY+32 + MAP_SIZE - 1) / MAP_SIZE);

	// 配列外チェック
	if(this.upMapY >= MAX_MAP_Y - 1) this.upMapY = MAX_MAP_Y - 1;
	if(this.upMapY < 0) this.upMapY = 0;
	if(this.downMapY >= MAX_MAP_Y - 1) this.downMapY = MAX_MAP_Y - 1;
	if(this.downMapY < 0) this.downMapY = 0;
}

/**
	マップチップ座標を更新する
*/
Kuribo.prototype.updateMapPosition = function(){
	this.updateMapPositionX(this.posX);
	this.updateMapPositionY(this.posY);
}

/**
	オブジェクトとの当たり判定X
*/
Kuribo.prototype.collisionX = function(map,posX){
	this.updateMapPositionX(posX);
	// クリボの右側
	if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.upMapY][this.rightMapX]) || !(isObjectMap(map[this.downMapY+1][this.rightMapX]))){
		// (加算される前の)中心点からの距離を取る
		var vecX = Math.abs((this.posX + HALF_MAP_SIZE) - ((this.rightMapX * MAP_SIZE) + HALF_MAP_SIZE));
		this.addPosX = Math.abs(MAP_SIZE - vecX);
		// 方向を変える
		this.direction = LEFT_DIR
	}
	// クリボの左側
	else if(isObjectMap(map[this.downMapY][this.leftMapX]) || isObjectMap(map[this.upMapY][this.leftMapX]) || !(isObjectMap(map[this.downMapY+1][this.leftMapX]))){
		// (加算される前の)中心点からの距離を取る
		var vecX = Math.abs((this.posX + HALF_MAP_SIZE) - ((this.leftMapX * MAP_SIZE) + HALF_MAP_SIZE));
		this.addPosX = -Math.abs(MAP_SIZE - vecX);
		// 方向変える
		this.direction = RIGHT_DIR;
	}
}

/*
	キャラクターとの当たり判定
	mario:キャラクタークラス
*/
Kuribo.prototype.collisionWithMario = function(map,mario){
	// x軸
	if(mario.moveNumX < this.posX + 32 && mario.moveNumX + 32 > this.posX){
		// マリオの上とクリボの下(クリボは32*32で切り取られているので、最下部は32+される)
		if(mario.posY < this.posY + 64){
			// マリオの下とクリボの上
			// 踏みつけ判定(キャラの半分より上の場合踏みつけと判定させる)
			// マリオの下がクリボの上よりも下にある場合
		 	if(mario.posY + mario.height > this.posY + (32 - this.height)){
				// マリオの下がクリボの中間地点よりも上にある場合
				if(mario.posY + mario.height <= this.posY + (32 - this.height) + (this.height / 2)){
					// 潰れたアニメーションにする
					this.state = DEAD_ACTION;
					this.animY = 64;
					this.direction = LEFT_DIR;
					mario.jumpPower = STEP_UP_NUM;
					
					STAGE_TIMES += 5;
					document.getElementById("time_add").textContent = "+5";
					window.setTimeout(function(){
						document.getElementById("time_add").textContent = "";
					}, 1000);
				}else{
					mario.collisionWithEnemy();
				}
			}
		}
	}
}


/**
	クリボの更新処理
*/
Kuribo.prototype.update = function(map,mario,moveNum){
	if(!this.isDead()){
		this.move(map,moveNum);
		this.collisionWithMario(map,mario);
	}
	this.deadAction();
}

/**
	死亡時のアニメーション
*/
Kuribo.prototype.deadAction = function(){
	if(this.state == DEAD_ACTION){
		if(this.deadCnt++ == DEAD_ANIM_FRAME){
			this.state = DEAD;
		}
	}
}

/**
	死亡判定
*/
Kuribo.prototype.isDead = function(){
	if(this.state >= DEAD_ACTION){
		return true;
	}
	return false;
}

