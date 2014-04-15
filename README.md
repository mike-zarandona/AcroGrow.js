AcroGrow.js
===========

A jQuery plug-in that makes (non)sense of internet acronyms.

[http://acrogrowjs.com](http://acrogrowjs.com)


&nbsp;
## Features
- Replaces acronyms within specified elements with random nonsense words OR actual definitions.
- Define custom acronyms list & associated definitions.
- Separate name-spaced CSS file for easy customization & debugging.


&nbsp;
## Getting Started

1. Include the AcroGrow CSS
1. Include jQuery
1. Include acrogrow.randomWords.js (optional)
1. Include acrogrow.js
1. Call acroGrow() when the document is ready

For example:

*Head area of document*

	<link rel="stylesheet" href="path/to/jQuery.AcroGrow.css">

*Body area of document*


	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="path/to/jQuery.AcroGrow.js"></script>
	<script>
		$(document).ready(function() {
			$('.foo').acroGrow();
		});
	</script>


To see more examples of usage, visit [the project page](http://acrogrowjs.com).


&nbsp;
## How it Works

AcroGrow evaluates each specified element and wraps each acronym match in a `<span class="ag-swap">`&hellip;`</span>`.  After the initial identification stage, the wrapped matches are either replaced with their proper definitions, or dynamically replaced with randomly generated replacements depending on the options set.


&nbsp;
## Author
[Mike Zarandona](http://twitter.com/mikezarandona) | [http://mikezarandona.com](http://mikezarandona.com)
