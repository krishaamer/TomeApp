/*
 * TOMÉ iPhone App
 * source root and high level functions
 * code written by Kris Haamer kris.haamer@gmail.com
 */


// Include Tome{} and components for windows
Ti.include(
	"js/tome.js", // Definitions
	"js/tome.utils.js", //Frequently used functions
	"js/tome.story.js", //Story tab
	"js/tome.characters.js", //Characters tab
	"js/tome.artwork.js", //Artwork tab
	"js/tome.tabstrip.js" //Main view navigation
);

var story 	 	= Tome.createStoryView(-900);
var characters 	= Tome.createCharacterView(-800);
var artwork  	= Tome.createArtworkView(-800);
var trailer  	= null;
var full	 	= Ti.UI.currentWindow;

var windowData = [
 {title:'story', win:story},
 {title:'artwork', win:artwork},
 {title:'characters', win:characters},
 {title:'trailer', win:trailer},
 {title:'full', win:full}
];

var tabStripWin = Ti.UI.createWindow({
 fullscreen:true,
 backgroundColor:'#555',
 title:'TOMĒ TIMELINE',
 titleImage: '',
 navBarHidden:false,
 barImage:'images/buttonbar/button2_selected.png'
});

var tabStripView = createTabStrip({
 labels:[
 	Tome.dict.readStory, 
 	Tome.dict.seeArtwork, 
 	Tome.dict.meetCharacters, 
 	Tome.dict.watchTrailer, 
 	Tome.dict.watchFull
 ],
 onselect: function(index) {
 	
 	//alert(windowData[index].title);
 	
	if(windowData[index].title == "trailer") {
		Tome.openTrailerWindow(Tome.uri.trailer);
	} else {
		navGroup.open(windowData[index].win);
	}
 }
});
tabStripWin.add(tabStripView);

var navGroup = Ti.UI.iPhone.createNavigationGroup({
 window:tabStripWin
});

Tome.app.add(navGroup);
Tome.app.open({transition: Ti.UI.iPhone.AnimationStyle.CURL_UP});
//tabStripView.selectTab(0);

Tome.app.addEventListener("open", function () {
	
	// Animate upon intro
	var t1 = Titanium.UI.create2DMatrix().scale(1);
	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 100;
	
	var t2 = Ti.UI.create2DMatrix();
	 Tome.app.animate({
	 	transform:t2,
	 	duration:500,
	 	curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
	 });
	//Tome.openPopup("Welcome and enjoy.");
	//Tome.app.add(Tome.createTitles());
	//Tome.app.add(Tome.createNav(Tome.app, ['Story', 'Videos', 'Director'], 999));
  	
});