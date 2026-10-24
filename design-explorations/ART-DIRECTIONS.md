# Moonkage — three art directions

The three directions use the same four screens (M1.0, M2.0, M3.0, Q1.0), the same content and the same rules from `wireframe/`. Each one makes different decisions about composition, type, grouping and components; the colors differ as a consequence, not as the point.

**Kept in all three:** the five-block order of M1.0, the two ways to buy with their real conditions, the five filter groups with OR inside a group and AND between groups, the supplier block separate from products, pagination, the sign-in → identity-check gates, Q1.0 organised by queue and by waiting time, and no hero, no seasonal deadline and no invented figures. Known wireframe issues were kept as they are, not quietly fixed; they are listed in `COMPARISON.md` §6.

**Fonts:** every typeface was checked for a Vietnamese subset on Google Fonts before it was chosen. Instrument Serif was rejected for that reason. Each direction loads its fonts from Google Fonts and falls back to a system or local stack.

---

## A · Biên tập (Contemporary Editorial)

**Thesis.** Moonkage sells gifts for one season, and buyers choose for an occasion. Direction A treats the marketplace like a carefully edited seasonal catalogue. Typography carries the hierarchy, products sit like plates in a catalogue, and the two ways to buy read as two chapters of one spread. It sets Moonkage apart from grid marketplaces of the Shopee kind through restraint and reading rhythm, not decoration. It stays a store: every section ends in an action, and filters, sort and pagination are unchanged.

**Typography**
- **Display:** Newsreader with an optical-size axis, light/regular weight and tight tracking.
  - Page titles 56–72px; section titles 36px; product names 21px in serif.
  - Italic marks the operative word ("Đặt theo *yêu cầu*") and section numbers ("01").
- **UI and body:** IBM Plex Sans, 15–16px.
  - Labels are 12px uppercase with wide tracking.
  - Prices are Plex 600 with tabular lining figures.
- **Numbers:** admin counts are Newsreader light at 88px, lining and tabular. Prices always use sans.
- **Fallbacks:** "Iowan Old Style", Georgia (serif); Inter, system-ui (sans).

**Color**

| Role | Token | Value |
|---|---|---|
| Paper background | `paper` | `#f6f3ec` |
| Ink text | `ink` | `#191612` |
| Secondary text | `ink-2` | `#5b544a` |
| Rule | `rule` | `#d4ccbd` (decorative only) |
| Strong rule | `rule-strong` | = ink |
| Accent, persimmon ink | `accent` | `#a23b17` |
| Success / warning / error / info | | `#2e6b45` / `#8a5a00` / `#b3261e` / `#2f4f86` |

Measured contrast: ink/paper 16.3:1 · ink-2/paper 6.7:1 · accent/paper 6.0:1 · error/paper 5.9:1.

The accent is used only for links, section numbers, italic eyebrows and the "×" on active filters. It is never a button fill; primary actions are solid ink.

**Spatial composition**
- 1360px content width, 12 columns.
- **Asymmetric margin headings:** section title in 3 columns, content in 9.
- Hairline rules separate regions instead of boxes; one strong rule closes each section.
- Generous vertical rhythm: 48–64px between sections.
- The two paths sit as a spread split by a vertical rule.

**Component language**
- **Navigation:** a light masthead with an underlined search field and text-only utilities. Admin uses the same masthead inverted to ink.
- **Buttons:** square solid ink (primary) and square outline (secondary). Text links get an animated arrow.
- **Inputs:** underline fields with square checkboxes.
- **Product cards:** borderless plates — 5:6 image, serif name, shop line, then price and rating on one ruled baseline.
- **Supplier lists:** typographic rows, not cards.
- **Tables:** a ruled "ledger" with italic serif type labels.
- **Status:** expressed in type (italic red "Khiếu nại").
- **Alerts:** a double rule (reconciliation flag, supplier match).
- **Toasts:** an ink slab with an accent rule.

**Visual signature**
1. Margin-headed sections: numeral + serif title in the left 3 columns, content in 9, closed by a strong rule.
2. Large serif display with an italic operative word, plus catalogue captions under images (shop line, then price and rating separated by a hairline).

**Motion.** Underlines and arrows nudge on hover, images dim slightly on hover, and toasts fade. Nothing animates on load. Reduced motion is respected.

---

## B · Thủ công hiện đại (Modern Craft)

**Thesis.** A Moonkage order is a well-made gift box, so the interface behaves like layered paper on a table. Direction B is built on the existing **DS: Moonkage** tokens (`src/app/styles/tokens.css`): paper, night blue, gold, lacquer red, jade and lotus, which come from the logo. Surfaces carry meaning:
- **raised** paper is something you pick (paths, products, suppliers, queues);
- **sunk** paper is a constraint or control (conditions, filters, the area prompt).

Product images are the largest element on buyer screens. Craft is conveyed through material and proportion, not motifs.

**Typography**
- **Display:** Fraunces, 34–48px titles and 19px card names (soft, warm serif).
- **UI, body and all numbers:** Be Vietnam Pro, which was designed for Vietnamese.
  - Prices use Be Vietnam Pro 600 with tabular figures.
  - **Admin counts also use the sans.** In the rendered prototype, Fraunces "1" read as "l" at display size, which is unacceptable for operational numbers. See `COMPARISON.md` §6.
- **Fallbacks:** Cormorant Garamond, Georgia (serif); Segoe UI, system-ui (sans).

**Color** (DS tokens)

