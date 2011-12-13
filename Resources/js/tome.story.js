/*
 * TOMÉ iPhone App
 * functionality related to the Story tab 
 * based on Constrong. code modfied by Kris Haamer kris.haamer@gmail.com
 */


//createAboutWindow
Tome.createStoryView = function(zIndex) {
	
	// Create window
    var w1 = Tome.createDefaultWindow(-700);
    
    // Pull in data
    var data = [
    	{
            title: 'About Tomé',
            view: Ti.UI.createWebView({
                url: '/html/about-tome.html'
            })
    	}, 
    	{
            title: 'Director',
            view: Ti.UI.createWebView({
                url: '/html/dir-kris-haamer.html'
            })
    	}, 
    	{
            title: '...',
            view: Ti.UI.createWebView({
                url: '/html/more.html'
            })
    	}
    ];
    
    w1.add(Tome.createTabScroll({data:data}));
    
    return w1;
};



// Create a Tabbed Scrollable View
Tome.createTabScroll = function(e) {
	
	// Set configuration variables and defaults is necessary
	var data = e.data || [];
	var tabBarHeight = e.tabBarHeight || 36;
	var width = e.width || Ti.Platform.displayCaps.platformWidth;
	var images = {
		selected: 'images/buttonbar/button2_selected.png',
		unselected: 'images/buttonbar/button2_unselected_shadow.png',
		unselectedLS: 'images/buttonbar/button2_unselected_shadowL.png',
		unselectedRS: 'images/buttonbar/button2_unselected_shadowR.png',
	};
	var font = e.font || {fontSize: 14, fontWeight: 'bold'};
	var item, backgroundImage, tabView, tabLabel, scroll, i;
	
	// Start creating the TabbedScrollableView
	var w1 = Ti.UI.createView();
	var tabbedBarView = Ti.UI.createView({
		top: 0,
        backgroundColor: e.backgroundColor || '#000',
        height: tabBarHeight
    });
    var tabbedBar = Ti.UI.createView({
        top: 0,
        height: tabBarHeight,
        width: width
    });
    
    for (i = 0; i < data.length; i++) {
    	item = data[i];

    	// set the default state of the tab bar images
    	if (i == 0) {
    		backgroundImage = images.selected;
    	} else if (i == 1) {
    		backgroundImage = images.unselectedLS;
    	} else {
    		backgroundImage = images.unselected;
    	}
    	
    	// create each tab bar button
        tabView = Ti.UI.createView({
            backgroundImage: backgroundImage,
            height: tabBarHeight,
            left: i * (width / data.length),
            right: width - ((parseInt(i) + 1) * (width / data.length)),
            index: i
        });
        tabLabel = Ti.UI.createLabel({
            text: item.title,
            textAlign: 'center',
            color: '#fff',
            height: 'auto',
            touchEnabled: false,
            font: font
        });

		// adjust images and scroll ScrollableView on tab bar clicks
        tabView.addEventListener('click', function (e) {
        	var index = e.source.index;
        	for (var j = 0; j < data.length; j++) {
        		if (index == j) {
        			data[j].tabView.backgroundImage = images.selected;
        		} else if (index-1 == j && data[index-1]) {
        			data[j].tabView.backgroundImage = images.unselectedRS;
        		} else if (index+1 == j && data[index+1]) {
        			data[j].tabView.backgroundImage = images.unselectedLS;
        		} else {
        			data[j].tabView.backgroundImage = images.unselected;
        		}	
        	}

			scroll.scrollToView(data[index].view);
        });

		// layout the tabbed scrollableview
        tabView.add(tabLabel);
        tabbedBar.add(tabView);
        item.tabView = tabView;
    }
    
    scroll = Ti.UI.createScrollableView({
        showPagingControl: false,
        top: tabBarHeight,
        views: (function() {
        	var views = [];
        	for (var j = 0; j < data.length; j++) {
        		views.push(data[j].view);	
        	}
        	return views;
        })()
    });
    scroll.addEventListener('scroll', function (e) {
        if (e.view) {
            data[e.currentPage].tabView.fireEvent('click');
        }
    });
    
    w1.add(scroll);
    w1.add(tabbedBarView);
    tabbedBarView.add(tabbedBar);

    return w1;
};