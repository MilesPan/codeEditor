const a = 1;
let b = 2;
const m = new Map([[1, { name: 666 }], [2, { name: 777 }]])R
const s = new Set([1,2,3,4])
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