
var exampleString = 'João Melão';
var exampleNumber = 123.45;
var exampleArray1 = ['Banana', 'Maçã', 'Uva', 'Morango'];
var exampleArray2 = [10];
var exampleArray3 = [];
var date = new Date();

var Person = {};
    Person.name     = 'Arnold';
    Person.lastName = 'Schwarzenegger';
    Person.age      = date.getFullYear() - 1947;
    Person.phrase   = function() {
        alert('Asta la vista, baby!');
    };
