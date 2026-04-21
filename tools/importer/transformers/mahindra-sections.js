/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Mahindra sections. Adds section breaks and section-metadata.
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const sections = payload?.template?.sections;
    if (!sections || sections.length < 2) return;

    const document = element.ownerDocument;

    // Process sections in reverse order to avoid index shifting
    const reversedSections = [...sections].reverse();

    for (const section of reversedSections) {
      // Find the section element
      let sectionEl = null;
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      for (const sel of selectors) {
        try {
          sectionEl = element.querySelector(sel);
        } catch (e) {
          // skip invalid selectors
        }
        if (sectionEl) break;
      }

      if (!sectionEl) continue;

      // Add section-metadata if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(metaBlock);
      }

      // Add section break (<hr>) before section (except first)
      if (section.id !== sections[0].id) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
