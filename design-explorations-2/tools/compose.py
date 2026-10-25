#!/usr/bin/env python3
"""Composes frames/compare-<A|B|C>.png: the three directions side by side, same scale, labelled."""
import os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F = os.path.join(ROOT, "frames")
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 22)
except OSError:
    font = ImageFont.load_default()
SCREENS = {"A": "M1.0 · 1440×900", "B": "M2.1 · 1440×900", "C": "M6.2.1 · 1440×900"}
for f, label in SCREENS.items():
    ims = [Image.open(os.path.join(F, f"{d}-{f}.png")) for d in ("t1", "t2", "t3")]
    w, h = ims[0].size
    gap, top = 24, 44
    sheet = Image.new("RGB", (3 * w + 4 * gap, h + top + gap), (120, 120, 120))
    dr = ImageDraw.Draw(sheet)
    for i, (d, im) in enumerate(zip(("T1 Hai chế độ", "T2 Vật thể quà tặng", "T3 Theo vùng"), ims)):
        x = gap + i * (w + gap)
        sheet.paste(im, (x, top))
        dr.text((x, 14), f"{d} — Frame {f}" + f" · {label}", font=font, fill=(255, 255, 255))
    sheet.save(os.path.join(F, f"compare-{f}.png"))
print("ok")
