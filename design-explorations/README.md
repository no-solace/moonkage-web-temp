# Moonkage · Design explorations

This folder holds three visually different art directions, each applied to the same four representative screens. It is **an exploration, not production code**:
- it does not change `wireframe/` or `src/`;
- it adds no dependencies;
- it is plain HTML, CSS and a little JavaScript, so you can open it directly from disk or from any static server.

## Opening it

Open `design-explorations/index.html`. From there each direction links to:

| Screen | File |
|---|---|
| M1.0 Trang chủ | `direction-x/m1-0.html` |
| M2.0 Mua hàng có sẵn | `direction-x/m2-0.html` |
| M3.0 Đặt theo yêu cầu | `direction-x/m3-0.html` |
| Q1.0 Tổng quan quản trị | `direction-x/q1-0.html` |

`direction-x/index.html` opens M1.0 of that direction.

On every screen, the **Prototype** button at the bottom right switches direction (staying on the same screen), switches screen, and shows the states below. The same states can be opened with URL parameters:

| State | URL parameter |
|---|---|
| Khách (default) | none |
| Người mua đã đăng nhập | `?as=buyer` |
| Người mua đã xác minh danh tính | `?as=verified` |
| Tìm theo tên đơn vị (AC-14.5) | `?q=Nghệ+Nhân` |
| Không có kết quả | `?empty=1` |

Fonts load from Google Fonts. Without a network, each direction falls back to its listed fallback stack, so type will look different from the screenshots.

## What is real and what is simulated

- **Content:** the same as `wireframe/`: copy, sample data, block order and conditions. Product images are labelled placeholders ("Ảnh minh họa"), not real products.
- **Links between the four screens work.** Links to screens outside the exploration show a message instead of navigating.
- **Gates are simulated with a message**, following AC-02.3 and BR-23:
  - Khách → sign-in, then identity check, then back;
  - Người mua → identity check, then back;
  - verified → goes straight on.
- **Filters:** checking a box adds or removes its chip; "Xóa lọc" clears all. **Results do not change**, as in the wireframe.
- **Mobile:** the menu opens; the filters open as a full-screen panel (A, C) or a bottom sheet (B).

## Files

| Path | Purpose |
|---|---|
| `index.html` | Launcher (neutral styling) |
| `ART-DIRECTIONS.md` | For each direction: thesis, typography, colour with measured contrast, layout, component language, signature, motion |
| `COMPARISON.md` | Differences, 1–5 scoring, strengths and risks, recommendation, decisions for the next phase, and issues found while prototyping |
| `shared/proto.js`, `shared/proto.css` | Prototype runtime and the neutral prototype control (not part of any direction) |
| `direction-a/` | A · Biên tập: `style.css` + 4 screens |
| `direction-b/` | B · Thủ công hiện đại: `style.css` + 4 screens, built on the DS: Moonkage tokens |
| `direction-c/` | C · Cấu trúc: `style.css` + 4 screens |

## How it was checked

- All 12 screens were rendered in Chromium at **1440×900** and **390×844**, and the screenshots were inspected.
- Checked on every screen: the intended fonts loaded and there is no horizontal scroll.
- The interactions were run and confirmed: gate messages for the three roles, the states, chips, the mobile menu and filter panel, and switching direction.
- Problems found in that review were fixed before writing `COMPARISON.md`:
  - condition lists broke onto two lines;
  - a class clash in B;
  - the active dropdown item lost its style;
  - grid overflow on mobile;
  - the 390px header was too crowded;
  - Fraunces figures were ambiguous.
