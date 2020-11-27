window.BENCHMARK_DATA = {
  "lastUpdate": 1606497618396,
  "repoUrl": "https://github.com/napi-rs/fast-escape",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "lynweklm@gmail.com",
            "name": "LongYinan",
            "username": "Brooooooklyn"
          },
          "committer": {
            "email": "lynweklm@gmail.com",
            "name": "LongYinan",
            "username": "Brooooooklyn"
          },
          "distinct": true,
          "id": "c05a609bf552f76794f7be5497e80319cc88ac54",
          "message": "chore: ajust benchmark result format",
          "timestamp": "2020-10-19T15:16:22+08:00",
          "tree_id": "cf05ac7087d2b79f04f5b2b74439064071cd5fe1",
          "url": "https://github.com/napi-rs/fast-escape/commit/c05a609bf552f76794f7be5497e80319cc88ac54"
        },
        "date": 1603092059178,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "napi @ Large input",
            "value": 594,
            "range": "±1.20%",
            "unit": "ops/sec",
            "extra": "85 samples"
          },
          {
            "name": "napi#buff @ Large input",
            "value": 707,
            "range": "±4.58%",
            "unit": "ops/sec",
            "extra": "85 samples"
          },
          {
            "name": "napi#asyncBuff @ Large input",
            "value": 631,
            "range": "±1.90%",
            "unit": "ops/sec",
            "extra": "81 samples"
          },
          {
            "name": "javascript @ Large input",
            "value": 439,
            "range": "±0.90%",
            "unit": "ops/sec",
            "extra": "78 samples"
          },
          {
            "name": "napi @ Small input",
            "value": 1646277,
            "range": "±0.85%",
            "unit": "ops/sec",
            "extra": "88 samples"
          },
          {
            "name": "napi#buff @ Small input",
            "value": 1937342,
            "range": "±1.02%",
            "unit": "ops/sec",
            "extra": "87 samples"
          },
          {
            "name": "napi#asyncBuff @ Small input",
            "value": 28160,
            "range": "±2.35%",
            "unit": "ops/sec",
            "extra": "77 samples"
          },
          {
            "name": "javascript @ Small input",
            "value": 1507770,
            "range": "±0.88%",
            "unit": "ops/sec",
            "extra": "88 samples"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "lynweklm@gmail.com",
            "name": "LongYinan",
            "username": "Brooooooklyn"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "7bafc18cac0190044061ac8461b608448d841125",
          "message": "Merge pull request #38 from napi-rs/napi-1-pre\n\nNapi 1 pre",
          "timestamp": "2020-11-28T01:17:19+08:00",
          "tree_id": "a4fba37df610d6db94e09969a2fe5980604dc8f2",
          "url": "https://github.com/napi-rs/fast-escape/commit/7bafc18cac0190044061ac8461b608448d841125"
        },
        "date": 1606497617760,
        "tool": "benchmarkjs",
        "benches": [
          {
            "name": "napi @ Large input",
            "value": 563,
            "range": "±1.08%",
            "unit": "ops/sec",
            "extra": "85 samples"
          },
          {
            "name": "napi#buff @ Large input",
            "value": 684,
            "range": "±0.76%",
            "unit": "ops/sec",
            "extra": "88 samples"
          },
          {
            "name": "napi#asyncBuff @ Large input",
            "value": 617,
            "range": "±0.96%",
            "unit": "ops/sec",
            "extra": "83 samples"
          },
          {
            "name": "javascript @ Large input",
            "value": 440,
            "range": "±0.98%",
            "unit": "ops/sec",
            "extra": "83 samples"
          },
          {
            "name": "napi @ Small input",
            "value": 1492838,
            "range": "±1.01%",
            "unit": "ops/sec",
            "extra": "91 samples"
          },
          {
            "name": "napi#buff @ Small input",
            "value": 1651702,
            "range": "±1.19%",
            "unit": "ops/sec",
            "extra": "86 samples"
          },
          {
            "name": "napi#asyncBuff @ Small input",
            "value": 27255,
            "range": "±1.80%",
            "unit": "ops/sec",
            "extra": "78 samples"
          },
          {
            "name": "javascript @ Small input",
            "value": 1307238,
            "range": "±0.80%",
            "unit": "ops/sec",
            "extra": "89 samples"
          }
        ]
      }
    ]
  }
}