| Token | Value |
|---|---|
| `paper` | `#f5ecdc` |
| `raised` | `#fbf6ec` |
| `sunk` | `#ebdfc8` |
| `ink` | `#1f2642` |
| `ink-muted` | `#6a5b4a` |
| `night` | `#1c2b4b` |
| `gold` | `#c9a14a` (fill and rule, never text on paper) |
| `gold-ink` | `#7a560c` (link text) |
| `lacquer` | `#9e2f27` |
| `jade` | `#2f6a49` |
| `lotus` | `#efd5c4` |

Measured contrast: ink/paper 12.7:1 · ink-muted/sunk 5.0:1 · gold-ink/paper 5.7:1 · on-night/night 12.0:1.

Accent rules:
- Lacquer is only for money-committing actions and errors. None of these four screens commits money, so lacquer appears only on the reconciliation flag.
- Gold marks the active nav item, counts and the supplier "seal".
- Lotus marks "custom" and active filter chips.

**Spatial composition**
- 1320px content width.
- Cards of 18px radius with one warm shadow; 24px gutters.
- The paths are two equal raised panels, each with an image window on top and the conditions in a sunk tray inside.
- Admin replaces the top bar with a night-blue side rail, so the workspace reads as a different place in the same material.

**Component language**
- **Header:** a night band with a pill search and gold count badges.
- **Buttons:** night (primary) and quiet outline (secondary), 10px radius.
- **Inputs:** boxed, 6px radius. Checkboxes are rounded squares that fill with night.
- **Product cards:** raised, with a 1:1 inset image.
- **Supplier cards:** gold seal avatar plus a sunk facts tray.
- **Admin:** a raised list with pill badges for queue type.
- **Alerts:** a reconciliation flag with a lacquer left edge.
- **Toasts:** a paper card with a gold or night edge.

**Visual signature**
1. Functional surface layering: raised = pickable, sunk = constraint or control, with one warm shadow only.
2. Gold as a "seal": thin double rings on supplier avatars and the moon mark, gold hairlines joining the steps ribbon, gold badges for counts.

**Motion.** Cards lift 2px with a deeper shadow on hover. Buttons press by 1px. The filter panel slides up as a bottom sheet on mobile. Toasts fade. Reduced motion is respected.

---

## C · Cấu trúc (Structured Contemporary)

**Thesis.** Moonkage is a transaction marketplace: quotes, deposits, payouts, complaints, queues. Direction C makes the structure itself the identity:
- a ruled cell grid where cells share 1px ink borders, with no gaps, shadows or radius;
- condensed grotesque headings;
- mono figures for every amount, count, ID and wait time;
- one signal color, moon yellow, used only as a **fill** for "needs you / active / selected".

The two ways to buy are compared on **aligned rows** (Dành cho / Điều kiện / Bắt đầu) so the differences can be read across. This also answers the wireframe's earlier rejection of a comparison table ("no room for buttons"): the buttons get their own row.

**Typography**
- **Display:** Archivo at width 72–80, weight 700, 44–72px.
- **Body:** Archivo at width 100.
- **Labels:** JetBrains Mono 11px uppercase, e.g. "[01] Khu vực giao".
- **Numbers:** prices, counts, IDs and dates use JetBrains Mono with tabular figures. Admin counts are 64px mono.
- **Fallbacks:** Inter, system-ui (sans); IBM Plex Mono, ui-monospace (mono). JetBrains Mono is also installed locally.

**Color**

| Token | Value |
|---|---|
| `bg` | `#ecece6` |
| `cell` | `#ffffff` |
| `cell-2` | `#f6f6f2` |
| `ink` | `#0e0f11` |
| `ink-2` | `#55575c` |
| `signal` | `#ffd23f` |
| Success / warning / error / info | `#1e7a46` / `#8a5b00` / `#c0362c` / `#1f3fd1` |

Measured contrast: ink/bg 16.2:1 · ink-2/cell 7.2:1 · ink/signal 13.3:1 · error/cell 5.5:1.

Signal on white is 1.4:1, so yellow is **always** bordered in ink and never carries meaning alone. Yellow is used for the guest area prompt, active filter chips, checked boxes, count badges, hover on actions, and the active admin nav item. Black fill marks the current buyer nav item and primary buttons.

**Spatial composition**
- 1376px content width.
- Every region is a cell in a ledger: title bar, label column, path columns, product cells, queue tiles.
- Section labels sit in a bar: `[02] | title | link`.
- Density is the highest of the three directions: 4 product cells per row on M2.0, 4:3 images.

**Component language**
- **Header:** a row of cells (mark | search | area | cart | sign-in).
- **Buttons:** square, with a mono "→" at the right; hover turns them signal yellow.
- **Inputs:** boxed and ruled; the price range is one split cell.
- **Product cards:** cells with a hatched placeholder, mono price and rating.
- **Suppliers:** a true table with columns Đơn vị / Khu vực / Nhận làm / Tối thiểu / Giao. On mobile each row becomes a labelled cell stack, not a horizontal scroll.
- **Admin:** wait times include a proportional age bar computed from the listed waits (4 days / 1 day / 6 hours).
- **Alerts:** a red edge and a `[!]` mono tag.
- **Toasts:** a hard-shadow slab.

**Visual signature**
1. The ledger grid: shared 1px ink rules, labelled row headers, `[nn]` mono section tags.
2. Yellow as a signal fill only, and mono tabular figures for every number in the product.

**Motion.** Hover fills cells or buttons with signal yellow. There are no transforms. Toasts fade with a hard shadow. Focus is a 3px inset blue ring. Reduced motion is respected.
