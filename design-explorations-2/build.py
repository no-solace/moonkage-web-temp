#!/usr/bin/env python3
"""Builds the 9 validation pages (3 directions x M1.0, M2.1, M6.2.1) from one content source.

Run:  python3 design-explorations-2/build.py
Content comes only from shared/data.py and shared/images/manifest.json, so every direction
shows the same text, numbers and images. Each direction has its own templates below.
"""
import json, os, sys
from html import escape as e

ROOT = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(ROOT, "shared"))
import data as D  # noqa: E402

MAN = {m["slot"]: m for m in json.load(open(os.path.join(ROOT, "shared/images/manifest.json"), encoding="utf-8"))}

FONTS = {
    "t1": "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
    "t2": "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap",
    "t3": "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Lexend:wght@400;500;600&display=swap",
}
NAMES = {"t1": "T1 Hai chế độ", "t2": "T2 Vật thể quà tặng", "t3": "T3 Theo vùng"}
TITLES = {"m1-0": "M1.0 Trang chủ", "m2-1": "M2.1 Chi tiết sản phẩm", "m6-2-1": "M6.2.1 So sánh báo giá"}


def img(slot, cls="", alt=None):
    m = MAN[slot]
    alt = alt or m["subject"]
    return (f'<div class="imgbox {cls}"><img src="../shared/images/{e(m["file"])}" alt="{e(alt)} ({e(D.ILL)})" loading="lazy">'
            f'<span class="ill-badge">{e(D.ILL)}</span></div>')


def ill(name, cls="", alt=""):
    return f'<img class="ill {cls}" src="../shared/illustrations/{name}.svg" alt="{e(alt)}">'


LOGO = '<a class="logo-off" href="m1-0.html" aria-label="Logo ẩn khi đánh giá">Logo ẩn</a>'


def page(d, screen, header, main, foot=True):
    footer = ""
    if foot:
        footer = (f'<footer class="foot"><nav aria-label="Chân trang">' +
                  "".join(f'<a href="#">{e(x)}</a>' for x in D.FOOT) + "</nav></footer>")
    return f"""<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{e(TITLES[screen])} · {e(NAMES[d])}</title>
<link rel="stylesheet" href="{FONTS[d]}">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="../shared/review.css">
</head>
<body data-dir="{d}" data-screen="{screen}">
{header}
<main id="main">
{main}
</main>
{footer}
<script src="../shared/review.js"></script>
</body>
</html>
"""


def conds(items, cls="cond"):
    return f'<ul class="{cls}">' + "".join(f"<li>{e(x)}</li>" for x in items) + "</ul>"


def stars(p):
    return f'{e(p["rating"])} ★ ({e(p["n"])})'


def pcard_link(i):
    return "m2-1.html" if i == 0 else "#"


# =====================================================================================
# T1 · Hai chế độ — two modes, two grammars. Shelf (white, image-led, price-led) vs
# Workbench (kraft, document-like). The mode switch replaces the nav; every surface
# belongs to exactly one mode.
# =====================================================================================
def t1_header(current=None, signed=False):
    sw = []
    for i, (label, mode) in enumerate(zip(D.HEADER["nav"], ["shelf", "bench"])):
        cur = ' aria-current="page"' if current == mode else ""
        href = "m2-1.html" if mode == "shelf" else "m6-2-1.html"
        sw.append(f'<a class="mode mode--{mode}" href="{href}"{cur}><i aria-hidden="true"></i>{e(label)}</a>')
    who = (f'<a class="hb" href="#">{e(D.HEADER["account"])}</a>' if signed else f'<a class="hb hb--solid" href="#">{e(D.HEADER["login"])}</a>')
    return f"""<header class="bar">
  <div class="bar-in">
    {LOGO}
    <nav class="switch" aria-label="Chế độ mua">{''.join(sw)}</nav>
    <form class="search" role="search"><label class="sr" for="q">Tìm</label><input id="q" type="search" placeholder="{e(D.HEADER['search'])}"><button type="submit">Tìm</button></form>
    <a class="area" href="#"><span>{e(D.HEADER['area_k'])}</span><b>{e(D.HEADER['area'])}</b><span aria-hidden="true">▾</span></a>
    <a class="hb" href="#">{e(D.HEADER['cart'])} <span class="n">{e(D.HEADER['cart_n'])}</span></a>
    {who}
  </div>
</header>"""


