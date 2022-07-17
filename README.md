# micro-packed

> Less painful binary encoding / decoding

Allows declarative definition for complex structures (like in C/Rust) via composable primitives,
which enables encoding these structures into bytes and parsing back.

```ts
import * as P from 'micro-packed';
let other = P.struct({ a: U16BE, b: U16LE });
let s = P.struct({
  field1: P.U32BE,
  // strings, bytes, prefix and array first arg is length. It can be:
  // - dynamic: via CoderType<number>. First U8 in this case if length of elemnt
  field2: P.string(U8),
  // - fixed length, reads 32 bytes, no prefix
  field3: P.bytes(32),
  // NOTE: array uses prefix as element count, not byte count!
  field4: P.array(P.U16BE, P.struct({subField1: P.U64BE, subField2: P.string(10) }))
  // - string to access previous fields in structure
  field5: 'field4.subField',
  // - null -- read until buffer exhausted
  field6: other,
  field7: P.string(null)
})
```

## Utils

### Tuple

Same as struct, but without fields names

```ts
import * as P from 'micro-packed';

let s = tuple([P.U32BE, P.U8, P.bytes(32), ...])
```

### Map

Like enum in C (but without iota).

Allows to map encoded values to string

```ts
import * as P from 'micro-packed';
let s = map(P.U8, {
  name1: 1,
  name2: 2,
});
s.decode(new Uint8Array([0x01])); // 'name1'
s.decode(new Uint8Array([0x02])); // 'name2'
s.decode(new Uint8Array([0x00])); // Error!
```

### Tag

Like enum in Rust.

Allows to choice stucture based on some value.
Depending on value of first byte, it will be decoded as array, string or number.

```ts
import * as P from 'micro-packed';

let s = P.tag(P.U8, {
  0x1: P.array(u16, ...),
  0x2: P.string(u16, ...),
  0x3: P.U32BE,
})
```

### Magic

Encodes some constant value into bytes and checks if it is the same on decoding.

```ts
import * as P from 'micro-packed';

let s = P.magic(U8, 123);
s.encode(); // Uint8Array([123])
s.decode(new Uint8Array([123])); // ok
s.decode(new Uint8Array([124])); // error!
```

### Bits

Allows to parse bit-level elements:

```ts
import * as P from 'micro-packed';
// NOTE: structure should parse whole amount of bytes before it can start parsing byte-level elements.
let s = P.struct({ magic: P.bits(1), version: P.bits(1), tag: P.bits(4), len: P.bits(2) });
```

### Pointer

Encodes element as offset into real bytes

```ts
import * as P from 'micro-packed';
const s = P.pointer(P.U8, P.U8);
s.encode(123); // new Uint8Array([1, 123]), first byte is offset position of real value
```

### Padding

Allows to pad value with zero bytes. Optional argument allows to generate padding value based on position.

```ts
import * as P from 'micro-packed';
P.padLeft(3, U8).encode(123); // Uint8Array([0, 0, 123])
P.padRight(3, U8).encode(123); // Uint8Array([123, 0, 0])
```


### Flag

Decodes as true if the value is the same.

```ts
import * as P from 'micro-packed';
const s = P.flag(new Uint8Array([1, 2, 3]));
```

### Flagged

Decodes / encodes struct only when flag/bool value (described as path in structure) is true (conditional encoding).

```ts
import * as P from 'micro-packed';
const s = P.struct({ f: P.flag(new Uint8Array([0x0, 0x1])), f2: P.flagged('f', P.U32BE) });
```

### Optional

Decodes/encodes value only if prefixed flag is true (or encodes default value).

```ts
import * as P from 'micro-packed';
const s = P.optional(P.bool, P.U32BE, 123);
```

### Primitive types

There is: bool, U8, U[16|32|64|128|256][le|be]
Other numeric types can be created via

```ts
import * as P from 'micro-packed';

const U32LE = P.int(4, true); // up to 6 bytes (48 bits)
const I256LE = P.bigint(32, true, true); // no limits
```

## License

MIT (c) Paul Miller [(https://paulmillr.com)](https://paulmillr.com), see LICENSE file.
