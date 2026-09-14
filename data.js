/*
  ────────────────────────────────────────────────────────────
  EDIT THIS FILE TO UPDATE YOUR PORTFOLIO.
  You never need to touch index.html, style.css, or script.js
  for content changes.

  - Each project has FOUR possible writeup fields: "credits" (the
    opening context line — press, sponsors, launch details),
    "challenge", "process" (Design & Art Direction), and the
    optional "outcome" (what actually happened — results, press,
    what it led to). Hiring managers consistently say this is the
    part most portfolios skip. Add it whenever you have a real
    result to point to; omit the field entirely to hide the block.
  - "images" is an array of paths. The first image is the hero
    image for the project; any additional images render in a
    gallery grid below the writeup. Leave the array empty ([])
    to show a placeholder tile instead.
  - "processImages" (optional) is a second, separate gallery for
    sketches, InDesign screenshots, early drafts, laser-cutter
    files, contact sheets — anything that shows your thinking
    before the final piece. This is the single most-requested
    addition in design-hiring research: reviewers want evidence
    of process, not just polished output. Leave empty until you
    have material to add.
  - "brands" (optional) is a list of names that render as a
    crossfading black-and-white credit strip — used for Dozer's
    sponsors/press mentions. Omit or leave empty for projects
    that don't need it.
  - "scale" is the chapter number shown in the contents index and next
    to each project (e.g. "01", "02", "03"). Add projects in the order
    you want them numbered.
  - "chapters" (optional) is an ordered list of {n, title} used only by
    the contents-style rail format — pass this when a project has a
    real chapter/section structure worth showing (used by Arsvita).
  - "statGrid" (optional) is a list of {label, value} pairs rendered as
    a bordered fact-box grid in the rail instead of the plain spec list
    — use this for projects with field-guide/spec-sheet style data
    (used by The Pecking Order).
  - "logoBreakdown" (optional) shows a project's logo in the rail,
    with a written breakdown of how the mark is constructed below
    it — {full: "path/to/logo.png", description: "..."}. Use this
    for a branding project where the mark itself is worth explaining
    (used by The Pecking Order).
  - "spreads" (optional) is an ordered list of page/spread images
    that render as an auto-playing page-flip viewer instead of the
    normal hero image \u2014 use this for a project that's literally a
    printed book (used by Arsvita). Set "images" to just the cover
    for the contents-index thumbnail; "spreads" carries the full set.
  - "birdPicker" (optional) shows a grid of clickable thumbnails
    instead of a single hero image \u2014 clicking one reveals that
    entry's own drag-to-flip spreads. Each entry is {id, name,
    status: "complete" | "in-progress", spreads: [...]}. An
    "in-progress" entry shows its thumbnail (greyed, not clickable)
    so people know it's coming without being able to open an
    unfinished flipbook. Used by The Pecking Order.
  - "contentsThumb" (optional) overrides the contents-index thumbnail
    for a project \u2014 {src, background}. Use this when the real cover
    image doesn't work as a small square crop (e.g. a logo needs to
    sit on its own brand color and show in full, not get cropped).
    Without it, the thumbnail defaults to a cover-cropped first image.
  - Top-level "status" is a one-line availability note shown near
    your contact info — edit this any time your availability changes.
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

  bio: "I'm an extremely passionate designer who wants to change the way the world see's design! I get my inspiration by looking at other art forms such as (music, film, fashion, architecture, etc). I find this is the best way to maximize my creativity, and always leads to the best most original ideas.",

  projects: [
    {
      id: "01",
      scale: "01",
      title: "Dozer Magazine",
      year: "2025\u20132026",
      client: "Dozer Magazine",
      role: "Editorial design, art direction",

      credits: "New York City launch party hosted by Paul Stuart. Sponsored by Mount Gay Rum & Dirty Water Seltzers. Product placement by L.L. Bean, G.H. Bass, and Sperry. Posted in The New York Times & WSJ.",

      challenge: "Launching a definitive print issue for a traditional, historically exclusive fashion archetype while deliberately subverting its predominantly white culture through diverse casting and modern art direction — all while meeting strict commercial print standards for a 1,000+ copy run.",

      process: "From a design and art direction standpoint, we chose to feature models of different ethnicities and backgrounds, while placing the focus on a man named \u201cPreppy Pete\u201d who became known as the new face of prep below the magazine. This was a significant success, as prep has historically been predominantly white culture.",

      outcome: "Issue 01 sold over 1,000 copies and earned placement at Casa Magazines and Rare Magazines, plus a limited J.Crew collaboration run that sold out in under 10 minutes. The reception carried straight into a second issue nearly double the length (84 \u2192 164 pages), with continued sponsor support and national press coverage in The New York Times and The Wall Street Journal.",

      dimensions: "Issue 01: 84 pages (2025) \u00b7 Issue 02: 164 pages (2026)",

      brands: [
        "The New York Times", "Wall Street Journal", "Paul Stuart",
        "L.L. Bean", "G.H. Bass", "Sperry"
      ],

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
      client: "Arsvita Magazine",
      role: "Editorial design, self-published",

      credits: "Volume 01: Maya Civilization. A one-of-one hand-bound edition, self-published as a personal experiment in production: laser-cut acrylic casing, custom InDesign layouts, and a hand-glued binding process built entirely in-house.",

      challenge: "Making dense academic material on Maya art and archaeology feel discovered rather than assigned, without flattening the scholarship into a listicle — while solving a production problem with no existing template: laser-cutting acrylic to the right tolerance, bonding it into a durable case with acrylic solvent, and hand-binding paper pages into a material that was never meant to be bound.",

      process: "The issue is structured like a museum visit rather than a magazine: Prologue, Foundation, Stone, Ceramics, Figure, Glyphs, Epilogue, each a chapter built around one class of object. The manifesto that opens the issue \u2014 ars longa, vita brevis, \u201cart is long, life is short\u201d \u2014 sets the premise that carries through every section: these are objects built to outlast their makers. Scholarly essays run in a disciplined serif column, broken up by oversized type treatments used as punctuation rather than decoration, and a spec-sheet catalogue treats each artifact with the same clinical precision as an auction listing. The acrylic housing extends that idea into the object itself: a vitrine you hold in your hands.",

      dimensions: "46 pages \u00b7 hand-bound, laser-cut acrylic case \u00b7 one-of-one edition",

      chapters: [
        { n: "00", title: "Prologue" },
        { n: "01", title: "Foundation" },
        { n: "02", title: "Stone" },
        { n: "03", title: "Ceramics" },
        { n: "04", title: "Figure" },
        { n: "05", title: "Glyphs" },
        { n: "06", title: "Epilogue" }
      ],

      images: ["images/arsvita/spread-01.jpg"],
      processImages: [],
      spreads: [
        "images/arsvita/spread-01.jpg","images/arsvita/spread-02.jpg","images/arsvita/spread-03.jpg",
        "images/arsvita/spread-04.jpg","images/arsvita/spread-05.jpg","images/arsvita/spread-06.jpg",
        "images/arsvita/spread-07.jpg","images/arsvita/spread-08.jpg","images/arsvita/spread-09.jpg",
        "images/arsvita/spread-10.jpg","images/arsvita/spread-11.jpg","images/arsvita/spread-12.jpg",
        "images/arsvita/spread-13.jpg","images/arsvita/spread-14.jpg","images/arsvita/spread-15.jpg",
        "images/arsvita/spread-16.jpg","images/arsvita/spread-17.jpg","images/arsvita/spread-18.jpg",
        "images/arsvita/spread-19.jpg","images/arsvita/spread-20.jpg","images/arsvita/spread-21.jpg",
        "images/arsvita/spread-22.jpg","images/arsvita/spread-23.jpg"
      ]
    },
    {
      id: "03",
      scale: "03",
      title: "The Pecking Order Magazine",
      year: "2026\u2013present",
      client: "The Pecking Order Magazine",
      role: "Branding, editorial design",

      credits: "Issue One: The Unrefined. A branding and editorial project \u2014 identity, layout system, and five bird profiles \u2014 built to spread awareness of overlooked species and the environmental pressures they're up against.",

      challenge: "Bridging two registers that usually don't share a page: field-guide precision (height, wingspan, range, IUCN status) and articles on ecology, extinction, and what it means for a species to thrive because of human damage rather than in spite of it \u2014 without the magazine feeling like two different publications stapled together.",

      process: "Each bird gets a spec sheet \u2014 the same clinical data format used for the King Vulture, Shoebill, and Marabou Stork \u2014 set against a single saturated yellow that unifies photography pulled from very different sources into one visual system. A high-contrast black-and-white duotone treatment keeps the imagery documentary rather than pretty, appropriate for birds most people are taught to find ugly. Long-form essays interrupt the field-guide rhythm with oversized italic pull-quotes, giving the writing room to argue for what the data can't: that \u201cleast concern\u201d is not the same as beautiful.",

      dimensions: "Branding + editorial system \u00b7 in progress, started 2026",

      statGrid: [
        { label: "Format", value: "Branding + editorial" },
        { label: "Issue", value: "One: The Unrefined" },
        { label: "Profiles", value: "5 birds" },
        { label: "Status", value: "In progress" },
        { label: "Started", value: "2026" },
        { label: "Focus", value: "Ecology + awareness" }
      ],

      contentsThumb: { src: "images/logo-full.png", background: "#F8D507" },

      logoBreakdown: {
        full: "images/logo-full.png",
        description: "Designed for familiarity and brand recognition — something approachable, not intimidating. The imperfections are intentional: rough edges make it feel personable rather than polished, which matters given the subject matter inside."
      },

      birdPicker: [
        {
          id: "marabou",
          name: "Marabou Stork",
          status: "complete",
          spreads: [
            "images/pecking-order/marabou-01.jpg","images/pecking-order/marabou-02.jpg",
            "images/pecking-order/marabou-03.jpg","images/pecking-order/marabou-04.jpg",
            "images/pecking-order/marabou-05.jpg","images/pecking-order/marabou-06.jpg"
          ]
        },
        {
          id: "shoebill",
          name: "Shoebill",
          status: "complete",
          spreads: [
            "images/pecking-order/shoebill-01.jpg","images/pecking-order/shoebill-02.jpg",
            "images/pecking-order/shoebill-03.jpg","images/pecking-order/shoebill-04.jpg",
            "images/pecking-order/shoebill-05.jpg","images/pecking-order/shoebill-06.jpg"
          ]
        },
        {
          id: "kingvulture",
          name: "King Vulture",
          status: "complete",
          spreads: [
            "images/pecking-order/kingvulture-01.jpg","images/pecking-order/kingvulture-02.jpg",
            "images/pecking-order/kingvulture-03.jpg","images/pecking-order/kingvulture-04.jpg",
            "images/pecking-order/kingvulture-05.jpg"
          ]
        },
        {
          id: "hoatzin",
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
