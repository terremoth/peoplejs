
///* For Debug purposes, uncomment this line */ "use strict";

/*
 * For PeopleJS use only.
 * Generally, will be used to store async results
 * # Only push to this array
 */
var ___CACHE = []; 

constant('PEOPLEJS_VERSION', "1.0.0"); 

var Randomic = {};
    Randomic.int = function(min ,max) {
        min = min || 0;
        max = max || 10;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Randomic.float = function(min, max) {
        min = min || 0;
        max = max || 0;
        return Math.random() * (max - min) + min;
    };
    Randomic.range = function(start, end, step) {
        start = start || 0;
        end   = end   || 10;
        
        var randomArr = [];
        if (typeof start === 'number') {
            randomArr[0]= start;
            step = step || 1;
            while (start + step <= end) {
                randomArr[randomArr.length]= start+= step;
            }
        } else {
            var str = 'abcdefghijklmnopqrstuvwxyz'; 
            if(start === start.toUpperCase()) {
                end = end.toUpperCase();
                str = str.toUpperCase();
            }

            str = str.substring(str.indexOf(start), str.indexOf(end)+ 1);
            randomArr = str.split('');        
        }
        return randomArr;
    };
    Randomic.string = function(len) {
        len = len || 10;
        var rdmString = "";
        for( ; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
        return rdmString.substr(0, len);
    };
    Randomic.arrayInt = function(minSize, maxSize, minInt, maxInt) {
        minSize = minSize || 5;
        maxSize = maxSize || 10;

        minInt = minInt || 0;
        maxInt = maxInt || 100;

        var arr = [], i;
        var randomSize = Randomic.int(minSize, maxSize);

        for(i = 0; i < randomSize; i++) {
            arr.push(Randomic.int(minInt, maxInt));
        }
        return arr;
    };
// End of Randomic Object

String.prototype.replaceAt = function(index, str) {
	return this.substr(0, index) + str + this.substr(index + str.length);
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

String.prototype.beginsWith = function(str) {
    return this.lastIndexOf(str, 0) === 0;
};

Array.prototype.last = function() {
    return this.slice(-1).pop();
};

Array.prototype.randomItem = function() {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.shuffle = function() {
    this.sort(function() {  
        return Math.random() - 0.5;
    });
};

Array.prototype.trunc = function(n) {
    n = n || this.length;
    this.length = n;
};

Array.prototype.has = function(item) { 
    return this.indexOf(item) !== -1; 
};

Array.prototype.desc = function() { 
    return this.sort(function(a, b){return b-a;}); 
};

Array.prototype.__oddEven = function(type, order) {
    var oddEven = [];
    order = order || false;
    type = type || 'odd';
    
    this.forEach(function(item) {
        if (type === 'odd') {
            var expr = (Math.abs(item % 2) === 0);
        } else {
            var expr = (Math.abs(item % 2) === 1);
        }
        
        if (isInt(item) && expr) {
            oddEven.push(item);
        }
    });
    
    switch (order) {
        case 'asc':
            return oddEven.sort();
            break;
        case 'desc':
            return oddEven.desc();
        break;
    }
    return oddEven;
};

Array.prototype.odd = function(order) {
    return this.prototype.__oddEven('odd', order);
};

Array.prototype.even = function(order) {
    return this.prototype.__oddEven('even', order);
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

Array.prototype.isMulti = function() {
    var len = this.length, i;
    for(i = 0; i < len; i++) {
        if (isArray(this[i])) {
            return true;
        }
    }
    return false;
};

Array.prototype.isEmpty = function() {
    return this.length === 0;
};

Array.prototype.clear = function() {
    return this.length = 0;
};

Number.prototype.trunc = function(digits) {
    var n = this - Math.pow(10, -digits)/2;
    n += n / Math.pow(2, 53); 
    return n.toFixed(digits);
};

Number.prototype.toRoman = function() {
    return numberToRoman(this);
};

function objSize(obj) {
	return Object.keys(obj).length;
}

function objEmpty(obj) {
    return objSize(obj) === 0;
}

function objFunctions(obj) {
    Object.getOwnPropertyNames(obj).filter(function (p) {
        return typeof obj[p] === 'function';
    });
}

function toggleCheckAll(e) {
	var element = e.target || event.srcElement || e.srcElement;
    var check = element.checked;
    var arrayElements = document.getElementsByTagName('input');
	
    for (var i = 0; i < arrayElements.length; i++) {
        if (arrayElements[i].type === 'checkbox') {
            arrayElements[i].checked = check;
        }
    }
}

function isValidForm(id) {
    if (typeof id === 'number') {
        return document.forms[id].checkValidity();
    } else {
        return document.getElementById(id).checkValidity();
    }
}

function printContent(elemId) {

	var d = document, body = d.body,
	    elementsContent = d.getElementById(elemId).innerHTML,
	    oldPage = body.innerHTML;

	body.innerHTML ="<html>"+
                        "<head>"+
                            "<meta charset='" + d.characterSet + "'>"+
                                "<title>Print</title>"+
                        "</head>"+
                        "<body>" + elementsContent + "</body>"+
                    "</html>";

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

function pagePos(x, y) {
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

function constant(name, value, evalValue) {
    evalValue = evalValue || false;
    
    if (evalValue === true) {
        value = eval(value);
    }
    
	Object.defineProperty(typeof global === "object" ? global : window, name, {
		value: value,
		enumerable: true,
		writable: false,
		configurable: false
	});
}

function formSubmit(id, userEvent){
    userEvent = userEvent || window.event;
    if (typeof id === 'number') {
        document.forms[id].submit();
    } else {
        document.getElementById(id).submit();
    }
}

function enterSubmit(id, userEvent){
     if (userEvent.keyCode === 13) {
         formSubmit(id, userEvent);
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

function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isNatural(n){
    if (isInt(n)) {
        return n >= 0;
    }
    return false;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}

function isHex(str) {
    return /^#[0-9A-F]{6}$/i.test(str);
}

function isHexColor(strNum){
  return (typeof strNum === "string") && strNum.length === 6 
         && ! isNaN( parseInt(strNum, 16) );
}

function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function isURL(url) {
    var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
        '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
        '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
        '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
        '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
        '(\#[-a-z\d_]*)?$','i'); // fragment locater
        
    if(!pattern.test(url)) {
        return false;
    } else {
        return true;
    }
}

function microtime() {
    var s, now = (Date.now ? Date.now() : new Date().getTime()) / 1000;
    s = now | 0;
    return (Math.round((now - s) * 1000) / 1000) + ' ' + s;
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

function objToParams(obj){
  return "?" + Object
        .keys(obj)
        .map(function(key){
          return key+"="+obj[key];
        })
        .join("&");
}

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

function goUrl(url) {
    window.location.href = url;
}

function blockRightClick() {
    document.addEventListener('contextmenu', function(e){
        e.preventDefault();
        return false;
    },false);
}

function toMoney(num, mil, dec, front, back) {

	mil   = mil   || '.';
	dec   = dec   || ',';
	front = front || '';
	back  = back  || '';

	num = (typeof num === 'string') ? parseFloat(num) : num;

	return front.toString() + num.toFixed(2).replace('.', dec).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + mil) + back.toString();
}

function moneyToFloat(str, toFixed) {
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

/* needs more refactoring */
function serializeForm(form) {
    if (!form || form.nodeName !== "FORM") {
      return false;
    }
    
    var i = form.elements.length - 1,  j = 0, q = [];
    
    while (i >= 0) {
        var element = form.elements[i];
        var elementName = element.name, elementType = element.type, elementValue = element.value;
        
        if (elementName === "") {
            i = i - 1;
            continue;
        }
        
        switch (element.nodeName) {
            case "INPUT":
                switch (elementType) {
                    case "checkbox":
                    case "radio":
                        if (element.checked) {
                            q.push(elementName + "=" + encodeURIComponent(elementValue));
                        }
                        break;
                    default:
                        q.push(elementName + "=" + encodeURIComponent(elementValue));
                        break;
                }
                break;
                
            case "TEXTAREA":
                q.push(elementName + "=" + encodeURIComponent(elementValue));
                break;
            
            case "SELECT":
                switch (elementType) {
                  case "select-one":
                    q.push(elementName + "=" + encodeURIComponent(elementValue));
                    break;
                  case "select-multiple":
                    j = element.options.length - 1;
                    while (j >= 0) {
                      if (element.options[j].selected) {
                        q.push(elementName + "=" + encodeURIComponent(element.options[j].value));
                      }
                      j = j - 1;
                    }
                }
                break;
                
            case "BUTTON":
                q.push(elementName + "=" + encodeURIComponent(elementValue));
                break;
        }
        
        i = i - 1;
    }
    return q.join("&");
};

function serializeJson(json) {
    return objToParams(json);
}

function isValid(x) {
    return (x === 0 ? true : !!x);
}

/* TO-DO */
function peopleMask(){
    var toMask = document.querySelectorAll('input[data-mask]');
        toMask.addEventListener();
}


function ajax(params, callback) {
    params = params || {};
    var ajaxParams = {
        method      : params.method       || 'get',
        url         : params.url          || location.href,
        async       : params.async        || true,
        user        : params.user         || undefined,
        pass        : params.pass         || undefined,
        headers     : params.header       || {},
        data        : params.data         || false,
        dataType    : params.dataType     || 'text',
        as          : params.as           || 'text'
    };
    
    var ajax = new XMLHttpRequest();
    callback = callback || function(data){return data;};
    
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            return callback(this.responseText);
        }
    };
    var method = ajaxParams.method.toLowerCase();
    
    if (method === 'get' && ajaxParams.data) {
        if (typeof ajaxParams.data === 'object') { 
            ajaxParams.data = serializeJSON(ajaxParams.data);
            ajaxParams.url = ajaxParams.url+ajaxParams.data;
        } 
    }
    
    ajax.open(ajaxParams.method, ajaxParams.url, ajaxParams.async);
    
    if (method === 'post') {
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    
    if ( ! objEmpty(ajaxParams.headers)) {
        var headers = ajaxParams.headers, header;
        for (header in headers) {
            ajax.setRequestHeader(header, headers[header]);
        };
    }

    ajax.send(ajaxParams.data);
}

function bookmarkPage() {
    
    if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
        window.sidebar.addPanel(document.title, window.location.href, '');
    } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
        window.external.AddFavorite(location.href, document.title);
    } else if (window.opera && window.print) { // Opera Hotlist
        this.title = document.title;
        return true;
    } else { // webkit - safari/chrome
        alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
    }
}

function getBrowser() {
    var ua = navigator.userAgent, tem, 
    browser = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if(/trident/i.test(browser[1])){
        tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }

    if(browser[1] === 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }

    browser = browser[2] ? [browser[1], browser[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem = ua.match(/version\/(\d+)/i))!== null) browser.splice(1, 1, tem[1]);
    
    return browser.join(' ');
}

function browserPlugins() {
    var plugins = [];
    for (var i in navigator.plugins) {
        if (typeof (navigator.plugins[i]) === 'object') {
            plugins.push(navigator.plugins[i].name);
        }
    };
    return plugins;
}


function getIp(selector) {
    selector = selector || false;
    ajax({
        url: "http://api.ipify.org/"
    }, function(data) {
        if (selector) {
            document.querySelectorAll(selector).forEach(function(item) {
                item.innerHTML += data;
            });
        } else {
            ___CACHE.push(data);
        }
    });
}

function getCurrency(selector, symbol, base) {
    selector = selector || false;
    symbol = symbol || false;
    base = base || "USD";
    
    ajax({
        url: "http://api.fixer.io/latest?base="+base
    }, function(data) {
        data = JSON.parse(data);
        
        if (symbol){
            data = data.rates[symbol];
        }
        
        if (selector) {
            document.querySelectorAll(selector).forEach(function(item) {
                item.innerHTML += data;
            });
        } else {
            ___CACHE.push(data);
        }
    });
}

function blink(selector, speed) {
    selector = selector || 'blink';
    speed = speed || 500;
    var elements = document.querySelectorAll(selector);
    
    elements.forEach(function(item){
        var el = item; 
        setInterval(function(){
            if (el.style.opacity === '' || el.style.opacity === '1') {
                el.style.opacity = '0.0';
            } else {
                el.style.opacity = '1.0';
            }
        }, speed);
    });
}

constant("_1s", 1000);
constant("_1i", "60  * _1s", true);
constant("_5i", "5   * _1i", true);
constant("_1h", "60  * _1i", true);
constant("_1d", "24  * _1h", true);
constant("_1w", "7   * _1d", true);
constant("_1m", "30  * _1w", true);
constant("_6m", "6   * _1m", true);
constant("_1y", "365 * _1d", true);
