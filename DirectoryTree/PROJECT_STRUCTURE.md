# 🗂️ Mero Nepali Utils - Complete Project Structure

## 📋 Project Overview

| Property | Value |
|----------|-------|
| **Project Name** | mero-nepali-utils |
| **Version** | 1.0.2 |
| **Type** | TypeScript NPM Package |
| **Purpose** | Fast & accurate Nepali date library (BS ↔ AD conversion) |
| **Bundle Size** | < 5KB gzipped |
| **Module System** | ESM + CJS |
| **Target** | ESNext |

---

## 🌳 Directory Tree

```
mero-nepali-utils/
├── 📄 Root Configuration Files
│   ├── package.json                 # NPM metadata, dependencies, scripts
│   ├── package-lock.json            # Locked dependency versions
│   ├── tsconfig.json                # TypeScript configuration
│   ├── tsup.config.ts               # Build bundler config (ESM + CJS)
│   ├── vitest.config.ts             # Test runner config (90% coverage)
│   ├── eslint.config.js             # Linting rules
│   ├── typedoc.json                 # Documentation generator config
│   ├── .gitignore                   # Git ignore rules
│   ├── .npmignore                   # NPM publish ignore rules
│   ├── LICENSE                      # MIT License
│   └── README.md                    # Project documentation
│
├── 📦 Build Output
│   ├── dist/                        # Compiled distribution (ESM + CJS + Types)
│   │   ├── index.js                 # ESM main entry
│   │   ├── index.cjs                # CJS main entry
│   │   ├── index.d.ts               # TypeScript definitions
│   │   └── [other compiled files]
│   │
│   ├── docs/                        # Generated TypeDoc documentation
│   │   ├── index.html               # Documentation homepage
│   │   ├── hierarchy.html           # Class hierarchy
│   │   ├── modules.html             # Modules overview
│   │   ├── classes/                 # Class documentation
│   │   ├── functions/               # Function documentation
│   │   ├── types/                   # Type documentation
│   │   ├── variables/               # Variable documentation
│   │   └── assets/                  # CSS, JS, icons for docs
│   │
│   └── coverage/                    # Test coverage reports (HTML)
│       ├── index.html               # Coverage summary
│       └── [coverage data]
│
├── 🔧 Source Code (/src)
│   │
│   ├── 📌 index.ts
│   │   └── Main export file (all public APIs)
│   │
│   ├── 🏛️ core/                    # Core date conversion logic
│   │   ├── MeroDate.ts              # Main class for date operations
│   │   ├── constants.ts             # BS range constants (2000-2090)
│   │   ├── errors.ts                # Custom error classes
│   │   ├── helpers.ts               # Utilities: parse, format, toDays
│   │   ├── validate.ts              # Date validation functions
│   │   ├── roundtrip.ts             # Roundtrip validation
│   │   ├── config.ts                # Configuration & locale settings
│   │   │
│   │   └── 📦 package/              # Core conversion functions
│   │       ├── meroAd.ts            # BS → AD conversion (binary search)
│   │       └── meroBs.ts            # AD → BS conversion (binary search)
│   │
│   ├── 📊 data/                     # Precomputed data
│   │   ├── bsMonthsData.ts          # BS month data (2000-2090)
│   │   └── numberData.ts            # EN ↔ NP number mappings
│   │
│   ├── 🎨 format/                   # Date formatting
│   │   ├── formatter.ts             # Format BS dates with patterns
│   │   └── tokens.ts                # Token definitions (YYYY, MM, DD, MMMM)
│   │
│   ├── 🔢 number/                   # Number conversion
│   │   ├── toNepali.ts              # Convert EN numbers to NP (0→०)
│   │   └── toEnglish.ts             # Convert NP numbers to EN (०→0)
│   │
│   ├── 🌍 locale/                   # Localization
│   │   ├── en.ts                    # English locale strings
│   │   ├── np.ts                    # Nepali locale strings
│   │   └── index.ts                 # Locale loader
│   │
│   ├── ⏱️ relative/                 # Relative time
│   │   └── fromNow.ts               # Relative formatting (e.g., "2 days ago")
│   │
│   ├── 🔌 plugins/                  # Plugin system
│   │   ├── isToday.ts               # Check if date is today
│   │   ├── isSame.ts                # Compare dates
│   │   ├── isBetween.ts             # Check date range
│   │   ├── diff.ts                  # Calculate date differences
│   │   └── startEnd.ts              # Get start/end of period
│   │
│   ├── 🛠️ utils/                    # Utility functions
│   │   ├── bsYearStartDate.ts       # Year offset calculations
│   │   └── bsYearStartDays.generated.ts  # Generated year data
│   │
│   └── 📝 types/                    # TypeScript type definitions
│       ├── date-types.ts            # Date-related types
│       ├── index.ts                 # Type exports
│       └── plugins.d.ts             # Plugin interface definitions
│
├── 🧪 tests/                        # Test suite
│   ├── index.test.ts                # Main API tests
│   ├── mero.test.ts                 # MeroDate class tests
│   ├── conversion-edge.test.ts      # Edge case tests
│   ├── conversion-invalid.test.ts   # Error handling tests
│   ├── fromNow.test.ts              # Relative time tests
│   ├── validate.test.ts             # Validation tests
│   ├── errors.test.ts               # Error class tests
│   └── usecase.test.ts              # Real-world scenario tests
│
├── 🔨 scripts/                      # Build scripts
│   └── generateBsYearStartDays.ts   # Year data generation script
│
├── 📚 node_modules/                 # Dependencies (ignored in repo)
│
├── .git/                            # Git repository (ignored)
│
└── .github/                         # GitHub configuration (ignored)
    └── workflows/                   # CI/CD workflows
```

