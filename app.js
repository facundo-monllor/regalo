(() => {
  "use strict";

  // ─── Contenido: editá acá los textos ───────────────────────────────
  const RIDDLES = [
    {
      kind: "complete",
      title: "Completá la palabra",
      intro: "Soy famoso, soy un perro y tengo nombre de seis letras.",
      word: "SNOOPY",
      given: [0],
      hints: [
        "Soy blanco con orejas negras.",
        "Duermo arriba de mi casita roja, nunca adentro.",
        "Mi mejor amigo es un pajarito amarillo.",
        "Mi dueño se llama Charlie Brown.",
      ],
      prize: "Una figura de Snoopy",
    },
    {
      kind: "acrostic",
      title: "Una pista por letra",
      intro: "Cada pista esconde una palabra. Escribí solo su primera letra y, de arriba a abajo, aparece el nombre de tu premio.",
      word: "WALLE",
      clues: [
        "La contraseña que pedís apenas llegás a un bar: ___fi.",
        "Lo contrario de abajo.",
        "Sale de noche y a veces está llena.",
        "Cae del cielo y te arruina el pelo.",
        "La pegás en un sobre para mandar una carta.",
      ],
      hints: [
        "Una de las palabras empieza con doble ele.",
        "Es un robot que limpia la Tierra solito… y se enamora.",
      ],
      prize: "Un LEGO de WALL·E",
    },
    {
      kind: "tiles",
      title: "Ordená las letras",
      verse: [
        "Soy techo cuando llueve",
        "y refugio para quien no tiene;",
        "si estás conmigo, no hay viento",
        "ni tormenta que te llegue.",
        "Me buscás en una casa…",
        "o colgado en el placard.",
      ],
      words: ["ABRIGO"],
      decoys: ["Z", "U"],
      hints: [
        "Es una sola palabra de seis letras.",
        "Si te escondés de la lluvia, estás \"al ___ de la lluvia\".",
        "También se pone cuando hace frío.",
      ],
      prize: "Un buzo azul",
    },
    {
      kind: "search",
      title: "Sopa de letras",
      intro: "Acá adentro hay escondidas tres marcas deportivas, pero solo una tiene seis letras. Tocá sus letras en orden para armarla.",
      grid: [
        "RTNIKEL",
        "OABSEMV",
        "PLDORTC",
        "UFEIGNR",
        "MYTCDLO",
        "AHREVAB",
        "ZOLUTRS",
      ],
      answer: "ADIDAS",
      hints: [
        "Las otras dos son NIKE y PUMA. Esas no.",
        "La que buscás va en diagonal.",
        "Tiene tres rayas.",
      ],
      prize: "Una campera Adidas",
    },
  ];
  const GIVER = "Facundo";
  const STORAGE_KEY = "regalo-lucia-v2";
  // ───────────────────────────────────────────────────────────────────

  const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const $ = (s, r = document) => r.querySelector(s);
  const cabinet = $("#cabinet");
  const screen = $("#screen");
  const led = $("#led");
  const bigButton = $("#bigButton");
  const bigLabel = $("#bigButtonLabel");
  const bigSr = $("#bigButtonSr");
  const claw = $("#claw");
  const clawCable = $("#clawCable");
  const clawGrip = $("#clawGrip");
  const glass = $("#glass");
  const chute = $("#chute");
  const door = $("#door");
  const doorPrize = $("#doorPrize");
  const finalSection = $("#final");
  const coins = [...document.querySelectorAll("#coins li")];
  const capsules = [...document.querySelectorAll(".pile .capsule")];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const state = { solved: 0, phase: "intro", hintsShown: 0 };
  let onPress = null;
  let busy = false;

  // ─── Persistencia ───
  function load() {
    try {
      if (new URLSearchParams(location.search).has("reiniciar")) {
        localStorage.removeItem(STORAGE_KEY);
        history.replaceState(null, "", location.pathname);
      }
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && Number.isInteger(saved.solved)) state.solved = Math.min(4, Math.max(0, saved.solved));
    } catch (_) { /* sin almacenamiento: arranca de cero */ }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ solved: state.solved })); } catch (_) {}
  }

  // ─── Utilidades ───
  const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z]/g, "");
  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    kids.flat().forEach((c) => c != null && n.append(c));
    return n;
  };
  let ledCycle = null;
  function say(text, tone) {
    clearInterval(ledCycle);
    const msgs = Array.isArray(text) ? text : [text];
    let n = 0;
    const show = () => {
      led.textContent = msgs[n++ % msgs.length];
      led.classList.remove("is-scroll");
      led.style.removeProperty("--overflow");
      const over = led.scrollWidth - led.parentElement.clientWidth + 24;
      if (over > 24) {
        led.style.setProperty("--overflow", `${-over}px`);
        led.classList.add("is-scroll");
      }
    };
    show();
    if (msgs.length > 1) ledCycle = setInterval(show, 1800);
    led.classList.toggle("is-bad", tone === "bad");
    led.classList.toggle("is-good", tone === "good");
  }
  function setButton(label, handler, { ready = false, disabled = false } = {}) {
    bigLabel.textContent = label;
    bigSr.textContent = label;
    onPress = handler;
    bigButton.disabled = disabled;
    bigButton.classList.toggle("is-ready", ready);
  }
  function mount(...nodes) {
    screen.hidden = false;
    screen.replaceChildren(...nodes);
    screen.classList.remove("is-entering");
    void screen.offsetWidth;
    screen.classList.add("is-entering");
  }
  function shake(msg) {
    say(msg, "bad");
    cabinet.classList.remove("is-shaking");
    void cabinet.offsetWidth;
    cabinet.classList.add("is-shaking");
    if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
  }
  const misses = ["Casi… otra vez", "Nop", "Esa no es", "Pedí una pista"];
  let missCount = 0;
  const miss = () => shake(misses[missCount++ % misses.length]);

  function refreshCabinet() {
    coins.forEach((c, i) => c.classList.toggle("is-spent", i < state.solved));
    capsules.forEach((c, i) => {
      c.classList.toggle("is-won", i < state.solved);
      c.classList.toggle("is-active", i === state.solved && state.phase === "riddle");
    });
  }

  function hintBlock(list) {
    const ul = el("ul", { class: "hints" });
    const btn = el("button", { class: "link-button", type: "button", text: "Pedir una pista" });
    const show = () => {
      if (state.hintsShown >= list.length) return;
      const n = state.hintsShown++;
      ul.append(el("li", { "data-n": String(n + 1), text: list[n] }));
      btn.disabled = state.hintsShown >= list.length;
      btn.textContent = btn.disabled ? "No quedan pistas" : "Otra pista";
    };
    btn.addEventListener("click", show);
    return { ul, btn, show };
  }

  // ─── Pantallas ───
  function renderIntro() {
    state.phase = "intro";
    refreshCabinet();
    screen.replaceChildren();
    screen.hidden = true;
    say(["Hola, Lucía", "Apretá Start"]);
    setButton("Start", () => startRiddle(0), { ready: true });
  }

  function startRiddle(i) {
    state.phase = "riddle";
    state.hintsShown = 0;
    missCount = 0;
    refreshCabinet();
    say(`Ficha ${i + 1} de 4`);
    const r = RIDDLES[i];
    const view = { complete: viewComplete, acrostic: viewAcrostic, tiles: viewTiles, search: viewSearch }[r.kind](r, i);
    mount(...view.nodes);
    setButton("Probar", () => {
      const v = view.value();
      if (v === null) return shake("Te faltan letras");
      if (view.check(v)) win(i);
      else miss();
    }, { ready: false });
    view.focus && setTimeout(view.focus, reduceMotion ? 0 : 350);
  }

  function head(i, r) {
    return [el("h2", { class: "screen__title", text: r.title })];
  }

  // 1 · completar la palabra
  function viewComplete(r, i) {
    const inputs = [];
    const word = el("div", { class: "word", role: "group", "aria-label": "Palabra a completar" });
    [...r.word].forEach((ch, k) => {
      if (r.given.includes(k)) {
        word.append(el("span", { class: "box box--given", "aria-label": `Letra ${k + 1}: ${ch}`, text: ch }));
      } else {
        const inp = el("input", {
          class: "box", maxlength: "1", inputmode: "text", autocomplete: "off",
          autocapitalize: "characters", spellcheck: "false", "aria-label": `Letra ${k + 1}`,
        });
        inputs.push(inp);
        word.append(inp);
      }
    });
    wireBoxes(inputs);
    const hb = hintBlock(r.hints);
    hb.show();
    return {
      nodes: [...head(i, r),
        el("p", { class: "screen__soft", text: "Cada acertijo resuelto es una ficha, y con cada ficha la garra baja a buscar un premio. Empiezan fáciles y se ponen difíciles." }),
        el("p", { class: "screen__lead", text: r.intro }), word, hb.ul, hb.btn],
      value: () => (inputs.every((x) => x.value.trim()) ? [...r.word].map((ch, k) => (r.given.includes(k) ? ch : null)) : null),
      check: () => {
        let n = 0;
        return [...r.word].every((ch, k) => r.given.includes(k) || norm(inputs[n++].value) === ch);
      },
      focus: () => inputs[0].focus({ preventScroll: true }),
    };
  }

  // 2 · una pista por letra
  function viewAcrostic(r, i) {
    const inputs = [];
    const list = el("ol", { class: "acrostic" });
    const spelled = el("p", { class: "acrostic__word", "aria-live": "polite" });
    r.clues.forEach((c, k) => {
      const inp = el("input", {
        class: "box", maxlength: "1", autocomplete: "off", autocapitalize: "characters",
        spellcheck: "false", "aria-label": `Primera letra de la pista ${k + 1}`,
      });
      inputs.push(inp);
      list.append(el("li", {}, el("span", { class: "acrostic__clue", text: c }), inp));
    });
    const update = () => {
      const s = inputs.map((x) => (x.value ? norm(x.value) || "·" : "·")).join(" ");
      spelled.textContent = inputs.some((x) => x.value) ? s : "";
    };
    wireBoxes(inputs, update);
    const hb = hintBlock(r.hints);
    return {
      nodes: [...head(i, r), el("p", { class: "screen__lead", text: r.intro }), list, spelled, hb.ul, hb.btn],
      value: () => (inputs.every((x) => x.value.trim()) ? inputs.map((x) => norm(x.value)).join("") : null),
      check: (v) => v === r.word,
      focus: () => inputs[0].focus({ preventScroll: true }),
    };
  }

  // 3 · ordenar letras
  function viewTiles(r, i) {
    const letters = shuffle([...r.words.join(""), ...r.decoys]);
    const slots = [];
    const word = el("div", { class: "word word--stack", role: "group", "aria-label": "Tu respuesta" });
    r.words.forEach((w) => {
      const row = el("div", { class: "word__row" });
      word.append(row);
      [...w].forEach(() => {
        const s = el("button", { class: "box box--slot", type: "button", "aria-label": "Casillero vacío" });
        s.addEventListener("click", () => {
          if (!s.dataset.tile) return;
          tiles[s.dataset.tile].classList.remove("is-used");
          delete s.dataset.tile;
          s.textContent = "";
          s.setAttribute("aria-label", "Casillero vacío");
        });
        slots.push(s);
        row.append(s);
      });
    });
    const tileWrap = el("div", { class: "tiles", role: "group", "aria-label": "Letras disponibles" });
    const tiles = letters.map((ch, k) => {
      const t = el("button", { class: "tile", type: "button", text: ch, "aria-label": `Letra ${ch}` });
      t.addEventListener("click", () => {
        const free = slots.find((s) => !s.dataset.tile);
        if (!free) return say("Sacá una letra");
        free.dataset.tile = String(k);
        free.textContent = ch;
        free.setAttribute("aria-label", `Letra ${ch}`);
        t.classList.add("is-used");
      });
      tileWrap.append(t);
      return t;
    });
    const verse = el("div", { class: "verse" }, r.verse.map((l) => el("p", { text: l })));
    const hb = hintBlock(r.hints);
    return {
      nodes: [...head(i, r), verse, word, tileWrap,
        el("p", { class: "screen__soft", text: "Tocá las letras para ponerlas. Sobran dos." }), hb.ul, hb.btn],
      value: () => (slots.every((s) => s.dataset.tile) ? slots.map((s) => s.textContent).join("") : null),
      check: (v) => v === r.words.join(""),
    };
  }

  // 4 · sopa de letras
  function viewSearch(r, i) {
    const picked = [];
    const word = el("p", { class: "soup__word", "aria-live": "polite" });
    const update = () => {
      word.textContent = picked.length ? picked.map((c) => c.textContent).join("") : "Tocá las letras…";
      word.classList.toggle("is-empty", !picked.length);
      bigButton.classList.toggle("is-ready", picked.length === r.answer.length);
    };
    const grid = el("div", { class: "soup", role: "group", "aria-label": "Sopa de letras" });
    r.grid.forEach((row, ri) => {
      [...row].forEach((ch, ci) => {
        const cell = el("button", { class: "soup__cell", type: "button", text: ch, "aria-pressed": "false", "aria-label": `${ch}, fila ${ri + 1}, columna ${ci + 1}` });
        cell.addEventListener("click", () => {
          const at = picked.indexOf(cell);
          if (at >= 0) picked.splice(at, 1);
          else picked.push(cell);
          cell.classList.toggle("is-picked", at < 0);
          cell.setAttribute("aria-pressed", String(at < 0));
          update();
        });
        grid.append(cell);
      });
    });
    const clear = el("button", { class: "link-button", type: "button", text: "Borrar todo" });
    clear.addEventListener("click", () => {
      picked.splice(0).forEach((c) => { c.classList.remove("is-picked"); c.setAttribute("aria-pressed", "false"); });
      update();
    });
    update();
    const hb = hintBlock(r.hints);
    return {
      nodes: [...head(i, r), el("p", { class: "screen__lead", text: r.intro }), grid,
        el("div", { class: "soup__bar" }, word, clear), hb.ul, hb.btn],
      value: () => (picked.length ? picked.map((c) => c.textContent).join("") : null),
      check: (v) => v === r.answer,
    };
  }

  function wireBoxes(inputs, onChange) {
    inputs.forEach((inp, n) => {
      inp.addEventListener("input", () => {
        const v = norm(inp.value).slice(-1);
        inp.value = v;
        onChange && onChange();
        if (v && inputs[n + 1]) inputs[n + 1].focus();
        if (inputs.every((x) => x.value)) bigButton.classList.add("is-ready");
        else bigButton.classList.remove("is-ready");
      });
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !inp.value && inputs[n - 1]) { inputs[n - 1].focus(); inputs[n - 1].value = ""; onChange && onChange(); }
        if (e.key === "Enter") bigButton.click();
      });
      inp.addEventListener("focus", () => inp.select());
    });
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  // ─── La garra ───
  const clawX = () => parseFloat(getComputedStyle(claw).getPropertyValue("--claw-x")) || 120;
  async function moveClaw(to) {
    const from = clawX();
    const dur = reduceMotion ? 1 : 300 + Math.abs(to - from) * 3.2;
    await claw.animate([{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }],
      { duration: dur, easing: "cubic-bezier(.45,.05,.35,1)", fill: "forwards" }).finished;
    claw.style.setProperty("--claw-x", `${to}px`);
  }
  async function cable(to, ms) {
    const from = clawCable.getBoundingClientRect().height;
    await clawCable.animate([{ height: `${from}px` }, { height: `${to}px` }],
      { duration: reduceMotion ? 1 : ms, easing: "cubic-bezier(.3,0,.2,1)", fill: "forwards" }).finished;
    clawCable.style.height = `${to}px`;
  }

  async function win(i) {
    if (busy) return;
    busy = true;
    state.phase = "claw";
    setButton("…", null, { disabled: true });
    say("¡Ficha aceptada!", "good");
    if (navigator.vibrate) navigator.vibrate(30);
    coins[i].classList.add("is-spent");
    glass.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    await wait(500);

    const cap = capsules[i];
    cap.classList.remove("is-active");
    const g = glass.getBoundingClientRect();
    const c = cap.getBoundingClientRect();
    const targetX = c.left - g.left + c.width / 2 - 40;
    say("Apuntando…");
    await moveClaw(targetX);
    claw.classList.add("is-open");
    await wait(250);
    const headTop = claw.getBoundingClientRect().top + 18 + clawCable.getBoundingClientRect().height;
    const drop = Math.max(26, clawCable.getBoundingClientRect().height + (c.top - headTop) - 26);
    say("Bajando…");
    await cable(drop, 1100);
    claw.classList.remove("is-open");
    claw.classList.add("is-gripping");
    await wait(350);

    // la cápsula pasa a la garra
    const ghost = cap.cloneNode(true);
    ghost.classList.remove("is-active", "is-won");
    clawGrip.append(ghost);
    cap.classList.add("is-won");
    say("¡La agarró!", "good");
    await wait(200);
    await cable(26, 1000);

    const ch = chute.getBoundingClientRect();
    await moveClaw(ch.left - g.left + ch.width / 2 - 40);
    await wait(200);
    claw.classList.remove("is-gripping");
    claw.classList.add("is-open");
    chute.classList.add("is-lit");
    await ghost.animate([{ transform: "translateY(0)", opacity: 1 }, { transform: `translateY(${g.height}px)`, opacity: 0.2 }],
      { duration: reduceMotion ? 1 : 650, easing: "cubic-bezier(.5,0,.9,.5)", fill: "forwards" }).finished;
    ghost.remove();
    claw.classList.remove("is-open");
    chute.classList.remove("is-lit");

    // sale por la puerta
    const prize = cap.cloneNode(true);
    prize.classList.remove("is-active", "is-won");
    doorPrize.replaceChildren(prize);
    door.classList.add("is-lit");
    door.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    await wait(700);
    moveClaw(120);

    state.solved = Math.max(state.solved, i + 1);
    save();
    busy = false;
    showPrize(i);
  }

  function showPrize(i) {
    state.phase = "prize";
    refreshCabinet();
    const r = RIDDLES[i];
    const last = i === RIDDLES.length - 1;
    say(last ? "¡Ganaste todo!" : `Premio ${i + 1} de 4`, "good");
    mount(
      el("div", { class: "ticket" },
        el("p", { class: "ticket__prize", text: `Regalo ${i + 1}` }),
        el("hr", { class: "ticket__rule" }),
        el("p", { class: "ticket__note", text: `Mostrale este ticket a ${GIVER} para canjearlo.` })
      ),
      el("p", { class: "screen__soft", text: last ? "Queda una cosa más en la máquina." : "Cuando lo tengas en la mano, seguimos." })
    );
    setButton(last ? "Final" : "Siguiente", () => {
      door.classList.remove("is-lit");
      doorPrize.replaceChildren();
      if (last) finale();
      else startRiddle(i + 1);
    }, { ready: true });
    screen.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function finale() {
    state.phase = "done";
    refreshCabinet();
    cabinet.classList.add("is-party");
    say("Imprimiendo…", "good");
    mount(
      el("h2", { class: "screen__title", text: "El último no entraba en una cápsula" }),
      el("p", { class: "screen__lead", text: "Bajá." })
    );
    setButton("Ver", () => finalSection.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }), { ready: true });
    finalSection.hidden = false;
    finalSection.classList.add("is-printing");
    setTimeout(() => finalSection.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }), reduceMotion ? 0 : 900);
  }

  // ─── Arranque ───
  bigButton.addEventListener("click", () => {
    if (busy || bigButton.disabled || !onPress) return;
    bigButton.classList.add("is-pressed");
    setTimeout(() => bigButton.classList.remove("is-pressed"), 120);
    onPress();
  });
  $("#replay").addEventListener("click", () => {
    state.solved = 0;
    save();
    finalSection.hidden = true;
    cabinet.classList.remove("is-party");
    window.scrollTo({ top: 0, behavior: "auto" });
    renderIntro();
  });

  load();
  if (state.solved >= 4) {
    renderIntro();
    state.phase = "done";
    refreshCabinet();
    finale();
  } else if (state.solved > 0) {
    renderIntro();
    say(`Ficha ${state.solved + 1} de 4`);
    setButton("Seguir", () => startRiddle(state.solved), { ready: true });
  } else {
    renderIntro();
  }
})();
