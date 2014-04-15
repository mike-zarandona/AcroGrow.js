/*
**********************************************************
* AcroGrow.js | http://acrogrowjs.com
*
* A jQuery plug-in that makes (non)sense of internet acronyms.
* 
* Version:		0.1
* Author:		Mike Zarandona
* Release:		April 15 2014
* 				Code refactoring.
* License:		The MIT-License (MIT)
* 
* Reqs:			jQuery
* 
* Usage:		$('.container-element').acroGrow({
*					randomReplacements: false,
*					useDefaultSet: true,
*					customSetWithDefs: [
*						['abc', 'apple banana carrot'],
*						['lol', 'laughing on lounge-chairs'],
*						['html', 'heavy tremor marketing language']
*					]
*				});
**********************************************************
*/

(function ($, undefined) {
	$.fn.acroGrow = function (options) {

		/* Override defaults with specified options. */
		options = $.extend({}, $.fn.acroGrow.options, options);

		/* Options loaded; run-once items */
		var opSet = [],
			opSetDefs = [],
			defaultSet = ['wtf', 'lol', 'lolol', 'lololol', 'rofl', 'rotfl', 'brb', 'brt', 'yolo', 'imo', 'imho', 'jfgi', 'tmi', 'smh', 'fml', 'omg', 'oomf', 'hmu', 'swag', 'gf', 'bf', 'bff', 'irl', 'lis', 'ttyl', 'ftw', 'lylas', 'lylab', 'ttfn', 'tldr', 'fyi', 'rtfm', 'u', 'nd', 'ur', 'rt', 'dm', 'gtfooh', 'bfn', 'afaik', 'btw', 'jk', 'atm'],
			defaultSetDefs = ['what the ef', 'laugh out loud', 'laugh out loud out loud', 'laugh out loud out loud out loud', 'rolling on floor laughing', 'rolling on the floor laughing', 'be right back', 'be right there', 'you only live once', 'in my opinion', 'in my humble opinion', 'just effing google it', 'too much information', 'shaking my head', 'ef my life', 'oh my god', 'one of my friends', 'hit me up', 'stuff we all get', 'girlfriend', 'boyfriend', 'best friends forever', 'in real life', 'laughing in silence', 'talk to you later', 'for the win', 'love you like a sister', 'love you like a brother', 'ta-ta for now', 'too long didn\'t read', 'for your information', 'read the effing manual', 'you', 'and', 'your', 'retweet', 'direct message', 'get the ef out of here', 'bye for now', 'as far as I know', 'by the way', 'just kidding', 'at the moment'],
			thisSwap,
			thisIndex = null,
			replacing,
			replacement = '';



		// Construct the operational set of acronym data ( opSet[], opSetDefs[] )
		if (options.useDefaultSet) {
			opSet = opSet.concat(defaultSet);
			opSetDefs = opSetDefs.concat(defaultSetDefs);
		}
		if ((options.customSet.length > 0) && (options.randomReplacements)) {
			opSet = opSet.concat(options.customSet);
		}
		if (options.customSetWithDefs.length > 0) {
			for (var x = 0; x < options.customSetWithDefs.length; x++) {
				opSet.push(options.customSetWithDefs[x][0]);
				opSetDefs.push(options.customSetWithDefs[x][1]);
			}
		}



		/* Error Checking */
		// Error check to see if there are no acronyms being passed
		if ( opSet.length === 0) { console.error('AcroGrow.js ERROR:  No Acronyms Set!\n    Try turning on \'useDefaultSet\', or pass your own acronyms to customSet[] or customSetWithDefs[]'); }

		// Check to see if randomWords is loaded IF randomReplacements is being used
		if (typeof randomWords == 'undefined') {
			if (options.randomReplacements) {
				console.error('acroGrow.js ERROR:  randomReplacements turned on, but FILE jquery.acrogrow.randomWords.js NOT FOUND');
			}	
		}



		// Step 1:  Inspect each child element and highlight swaps with .ag-swap
		this.find('*').each(function() {

			// Step through each word to be replaced
			for (var i = 0; i < opSet.length; i++) {

				var regExp = new RegExp('\\b' + opSet[i] + '\\b', 'ig');
				$(this).html( $(this).html().replace(regExp, '<span class="ag-swap" data-acrogrow="' + i + '">' + opSet[i] + '</span>') );
			}

		});



		// Step 2:  Decode & swap the .ag-swap instances
		return this.find('.ag-swap').each(function() {

			thisSwap = $(this);
			thisIndex = thisSwap.attr('data-acrogrow');

			// Random replacements logic
			if (options.randomReplacements) {
				replacing = opSet[thisIndex];
				replacement = getRandomWord(replacing);
			}
			// Reasonable replacements logic
			else {
				replacing = opSet[thisIndex];
				replacement = opSetDefs[thisIndex];
			}

			// Write the swap back to the DOM with a new span containing the original replacement
			thisSwap.html(replacement + '<span>' + replacing + '</span>');
		});



		// Helper function: pass in an acronym (string); returns a random acronym based on randomWords[]
		function getRandomWord(passedAcronym) {
			var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

			var characters = passedAcronym.split('');
			var randomReplacement = '';

			for (var j = 0; j < characters.length; j++) {
				var thisLetter = alphabet.indexOf(characters[j]);
				var randomInt = Math.floor(Math.random() * randomWords[thisLetter].length);

				// Set the second dimension to a random int based on each letter's length
				randomReplacement += randomWords[thisLetter][randomInt] + ' ';
			}

			return randomReplacement;
		}


	};





	// Default the defaults
	$.fn.acroGrow.options = {
		randomReplacements: false,

		useDefaultSet: true,

		// Active only if randomReplacements == true
		customSet: [],

		customSetWithDefs: [],

		toggleElement: ''
	};
})(jQuery);