def t1_m1():
    prods = "".join(
        f'<a class="pc" href="{pcard_link(i)}">{img(p["img"], "pc-img")}<span class="pc-name">{e(p["name"])}</span>'
        f'<span class="pc-maker">{e(p["maker"])}</span><span class="pc-row"><span class="price">{e(p["price"])}</span><span class="rate">{stars(p)}</span></span></a>'
        for i, p in enumerate(D.PRODUCTS))
    sups = "".join(
        f'<li class="wo"><div class="wo-id"><b>{e(s["name"])}</b>' + (f' <span class="tag">{e(D.ONLY_TAG)}</span>' if s["only"] else "") +
        f'<span class="muted">{e(s["place"])}</span></div><div class="wo-spec"><span>{e(s["does"])}</span><span class="muted">Nhận đặt từ {e(s["min"])} · {e(s["reach"])}</span></div>'
        f'<div class="wo-act"><a href="#" class="lk">Xem đơn vị</a><a href="#" class="btn-b btn-b--sm">Gửi yêu cầu cho {e(s["short"])}</a></div></li>'
        for s in D.SUPPLIERS)
    m1, m2 = D.MODE1, D.MODE2
    main = f"""<h1 class="sr">Trang chủ</h1>
<p class="ask">{e(D.QUESTION)}</p>
<div class="fields">
  <section class="field field--shelf" aria-labelledby="m1">
    <div class="fhead">
      <div><span class="mtag mtag--shelf">{e(m1['tag'])}</span><h2 id="m1" class="ftitle">{e(m1['title'])}</h2><p class="fdesc">{e(m1['desc'])}</p>{conds(m1['cond'])}</div>
      <a class="btn-s" href="#">{e(m1['cta'])}</a>
    </div>
    <div class="shelf-head"><h3>{e(D.SEC_AVAIL)}</h3><a class="lk" href="#">{e(D.MORE_AVAIL)} ›</a></div>
    <div class="shelf">{prods}</div>
  </section>
  <section class="field field--bench" aria-labelledby="m2">
    <div class="fhead fhead--bench">
      <div><span class="mtag mtag--bench">{e(m2['tag'])}</span><h2 id="m2" class="ftitle">{e(m2['title'])}</h2><p class="fdesc">{e(m2['desc'])}</p>{conds(m2['cond'])}</div>
      {ill('custom', 'bench-ill', 'Minh họa: hộp, túi và thiệp in logo')}
    </div>
    <div class="bench-cta"><a class="btn-b" href="m6-2-1.html">{e(m2['cta'])}</a><a class="btn-b btn-b--line" href="#">{e(m2['cta2'])}</a></div>
    <div class="shelf-head shelf-head--bench"><h3>{e(D.SEC_CUSTOM)}</h3><a class="lk" href="#">{e(D.MORE_CUSTOM)} ›</a></div>
    <ul class="wos">{sups}</ul>
  </section>
</div>"""
    return page("t1", "m1-0", t1_header(), main)


def t1_m2():
    P = D.PDP
    thumbs = "".join(img(s, "th") for s in P["imgs"][1:])
    opts = "".join(f'<li class="opt {"opt--yes" if o["ok"] else "opt--no"}"><span class="mark" aria-hidden="true">{"✓" if o["ok"] else "–"}</span><span>{e(o["label"])}</span><b>{e(D.YES if o["ok"] else D.NO)}</b></li>' for o in D.PRINT)
    box = "".join(f"<dt>{e(k)}</dt><dd>{e(v)}</dd>" for k, v in P["box"])
    revs = "".join(f'<li><span class="av">{e(a)}</span><div><b>{e(n)}</b> · {e(s)} ★ <span class="muted">{e(d)}</span><p>{e(t)}</p></div></li>' for a, n, s, d, t in P["reviews"])
    crumbs = " › ".join(f'<a href="{"m1-0.html" if i == 0 else "#"}">{e(c)}</a>' if i < 2 else f"<span>{e(c)}</span>" for i, c in enumerate(P["crumbs"]))
    main = f"""<div class="field field--shelf field--page">
  <nav class="crumbs" aria-label="Breadcrumb">{crumbs}</nav>
  <div class="pdp">
    <div class="gal">{img(P['imgs'][0], 'gal-main')}<div class="thumbs">{thumbs}</div></div>
    <div class="buy">
      <a class="maker" href="#">{e(P['maker'])} · {e(P['place'])}</a>
      <h1 class="ptitle">{e(P['name'])}</h1>
      <p class="muted">{e(P['rating'])} ★ · {e(P['n'])} đánh giá</p>
      <p class="pprice">{e(P['price'])}</p>
      <div class="avail"><span class="ok">● {e(P['stock'])} · {e(P['deliver'])}</span><span class="muted">{e(P['fee'])}</span></div>
      <div class="addrow"><label for="qty">{e(P['qty_label'])}</label><input id="qty" type="number" min="1" value="{e(P['qty'])}"><a class="btn-s btn-s--grow" href="#">{e(P['add'])}</a></div>
      <section class="field field--bench cross" aria-labelledby="cx">
        <span class="mtag mtag--bench">{e(D.MODE2['tag'])} · {e(D.MODE2['title'])}</span>
        <h2 id="cx" class="xtitle">{e(P['custom_q'])}</h2><p class="fdesc">{e(P['custom_note'])}</p>
        <h3 class="opth">{e(D.PRINT_TITLE)}</h3><ul class="opts">{opts}</ul><p class="note">{e(D.PRINT_NOTE)}</p>
        <a class="btn-b" href="#">{e(P['custom_cta'])}</a>
      </section>
      <section class="spec"><h2>{e(P['box_title'])}</h2><dl>{box}</dl></section>
    </div>
  </div>
  <section class="revs"><h2>{e(P['reviews_title'])}</h2><ul>{revs}</ul></section>
</div>"""
    return page("t1", "m2-1", t1_header("shelf"), main)


