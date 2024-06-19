function Mario(posX,posY){
	// 定数
	this.NORMAL_JUMP_POWER = 12;
	this.DASH_JUMP_POWER = 14;
	this.addPosX = 0;
	this.addPosY = 0;
	this.posX = posX;
	this.posY = posY;

	// ダッシュフラグ
	this.isDash = false;

	// ジャンプ
	this.isJump = false;
	this.jumpCnt = 0;
	this.jumpPower = 0;

	// マップチップ座標
	this.rightMapX = 0;
	this.leftMapX = 0;
	this.upMapY = 0;
	this.downMapY = 0;

	// スクロール処理
	this.maxDrawMapX = DRAW_MAX_MAP_X; 	// 最大の描画範囲のX
	this.minDrawMapX = 0;			// 最小の描画範囲X
	this.mapScrollX = 0;			// スクロール量X
	this.moveNumX = 0;				// 総移動量X

	this.state = NORMAL_STATE;
	this.height = 32;
	this.coinNum = 0;
}

/*
	描画関数
	ctx:context
	texture:img class
*/
Mario.prototype.draw = function(ctx,texture){
	ctx.drawImage(texture,0,0,32,32,this.posX,this.posY,32,32);
}

Mario.prototype.moveX = function(mapChip,moveX){
	// 加算量を代入する
	this.addPosX = moveX;
	// 移動後の加算量を渡すマップチップの状況に応じてx方向の加算量を決める
	this.collisionX(mapChip,this.moveNumX + this.addPosX);
	this.posX += this.addPosX;
	this.moveNumX += this.addPosX;
	// 座標の更新
	this.updateMapPositionX(this.moveNumX);
}

Mario.prototype.setIsDash = function(isDash){
	this.isDash = isDash;
}

/**
	ジャンプ動作ボタンが押された時にジャンプフラグを立てる
*/
Mario.prototype.setJumpSettings = function(isDash){
	if(!this.isJump){
		this.isJump = true;
		var jumpNum = isDash ? this.DASH_JUMP_POWER : this.NORMAL_JUMP_POWER;
		this.jumpPower = jumpNum;
	}
}

/**
	ジャンプ動作
	isPush : 対象のキーが押されているか
*/
Mario.prototype.jumpAction = function(isPush, mapChip){
	
	this.addPosY = this.jumpPower;
	this.collisionY(mapChip,this.posY - this.addPosY);
	this.posY -= this.addPosY;
	// 落下中はジャンプさせないようにする
	if(this.addPosY < 0){
		this.isJump = true;
	}
	// 落下量調整
	if(this.jumpPower > -MAX_GRAVITY){
		// 上昇中かつキーが押されている場合は下降量を減らす
		if(isPush && this.jumpPower > 0){
			this.jumpPower -= (GRAVITY_POWER - (GRAVITY_POWER / 2));
		}else{
			this.jumpPower -= GRAVITY_POWER;
		}
	}
}

/**
	x軸方向のマップチップ座標の更新

	posX : マップチップ更新対象となるx座標
*/
Mario.prototype.updateMapPositionX = function(posX){
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
	y軸方向のマップチップ座標の更新
*/
Mario.prototype.updateMapPositionY = function(posY){
	// y
	this.upMapY = Math.floor(posY / MAP_SIZE);		                 // 0-32で0,33-64で1
	this.downMapY = Math.floor((posY + MAP_SIZE - 1) / MAP_SIZE); // 0-32で0,33-64で1
	// 配列外チェック
	if(this.upMapY >= MAX_MAP_Y - 1) this.upMapY = MAX_MAP_Y - 1;
	if(this.upMapY < 0) this.upMapY = 0;
	if(this.downMapY >= MAX_MAP_Y - 1) this.downMapY = MAX_MAP_Y - 1;
	if(this.downMapY < 0) this.downMapY = 0;
}

/**
	マップチップ座標を更新する
*/
Mario.prototype.updateMapPosition = function(){
	this.updateMapPositionX(this.moveNumX);
	this.updateMapPositionY(this.posY);
	
	document.getElementById("distance").textContent = `${this.rightMapX}m`;
}

/**
	オブジェクトとの当たり判定X
*/
Mario.prototype.collisionX = function(map,posX){
	this.updateMapPositionX(posX);
	// マリオの右側
	if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.upMapY][this.rightMapX])){
		// (加算される前の)中心点からの距離を取る
		var vecX = Math.abs((this.moveNumX + HALF_MAP_SIZE) - ((this.rightMapX * MAP_SIZE) + HALF_MAP_SIZE));
		this.addPosX = Math.abs(MAP_SIZE - vecX);
	}
	// マリオの左側
	else if(isObjectMap(map[this.downMapY][this.leftMapX]) || isObjectMap(map[this.upMapY][this.leftMapX])){
		// (加算される前の)中心点からの距離を取る
		var vecX = Math.abs((this.moveNumX + HALF_MAP_SIZE) - ((this.leftMapX * MAP_SIZE) + HALF_MAP_SIZE));
		this.addPosX = -Math.abs(MAP_SIZE - vecX);
	}
}

