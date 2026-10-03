---
name: Para Lucía
description: A one-player claw machine cabinet where each solved riddle wins a gift capsule.
colors:
  red: "#c8102e"
  red-deep: "#7d0a1c"
  red-hi: "#ee3a54"
  on-red: "#fff1e6"
  on-red-soft: "#ffd2c9"
  night: "#160828"
  night-2: "#261143"
  night-3: "#3a1a63"
  neon: "#ff4fa0"
  neon-soft: "#ff9cc9"
  gold: "#ffc93c"
  gold-deep: "#c98a00"
  chrome: "#dfe3ec"
  chrome-dark: "#8a90a0"
  screen: "#0e0618"
  screen-well: "#1a0d2a"
  screen-ink: "#f8eefe"
  screen-soft: "#cdb6e6"
  screen-line: "#3b2457"
  led: "#ffb341"
  led-error: "#ff5a6e"
  led-success: "#7dffb0"
  ticket-paper: "#fff5df"
  ticket-ink: "#2a0a12"
  cap-red: "#ff3b4e"
  cap-yellow: "#ffd23f"
  cap-blue: "#2f7bff"
  cap-charcoal: "#3a3a46"
typography:
  display:
    fontFamily: "Bungee, Rubik, sans-serif"
    fontSize: "clamp(2.8rem, 15vw, 4.2rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.01em"
  display-final:
    fontFamily: "Bungee, sans-serif"
    fontSize: "clamp(3.4rem, 19vw, 5.2rem)"
    fontWeight: 400
    lineHeight: 0.9
  headline:
    fontFamily: "Bungee, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1.05
  title:
    fontFamily: "Bungee, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.5
  body-large:
    fontFamily: "Rubik, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 6.6vw, 1.9rem)"
    fontWeight: 500
    lineHeight: 1.25
  label-led:
    fontFamily: "DotGothic16, monospace"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.08em"
  label-sign:
    fontFamily: "Bungee, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    letterSpacing: "0.04em"
rounded:
  paper: "4px"
  key: "8px"
  well: "10px"
  screen: "12px"
  deck: "20px"
  cabinet: "34px"
  round: "50%"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "14px"
  xl: "18px"
  xxl: "22px"
components:
  big-button:
    backgroundColor: "{colors.red}"
    textColor: "{colors.on-red}"
    rounded: "{rounded.round}"
    size: "104px"
  answer-input:
    backgroundColor: "{colors.screen-well}"
    textColor: "{colors.screen-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.well}"
    padding: "0 14px"
    height: "52px"
  letter-box:
    backgroundColor: "{colors.screen-well}"
    textColor: "{colors.screen-ink}"
    rounded: "{rounded.key}"
    width: "40px"
    height: "48px"
  letter-box-given:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.night}"
    rounded: "{rounded.key}"
  letter-tile:
    backgroundColor: "{colors.screen-ink}"
    textColor: "{colors.night}"
    rounded: "{rounded.key}"
    width: "42px"
    height: "46px"
  link-button:
    textColor: "{colors.neon-soft}"
    padding: "6px 0"
  screen-panel:
    backgroundColor: "{colors.screen}"
    textColor: "{colors.screen-ink}"
    rounded: "{rounded.screen}"
    padding: "20px 18px 22px"
  led-strip:
    backgroundColor: "#08030d"
    textColor: "{colors.led}"
    typography: "{typography.label-led}"
    rounded: "{rounded.key}"
    padding: "9px 12px"
  prize-ticket:
    backgroundColor: "{colors.ticket-paper}"
    textColor: "{colors.ticket-ink}"
    rounded: "6px"
    padding: "18px 18px 16px"
---

# Design System: Para Lucía

## Overview

**Creative North Star: "The Cabinet Built for One"**