def t1_m6():
    Q, R = D.QREQ, D.ROWS
    def cell(q, k):
        v = q[k]
        extra = ""
        if q["diff"][0] == k:
            extra = f'<span class="diff">✓ {e(q["diff"][1])}</span>'
        if k == "total":
            return f'<span class="big">{e(v)}</span><span class="muted">{e(q["unit"])}</span>{extra}'
        if k == "dep":
            return f'<span class="mid">{e(q["dep"])}</span><span class="muted">{e(q["dep_pct"])} · {e(D.HELD)}</span>'
        if k == "remain":
            return f'<span class="mid">{e(v)}</span>'
        if k == "mk":
            return ill(q["mk"], "mk", f"Maket mẫu của {q['maker']} (minh họa)")
        if k == "from_":
            return f"{e(v)}, Hà Nội → {e(Q['dest'])}"
        return f"{e(v)}{extra}"
    keys = ["total", "dep", "remain", "date", "custom", "mk", "from_", "rate"]
    heads = "".join(f'<div class="sheet-h"><b>{e(q["maker"])}</b><a class="btn-b" href="#">{e(D.ACCEPT)}</a></div>' for q in D.QUOTES)
    heads += f'<div class="sheet-h sheet-h--pending"><b>{e(D.PENDING["maker"])}</b><span class="pend">{e(D.PENDING["note"])}</span></div>'
    rows = ""
    for k in keys:
        rows += f'<div class="rl">{e(R[k])}</div>' + "".join(f'<div class="rc rc--{k}">{cell(q, k)}</div>' for q in D.QUOTES)
        rows += f'<div class="rc rc--pending">{e(D.PENDING["from_"]) + ", Hà Nội → " + e(Q["dest"]) if k == "from_" else "—"}</div>'
    states = "".join(f'<li><span>{e(a)}</span><b>{e(b)}</b></li>' for a, b in D.MONEY_STATES)
    rules = "".join(f"<li>{e(x)}</li>" for x in D.MONEY_RULES)
    req = "".join(f"<dt>{e(k)}</dt><dd>{e(v)}</dd>" for k, v in D.REQ)
    main = f"""<div class="field field--bench field--page">
  <div class="qhead">
    <div><span class="mtag mtag--bench">{e(Q['eyebrow'])}</span><h1 class="ptitle">{e(Q['title'])} <span class="count">{e(Q['badge'])}</span></h1><p class="fdesc">{e(Q['lead'])}</p><p class="muted">{e(Q['invited'])}</p></div>
    <div class="money"><b>{e(D.MONEY_NOW)}</b><ul>{states}</ul></div>
  </div>
  <div class="cmp">
    <div class="rl rl--corner"></div>{heads}
    {rows}
  </div>
  <div class="qfoot">
    <section class="sheet rules"><h2>{e(D.MONEY_TITLE)}</h2><ol>{rules}</ol></section>
    <section class="sheet req"><h2>{e(D.REQ_TITLE)}</h2><dl>{req}</dl><button type="button" class="btn-x">{e(D.CLOSE_REQ)}</button></section>
  </div>
</div>"""
    return page("t1", "m6-2-1", t1_header("bench", signed=True), main)


