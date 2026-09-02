/* ascii-type.js — renders <pre class="ascii-h1" data-desktop="LINE|LINE" data-mobile="LINE|LINE"> as block letters
   in a 5-row pixel font (the same grid as the HTTPS wordmark), drawn in mono "#" glyphs with faint dots in the gaps. */
(function(){
  "use strict";
  var F = {
    A:[" ### ","#   #","#####","#   #","#   #"], B:["#### ","#   #","#### ","#   #","#### "], C:[" ####","#    ","#    ","#    "," ####"],
    D:["#### ","#   #","#   #","#   #","#### "], E:["#####","#    ","#### ","#    ","#####"], F:["#####","#    ","#### ","#    ","#    "],
    G:[" ####","#    ","#  ##","#   #"," ####"], H:["#   #","#   #","#####","#   #","#   #"], I:["#####","  #  ","  #  ","  #  ","#####"],
    J:["    #","    #","    #","#   #"," ### "], K:["#   #","#  # ","###  ","#  # ","#   #"], L:["#    ","#    ","#    ","#    ","#####"],
    M:["#   #","## ##","# # #","#   #","#   #"], N:["#   #","##  #","# # #","#  ##","#   #"], O:[" ### ","#   #","#   #","#   #"," ### "],
    P:["#### ","#   #","#### ","#    ","#    "], Q:[" ### ","#   #","#   #","#  # "," ## #"], R:["#### ","#   #","#### ","#  # ","#   #"],
    S:[" ####","#    "," ### ","    #","#### "], T:["#####","  #  ","  #  ","  #  ","  #  "], U:["#   #","#   #","#   #","#   #"," ### "],
    V:["#   #","#   #","#   #"," # # ","  #  "], W:["#   #","#   #","# # #","## ##","#   #"], X:["#   #"," # # ","  #  "," # # ","#   #"],
    Y:["#   #"," # # ","  #  ","  #  ","  #  "], Z:["#####","   # ","  #  "," #   ","#####"],
    "0":[" ### ","#  ##","# # #","##  #"," ### "], "1":["  #  "," ##  ","  #  ","  #  ","#####"], "2":[" ### ","#   #","  ## "," #   ","#####"],
    "3":["#### ","    #"," ### ","    #","#### "], "4":["#   #","#   #","#####","    #","    #"], "5":["#####","#    ","#### ","    #","#### "],
    "6":[" ####","#    ","#### ","#   #"," ### "], "7":["#####","    #","   # ","  #  ","  #  "], "8":[" ### ","#   #"," ### ","#   #"," ### "],
    "9":[" ### ","#   #"," ####","    #","#### "],
    ",":["  ","  ","  "," #","# "], ".":[" "," "," "," ","#"], "-":["   ","   ","###","   ","   "], "'":["#"," "," "," "," "],
    "!":["#","#","#"," ","#"], "_":["     ","     ","     ","     ","#####"], ":":[" ","#"," ","#"," "], "/":["    #","   # ","  #  "," #   ","#    "], " ":["  ","  ","  ","  ","  "]
  };
  function build(line){
    var rows = ["","","","",""];
    for (var c = 0; c < line.length; c++){
      var g = F[line[c].toUpperCase()] || F[" "];
      for (var r = 0; r < 5; r++) rows[r] += g[r] + " ";
    }
    return rows.map(function(x){ return x.replace(/\s+$/, ""); });
  }
  function render(el){
    var mobile = window.innerWidth < 640;
    var src = (mobile && el.dataset.mobile) ? el.dataset.mobile : el.dataset.desktop;
    var lines = src.split("|"), out = [], maxCols = 0;
    lines.forEach(function(line){
      var rows = build(line);
      maxCols = Math.max(maxCols, rows.reduce(function(m, x){ return Math.max(m, x.length); }, 0));
      out.push(rows.join("\n"));
    });
    /* filled cells stay "#"; empty cells become faint dots so the grid reads as a surface, like the globe */
    var html = out.join("\n\n").replace(/#/g, "").replace(/ /g, "<i>.</i>").replace(//g, "#");
    el.innerHTML = html;
    var pad = 34, avail = (el.parentElement.clientWidth || window.innerWidth) - pad;
    var cap = parseFloat(mobile ? (el.dataset.maxMobile || el.dataset.max || 22) : (el.dataset.max || 40));
    el.style.fontSize = Math.min(cap, avail / (maxCols * 0.6)).toFixed(2) + "px";
  }
  function all(){ document.querySelectorAll("pre.ascii-h1").forEach(render); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", all); else all();
  window.addEventListener("resize", all);
  window.asciiType = all;
})();
