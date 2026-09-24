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
  - "model3d" (optional) puts a 3D model of the finished object in
    front of the "spreads" viewer. Visitors drag it around to see every
    side, switch the stand on or off, and click it to open the
    page-flip spreads underneath. It needs arsvita-3d.js next to
    script.js, plus {src: the model file, poster: a still image shown
    while the model loads}. Used by Arsvita.
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

  bio: "I'm an extremely passionate designer who wants to change the way the world sees design! I get my inspiration by looking at other art forms such as music, film, fashion, architecture, etc. I find this is the best way to maximize my creativity, and it always leads to the best, most original ideas.",

  projects: [
    {
      id: "01",
      scale: "01",
      title: "Dozer Magazine",
      year: "2025\u20132026",
      client: "Dozer Magazine",
      role: "Editorial design, art direction",

      credits: "New York City launch party hosted by Paul Stuart. Sponsored by Mount Gay Rum & Dirty Water Seltzers. Product placement by L.L. Bean, G.H. Bass, and Sperry. Posted in The New York Times & WSJ.",

      challenge: "Throughout its history, \u2018prep fashion\u2019 has always had a predominantly caucasian community base which dominated the culture. This traditionally exclusive demographic was challenged through modern art direction and diverse casting practices, in an attempt to make the prep style more accessible and inclusive to everyone and not just one defined group. Although achieved, this proved to be quite difficult, as breaking and expanding barriers while simultaneously respecting and honouring style traditions can become a difficult needle to thread. All the while having to meet strict commercial print standards for an 1,000+ copy run, you can say we had our work cut out for us.",

      process: "We chose to feature models of different ethnicities, cultures and backgrounds while simultaneously placing focus on the new face of prep, \u201cPreppy Pete\u201d. Our friend Pete became known as the new face of prep below the magazine. The effort to diversify our cast of models ultimately resulted in success, as we opened the door to prep fashion to everyone and anyone who identified with the style.",

      outcome: "Issue 01 sold over a resounding 1,000 copies on debut release, and earned its placement at multiple store locations, such as Casa Magazines and Rare Magazines. A limited J.Crew collaboration run also took place, successfully selling out stock in under 10 minutes! Sales aside, the positive reception carried straight into the second issue, encouraging us to double the length (84\u2013164 pages), and continue to amass sponsor support and national press coverage in The Wall Street Journal and The New York Times.",

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

      challenge: "Translating information dense academic material on Maya art and archaeology into an engaging and exciting reading and visual experience can be quite the daunting task. On top of that, how can one condense all of the curated scholarly material into easily readable paragraphs without mashing them into a listicle format? These challenges had to be tackled with precision, alongside having to solve production problems with no pre-existing templates. The deliberate effort to laser cut acrylic to the right tolerance, bond it into a durable case with appropriate acrylic solvent, and hard binding paper pages into unconventional material not normally meant to be bound can prove difficult, but once efficiently executed and tackled, made the sweat and elbow grease well worth it.",

      process: "We\u2019ve all read your average magazine. We know the story, we understand the formula. It\u2019s predictable, for the most part. So in the spirit of ancient civilizations and the once lost artifacts and ancient archaeological history that accompanies them, why not turn that typical reading experience into that of a page-bound museum tour?! Prologue, Foundation, Stone, Ceramics, Figure, Glyphs, Epilogue. All chapters built around one class of object. \u201cArs Longa, Vita Brevis\u201d (translated: Art Is Long, Life Is Short), is the title of the manifesto which opens the issue. The premise of objects and works of art long outlasting their original creators runs course through the metaphorical veins of each page. Scholarly essays are ran in disciplined serif columns, broken up by oversized type treatments used as effective punctuation rather than average decoration. A spec-sheet catalogue treats each artifact with the exact clinical precision as your typical auction listing. The acrylic housing extends the idea into the object itself: a vitrine you hold in your hands. The reading experience is designed to pull you into the history itself, instead of just feeling like you\u2019re reading an essay for your high school history class.",

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
      model3d: {
        src: "models/arsvita-3d-model.js",
        poster: "images/arsvita/3d-poster.png"
      },
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

      challenge: "Combining field-guide styled information (such as height, wingspans, range, IUCN status) and articles on ecology, extinction and sustainability can sometimes prove difficult. Having information that usually is reserved for separate pages suddenly mashed together requires deliberate design choices and aesthetic workarounds to make sure the two registers complement instead of clash. The end goal was to ultimately include these vastly different information pieces and combine them effectively without making it feel like two entirely separate publications were stapled together.",

      process: "Each bird is meant to be displayed with a spec sheet, showing data displayed against a single saturated yellow, unifying photography pulled from a vast array of sources, all compiled into one visually cohesive system. A high contrast black and white duotone treatment is used to preserve the academic, documentary style of the imagery as a means of properly representing and reflecting the spirit of the birds that most people are convinced to find ugly. Various long form essays interrupt the organized field guide rhythm with oversized italic pull-quotes, effectively giving the writing room to argue for what some of the data can\u2019t; that species of \u201cleast concern\u201d is not the same as \u201cbeautiful\u201d.",

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
        description: "Designed to be instantly recognizable \u2014 a mark people connect with, not just look at. The rough, hand-cut edges are deliberate: they soften the entry point into subject matter that can otherwise feel dense or daunting, from scientific detail to tougher reads on extinction and habitat loss, so the magazine feels like something to pick up rather than brace for."
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