# =====================================================================================
# T2 · Vật thể quà tặng — the box is the unit. Every image sits on the same stage
# (fixed ratio, matte ground, contained, same padding); what exists is photographed,
# what will be made is drawn. Information hangs off objects as labels.
# =====================================================================================
def t2_header(signed=False):
    who = (f'<a href="#">{e(D.HEADER["account"])}</a>' if signed else f'<a href="#" class="solid">{e(D.HEADER["login"])}</a>')
    return f"""<header class="top">
  <div class="top-in">
    {LOGO}
    <nav class="nav" aria-label="Menu chính">{''.join(f'<a href="#">{e(x)}</a>' for x in D.HEADER['nav'])}</nav>
    <form class="search" role="search"><label class="sr" for="q">Tìm</label><input id="q" type="search" placeholder="{e(D.HEADER['search'])}"></form>
    <a class="area" href="#">{e(D.HEADER['area_k'])} <b>{e(D.HEADER['area'])}</b> ▾</a>
    <a href="#">{e(D.HEADER['cart'])} <span class="n">{e(D.HEADER['cart_n'])}</span></a>
    {who}
  </div>
</header>"""


def t2_obj(p, i):
    return (f'<a class="obj" href="{pcard_link(i)}"><div class="stage">{img(p["img"], "stage-img")}</div>'
            f'<div class="label"><span class="lname">{e(p["name"])}</span><span class="lmaker">{e(p["maker"])}</span>'
            f'<span class="lrow"><span class="price">{e(p["price"])}</span><span class="rate">{stars(p)}</span></span></div></a>')


def t2_m1():
    m1, m2 = D.MODE1, D.MODE2
    objs = "".join(t2_obj(p, i) for i, p in enumerate(D.PRODUCTS))
    sups = "".join(
        f'<li><span class="mono">{e(s["init"])}</span><div class="sid"><b>{e(s["name"])}</b>' + (f' <span class="tag">{e(D.ONLY_TAG)}</span>' if s["only"] else "") +
        f'<span class="muted">{e(s["place"])}</span></div><span>{e(s["does"])}</span><span class="muted">Nhận đặt từ {e(s["min"])} · {e(s["reach"])}</span>'
        f'<span class="acts"><a href="#" class="lk">Xem đơn vị</a><a href="#" class="btn btn--sm">Gửi yêu cầu cho {e(s["short"])}</a></span></li>'
        for s in D.SUPPLIERS)
    main = f"""<h1 class="sr">Trang chủ</h1>
<div class="intro"><p class="ask">{e(D.QUESTION)}</p><p class="where">{e(D.SEC_AVAIL)} · <a href="#">{e(D.MORE_AVAIL)} ›</a></p></div>
<div class="shelfline">
  <section class="group group--ready" aria-labelledby="g1">
    <header class="ghead"><span class="gtag">{e(m1['tag'])} · Có sẵn, đã chụp ảnh thật</span><h2 id="g1">{e(m1['title'])}</h2><p>{e(m1['desc'])}</p>{conds(m1['cond'])}<a class="btn" href="#">{e(m1['cta'])}</a></header>
    <h3 class="sr">{e(D.SEC_AVAIL)}</h3>
    <div class="objs">{objs}</div>
  </section>
  <section class="group group--made" aria-labelledby="g2">
    <header class="ghead"><span class="gtag gtag--made">{e(m2['tag'])} · Làm theo yêu cầu, chưa có ảnh</span><h2 id="g2">{e(m2['title'])}</h2><p>{e(m2['desc'])}</p>{conds(m2['cond'])}</header>
    <div class="obj obj--made"><div class="stage stage--drawn">{ill('custom', 'stage-ill', 'Minh họa: hộp, túi và thiệp in logo')}</div>
      <div class="label"><a class="btn" href="m6-2-1.html">{e(m2['cta'])}</a><a class="btn btn--line" href="#">{e(m2['cta2'])}</a></div></div>
  </section>
</div>
<section class="makers" aria-labelledby="g3"><div class="mhead"><h2 id="g3">{e(D.SEC_CUSTOM)}</h2><a class="lk" href="#">{e(D.MORE_CUSTOM)} ›</a></div><ul>{sups}</ul></section>"""
    return page("t2", "m1-0", t2_header(), main)


