/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-work
 * Model fields (cards-work-item): media_image (reference), media_imageAlt (text, collapsed), content_text (richtext)
 * Source: #block-workwithus .grid-layout .slides
 */
export default function parse(element, { document }) {
  const rows = [];
  const slides = element.querySelectorAll('.slides');

  slides.forEach((slide) => {
    // Cell 1: image with field hint (optional - some cards have no image)
    const imgEl = slide.querySelector('.image-wrap picture img, .image-wrap img');
    const imgCell = document.createElement('div');
    imgCell.append(document.createComment(' field:media_image '));
    if (imgEl) {
      const img = document.createElement('img');
      img.src = imgEl.getAttribute('src') || '';
      img.alt = imgEl.getAttribute('alt') || '';
      imgCell.append(img);
    }

    // Cell 2: text content with field hint (heading, description, CTA)
    const textCell = document.createElement('div');
    textCell.append(document.createComment(' field:content_text '));

    const contentWrap = slide.querySelector('.content-wrap');
    if (contentWrap) {
      const headingEl = contentWrap.querySelector('h3, h2, .heading');
      if (headingEl) {
        const h3 = document.createElement('h3');
        h3.textContent = headingEl.textContent.trim();
        textCell.append(h3);
      }

      const descEl = contentWrap.querySelector('p');
      if (descEl) {
        const p = document.createElement('p');
        p.textContent = descEl.textContent.trim();
        textCell.append(p);
      }

      const linkEl = contentWrap.querySelector('a');
      if (linkEl) {
        const a = document.createElement('a');
        a.href = linkEl.getAttribute('href') || '';
        a.textContent = linkEl.textContent.trim() || 'Learn More';
        textCell.append(a);
      }
    }

    rows.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards Work',
    cells: rows,
  });

  element.replaceWith(block);
}
