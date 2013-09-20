if (!($ = window.jQuery)) {
	script = document.createElement( 'script' );
	if (location.protocol === "https:") {
		script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	} else {
		script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	}
	script.onload=imageGrok;
	document.body.appendChild(script);
}
function imageGrok() {
	$(document).ready(function(){
		if($('#iG-container').length === 0) {
			$('html, body').animate({scrollTop:0}, 'fast');
			if (!$('head').html()) {
				$('<head></head>').insertBefore('body');
			}

			$('<style type="text/css">@import url(https://www.cord.ly/grok.css);</style>').appendTo("head");
			$('body').append('<div id="background-blocker"></div><div id="iG-container"><div id="iG-close"><span id="close">Close</span></div><ul id="iG-list"></ul></div>');
			$("#iG-close").click(function() {
				$("#iG-container, #background-blocker").remove();
			});

			// Container to hold all your awesome images
			var iG = [];

			// Yes I know $.each is technically slower than a for loop but it's way prettier
			$('img').each(function(){
				if (this.width > 199 && this.height > 149 && this.src.indexOf('.gif') < 0) {
					iG.push(this);
				}
			});

			// If you don't plan on iframe busting I would remove this function as it's the slowest of the bunch
			if ($('iframe')) {
				$('iframe').each(function (){
					var a = document.createElement("a");
					a.href = this.src;
					if (a.hostname === window.location.host) {
						$(this).contents().find('img').each(function(){
							if (this.width > 199 && this.height > 149 && this.src.indexOf('.gif') < 0) {
								iG.push(this);
							}
						});
					}
				});
			}

			// Because Instagram uses divs with src props that act like images
			$('div').each(function(){
				imgDiv = $(this).attr('src');
				if (imgDiv) {
					a = new Image();
					a.src = imgDiv;
					if (a.width > 199 && a.height > 149 && a.src.indexOf('.gif') < 0) {
						iG.push(a);
					}
				}
			});


			$.each(iG, function(){
				if (this.clientWidth > this.clientHeight){
					bgSize = "background-size:auto 100%;";
				}
				else {
					bgSize = "background-size:100%;";
				}

				finalLink = "<li style='background:url("+this.src+") center center no-repeat;"+bgSize+"'><a href='"+this.src+"'><span>+</span></a>";
				$('#iG-list').append(finalLink);
			});

			$('#iG-list a').click(function(e){
				e.preventDefault();
				iGHost = window.location.host;
				iGLink = "<your url here>?img="+this.href+"&host="+iGHost;
				window.open(iGLink,'popup','width=600,height=340');
			});
		}
	});
}

	imageGrok();