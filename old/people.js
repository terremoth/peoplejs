
///* For Debug purposes, uncomment this line */ "use strict";

/*
 * For PeopleJS use only.
 * Generally, will be used to store async results
 * # Only push to this array
 */
var ___CACHE = []; 

constant('PEOPLEJS_VERSION', "1.0.0"); 
constant("_1s", 1000);
constant("_1i", "60  * _1s", true);
constant("_5i", "5   * _1i", true);
constant("_1h", "60  * _1i", true);
constant("_1d", "24  * _1h", true);
constant("_1w", "7   * _1d", true);
constant("_1m", "30  * _1w", true);
constant("_6m", "6   * _1m", true);
constant("_1y", "365 * _1d", true);

String.prototype.replaceAt = function(index, str) {
	return this.substr(0, index) + str + this.substr(index + str.length);
};

String.prototype.insertAt = function( index, value ) {
    return (this.slice(0,index) + value + this.slice(index));
};

String.prototype.shuffle = function() {
    return this.split('').sort(function(){
        return 0.5-Math.random();
    }).join('');
};

String.prototype.hasAllChars = function(xChars) { 
    var hasAll = true;
    var inThis = this;
    var check =  xChars.toLowerCase().split('').map(function(char) {
        if (inThis.toLowerCase().indexOf(char) === -1) {
            hasAll = false;
        }  
    });
  
    return hasAll;
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

String.prototype.replaceArray = function(find, replace, regexFlag) {
    var replaceString = this;
    var regex; 
        regexFlag = regexFlag || 'g';
        
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], regexFlag);
        replaceString = replaceString.replace(regex, replace[i]);
    }
    
    return replaceString;
};

String.prototype.removeAccents = function() {       
    var dirtyStr = ['áàãâäąåăæā','éèëêẽęēėęěĕə','íìïîĩīïįı','óòöôõøœőö','úùüûũǘŭųűůū',
         'çḉćĉćč','ďđ','ģğ','ķ','ĺļľł','ñńǹņņ','ṕ','ŕř','šśŝśş','ťțţ','ṽ','ÿýỳŷỹ','žźẑż'],
        
        cleanStr = ['a','e','i','o','u','c','d','g','k','l','n','p','r','s','t','v','y','z'],
        regexStr = [];
        
    dirtyStr.forEach(function(item) {
        regexStr.push('/['+item+']/');
    });
    
    return this.replaceArray(regexStr, cleanStr);
    
    //return this.replace(/[^a-zA-Z0-9]/g, " ");
};

String.prototype.removeSpecialChars = function() {
    
    return this
            .replace(/[ª]/gi,     "a")
            .replace(/[º]/gi,     "o")
            .replace(/[&]/gi,     "e")
            .replace(/[@]/gi,     "(at)")
            .replace(/[¹]/gi,     "1")
            .replace(/[²]/gi,     "2")
            .replace(/[³]/gi,     "3")
            .replace(/[œ]/g,      "oe")
            .replace(/[Œ]/g,      "OE")
            .replace(/[ƒ]/gi,     "f")
            .replace(/[™]/gi,     "TM")
            .replace(/[Æ]/g,      "AE")
            .replace(/[¦]/gi,     "|")
            .replace(/[©]/gi,     "(c)")
            .replace(/[®]/gi,     "(R)")
            .replace(/[«]/gi,     "<<")
            .replace(/[»]/gi,     ">>")
            .replace(/[›]/gi,      ">")
            .replace(/[—–¯]/gi,   "-")
            .replace(/[±]/gi,     "+-")
            .replace(/[˜]/gi,     "~")
            .replace(/[“”]/gi,    '"')
            .replace(/[µ]/g,      'm')
            .replace(/[½]/g,      '1/2')
            .replace(/[¼]/g,      '1/4')
            .replace(/[¾]/g,      '3/4')
            .replace(/[ð]/g,      'eth')
            .replace(/[÷]/g,      '/')
            .replace(/[¡]/g,      '!')  
            .replace(/[°]/gi,     "grade(s)");
};

String.prototype.has = function(str) { 
    return this.indexOf(str) !== -1; 
};

String.prototype.startsWith = function(str) {
    return this.lastIndexOf(str, 0) === 0;
};

String.prototype.trunc = function(n) {
    return this.substring(0, n);
};

Array.prototype.first = function() {
    if(this[0]) {
        return this[0];
    }   
    return false;
};

Array.prototype.last = function() {
    return this.slice(-1).pop();
};

Array.prototype.randomItem = function() {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.chunk = function (size) {
    var size = size || 2;  
    var newArr = [];
    var finalPart = this.length % size;
  
    for (var step = 0; step < this.length; step += size) {
        newArr.push(this.slice(step, step+size));
    }
    
    return newArr;
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

Array.prototype.falsyRemover = function() {
  
 return this.filter(function(item) {
   var cond = 
           item !== false && 
           item !== undefined &&
           item !== null &&
           item !== 0 &&
           item !== "" &&
       !Number.isNaN(item); 
   
   return cond;
 });
  return this;
};

Array.prototype.equals = function (array) {
    if (!array) return false;
    if (this.length !== array.length) return false;

    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] !== array[i]) { 
            return false;   
        }           
    }       
    return true;
    /*
    var is_same = (array1.length == array2.length) && array1.every(function(element, index) {
        return element === array2[index]; 
    });
    */
};

