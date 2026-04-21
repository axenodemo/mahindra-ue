/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselHeroParser from './parsers/carousel-hero.js';
import cardsBusinessParser from './parsers/cards-business.js';
import cardsPurposeParser from './parsers/cards-purpose.js';
import cardsPerformanceParser from './parsers/cards-performance.js';
import cardsFutureParser from './parsers/cards-future.js';
import cardsNewsParser from './parsers/cards-news.js';
import cardsWorkParser from './parsers/cards-work.js';
import accordionFaqParser from './parsers/accordion-faq.js';

// TRANSFORMER IMPORTS
import mahindraCleanup from './transformers/mahindra-cleanup.js';
import mahindraSections from './transformers/mahindra-sections.js';

// PARSER REGISTRY
const parsers = {
  'carousel-hero': carouselHeroParser,
  'cards-business': cardsBusinessParser,
  'cards-purpose': cardsPurposeParser,
  'cards-performance': cardsPerformanceParser,
  'cards-future': cardsFutureParser,
  'cards-news': cardsNewsParser,
  'cards-work': cardsWorkParser,
  'accordion-faq': accordionFaqParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  mahindraCleanup,
  mahindraSections,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Mahindra corporate homepage with hero, brand messaging, business verticals, and corporate information',
  urls: [
    'https://www.mahindra.com/'
  ],
  blocks: [
    {
      name: 'carousel-hero',
      instances: ['#block-homeslider .beam-slider.main-slider']
    },
    {
      name: 'cards-business',
      instances: ['#block-whatwedo .our-business-verticals']
    },
    {
      name: 'cards-purpose',
      instances: ['.purpose-led-grid']
    },
    {
      name: 'cards-performance',
      instances: ['#block-companyrise section.spirit-of-rise:not(.grey-bg) .performace-driven-cards']
    },
    {
      name: 'cards-future',
      instances: ['#block-companyrise .grey-bg .performace-driven-cards']
    },
    {
      name: 'cards-news',
      instances: ['#block-lateststories .grid-layout']
    },
    {
      name: 'cards-work',
      instances: ['#block-workwithus .grid-layout']
    },
    {
      name: 'accordion-faq',
      instances: ['#block-homepagefaq .acco-div']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Slider',
      selector: '#block-homeslider section.spotlight-home-wrap',
      style: null,
      blocks: ['carousel-hero'],
      defaultContent: ['.quick-links-div']
    },
    {
      id: 'section-2',
      name: 'What We Do',
      selector: '#block-whatwedo section.what-we-do-wrap',
      style: null,
      blocks: ['cards-business'],
      defaultContent: ['.what-we-do-wrap .section-header']
    },
    {
      id: 'section-3',
      name: 'Who We Are Purpose Led',
      selector: '#block-riseforamoreequalworld section.spirit-of-rise',
      style: 'grey',
      blocks: ['cards-purpose'],
      defaultContent: ['#block-riseforamoreequalworld .section-header']
    },
    {
      id: 'section-4',
      name: 'Performance Driven',
      selector: '#block-companyrise section.spirit-of-rise:not(.grey-bg)',
      style: null,
      blocks: ['cards-performance'],
      defaultContent: ['#block-companyrise section.spirit-of-rise:not(.grey-bg) .section-header']
    },
    {
      id: 'section-5',
      name: 'Future Ready',
      selector: '#block-companyrise section.grey-bg.spirit-of-rise',
      style: 'grey',
      blocks: ['cards-future'],
      defaultContent: ['#block-companyrise .grey-bg .section-header']
    },
    {
      id: 'section-6',
      name: 'Latest News',
      selector: '#block-lateststories section.latest-stories',
      style: 'grey',
      blocks: ['cards-news'],
      defaultContent: ['#block-lateststories .section-header']
    },
    {
      id: 'section-7',
      name: 'Work With Us',
      selector: '#block-workwithus section.work-with-us',
      style: null,
      blocks: ['cards-work'],
      defaultContent: ['#block-workwithus .section-header']
    },
    {
      id: 'section-8',
      name: 'FAQs',
      selector: '#block-homepagefaq section.faqs-section',
      style: null,
      blocks: ['accordion-faq'],
      defaultContent: ['#block-homepagefaq .section-header']
    }
  ]
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
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
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
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

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
