# 🇳🇵 Mero Nepali Utils

[![npm version](https://img.shields.io/npm/v/mero-nepali-utils.svg)](https://www.npmjs.com/package/mero-nepali-utils)
[![npm downloads](https://img.shields.io/npm/dm/mero-nepali-utils.svg)](https://www.npmjs.com/package/mero-nepali-utils)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/mero-nepali-utils)](https://bundlephobia.com/package/mero-nepali-utils)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/sakarkhadka10/mero-nepali-utils?style=social)](https://github.com/sakarkhadka10/mero-nepali-utils)

A **lightning-fast**, high-precision toolkit for Nepali applications. Engineered for modern web environments that demand accuracy, speed, and a tiny footprint. Featuring O(log n) date conversion and seamless numeral transformation.

---

## 🚀 Key Features

- **🎯 Absolute Precision**: Uses verified, official calendar data (BS 2000 - 2090) to eliminate the common "date drift" found in other libraries.
- **⚡ Binary Search Optimization**: Year lookups are O(log n), making it perfect for real-time dashboards and high-frequency data processing.
- **🔢 Numeral Transformation**: Instantly convert English numerals to Nepali (Devanagari) script.
- **🪶 Zero Dependencies**: Ultra-lightweight with a focus on performance.
- **🏗️ Developer First**: Native TypeScript support, ESM/CJS compatibility, and robust validation.

---

## 📦 Installation

```bash
npm install mero-nepali-utils
```
Or
```bash
pnpm add mero-nepali-utils
```
Or
```bash
bun add mero-nepali-utils
```

---

## 📖 Quick Start

### 1. Date Conversion: `meroBs` (AD to BS)

Perfect for localized UI rendering from database timestamps.

```typescript
import { meroBs } from "mero-nepali-utils";

// From Date object
const today = meroBs(new Date());
// "2081-01-05" (example)

// From string
const specific = meroBs("2024-04-17");
// "2081-01-05"
```

### 2. Date Conversion: `meroAd` (BS to AD)

Ideal for converting user input from Nepali datepickers for database storage.

```typescript
import { meroAd } from "mero-nepali-utils";

const dbFormat = meroAd("2081-01-01");
// "2024-04-13"
```

### 3. Numeral Localization: `meroNumber`

Convert prices, IDs, or counts to Devanagari script.

```typescript
import { meroNumber } from "mero-nepali-utils";

const count = meroNumber(12345);
// "१२३४५"

const mixed = meroNumber("Year: 2081");
// "Year: २०८१"
```

---

## 💡 Best Practices: "AD in DB, BS in UI"

Senior developers recommend storing dates in **AD format (ISO 8601)** in the database. This ensures compatibility with global standards, indexing, and third-party tools. Use this library to localize the experience for your users at the edges.

```typescript
// Localizing a timestamp for a Nepali UI
const Profile = ({ createdAt }) => {
  const nepaliDate = meroBs(createdAt);

  return (
    <div className="user-card">
      <p>Member since: {meroNumber(nepaliDate)}</p>
      {/* Renders: Member since: २०८१-०१-०१ */}
    </div>
  );
};
```

---

## 🛠️ API Reference

### `meroBs(date: string | Date): string`

- **Input**: `Date` object or string (`YYYY-MM-DD`).
- **Output**: BS date string (`YYYY-MM-DD`).
- **Optimization**: Binary search based lookup (O(log n)).

### `meroAd(date: string): string`

- **Input**: BS date string (`YYYY-MM-DD`).
- **Output**: AD date string (`YYYY-MM-DD`).

### `meroNumber(input: string | number): string`

- **Input**: Any string or number containing English digits.
- **Output**: String with digits replaced by Nepali counterparts.

---

## 🧪 Robustness & Range

This library supports dates from **BS 2000 to BS 2090**. The data is cross-verified with official Nepali panchangas to ensure reliability for financial, academic, and government software.

---

## 🔗 Connect & Use Cases

- **Portfolio**: [sakarkhadka.com.np](https://sakarkhadka.com.np)
- **Production**: Used across [merokarya.com](https://merokarya.com/date-converter) ecosystem.

---

## 📄 License

MIT © [Sakar Khadka](https://github.com/sakarkhadka10)
