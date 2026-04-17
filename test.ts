import { meroNepaliNumber } from "./src/core/package/meroNumber";

const testValues = [
  123,
  "456",
  "Price: 789.50",
  "1,234,567",
  "Order #1000!",
];

for (const value of testValues) {
  const np = meroNepaliNumber(value);

  console.log("━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Input  :", value);
  console.log("Output :", np);
}

console.log("━━━━━━━━━━━━━━━━━━━━━━");