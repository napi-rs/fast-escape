# `@napi-rs/fast-escape`

![actions](https://github.com/napi-rs/fast-escape/workflows/CI/badge.svg)

## Install this package

```
yarn add @napi-rs/fast-escape
```

## Performance

```
Model Name: MacBook Pro
Model Identifier: Mac17,6
Chip: Apple M5 Max
Total Number of Cores: 18 (6 Super and 12 Performance)
Memory: 128 GB
```

Large input bench suite:

```
┌─────────┬──────────────────┬──────────────────┬───────────────────┬────────────────────────┬────────────────────────┬─────────┐
│ (index) │ Task name        │ Latency avg (ns) │ Latency med (ns)  │ Throughput avg (ops/s) │ Throughput med (ops/s) │ Samples │
├─────────┼──────────────────┼──────────────────┼───────────────────┼────────────────────────┼────────────────────────┼─────────┤
│ 0       │ 'napi'           │ '351969 ± 0.90%' │ '333000 ± 6041.5' │ '2915 ± 0.40%'         │ '3003 ± 55'            │ 2844    │
│ 1       │ 'napi#buff'      │ '189497 ± 1.20%' │ '173791 ± 4083.5' │ '5578 ± 0.35%'         │ '5754 ± 136'           │ 5278    │
│ 2       │ 'napi#asyncBuff' │ '198804 ± 1.11%' │ '182792 ± 5249.0' │ '5293 ± 0.37%'         │ '5471 ± 158'           │ 5031    │
│ 3       │ 'javascript'     │ '523565 ± 1.65%' │ '474708 ± 13209'  │ '2016 ± 0.67%'         │ '2107 ± 59'            │ 1910    │
└─────────┴──────────────────┴──────────────────┴───────────────────┴────────────────────────┴────────────────────────┴─────────┘
```

Small input bench suite:

```
┌─────────┬──────────────────┬──────────────────┬───────────────────┬────────────────────────┬────────────────────────┬──────────┐
│ (index) │ Task name        │ Latency avg (ns) │ Latency med (ns)  │ Throughput avg (ops/s) │ Throughput med (ops/s) │ Samples  │
├─────────┼──────────────────┼──────────────────┼───────────────────┼────────────────────────┼────────────────────────┼──────────┤
│ 0       │ 'napi'           │ '94.76 ± 0.19%'  │ '83.00 ± 0.00'    │ '11224054 ± 0.01%'     │ '12048193 ± 0'         │ 10552581 │
│ 1       │ 'napi#buff'      │ '75.78 ± 0.09%'  │ '83.00 ± 1.00'    │ '14731006 ± 0.02%'     │ '12048193 ± 143431'    │ 13195836 │
│ 2       │ 'napi#asyncBuff' │ '6582.5 ± 2.40%' │ '6541.0 ± 1250.0' │ '170745 ± 0.15%'       │ '152882 ± 26571'       │ 151919   │
│ 3       │ 'javascript'     │ '179.94 ± 0.63%' │ '167.00 ± 0.00'   │ '5934050 ± 0.01%'      │ '5988024 ± 0'          │ 5557461  │
└─────────┴──────────────────┴──────────────────┴───────────────────┴────────────────────────┴────────────────────────┴──────────┘
```

Fastest is `napi#buff` in both suites.

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
