/**
* @description To assign a choosen background color by left clicking the cells
* @description To remove a choosen background color by right clicking the cells
* @description To draw a choosen background color with left mouse button down
*/


// add or remoce the color setting of a single cell
$('#pixel_canvas').on('mousedown','td', function(evt) {
	if( evt.which === 1 ) {
 		const pickColor = document.getElementById('colorPicker').value;
 	 	$(this).css('background-color',pickColor);
	} else if (evt.which === 3) {
 	 	$(this).css('background-color','');
	};
// draw with left mouse button (only) hold down - this will not work on a touch display
$('td').on('mouseover mouseleave', function() {
	if( evt.which === 1 ) {
 		const pickColor = document.getElementById('colorPicker').value;
 	 	$(this).css('background-color',pickColor);
	} else if (evt.which === 3) {
 	 	$(this).css('background-color','');
	};
});
})

.on('mouseup', 'td', function() {
$('td').off('mouseover mouseleave');

});


/**
*@description Create the grid by entereing the input values for width and height.
*@description Limit grid size in dependance of 3 screen size ranges.
*/

function makeGrid() {
	const width = $('#input_width').val();
	const height = $('#input_height').val();
	const table = $('#pixel_canvas');
	table.children().remove();

// small screen size

if ( $(window).width() > 414 && $(window).width() <= 736) {
	if ((width>30) || (height>30)) {
		alert('MAX WIDTH AND HEIGHT IS LIMITED TO 30 TO FIT CANVAS ON SCREEN');
		window.location.reload();
	} else {
		let i = 1;
			while (i <= height) {
			table.append( '<tr></tr>' );
				for (let j = 1; j <= width; j++) {
			  	table.children().last().append('<td class="'+i+'-'+j+'"></td>');
			    };
			i++;
		};
	};

// medium screen size

} else if ( $(window).width() > 737 && $(window).width() <= 1024){
	if ((width>70) || (height>70)) {
		alert('MAX WIDTH AND HEIGHT IS LIMITED TO 70 TO PREVENT BROWSER CRASH');
		window.location.reload();
	} else {
		let i = 1;
			while (i <= height) {
			table.append( '<tr></tr>' );
				for (let j = 1; j <= width; j++) {
			  	table.children().last().append('<td class="'+i+'-'+j+'"></td>');
			    };
			i++;
		};
	};

// large screen size

} else if ( $(window).width() > 1025 ){
	if ((width>100) || (height>100)) {
		alert('MAX WIDTH AND HEIGHT IS LIMITED TO 100 TO PREVENT BROWSER CRASH');
		window.location.reload();
	} else {
		let i = 1;
			while (i <= height) {
			table.append( '<tr></tr>' );
 				for (let j = 1; j <= width; j++) {
					table.children().last().append('<td class="'+i+'-'+j+'"></td>');
					};
				i++;
		};
	};

// screen size too small

	} else {
		alert('YOUR SCREEN SIZE IS TOO SMALL FOR THIS APP')
	};

};

/**
*@description Disable the context menu inorder to make smooth 'right-click' on only #pixel_canvas possible.
*/


function disableMenu() {
		document.getElementById('pixel_canvas').oncontextmenu = function() {
		return false;
	}
};

/**
*@description Refresh the whole page.
*/

$('#btn_reload').click(function() {
    	 location.reload();
	});

/**
*@description Refresh the canvas only.
*/

function clear() {
	if($('#btn_clear').length > 0 ) {
 		return;
 	} else {
 	$('#colorDiv').append('<button type= "submit" id="btn_clear" class="btn"> Clear Canvas</button>');
 	$('#btn_clear').on('click', function() {
 	$('td').css('background-color','');
		});
	};
}

/**
*@description Print out whole page.
*/

$('#btn_print').click(function() {
    	 window.print();
	});

/**
*@description Required call back functions in order to proceed when the 'Submit' button is triggered.
*/

document.getElementById('btn_submit').addEventListener('click',function(event) {
	event.preventDefault();
	makeGrid();
	clear();
	disableMenu();
	$('#btn_submit').hide('slow');
	$('.container').show('fast');
});

/**
*@description Snipped for file download - png Generation!
*/

const rgbToHex = (r, g, b) => {
  const componentToHex = color => {
    const hex = color.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

$('#btn_save').click(function() {

		$('#pixel_canvas tr').each(function(){
    	$(this).find('td').each(function(){
			//	var color = $(this).css("background-color");

						var p = new PNGlib(8, 8, 256); // construcor takes height, weight and color-depth
						var background = p.color(0, 44, 0, 255); // set the background transparent

						for (var i = 0; i < 4; i++) {
							for (var j = 0; j < 4; j++) {
								p.buffer[p.index(i + 10, j + 10)] = p.color(0xcc, 0x00, 0x44);
								//p.buffer[p.index(i + 80, j + 120)] = p.color(0x00, 0x44, 0xcc);
								//p.buffer[p.index(i + 100, j + 130)] = p.color(0x00, 0xcc, 0x44);
							}
						}
  				  document.write('<img src="data:image/png;base64,'+p.getBase64()+'">'); // why in a new window and endless running?

			}) //each(function inner)

	})

});




	//$('#container').append('<img src="data:image/png;base64,'+p.getBase64()+'">')
