# 📊 simple-csv-js

> Zero-dependency CSV generation library for JavaScript and TypeScript

[![npm version](https://img.shields.io/npm/v/simple-csv-js.svg)](https://www.npmjs.com/package/simple-csv-js)
[![npm downloads](https://img.shields.io/npm/dw/simple-csv-js.svg)](https://www.npmjs.com/package/simple-csv-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Simple, lightweight, and powerful CSV generator that works in the browser and Node.js. Perfect for exporting data from React, Angular, Vue, or any JavaScript application.

## ✨ Features

- 🚀 **Zero dependencies** - Tiny footprint (~1.9KB gzipped, ~7.7KB uncompressed)
- 🌐 **Universal** - Works in browsers and Node.js
- 📝 **TypeScript support** - Full type definitions included
- 🎯 **Framework agnostic** - Use with React, Angular, Vue, or vanilla JS
- ⚡ **Fast** - Efficient CSV generation for large datasets
- 🔧 **Highly configurable** - Custom separators, headers, formats
- 📦 **ESM & CommonJS** - Works with any module system
- ✅ **Well tested** - Comprehensive test coverage

## 📦 Installation

```bash
npm install simple-csv-js
```

```bash
yarn add simple-csv-js
```

```bash
pnpm add simple-csv-js
```

## 🚀 Quick Start

```javascript
import { SimpleCsv } from 'simple-csv-js';

const data = [
  { name: 'Alice', age: 30, city: 'New York' },
  { name: 'Bob', age: 25, city: 'Los Angeles' },
  { name: 'Charlie', age: 35, city: 'Chicago' }
];

// Generates and downloads a CSV file
new SimpleCsv(data, 'users');
```

**Output** (`users.csv`):
```csv
"Alice",30,"New York"
"Bob",25,"Los Angeles"
"Charlie",35,"Chicago"
```

## 📚 Usage Examples

### Basic Example with Headers

```javascript
import { SimpleCsv } from 'simple-csv-js';

const data = [
  { name: 'Alice', age: 30, email: 'alice@example.com' },
  { name: 'Bob', age: 25, email: 'bob@example.com' }
];

new SimpleCsv(data, 'users-with-headers', {
  showLabels: true,
  headers: ['name', 'age', 'email']
});
```

**Output**:
```csv
name,age,email
"Alice",30,"alice@example.com"
"Bob",25,"bob@example.com"
```

### Custom Headers (Different Labels)

```javascript
const data = [
  { firstName: 'Alice', age: 30 },
  { firstName: 'Bob', age: 25 }
];

new SimpleCsv(data, 'custom-headers', {
  useObjHeader: true,
  objHeader: {
    firstName: 'Full Name',
    age: 'Age (years)'
  }
});
```

**Output**:
```csv
Full Name,Age (years)
"Alice",30
"Bob",25
```

### With Title Row

```javascript
const salesData = [
  { product: 'Widget', quantity: 100, revenue: 1500.00 },
  { product: 'Gadget', quantity: 75, revenue: 2250.50 }
];

new SimpleCsv(salesData, 'sales-report', {
  showTitle: true,
  title: 'Q4 2024 Sales Report'
});
```

**Output**:
```csv
Q4 2024 Sales Report

"Widget",100,1500
"Gadget",75,2250.5
```

### European Format (Semicolon & Comma Decimals)

```javascript
const data = [
  { product: 'Item A', price: 19.99 },
  { product: 'Item B', price: 29.50 }
];

new SimpleCsv(data, 'prices-eu', {
  fieldSeparator: ';',
  decimalSeparator: ',',
  showLabels: true,
  headers: ['product', 'price']
});
```

**Output**:
```csv
product;price
"Item A";19,99
"Item B";29,50
```

### Get CSV as String (No Download)

```javascript
const data = [
  { user: 'Alice', status: 'active' },
  { user: 'Bob', status: 'inactive' }
];

const csv = new SimpleCsv(data, 'users', {
  noDownload: true
});

console.log(csv.csv);
// Send to server, display in UI, etc.
```

**Output**:
```csv
"Alice","active"
"Bob","inactive"
```

### Special Characters Handling

```javascript
const data = [
  { 
    name: 'John "The Boss" Doe',
    bio: 'Likes pizza, pasta, and programming',
    comment: 'Line 1\nLine 2'
  }
];

new SimpleCsv(data, 'special-chars');
```

**Output** (properly escaped):
```csv
"John ""The Boss"" Doe","Likes pizza, pasta, and programming","Line 1
Line 2"
```

### Data Types

```javascript
const data = [
  { 
    text: 'Hello',
    number: 42,
    float: 3.14159,
    boolean: true,
    nullValue: null,
    date: new Date('2024-01-01')
  }
];

new SimpleCsv(data, 'data-types', {
  nullToEmptyString: true
});
```

**Output**:
```csv
"Hello",42,3.14159,TRUE,,Mon Jan 01 2024 00:00:00 GMT+0000
```

## 🎨 Framework Examples

### React

```jsx
import { SimpleCsv } from 'simple-csv-js';

function ExportButton({ data }) {
  const handleExport = () => {
    new SimpleCsv(data, 'export', {
      showLabels: true,
      headers: Object.keys(data[0])
    });
  };

  return (
    <button onClick={handleExport}>
      Export to CSV
    </button>
  );
}
```

### Angular

```typescript
import { SimpleCsv } from 'simple-csv-js';

@Component({
  selector: 'app-export',
  template: '<button (click)="export()">Export CSV</button>'
})
export class ExportComponent {
  data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 }
  ];

  export() {
    new SimpleCsv(this.data, 'users', {
      showLabels: true
    });
  }
}
```

### Vue 3

```vue
<template>
  <button @click="exportCSV">Export to CSV</button>
</template>

<script setup>
import { SimpleCsv } from 'simple-csv-js';

const data = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];

const exportCSV = () => {
  new SimpleCsv(data, 'users', {
    showLabels: true
  });
};
</script>
```

### Node.js (Server-side)

```javascript
const { SimpleCsv } = require('simple-csv-js');
const fs = require('fs');

const data = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];

// Generate CSV without downloading
const csv = new SimpleCsv(data, 'users', {
  noDownload: true,
  showLabels: true
});

// Save to file
fs.writeFileSync('output.csv', csv.csv);
```

## 📖 API Reference

### Constructor

```typescript
new SimpleCsv(data: DataItem[], filename: string, options?: Options)
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `DataItem[]` | ✅ Yes | Array of objects to convert to CSV |
| `filename` | `string` | ✅ Yes | Name of the file (without .csv extension) |
| `options` | `Options` | ❌ No | Configuration options (see below) |

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `fieldSeparator` | `string` | `','` | Character to separate fields |
| `quoteStrings` | `string` | `'"'` | Character to wrap/escape fields |
| `decimalSeparator` | `string` | `'.'` | Decimal separator (use `','` for EU format, or `'locale'` for automatic) |
| `showLabels` | `boolean` | `false` | Show headers in first row |
| `headers` | `string[]` | `[]` | Array of keys to use as headers (in order) |
| `useObjHeader` | `boolean` | `false` | Use custom header mapping |
| `objHeader` | `object` | `{}` | Map data keys to custom header labels |
| `showTitle` | `boolean` | `false` | Add title row at the top |
| `title` | `string` | `'My Report'` | Title text if showTitle is true |
| `useBom` | `boolean` | `true` | Add BOM (Byte Order Mark) for Excel compatibility |
| `noDownload` | `boolean` | `false` | Return CSV string instead of downloading |
| `nullToEmptyString` | `boolean` | `true` | Convert null/undefined to empty strings |

### TypeScript Types

```typescript
import type { SimpleCsv, Options, DataItem } from 'simple-csv-js';

// DataItem - represents a row of data
type DataItem = {
  [key: string]: string | number | boolean | Date | null;
};

// Options - configuration object
interface Options {
  fieldSeparator?: string;
  quoteStrings?: string;
  decimalSeparator?: string;
  showLabels?: boolean;
  headers?: string[];
  useObjHeader?: boolean;
  objHeader?: { [key: string]: string };
  showTitle?: boolean;
  title?: string;
  useBom?: boolean;
  noDownload?: boolean;
  nullToEmptyString?: boolean;
}
```

## 🎯 Common Use Cases

### Export Search Results

```javascript
function exportSearchResults(results) {
  new SimpleCsv(results, `search-results-${Date.now()}`, {
    showLabels: true,
    headers: ['id', 'title', 'description', 'date']
  });
}
```

### Export Table Data

```javascript
function exportTable(tableData) {
  new SimpleCsv(tableData, 'table-export', {
    useObjHeader: true,
    objHeader: {
      userId: 'User ID',
      userName: 'Name',
      userEmail: 'Email Address',
      createdAt: 'Registration Date'
    }
  });
}
```

## 📄 License

MIT © 

Forked from [angular-csv-ext](https://github.com/alhazmy13/angular-csv-ext)

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/simple-csv-js)
- [GitHub Repository](https://github.com/ANicholasson/simple-csv-js)
- [Issue Tracker](https://github.com/ANicholasson/simple-csv-js/issues)