/*
	オブジェクトとの当たり判定Y
*/
Mario.prototype.collisionY = function(map,posY){
	this.updateMapPositionY(posY);
	// マリオの上側に当たった場合
	if(isObjectMap(map[this.upMapY][this.rightMapX]) || isObjectMap(map[this.upMapY][this.leftMapX])){
		// (加算される前の)中心点からの距離を見る
		var vecY = Math.abs((this.posY + HALF_MAP_SIZE) - ((this.upMapY * MAP_SIZE) + HALF_MAP_SIZE));
		// Yの加算量調整
		this.addPosY = Math.abs(MAP_SIZE - vecY);
		// 落下させる
		this.jumpPower = 0;
	}
	// マリオの下側
	else if(isObjectMap(map[this.downMapY][this.rightMapX]) || isObjectMap(map[this.downMapY][this.leftMapX])){
		// (加算される前の)中心点からの距離を見る
		var vecY = Math.abs((this.posY + HALF_MAP_SIZE) - ((this.downMapY * MAP_SIZE) + HALF_MAP_SIZE));
		// Yの加算量調整
		this.addPosY = Math.abs(MAP_SIZE - vecY);
		// 地面についた
		this.posY += this.addPosY;
		this.addPosY = 0;
		this.jumpPower = 0;
		this.isJump = false;
	}
}

/**
	マリオの更新関数
*/
Mario.prototype.update = function(mapChip){
		// マップ座標の更新
		this.updateMapPosition();
		// 左キーが押されている状態
		if(gLeftPush){
	    	if(gSpacePush){
	    	    this.setIsDash(true);
				this.moveX(mapChip,-DASH_SPEED);
	    	}else{
	    	  this.setIsDash(false);
	    	  this.moveX(mapChip,-NORMAL_SPEED);
	    	}
		}
		// →キーが押されている状態
		if(gRightPush){
	    	if(gSpacePush){
	    	    this.setIsDash(true);
				this.moveX(mapChip,DASH_SPEED);
	    	}else{
	    	  this.setIsDash(false);
	    	  this.moveX(mapChip,NORMAL_SPEED);
	    	}
		}

		// ジャンプ動作
		if(gUpPush){
	    	// ジャンプ設定をオンにする
	    	this.setJumpSettings(gSpacePush);
	  	}
		// ジャンプ処理
		this.jumpAction(gUpPush,mapChip);
		// マップチップアイテムオブジェクトとの当たり判定
		this.collisionWithMapItem(mapChip);	
	
}

/**
  アイテムマップチップオブジェクトとの当たり判定
  map : マップチップ
*/
Mario.prototype.collisionWithMapItem = function(map){
	var mapsX = [this.rightMapX,this.leftMapX];
	var mapsY = [this.upMapY,this.downMapY];
	for(var y = 0;y < 2;++y){
	  for(var x = 0;x < 2;++x){
		// コインとの当たり判定
		if(isCoinMap(map[mapsY[y]][mapsX[x]])){
		  // マップチップと空のマップを入れ替える
		  replaceEmptyMap(map,mapsX[x],mapsY[y]);
		  // コインを取得した時の処理
		  this.getCoin();
		}
	  }
	}
}

/**
  コインを取得した時の処理
*/
Mario.prototype.getCoin = function(){
	this.coinNum++;
	document.getElementById("money").textContent = `所持金：${this.coinNum * 100}円`;
  }