Array.prototype.average = function() { 
    var len = this.length || 1;
    var sum = 0;
    this.forEach(function(item) {
        switch(typeof item) {
            case 'number':
            sum += parseFloat(item);
                break;
            case 'string':
                var n = parseFloat(item);
                isNumber(n) ? sum += item : '';
                break;
            case 'boolean':
                item === true ? sum += 1 : '';
                break;
            case 'object':
                isArray(item) ? sum += item.average() : '';
                break;
        }
    });
    return sum/len;
};

Array.prototype.sum = function() {
    return this.reduce(function(x,y) {
        return x+y;
    });
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

Array.prototype.max = function(){
    return Math.max.apply( Math, this);
};

Array.prototype.min = function(){
    return Math.min.apply( Math, this );
};

Number.prototype.trunc = function(digits) {
    var n = this - Math.pow(10, -digits)/2;
    n += n / Math.pow(2, 53); 
    return n.toFixed(digits);
};

Number.prototype.toRoman = function() {
    return numberToRoman(this);
};

Number.prototype.between = function(x, y) {
    return this > x && this < y;
};

Number.prototype.betweenEq = function(x, y) {
    return this >= x && this <= y;
};

Number.prototype.rangeTo = function(n) {
    var list = [], clone = this.valueOf();
    
    if(clone === n){return [n];};
    
    while(clone <= n) {
        list.push(clone);
        clone++;
    }
    
    while (clone >= n) {
        list.push(clone);
        clone--;
    }
    
    return list;
};

Number.prototype.absTo = function(n) {
    var x = this.valueOf();
    return Math.abs(x - n);
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
    var local = typeof global === "object" ? global : window;
    
	Object.defineProperty(local, name, {
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

function ss(scriptPath, callback, insertBody) {
    insertBody = insertBody || true;
	var script = document.createElement('script'); 
	script.type = 'text/javascript';
	script.src = scriptPath;
    if (insertBody) {
        document.body.appendChild(script);
    } else {
        document.head.appendChild(script);
    }
    
	script.onload = function() {
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
    function ua(ag) {
        return navigator.userAgent.match(ag);
    }
    
    if(ua(/Android/i)
    || ua(/webOS/i)
    || ua(/iPhone/i)
    || ua(/iPad/i)
    || ua(/iPod/i)
    || ua(/BlackBerry/i)
    || ua(/Windows Phone/i)
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
    //document.selection.empty();
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

function serializeForm(form) {
    /* needs more refactoring */
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
            qsa(selector).forEach(function(item) {
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
            qsa(selector).forEach(function(item) {
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
    var elements = qsa(selector);
    
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

function isNumericDigit(evt) {
    return (evt.keyCode >= 48 && evt.keyCode <= 57) 
        || (evt.keyCode >= 96 && evt.keyCode <= 105);
}

function dateDiffInDays(firstDateObj, lastDateObj) {
  var msPerDay = eval("_1d");
  var firstUtcDate = Date.UTC(firstDateObj.getFullYear(), firstDateObj.getMonth(), firstDateObj.getDate());
  var lastUtcDate  = Date.UTC(lastDateObj.getFullYear(),  lastDateObj.getMonth(),   lastDateObj.getDate());

  return Math.floor((lastUtcDate - firstUtcDate) / msPerDay);
}

function isNode(obj){
    return (
        typeof Node === "object" ? obj instanceof Node : 
        obj && typeof obj === "object" && typeof obj.nodeType === "number" && typeof obj.nodeName==="string"
    );
}

function isElement(obj){
    return (
        typeof HTMLElement === "object" ? obj instanceof HTMLElement : //DOM2
        obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string"
    );
}

function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (el.offsetParent === null || style.display === 'none');
}

function isObj(obj) {
    return typeof obj === 'object';
}

function isBool(item) {
    return typeof item === 'boolean';
}

function isStr(item) {
    return typeof item === 'string';
}

function escapeHtml(string) {
    var entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };
    
    return String(string).replace(/[&<>"'`=\/]/g, function(str) {
        return entityMap[str];
    });
}

function isIpv4(ip) {
    var str = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(ip);
  //var str = /^(?:(?:25[0-5]2[0-4][0-9][01]?[0-9][0-9]?)\.){3}(?:25[0-5]2[0-4][0-9][01]?[0-9][0-9]?)$/.test(ip);
    return str;
}

function isIpv6(ip) {
    var str = /^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/.test(ip);
    return str;
}

Math.log10 = function(val) {
  return Math.log(val) / Math.LN10;
};

Math.fact = function(x) {
    if (!x) return 1;
    return x * fact(x-1);
};

Math.isPrime = function(num) {
    for ( var i = 2; i < num; i++ ) {
        if ( num % i === 0 ) {
            return false;
        }
    }
    return true;
};

Math.genPrimes = function(n) {
    var primes = [2];
    for (var i = 3; i < n; i+=2 ) {
        if (Math.isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
};

function cursor(mode) {
    mode = mode || 'default';
    document.body.style.cursor = mode;
}

function strToBin(str, sep) {
    var output = ''; 
    sep = sep || '';
    
    for (var i = 0; i < str.length; i++) {
        output += str[i].charCodeAt(0).toString(2) + sep;
    }
    return output;
}

function strToHex(str, sep) {
    var output = ''; 
    sep = sep || '';
    
    for (var i = 0; i < str.length; i++) {
        output += str[i].charCodeAt(0).toString(16) + sep;
    }
    return output;
}

function strToOct(str, sep) {
    var output = ''; 
    sep = sep || '';
    
    for (var i = 0; i < str.length; i++) {
        output += str[i].charCodeAt(0).toString(8) + sep;
    }
    return output;
}

function hexToStr(str){
    var j, hexes = str.match(/.{1,4}/g) || [], back = '';
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
};

function binToStr(str) {
    var arr = str.split(" ");
    var finalStr;

    for (var i=0; i<arr.length; i++) {
        finalStr += String.fromCharCode((parseInt(arr[i], 2)));
    }

    return finalStr;
}

function reverse(item) {
    function r(x){return x.split('').reverse().join('');}
    
    if (isArray(item)) {
        return item.reverse();
    } else if (isStr(item)) {
        return r(item);
    } else if (isBool(item)) {
        return !item;
    } else if (isNumber(item)) {
        item = item.toString();
        return parseFloat(r(item));
    }
    return false;
}

function qsa(item) {
    return document.querySelectorAll(item);
}

function isInput(selector) {
    var query = qsa(selector);
        if ( ! isEmpty(query) ) {
            var elem = query[0].nodeName,
                result = ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].indexOf(elem);
            return result !== -1;
        }
        return false;
}

function FormFiller(formId) {
    
    this.form = qsa('#'+formId)[0];
	this.formId = formId;
	this.inputs = qsa('#'+formId+' input, #'+formId+' select, #'+formId+' textarea');
            
    FormFiller.prototype.getForm = function() {
        return this.form;
    };
    
    FormFiller.prototype.inputs = function() {
		return this.inputs;
    };
	
	FormFiller.prototype.validate = function() {
		this.form.reportValidity();
		return this;
	};
    
    return this;
}

function copyTextToClipboard(selector) {
    var d = document, aux = d.createElement("input");
    aux.setAttribute("value", qsa(selector)[0].innerHTML);
    d.body.appendChild(aux);
    aux.select();
    d.execCommand("copy");
    d.body.removeChild(aux);
}

function copyHtmlToClipboard(selector){
    var d = document, aux = d.createElement("div");
    aux.setAttribute("contentEditable", true);
    aux.innerHTML = qsa(selector)[0].innerHTML;
    aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)"); 
    d.body.appendChild(aux);
    aux.focus();
    d.execCommand("copy");
    d.body.removeChild(aux);
}

function palindrome(str) {
  
  var cleanStr = str.replace(/[\W\_]/gi, '').toLowerCase();
  var half  = parseInt((cleanStr.length / 2)); 
  var halfFirst = cleanStr.substring(0, half);    
  var halfSecond = cleanStr.slice(-half).split('').reverse().join('');   

  return (halfFirst === halfSecond);
}

function getEndPoint() {
    var urlSplit = window.location.href.split('/');
    urlSplit = urlSplit[urlSplit.length -1];
    return urlSplit.replace(/((\?)|(\/)|(\#)).*/, '');
}

function findLongestWord(str) {
  var longest = 0;
  str.split(' ').map(function(s) {
    if (s.length > longest) {
      longest = s.length;
    } 
  });
  
  return longest;
}

String.prototype.capitalise = function () {

  var sentence = '';
    
  this.toLowerCase().split(' ').map(function(word) {
    sentence += ' ' + word[0].toUpperCase() + word.substring(1, word.length);
  });
  
  return sentence.trim();
}

function baseConverter(strTxt, from, to, separator) {
    
} 

function rot13(str) {
  var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
  var index     = x => input.indexOf(x);
  var translate = x => index(x) > -1 ? output[index(x)] : x;
  return str.split('').map(translate).join('');
}

String.prototype.changeToBase = function(strTxt, from, to, separator) {
    return baseConverter(strTxt, from, to, separator);
};
 // TO-DO : FormFiller.zeroFill

Object.prototype.renameKey = function(oldName, newName) {
     if (oldName == newName) {
         return this;
     }
    
    if (this.hasOwnProperty(oldName)) {
        this[newName] = this[oldName];
        delete this[oldName];
    }
    
    return this;
};

Object.defineProperty(Array.prototype, "equals", {enumerable: false});
