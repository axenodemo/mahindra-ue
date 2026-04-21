/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-hero
 * Model fields (carousel-hero-item): media_image (reference), media_imageAlt (text, collapsed), content_text (richtext)
 * Source: .beam-slider .swiper-slide elements
 */
export default function parse(element, { document }) {
  const rows = [];
  const slides = element.querySelectorAll('.swiper-slide');

  slides.forEach((slide) => {
    // Cell 1: image with field hint
    const imgEl = slide.querySelector('.slide-bgimg picture img');
    if (!imgEl) return;

    const imgCell = document.createElement('div');
    imgCell.append(document.createComment(' field:media_image '));
    const img = document.createElement('img');
    img.src = imgEl.getAttribute('src') || '';
    img.alt = imgEl.getAttribute('alt') || '';
    imgCell.append(img);

    // Cell 2: text content with field hint
    const textCell = document.createElement('div');
    textCell.append(document.createComment(' field:content_text '));

    const contentEl = slide.querySelector('.mob-content-home-spotlight .content');
    if (contentEl) {
      // Copy child nodes (small/eyebrow, headings, paragraphs, links)
      Array.from(contentEl.childNodes).forEach((node) => {
        if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
          textCell.append(node.cloneNode(true));
        }
      });
    }

    rows.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Carousel Hero',
    cells: rows,
  });

  element.replaceWith(block);
}
