// Review navigation between directions and screens. Hidden when the URL has ?frame (used for the rendered frames).
(function () {
  var b = document.body, dir = b.dataset.dir, scr = b.dataset.screen;
  if (/[?&]frame/.test(location.search)) { b.classList.add('frame-mode'); return; }
  var D = [['t1', 'T1 Hai chế độ'], ['t2', 'T2 Vật thể quà tặng'], ['t3', 'T3 Theo vùng']];
  var S = [['m1-0', 'M1.0'], ['m2-1', 'M2.1'], ['m6-2-1', 'M6.2.1']];
  var h = D.map(function (d) { return '<a href="../' + d[0] + '/' + scr + '.html" aria-current="' + (d[0] === dir) + '">' + d[1] + '</a>'; }).join('') +
    S.map(function (s) { return '<a href="' + s[0] + '.html" aria-current="' + (s[0] === scr) + '">' + s[1] + '</a>'; }).join('') +
    '<a href="../index.html">Tất cả</a>';
  var n = document.createElement('nav'); n.className = 'review-pill'; n.setAttribute('aria-label', 'Điều hướng đánh giá'); n.innerHTML = h; b.appendChild(n);
})();
