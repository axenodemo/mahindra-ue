/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Mahindra cleanup. Selectors from captured DOM.
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie/tracking/overlays (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#CybotCookiebotDialog',
      '[class*="cookie"]',
      'noscript',
    ]);
  }
  if (hookName === H.after) {
    // Remove non-authorable content (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#block-header',
      'header',
      '.main-header',
      'footer',
      '#block-organisationschema',
      '#block-footer',
      'iframe',
      'link',
    ]);
    // Remove empty source elements
    element.querySelectorAll('source:not([srcset])').forEach((el) => el.remove());
    // Remove data attributes used for animations
    element.querySelectorAll('[data-aos]').forEach((el) => {
      el.removeAttribute('data-aos');
      el.removeAttribute('data-aos-offset');
      el.removeAttribute('data-aos-duration');
      el.removeAttribute('data-aos-easing');
    });
    element.querySelectorAll('[data-once]').forEach((el) => el.removeAttribute('data-once'));
  }
}
