# `@napi-rs/fast-escape`

![actions](https://github.com/napi-rs/fast-escape/workflows/CI/badge.svg)

## Install this package

```
yarn add @napi-rs/fast-escape
```

## Support matrix


|                  | node12 | node14 | node16 |
| ---------------- | ------ | ------ | ------ |
| Windows x64      | ✓      | ✓      | ✓      |
| Windows x32      | ✓      | ✓      | ✓      |
| Windows arm64    | ✓      | ✓      | ✓      |
| macOS x64        | ✓      | ✓      | ✓      |
| macOS arm64      | ✓      | ✓      | ✓      |
| Linux x64 gnu    | ✓      | ✓      | ✓      |
| Linux x64 musl   | ✓      | ✓      | ✓      |
| Linux arm gnu    | ✓      | ✓      | ✓      |
| Linux arm64 gnu  | ✓      | ✓      | ✓      |
| Linux arm64 musl | ✓      | ✓      | ✓      |
| Android arm64    | ✓      | ✓      | ✓      |
| FreeBSD x64      | ✓      | ✓      | ✓      |

## Performance

```
Model Name: MacBook Pro
Model Identifier: MacBookPro15,1
Processor Name: 6-Core Intel Core i9
Processor Speed: 2.9 GHz
Number of Processors: 1
Total Number of Cores: 6
L2 Cache (per Core): 256 KB
L3 Cache: 12 MB
Hyper-Threading Technology: Enabled
Memory: 32 GB
```

```js
napi x 799 ops/sec ±0.38% (93 runs sampled)
napi#buff x 980 ops/sec ±1.39% (92 runs sampled)
napi#asyncBuff x 805 ops/sec ±1.33% (75 runs sampled)
javascript x 586 ops/sec ±1.40% (81 runs sampled)
Escape html benchmark # Large input bench suite: Fastest is napi#buff
napi x 2,158,169 ops/sec ±0.59% (93 runs sampled)
napi#buff x 2,990,077 ops/sec ±0.73% (93 runs sampled)
napi#asyncBuff x 66,540 ops/sec ±3.02% (77 runs sampled)
javascript x 1,951,484 ops/sec ±0.31% (92 runs sampled)
Escape html benchmark # Small input bench suite: Fastest is napi#buff
```

## Develop requirements

- Install latest `Rust`
- Install `NodeJS@10+` which supports `N-API`
- Install `yarn@1.x`

## Test in local

- `yarn`
- `yarn build`
- `yarn test`

And you will see:

```bash
$ ava --verbose

  ✔ escape html
  ─

  1 test passed
✨  Done in 1.47s.
```

## Release package

Ensure you have set you **NPM_TOKEN** in `Github` project setting.

In `Settings -> Secrets`, add **NPM_TOKEN** into it.

When you want release package:

```
yarn version [xxx]

git push --follow-tags
```

Github actions will do the rest job for you.
