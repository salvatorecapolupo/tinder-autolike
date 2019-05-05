function checkTinder() {
	return window.location.href.startsWith("https://tinder.com/app/recs");
}

function guessMyBehaviour(){
	//sommelier version 1.0

	var msInAday= 86400000;
	var min = 0, max = msInAday;
	var firstQuarter = 	30 * msInAday / 100;
	var secondQuarter = 98 * msInAday / 100;
	var thirdQuarter = 	99 * msInAday / 100;
// 	var fourthQuarter = 100 * msInAday / 100;
	
	var behaviour = Math.random() * (+max - +min) + +min;
	
	var className= "-";
	if ( behaviour<=firstQuarter )
		className = 'recsGamepad__button End(15px)'; 	// <3, 		   30% probability / day
	else if ( behaviour>firstQuarter && behaviour<=secondQuarter )
		className = "recsGamepad__button Start(15px)"; 	// X, 		   68% probability / day
	else if ( behaviour>secondQuarter && behaviour<=thirdQuarter )
		className = "recsGamepad__superlike"; 			//superlike,   1% probability / day
	else 
		className = "recsGamepad__button--boost boostButton"; //boost, 1% probability / day

	//just for debug	
	var  readable_choice = {
	    'recsGamepad__button End(15px)': 	"<3",
	    'recsGamepad__button Start(15px)': 	"X",
	    'recsGamepad__superlike': 			"super <3",
	    'recsGamepad__button--boost boostButton': "boost",
	};

// 	return /*random*/ readable_choice[className];
	return /*random*/ className;
}

function trickTinder() {
	// Click, click, click the buttons
	var className = guessMyBehaviour();
	
	document.getElementsByClassName(className)[0].click();

	// If reached max likes per day then show modal and get it's content...
	// Check if there is any subscription button...
	if (document.getElementsByClassName('productButton__subscriptionButton').length > 0) {
		// We get the counter thing
		var hms = document.getElementsByClassName('Fz($ml)')[0].textContent;
		// Split it at the colons
		var a = hms.split(':');
		// Minutes are worth 60 seconds. Hours are worth 60 minutes. 1 second = 1kmilliseconds.
		// Genius... rocket science...
		var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])
		
		return seconds * 1000;
	}
}

function checkOkCupid() {
	return window.location.href.startsWith("https://www.okcupid.com/doubletake");
}
function trickOkCupid() {
	// Press the like button
	document.getElementsByClassName('cardactions-action--like')[0].click();
}

// There is a lot more fun that can be achieved
// Need to add socket puppetry (VPNs solutions? several accounts?) - :D
// TODO: Need to accept automatically permissions except for
// TODO: Need to add ANN for fake pics
// TODO: Need to add RNN for fake messages 

function getRandomPeriod() {
	return Math.round(Math.random() * (3000 - 750)) + 750;
}

(function loopSasori() {
	// A random period between 500ms and 2secs
	var randomPeriod = getRandomPeriod();
	setTimeout(function() {
		randomPeriod = undefined;
		if (checkTinder()) {
			var delay	= trickTinder();
			if (delay) {
				console.log('Too many likes for now, have to wait: ' + delay + ' ms');
				randomPeriod = delay;
			}
		}
		if (checkOkCupid()) {
			trickOkCupid();  
		}
		if (!randomPeriod) {
			loopSasori();
		}
		else {
			setTimeout(loopSasori, randomPeriod);
		}
	}, randomPeriod);
}());
