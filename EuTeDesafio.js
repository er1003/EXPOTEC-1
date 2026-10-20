var C = [
  [
    "Corpo",
    "Faça 20 agachamentos antes do café",
    "Conte em voz alta e termine com os braços para cima, como campeão.",
    10,
  ],
  [
    "Corpo",
    "Dance uma música inteira na sala",
    "Vale qualquer ritmo, mas sem sentar até o fim.",
    10,
  ],
  [
    "Corpo",
    "Fique 1 minuto em prancha",
    "Se tremer, ótimo: é o músculo acordando.",
    15,
  ],
  [
    "Corpo",
    "Suba escadas em vez do elevador",
    "Hoje todas as vezes que aparecer uma escada.",
    10,
  ],
  [
    "Corpo",
    "Caminhe 15 minutos sem olhar o celular",
    "Repare em três coisas que você nunca tinha visto no caminho.",
    15,
  ],
  [
    "Corpo",
    "Alongue como um gato ao acordar e antes de dormir",
    "Dois alongamentos de 2 minutos, um de manhã e outro à noite.",
    10,
  ],
  [
    "Mente",
    "Fique 30 minutos sem redes sociais",
    "Guarde o celular longe e anote o que fez nesse tempo.",
    15,
  ],
  [
    "Mente",
    "Aprenda 5 palavras em outro idioma",
    "Use cada uma em uma frase antes de dormir.",
    10,
  ],
  [
    "Mente",
    "Calcule de cabeça a gorjeta ou o troco de hoje",
    "Sem calculadora. Conferiu? Ponto dobrado se acertou.",
    10,
  ],
  [
    "Mente",
    "Escreva 3 coisas boas que aconteceram hoje",
    "Pequenas valem. Um café quente conta.",
    10,
  ],
  [
    "Mente",
    "Leia 10 páginas de um livro",
    "Qualquer livro, menos o que você já abandonou três vezes.",
    10,
  ],
  [
    "Mente",
    "Respire fundo por 3 minutos",
    "Inspire contando até 4 e solte contando até 6.",
    10,
  ],
  [
    "Coragem",
    "Elogie sinceramente uma pessoa que você não conhece",
    "Olhe nos olhos e fale com leveza. Pode ser no mercado.",
    20,
  ],
  [
    "Coragem",
    "Mande uma mensagem para alguém com quem perdeu contato",
    "Só um “lembrei de você”. Sem cobrança.",
    20,
  ],
  [
    "Coragem",
    "Peça ajuda em algo que você faria sozinho",
    "Pedir ajuda também é força.",
    15,
  ],
  [
    "Coragem",
    "Diga “não” para algo que você não quer fazer",
    "Com educação e sem pedir desculpas demais.",
    20,
  ],
  [
    "Coragem",
    "Cante em voz alta no banho ou no carro",
    "Alto o bastante para você se ouvir. Afinar é opcional.",
    10,
  ],
  [
    "Coragem",
    "Experimente um alimento que você nunca provou",
    "Uma garfada já vale. Anote a nota de 0 a 10.",
    15,
  ],
  [
    "Criatividade",
    "Desenhe seu dia em 60 segundos",
    "Sem apagar, sem julgar. Boneco palito é bem-vindo.",
    10,
  ],
  [
    "Criatividade",
    "Invente um nome e uma história para um objeto da sua casa",
    "Quem é a cadeira da cozinha e o que ela já viu?",
    10,
  ],
  [
    "Criatividade",
    "Escreva um bilhete de gentileza e deixe em algum lugar",
    "Na mesa de alguém, no espelho, na porta da geladeira.",
    15,
  ],
  [
    "Criatividade",
    "Monte uma playlist de 5 músicas para o seu humor de hoje",
    "Dê um título dramático a ela.",
    10,
  ],
  [
    "Criatividade",
    "Faça uma foto bonita de algo comum",
    "Mude de ângulo três vezes antes de apertar o botão.",
    10,
  ],
  [
    "Criatividade",
    "Invente uma receita com o que tem na geladeira",
    "Nome chique obrigatório.",
    15,
  ],
  [
    "Brincadeira",
    "Faça uma competição de caretas com alguém",
    "Quem rir primeiro perde. Registre o placar.",
    10,
  ],
  [
    "Brincadeira",
    "Conte uma piada ruim para três pessoas",
    "Quanto pior, melhor. Vale gemido coletivo.",
    10,
  ],
  [
    "Brincadeira",
    "Jogue um jogo de tabuleiro, cartas ou de palavras",
    "Pode ser forca no guardanapo.",
    15,
  ],
  [
    "Brincadeira",
    "Fale só com rimas por 5 minutos",
    "Quem atrapalhar, paga uma prenda simpática.",
    15,
  ],
  [
    "Brincadeira",
    "Faça um mímica do seu dia e peça para adivinharem",
    "Sem som, só gestos. Dramatize à vontade.",
    10,
  ],
  [
    "Brincadeira",
    "Crie um desafio e mande para alguém",
    "Vale uma versão sua de “eu te desafio”.",
    20,
  ],
];
var K = "duvido-v1",
  S = { done: {}, off: {}, pts: 0 };
