# 🇳🇵 Mero Nepali Utils

![Mero Nepali Utils Preview](https://www.merokarya.com/mero-nepali-utils-image.png)

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

## 💡 Why this exists

Handling Nepali dates in JavaScript has always been painful.
This library was built to provide:

- accurate conversion
- clean developer experience
- modern API

without hacks or inconsistencies.

---

## 📦 Installation

```bash
npm install mero-nepali-utils
```

## Quick Start

```ts
import { MeroDate } from "mero-nepali-utils";

const date = MeroDate("2024-04-13");

// Convert
date.toBS(); // "2081-01-01"

// Format
date.format("YYYY MMMM DD", { locale: "np" });
// "2081 बैशाख 01"

// Add / subtract
date.addDays(5).toBS();

// Relative
date.fromNow();
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

Supports customizable tokens like YYYY, YY, MMMM, MM, M, DD, D for flexible UI formatting.

```ts
import { formatBs } from "mero-nepali-utils";

formatBs("2081-01-01", "YYYY MMMM DD", { locale: "np" });
// "2081 बैशाख 01"

formatBs("2081-01-01", "DD/MM/YY");
// "01/01/81"
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

const d = MeroDate("2024-01-01");

d.toBS();
d.toAD();

d.format("YYYY MMMM DD", { locale: "np" });

d.addDays(10);
d.subtractDays(5);

d.fromNow();
```

## Plugins:

```ts
import { MeroDate } from "mero-nepali-utils";
import {
  diffPlugin,
  isSamePlugin,
  isBetweenPlugin,
  startEndPlugin,
  relativeTimePlugin,
} from "mero-nepali-utils";

MeroDate.extend(diffPlugin);
MeroDate.extend(isSamePlugin);
MeroDate.extend(isBetweenPlugin);
MeroDate.extend(startEndPlugin);
MeroDate.extend(relativeTimePlugin);

const d = MeroDate("2024-01-05");

// ✅ Calendar-aware logic (works perfectly for both BS & AD)
d.diff("2024-01-01", "days");
d.isSame("2024-01-05", "day");
d.fromNow(); // Now supports weeks and localized strings
d.startOf("month");
d.endOf("month");
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
const nepaliDate = MeroDate(createdAt).toBS();
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

| Feature    | Mero Nepali Utils | Others          |
| ---------- | ----------------- | --------------- |
| Speed      | ⚡ O(log n)       | ❌ Linear       |
| Accuracy   | ✅ Verified       | ⚠️ Inconsistent |
| API        | 🧠 Modern         | ❌ Outdated     |
| Size       | 🪶 < 5KB          | ⚠️ Larger       |
| TypeScript | ✅ Full           | ⚠️ Partial      |

## Why not use JavaScript Date?

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

nepali date, nepali date converter, bikram sambat, bs to ad converter, ad to bs converter, nepali calendar js, nepali date javascript, nepali date npm, nepali date library, bs calendar conversion, nepali localization, devanagari numbers, nepali number converter, nepali date formatter

## 📄 License

MIT © [Sakar Khadka](https://github.com/sakarkhadka10)
