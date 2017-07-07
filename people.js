
///* For Debug purposes, uncomment */ "use strict";

String.prototype.replaceAt = function(index, character) {
	return this.substr(0, index) + character + this.substr(index + character.length);
};

String.prototype.indexes = function(find) {

	var regexp = new RegExp(find, 'g');
	var str = this.toString();
	var match, matches = [];

	while ((match = regexp.exec(str)) !== null) {
		matches.push(match.index);
	}

	return matches;
};

function toMoney(num, mil, dec, front, back) {

	mil   = mil   || '.';
	dec   = dec   || ',';
	front = front || '';
	back  = back  || '';

	num = (typeof num === 'string') ? parseFloat(num) : num;

	return front.toString() + num.toFixed(2).replace('.', dec).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + mil) + back.toString();
}

function moneyToNumber(str, toFixed) {
	var lastCharPos = false, floatNumber = 0;

	var searchDot   = str.lastIndexOf('.');
	var searchComma = str.lastIndexOf(',');

	if (searchDot > searchComma) {
		lastCharPos = searchDot;
	} else if (searchDot < searchComma) {
		lastCharPos = searchComma;
	}

    str = str.replaceAt(lastCharPos, 'F');
    str = str.replace(/[\W]/g, '');
    lastCharPos = str.indexOf('F');
    str = str.replaceAt(lastCharPos, '.');
    str = str.replace(/[a-zA-Z]/g, '');
    floatNumber = parseFloat(str);
    toFixed = toFixed || floatNumber.toString().length;
    return parseFloat(floatNumber.toFixed(toFixed));
}

Array.prototype.last = function() {
    return this.slice(-1).pop();
}

Array.prototype.randomItem = function() {
    return this[Math.floor(Math.random() * this.length)];
};

function randomString(len) {
    var rdmString = "";
    for( ; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);
}

function objSize(obj) {
	return Object.keys(obj).length;
}

function checkAll(e) {

	var element = e.target || event.srcElement || e.srcElement;

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

function goTop() {
	window.scrollTo(0, 0);
}

function goBottom() {
	window.scrollTo(0, document.body.scrollHeight);
}

function putIn(x, y) {
	window.scrollTo(x, y);    
}

function notNativeFunctions() { 
    var Instance = eval('Function');
	return Object.keys(window).filter(function (x) {
		return window[x] instanceof Instance && !/\[native code\]/.test(window[x].toString());
	});
}

function urlParams() {
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
	};
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

Number.prototype.trunc = function(digits) {
    var n = this - Math.pow(10, -digits)/2;
    n += n / Math.pow(2, 53); 
    return n.toFixed(digits);
};

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
        
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        
        if (c.indexOf(name) === 0) {
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

function clearCookies() { // in local path
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
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
};

function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}

Array.prototype.empty = function() {
    this.length = 0;
};

Array.prototype.trunc = function(n) {
    n = n || this.length;
    this.length = n;
};

function microtime() {
    var s, now = (Date.now ? Date.now() : new Date().getTime()) / 1000;
    s = now | 0;
    return (Math.round((now - s) * 1000) / 1000) + ' ' + s;
}

function objToParams(obj){
  return "?" + Object
        .keys(obj)
        .map(function(key){
          return key+"="+obj[key];
        })
        .join("&");
}

function isMobile() { 
    if(navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    } else {
        return false;
    }
}

String.prototype.removeAccents = function() {
        return this
                .replace(/[áàãâä]/gi, "a")
                .replace(/[éè¨ê]/gi,  "e")
                .replace(/[íìïî]/gi,  "i")
                .replace(/[óòöôõ]/gi, "o")
                .replace(/[úùüû]/gi,  "u")
                .replace(/[ç]/gi,     "c")
                .replace(/[ñ]/gi,     "n")
                .replace(/[^a-zA-Z0-9]/g, " ");
};

String.prototype.has = function(str) { 
    return this.indexOf(str) !== -1; 
};

Array.prototype.has = function(item) { 
    return this.indexOf(item) !== -1; 
};

Array.prototype.remove = function () {
    var toRemove, args = arguments, argsLen = args.length, toRemoveIndex;
    while (argsLen && this.length) {
        toRemove = args[--argsLen];
        while ((toRemoveIndex = this.indexOf(toRemove)) !== -1) {
            this.splice(toRemoveIndex, 1);
        }
    }
    return this;
};

function blockSelection() {
    document.selection.empty();
    window.getSelection().removeAllRanges();
    document.body.innerHTML += '\
        <style>*{\n\
            -webkit-touch-callout: none;\n\
            -webkit-user-select: none;-khtml-user-select:none;\n\
            -moz-user-select: none;\n\
            -ms-user-select: none;\n\
            user-select: none}\n\
        </style>';
}

Array.prototype.indexes = function(item) {
    var indexes = [], i = -1;
    while ((i = this.indexOf(item, i+1)) !== -1){
        indexes.push(i);
    }
    return indexes;
};

Array.prototype.replace = function(xItem, value) {
    xItem = xItem || {};
    var arr = this;
    
    switch (typeof xItem) {
        case "object":
            if (isArray(xItem)){
                return _replaceArray(arr, xItem, value);
                break;
            }
            
            Object.keys(xItem).forEach(function(item, index){
                if (arr.has(item)) {
                    arr[index] = xItem[item];
                }
            });
            break;
            
        default:
            _singleReplace(arr, xItem, value);
            break;
    }
    
    function _singleReplace(arr, xItem, value){
        var indexes = arr.indexes(xItem);
            indexes.forEach(function(item){
                arr[item] = value;
        });
    }
    
    function _replaceArray(arr, xItem, value){
        if (isArray(xItem) && isArray(value) && xItem.length === value.length) {
            xItem.forEach(function(item, index){
                _singleReplace(arr, item, value[index]);
            });
        } 
        return arr;
    }
    
    return arr;
};

function blockRightClick() {
    document.addEventListener('contextmenu', function(e){
        e.preventDefault();
        return false;
    },false);
}

constant _1s = 1000,
    _1m = 60 * _1sec,
    _1h = 60 * _1min,
    _1d = 24 * _1h;
    


