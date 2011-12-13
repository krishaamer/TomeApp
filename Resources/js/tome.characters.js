/*
 * TOMÉ iPhone App
 * functionality related to the Videos tab 
 * code written by Kris Haamer kris.haamer@gmail.com
 */

// Create a scrollable view w/ videos
Tome.createCharacterView = function(zIndex) {
	
	var src = Tome.uri.videos;
	var videos = Tome.uri.list.characters;
	var views = Tome.getViewsAndButtons(src, videos, true);
	
	// Create main window
	var w1 = Tome.createDefaultWindow(-800);

	// Scrollabe view of videos
	var scroll = Ti.UI.createScrollableView({
	    views: views,
	    showPagingControl:true,
	    clipViews:true,
        top:0,
        height:480,
        width: 360,
        opacity:1,
        backgroundColor:'#000'
	});
	w1.add(scroll);
	
	// Video title
	var title = Ti.UI.createLabel({
        text:'ads',
        font:{
            fontFamily: Tome.ui.defaultFont,
            fontWeight:'bold',
            fontSize:20
        },
        color:'#fff',
        shadowColor:'#333',
        shadowOffset:{x:1,y:1},
        textAlign:'center',
        width:Ti.Platform.displayCaps.platformWidth,
        height:40,
        top:0,
        opacity:0,
        zIndex:9999
	});
	w1.add(title);
	
	// Change video title when scrolling
	scroll.addEventListener('scroll',function(){
	    title.text = views[scroll.currentPage].title;
	});
	
	// Fade video title
	title.animate({
	    opacity:1,
	    duration:500
	});
	
	return w1;
};