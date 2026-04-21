var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-hero.js
  function parse(element, { document }) {
    const rows = [];
    const slides = element.querySelectorAll(".swiper-slide");
    slides.forEach((slide) => {
      const imgEl = slide.querySelector(".slide-bgimg picture img");
      if (!imgEl) return;
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:media_image "));
      const img = document.createElement("img");
      img.src = imgEl.getAttribute("src") || "";
      img.alt = imgEl.getAttribute("alt") || "";
      imgCell.append(img);
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:content_text "));
      const contentEl = slide.querySelector(".mob-content-home-spotlight .content");
      if (contentEl) {
        Array.from(contentEl.childNodes).forEach((node) => {
          if (node.nodeType === 1 || node.nodeType === 3 && node.textContent.trim()) {
            textCell.append(node.cloneNode(true));
          }
        });
      }
      rows.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Carousel Hero",
      cells: rows
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-business.js
  function parse2(element, { document }) {
    const rows = [];
    const desktopContainer = element.querySelector(".d-lg-block");
    const container = desktopContainer || element;
    const cards = container.querySelectorAll(".col .wrap");
    cards.forEach((card) => {
      const imgEl = card.querySelector(".image picture img");
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:media_image "));
      if (imgEl) {
        const img = document.createElement("img");
        img.src = imgEl.getAttribute("src") || "";
        img.alt = imgEl.getAttribute("alt") || "";
        imgCell.append(img);
      }
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:content_text "));
      const titleEl = card.querySelector(".title");
      if (titleEl) {
        const p = document.createElement("p");
        p.textContent = titleEl.textContent.trim();
        textCell.append(p);
      }
      const linkEl = card.querySelector("a.stretched-link");
      if (linkEl && linkEl.getAttribute("href")) {
        const a = document.createElement("a");
        a.href = linkEl.getAttribute("href");
        a.textContent = titleEl ? titleEl.textContent.trim() : "Learn More";
        textCell.append(a);
      }
      rows.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Cards Business",
      cells: rows
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-purpose.js
  function parse3(element, { document }) {
    const rows = [];
    const cards = element.querySelectorAll(".col-md-6 .card-wrap, .col-md-6 > a.card-wrap");
    const cardEls = cards.length > 0 ? cards : element.querySelectorAll(".card-wrap");
    cardEls.forEach((card) => {
      const imgEl = card.querySelector(".card-image picture img, .card-image img");
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:media_image "));
      if (imgEl) {
        const img = document.createElement("img");
        img.src = imgEl.getAttribute("src") || "";
        img.alt = imgEl.getAttribute("alt") || "";
        imgCell.append(img);
      }
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:content_text "));
      const textEl = card.querySelector(".card-text");
      if (textEl) {
        Array.from(textEl.children).forEach((child) => {
          textCell.append(child.cloneNode(true));
        });
      }
      if (card.tagName === "A" && card.getAttribute("href")) {
        const a = document.createElement("a");
        a.href = card.getAttribute("href");
        a.textContent = "Learn More";
        textCell.append(a);
      }
      rows.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Cards Purpose",
      cells: rows
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-performance.js
  function parse4(element, { document }) {
    const rows = [];
    const cards = element.querySelectorAll(".performace-driven-cards-link");
    cards.forEach((card) => {
      const imgEl = card.querySelector(".card-image picture img, .card-image img");
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:media_image "));
      if (imgEl) {
        const img = document.createElement("img");
        img.src = imgEl.getAttribute("src") || "";
        img.alt = imgEl.getAttribute("alt") || "";
        imgCell.append(img);
      }
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:content_text "));
      const boxCard = card.querySelector(".performace-driven-home-box-card");
      if (boxCard) {
        Array.from(boxCard.children).forEach((child) => {
          textCell.append(child.cloneNode(true));
        });
      }
      if (card.getAttribute("href")) {
        const a = document.createElement("a");
        a.href = card.getAttribute("href");
        a.textContent = "Learn More";
        textCell.append(a);
      }
      rows.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Cards Performance",
      cells: rows
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-future.js
  function parse5(element, { document }) {
    const rows = [];
    const cards = element.querySelectorAll(".performace-driven-cards-link");
    cards.forEach((card) => {
      const imgEl = card.querySelector(".card-image picture img, .card-image img");
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:media_image "));
      if (imgEl) {
        const img = document.createElement("img");
        img.src = imgEl.getAttribute("src") || "";
        img.alt = imgEl.getAttribute("alt") || "";
        imgCell.append(img);
      }
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:content_text "));
      const boxCard = card.querySelector(".performace-driven-home-box-card");
      if (boxCard) {
        Array.from(boxCard.children).forEach((child) => {
          textCell.append(child.cloneNode(true));
        });
      }
      if (card.getAttribute("href")) {
        const a = document.createElement("a");
        a.href = card.getAttribute("href");
        a.textContent = "Learn More";
        textCell.append(a);
      }
      rows.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Cards Future",
      cells: rows
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-news.js
  function parse6(element, { document }) {
    const rows = [];
    const slides = element.querySelectorAll(".slides");
    slides.forEach((slide) => {
      const contentWrap = slide.querySelector(".content-wrap");
      if (!contentWrap) return;
      const imgEl = slide.querySelector(".image-wrap img");
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:media_image "));
      if (imgEl) {
        const img = document.createElement("img");
        img.src = imgEl.getAttribute("src") || "";
        img.alt = imgEl.getAttribute("alt") || "";
        imgCell.append(img);
      }
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:content_text "));
      const categoryEl = contentWrap.querySelector(".category");
      if (categoryEl) {
        const p = document.createElement("p");
        const em = document.createElement("em");
        em.textContent = categoryEl.textContent.trim();
        p.append(em);
        textCell.append(p);
      }
      const textEl = contentWrap.querySelector(".text");
      if (textEl) {
        const p = document.createElement("p");
        p.textContent = textEl.textContent.trim();
        textCell.append(p);
      }
      const linkEl = contentWrap.querySelector("a");
      if (linkEl) {
        const a = document.createElement("a");
        a.href = linkEl.getAttribute("href") || "";
        a.textContent = linkEl.textContent.trim() || "Read more";
        textCell.append(a);
      }
      const dateEl = contentWrap.querySelector(".date time");
      if (dateEl) {
        const p = document.createElement("p");
        const small = document.createElement("small");
        small.textContent = dateEl.textContent.trim();
        p.append(small);
        textCell.append(p);
      }
      rows.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Cards News",
      cells: rows
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-work.js
  function parse7(element, { document }) {
    const rows = [];
    const slides = element.querySelectorAll(".slides");
    slides.forEach((slide) => {
      const imgEl = slide.querySelector(".image-wrap picture img, .image-wrap img");
      const imgCell = document.createElement("div");
      imgCell.append(document.createComment(" field:media_image "));
      if (imgEl) {
        const img = document.createElement("img");
        img.src = imgEl.getAttribute("src") || "";
        img.alt = imgEl.getAttribute("alt") || "";
        imgCell.append(img);
      }
      const textCell = document.createElement("div");
      textCell.append(document.createComment(" field:content_text "));
      const contentWrap = slide.querySelector(".content-wrap");
      if (contentWrap) {
        const headingEl = contentWrap.querySelector("h3, h2, .heading");
        if (headingEl) {
          const h3 = document.createElement("h3");
          h3.textContent = headingEl.textContent.trim();
          textCell.append(h3);
        }
        const descEl = contentWrap.querySelector("p");
        if (descEl) {
          const p = document.createElement("p");
          p.textContent = descEl.textContent.trim();
          textCell.append(p);
        }
        const linkEl = contentWrap.querySelector("a");
        if (linkEl) {
          const a = document.createElement("a");
          a.href = linkEl.getAttribute("href") || "";
          a.textContent = linkEl.textContent.trim() || "Learn More";
          textCell.append(a);
        }
      }
      rows.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Cards Work",
      cells: rows
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse8(element, { document }) {
    const rows = [];
    const items = element.querySelectorAll("ul > li");
    items.forEach((item) => {
      const questionCell = document.createElement("div");
      questionCell.append(document.createComment(" field:heading "));
      const questionEl = item.querySelector("h2");
      if (questionEl) {
        const p = document.createElement("p");
        p.textContent = questionEl.textContent.trim();
        questionCell.append(p);
      }
      const answerCell = document.createElement("div");
      answerCell.append(document.createComment(" field:content_text "));
      const answerEl = item.querySelector(".acco-content-div");
      if (answerEl) {
        Array.from(answerEl.children).forEach((child) => {
          answerCell.append(child.cloneNode(true));
        });
      }
      rows.push([questionCell, answerCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Accordion FAQ",
      cells: rows
    });
    element.replaceWith(block);
  }

  // tools/importer/transformers/mahindra-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#CybotCookiebotDialog",
        '[class*="cookie"]',
        "noscript"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "#block-header",
        "header",
        ".main-header",
        "footer",
        "#block-organisationschema",
        "#block-footer",
        "iframe",
        "link"
      ]);
      element.querySelectorAll("source:not([srcset])").forEach((el) => el.remove());
      element.querySelectorAll("[data-aos]").forEach((el) => {
        el.removeAttribute("data-aos");
        el.removeAttribute("data-aos-offset");
        el.removeAttribute("data-aos-duration");
        el.removeAttribute("data-aos-easing");
      });
      element.querySelectorAll("[data-once]").forEach((el) => el.removeAttribute("data-once"));
    }
  }

  // tools/importer/transformers/mahindra-sections.js
  function transform2(hookName, element, payload) {
    var _a;
    if (hookName === "afterTransform") {
      const sections = (_a = payload == null ? void 0 : payload.template) == null ? void 0 : _a.sections;
      if (!sections || sections.length < 2) return;
      const document = element.ownerDocument;
      const reversedSections = [...sections].reverse();
      for (const section of reversedSections) {
        let sectionEl = null;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        for (const sel of selectors) {
          try {
            sectionEl = element.querySelector(sel);
          } catch (e) {
          }
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(metaBlock);
        }
        if (section.id !== sections[0].id) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel-hero": parse,
    "cards-business": parse2,
    "cards-purpose": parse3,
    "cards-performance": parse4,
    "cards-future": parse5,
    "cards-news": parse6,
    "cards-work": parse7,
    "accordion-faq": parse8
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Mahindra corporate homepage with hero, brand messaging, business verticals, and corporate information",
    urls: [
      "https://www.mahindra.com/"
    ],
    blocks: [
      {
        name: "carousel-hero",
        instances: ["#block-homeslider .beam-slider.main-slider"]
      },
      {
        name: "cards-business",
        instances: ["#block-whatwedo .our-business-verticals"]
      },
      {
        name: "cards-purpose",
        instances: [".purpose-led-grid"]
      },
      {
        name: "cards-performance",
        instances: ["#block-companyrise .performace-driven-cards"]
      },
      {
        name: "cards-future",
        instances: ["#block-companyrise .grey-bg .performace-driven-cards"]
      },
      {
        name: "cards-news",
        instances: ["#block-lateststories .grid-layout"]
      },
      {
        name: "cards-work",
        instances: ["#block-workwithus .grid-layout"]
      },
      {
        name: "accordion-faq",
        instances: ["#block-homepagefaq .acco-div"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Slider",
        selector: "#block-homeslider section.spotlight-home-wrap",
        style: null,
        blocks: ["carousel-hero"],
        defaultContent: [".quick-links-div"]
      },
      {
        id: "section-2",
        name: "What We Do",
        selector: "#block-whatwedo section.what-we-do-wrap",
        style: null,
        blocks: ["cards-business"],
        defaultContent: [".what-we-do-wrap .section-header"]
      },
      {
        id: "section-3",
        name: "Who We Are Purpose Led",
        selector: "#block-riseforamoreequalworld section.spirit-of-rise",
        style: "grey",
        blocks: ["cards-purpose"],
        defaultContent: ["#block-riseforamoreequalworld .section-header"]
      },
      {
        id: "section-4",
        name: "Performance Driven",
        selector: "#block-companyrise section.spirit-of-rise:not(.grey-bg)",
        style: null,
        blocks: ["cards-performance"],
        defaultContent: ["#block-companyrise section.spirit-of-rise:not(.grey-bg) .section-header"]
      },
      {
        id: "section-5",
        name: "Future Ready",
        selector: "#block-companyrise section.grey-bg.spirit-of-rise",
        style: "grey",
        blocks: ["cards-future"],
        defaultContent: ["#block-companyrise .grey-bg .section-header"]
      },
      {
        id: "section-6",
        name: "Latest News",
        selector: "#block-lateststories section.latest-stories",
        style: "grey",
        blocks: ["cards-news"],
        defaultContent: ["#block-lateststories .section-header"]
      },
      {
        id: "section-7",
        name: "Work With Us",
        selector: "#block-workwithus section.work-with-us",
        style: null,
        blocks: ["cards-work"],
        defaultContent: ["#block-workwithus .section-header"]
      },
      {
        id: "section-8",
        name: "FAQs",
        selector: "#block-homepagefaq section.faqs-section",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: ["#block-homepagefaq .section-header"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
