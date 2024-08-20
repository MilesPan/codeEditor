// JavaScript code here
const a = 1;
let b = 2;
const m = new Map()
m.set(1, { name: 666 })
m.set(2, { name: 777 })
var c = {
    a,
    b,
    d: {
        e: 6,
        f: [4, 5, 6, m],
        m: new Set(),
        n: new Promise((resolve, reject) => { })
    }
}
console.log(c)