---

## 📂 Detailed Module Documentation

### 1. **Core Module** (`src/core/`)
**Purpose:** Heart of the library - date conversion logic

| File | Description | Key Functions |
|------|-------------|---|
| `MeroDate.ts` | Main class for date operations | `MeroDate(date)`, `.format()`, `.toNepali()` |
| `meroAd.ts` | BS → AD conversion | `meroAd(bsDate)` - O(log n) binary search |
| `meroBs.ts` | AD → BS conversion | `meroBs(adDate)` - O(log n) binary search |
| `constants.ts` | Range constants | `SUPPORTED_BS_RANGE`, `SUPPORTED_AD_RANGE` |
| `helpers.ts` | Utility functions | `parse()`, `format()`, `toDays()`, `findBsYear()` |
| `validate.ts` | Date validation | `validateAd()`, `validateBs()` |
| `roundtrip.ts` | Roundtrip validation | `isRoundTripValid()` |
| `config.ts` | Configuration | `getConfig()`, `setLocale()` |
| `errors.ts` | Custom errors | `OutOfRangeError`, `InvalidDateError` |

---

### 2. **Data Module** (`src/data/`)
**Purpose:** Precomputed data for fast lookups

| File | Description |
|------|-------------|
| `bsMonthsData.ts` | Precomputed BS month data for years 2000-2090 |
| `numberData.ts` | English ↔ Nepali number mappings (0-9 ↔ ०-९) |

---

### 3. **Format Module** (`src/format/`)
**Purpose:** Date formatting functionality

| File | Description | Tokens |
|------|-------------|--------|
| `formatter.ts` | Format BS dates | Uses pattern replacement |
| `tokens.ts` | Token definitions | `YYYY`, `MM`, `DD`, `MMMM` |

**Example:** `formatBs("2081-01-01", "DD MMMM YYYY")` → "१ जनवरी २०८१"

---

### 4. **Number Module** (`src/number/`)
**Purpose:** Nepali ↔ English number conversion

| File | Description | Usage |
|------|-------------|-------|
| `toNepali.ts` | Convert EN → NP numbers | `toNepaliNumber(123)` → "१२३" |
| `toEnglish.ts` | Convert NP → EN numbers | `toEnglishNumber("१२३")` → "123" |

---

### 5. **Locale Module** (`src/locale/`)
**Purpose:** Internationalization support

| File | Description |
|------|-------------|
| `en.ts` | English month names, day names, formats |
| `np.ts` | Nepali month names, day names, formats |
| `index.ts` | Locale loading logic |

---

### 6. **Relative Module** (`src/relative/`)
**Purpose:** Human-readable relative time

| Function | Description |
|----------|-------------|
| `fromNow()` | Convert date to relative format |

**Examples:**
- Same day → "today"
- 1 day ago → "yesterday"
- 5 days ago → "5 days ago"
- 2 weeks ago → "2 weeks ago"

---

### 7. **Plugins Module** (`src/plugins/`)
**Purpose:** Extensible date comparison and manipulation

| Plugin | File | Description |
|--------|------|-------------|
| `isTodayPlugin` | `isToday.ts` | Check if date is today |
| `isSamePlugin` | `isSame.ts` | Compare two dates (by day/month/year) |
| `isBetweenPlugin` | `isBetween.ts` | Check if date is between two dates |
| `diffPlugin` | `diff.ts` | Calculate difference between dates |
| `startEndPlugin` | `startEnd.ts` | Get start/end of day/month/year |

---

### 8. **Utils Module** (`src/utils/`)
**Purpose:** Helper utilities

| File | Description |
|------|-------------|
| `bsYearStartDate.ts` | Calculate BS year start dates |
| `bsYearStartDays.generated.ts` | Generated lookup data (auto-generated) |

---

### 9. **Types Module** (`src/types/`)
**Purpose:** TypeScript type definitions

