# classlist-perf-test

> classList operation performance tests

## Install

```bash
npm i jeromedecoster/classlist-perf-test
```

## Results with 250 000 divs

| Action | Duration |
| :------ | :------- |
| **create 250 000**  divs | 1300 ms |
| **add class** (when the class **is not** on the div) | 210 ms |
| **add class** (when the class **is** on the div) | 80 ms |
| **remove class** (when the class **is** on the div) | 190 ms |
| **remove class** (when the class **is not** on the div) | 80 ms |
| **toggle class** (when the class **is not** on the div) | 160 ms |
| **toggle class** (when the class **is** on the div) | 200 ms |

### With cached `added = true|false` variable

| Action | Duration |
| :------ | :------- |
| **add class** (when the class **is not** on the div) | 160 ms |
| **add class** (when the class **is** on the div) | 3 ms |
| **remove class** (when the class **is** on the div) | 190 ms |
| **remove class** (when the class **is not** on the div) | 3 ms |

## Results with 1 600 divs

| Action | Duration |
| :------ | :------- |
| **create 1 600**  divs | 7 ms |
| **add class** (when the class **is not** on the div) | 2 ms |
| **add class** (when the class **is** on the div) | 1 ms |
| **remove class** (when the class **is** on the div) | 3 ms |
| **remove class** (when the class **is not** on the div) | 1 ms |
| **toggle class** (when the class **is not** on the div) | 2 ms |
| **toggle class** (when the class **is** on the div) | 2 ms |

### With cached `added = true|false` variable

| Action | Duration |
| :------ | :------- |
| **add class** (when the class **is not** on the div) | 2 ms |
| **add class** (when the class **is** on the div) | 0 ms |
| **remove class** (when the class **is** on the div) | 2 ms |
| **remove class** (when the class **is not** on the div) | 0 ms |

## License

MIT
