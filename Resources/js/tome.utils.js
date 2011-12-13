/*
 * TOMÉ iPhone App
 * utils used by other functionality
 * code written by Kris Haamer kris.haamer@gmail.com
 */

// Create a view with default style
Tome.createDefaultWindow = function (zIndex) {
		
	// Create a new window with default settings
	var w1 = Ti.UI.createWindow({
		
		backgroundColor: Tome.ui.bgColor,
	    borderColor: Tome.ui.borderColor,
	    borderWidth: Tome.ui.borderWidth,
	    dashboardHeight: Tome.ui.dashboardHeight,
	    dashboardWidth: Tome.ui.dashboardWidth,
	    barImage: Tome.ui.barImage,
	    opacity: Tome.ui.defaultOpacity,
	    zIndex: zIndex,
	    backButtonTitle: Tome.ui.backButtonTitle,
	    barColor: Tome.ui.barColor,
	    bottom: Tome.ui.contentBottom
	})
	
	return w1;	
};


// Create Views and buttons from data
Tome.getViewsAndButtons = function(src, e, createButton) {
	var views = [];
	var i=0;
	while (i < e.length) { 
		
		var image = Ti.UI.createImageView({
			image:src + e[i].img,
			width:Ti.Platform.displayCaps.platformWidth,
			height:Ti.Platform.displayCaps.platformHeight-40,
			hires:true
		});
		
		e[i].view = Ti.UI.createView({
			width:Tome.ui.dashboardWidth,
			height: 300,
			top:40,
			borderColor: Tome.ui.borderColor,
       		borderWidth: Tome.ui.borderWidth
			//backgroundImage:src + e[i].img
		});
		e[i].view.add(image);
		
		if(createButton) {
			var btn = Ti.UI.createButton({
				width:200, 
				height:30,
				top:20, 
				title: Tome.dict.playMovie + e[i].title    
			});
			
			// use a closure to refrain from exposing this into global scope
			(function (li) { 
				btn.addEventListener('click', function() { 
					Tome.openTrailerWindow(src+li); 
				}); 
			}(e[i].vid));
		
			e[i].view.add(btn);
		}
		views[i] = e[i].view;
		i++;  
	};
	
	return views;
};

Tome.openTrailerWindow = function(url) {
	
	// Create a window
	var w1 = Ti.UI.createWindow({
		backgroundColor: Tome.ui.bgColor
	});
	w1.open({
		modal:true,
		modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE,
		modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET,
		navBarHidden:true
	});
	
	// Create player and add to window
	var player = Ti.Media.createVideoPlayer();
	player.setUrl(url);
	w1.add(player);
	
	// Create video overlay
	var label = Ti.UI.createLabel({
		text:Tome.dict.videoLabel,
		width:'auto',
		height:35,
		color:'white',
		font:{fontSize:24,fontFamily:Tome.defaultFont}
	});
	player.add(label);
	
	// Listen to click on Video
	player.addEventListener('click',function(){
		//label.text = "You clicked the video label. Sweet!";
		player.stop();
		w1.close();
	});
	
	// Play the video
	player.play();
	
	// Listen to window closing
	w1.addEventListener('close', function() {
		//alert("Window closed");
		player.stop();
	});
};

/*
// Create a popup window to say hi to the user
Tome.openPopup = function(msg) {
	
	// create window
	var w1 = Ti.UI.createWindow({
		height:140,
		width:280,
		touchEnabled:false
	});
	
	// add background
	var bg = Ti.UI.createView({
		height:140,
		width:280,
		backgroundColor:'#000',
		borderRadius:15,
		opacity:0.8,
		touchEnabled:false
	});
	w1.add(bg);	
	
	// add message
	var message = Ti.UI.createLabel({
		text:msg,
		color:'#fff',
		textAlign:'center',
		font:{fontSize:28,fontWeight:'bold'},
		height:'auto',
		width:'auto'
	});
	w1.add(message);
	w1.open();

	// animate window
	var a = {delay: 1500, duration: 1000, opacity: 0.1};
	a.transform = Ti.UI.create2DMatrix().translate(-200,200).scale(0);
	w1.animate(a, function() {
		w1.close();
	});
};

*/

/*
 
Tome.createTitles = function(zIndex) {
	
	//View title
	var label = Ti.UI.createLabel({
	    text:'TOMÉ',
        font:{
            fontFamily:'Helvetica Neue',
            fontWeight:'bold',
            fontSize:30
        },
        color:'#FFF',
        textAlign:'center',
        width:Ti.Platform.displayCaps.platformWidth,
        height:58,
	});
	
	// View title background
	var view = Ti.UI.createView({
        width:Tome.ui.dashboardWidth,
        height:Tome.ui.dashboardHeight,
        backgroundImage:'',
        top:60,
        left:0,
        opacity:0,
        zIndex: -999
	});
	view.add(label);
	
	// Fade the view title in
	view.animate({
	    opacity:1,
	    duration:500
	});
	
	return view;
};



Tome.createNav = function(w1, labels, zIndex) {
	
	var bar = Ti.UI.createTabbedBar({
		labels:labels,
		backgroundColor: Tome.ui.menuBGColor,
		style:Ti.UI.iPhone.SystemButtonStyle.BAR,
		width: Tome.ui.dashboardWidth,
		bottom:0,
		height:50,
		opacity:100,
		zindex: zIndex
	});
	
	bar.addEventListener('click', function(e) {
		
		if (e.index == 0) {
			//Story: close Videos and Director
			Tome.nav.open(story);
			
		} else if (e.index == 1) {
			//Videos: close Story and Director
			videos.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
			story.close();
			director.close();
			
		} else if (e.index == 2) {
			//Director: close Story and Videos
			director.open({transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
			story.close();
			videos.close();
		};
	});
	
	return bar;
};

*/