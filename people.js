
String.prototype.replaceAt = function (index, character) {
	return this.substr(0, index) + character + this.substr(index + character.length);
};

String.prototype.indexes = function (find) {

	var regexp = new RegExp(find, 'g');
	var str = this.toString();
	var match, matches = [];

	while ((match = regexp.exec(str)) !== null) {
		matches.push(match.index);
	}

	return matches;
};

function toMoney(num, mil, dec, front, back) {

	mil   = mil   || mil;
	dec   = dec   || dec;
	front = front || front;
	back  = back  || back;

	num = (typeof num === 'string') ? parseFloat(num) : num;

	return front.toString() + num.toFixed(2).replace('.', dec).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + mil) + back.toString();
}

function toNumber(str) {
	var sep = lastCharOccur(str);
	var clearedStr = clearNumericString(str, sep);
	return clearedStr;
}

function lastChar(str, charList) {
	var lastChar = false;
	var lastCharPos = false;

	var searchDot = str.lastIndexOf('.');
	var searchComma = str.lastIndexOf(',');

	if (searchDot > searchComma) {
		lastChar = '.';
		lastCharPos = searchDot;
	} else if (searchDot < searchComma) {
		lastChar = ',';
		lastCharPos = searchComma;
	}

	return {'char': lastChar, 'index': lastCharPos};
}

function clearNumericString(numStr, sep) {
	sep = (typeof sep === 'object') ? sep : false;
	var cleared = numStr;

	if (sep) {
		if (sep.char === ',') {
			cleared = parseFloat(cleared.replace(/\D/g, ''));// fazer back position, verificar ultimo caractere separador para setar ponto lá
		}
	}
	console.log(cleared);

	return cleared;
}

Array.prototype.randomItem = function() {
    return this[Math.floor(Math.random() * this.length)];
}

function randomString(len) {
    var rdmString = "";
    for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);
}

function objSize(obj) {
	return Object.keys(obj).length;
}

function checkAll(e) {

	var element = e.target || event.srcElement;

	if (element.checked) {
		var arrayElements = document.getElementsByTagName('input');

		for (var i = 0; i < arrayElements.length; i++) {
			if (arrayElements[i].type === 'checkbox') {
				arrayElements[i].checked = true;
			}
		}
	}
    
	var input = document.getElementById('check');
	input.setAttribute('onclick', 'DesChekALL(event)');
}

function unChekALL(e) {

	try {var element = e.target;} catch (er) {}
	try {var element = event.srcElement;} catch (er) {}

	var arrayElements = document.getElementsByTagName('input'),
		length = arrayElements.length;
	
	for (var i = 0; i < length; i++) {
		if (arrayElements[i].type === 'checkbox') {
			arrayElements[i].checked = false;
		}
	}

	var toChange = document.getElementById('check');
	toChange.setAttribute('onclick', 'CheckAll(event)');
}

function printContent(elementId) {

	var d = document,
	    elementsContent = d.getElementById(elementId).innerHTML,
	    oldPage = d.body.innerHTML;

	d.body.innerHTML =
			"<html>\n\
			<head>\n\
				<meta charset='" + d.characterSet + "'>\n\
				<title>Print</title>\n\
			</head>\n\
			<body>" + elementsContent + "</body>\n\
		</html>";

	//Print Page
	window.print();

	//Restore orignal HTML
	document.body.innerHTML = oldPage;

}

function pageTop() {
	window.scrollTo(0, 0);
}

function pageBottom() {
	window.scrollTo(0, document.body.scrollHeight);
}

function getAllUserFunctions() {
	return Object.keys(window).filter(function (x) {
		return window[x] instanceof Function && !/\[native code\]/.test(window[x].toString());
	});
}

function getUrlParams() {
	var vars = {};
	window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		vars[key] = value;
	});
	return vars;
}

function constant(name, value) {
	Object.defineProperty(typeof global === "object" ? global : window, name, {
		value: value,
		enumerable: true,
		writable: false,
		configurable: false
	});
}

function formSubmit(subject, value){
	
	var d = document;
	
	switch (subject){
		case 'position':
			d.forms[value].submit();
			break;
		
		case 'id':
			d.getElementById(value).submit();
			break;
			
		default:
			console.log('Could not submit this form! Only valid subjects are: "position" and "id", subject given: ' + subject);
			break;
	}
}

function enterSubmit(userEvent, id){
	if (userEvent.keyCode === 13) {
		document.getElementById(id).submit();
	}
}

function setFullScreen() {

	var doc = document.documentElement,
		rfs =  doc.requestFullScreen
			|| doc.webkitRequestFullScreen
			|| doc.mozRequestFullScreen;
	rfs.call(doc);
}

function ss(scriptPath, callback) {
	var scriptHead = document.createElement('script'); 
	scriptHead.type = 'text/javascript';
	scriptHead.src = scriptPath;
	document.head.appendChild(scriptHead);
    
	scriptHead.onload = function() {
		callback();
	} 
}

function romanToNumber(str) {  
    var result = 0,
        decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
        roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
    
    for (var i = 0; i <= decimal.length; i++) {
        while (str.indexOf(roman[i]) === 0) {
            result += decimal[i];
            str = str.replace(roman[i],'');
        }
    }
    
    return result;
}

function numberToRoman(num) {  
    var result = '',
        decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
        roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
  
    for (var i = 0; i <= decimal.length; i++) {
        while (num%decimal[i] < num) {     
            result += roman[i];
            num -= decimal[i];
        }
    }
    
    return result;
}

Number.prototype.toFixedDown = function(digits) {
    var n = this - Math.pow(10, -digits)/2;
    n += n / Math.pow(2, 53); 
    return n.toFixed(digits);
}

function setCookie(cname, cvalue, time) {
    var d = new Date();
    d.setTime(d.getTime() + (time));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return false;
}

function deleteCookie(cname) {
	
	if (getCookie(cname)) {
		document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		return true;
	}

	return false;
}

function listCookies() {

    var cookies = {};

    if (document.cookie !== '') {
        var split = document.cookie.split(';');
        for (var i = 0; i < split.length; i++) {
            var name_value = split[i].split("=");
            name_value[0] = name_value[0].replace(/^ /, '');
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
        }
    }
    
    return cookies;
}

function windowSize() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return {"width": x, "height": y};
}

function floatRandom(min, max) {
   return Math.random() * (max - min) + min;
}

function intRandom(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function range(a, b, step){
    var A = [];
    if (typeof a === 'number') {
        A[0]= a;
        step = step || 1;
        while (a + step <= b) {
            A[A.length]= a+= step;
        }
    } else {
        var s = 'abcdefghijklmnopqrstuvwxyz';
        if(a === a.toUpperCase()) {
            b = b.toUpperCase();
            s = s.toUpperCase();
        }

        s= s.substring(s.indexOf(a), s.indexOf(b)+ 1);
        A= s.split('');        
    }
    return A;
}

Array.prototype.shuffle = function() {
    this.sort(function() {  
        return Math.random() - 0.5;
    });
}

function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}

Array.prototype.empty = function() {
    this.length = 0;
}

Array.prototype.trunc = function(n) {
    n = n || this.length;
    this.length = n;
}

function objToParams(obj){
  return "?" + Object
        .keys(obj)
        .map(function(key){
          return key+"="+obj[key]
        })
        .join("&");
}



/* TO-DO List */

/*
function autoInstanceParams() {}
function blockKeys(userEvent) {}
function blockClicks(userEvent) {}
function blockSelection(){}
function hexEncode() {}
function hexDecode() {}
function uEncode() {}
function uDecode() {}		
*/
