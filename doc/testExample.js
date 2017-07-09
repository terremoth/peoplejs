
var exampleString = 'João Melão';
var exampleNumber = 123.456;
var exampleArray1 = ['Banana', 'Maçã', 'Uva', 'Morango'];
var exampleArray2 = Randomic.arrayInt();
var date = new Date();

var Person = {};
    Person.name     = 'Arnold';
    Person.lastName = 'Schwarzenegger';
    Person.age      = date.getFullYear() - 1947;
    Person.phrase   = function() {
        alert('Asta la vista, baby!');
    };
