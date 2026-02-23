# Payment.tsx — Changes

## 1. Removed `BASE_FEE` and `RATE_PER_KM`

**Before:**
```ts
const BASE_FEE = 3.5;
const RATE_PER_KM = 1.5;
const ride_price_gross = Number(distanceInKm) * RATE_PER_KM + BASE_FEE;
```

**After:**
The ride price is no longer auto-calculated. A new `ride_price` field was added to the form so the driver types in the actual amount the customer pays.

```ts
const ride_price_gross =
  parseFloat(form.watch("ride_price")?.toString() || "0") || 0;
```

A matching input field (`Fahrpreis`) was added to the payment card, placed above the tip field.

---

## 2. Moved `billingData` inside `sendBill`

**Before (bug):**
`billingData` was declared at the component render scope and used `form.getValues()` at render time. This meant values like `payment_method` and `tip_amount` could be stale — captured when the component last re-rendered, not at the moment the user clicked submit.

**After (fix):**
`billingData` is now built inside `sendBill()` using `form.getValues()` at the exact moment of submission, guaranteeing the correct current values are sent to the API.

```ts
const sendBill = async (retry: boolean = true) => {
  const values = form.getValues(); // captured at submit time
  const billingData = { ... };
  // ...
};
```

---

## 3. Fixed wrong variable in "Gesamtbetrag" display

**Before (bug):**
The "Gesamtbetrag" (total amount) label was showing `amount_net` — the price *without* tax.

```tsx
<span className="text-violet-600">€{amount_net.toFixed(2)}</span>
```

**After (fix):**
"Gesamtbetrag" now correctly shows `amount_gross` — the full amount including tax and tip.

```tsx
<span className="text-violet-600">€{amount_gross.toFixed(2)}</span>
```

The net and tax breakdown lines below it remain unchanged and still display the correct values.