def t2_m2():
    P = D.PDP
    thumbs = "".join(f'<div class="stage stage--sm">{img(s, "stage-img")}</div>' for s in P["imgs"][1:])
    opts = "".join(f'<li class="{"yes" if o["ok"] else "no"}"><div class="stage stage--drawn stage--opt">{ill(o["ill"], "stage-ill", o["label"])}</div><span class="olabel">{e(o["label"])}</span><b class="ostate">{"✓ " if o["ok"] else "– "}{e(D.YES if o["ok"] else D.NO)}</b></li>' for o in D.PRINT)
    box = "".join(f"<dt>{e(k)}</dt><dd>{e(v)}</dd>" for k, v in P["box"])
    revs = "".join(f'<li><b>{e(n)}</b> · {e(s)} ★ <span class="muted">{e(d)}</span><p>{e(t)}</p></li>' for a, n, s, d, t in P["reviews"])
    crumbs = " / ".join(f'<a href="{"m1-0.html" if i == 0 else "#"}">{e(c)}</a>' if i < 2 else f"<span>{e(c)}</span>" for i, c in enumerate(P["crumbs"]))
    main = f"""<nav class="crumbs" aria-label="Breadcrumb">{crumbs}</nav>
<div class="pdp">
  <div class="gal"><div class="stage stage--hero">{img(P['imgs'][0], 'stage-img')}</div><div class="thumbs">{thumbs}</div></div>
  <aside class="tagcard">
    <a class="lmaker" href="#">{e(P['maker'])} · {e(P['place'])}</a>
    <h1>{e(P['name'])}</h1>
    <p class="muted">{e(P['rating'])} ★ · {e(P['n'])} đánh giá</p>
    <p class="pprice">{e(P['price'])}</p>
    <p class="avail"><b>{e(P['stock'])}</b> · {e(P['deliver'])}<br><span class="muted">{e(P['fee'])}</span></p>
    <div class="addrow"><label for="qty">{e(P['qty_label'])}</label><input id="qty" type="number" min="1" value="{e(P['qty'])}"><a class="btn btn--grow" href="#">{e(P['add'])}</a></div>
    <div class="made-head made-head--card"><span class="gtag gtag--made">{e(D.MODE2['tag'])} · {e(D.MODE2['title'])}</span><h2 id="mx">{e(P['custom_q'])}</h2><p>{e(P['custom_note'])}</p><a class="btn btn--line" href="#">{e(P['custom_cta'])}</a></div>
    <section class="spec"><h2>{e(P['box_title'])}</h2><dl>{box}</dl></section>
  </aside>
</div>
<section class="made" aria-labelledby="mx">
  <h3 class="opth">{e(D.PRINT_TITLE)}</h3>
  <ul class="opts">{opts}</ul>
  <div class="made-foot"><p class="note">{e(D.PRINT_NOTE)}</p></div>
</section>
<section class="revs"><h2>{e(P['reviews_title'])}</h2><ul>{revs}</ul></section>"""
    return page("t2", "m2-1", t2_header(), main)


def t2_m6():
    Q, R = D.QREQ, D.ROWS
    cols = ""
    for q in D.QUOTES:
        d_total = f'<span class="diff">✓ {e(q["diff"][1])}</span>' if q["diff"][0] == "total" else ""
        d_date = f'<span class="diff">✓ {e(q["diff"][1])}</span>' if q["diff"][0] == "date" else ""
        cols += f"""<article class="qcol">
  <div class="stage stage--drawn stage--mk">{ill(q['mk'], 'stage-ill', 'Maket mẫu của ' + q['maker'] + ' (minh họa)')}</div>
  <div class="qlabel"><span class="muted">{e(R['mk'])}</span><h2>{e(q['maker'])}</h2><span class="muted">{e(R['rate'])}: {e(q['rate'])}</span></div>
  <a class="btn btn--grow" href="#">{e(D.ACCEPT)}</a>
  <dl class="qfacts">
    <dt>{e(R['total'])}</dt><dd><span class="big">{e(q['total'])}</span><span class="muted">{e(q['unit'])}</span>{d_total}</dd>
    <dt>{e(R['dep'])}</dt><dd><b>{e(q['dep'])}</b> <span class="muted">{e(q['dep_pct'])}</span></dd>
    <dt>{e(R['remain'])}</dt><dd><b>{e(q['remain'])}</b></dd>
    <dt>{e(R['date'])}</dt><dd>{e(q['date'])}{d_date}</dd>
    <dt>{e(R['custom'])}</dt><dd>{e(q['custom'])}</dd>
    <dt>{e(R['from_'])}</dt><dd>{e(q['from_'])}, Hà Nội → {e(Q['dest'])}</dd>
  </dl>
  <div class="split" role="img" aria-label="Chia tiền: cọc {e(q['dep'])}, {e(D.HELD)}; {e(q['remain'])} {e(D.LATER).lower()}">
    <span class="seg seg--held"><b>Cọc · {e(D.HELD)}</b>{e(q['dep'])}</span><span class="seg seg--later"><b>{e(D.LATER)}</b>{e(q['remain'])}</span>
  </div>
</article>"""
    cols += f"""<article class="qcol qcol--pending"><div class="stage stage--empty"><span>{e(D.PENDING['note'])}</span></div>
  <div class="qlabel"><span class="muted">{e(R['mk'])}</span><h2>{e(D.PENDING['maker'])}</h2><span class="muted">{e(R['from_'])}: {e(D.PENDING['from_'])}, Hà Nội → {e(Q['dest'])}</span></div></article>"""
    states = "".join(f'<li><span>{e(a)}</span><b>{e(b)}</b></li>' for a, b in D.MONEY_STATES)
    rules = "".join(f"<li>{e(x)}</li>" for x in D.MONEY_RULES)
    req = "".join(f"<dt>{e(k)}</dt><dd>{e(v)}</dd>" for k, v in D.REQ)
    main = f"""<div class="qtop">
  <div><span class="gtag gtag--made">{e(Q['eyebrow'])}</span><h1>{e(Q['title'])} <span class="count">{e(Q['badge'])}</span></h1><p>{e(Q['lead'])}</p><p class="muted">{e(Q['invited'])}</p></div>
  <div class="ledger"><b>{e(D.MONEY_NOW)}</b><ul>{states}</ul></div>
</div>
<div class="qcols">{cols}</div>
<div class="qbottom"><section class="rules"><h2>{e(D.MONEY_TITLE)}</h2><ol>{rules}</ol></section>
<section class="req"><h2>{e(D.REQ_TITLE)}</h2><dl>{req}</dl><button type="button" class="btn btn--danger">{e(D.CLOSE_REQ)}</button></section></div>"""
    return page("t2", "m6-2-1", t2_header(signed=True), main)


