# 🇳🇵 Mero Nepali Utils

![Mero Nepali Utils Preview](https://www.merokarya.com/mero-nepali-utils-image.png)

[![npm version](https://img.shields.io/npm/v/mero-nepali-utils.svg)](https://www.npmjs.com/package/mero-nepali-utils)
[![npm downloads](https://img.shields.io/npm/dm/mero-nepali-utils.svg)](https://www.npmjs.com/package/mero-nepali-utils)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/mero-nepali-utils)](https://bundlephobia.com/package/mero-nepali-utils)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
![CI](https://github.com/sakarkhadka10/mero-nepali-utils/actions/workflows/ci.yml/badge.svg)

## ⚡ Quick Example

```ts
import { MeroDate } from "mero-nepali-utils"; 
const d = MeroDate("2024-04-13"); 
d.toBS(); // "2081-01-01" 
d.format("YYYY MMMM DD"); // "2081 बैशाख 01"
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

## Core Concepts (Important)
#### Always store dates in AD
```ts
// GOOD 
 createdAt = "2024-04-13"; 
// Convert only in UI 
 MeroDate(createdAt).toBS();
```
#### Don’t store BS in database
- Causes bugs
- Hard to integrate with APIs
- Not standard


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

## Formatting

Supports customizable tokens like YYYY, YY, MMMM, MM, M, DD, D for flexible UI formatting.

```ts
const d = MeroDate("2024-04-13");

d.format("YYYY-MM-DD") // 2081-01-01
d.format("DD/MM/YYYY") // 01/01/2081
d.format("DD MMMM YYYY") // 01 बैशाख 2081
```
## Locale
```ts
MeroDate.locale("np");
d.format("MMMM"); // बैशाख

MeroDate.locale("en");
d.format("MMMM"); // Baishakh
```

## Number Conversion
```ts
import { toNepaliNumber, toEnglishNumber } from "mero-nepali-utils";
toNepaliNumber(123); // १२३
toEnglishNumber("१२३"); // 123
```

## 📅 MeroDate (Powerful API)
**Inspired by modern libraries like dayjs.**

```ts
const d = MeroDate("2024-01-01");

d.toBS(); // 2080-09-16
d.toAD(); // 2024-01-01

d.addDays(5).toAD(); // 2024-01-06
d.subtractDays(5).toAD(); // 2023-12-27

d.clone(); // new instance
d.valueOf(); // timestamp
```
## React Usage (VERY IMPORTANT)
```ts
//this will crash because React cannot render objects. 
<p>{d.addDays(5)}</p>

// Correct Way
<p>{d.addDays(5).toBS()}</p> 
<p>{d.format("DD MMM YYYY")}</p>
```

## 🔌 Plugins (Auto-enabled)
No setup needed — everything works out of the box.

- diff()
```ts
d.diff("2024-01-01", "days"); // 4
d.diff("2024-01-01", "months"); // 0
```

- isSame()
```ts
d.isSame("2024-01-01"); // true
d.isSame("2024-01-01", "month"); // true
```

- isBetween()
```ts
d.isBetween("2024-01-01", "2024-01-10"); // true

// inclusive
d.isBetween("2024-01-01", "2024-01-10", "[]");
```

-isToday()
```ts
MeroDate().isToday(); // true
```

- Relative Time
```ts
d.fromNow(); // "5 days ago" 
d.toNow(); // "in 5 days" 
d.from("2024-01-01");
```

-startOf / endOf
```ts
d.startOf("month").toBS(); // start of month
d.endOf("month").toBS(); // end of month

d.startOf("year").toBS(); 
d.endOf("year").toBS();
```

## 🔁 Data Integrity
```ts
import { isRoundTripValid } from "mero-nepali-utils";
isRoundTripValid("2081-01-01"); //true
```
- No Drift
- No Mutation
- Fully deterministic

## How It Works
- Uses precomputed BS calendar data
- Converts using day offsets (no loops)
- Binary search for fast lookup
👉 Result:
- Fast
- Accurate
- Predictable

## 📁 Supported Range
- BS: 2000 → 2090
- AD: 1943 → 2033

## 🛠️ Use Cases

- 🇳🇵 Nepali SaaS apps
- 📊 Dashboards
- 🧾 Billing Systems
- 🧾 Invoice systems
- 🏦 Fintech apps
- 📅 Date pickers
- 🌐 Localization

## ⚖️ Comparison

| Feature    | Mero Nepali Utils | Others          |
| ---------- | ----------------- | --------------- |
| Speed      | ⚡ O(log n)        | ❌ Linear       |
| Accuracy   | ✅ Verified       | ⚠️ Drift |
| API        | 🧠 Modern         | ❌ Outdated     |
| Size       | 🪶 Small          | ⚠️ Bigger       |
| TypeScript | ✅ Full           | ⚠️ Partial      |

## Advanced: Custom Plugin
```ts
const myPlugin = (cls) => { 
  cls.prototype.hello = function () {
     return "Hello"; 
   }; 
 }; 
 MeroDate.extend(myPlugin); 
 MeroDate().hello(); // Hello
```

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
