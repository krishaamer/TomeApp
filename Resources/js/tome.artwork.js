/*
 * TOMÉ iPhone App
 * functionality related to the Story tab 
 * code written by Kris Haamer kris.haamer@gmail.com
 */

//createAboutWindow
Tome.createArtworkView = function(zIndex) {
	
	var src = Tome.uri.paintings;
	var paintings = Tome.uri.list.paintings;
	var views = Tome.getViewsAndButtons(src, paintings, false);
	
	// Create window
    var w1 = Tome.createDefaultWindow(-900);
    
	// Scrollable view of videos
	var scroll = Ti.UI.createScrollableView({
	    views: views,
	    showPagingControl:true,
	    clipViews:true,
        top:0,
        height:480,
        width: 360,
        opacity:1,
        backgroundColor:Tome.ui.bgColor
	});
	w1.add(scroll);
	
	// Video title
	var title = Ti.UI.createLabel({
        text:'ads',
        font:{
            fontFamily:Tome.ui.defaultFont,
            fontWeight:'bold',
            fontSize:20
        },
        color:'#fff',
        shadowColor:'#333',
        shadowOffset:{x:1,y:1},
        textAlign:'center',
        width:Tome.ui.dashboardWidth,
        height:40,
        top:0,
        opacity:0,
        zIndex:9999
	});
	w1.add(title);
	
	/*
	// Change video title when scrolling
	scroll.addEventListener('scroll',function(){
	    title.text = views[scroll.currentPage].title;
	});
	
	// Fade video title
	title.animate({
	    opacity:1,
	    duration:500
	});
	*/
	
	return w1;
};