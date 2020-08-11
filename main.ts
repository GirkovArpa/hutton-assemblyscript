'use strict';

import AsBind from 'https://unpkg.com/as-bind@0.4.0/dist/as-bind.esm.js?module';
const wasm = Deno.readFileSync('./assembly/hutton.wasm');

const asBindInstance = await AsBind.instantiate(wasm);
const { exports: { rotate, swap, mod, permutate, encrypt, decrypt } } = asBindInstance;

console.log(rotate('Hello World!'));
console.log(swap('Hello World!', 0, 6));
console.log(mod(-13, 64));
console.log(permutate('bar'));
console.log(encrypt('helloworld', 'foo', 'bar'));
console.log(decrypt('pwckfenttc', 'foo', 'bar'));
