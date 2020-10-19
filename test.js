var a = 1;
// function x() {
//     var b = 2;
//     function y() {
//         var c = 3;
//         function z() {
//             var d = 4;
//         }
//         z();
//         console.log(a)
//         console.log(b)
//         console.log(c)
//         console.log(d)
//     }
//     y()
// }
// x()

// var i = 1;
// var sum = 0;
// do {
//     sum += i;
//     i++
// } while (i < 1);
// console.log(sum)

// var person = {
//     "1stName": "ohm",
//     "lastName": "ieie",
//     "age": 10,
//     "isSingle": false
// }
// console.log(person.lastName)
// console.log(person.age)
// console.log(person.isSingle)

// var eat = false;
// var animal = true;
// var cat = eat ? (animal ? "1" : "2") : (animal ? "3" : "4")
// console.log(cat)

// var str = "Hello JavaScript World!";

// console.log(str.substr(6, 16))

// var win = 2;
// var p = "";

// switch (win) {
//     case 1:
//         p += "gold";
//     case 2:
//         p += "silvar";
//     case 3:
//         p += "bronze";
//     default:
//         p += "and";
// }
// console.log("you got " + p)

// let x = 1;
// function addTwo() {
//     let x = x + 2;
// }
// addTwo();
// x = x + 1;
// console.log(x)

// let sum = 0;
// for (i = 0; i < 6; i++) {
//     if (i === 4) { continue; }
//     sum += i
// }
// console.log(sum)

var str = "Hello JavaScript World!";
console.log(str.splice(6, 16))