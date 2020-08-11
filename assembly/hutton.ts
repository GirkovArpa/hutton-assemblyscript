const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export function mod(n: i32, m: i32): i32 {
  return ((n % m) + m) % m;
}

export function rotate(s: string): string {
  const c = s.charAt(0);
  const sliced = s.slice(1);
  return sliced.concat(c);
}

export function swap(s: string, i: i32, j: i32): string {
  const chars = s.split('');
  const a = chars[i];
  const b = chars[j];
  chars[i] = b;
  chars[j] = a;
  return chars.join('');
}

export function permutate(key: string): string {
  let abc = ALPHABET;
  let set: Set<string> = new Set();
  for (let i = 0, len = key.length; i < len; i++) {
    let char = key.charAt(i);
    abc = abc.replace(char, '');
    set.add(char);
  }
  return set
    .values()
    .join('')
    .concat(abc);
}

export function encrypt(pt: string, pw: string, k: string, ct: string = '', perm: string = permutate(k)): string {
  const pwC = pw.charAt(0);
  const pwC_i = ALPHABET.indexOf(pwC);
  const permC = perm.charAt(0);
  const permC_i = ALPHABET.indexOf(permC);
  const shift = (pwC_i + permC_i + 2);
  const ptC = pt.charAt(0);
  const ctC_i = (shift + perm.indexOf(ptC)) % ALPHABET.length;
  const ctC = perm.charAt(ctC_i);
  const ptC_i = perm.indexOf(ptC);

  const ptSlice = pt.slice(1);
  const pwRotated = rotate(pw);
  const ctNew = ct.concat(ctC);
  const permSwapped = swap(perm, ptC_i, ctC_i);

  return (pt.length == 0) ? ct : encrypt(ptSlice, pwRotated, k, ctNew, permSwapped);
}

export function decrypt(ct: string, pw: string, k: string, pt: string = '', perm: string = permutate(k)): string {
  const pwC = pw.charAt(0);
  const pwC_i = ALPHABET.indexOf(pwC);
  const permC = perm.charAt(0);
  const permC_i = ALPHABET.indexOf(permC);
  const shift = -(pwC_i + permC_i + 2);
  const ctC = ct.charAt(0);
  const ptC_i = mod(shift + perm.indexOf(ctC), ALPHABET.length);
  const ptC = perm.charAt(ptC_i);
  const ctC_i = perm.indexOf(ctC);

  const ctSlice = ct.slice(1);
  const pwRotated = rotate(pw);
  const ptNew = pt.concat(ptC);
  const permSwapped = swap(perm, ctC_i, ptC_i);

  return (ct.length == 0) ? pt : decrypt(ctSlice, pwRotated, k, ptNew, permSwapped);
}