| File | Description |
|------|-------------|
| `date-types.ts` | Core date type definitions |
| `index.ts` | Public type exports |
| `plugins.d.ts` | Plugin interface definitions |

---

### 10. **Main Export** (`src/index.ts`)
**Purpose:** Public API surface

**Exported Items:**
```typescript
// Core Class
export { MeroDate }

// Conversion Functions
export { meroAd, meroBs }

// Formatting
export { formatBs }

// Number Conversion
export { toNepaliNumber, toEnglishNumber }

// Relative Time
export { fromNow }

// Validation
export { isRoundTripValid }

// Constants & Types
export { SUPPORTED_BS_RANGE, SUPPORTED_AD_RANGE }
export type { LocaleType }

// Plugins
export { isTodayPlugin, diffPlugin, isSamePlugin, isBetweenPlugin, startEndPlugin }
```

---

## 🧪 Test Suite (`tests/`)

| Test File | Purpose | Coverage |
|-----------|---------|----------|
| `index.test.ts` | Main API functionality | Core exports |
| `mero.test.ts` | MeroDate class methods | Class instance tests |
| `conversion-edge.test.ts` | Boundary conditions | Edge cases (year 2000, 2090) |
| `conversion-invalid.test.ts` | Error handling | Invalid dates, out of range |
| `fromNow.test.ts` | Relative time formatting | Time calculations |
| `validate.test.ts` | Date validation | Valid/invalid inputs |
| `errors.test.ts` | Error classes | Custom error types |
| `usecase.test.ts` | Real-world scenarios | Common use cases |

**Coverage Target:** 90% (lines, functions, statements)  
**Branch Coverage Target:** 80%

---

## 🔨 Build System

### Tools Used
- **Bundler:** tsup
- **Test Runner:** Vitest
- **Linter:** ESLint
- **Type Checker:** TypeScript
- **Documentation:** TypeDoc

### Build Outputs
```
dist/
├── index.js          # ESM output
├── index.cjs         # CommonJS output
├── index.d.ts        # TypeScript declarations
├── index.js.map      # Source maps
└── index.cjs.map     # Source maps
```

### Build Configuration
- **Format:** ESM + CJS
- **Minify:** Yes
- **Tree-shake:** Yes
- **Splitting:** No
- **Source Maps:** Yes

---

## 📦 Package Configuration

### Main Entry Points (package.json)
```json
{
  "main": "dist/index.cjs",           // CommonJS
  "module": "dist/index.js",          // ESM
  "types": "dist/index.d.ts",         // TypeScript
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

---

## 🚀 Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| Build | `npm run build` | Compile source to dist |
| Dev | `npm run dev` | Watch mode (rebuild on changes) |
| Test | `npm run test` | Run tests with coverage |
| Lint | `npm run lint` | Check code style |
| Type Check | `npm run type-check` | Validate TypeScript |
| Docs | `npm run docs` | Generate TypeDoc documentation |
| Docs Deploy | `npm run docs:deploy` | Deploy docs to GitHub Pages |

---

## 🔑 Key Features & Architecture

### ⚡ Performance
- **O(log n) binary search** - Fast conversion algorithm
- **Precomputed data** - No iterative calculations
- **Tree-shakable** - Only import what you use
- **< 5KB gzipped** - Minimal bundle size

### 🎯 Accuracy
- **Verified data** - BS month data for 2000-2090
- **Roundtrip validation** - Ensure conversion accuracy
- **Edge case handling** - Covers leap years, month boundaries

### 🌍 Localization
- **English (EN)** - Default locale
- **Nepali (NP)** - Native language support
- **Extensible** - Easy to add more locales

### 🔌 Extensibility
- **Plugin system** - Add custom functionality
- **TypeScript-first** - Full type safety
- **Modular design** - Import only needed features

---

## 🔄 Data Flow

```
User Input (Date String/Date Object)
    ↓
[src/core/package/meroAd.ts or meroBs.ts]
    ↓
Binary Search → [src/data/bsMonthsData.ts] + [src/utils/bsYearStartDays.generated.ts]
    ↓
Parse with [src/core/helpers.ts]
    ↓
Validate with [src/core/validate.ts]
    ↓
Format with [src/format/formatter.ts]
    ↓
Apply Locale with [src/locale/]
    ↓
Convert Numbers with [src/number/]
    ↓
Output Result
```

---

## 📝 Notes

- **Generated File:** `bsYearStartDays.generated.ts` is auto-generated by `scripts/generateBsYearStartDays.ts`
- **Coverage Exclusion:** `src/index.ts` is excluded from coverage (re-export file)
- **Supported Years:** BS 2000-2090 (AD 1943-2034)
- **Tree-shaking:** All exports are named exports for optimal tree-shaking

---

**Last Updated:** April 20, 2026  
**Project Repository:** https://github.com/sakarkhadka10/mero-nepali-utils
