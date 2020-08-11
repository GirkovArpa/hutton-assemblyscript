'use strict';

type char = string;

const ALPHABET: string = 'abcdefghijklmnopqrstuvwxyz';

export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function rotate(s: string): string {
  const c: char = s[0];
  const sliced: string = s.slice(1);
  const rotated: string = sliced.concat(c);
  return rotated;
}

export function swap(s: string, i: usize, j: usize): string {
  const chars: char[] = s.split('');
  const a: char = chars[i];
  const b: char = chars[j];
  chars[i] = b;
  chars[j] = a;
  const swapped: string = chars.join('');
  return swapped;
}

export function permutate(key: string): string {
  let abc: string = ALPHABET;
  let set: Set<char> = new Set();
  for (let i = 0; i < key.length; i++) {
    const char: char = key[i];
    abc = abc.replace(char, '');
    set.add(char);
  }
  const uniques: string[] = set.values();
  return uniques.join('').concat(abc);
}

export function encrypt(pt: string, pw: string, k: string, ct: string = '', perm: string = permutate(k)): string {
  const pwC: char = pw[0];
  const pwC_i: number = ALPHABET.indexOf(pwC);
  const permC: char = perm[0];
  const permC_i: number = ALPHABET.indexOf(permC);
  const shift: number = (pwC_i + permC_i + 2);
  const ptC: char = pt[0];
  const ctC_i: number = (shift + perm.indexOf(ptC)) % ALPHABET.length;
  const ctC: string = perm[ctC_i as usize];
  const ptC_i: number = perm.indexOf(ptC);

  const ptSlice: string = pt.slice(1);
  const pwRotated: string = rotate(pw);
  const ctNew: string = ct.concat(ctC);
  const permSwapped: string = swap(perm, ptC_i as usize, ctC_i as usize);

  return (pt.length == 0) ? ct : encrypt(ptSlice, pwRotated, k, ctNew, permSwapped);
}

export function decrypt(ct: string, pw: string, k: string, pt: string = '', perm: string = permutate(k)): string {
  const pwC: char = pw[0];
  const pwC_i: number = ALPHABET.indexOf(pwC);
  const permC: char = perm[0];
  const permC_i: number = ALPHABET.indexOf(permC);
  const shift: number = -(pwC_i + permC_i + 2);
  const ctC: char = ct[0];
  const ptC_i: number = mod((shift + perm.indexOf(ctC)), ALPHABET.length);
  const ptC: string = perm[ptC_i as usize];
  const ctC_i: number = perm.indexOf(ctC);

  const ctSlice: string = ct.slice(1);
  const pwRotated: string = rotate(pw);
  const ptNew: string = pt.concat(ptC);
  const permSwapped: string = swap(perm, ctC_i as usize, ptC_i as usize);

  return (ct.length == 0) ? pt : decrypt(ctSlice, pwRotated, k, ptNew, permSwapped);
}