var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
	lookup[chars.charCodeAt(i)] = i;
}
var encode = function (arraybuffer) {
	var bytes, i, len, base64;
	if(typeof(arraybuffer)==="string"){
		let encoder = new TextEncoder();
		arraybuffer = encoder.encode(arraybuffer);
	}
	if(arraybuffer instanceof Uint8Array){
		bytes=arraybuffer;
	}else{
		bytes= new Uint8Array(arraybuffer);
	}
	base64='';
	len=bytes.length;
	for (i = 0; i < len; i += 3) {
		base64 += chars[bytes[i] >> 2];
		base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
		base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
		base64 += chars[bytes[i + 2] & 63];
	}
	if (len % 3 === 2) {
		base64 = base64.substring(0, base64.length - 1) + '=';
	}
	else if (len % 3 === 1) {
		base64 = base64.substring(0, base64.length - 2) + '==';
	}
	return base64;
};

var decode = function (base64) {
	var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
	if (base64[base64.length - 1] === '=') {
		bufferLength--;
		if (base64[base64.length - 2] === '=') {
			bufferLength--;
		}
	}
	var arraybuffer = new ArrayBuffer(bufferLength);
	var bytes = new Uint8Array(arraybuffer);
	for (i = 0; i < len; i += 4) {
		encoded1 = lookup[base64.charCodeAt(i)];
		encoded2 = lookup[base64.charCodeAt(i + 1)];
		encoded3 = lookup[base64.charCodeAt(i + 2)];
		encoded4 = lookup[base64.charCodeAt(i + 3)];
		bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
		bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
		bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
	}
	return arraybuffer;
};

var decodeBytes = function (base64) {
	var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
	if (base64[base64.length - 1] === '=') {
		bufferLength--;
		if (base64[base64.length - 2] === '=') {
			bufferLength--;
		}
	}
	var arraybuffer = new ArrayBuffer(bufferLength);
	var bytes = new Uint8Array(arraybuffer);
	for (i = 0; i < len; i += 4) {
		encoded1 = lookup[base64.charCodeAt(i)];
		encoded2 = lookup[base64.charCodeAt(i + 1)];
		encoded3 = lookup[base64.charCodeAt(i + 2)];
		encoded4 = lookup[base64.charCodeAt(i + 3)];
		bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
		bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
		bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
	}
	return bytes;
};
export default {encode,decode,decodeBytes};