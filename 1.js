function main() {
  const a = 1;
  let b = 2;
  var c = 3;
  const map = new Map();
  map.set(1, 2);
  map.set(2, 33333);

  const set = new Set();
  set.add(1);
  set.add(map);

  const d = {
    a,
    v: Promise.resolve(),
    e: map,
    g: 1,
    f: new Date(),
    h: set,
    m: new WeakMap(),
    n: new WeakSet()
  };
  console.log('Hello, World!');
}

main();
