// 如果机器性能不行，可以考虑哈图片预加载



/**
 * JS简易随机数
 * @param  {Number} max 最大值
 * @return {Number}     随机值
 */
function random(max) {
	return Math.floor(Math.random() * (max + 1));
}

/**
 * 检查是否全部抽取完成
 * @return {Boolean} true:全部完成 false:未完
 */
function checkAllDone() {
	var employees = window.employees;
	var rs = true;
	for (var i = 0; i < employees.length; i++) {
		if (!employees[i].done) {
			rs = false;
			break;
		}
	}
	return rs;
}


/**
 * 获取真实不重复的随机索引Index
 * @return {Number} 不重复的随机索引
 */
function getRandomIndex() {
	var ran;
	if (checkAllDone()) {
		return false;
	}
	do {
		ran = random(window.employees.length - 1);
	}
	while (!checkAllDone() && window.employees[ran].done)
	window.employees[ran].done = true;

	return ran;

}

/**
 * 渲染头像和个人信息
 * @param  {Object} data 人员信息
 * @return {String}      渲染好的DOM String
 */
function render(data) {
	var tpl = '<div><img src="asset/' + data.img + '" alt=""><h1 class="person-name">' + data.name + '</h1></div>';
	return tpl;
}

/**
 * 渲染抽中人的列表
 * @param  {Array} arr 中奖人的列表
 * @return {String}    中奖人DOM String
 */
function renderLuckyArray(arr) {
	var tpl = "";
	for (var i = 0; i < arr.length; i++) {
		tpl += '<span class="item" onclick="addWinner(\'' + arr[i].name + ':' + arr[i].img + '\');">' + '&nbsp;' + arr[i].name +'&nbsp;' + '</span>';
	}
	return tpl;
}


/**
 * 拿取中奖人DOM String嵌入到DOM
 * @param  {Object} data  中奖人信息
 * @param  {DOM} toEle 目标DOM
 * @return {[type]}       [description]
 */
function renderPerson(data, toEle) {
	var tpl = render(data);
	toEle.innerHTML = tpl;
}