# =====================================================================================
# T3 · Theo vùng — place is the organising axis. A place bar is always present; every
# product, maker and quote carries where it comes from and where it can go.
# =====================================================================================
def t3_header(signed=False, current=None):
    who = (f'<a href="#">{e(D.HEADER["account"])}</a>' if signed else f'<a href="#" class="solid">{e(D.HEADER["login"])}</a>')
    cur = ' aria-current="page"'
    nav = "".join(f'<a href="#"{cur if current == i else ""}>{e(x)}</a>' for i, x in enumerate(D.HEADER["nav"]))
    return f"""<header class="hd">
  <div class="hd-row">
    {LOGO}
    <form class="search" role="search"><label class="sr" for="q">Tìm</label><input id="q" type="search" placeholder="{e(D.HEADER['search'])}"><button type="submit">Tìm</button></form>
    <a href="#">{e(D.HEADER['cart'])} <span class="n">{e(D.HEADER['cart_n'])}</span></a>
    {who}
  </div>
  <div class="place">
    <a class="place-pick" href="#"><span class="pk">{e(D.HEADER['area_k'])}</span><span class="pv">{e(D.HEADER['area'])}</span><span class="pc">Đổi ▾</span></a>
    <nav class="nav" aria-label="Menu chính">{nav}</nav>
  </div>
</header>"""


