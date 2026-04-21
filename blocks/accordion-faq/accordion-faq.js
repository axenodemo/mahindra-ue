/*
 * Accordion Block
 * Recreate an accordion with smooth slide animation
 * https://www.hlx.live/developer/block-collection/accordion
 */

import { moveInstrumentation } from '../../scripts/scripts.js';

function slideDown(el, duration = 300) {
  el.style.display = 'block';
  el.style.overflow = 'hidden';
  const height = el.scrollHeight;
  el.style.maxHeight = '0';
  el.style.opacity = '0';
  el.style.transition = `max-height ${duration}ms ease, opacity ${duration}ms ease`;
  requestAnimationFrame(() => {
    el.style.maxHeight = `${height}px`;
    el.style.opacity = '1';
  });
  setTimeout(() => {
    el.style.maxHeight = 'none';
    el.style.overflow = '';
  }, duration);
}

function slideUp(el, duration = 300) {
  el.style.overflow = 'hidden';
  el.style.maxHeight = `${el.scrollHeight}px`;
  el.style.transition = `max-height ${duration}ms ease, opacity ${duration}ms ease`;
  requestAnimationFrame(() => {
    el.style.maxHeight = '0';
    el.style.opacity = '0';
  });
  setTimeout(() => {
    el.style.display = 'none';
    el.style.overflow = '';
  }, duration);
}

export default function decorate(block) {
  const items = [...block.children];

  items.forEach((row, index) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-faq-item-label';
    summary.append(...label.childNodes);
    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-faq-item-body';
    // decorate accordion item
    const details = document.createElement('details');
    moveInstrumentation(row, details);
    details.className = 'accordion-faq-item';
    details.append(summary, body);
    row.replaceWith(details);

    // Hide body initially (JS controls visibility)
    body.style.display = 'none';

    // Prevent native toggle — we handle open/close with animation
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = details.open;

      // Close all other open accordions with animation
      block.querySelectorAll('details[open]').forEach((d) => {
        if (d !== details) {
          const otherBody = d.querySelector('.accordion-faq-item-body');
          slideUp(otherBody);
          d.open = false;
        }
      });

      if (isOpen) {
        // Close this one
        slideUp(body);
        details.open = false;
      } else {
        // Open this one
        details.open = true;
        slideDown(body);
      }
    });

    // Start hidden for staggered fade-up animation
    details.style.opacity = '0';
    details.style.transform = 'translateY(40px)';
    details.style.transition = 'none';
    details.dataset.faqIndex = index;
  });

  // Scroll-triggered staggered fade-up animation (AOS-like)
  const section = block.closest('.section');
  if (section) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add('accordion-faq-visible');

          // Staggered animation for each accordion item
          const allDetails = block.querySelectorAll('details');
          allDetails.forEach((detail, i) => {
            const delay = i * 150;
            setTimeout(() => {
              detail.style.transition = 'opacity 0.65s ease-in-out, transform 0.65s ease-in-out';
              detail.style.opacity = '1';
              detail.style.transform = 'translateY(0)';
            }, delay);
          });

          // Open first FAQ by default with smooth animation
          const firstDetail = block.querySelector('details');
          if (firstDetail) {
            setTimeout(() => {
              firstDetail.open = true;
              const firstBody = firstDetail.querySelector('.accordion-faq-item-body');
              slideDown(firstBody);
            }, 100);
          }

          observer.disconnect();
        }
      });
    }, { threshold: 0.15 });
    observer.observe(section);
  }
}
