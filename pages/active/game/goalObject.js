function Goal(posX){
	this.posX = posX;
    this.flagY = 64;
    this.money = 0;
}

/**
 * 
 * マリオとゴールとの当たり判定
 * @param {*} mario
 */
Goal.prototype.collisionWithMario = function(mario){
    if(mario.goalAnimationState == INACTIVE){
        // y軸 マリオの下とポールの上
        if(0 <= mario.posY + mario.height){
            // y軸 マリオの上とポールの下
            if(448 >= mario.posY){
                // x軸:ポールの右とマリオの左(幅はポールに合わせる)
                if(this.posX + 19.5 >= mario.moveNumX){
                    // ポールの左とマリオの右
                    if(this.posX + 14.5 <= mario.moveNumX + 32){
                        // 高さに応じて、スコアを決定する
                        this.defineMoney(mario.posY);
                        // マリオにゴールアニメーション用のセットさせる
                        mario.setGoalAnimation(this.posX - 16);
                        
                    }
                }
            }
        }
    }      
}

/**
 * スコアを決定して加算する
 * @param {*} posY 
 */
Goal.prototype.defineMoney = function(posY){
    if(posY <= 64){
        this.money = 800;
    }
    else if(posY > 64 && posY <= 128){
        this.money = 400;
    }
    else if(posY > 128 && posY <= 192){
        this.money = 200;
    }
    else{
        this.money = 100;
    }
    moneyTotal += this.money;
    money_add += this.money;

    document.getElementById("money_add").textContent = `+${this.money}`;
	window.setTimeout(function(){
		document.getElementById("money_add").textContent = "";
	}, 1000);
}

/**
 * 更新関数
 * @param {*} mario 
 */
Goal.prototype.update = function(mario){
    this.collisionWithMario(mario);
}