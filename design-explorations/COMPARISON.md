# Comparing the three directions and recommendation

**What this is based on.** All 12 prototype screens (3 directions × 4 screens) were rendered in Chromium at 1440×900 and 390×844, and I looked at the screenshots. The following were also checked by running them:
- fonts loaded and no horizontal scroll;
- the sign-in / identity-check gate messages for Khách, Người mua and Người mua đã xác minh;
- out-of-scope link feedback;
- the `?as=`, `?q=` and `?empty=1` states;
- filter chips following the checkboxes;
- the mobile menu and filter panel;
- switching direction from the prototype control.

The scores below are decision aids, not measurements.

## 1. How the three directions differ

| Decision | A · Biên tập | B · Thủ công hiện đại | C · Cấu trúc |
|---|---|---|---|
| What carries hierarchy | Type size and serif/sans contrast | Surface depth (raised vs sunk) and images | Cell structure, row labels, mono figures |
| How regions are separated | Hairline rules, whitespace | Raised cards with one warm shadow, rounded corners | Shared 1px ink borders, no gaps |
| The two ways to buy on M1.0 | A typographic spread split by a vertical rule | Two raised panels, each with an image window | A comparison grid with aligned rows (Dành cho / Điều kiện / Bắt đầu) |
| Suppliers on M1.0 | Typographic rows | Cards with a gold seal | A table with labelled columns |
| M2.0 products per row (desktop) | 3, portrait images | 3, square images | 4, 4:3 images |
| Admin workspace | Same masthead inverted to ink | Night-blue side rail | Black bar, yellow active item, age bars |
| Accent use | Persimmon ink: links and numerals only | Lacquer for money and errors, gold for seals and counts | Yellow fill only for "needs you / active" |
| Relationship to the current app | New | **Uses the existing DS: Moonkage tokens** | New |

## 2. Scoring (1–5)

| Criterion | A | B | C |
|---|---|---|---|
| Visual distinctiveness | 4 | 3 | 5 |
| Fit with the Moonkage product | 4 | 5 | 3 |
| Product presentation | 4 | 5 | 3 |
| Clarity of transactional workflows | 3 | 4 | 5 |
| Fit for dense admin screens | 3 | 4 | 4 |
| Consistency across buyer, seller and admin | 3 | 4 | 5 |
| Responsive potential | 4 | 4 | 3 |
| Long-term scalability of the system | 3 | 5 | 4 |
| **Total** | **28** | **34** | **32** |

**Reasons behind the scores**

- **Distinctiveness**
  - C is the most recognisable: ledger grid, yellow signal, mono figures.
  - A stands out through restraint and large Vietnamese serif display, which is uncommon among Vietnamese marketplaces.
  - B is warm and polished, but "paper plus serif plus gold" is closer to the many artisan-food shops it would sit next to.
- **Fit with the product**
  - B uses the palette of the actual logo, the existing DS and a font designed for Vietnamese. It reads as a gift and a season without literal motifs.
  - A fits the gift and occasion side.
  - C is the furthest from the cultural and gift character of the buyer side: black, white and yellow reads more as a tool than a gift.
- **Product presentation**
  - B gives images the most room and its cards are the easiest to scan.
  - A's portrait plates are elegant but dominate (about 360px of image per product at 1440).
  - C deliberately puts images below data.
- **Transactional clarity**
  - C's aligned rows make the two paths and the M3.0 options directly comparable. Mono figures and the age bars make Q1.0 fastest to scan.
  - B's sunk "conditions" trays make prerequisites clear.
  - In A, rule-only grouping is the weakest at signalling what can be clicked.
- **Admin density** — measured on Q1.0 at 1440×900:

  | Direction | Tiles + oldest-in-queue list | Whole page | Fits in one 900px screen? |
  |---|---|---|---|
  | A | 504px | 1091px | No |
  | B | 426px | 900px | **Yes** (the side rail frees the top) |
  | C | 499px | 1036px | No (section label bars and the title cell cost height) |

  - B is the most compact.
  - C's table is the fastest to scan: real columns, mono wait times and age bars.
  - A's large serif numerals are the slowest to scan.

  B and C both score 4, for different reasons.

- **Consistency across areas**
  - C uses one system unchanged in M and Q.
  - B changes the shell (side rail) but keeps the material.
  - A's inverted masthead is a thinner bridge between areas.
- **Responsive potential**
  - A and B reflow naturally.
  - C's ruled tables and section bars needed special mobile rules: the label column becomes inline labels, the header goes full width, and section bars wrap. Its header was the tightest at 390px.
- **Scalability**
  - B already exists as tokens and `mk-*` components in `src/app/styles/`, so it has the lowest cost to extend.
  - C is systematic but every new component has to follow the cell rules.
  - A relies on careful typesetting that forms and tables at 68-screen scale will strain.

## 3. Strengths, weaknesses, and risks at 68 screens

### A · Biên tập
- **Strongest:** the M1.0 spread and the M3.0 chapters make the choice between two ways to buy feel calm and deliberate; Vietnamese diacritics render very well in Newsreader.
- **Weak:**
  - grouping by hairlines alone makes it harder to tell what can be clicked;
  - large portrait images lower comparison density on M2.0;
  - serif admin numerals look elegant but are slow to scan.
- **Risk at scale:** long forms (M3.1, M7.1 six steps, B4.1), dense tables (Q4.x, B2.x) and status-heavy order pages need far more structure than rules can provide. The style would erode into "rules everywhere".

### B · Thủ công hiện đại
- **Strongest:**
  - images and warmth suit the buyer side best;
  - the raised/sunk meaning is a real system rule, not decoration;
  - it continues the existing DS and code.
