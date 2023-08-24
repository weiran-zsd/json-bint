# jsonbn (json + bigint supports)

## Why?

JSONBN：一个专为解决 JSON 不支持 BigInt 类型的问题而设计的开源 npm 包。在许多应用程序中，BigInt 类型用于表示超出传统 JavaScript 数值范围的大整数，但是标准的 JSON 解析器无法直接处理这种类型。JSONBN 正是为了填补这一缺失而诞生的。

JSONBN 提供了一种简便的方式，可以在将 BigInt 值序列化为 JSON 字符串时，确保其信息不会丢失。同时，它还能够在解析 JSON 字符串时，将包含 BigInt 值的字段正确地转换为 JavaScript 中的 BigInt 类型，以便应用程序可以无缝处理这些数据。

## Solution
JSONBN 提供了一种简单的解决方案，以确保 BigInt 值在 JSON 序列化和解析过程中的完整性：

序列化（BigInt to JSON）：在将包含 BigInt 值的对象序列化为 JSON 字符串时，JSONBN 会将 BigInt 值转换为正确的数值，以避免信息丢失。这确保了在反序列化时能够正确还原 BigInt 值。

反序列化（JSON to BigInt）：在解析 JSON 字符串时，JSONBN 会检测到超出安全范围的整数，并将其转换回 JavaScript 中的 BigInt 类型，以确保数据的准确性。

## Usage

```sh
$ npm i jsonbn
```

```js
import JSONB from 'jsonbn'

JSON.parse('{"foo": 12345678901234567890}') // { foo: 12345678901234567000 }
JSONB.parse('{"foo": 12345678901234567890}') // { foo: 12345678901234567890n }

JSON.stringify({ foo: 12345678901234567890n }) // Uncaught TypeError: Do not know how to serialize a BigInt
JSONB.stringify({ foo: 12345678901234567890n }) // '{"foo": 12345678901234567890}'
```

## Perf

TODO.

## Credits:
* 唯然<weiran.zsd@outlook.com>

## Lisente

MIT
