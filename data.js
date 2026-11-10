/*
  ────────────────────────────────────────────────────────────
  EDIT THIS FILE TO UPDATE YOUR PORTFOLIO.
  You never need to touch index.html, style.css, or script.js
  for content changes.

  EVERY PROJECT USES THE SAME LAYOUT
  The sidebar holds all of a project's text, always in this order:
    - "scale"       the big number (01, 02, 03)
    - "title"       the project name
    - "year", "role", "dimensions"   the small info lines
    - "summary"     one or two sentences: what it is
    - "challenge", "process", "outcome"   three short blocks,
                    shown as Challenge / Approach / Outcome.
                    "outcomeLabel" renames the last one (e.g.
                    "Status" for work that's still in progress).
    - "detail"      (optional) one small extra block at the bottom,
                    styled the same wherever it's used. Either a list
                    {label, items: [...]}, a list that switches from
                    name to name by itself {label, switch: true,
                    items: [...]}, or an image with a note
                    {label, image, text}. Leave it out
                    when there's nothing worth adding.
  Keep each block to a sentence or two. Reviewers skim.

  The main column holds the imagery: every image at the full width of
  the column, one under another, never cropped. A project shows
  whichever of these it has, in this order:
    - "model3d"   a 3D model that turns on its own, with its stand
                  fading away and coming back on a timer. Visitors can
                  drag it around to see every side.
                  Needs arsvita-3d.js next to script.js, plus
                  {src: the model file, poster: a still shown while
                  it loads}. Used by Arsvita.
    - "images"    photos, each at its own shape. Used by Dozer.
    - "spreads"   the publication's spreads, in order, under a small
                  heading ("spreadsLabel", e.g. "Inside the book").
                  A single page, like a front or back cover, sits
                  centred at the same height as the spreads; put
                  "cover" in its file name (cover.webp, back-cover.webp)
                  and screen readers call it the front or back cover.
                  "aspect" is the width ÷ height of one spread: the
                  space for each spread is held at that shape while it
                  loads, so the page never jumps.
                  "smallCopies" (optional): true when every spread also
                  has a half-size copy, with the same name, in a folder
                  called "small" next to it. Phones, smaller screens and
                  the opening strip use those, so the page loads faster
                  and uses less data. Used by Dozer.
                  "slider" (optional): true shows the spreads one at a
                  time instead of one under another, each as big as fits
                  the screen, with a slider bar under it that runs
                  through every spread: drag along it to go through
                  them. The arrows under it (or clicking the right or
                  left half of the spread, or swiping it) go one spread
                  at a time. Good for a long publication. Used by Dozer.
                  "flatplan" (optional, with slider): one image of every
                  spread side by side, in order, used as the slider bar,
                  so you can see the whole issue along it. Each spread
                  (or cover) takes an equal share of its width.
    - "birds"     runs of spreads, each under its bird's name:
                  {name, status, spreads}. A bird with status
                  "in-progress" is greyed out and labelled "Work in
                  progress". Used by The Pecking Order.
    - "processImages" (optional) sketches, drafts, files, shown last
                  under a "Process" heading.
  Export images and spreads (JPEG or WebP) at least 3000px wide so
  they stay sharp on high-resolution screens.
  On phones each project shows its number, name and info, then its
  first image (or the 3D model), then its text, then the rest.

  GETTING AROUND
  The bar along the top of the screen names the section you're in.
  Click your name to go back to the top, or the section's name for a
  list of every project, About and Contact. Once you scroll down, the
  bar along the bottom of the screen goes to the previous or next
  section, or back to the top. They update themselves from this file.

  THE INTRO
  Before anything else, your logo animation plays on neon orange with
  the line in "welcome" under it. When the pieces snap together the
  orange turns into the page colour, then it fades into the site and
  your name types itself out. The animation files live in images/intro/
  (more in intro.js). Change the orange with --intro in style.css.

  THE OPENING STRIP
  Right after your name types itself out, work from every project
  slides past in order: 01's, then 02's, then 03's (work in progress
  is left out). Each project shows all of its photos and spreads, up
  to 24; one with more (Dozer) shows 24 of them, picked evenly from
  start to finish. Each image keeps its own shape, captioned with its
  project and linked to it. Nothing to edit here: it updates itself
  when you add or remove images above. To show a hand-picked set
  instead, add a "reel" list of {src, project} (project = that
  project's "id") next to "projects".
  To stay sharp, an image is never shown bigger than its file allows
  on the screen it's on, so small files show a little smaller. Spreads
  exported 3000px wide or more always show at full size.

  Top-level "status" is a one-line availability note shown with
  your contact info. Edit it any time.
  ────────────────────────────────────────────────────────────
*/

