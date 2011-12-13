
// Win: Initate the main window object
// UI: Define some common UI defaults
// Dict: Define some common language
// URI: define some common paths


var Tome = {
	app:Ti.UI.createWindow ({
		fullscreen:false,
		backgroundColor:'#fff',
		title:'',
		transform: Ti.UI.create2DMatrix().scale(0.3),
		navBarHidden:true
	}),
	ui: {
		dashboardHeight: 480,
		dashboardWidth: 360, // Ti.Platform.displayCaps.platformWidth
		iconHeight: 85,
		iconWidth: 102,
		bgColor: '#555',
		borderWidth: 0,
		borderColor: '#000',
		menuBGColor: '#000',
		barColor: '#555',
		contentBottom: 50,
		barImage:'images/buttonbar/button2_selected.png',
		backButtonTitle: 'TIMELINE',
		defaultOpacity: 1,
		defaultFont: 'Helvetica Neue'
	},
	dict: {
		watchfilm: '',
		watchTrailer: 'Watch the trailer',
		playMovie: 'PLAY ',
		meetCharacters: 'Meet the characters',
		seeArtwork: 'See the artwork',
		readStory: 'Read about the Story and the Director notes',
		watchFull: "WATCH THE FULL FILM (Soon available. Buy to Unlock)",
		videoLabel: '',
		scrollTip: '< scroll to view. tap to open. >'
	},
	uri: {
		paintings: 'http://tomeapp.com/wp-content/uploads/2011/12/',
		videos: 'http://tomeapp.com/wp-content/uploads/characters/',
		list: {
			paintings: [
				{title:'Nelito Pereira', img:'painting-0.jpg'},
				{title:'Nelito Pereira', img:'painting-1.jpg'},
				{title:'Nelito Pereira', img:'painting-2.jpg'},
				{title:'Nelito Pereira', img:'painting-3.jpg'},
				{title:'Nelito Pereira', img:'painting-4.jpg'},
				{title:'Nelito Pereira', img:'painting-5.jpg'},
				{title:'Nelito Pereira', img:'painting-6.jpg'},
				{title:'Nelito Pereira', img:'painting-7.jpg'},
				{title:'Nelito Pereira', img:'painting-8.jpg'},
				{title:'Nelito Pereira', img:'painting-9.jpg'},
				{title:'Nelito Pereira', img:'painting-10.jpg'},
				{title:'Nelito Pereira', img:'painting-11.jpg'}
			],
			characters: [
					{title:'Alex-Keller', img: 'alex-keller.jpg', vid:'alex-keller.mp4'},
					{title:'Ronny Key', img:'ronny-key.jpg', vid:'ronny-key.mp4'},
					{title:'Osvaldo Reis', img: 'osvaldo-reis.jpg', vid:'osvaldo-reis.mp4'},
					{title:'Olavo Amado', img:'olavo-amado.jpg', vid:'olavo-amado.mp4'},
					{title:'Nelito Pereira', img:'nelito-pereira.jpg', vid:'nelito-pereira.mp4'}
			]
		},
		trailer: 'http://tomeapp.com/wp-content/uploads/trailer.mp4'
	}
};