try {
  var r = localStorage.getItem(K);
  if (r) S = JSON.parse(r);
} catch (e) {}
function save() {
  try {
    localStorage.setItem(K, JSON.stringify(S));
  } catch (e) {}
}
function key(d) {
  return (
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0")
  );
}
function idx(d) {
  var n = Math.floor(
    Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5,
  );
  return (n + (S.off[key(d)] || 0) + C.length * 1000) % C.length;
}
var now = new Date(),
  tk = key(now),
  $ = function (i) {
    return document.getElementById(i);
  };
function streak() {
  var n = 0,
    d = new Date(now);
  if (!S.done[key(d)]) d.setDate(d.getDate() - 1);
  while (S.done[key(d)]) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
function render() {
  var c = C[idx(now)],
    ok = !!S.done[tk];
  $("ct").textContent = c[0];
  $("ch").textContent =
    "Eu te desafio: " + c[1].charAt(0).toLowerCase() + c[1].slice(1);
  $("cd").textContent = c[2];
  $("cp").textContent = "+" + c[3];
  var b = $("accept");
  b.disabled = ok;
  b.textContent = ok ? "Desafio cumprido! 🎉" : "Aceito o desafio!";
  $("swap").style.display = ok ? "none" : "";
  var s = streak();
  $("streak").textContent = "🔥 " + s + (s === 1 ? " dia" : " dias");
  $("pts").textContent = "⭐ " + S.pts + " pts";
  var w = $("week");
  w.innerHTML = "";
  var dn = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  for (var i = 6; i >= 0; i--) {
    var d = new Date(now);
    d.setDate(d.getDate() - i);
    var k = key(d);
    var el = document.createElement("div");
    el.className = "day" + (S.done[k] ? " ok" : "") + (i === 0 ? " today" : "");
    el.innerHTML =
      dn[d.getDay()] + "<b>" + (S.done[k] ? "✔" : d.getDate()) + "</b>";
    w.appendChild(el);
  }
}
function burst() {
  var e = ["🎉", "⭐", "🔥", "✨", "🧡", "💜"];
  for (var i = 0; i < 16; i++) {
    var p = document.createElement("span");
    p.className = "pop";
    p.textContent = e[i % 6];
    p.style.left = 30 + Math.random() * 40 + "vw";
    p.style.top = "50vh";
    p.style.setProperty("--x", Math.random() * 300 - 150 + "px");
    p.style.setProperty("--y", -80 - Math.random() * 220 + "px");
    document.body.appendChild(p);
    setTimeout(
      function (q) {
        q.remove();
      }.bind(null, p),
      1200,
    );
  }
}
function celebrate(pts) {
  var old = document.getElementById("party");
  if (old) old.remove();
  var s = streak(),
    rm =
      window.matchMedia &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
  var o = document.createElement("div");
  o.id = "party";
  o.setAttribute("role", "status");
  o.innerHTML =
    '<div class="badge"><svg class="ck" viewBox="0 0 52 52" aria-hidden="true"><circle class="cc" cx="26" cy="26" r="24"/><path class="cp" d="M14 27l8 8 16-17"/></svg><h2>Desafio cumprido!</h2><p>+' +
    pts +
    ' pontos</p><p class="st">🔥 ' +
    s +
    (s === 1 ? " dia" : " dias seguidos") +
    "</p><small>Toque para continuar</small></div>";
  var stop = false,
    raf = 0,
    cv = null;
  if (!rm) {
    cv = document.createElement("canvas");
    o.insertBefore(cv, o.firstChild);
  }
  document.body.appendChild(o);
  function close() {
    stop = true;
    cancelAnimationFrame(raf);
    o.remove();
  }
  o.onclick = close;
  setTimeout(close, rm ? 3200 : 6200);
  if (rm) return;
  var dpr = Math.min(window.devicePixelRatio || 1, 2),
    W = innerWidth,
    H = innerHeight,
    g = cv.getContext("2d"),
    P = [],
    T = 0,
    cols = [
      "#ff6d00",
      "#ff7900",
      "#ff8500",
      "#ff9100",
      "#ff9e00",
      "#9d4edd",
      "#7b2cbf",
      "#fff4e6",
      "#ffffff",
    ];
  cv.width = W * dpr;
  cv.height = H * dpr;
  g.scale(dpr, dpr);
  function mk(x, y, vx, vy, b) {
    return {
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      b: b,
      c: cols[(Math.random() * cols.length) | 0],
      k: (Math.random() * 4) | 0,
      r: Math.random() * 6.28,
      vr: (Math.random() - 0.5) * 0.3,
      s: 9 + Math.random() * 9,
      f: Math.random() * 6.28,
      vf: 0.08 + Math.random() * 0.16,
      sw: Math.random() * 6.28,
      sf: 0.03 + Math.random() * 0.05,
      sa: 0.5 + Math.random() * 1.3,
    };
  }
  for (var i = 0; i < 70; i++) {
    var a = -Math.PI / 2 + (Math.random() - 0.5) * 2.8,
      v = 6 + Math.random() * 11;
    P.push(mk(W / 2, H * 0.5, Math.cos(a) * v, Math.sin(a) * v, true));
  }
  function draw(p) {
    g.save();
    g.translate(p.x, p.y);
    g.rotate(p.r);
    g.scale(1, Math.cos(p.f));
    g.fillStyle = p.c;
    g.strokeStyle = p.c;
    if (p.k === 0) g.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.66);
    else if (p.k === 1) {
      g.beginPath();
      g.arc(0, 0, p.s / 3, 0, 6.28);
      g.fill();
    } else if (p.k === 2) {
      g.beginPath();
      g.moveTo(0, -p.s / 2);
      g.lineTo(p.s / 2, p.s / 2);
      g.lineTo(-p.s / 2, p.s / 2);
      g.closePath();
      g.fill();
    } else {
      g.lineWidth = 3;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(-p.s, 0);
      g.bezierCurveTo(-p.s / 2, -p.s * 0.7, p.s / 2, p.s * 0.7, p.s, 0);
      g.stroke();
    }
    g.restore();
  }
  function tick() {
    if (stop) return;
    T++;
    if (T < 120 && T % 2 === 0)
      for (var j = 0; j < 5; j++)
        P.push(mk(Math.random() * W, -24, 0, 1 + Math.random() * 2, false));
    g.clearRect(0, 0, W, H);
    for (var i = P.length - 1; i >= 0; i--) {
      var p = P[i],
        cap = 3.6 + p.s / 6;
      p.vy += 0.14;
      if (p.vy > cap) p.vy -= (p.vy - cap) * 0.15;
      p.vx *= 0.985;
      p.sw += p.sf;
      p.x += p.vx + Math.sin(p.sw) * p.sa;
      p.y += p.vy;
      p.r += p.vr;
      p.f += p.vf;
      if (p.y > H + 30) {
        P.splice(i, 1);
        continue;
      }
      draw(p);
    }
    raf = requestAnimationFrame(tick);
  }
  tick();
}
$("accept").onclick = function () {
  if (S.done[tk]) return;
  var c = C[idx(now)];
  S.done[tk] = true;
  S.pts += c[3];
  save();
  render();
  celebrate(c[3]);
  var s = streak();
  $("msg").textContent =
    s > 1
      ? "Você aceitou e cumpriu! Sequência de " + s + " dias."
      : "Muito bem! Amanhã tem mais.";
};
$("swap").onclick = function () {
  S.off[tk] = (S.off[tk] || 0) + 1;
  save();
  render();
  $("msg").textContent = "Desafio trocado. Agora não vale amarelar!";
};
$("share").onclick = function () {
  var t =
    "Eu te desafio: " +
    C[idx(now)][1].charAt(0).toLowerCase() +
    C[idx(now)][1].slice(1) +
    ". Topa?";
  try {
    navigator.clipboard.writeText(t).then(
      function () {
        $("msg").textContent = "Convite copiado! Cole no WhatsApp.";
      },
      function () {
        $("msg").textContent = t;
      },
    );
  } catch (e) {
    $("msg").textContent = t;
  }
};
var rt = 0;
$("reset").onclick = function () {
  var b = this;
  if (!rt) {
    b.textContent = "Tem certeza? Toque de novo";
    rt = setTimeout(function () {
      rt = 0;
      b.textContent = "Zerar meu progresso";
    }, 4000);
    return;
  }
  clearTimeout(rt);
  rt = 0;
  b.textContent = "Zerar meu progresso";
  S = { done: {}, off: {}, pts: 0 };
  save();
  $("msg").textContent = "Progresso zerado. Hoje é um novo começo!";
  render();
};
var CV = null;
function rr(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
function wrapTxt(g, t, x, y, mw, lh, max) {
  var ws = t.split(" "),
    l = "",
    n = 0;
  for (var i = 0; i < ws.length; i++) {
    var tt = l ? l + " " + ws[i] : ws[i];
    if (g.measureText(tt).width > mw && l) {
      g.fillText(l, x, y);
      y += lh;
      n++;
      l = ws[i];
      if (n >= max - 1) {
        l = ws.slice(i).join(" ");
        break;
      }
    } else l = tt;
  }
  g.fillText(l, x, y);
}
function card(im) {
  var c = document.createElement("canvas");
  c.width = 1080;
  c.height = 1350;
  var g = c.getContext("2d");
  var bg = g.createLinearGradient(0, 0, 1080, 1350);
  bg.addColorStop(0, "#240046");
  bg.addColorStop(1, "#5a189a");
  g.fillStyle = bg;
  g.fillRect(0, 0, 1080, 1350);
  g.fillStyle = "#ff9e00";
  g.font = '400 76px "Bagel Fat One","Trebuchet MS",sans-serif';
  g.fillText("Eu aceitei… e fiz!", 60, 130);
  var x = 60,
    y = 180,
    w = 960,
    h = 760;
  g.save();
  rr(g, x, y, w, h, 48);
  g.clip();
  var s = Math.max(w / im.width, h / im.height);
  g.drawImage(
    im,
    x + (w - im.width * s) / 2,
    y + (h - im.height * s) / 2,
    im.width * s,
    im.height * s,
  );
  g.restore();
  g.lineWidth = 14;
  g.strokeStyle = "#ff9100";
  rr(g, x, y, w, h, 48);
  g.stroke();
  var ch = C[idx(now)];
  g.fillStyle = "#fff4e6";
  g.font = "800 46px Nunito,system-ui,sans-serif";
  wrapTxt(g, ch[1] + ".", 60, 1030, 960, 62, 3);
  g.fillStyle = "#ff9e00";
  g.font = '400 44px "Bagel Fat One","Trebuchet MS",sans-serif';
  g.fillText("Eu Te Desafio", 60, 1280);
  g.fillStyle = "#d9c2f0";
  g.font = "700 34px Nunito,system-ui,sans-serif";
  g.textAlign = "right";
  g.fillText(now.toLocaleDateString("pt-BR"), 1020, 1280);
  CV = c;
  $("out").src = c.toDataURL("image/jpeg", 0.9);
  $("prev").style.display = "block";
  $("pub").style.display = DB && UID ? "" : "none";
}
function onPhoto() {
  var f = this.files && this.files[0];
  if (!f) return;
  var r = new FileReader();
  r.onload = function () {
    var im = new Image();
    im.onload = function () {
      var go = function () {
        card(im);
      };
      try {
        Promise.all([
          document.fonts.load('76px "Bagel Fat One"'),
          document.fonts.load("800 46px Nunito"),
        ]).then(go, go);
      } catch (e) {
        go();
      }
    };
    im.src = r.result;
  };
  r.readAsDataURL(f);
  this.value = "";
}
$("file").onchange = onPhoto;
$("pick").onclick = $("pick2").onclick = function () {
  $("file").click();
};
$("sh").onclick = function () {
  if (!CV) return;
  CV.toBlob(
    function (b) {
      var f = new File([b], "eu-te-desafio.jpg", { type: "image/jpeg" });
      try {
        if (navigator.canShare && navigator.canShare({ files: [f] })) {
          navigator
            .share({
              files: [f],
              text: "Eu aceitei… e fiz! Topa o desafio de hoje no Eu Te Desafio?",
            })
            .catch(function () {});
          return;
        }
      } catch (e) {}
      $("msg").textContent =
        "O compartilhamento direto não abre neste aparelho. Pressione e segure a imagem para salvar e enviar.";
    },
    "image/jpeg",
    0.9,
  );
};
var DB = null,
  UID = null,
  UM = null,
  ADM = false,
  PD = [],
  V = {};
function watchMural() {
  DB.collection("cards")
    .orderBy("ts", "desc")
    .limit(24)
    .onSnapshot(
      async function (sn) {
        var g = $("grid");
        g.innerHTML = "";
        if (sn.empty) {
          $("empty").style.display = "block";
          return;
        }
        $("empty").style.display = "none";
        var P = {};
        try {
          if (UM)
            P = await UM.profiles(
              sn.docs.map(function (d) {
                return d.id;
              }),
            );
        } catch (e) {}
        sn.docs.forEach(function (d) {
          var v = d.data() || {};
          if (
            typeof v.img !== "string" ||
            v.img.indexOf("data:image/jpeg;base64,") !== 0
          )
            return;
          var f = document.createElement("figure"),
            im = document.createElement("img"),
            cp = document.createElement("figcaption");
          im.src = v.img;
          im.alt = "Cartão de desafio cumprido";
          cp.textContent =
            ((P[d.id] && P[d.id].name) || "Alguém") +
            " cumpriu: " +
            String(v.txt || "").slice(0, 140);
          f.appendChild(im);
          f.appendChild(cp);
          if (ADM) {
            var rb = document.createElement("button");
            rb.textContent = "Remover";
            rb.className = "mini";
            rb.onclick = function () {
              DB.collection("cards").doc(d.id).delete();
            };
            cp.appendChild(rb);
          }
          g.appendChild(f);
        });
      },
      function () {},
    );
}
(async function () {
  try {
    if (!window.claude) return;
    DB = await claude.use("db");
    if (!DB) return;
    UM = await claude.use("user");
    UID = UM ? await UM.id() : null;
    if (!UID) {
      DB = null;
      return;
    }
    $("mural").style.display = "block";
    if (CV) $("pub").style.display = "";
    try {
      ADM = await UM.canEdit();
    } catch (e) {}
    if (ADM) {
      $("mod").style.display = "block";
      watchPending();
    }
    watchMural();
  } catch (e) {
    DB = null;
  }
})();
function d2b(u) {
  var b = atob(u.split(",")[1]),
    a = new Uint8Array(b.length);
  for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i);
  return new Blob([a], { type: "image/jpeg" });
}
async function screen(u) {
  try {
    var sm = await claude.use("sample");
    if (!sm) return null;
    var lim = await sm.limits();
    if (!lim || !lim.images) return null;
    return await sm.json(
      'Você é moderador de um mural público para todas as idades. Veja a imagem e responda somente JSON no formato {"ok":true,"motivo":""}. Use ok=false se houver nudez, conteúdo sexual ou sugestivo, violência ou sangue explícitos, símbolos de ódio, assédio, drogas, armas apontadas, texto ofensivo, ou documentos e dados pessoais legíveis. Em caso de dúvida use ok=false. O motivo deve ter no máximo 10 palavras.',
      { images: [d2b(u)], modelTier: "quick", cache: false },
    );
  } catch (e) {
    return null;
  }
}
async function approve(d) {
  var v = d.data() || {};
  try {
    if (v.action === "remove") await DB.collection("cards").doc(d.id).delete();
    else if (
      typeof v.img === "string" &&
      v.img.indexOf("data:image/jpeg;base64,") === 0
    )
      await DB.collection("cards")
        .doc(d.id)
        .set({
          img: v.img,
          txt: String(v.txt || "").slice(0, 140),
          cat: v.cat || "",
          date: v.date || "",
          ts: Date.now(),
        });
    await DB.collection("pending").doc(d.id).delete();
  } catch (e) {
    $("msg").textContent = "Não foi possível concluir agora.";
  }
}
function drawPending() {
  var l = $("plist");
  l.innerHTML = "";
  $("pempty").style.display = PD.length ? "none" : "block";
  PD.forEach(function (d) {
    var v = d.data() || {},
      rem = v.action === "remove",
      it = document.createElement("figure"),
      cp = document.createElement("figcaption");
    if (
      !rem &&
      typeof v.img === "string" &&
      v.img.indexOf("data:image/jpeg;base64,") === 0
    ) {
      var im = document.createElement("img");
      im.src = v.img;
      im.alt = "Cartão aguardando aprovação";
      it.appendChild(im);
    }
    var vv = V[d.id],
      tx = rem
        ? "Pedido de remoção do cartão"
        : String(v.txt || "").slice(0, 120);
    if (vv)
      tx += vv.ok
        ? " | Claude: parece seguro"
        : " | Claude: revisar (" + (vv.motivo || "") + ")";
    else if (v.pre === "ok") tx += " | Pré-verificada";
    cp.textContent = tx;
    var a = document.createElement("button");
    a.className = "mini";
    a.textContent = rem ? "Remover cartão" : "Aprovar";
    a.onclick = function () {
      approve(d);
    };
    var r = document.createElement("button");
    r.className = "mini";
    r.textContent = "Recusar";
    r.onclick = function () {
      DB.collection("pending").doc(d.id).delete();
    };
    cp.appendChild(document.createElement("br"));
    cp.appendChild(a);
    cp.appendChild(r);
    it.appendChild(cp);
    l.appendChild(it);
  });
}
function watchPending() {
  DB.collection("pending")
    .orderBy("ts", "desc")
    .limit(30)
    .onSnapshot(
      function (sn) {
        PD = sn.docs;
        drawPending();
      },
      function () {},
    );
}
$("scan").onclick = async function () {
  var b = $("scan");
  b.disabled = true;
  b.textContent = "Analisando…";
  var L = PD.slice();
  for (var i = 0; i < L.length; i++) {
    var v = L[i].data() || {};
    if (
      v.action === "remove" ||
      typeof v.img !== "string" ||
      v.img.indexOf("data:image/jpeg;base64,") !== 0
    )
      continue;
    V[L[i].id] = (await screen(v.img)) || {
      ok: false,
      motivo: "não foi possível analisar",
    };
    drawPending();
  }
  b.disabled = false;
  b.textContent = "Analisar com Claude";
};
$("okall").onclick = async function () {
  var L = PD.slice();
  for (var i = 0; i < L.length; i++) {
    var x = V[L[i].id];
    if (x && x.ok === true && (L[i].data() || {}).action !== "remove")
      await approve(L[i]);
  }
};
$("pub").onclick = async function () {
  if (!DB || !UID || !CV) return;
  var s = document.createElement("canvas");
  s.width = 540;
  s.height = 675;
  s.getContext("2d").drawImage(CV, 0, 0, 540, 675);
  var q = 0.7,
    u = s.toDataURL("image/jpeg", q);
  while (u.length > 170000 && q > 0.3) {
    q -= 0.1;
    u = s.toDataURL("image/jpeg", q);
  }
  var ch = C[idx(now)];
  $("msg").textContent = "Verificando a foto…";
  var vd = await screen(u);
  if (vd && vd.ok === false) {
    $("msg").textContent =
      "Esta foto não pode ir para o mural: " +
      String(vd.motivo || "conteúdo impróprio").slice(0, 80) +
      ". Escolha outra foto.";
    return;
  }
  try {
    await DB.collection("pending")
      .doc(UID)
      .set({
        img: u,
        txt: ch[1],
        cat: ch[0],
        date: tk,
        ts: Date.now(),
        pre: vd ? "ok" : "nao",
      });
    $("msg").textContent =
      "Cartão enviado! Ele aparece no mural depois da aprovação.";
  } catch (e) {
    $("msg").textContent =
      "Não foi possível publicar no mural. Peça a quem enviou o convite para liberar sua participação.";
  }
};
$("rm").onclick = async function () {
  if (!DB || !UID) return;
  try {
    await DB.collection("pending")
      .doc(UID)
      .set({ action: "remove", ts: Date.now() });
    $("msg").textContent = "Pedido de remoção enviado ao administrador.";
  } catch (e) {}
};
render();