const PORTFOLIO_DATA = {
  name: "Morgan Chochinov",
  role: "Graphic & Editorial Designer",
  tagline: "Bringing experimental design into a world of corporate minimalism.",
  welcome: "Welcome to my site",          // the line under your logo in the intro
  location: "Toronto, Canada",
  email: "morgan.chochinov@gmail.com",
  status: "Currently open to full-time and freelance editorial & graphic design roles.",
  social: [
    { label: "Behance", url: "https://www.behance.net/chochdesign" },
    { label: "Instagram", url: "https://www.instagram.com/mchochdesign/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/morganchochinov/" }
  ],

  bio: "I'm a designer who wants to change the way the world sees design. I find inspiration in other art forms, like music, film, fashion and architecture. That's where my most original ideas come from.",

  projects: [
    {
      id: "01",
      scale: "01",
      title: "Arsvita Magazine",
      year: "2026",
      role: "Editorial design, self-published",
      dimensions: "46 pages \u00b7 hand-bound, laser-cut acrylic case \u00b7 one-of-one edition",

      summary: "Volume 01: Maya Civilization. A one-of-one magazine, hand-bound and housed in a laser-cut acrylic case, designed and built entirely in-house.",
      challenge: "Make dense academic writing on Maya art and archaeology exciting to read without turning it into a listicle, and build the object with no templates to follow.",
      process: "The issue reads like a museum tour, opening with the manifesto \u201cArs Longa, Vita Brevis\u201d (art is long, life is short). Each chapter centres on one class of object. Serif essay columns are broken up by oversized type, and a spec-sheet catalogue lists every artifact like an auction lot. The acrylic case is a vitrine you hold in your hands.",
      outcome: "A finished one-of-one edition and a production process built from scratch: acrylic cut to tolerance and solvent-bonded into a case, custom InDesign layouts, and pages hand-glued into a binding never meant for paper.",

      model3d: {
        src: "models/arsvita-3d-model.js",
        poster: "images/arsvita/3d-poster.webp"
      },
      spreadsLabel: "Inside the book",
      aspect: 1.412,
      smallCopies: true,
      spreads: [
        "images/arsvita/spread-01.webp","images/arsvita/spread-02.webp","images/arsvita/spread-03.webp",
        "images/arsvita/spread-04.webp","images/arsvita/spread-05.webp","images/arsvita/spread-06.webp",
        "images/arsvita/spread-07.webp","images/arsvita/spread-08.webp","images/arsvita/spread-09.webp",
        "images/arsvita/spread-10.webp","images/arsvita/spread-11.webp","images/arsvita/spread-12.webp",
        "images/arsvita/spread-13.webp","images/arsvita/spread-14.webp","images/arsvita/spread-15.webp",
        "images/arsvita/spread-16.webp","images/arsvita/spread-17.webp","images/arsvita/spread-18.webp",
        "images/arsvita/spread-19.webp","images/arsvita/spread-20.webp","images/arsvita/spread-21.webp",
        "images/arsvita/spread-22.webp","images/arsvita/spread-23.webp"
      ],
      processImages: []
    },
    {
      id: "02",
      scale: "02",
      title: "Dozer Magazine",
      year: "2025\u20132026",
      role: "Editorial design, art direction",
      dimensions: "Issue 01: 84 pages (2025) \u00b7 Issue 02: 164 pages (2026)",

      summary: "A prep-fashion magazine that opened a traditionally exclusive style up to everyone. Launched in New York with a party hosted by Paul Stuart.",
      challenge: "Prep culture has long been predominantly white and exclusive. We wanted to widen it without disrespecting its traditions, while meeting commercial print standards for a 1,000+ copy run.",
      process: "We cast models from many ethnicities, cultures and backgrounds, and made our friend Pete, \u201cPreppy Pete,\u201d the new face of prep.",
      outcome: "Issue 01 sold over 1,000 copies on release and was stocked at Casa Magazines and Rare Magazines. A limited J.Crew run sold out in under 10 minutes. Issue 02 nearly doubled in length, with press in The New York Times and The Wall Street Journal.",

      detail: {
        label: "As seen with",
        switch: true,
        items: ["The New York Times", "The Wall Street Journal", "Paul Stuart", "J.Crew", "L.L. Bean", "G.H. Bass", "Sperry", "Mount Gay Rum", "Dirty Water Seltzers"]
      },

      images: [
        "images/dozer-01-main.jpg",
        "images/dozer-02.jpg",
        "images/dozer-03.jpg",
        "images/dozer-04.jpg",
        "images/dozer-05.jpg",
        "images/dozer-06.jpg",
        "images/dozer-07.jpg"
      ],
      spreadsLabel: "Issue 02, cover to cover",
      aspect: 1.294,
      smallCopies: true,
      slider: true,                             // one spread at a time, with a slider bar (see the notes at the top)
      flatplan: "images/dozer/flatplan.webp",   // the whole issue as a strip: the slider bar
      spreads: [
        "images/dozer/cover.webp","images/dozer/spread-01.webp","images/dozer/spread-02.webp",
        "images/dozer/spread-03.webp","images/dozer/spread-04.webp","images/dozer/spread-05.webp",
        "images/dozer/spread-06.webp","images/dozer/spread-07.webp","images/dozer/spread-08.webp",
        "images/dozer/spread-09.webp","images/dozer/spread-10.webp","images/dozer/spread-11.webp",
        "images/dozer/spread-12.webp","images/dozer/spread-13.webp","images/dozer/spread-14.webp",
        "images/dozer/spread-15.webp","images/dozer/spread-16.webp","images/dozer/spread-17.webp",
        "images/dozer/spread-18.webp","images/dozer/spread-19.webp","images/dozer/spread-20.webp",
        "images/dozer/spread-21.webp","images/dozer/spread-22.webp","images/dozer/spread-23.webp",
        "images/dozer/spread-24.webp","images/dozer/spread-25.webp","images/dozer/spread-26.webp",
        "images/dozer/spread-27.webp","images/dozer/spread-28.webp","images/dozer/spread-29.webp",
        "images/dozer/spread-30.webp","images/dozer/spread-31.webp","images/dozer/spread-32.webp",
        "images/dozer/spread-33.webp","images/dozer/spread-34.webp","images/dozer/spread-35.webp",
        "images/dozer/spread-36.webp","images/dozer/spread-37.webp","images/dozer/spread-38.webp",
        "images/dozer/spread-39.webp","images/dozer/spread-40.webp","images/dozer/spread-41.webp",
        "images/dozer/spread-42.webp","images/dozer/spread-43.webp","images/dozer/spread-44.webp",
        "images/dozer/spread-45.webp","images/dozer/spread-46.webp","images/dozer/spread-47.webp",
        "images/dozer/spread-48.webp","images/dozer/spread-49.webp","images/dozer/spread-50.webp",
        "images/dozer/spread-51.webp","images/dozer/spread-52.webp","images/dozer/spread-53.webp",
        "images/dozer/spread-54.webp","images/dozer/spread-55.webp","images/dozer/spread-56.webp",
        "images/dozer/spread-57.webp","images/dozer/spread-58.webp","images/dozer/spread-59.webp",
        "images/dozer/spread-60.webp","images/dozer/spread-61.webp","images/dozer/spread-62.webp",
        "images/dozer/spread-63.webp","images/dozer/spread-64.webp","images/dozer/spread-65.webp",
        "images/dozer/spread-66.webp","images/dozer/spread-67.webp","images/dozer/spread-68.webp",
        "images/dozer/spread-69.webp","images/dozer/spread-70.webp","images/dozer/spread-71.webp",
        "images/dozer/spread-72.webp","images/dozer/spread-73.webp","images/dozer/spread-74.webp",
        "images/dozer/spread-75.webp","images/dozer/spread-76.webp","images/dozer/spread-77.webp",
        "images/dozer/spread-78.webp","images/dozer/spread-79.webp","images/dozer/spread-80.webp",
        "images/dozer/spread-81.webp","images/dozer/back-cover.webp"
      ],
      processImages: []
    },
    {
      id: "03",
      scale: "03",
      title: "The Pecking Order Magazine",
      year: "2026\u2013present",
      role: "Branding, editorial design",
      dimensions: "Issue One: The Unrefined \u00b7 5 bird profiles \u00b7 in progress",

      summary: "Issue One: The Unrefined. An identity and editorial system for a magazine that spreads awareness of overlooked birds and the environmental pressures they face.",
      challenge: "Combine field-guide data (height, wingspan, range, IUCN status) with long-form essays on ecology and extinction, without it feeling like two publications stapled together.",
      process: "Each bird gets a spec sheet set against a single saturated yellow, and photos from many sources are unified by a high-contrast black-and-white duotone. Essays break the field-guide rhythm with oversized italic pull-quotes, arguing what the data can\u2019t: \u201cleast concern\u201d isn\u2019t the same as \u201cbeautiful.\u201d",
      outcomeLabel: "Status",
      outcome: "In progress. Three of the five bird profiles are finished, and the Hoatzin is underway.",

      detail: {
        label: "Logo",
        image: "images/logo-full.png",
        text: "The rough, hand-cut edges soften the way into a dense subject, so the magazine feels like something to pick up rather than brace for."
      },

      aspect: 1.333,
      smallCopies: true,
      birds: [
        {
          name: "Marabou Stork",
          status: "complete",
          spreads: [
            "images/pecking-order/marabou-01.webp","images/pecking-order/marabou-02.webp",
            "images/pecking-order/marabou-03.webp","images/pecking-order/marabou-04.webp",
            "images/pecking-order/marabou-05.webp","images/pecking-order/marabou-06.webp"
          ]
        },
        {
          name: "Shoebill",
          status: "complete",
          spreads: [
            "images/pecking-order/shoebill-01.webp","images/pecking-order/shoebill-02.webp",
            "images/pecking-order/shoebill-03.webp","images/pecking-order/shoebill-04.webp",
            "images/pecking-order/shoebill-05.webp","images/pecking-order/shoebill-06.webp"
          ]
        },
        {
          name: "King Vulture",
          status: "complete",
          spreads: [
            "images/pecking-order/kingvulture-01.webp","images/pecking-order/kingvulture-02.webp",
            "images/pecking-order/kingvulture-03.webp","images/pecking-order/kingvulture-04.webp",
            "images/pecking-order/kingvulture-05.webp"
          ]
        },
        {
          name: "Hoatzin",
          status: "in-progress",
          spreads: [
            "images/pecking-order/hoatzin-01.webp"
          ]
        }
      ],
      images: [],
      processImages: []
    }
  ]
};
