/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-news
 * Model fields (cards-news-item): media_image (reference), media_imageAlt (text, collapsed), content_text (richtext)
 * Source: #block-lateststories .grid-layout .slides (only slides with .content-wrap, skip twitter feed)
 */
export default function parse(element, { document }) {
  const rows = [];
  const slides = element.querySelectorAll('.slides');

  slides.forEach((slide) => {
    // Skip twitter feed slides (no .content-wrap)
    const contentWrap = slide.querySelector('.content-wrap');
    if (!contentWrap) return;

    // Cell 1: image with field hint
    const imgEl = slide.querySelector('.image-wrap img');
    const imgCell = document.createElement('div');
    imgCell.append(document.createComment(' field:media_image '));
    if (imgEl) {
      const img = document.createElement('img');
      img.src = imgEl.getAttribute('src') || '';
      img.alt = imgEl.getAttribute('alt') || '';
      imgCell.append(img);
    }

    // Cell 2: text content with field hint (category, text, link, date)
    const textCell = document.createElement('div');
    textCell.append(document.createComment(' field:content_text '));

    const categoryEl = contentWrap.querySelector('.category');
    if (categoryEl) {
      const p = document.createElement('p');
      const em = document.createElement('em');
      em.textContent = categoryEl.textContent.trim();
      p.append(em);
      textCell.append(p);
    }

    const textEl = contentWrap.querySelector('.text');
    if (textEl) {
      const p = document.createElement('p');
      p.textContent = textEl.textContent.trim();
      textCell.append(p);
    }

    const linkEl = contentWrap.querySelector('a');
    if (linkEl) {
      const a = document.createElement('a');
      a.href = linkEl.getAttribute('href') || '';
      a.textContent = linkEl.textContent.trim() || 'Read more';
      textCell.append(a);
    }

    const dateEl = contentWrap.querySelector('.date time');
    if (dateEl) {
      const p = document.createElement('p');
      const small = document.createElement('small');
      small.textContent = dateEl.textContent.trim();
      p.append(small);
      textCell.append(p);
    }

    rows.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards News',
    cells: rows,
  });

  element.replaceWith(block);
}