- **Weak:**
  - risk of everything becoming a rounded card;
  - the admin queue list is a card list without true columns;
  - Fraunces figures are ambiguous at display size: "1" reads as "l", seen in the render and fixed by moving all counts to Be Vietnam Pro;
  - gold link text (`gold-ink`) is a narrow color to rely on.
- **Risk at scale:** seller and admin screens (B2–B5, Q2–Q5) could become stacks of identical cards unless a denser table and list layer is defined.

### C · Cấu trúc
- **Strongest:**
  - comparison and transaction screens: quotes side by side, deposits, payouts, queues (the most scannable admin table, although not the most compact page);
  - one consistent system for all three areas;
  - mono figures are excellent for money and IDs.
- **Weak:**
  - colder for gift buying;
  - placeholder-led product cells look technical;
  - mono uppercase labels are small (11px) and make Vietnamese diacritics harder to read;
  - heavy rules add visual noise on long pages;
  - the mobile header and bars needed workarounds.
- **Risk at scale:** a buyer-side marketplace that feels like a back office; a trend-driven black-and-yellow look that may age quickly.

## 4. Recommendation

**B scores highest (34), with C close behind (32).** The gap is small and the two optimise for different things, so the score alone does not decide. The deciding factor is who uses most of the product. The buyer area is 35 of the 68 screens and is where Moonkage earns trust and sells gifts. Seller (18) and admin (15) are task tools. On that basis:

> **Primary direction: B · Modern Craft (Thủ công hiện đại)**, built on the existing DS: Moonkage, with two clearly limited rules taken from C. These rules apply wherever the content is transactional or operational:
> 1. **Mono or tabular figures and aligned comparison rows** for money, counts, IDs and wait times: quote comparison M6.2.1, payment summaries, order timelines, all Q screens, and B money screens.
> 2. **A dense "ledger" layer for seller and admin tables and queues:** shared rules, row labels, age bars. It replaces stacks of cards in B and Q while keeping B's paper, night and gold materials.

Nothing from A is adopted as a style, but one lesson carries over: letting type carry hierarchy (a larger display title, fewer boxes) on the two decision pages M1.0 and M3.0.

**A decision that needs human judgment:** should the brand lean towards **heritage gift (B)** or **contemporary transaction platform (C)**? If the team is willing to move away from the existing DS and wants Moonkage known first as a reliable B2B ordering platform (bulk, logo printing, deposits), C becomes the stronger primary direction and B's warmth would have to be brought into C's buyer pages instead. The prototypes show both well enough to decide by looking.

## 5. Decisions to settle before expanding to the full app

1. **Pick the primary direction** and confirm the "B with C's data layer" split above, including where the line between "buyer gift surface" and "transactional surface" falls (for example, does M6.2.1 quote comparison use the ledger layer? The recommendation says yes).
2. **Image direction:** commission or define real product photography (angle, background, crop ratio 1:1 vs 4:5). Every direction was judged on placeholders, and B's strength depends on images.
3. **Number typography rule:** counts and money never use the display serif (found in B); write it into the DS as tokens `--num-*`.
4. **Admin and seller density spec:** row heights, table and list patterns, how status is shown (badge vs text vs fill), and the age or SLA display, before B2–B5 and Q2–Q6 are designed.
5. **Mobile header contents:** all three prototypes moved "Giao tới" into the menu at 390px to keep the top row on one line. Confirm this, or choose another place, because the area is a filter that always applies (FR-05).
6. **Resolve the wireframe issues that hi-fi cannot hide** (§6), especially the guest area state (audit H1), what a custom order can include (H2) and the product-card fields (H3).
7. **Accessibility gates:**
   - B: gold must never be text on paper (2.1:1).
   - C: yellow must always be bordered (1.4:1 on white) and labels at least 12px in production.
   - All: keep focus rings at the strengths prototyped here.

## 6. Issues found while prototyping (kept as-is, not fixed)

| # | Screen | Issue | What the prototypes do |
|---|---|---|---|
| 1 | M1.0 | A guest who has not chosen an area is asked "Bạn muốn giao tới đâu?" while the header already says "Giao tới Hà Nội" and products are listed for Hà Nội (audit H1) | Kept as in the wireframe in all three |
| 2 | M1.0 | The custom-order card says sign-in and identity check are needed for the whole path; M3.0 says browsing suppliers needs neither (audit M5) | Kept |
| 3 | M2.0 | The card meta "Nghệ Nhân" is ambiguous between brand and shop; spec AC-06.5 asks for brand, shop and delivery label (audit H3, M3) | Kept the wireframe's 4 fields |
| 4 | M2.0 | Filters, sort and price do not change results; the supplier block appears for any keyword (audit M1, M4) | Chips follow the checkboxes as UI feedback only; results are static |
| 5 | M2.0 | Products per row changed from 4 (wireframe) to 3 in A and B | A design choice to evaluate: larger images, lower comparison density |
| 6 | M3.0 | The steps always include "Duyệt maket", which only applies to orders with logo printing (audit M6) | Kept |
| 7 | All M | At 390px the header cannot fit area + cart + sign-in + menu on one line | "Giao tới" moved into the menu on mobile (decision 5) |
| 8 | B | Fraunces display figures are ambiguous ("1" vs "l") | Counts switched to Be Vietnam Pro; a DS rule is proposed (decision 3) |
| 9 | Q1.0 | "Xưởng Bánh Nghệ Nhân" appears as a pending application while the same shop already sells on M1.0/M2.0. A sample-data conflict introduced in wireframe commit `a8434c4` (audit M9) | Kept the wireframe content |
| 10 | C · M1.0 | "Nhận đặt từ 20 hộp · giao toàn quốc" is split into the columns Tối thiểu / Giao | Same data, different grouping |
