import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Add expand/collapse arrows and interactivity to nested lists
 */
function decorateNavColumns(nav) {
  nav.querySelectorAll('li').forEach((li) => {
    const subList = li.querySelector(':scope > ul');
    if (subList) {
      li.classList.add('has-children');
      subList.style.display = 'none';

      const arrow = document.createElement('span');
      arrow.className = 'footer-arrow';
      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = li.classList.contains('expanded');
        li.parentElement.querySelectorAll(':scope > li.expanded').forEach((sib) => {
          if (sib !== li) {
            sib.classList.remove('expanded');
            const sibSub = sib.querySelector(':scope > ul');
            if (sibSub) sibSub.style.display = 'none';
          }
        });
        if (isOpen) {
          li.classList.remove('expanded');
          subList.style.display = 'none';
        } else {
          li.classList.add('expanded');
          subList.style.display = 'block';
        }
      });

      const link = li.querySelector(':scope > a');
      if (link) link.after(arrow);
    }
  });
}

/**
 * Build 5-column grid from flat p+ul pairs
 */
function buildColumnGrid(wrapper) {
  const grid = document.createElement('div');
  grid.className = 'footer-grid';

  let currentCol = null;
  [...wrapper.children].forEach((el) => {
    if (el.tagName === 'P' && el.querySelector('strong')) {
      currentCol = document.createElement('div');
      currentCol.className = 'footer-col';
      currentCol.append(el);
      grid.append(currentCol);
    } else if (currentCol && el.tagName === 'UL') {
      currentCol.append(el);
    }
  });

  wrapper.textContent = '';
  wrapper.append(grid);
}

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Remove button classes
  footer.querySelectorAll('.button').forEach((button) => {
    button.className = '';
    const buttonContainer = button.closest('.button-container');
    if (buttonContainer) buttonContainer.className = '';
  });

  // Tag the 3 sections
  const sections = footer.querySelectorAll('.section');
  if (sections.length >= 3) {
    sections[0].classList.add('footer-top');
    sections[1].classList.add('footer-nav');
    sections[2].classList.add('footer-bottom');
  }

  // Build 5-column grid in nav section
  const navSection = footer.querySelector('.footer-nav');
  if (navSection) {
    const wrapper = navSection.querySelector('.default-content-wrapper');
    if (wrapper) buildColumnGrid(wrapper);
    decorateNavColumns(navSection);

    // Strip button classes from nav links (AEM wraps links in p.button-container)
    navSection.querySelectorAll('.button').forEach((btn) => {
      btn.className = '';
      const bc = btn.closest('.button-container');
      if (bc) bc.className = '';
    });
  }

  // Tag social list and wrap logo image in link
  const topSection = footer.querySelector('.footer-top');
  if (topSection) {
    const socialList = topSection.querySelector('ul');
    if (socialList) socialList.classList.add('footer-social');

    // Wrap logo image in a home link (image-only, not a button)
    const logoImg = topSection.querySelector('img');
    if (logoImg && !logoImg.closest('a')) {
      const homeLink = document.createElement('a');
      homeLink.href = 'https://www.mahindra.com/';
      homeLink.setAttribute('aria-label', 'Mahindra Home');
      logoImg.parentElement.insertBefore(homeLink, logoImg);
      homeLink.append(logoImg);
    }
  }

  block.append(footer);
}
