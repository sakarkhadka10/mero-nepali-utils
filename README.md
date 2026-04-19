# 🇳🇵 Mero Nepali Utils

[![npm version](https://img.shields.io/npm/v/mero-nepali-utils.svg)](https://www.npmjs.com/package/mero-nepali-utils)
[![npm downloads](https://img.shields.io/npm/dm/mero-nepali-utils.svg)](https://www.npmjs.com/package/mero-nepali-utils)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/mero-nepali-utils)](https://bundlephobia.com/package/mero-nepali-utils)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
![CI](https://github.com/sakarkhadka10/mero-nepali-utils/actions/workflows/ci.yml/badge.svg)

## ⚡ Quick Example
```ts
import { meroBs, meroAd } from "mero-nepali-utils";

meroBs("2024-04-13"); // "2081-01-01"
meroAd("2081-01-01"); // "2024-04-13"
```
---

> ⚡ Fast, accurate Nepali date library for BS ↔ AD conversion, formatting, and localization

---

## 🚀 Why Mero Nepali Utils?

Most Nepali date libraries are:
- ❌ Slow (linear search)
- ❌ Inaccurate (date drift)
- ❌ Hard to use

**Mero Nepali Utils is different:**

- ⚡ **O(log n) conversion (faster than most libraries)**
- 🎯 **Accurate BS data** (2000–2090)
- 🧠 **Modern API (like dayjs)**
- 🔢 **Built-in Nepali number conversion**
- 🌐 **Localization support (NP / EN)**
- 🧠 **TypeScript-first (fully typed)**
- 🪶 **< 5KB gzipped**
- 📦 **Tree-shakable**

Unlike most libraries, this avoids iterative date calculations and uses precomputed offsets + binary search for speed and accuracy.

---
## 📦 Installation

```bash
npm install mero-nepali-utils
```

## Quick Start 
```ts
import { MeroDate } from "mero-nepali-utils";

const date = new MeroDate("2024-04-13");

// Convert AD → BS
date.toBS();
// "2081-01-01"

// Format (Nepali)
date.format("YYYY MMMM DD", { locale: "np" });
// "2081 बैशाख 01"

// Add days
date.addDays(5).toBS();

// Relative time
date.fromNow();
// "x days ago"
```

## 🔁 Date Conversion
#### AD => BS
```ts
import { meroBs } from "mero-nepali-utils";

meroBs("2024-04-13");
// "2081-01-01"
```
#### BS => AD
```ts
import { meroAd } from "mero-nepali-utils";

meroAd("2081-01-01");
// "2024-04-13"
```

## 🎨 Formatting
Supports customizable tokens like YYYY, MM, DD, MMMM for flexible UI formatting.
```ts
import { formatBs } from "mero-nepali-utils";

formatBs("2081-01-01", "YYYY MMMM DD", { locale: "np" });
// "2081 बैशाख 01"

formatBs("2081-01-01", "YYYY-MM-DD");
// "2081-01-01"
```

## 🔢 Number Conversion
#### English => Nepali
```ts
import { toNepaliNumber } from "mero-nepali-utils";

toNepaliNumber(12345);
// "१२३४५"
```
#### Nepali => English
```ts
import { toEnglishNumber } from "mero-nepali-utils";

toEnglishNumber("१२३४५");
// "12345"
```

## 📅 MeroDate (Powerful API)
**Inspired by modern libraries like dayjs.**
```ts
import { MeroDate } from "mero-nepali-utils";

const d = new MeroDate("2024-01-01");

d.toBS();
d.toAD();

d.format("YYYY MMMM DD", { locale: "np" });

d.addDays(10);
d.subtractDays(5);

d.fromNow();
```
## 🔁 Data Integrity
```ts
import { isRoundTripValid } from "mero-nepali-utils";

isRoundTripValid("2081-01-01");
// true
```

## 🧠 Best Practice
**👉 Always store dates in AD (ISO format) in your database.**
#### Convert only in UI:
```ts
const nepaliDate = new MeroDate(createdAt).toBS();
```

## 📁 Supported Range
- BS: 2000 → 2090
- Fully verified with official calendar data

## 🛠️ Use Cases
- 🇳🇵 Nepali SaaS apps
- 📊 Dashboards
- 🧾 Invoice systems
- 🏦 Fintech apps
- 📅 Date pickers
- 🌐 Localization

## ⚖️ Comparison
- 🧪 **90%+ test coverage (reliable & production-safe)**
| Feature | Mero Nepali Utils | Other Libraries |
|--------|------------------|----------------|
| Speed | ⚡ O(log n) | ❌ Linear |
| Accuracy | ✅ Verified BS data | ⚠️ Often inconsistent |
| API | 🧠 Modern (dayjs-like) | ❌ Outdated |
| Size | 🪶 < 5KB | ⚠️ Larger |
| TypeScript | ✅ Fully typed | ⚠️ Partial |

## ❓ Why not use JavaScript Date?
JavaScript's native `Date` does **not support Bikram Sambat (BS)**.

This library provides:

- BS ↔ AD conversion
- Nepali month names
- Nepali number formatting

👉 All with accurate calendar data


## Used In Production
Running in real-world Nepali applications
- [merokarya.com](https://merokarya.com/date-converter)

## 👨 Author
- [sakarkhadka.com.np](https://sakarkhadka.com.np)

## 📚 API Documentation 
- [API DOCS LIVE URL](https://sakarkhadka10.github.io/mero-nepali-utils) 

## 📦 Version
Actively maintained and production-ready.

## 🔍 Keywords

nepali date converter, bikram sambat, bs to ad, ad to bs, nepali calendar, nepali numbers, devanagari, nepali localization

## 📄 License
MIT © [Sakar Khadka](https://github.com/sakarkhadka10)