def t3_m1():
    m1, m2 = D.MODE1, D.MODE2
    groups = {}
    for i, p in enumerate(D.PRODUCTS):
        groups.setdefault(p["maker"], dict(district=p["district"], items=[]))["items"].append((i, p))
    g_html = ""
    for maker, g in groups.items():
        loc = f'<span class="pin">{e(g["district"])}</span>' if g["district"] else '<span class="pin pin--none">Chưa rõ quận</span>'
        cards = "".join(f'<a class="pcard" href="{pcard_link(i)}">{img(p["img"], "pimg")}<span class="pname">{e(p["name"])}</span><span class="prow"><span class="price">{e(p["price"])}</span><span class="rate">{stars(p)}</span></span></a>' for i, p in g["items"])
        g_html += f'<div class="mgroup"><div class="mg-head"><b>{e(maker)}</b>{loc}</div><div class="mg-items">{cards}</div></div>'
    sups = "".join(
        f'<li><div class="sid"><b>{e(s["name"])}</b>' + (f' <span class="tag">{e(D.ONLY_TAG)}</span>' if s["only"] else "") + f'<span class="muted">{e(s["does"])}</span></div>'
        f'<span class="route"><span class="pin">{e(s["district"])}</span><span class="arrow" aria-hidden="true"></span><span class="reach">{e(s["reach"])}</span></span>'
        f'<span class="min">từ {e(s["min"])}</span><span class="acts"><a href="#" class="lk">Xem đơn vị</a><a href="#" class="btn btn--sm">Gửi yêu cầu cho {e(s["short"])}</a></span>'
        f'<span class="sr">Nhận đặt từ {e(s["min"])} · {e(s["reach"])} · {e(s["place"])}</span></li>'
        for s in D.SUPPLIERS)
    main = f"""<h1 class="sr">Trang chủ</h1>
<div class="home">
  <aside class="routes" aria-label="{e(D.QUESTION)}">
    <p class="ask">{e(D.QUESTION)}</p>
    <section class="route-card route-card--here" aria-labelledby="r1"><span class="rtag">{e(m1['tag'])} · trong vùng giao</span><h2 id="r1">{e(m1['title'])}</h2><p>{e(m1['desc'])}</p>{conds(m1['cond'])}<a class="btn" href="#">{e(m1['cta'])}</a></section>
    <section class="route-card route-card--made" aria-labelledby="r2"><span class="rtag">{e(m2['tag'])} · đơn vị có thể ở nơi khác</span><h2 id="r2">{e(m2['title'])}</h2><p>{e(m2['desc'])}</p>{conds(m2['cond'])}<div class="row">{ill('custom', 'rill', 'Minh họa: hộp, túi và thiệp in logo')}<div class="col"><a class="btn" href="m6-2-1.html">{e(m2['cta'])}</a><a class="btn btn--line" href="#">{e(m2['cta2'])}</a></div></div></section>
  </aside>
  <section class="local" aria-labelledby="loc">
    <div class="local-head"><h2 id="loc">{e(D.SEC_AVAIL)}</h2><a class="lk" href="#">{e(D.MORE_AVAIL)} ›</a></div>
    {g_html}
  </section>
</div>
<section class="makers" aria-labelledby="mk"><div class="local-head"><h2 id="mk">{e(D.SEC_CUSTOM)}</h2><a class="lk" href="#">{e(D.MORE_CUSTOM)} ›</a></div><ul>{sups}</ul></section>"""
    return page("t3", "m1-0", t3_header(), main)


def t3_m2():
    P = D.PDP
    thumbs = "".join(img(s, "th") for s in P["imgs"][1:])
    opts = "".join(f'<li class="{"yes" if o["ok"] else "no"}"><span class="mark" aria-hidden="true">{"✓" if o["ok"] else "–"}</span>{e(o["label"])}<b>{e(D.YES if o["ok"] else D.NO)}</b></li>' for o in D.PRINT)
    box = "".join(f"<dt>{e(k)}</dt><dd>{e(v)}</dd>" for k, v in P["box"])
    revs = "".join(f'<li><b>{e(n)}</b> · {e(s)} ★ <span class="muted">{e(d)}</span><p>{e(t)}</p></li>' for a, n, s, d, t in P["reviews"])
    crumbs = " › ".join(f'<a href="{"m1-0.html" if i == 0 else "#"}">{e(c)}</a>' if i < 2 else f"<span>{e(c)}</span>" for i, c in enumerate(P["crumbs"]))
    main = f"""<nav class="crumbs" aria-label="Breadcrumb">{crumbs}</nav>
<div class="pdp">
  <div class="gal">{img(P['imgs'][0], 'gal-main')}<div class="thumbs">{thumbs}</div></div>
  <div class="info">
    <h1>{e(P['name'])}</h1>
    <p class="muted">{e(P['rating'])} ★ · {e(P['n'])} đánh giá</p>
    <p class="pprice">{e(P['price'])}</p>
    <div class="delivery">
      <div class="route route--big"><span class="pin">Ba Đình</span><span class="arrow" aria-hidden="true"></span><span class="pin pin--you">{e(D.AREA)}</span></div>
      <p><b>{e(P['stock'])} · {e(P['deliver'])}</b><br><span class="muted">{e(P['fee'])}</span></p>
      <a class="maker" href="#">{e(P['maker'])} · {e(P['place'])}</a>
    </div>
    <div class="addrow"><label for="qty">{e(P['qty_label'])}</label><input id="qty" type="number" min="1" value="{e(P['qty'])}"><a class="btn btn--grow" href="#">{e(P['add'])}</a></div>
    <section class="custom" aria-labelledby="cx"><span class="rtag">{e(D.MODE2['tag'])} · {e(D.MODE2['title'])}</span><h2 id="cx">{e(P['custom_q'])}</h2><p>{e(P['custom_note'])}</p>
      <h3>{e(D.PRINT_TITLE)}</h3><ul class="opts">{opts}</ul><p class="note">{e(D.PRINT_NOTE)}</p><a class="btn btn--line" href="#">{e(P['custom_cta'])}</a></section>
    <section class="spec"><h2>{e(P['box_title'])}</h2><dl>{box}</dl></section>
  </div>
</div>
<section class="revs"><h2>{e(P['reviews_title'])}</h2><ul>{revs}</ul></section>"""
    return page("t3", "m2-1", t3_header(current=0), main)


