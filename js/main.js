<<<<<<< HEAD
//hotfix master
=======
//测试git rebase
>>>>>>> 487fb13e39a8f17a3ea32c97bd61a1f9c4799bdb
var id = function(o){
	return document.getElementById(o);
}
//hotfix 文件修改
var px = function (x) {       //返回一个0~x之间的随机数px
	return ''.concat(Math.round(x), 'px'); 
} 
//hotfix2 文件修改
//////////////////////////////////////////////////////////////////////////////
function resize() {	
	gf.resize();
}
//文件修改
onresize= resize;
 
document.onmousemove = function(e)
{
	if(window.event) e=window.event;
	gf.xm = (e.x || e.clientX) - gf.nx - gf.nw * .5;     //100-300-50=-250
	gf.ym = (e.y || e.clientY) - gf.ny - gf.nh * .5;
}
 
//////////////////////////////////////////////////////////////////////////////
var gf = {//默认参数
	O    : [],//用来存储图片的默认参数
	cont : 0,//获取的canvas
	N    : 0,//img数组的长度
	S    : 0,
	img  : 0,//获取的img数组
	spa  : 0,//获取的span数组
	xm   : 0,//x轴偏移量
	ym   : 0,//y轴偏移量
	nx   : 0,//盒子距左边的距离
	ny   : 0,//距上边的距离
	nw   : 0,//盒子的宽度
	nh   : 0,//盒子的高度
	cx   : 0,
	cy   : 0,
	zoom : 1,
	x    : 0,
	y    : 0,
	z    : -40000,
	xt   : 0,
	yt   : 0,
	zt   : 0,
   
//////////////////////////////////////////////////////////////////////////////
   resize : function ()
	{
		var o   = id('canvas');//选定容器
		gf.nx   = o.offsetLeft;//盒子距左边的距离
		gf.ny   = o.offsetTop;//距上边的距离
		gf.nw   = o.offsetWidth;//盒子的宽度
		gf.nh   = o.offsetHeight;//盒子的高度
		gf.zoom = gf.nh / 700;
	},
 
	CObj : function (n)//构造函数
	{
		this.n                = n;
		this.x                = gf.zoom * Math.random() * gf.nw * 2 - gf.nw;
		this.y                = gf.zoom * Math.random() * gf.nh * 2 - gf.nh;
		this.z                = Math.round(n * (10000 / gf.N));
		this.w                = gf.img[n].width;//图片的宽
		this.h                = gf.img[n].height;//图片的高
		this.oxt              = gf.spa[n];//选取span标签
		this.oxs              = this.oxt.style;//获取span 标签样式
		this.txt              = gf.spa[n].innerHTML;//获取span标签html内容;
		this.oxt.innerHTML    = "";//将所有span标签设置为空
		this.obj              = gf.img[n];//获取图片
		this.obs              = this.obj.style;//获取图片样式
		this.obj.parent       = this;//选取图片的父级作为事件源
		this.obj.onclick      = function() { this.parent.click(); }//为图片添加点击事件
		this.obj.ondrag       = function() { return false; }//为图片增加拖拽事件
		this.oxt.style.zIndex = this.obj.style.zIndex = Math.round(1000000 - this.z);//设置图片的z-index,并且大于当前图片this的index
		this.F                = false;
		this.CF               = 100;
		this.sto              = [];
		
		this.anim = function()
		{
			var f = 700 + this.z - gf.z;
			if (f > 0)
			{
				var d               = 1000 / f;
				var X               = gf.nw * .5 + ((this.x - gf.x - gf.cx) * d);
				var Y               = gf.nh * .5 + ((this.y - gf.y - gf.cy) * d);
				var W               = d * this.w * gf.zoom;
				var H               = d * this.h * gf.zoom;
				this.obs.left       = px(X - W * .5);
				this.obs.top        = px(Y - H * .5);
				this.obs.width      = px(W);
				this.obs.height     = px(H);
				this.oxs.visibility = (this.CF-- > 0 && Math.random() > .9) ? "hidden" : "visible";
				this.oxs.left       = px(X - W * .5);
				this.oxs.top        = px(Y + H * .5);
				if((gf.zt - gf.z) < 20)
				{
					if(!this.F)
					{
						this.F            = true;
						this.CF           = Math.random() * 200;
						this.oxs.fontSize = px(1 + d * 20 * gf.zoom);
						var T             = "";
						var tn            = this.txt.length;
						for(var i = 0; i < tn; i++)
						{
							T = T.concat(this.txt.charAt(i));
							this.sto[i] = setTimeout('gf.O['.concat(n, '].oxt.innerHTML = "', T.concat("_"), '";'), Math.round(f / 4) + 32 * i);
						}
					}
				}
				else
				{
					this.F = false;
					this.oxt.innerHTML = "";
				}
			}
			else
			{
				this.x  = gf.zoom * Math.random() * gf.nw * 2 - gf.nw;
				this.y  = gf.zoom * Math.random() * gf.nh * 2 - gf.nh;
				this.z += 10000;
				this.oxs.zIndex = this.obs.zIndex = Math.round(1000000 - this.z);
			}
		}
	
		this.cto = function()
		{
			var i = this.txt.length;
			while (i--) clearTimeout(this.sto[i]);
		}
	
		this.click = function()
		{
			var i = gf.N;
			while (i--) gf.O[i].cto();
			if(gf.S != this)
			{
				gf.xt = this.x;
				gf.yt = this.y;
				gf.zt = this.z;
				gf.S  = this;
			}
			else
			{
				gf.S   = 0;
				gf.zt += 1600;
			}
		}
	},
	
	init : function ()
	{
		gf.cx   = gf.nw / 2;
		gf.cy   = gf.nh / 2;
		gf.cont = id("canvas");
		gf.img  = id("canvas").getElementsByTagName("img");
		gf.spa  = id("canvas").getElementsByTagName("span");
		gf.N    = gf.img.length;
		for (var i = 0; i < gf.N; i++) 
		gf.O[i] = new gf.CObj(i);
		gf.run();
		gf.O[0].click();
	},
	
	run : function ()
	{
		gf.cx += (gf.xm - gf.cx) * .1;
		gf.cy += (gf.ym - gf.cy) * .1;
		gf.x  += (gf.xt - gf.x)  * .05;
		gf.y  += (gf.yt - gf.y)  * .05;
		gf.z  += (gf.zt - gf.z)  * .05;
		var i = gf.N;
		while (i--)
		gf.O[i].anim();
		setTimeout(gf.run, 16);
	}
}
 
window.onload = function() {
	resize();
	gf.init();
}