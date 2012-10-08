if (!($ = window.jQuery)) {   
    script = document.createElement( 'script' );  
   	script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';  
    script.onload=imageGrok;  
    document.body.appendChild(script);  
}  
else {  
    imageGrok();  
}  
function imageGrok() {  
	$(document).ready(function(){
    	if($('#iG-container').length == 0) {
	    	$('html, body').animate({scrollTop:0}, 'fast');
	    	$('<style type="text/css">@import url(https://www.filepicker.io/api/file/3_h17xebTkK0NmPxcUoW);</style>').appendTo("head");
	    	$('body').append('<div id="background-blocker"></div><div id="iG-container"><div id="iG-close"><span id="close">Close</span></div><ul id="iG-list"></ul></div>');
	    	$("#iG-close").click(function() {
				$("#iG-container, #background-blocker").remove();
			})
		 	var iG = []
	    	$('img').each(function() {
					if (this.clientWidth > 99 && this.clientHeight > 49 && this.src.indexOf('.gif') < 0){
						iG.push(this)
					}
			});
			var iGFrameImgs = $('iframe').contents().find('img')
			if (iGFrameImgs.length > 0) {
				$.each(iGFrameImgs, function(){
					if (this.clientWidth > 99 && this.clientHeight > 49 && this.src.indexOf('.gif') < 0){
						iG.push(this)
					}
				})
			}
	    	console.log(iG.length)

			$.each(iG, function(){
				if (this.clientWidth > this.clientHeight){
					bgSize = "background-size:auto 100%;"
				}
				else {
					bgSize = "background-size:100%;"
				}
	
				finalLink = "<li style='background:url("+this.src+") center center no-repeat;"+bgSize+"'><a href='"+this.src+"'><span>+</span></a>"
				$('#iG-list').append(finalLink);
			})
			$('#iG-list a').click(function(e){
				e.preventDefault();
				iGlink = "http://localhost:3000/add_image?img="+this.href
				window.open(iGlink,'popup','width=600,height=340');
			})
	    }
	});
};  

