'use strict';

import { assertEquals } from 'https://deno.land/std@0.64.0/testing/asserts.ts';
import AsBind from 'https://unpkg.com/as-bind@0.4.0/dist/as-bind.esm.js?module';
const wasm = Deno.readFileSync('./assembly/hutton.wasm');

const asBindInstance = await AsBind.instantiate(wasm);
const { exports: { rotate, swap, mod, permutate, encrypt, decrypt } } = asBindInstance;

assertEquals(mod(-13, 64), 51);
assertEquals(rotate('foo'), 'oof');
assertEquals(swap('barcdefghijklmnopqstuvwxyz', 8, 16), 'barcdefgpijklmnohqstuvwxyz');
assertEquals(permutate('bar'), 'barcdefghijklmnopqstuvwxyz');
assertEquals(encrypt('helloworld', 'foo', 'bar'), 'pwckfenttc');
assertEquals(decrypt('pwckfenttc', 'foo', 'bar'), 'helloworld');

console.log('all tests completed');