// JavaScript code here
const a = 1;
let b = 2;
var c = {
    a,
    b,
    d: {
        e: 6,
        f: [4,5,6, new Map()],
        m: new Set(),
        n: new Promise((resolve, reject) => {})
    }
}
console.log(c)