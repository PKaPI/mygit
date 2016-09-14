	var oDiv = document.getElementById("canvas");
	var Oimg=oDiv.getElementsByTagName("img");
	var Imaglength = Oimg.length;
	function images_loading_bar() {
		var count = 0;
		for (i = 0; i < Imaglength; i++)
		count += (Oimg[i].complete) ? 1 : 0;//complete图像是否完全加载；
		var spanL=document.getElementById("LB1");
		spanL.style.width = Math.round(count / Imaglength * 100) + 'px';
		if (count == Imaglength){
			setTimeout("document.getElementById('LB0').style.display='none'", 200);
		}
		else 
		setTimeout("images_loading_bar()", 64);
	};
	images_loading_bar();