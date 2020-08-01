const PEOPLEJS_VERSION = "2.0.0"; 

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


String.prototype.trunc = function(n) {
    return this.substring(0, n);
};

String.prototype.capitalise = function () {

  var sentence = '';
    
  this.toLowerCase().split(' ').map(function(word) {
    sentence += ' ' + word[0].toUpperCase() + word.substring(1, word.length);
  });
  
  return sentence.trim();
};

String.prototype.changeToBase = function(strTxt, from, to, separator) {
    return baseConverter(strTxt, from, to, separator);
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

function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
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

function palindrome(str) {
  
  var cleanStr = str.replace(/[\W\_]/gi, '').toLowerCase();
  var half  = parseInt((cleanStr.length / 2)); 
  var halfFirst = cleanStr.substring(0, half);    
  var halfSecond = cleanStr.slice(-half).split('').reverse().join('');   

  return (halfFirst === halfSecond);
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