def t3_m6():
    Q, R = D.QREQ, D.ROWS
    rows = ""
    for q in D.QUOTES:
        d_total = f'<span class="diff">✓ {e(q["diff"][1])}</span>' if q["diff"][0] == "total" else ""
        d_date = f'<span class="diff">✓ {e(q["diff"][1])}</span>' if q["diff"][0] == "date" else ""
        rows += f"""<article class="qrow">
  <div class="q-who"><h2>{e(q['maker'])}</h2><span class="muted">{e(q['rate'])}</span>
    <div class="route"><span class="pin">{e(q['from_'])}</span><span class="arrow" aria-hidden="true"></span><span class="pin pin--you">{e(Q['dest'])}</span></div><span class="sr">{e(R['from_'])}: {e(q['from_'])}, Hà Nội → {e(Q['dest'])}</span></div>
  <div class="q-money"><span class="k">{e(R['total'])}</span><span class="big">{e(q['total'])}</span><span class="muted">{e(q['unit'])}</span>{d_total}
    <dl><dt>{e(R['dep'])} {e(q['dep_pct'])}</dt><dd>{e(q['dep'])} <span class="held">{e(D.HELD)}</span></dd><dt>{e(R['remain'])}</dt><dd>{e(q['remain'])}</dd></dl></div>
  <div class="q-make"><dl><dt>{e(R['date'])}</dt><dd>{e(q['date'])}{d_date}</dd><dt>{e(R['custom'])}</dt><dd>{e(q['custom'])}</dd></dl>
    <figure>{ill(q['mk'], 'mk', 'Maket mẫu của ' + q['maker'] + ' (minh họa)')}<figcaption>{e(R['mk'])}</figcaption></figure></div>
  <div class="q-act"><a class="btn" href="#">{e(D.ACCEPT)}</a></div>
</article>"""
    rows += f"""<article class="qrow qrow--pending"><div class="q-who"><h2>{e(D.PENDING['maker'])}</h2>
  <div class="route"><span class="pin">{e(D.PENDING['from_'])}</span><span class="arrow" aria-hidden="true"></span><span class="pin pin--you">{e(Q['dest'])}</span></div><span class="sr">{e(R['from_'])}: {e(D.PENDING['from_'])}, Hà Nội → {e(Q['dest'])}</span></div>
  <div class="q-pend">{e(D.PENDING['note'])}</div></article>"""
    states = "".join(f'<li><span>{e(a)}</span><b>{e(b)}</b></li>' for a, b in D.MONEY_STATES)
    rules = "".join(f"<li>{e(x)}</li>" for x in D.MONEY_RULES)
    req = "".join(f"<dt>{e(k)}</dt><dd>{e(v)}</dd>" for k, v in D.REQ)
    main = f"""<div class="qtop">
  <div><span class="rtag">{e(Q['eyebrow'])}</span><h1>{e(Q['title'])} <span class="count">{e(Q['badge'])}</span></h1><p>{e(Q['lead'])}</p><p class="muted">{e(Q['invited'])}</p></div>
  <div class="dest"><span class="pk">Giao tới</span><span class="pv">{e(Q['dest'])}</span><span class="muted">Hà Nội · trước 15/11/2026</span></div>
</div>
<div class="money"><b>{e(D.MONEY_NOW)}</b><ul>{states}</ul></div>
<div class="qlist">{rows}</div>
<div class="qbottom"><section class="rules"><h2>{e(D.MONEY_TITLE)}</h2><ol>{rules}</ol></section>
<section class="req"><h2>{e(D.REQ_TITLE)}</h2><dl>{req}</dl><button type="button" class="btn btn--danger">{e(D.CLOSE_REQ)}</button></section></div>"""
    return page("t3", "m6-2-1", t3_header(signed=True, current=1), main)


BUILD = {
    "t1": {"m1-0": t1_m1, "m2-1": t1_m2, "m6-2-1": t1_m6},
    "t2": {"m1-0": t2_m1, "m2-1": t2_m2, "m6-2-1": t2_m6},
    "t3": {"m1-0": t3_m1, "m2-1": t3_m2, "m6-2-1": t3_m6},
}

if __name__ == "__main__":
    for d, screens in BUILD.items():
        os.makedirs(os.path.join(ROOT, d), exist_ok=True)
        for s, fn in screens.items():
            with open(os.path.join(ROOT, d, s + ".html"), "w", encoding="utf-8") as f:
                f.write(fn())
    print("built", sum(len(v) for v in BUILD.values()), "pages")