The whole phone is a claw machine cabinet. Lacquered red owns the frame and the control deck; behind the glass is a night-violet arcade dark lit by a pink neon tube; gold bulbs chase around the marquee; chrome rails, a joystick and a domed red button complete the hardware. Every surface is a part of that one physical object, so nesting (cabinet > deck > screen) is construction, not card UI. Prizes are two-tone plastic capsules, the machine talks through a dot-matrix LED strip, and the payoff is paper: a printed prize ticket per gift and a photo-booth strip at the end.

Density is a single narrow column (max 470px) built for a phone in the hand. Light is part of the material: glow belongs to things that emit it (bulbs, neon, LED, the lit prize door, the ready button), never to plain text or panels. Motion is mechanical: the claw travels, drops, grips and lifts; wrong answers shake the cabinet; paper prints downward out of a slot.

The category default this world refuses is pink hearts, a cream card per riddle and a cursive love letter. Romance arrives through the user's real photos and the final line, not through decoration.

**Key Characteristics:**
- One physical object: cabinet red frame, violet glass interior, chrome hardware, gold lights.
- Three type voices: Bungee signage, Rubik body, DotGothic16 LED and printed labels.
- Emitted light only: glow sits on bulbs, neon, LED and lit hardware.
- Paper (warm ticket cream) is the reward material; it appears only when something is won.
- Real couple photos, styled only with CSS filter and a grain overlay.

## Colors

A saturated arcade palette in three material families: lacquer red, glass-interior night violet with pink neon, and gold/chrome hardware, plus warm ticket paper for rewards.

### Primary
- **Cabinet Lacquer Red** (`red`): the cabinet body gradient, ticket prize titles, strip date. Shaded with **Lacquer Shadow** (`red-deep`) at the bottom and on the deck, and **Lacquer Highlight** (`red-hi`) at the top edge.
- **Lacquer Cream** (`on-red`, `on-red-soft`): text and inset edge lines that sit directly on red (marquee date, START label).

### Secondary
- **Arcade Neon Pink** (`neon`): the light inside the glass; the neon tube, focused field borders, hint numerals, cipher text, final "Te amo.", selection and caret. **Soft Neon** (`neon-soft`) is the tube core, the chute sign and text links.

### Tertiary
- **Marquee Gold** (`gold`): bulbs, the marquee name, screen titles, given letters, the active capsule tag, spent coins, the lit prize door and the keyboard focus ring. **Gold Shadow** (`gold-deep`) is its extrusion and coin shading.
- **Chrome** (`chrome`, `chrome-dark`): the glass frame rings, rail, claw, door flap, joystick shaft and button bezel.
- **Capsule Plastics** (`cap-red`, `cap-yellow`, `cap-blue`, `cap-charcoal`): the four prize capsules, each a clear tinted dome over an opaque base of its color.

### Neutral
- **Glass Night** (`night`, `night-2`, `night-3`): page background and the stepped glass interior.
- **Screen Black** (`screen`): the deck screen; **Screen Well** (`screen-well`) is every recessed field on it (letter boxes, hint rows, acrostic rows, inputs, wheel buttons).
- **Screen Ink / Soft / Line** (`screen-ink`, `screen-soft`, `screen-line`): primary text, secondary text and labels, and box/field borders on the screen.
- **LED Amber** (`led`): the LED strip voice and the wheel key readout; it turns **LED Red** (`led-error`) on wrong answers and **LED Green** (`led-success`) on correct ones.
- **Ticket Paper / Ink** (`ticket-paper`, `ticket-ink`): prize ticket, capsule number tags and photo strip.

### Named Rules
**The Three Materials Rule.** Every color belongs to the cabinet (red), the glass (night + neon) or the hardware (gold + chrome). Paper is the only fourth material, and it appears only as a reward.

**The Emitted Light Rule.** Glow (`text-shadow`/`box-shadow` blur in neon, gold or LED amber) goes only on things that emit light in a real machine: bulbs, the neon tube, the LED strip, the cipher readout, the lit door, the ready button and the chute when it receives a prize.

## Typography

**Display Font:** Bungee (with Rubik, sans-serif)
**Body Font:** Rubik variable 300–900 (with system-ui, sans-serif)
**Label/Mono Font:** DotGothic16 (with monospace)

