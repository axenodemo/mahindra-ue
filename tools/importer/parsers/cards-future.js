/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-future
 * Model fields (cards-future-item): media_image (reference), media_imageAlt (text, collapsed), content_text (richtext)
 * Source: .grey-bg .performace-driven-cards .performace-driven-cards-link
 */
export default function parse(element, { document }) {
  const rows = [];
  const cards = element.querySelectorAll('.performace-driven-cards-link');

  cards.forEach((card) => {
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

    const boxCard = card.querySelector('.performace-driven-home-box-card');
    if (boxCard) {
      Array.from(boxCard.children).forEach((child) => {
        textCell.append(child.cloneNode(true));
      });
    }

    // Preserve the link
    if (card.getAttribute('href')) {
      const a = document.createElement('a');
      a.href = card.getAttribute('href');
      a.textContent = 'Learn More';
      textCell.append(a);
    }

    rows.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards Future',
    cells: rows,
  });

  element.replaceWith(block);
}
