/**
* @description To assign a choosen background color by left clicking the cells
* @description To remove a choosen background color by right clicking the cells
* @description To draw a choosen background color with left mouse button down
* @description To remove choosen background colors with right mouse button down
*/

// required for Safari thank you @Cedric_F

const hexToRgb = hex => {
	let r, g, b;
    r = parseInt(hex.substr(1,2),16);
    g = parseInt(hex.substr(3,2),16);
    b = parseInt(hex.substr(5,2),16);
    return `rgb(${r}, ${g}, ${b})`; // template string in between back ticks

  }
  
/*
function hexToRgb(hex) {
	let r, g, b;
    r = parseInt(hex.substr(1,2),16);
    g = parseInt(hex.substr(3,2),16);
    b = parseInt(hex.substr(5,2),16);
    return `rgb(${r}, ${g}, ${b})`;
}
*/

// add or remove the color setting of a single cell

$('#pixel_canvas').on('mousedown','td', function(evt) {
	if( evt.which === 1 ) {
 		const pickColor = document.getElementById('colorPicker').value;
		new_color = hexToRgb(colorPicker.value);

 	 	$(this).css('background-color',new_color);
	} else if (evt.which === 3) {
 	 	$(this).css('background-color','');
	};

// draw or continuously remove color fromseveral cells
$('td').on('mouseover mouseleave', function() {
	if( evt.which === 1 ) {
 		const pickColor = document.getElementById('colorPicker').value;
		new_color = hexToRgb(colorPicker.value);

 	 	$(this).css('background-color',new_color);
	} else if (evt.which === 3) {
 	 	$(this).css('background-color','');
	};
});
})

// stop mouse action on #pixel_canvas
.on('mouseup', 'td', function() {
$('td').off('mouseover mouseleave');
});



//////////////////////////////////WORKING///////////////////

/*

// add or remove the color setting of a single cell
$('#pixel_canvas').on('mousedown','td', function(evt) {
	if( evt.which === 1 ) {
 		const pickColor = document.getElementById('colorPicker').value;
 	 	$(this).css('background-color',pickColor);
	} else if (evt.which === 3) {
 	 	$(this).css('background-color','');
	};

// draw or continuously remove color fromseveral cells
$('td').on('mouseover mouseleave', function() {
	if( evt.which === 1 ) {
 		const pickColor = document.getElementById('colorPicker').value;
 	 	$(this).css('background-color',pickColor);
	} else if (evt.which === 3) {
 	 	$(this).css('background-color','');
	};
});
})

// stop mouse action on #pixel_canvas
.on('mouseup', 'td', function() {
$('td').off('mouseover mouseleave');
});

*/
/////////////////////////////////WORKING END//////////////////


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

if ( $(window).width() > 414 && $(window).width() <= 1149) {
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

} else if ( $(window).width() > 1150 && $(window).width() <= 1599){
	if ((width>50) || (height>50)) {
		alert('MAX WIDTH AND HEIGHT IS LIMITED TO 60 TO PREVENT BROWSER CRASH');
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

} else if ( $(window).width() > 1600 ){
	if ((width>80) || (height>80)) {
		alert('MAX WIDTH AND HEIGHT IS LIMITED TO 80 TO PREVENT BROWSER CRASH');
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
*@description Disable the context menu in order to make mouse button actions on only #pixel_canvas possible.
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
	//	 location.reload(); not working on CodePen
	 history.go(0);
	});

/**
*@description Refresh the canvas only.
*/

function clear() {
	if($('#btn_clear').length > 0 ) {
 		return;
 	} else {
 	$('#colorDiv').append('<button type= "submit" id="btn_clear" class="btn">clear</button>');
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
	$('#container').show('fast');
});

/**
* @description Snipped for file download
* https://github.com/tsayen/dom-to-image#usage
* Safari is not supported, as it uses a stricter security model on <foreignObject> tag.
*/

$('#btn_save').click(function() {
	var node = document.getElementById('pixel_canvas');
	domtoimage.toPng(node)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        document.getElementById('container').appendChild(img);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
				alert('oops, something went wrong!');
    });
});
