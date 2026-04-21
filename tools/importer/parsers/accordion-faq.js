/* eslint-disable */
/* global WebImporter */

/**
 * Parser: accordion-faq
 * Model fields (accordion-faq-item): heading (text), content_text (richtext)
 * Source: #block-homepagefaq .acco-div ul li
 */
export default function parse(element, { document }) {
  const rows = [];
  const items = element.querySelectorAll('ul > li');

  items.forEach((item) => {
    // Cell 1: question with field hint
    const questionCell = document.createElement('div');
    questionCell.append(document.createComment(' field:heading '));

    const questionEl = item.querySelector('h2');
    if (questionEl) {
      const p = document.createElement('p');
      p.textContent = questionEl.textContent.trim();
      questionCell.append(p);
    }

    // Cell 2: answer with field hint
    const answerCell = document.createElement('div');
    answerCell.append(document.createComment(' field:content_text '));

    const answerEl = item.querySelector('.acco-content-div');
    if (answerEl) {
      Array.from(answerEl.children).forEach((child) => {
        answerCell.append(child.cloneNode(true));
      });
    }

    rows.push([questionCell, answerCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Accordion Faq',
    cells: rows,
  });

  element.replaceWith(block);
}
