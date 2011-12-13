/*
 * tabStrip code by Brian Knorr modified by Kris Haamer kris.haamer@gmail.com
 * 
 */


function createTabStrip(options) {
 options = options || {};
 params = {
   labels: options.labels || [],
   onselect: options.onselect || null,
   top: options.top || .1,
   height: options.height || Ti.Platform.displayCaps.platformHeight,
   backgroundColor: options.backgroundColor || '#000',
   gradientColor: options.gradientColor || '#000',
   selectedColor: options.selectedColor || '#fff',
   unselectedColor: options.unselectedColor || '#fff',
   fontSize: options.fontSize || 17
 }

 var labelViews = [];
 var lastSelectedLabel = null;
 var totalWidth = 0;

 var containerView = Titanium.UI.createView({
   top:params.top,
   height:params.height,
   width:320,
   backgroundColor:params.backgroundColor
 });

 var leftArrow = Ti.UI.createLabel({
   text:String.fromCharCode(171),
   font:{fontSize:36, fontWeight:'bold'},
   color:params.selectedColor,
   height:params.height,
   width:15,
   top:params.top+160,
   left:25,
   textAlign:'left',
   visible:false
 });
 containerView.add(leftArrow);
 
 var scrollHere = Ti.UI.createLabel({
   text: Tome.dict.scrollTip,
   font:{fontSize:11, fontWeight:'bold'},
   color:params.selectedColor,
   height:params.height,
   width:Ti.Platform.displayCaps.platformWidth,
   top:params.top+160,
   left:0,
   textAlign:'center',
   visible:true
 });
 containerView.add(scrollHere);

 var scrollView = Ti.UI.createScrollView({
   layout:'horizontal',
   top:params.top,
   left:17,
   height:450,
   width:290
 });
 containerView.add(scrollView);

 var rightArrow = Ti.UI.createLabel({
   text:String.fromCharCode(187),
   font:{fontSize:36, fontWeight:'bold'},
   color:params.selectedColor,
   height:params.height,
   width:15,
   top:params.top+160,
   right:25,
   textAlign:'right',
   visible:false
 });
 containerView.add(rightArrow);

 scrollView.addEventListener('scroll', function(e) {
   leftArrow.visible = e.x > 5;
   rightArrow.visible = e.x < scrollView.contentWidth - scrollView.width;
 });

 containerView.labels = function(labels) {
   params.labels = labels;
   resetLabels();
 }

 containerView.selectTab = function(index) {
   select(labelViews[index]);
 }

 function resetLabels() {
   totalWidth = 0;
   labelViews = [];
   var oldLabels = scrollView.children;
   if (oldLabels) {
     for (var i = 0,count = oldLabels.length; i < count; i++) {
       scrollView.remove(oldLabels[i]);
     }
   }

   var labels = params.labels;
   for (var i = 0,count = labels.length; i < count; i++) {
      var button = createButton(labels[i], i);
      scrollView.add(button);
   }
   scrollView.contentWidth = totalWidth;
   rightArrow.visible = totalWidth > scrollView.width;
 }

 function createButton(title, index) {

   var pic_id = "__0" + eval(index + 1);
   var buttonView = Ti.UI.createView({
     top:params.top,
     height:params.height-100,
     backgroundImage:'images/tabs/' + pic_id + '.png'
   });
   
   buttonView.addEventListener('touchstart', function(e) {
   		//e.source.children[0].text = "Tap me";
   })

   var label = Ti.UI.createLabel({
     text:title,
     font:{fontSize:params.fontSize,fontStyle:'bold', fontFamily:Tome.ui.defaultFont},
     width:220,
     textAlign:'center',
     height:params.height,
     touchEnabled:false
   });
   label.index = index;
   labelViews.push(label);
   buttonView.add(label);
   showAsUnSlected(label);
   buttonView.addEventListener('doubletap', function(e) {
     select(e.source.children[0]);
   });
   buttonView.width = label.size.width + 20;
   totalWidth += buttonView.width;

   if (index == 0) {
     showAsSelected(label);
   }
   return buttonView;
 }

 function select(label) {
   if (lastSelectedLabel) {
     showAsUnSlected(lastSelectedLabel);
   }
   showAsSelected(label)
   if (params.onselect) {
     params.onselect(label.index);
   }
 }

 function showAsSelected(label) {
   label.color = params.selectedColor;
   label.getParent().borderWidth = 1;
   lastSelectedLabel = label;
 }

 function showAsUnSlected(label) {
   label.color = params.unselectedColor;
   label.getParent().borderWidth = 0;
 }

 resetLabels();
 return containerView;
}