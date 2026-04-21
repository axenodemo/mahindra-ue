/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-business
 * Model fields (cards-business-item): media_image (reference), media_imageAlt (text, collapsed), content_text (richtext)
 * Source: #block-whatwedo .our-business-verticals .col .wrap
 */
export default function parse(element, { document }) {
  const rows = [];
  // Use desktop layout only (d-lg-block) to avoid duplicate mobile cards
  const desktopContainer = element.querySelector('.d-lg-block');
  const container = desktopContainer || element;
  const cards = container.querySelectorAll('.col .wrap');

  cards.forEach((card) => {
    // Cell 1: image with field hint
    const imgEl = card.querySelector('.image picture img');
    const imgCell = document.createElement('div');
    imgCell.append(document.createComment(' field:media_image '));
    if (imgEl) {
      const img = document.createElement('img');
      img.src = imgEl.getAttribute('src') || '';
      img.alt = imgEl.getAttribute('alt') || '';
      imgCell.append(img);
    }

    // Cell 2: text content with field hint
    const textCell = document.createElement('div');
    textCell.append(document.createComment(' field:content_text '));

    const titleEl = card.querySelector('.title');
    if (titleEl) {
      const p = document.createElement('p');
      p.textContent = titleEl.textContent.trim();
      textCell.append(p);
    }

    const linkEl = card.querySelector('a.stretched-link');
    if (linkEl && linkEl.getAttribute('href')) {
      const a = document.createElement('a');
      a.href = linkEl.getAttribute('href');
      a.textContent = titleEl ? titleEl.textContent.trim() : 'Learn More';
      textCell.append(a);
    }

    rows.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards Business',
    cells: rows,
  });

  element.replaceWith(block);
}