**Character:** Bungee is arcade signage, chunky and always uppercase by design; Rubik is a rounded, warm sans that keeps long riddle text readable; DotGothic16 is the machine's dot-matrix voice. All three are self-hosted woff2.

### Hierarchy
- **Display** (400, clamp(2.8rem, 15vw, 4.2rem), 0.95): the marquee name only, in gold with a two-step extrusion and bulb glow.
- **Display Final** (400, clamp(3.4rem, 19vw, 5.2rem), 0.9): the closing "Te amo." in neon over the hero photo.
- **Headline** (400, 1.6rem, 1.05): the gift name on a prize ticket, in lacquer red on paper.
- **Title** (400, 1.45rem, 1.1): screen titles in gold, balanced wrap.
- **Body** (400, 17px, 1.5): riddle text and instructions on the screen; verse blocks use 1.02rem at 1.6 with a 1px left rule. The final message line uses Rubik 500 at clamp(1.45rem, 6.6vw, 1.9rem), 1.25.
- **Label LED** (400, 1.05rem, 0.08em, uppercase): the LED strip, never wrapping; overflow scrolls horizontally.
- **Label Sign** (Bungee 400, 0.62–0.95rem): signage on hardware (START label, chute sign, capsule tags, hint numerals).

### Named Rules
**The Three Voices Rule.** Bungee is the machine's signage, Rubik is the person speaking, DotGothic16 is the machine talking or printing. Never set a sentence of riddle or message text in Bungee.

**The Single Line LED Rule.** The LED strip is always one line; long messages scroll inside the strip rather than wrap.

## Layout

A single centered column, `min(100%, 470px)`, full viewport height. On phones the cabinet bleeds edge to edge; from 500px wide it floats 28px from the top with 34px rounded shoulders against the night background. The vertical order is fixed: marquee, glass case (clamp(250px, 38svh, 430px)), belly row (prize door + LED and coin column), control deck (screen above joystick and button). Spacing steps between 6px and 22px; 8px and 12px are the common gaps inside the screen, 18px separates deck parts. Below 360px, letter boxes shrink to 34×42px. The final section keeps the same column: full-height hero photo with the message anchored to the bottom, then a slightly rotated (-1.2deg) photo strip.

## Elevation & Depth

Depth is physical, not UI elevation. Surfaces are built from stacked inset shadows (lacquer bevels, recessed wells, screen glass), concentric ring shadows (chrome frames around the glass and screen) and gradient shading. Drop shadows exist only under objects that sit on or stand off something: capsules, the claw trolley, the rail, the big button, the photo strip.

### Shadow Vocabulary
- **Cabinet bevel** (`box-shadow: inset 6px 0 0 rgba(255,255,255,0.12), inset -6px 0 0 rgba(0,0,0,0.18), 0 30px 80px rgba(0,0,0,0.6)`): the cabinet body only.
- **Chrome frame** (`box-shadow: 0 0 0 6px #8a90a0, 0 0 0 8px #dfe3ec, 0 0 0 11px #4a0612, inset 0 0 40px rgba(0,0,0,0.6)`): the glass case; the screen uses a two-ring version (`0 0 0 4px #2a0710, 0 0 0 6px #8a90a0`).
- **Recessed well** (`box-shadow: inset 0 0 0 3px #8a90a0, inset 0 8px 16px rgba(0,0,0,0.8)`): prize door, LED strip, coin sockets, joystick base.
- **Key travel** (`box-shadow: 0 8px 0 #6d0012` on the button cap, `0 4px 0 #9c8ab3` on letter tiles): the visible plastic side wall of a pressable key; it compresses to 1px on press.

### Named Rules
**The Machine Depth Rule.** Depth comes from bevels, wells and chrome rings that a real cabinet would have. Do not add floating card shadows to panels on the deck.

**The Key Travel Rule.** A solid, blur-free vertical offset is allowed only as the side wall of a key that physically presses down, and it must shrink on `:active`. It is never a decorative offset on a panel or card.

