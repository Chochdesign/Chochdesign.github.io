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

  The main column holds the imagery, using whichever of these the
  project has:
    - "model3d"   a 3D model that turns on its own, with its stand
                  fading away and coming back on a timer. Visitors can
                  drag it around to see every side.
                  Needs arsvita-3d.js next to script.js, plus
                  {src: the model file, poster: a still shown while
                  it loads}. Used by Arsvita.
    - "spreads"   the book's spreads, one at a time, sliding from one
                  to the next, with Previous / Next buttons. If the
                  project also has a 3D model, the spreads sit
                  directly under it. Used by Arsvita.
    - "birds"     one run of spreads through several sections in a
                  row: {name, status, spreads}. A
                  section with status "in-progress" is greyed out
                  and labelled "Work in progress". Used by The
                  Pecking Order.
    - "images"    the first image is shown large, the rest in rows
                  below it. Rows fill the full width and every image
                  keeps its own shape, so nothing is ever cropped.
                  Export images at least 2400px wide so they stay
                  sharp at these sizes on high-resolution screens.
    - "processImages" (optional) sketches, drafts, files, shown
                  under the main imagery.
  "flipLabel" (optional) is the heading above the spreads, e.g.
  "Inside the book". "aspect" (optional) is the width ÷ height of
  one spread, so the frame matches your pages exactly.

  THE OPENING STRIP
  Right after your name types itself out, every photo from every
  project slides past in order: all of 01's, then 02's, then 03's
  (work in progress is left out). Each image keeps its own shape,
  captioned with its project and linked to it. Nothing to edit here:
  it updates itself when you add or remove images above. To show a
  hand-picked set instead, add a "reel" list of {src, project}
  (project = that project's "id") next to "projects".

  Top-level "status" is a one-line availability note shown with
  your contact info. Edit it any time.
  ────────────────────────────────────────────────────────────
*/

const PORTFOLIO_DATA = {
  name: "Morgan Chochinov",
  role: "Graphic & Editorial Designer",
  tagline: "Bringing experimental design into a world of corporate minimalism.",
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
      processImages: []
    },
    {
      id: "02",
      scale: "02",
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
      flipLabel: "Inside the book",
      aspect: 1.412,
      spreads: [
        "images/arsvita/spread-01.jpg","images/arsvita/spread-02.jpg","images/arsvita/spread-03.jpg",
        "images/arsvita/spread-04.jpg","images/arsvita/spread-05.jpg","images/arsvita/spread-06.jpg",
        "images/arsvita/spread-07.jpg","images/arsvita/spread-08.jpg","images/arsvita/spread-09.jpg",
        "images/arsvita/spread-10.jpg","images/arsvita/spread-11.jpg","images/arsvita/spread-12.jpg",
        "images/arsvita/spread-13.jpg","images/arsvita/spread-14.jpg","images/arsvita/spread-15.jpg",
        "images/arsvita/spread-16.jpg","images/arsvita/spread-17.jpg","images/arsvita/spread-18.jpg",
        "images/arsvita/spread-19.jpg","images/arsvita/spread-20.jpg","images/arsvita/spread-21.jpg",
        "images/arsvita/spread-22.jpg","images/arsvita/spread-23.jpg"
      ],
      images: ["images/arsvita/spread-01.jpg"],
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

      flipLabel: "Inside the magazine",
      aspect: 1.333,
      birds: [
        {
          name: "Marabou Stork",
          status: "complete",
          spreads: [
            "images/pecking-order/marabou-01.jpg","images/pecking-order/marabou-02.jpg",
            "images/pecking-order/marabou-03.jpg","images/pecking-order/marabou-04.jpg",
            "images/pecking-order/marabou-05.jpg","images/pecking-order/marabou-06.jpg"
          ]
        },
        {
          name: "Shoebill",
          status: "complete",
          spreads: [
            "images/pecking-order/shoebill-01.jpg","images/pecking-order/shoebill-02.jpg",
            "images/pecking-order/shoebill-03.jpg","images/pecking-order/shoebill-04.jpg",
            "images/pecking-order/shoebill-05.jpg","images/pecking-order/shoebill-06.jpg"
          ]
        },
        {
          name: "King Vulture",
          status: "complete",
          spreads: [
            "images/pecking-order/kingvulture-01.jpg","images/pecking-order/kingvulture-02.jpg",
            "images/pecking-order/kingvulture-03.jpg","images/pecking-order/kingvulture-04.jpg",
            "images/pecking-order/kingvulture-05.jpg"
          ]
        },
        {
          name: "Hoatzin",
          status: "in-progress",
          spreads: [
            "images/pecking-order/hoatzin-01.jpg"
          ]
        }
      ],
      images: [],
      processImages: []
    }
  ]
};
