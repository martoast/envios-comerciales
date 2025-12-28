# Current Task: Add Assisted Purchase Info to How It Works

## Goal
Update the How It Works page and onboarding to clearly explain both services:
1. **Primary Service**: Shipping from USA to Mexico (the core business)
2. **Optional Service**: Assisted Purchase for users who can't buy themselves (8% fee)

## Business Context
- Many US stores don't accept Mexican credit cards/bank payments
- They often require a US billing address
- Boxly offers to purchase products on behalf of users for an 8% service fee
- Users deposit in PESOS to a MEXICAN bank account (no international fees!)
- This is OPTIONAL - the main service is still the shipping

## Tasks
- [x] Update AssistedPurchaseOnboarding.vue to mention the 8% service fee
- [x] Update StepsSection.vue to add an "Assisted Purchase" optional section
- [x] Keep the design clean and not overwhelming
- [x] Maintain bilingual support

---

## Review

### Changes Made

**1. `components/AssistedPurchaseOnboarding.vue`**
- Updated subtitle to explain WHY users need this: "Store doesn't accept your Mexican card? We buy for you"
- Added fee badge in header: "Only 8% service fee on product value"
- Step 2: "We Quote You in Pesos" - emphasizes MXN currency
- Step 3: Fixed to clarify deposit is to MEXICAN account in pesos, no international fees
- All text is bilingual (Spanish/English)

**2. `components/Landing/Main/StepsSection.vue`**
- Added new "Optional Service" section after Step 2 (Shop at any US store)
- Clearly marked with amber/orange "OPTIONAL SERVICE" badge
- Explains the 3 main reasons users might need it:
  - Store doesn't accept Mexican cards
  - Requires US billing address
  - Pay in pesos to Mexican account (no international fees)
- Includes mini 4-step process on how it works
- Shows 8% service fee transparently
- Beautiful design that stands out but doesn't overwhelm the main flow
- Full bilingual support

### Design Decisions
- Used amber/orange color scheme to differentiate from the primary blue steps
- Positioned between Step 2 and Step 3 as a logical alternative path
- Made it clear this is OPTIONAL with prominent badge
- Emphasized the key benefit: pay in pesos to Mexican account = no international fees
- Clean, informative layout with mini-steps card

### Summary
The How It Works page now clearly explains both services:
1. **Main flow (Steps 1-5)**: Get address → Shop → Register → Consolidate → Ship
2. **Optional**: Can't buy yourself? Use Assisted Purchase (8% fee, pay in pesos)

Users now understand they have options and the pricing is transparent.