## Shapes

Soft-cornered hardware. Corners grow with the size of the part: keys and wells 8px, fields and glass 10px, screen 12px, deck 20px, cabinet shoulders 34px; paper is nearly square (4–6px). Round things are fully round: capsules, coins, joystick, the big button, wheel buttons. The prize ticket is die-cut with 9px semicircular notches on both sides (CSS mask), and its rule is a 2px dashed tear line.

## Components

### Big Arcade Button
Domed, chunky and the only primary action. A 104px chrome bezel holds an 80px red cap shaded from a pink specular highlight to deep red; the cap sits 6px up on an 8px side wall and drops on press (90ms). Ready state pulses a gold glow (1.8s); disabled desaturates the cap. Its Bungee label sits below in lacquer cream and changes with the step (Start, Siguiente).

### Screen Panel
The deck's black screen with 1px scanlines and a chrome ring. Content enters with a 520ms fade-up-and-unblur, staggered 60ms per child. Titles in gold Bungee, body in Rubik screen ink, secondary in screen soft.

### Inputs / Fields
- **Answer field:** 52px tall, screen-well fill, 2px screen-line border, 10px corners, text typed in uppercase Bungee; the placeholder falls back to Rubik sentence case. Focus swaps the border to neon.
- **Letter boxes:** 40×48px wells with 2px screen-line border and Bungee letters; focus is a neon border plus a 3px translucent neon ring. Given letters are gold boxes with night ink.
- **Letter tiles:** pressable white-to-lilac keys with night Bungee letters and key travel; used tiles fade to 0.18 opacity.

### Links
Text links are Rubik 600 in soft neon with a 1.5px underline offset 4px; hover goes white, disabled goes screen soft without underline.

### LED Strip
A near-black recessed strip in DotGothic16 amber with an amber glow, single line, center aligned; overflow scrolls left and right (3.2s alternate). Error and success swap the color and glow to LED red and LED green. Gold coins beside it fill one per solved riddle.

### Capsules
62px two-tone spheres: clear tinted dome over an opaque colored half, specular highlight, rim light and a paper number tag. The active capsule bobs (1.6s) and its tag turns gold.

### Prize Ticket
Warm paper with die-cut side notches that prints downward (900ms clip reveal). Gift name as a lacquer-red Bungee headline, a dashed tear line, then a Rubik note in ticket ink.

### Photo Strip
The closing photo-booth print: ticket paper, 14px margin, 3:4 and 4:3 frames, a DotGothic16 printed header and a Bungee date foot, rotated -1.2deg and printed out over 1.4s. Photos are the user's originals, treated only with `contrast(1.08) saturate(1.18) brightness(1.02)` and an overlay grain at 0.35 opacity.

## Do's and Don'ts

### Do:
- **Do** build every new surface as a part of the cabinet: red lacquer frame, chrome-ringed screen, night-violet glass.
- **Do** use Bungee for signage and titles, Rubik for anything a person reads as a sentence, DotGothic16 for the machine's voice.
- **Do** put glow only on emitting parts (bulbs, neon, LED, lit door, ready button).
- **Do** keep the gold focus ring (3px solid, 3px offset) on every button and input.
- **Do** keep motion mechanical with the `cubic-bezier(0.16, 1, 0.3, 1)` ease-out, and collapse it under `prefers-reduced-motion`.
- **Do** show the couple photos as real photos, styled with filter and grain only.

### Don't:
- **Don't** use pink hearts, a cream card per riddle or a cursive love-letter treatment.
- **Don't** add floating card shadows or decorative solid offsets to deck panels; solid offsets belong only to keys that press.
- **Don't** wrap the LED strip onto a second line.
- **Don't** introduce colors outside the cabinet, glass, hardware and paper families.
- **Don't** set riddle or message sentences in Bungee or DotGothic16.
- **Don't** replace or cover the real photos with generated imagery or heavy overlays.
