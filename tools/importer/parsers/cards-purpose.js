/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-purpose
 * Model fields (cards-purpose-item): media_image (reference), media_imageAlt (text, collapsed), content_text (richtext)
 * Source: .purpose-led-grid .col-md-6 .card-wrap (or direct .card-wrap children)
 */
export default function parse(element, { document }) {
  const rows = [];
  const cards = element.querySelectorAll('.col-md-6 .card-wrap, .col-md-6 > a.card-wrap');

  // Fallback: if the above doesn't match, try card-wrap directly
  const cardEls = cards.length > 0 ? cards : element.querySelectorAll('.card-wrap');

  cardEls.forEach((card) => {
    // Cell 1: image with field hint
    const imgEl = card.querySelector('.card-image picture img, .card-image img');
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

    const textEl = card.querySelector('.card-text');
    if (textEl) {
      Array.from(textEl.children).forEach((child) => {
        textCell.append(child.cloneNode(true));
      });
    }

    // Preserve the link if card-wrap is an anchor
    if (card.tagName === 'A' && card.getAttribute('href')) {
      const a = document.createElement('a');
      a.href = card.getAttribute('href');
      a.textContent = 'Learn More';
      textCell.append(a);
    }

    rows.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards Purpose',
    cells: rows,
  });

  element.replaceWith(block);
}
