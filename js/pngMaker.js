var p = new PNGlib(200, 200, 256); // construcor takes height, weight and color-depth
var background = p.color(0, 0, 0, 0); // set the background transparent

for (var i = 0, num = 200 / 10; i <= num; i+=.01) {

	var x = i * 10;
	var y = Math.sin(i) * Math.sin(i) * 50 + 50;

	// use a color triad of Microsofts million dollar color
	p.buffer[p.index(Math.floor(x), Math.floor(y - 10))] = p.color(0x00, 0x44, 0xcc);
	p.buffer[p.index(Math.floor(x), Math.floor(y))] = p.color(0xcc, 0x00, 0x44);
	p.buffer[p.index(Math.floor(x), Math.floor(y + 10))] = p.color(0x00, 0xcc, 0x44);
}

for (var i = 0; i < 50; i++) {
	for (var j = 0; j < 50; j++) {
		p.buffer[p.index(i + 90, j + 135)] = p.color(0xcc, 0x00, 0x44);
		p.buffer[p.index(i + 80, j + 120)] = p.color(0x00, 0x44, 0xcc);
		p.buffer[p.index(i + 100, j + 130)] = p.color(0x00, 0xcc, 0x44);
	}
}

document.write('<img src="data:image/png;base64,'+p.getBase64()+'">');
