import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

/* ── Mega-menu data ──────────────────────────────────────────────── */
const MEGA_MENU_DATA = {
  'Who We Are': {
    sidebar: {
      heading: 'Our Purpose',
      description: 'Drive positive change in the lives of our communities. Only when we enable others to rise will we rise.',
      tagline: '#TogetherWeRise',
    },
    columns: [
      [
        { label: 'Purpose Led', href: '/purpose-led' },
        { label: 'Performance Driven', href: '/performance-driven' },
        { label: 'Future Ready', href: '/future-ready' },
      ],
      [
        { label: 'Leadership', href: '/leadership' },
        { label: 'Our History', href: '/about-our-story' },
        { label: 'Museum', href: '/museum' },
      ],
    ],
  },
  'What We Do': {
    sidebar: {
      heading: 'Key Facts',
      stats: [
        { value: '20+', label: 'Industries' },
        { value: '100+', label: 'Countries' },
        { value: '324K+', label: 'Employees' },
      ],
    },
    columns: [
      [
        {
          label: 'Industries',
          href: '#',
          children: [
            {
              label: 'Automotive',
              href: '/our-business/automotive',
              children: [
                { label: 'SUVs', href: '/our-business/automotive/suvs' },
                { label: 'LCVs', href: '/our-business/automotive/lcvs' },
                { label: 'Last Mile Mobility', href: '/our-business/automotive/last-mile-mobility' },
                { label: 'Iconic Motorcycles', href: '/our-business/automotive/iconic-motorcycles' },
                { label: 'Trucks And Buses', href: '/our-business/automotive/trucks-and-buses' },
              ],
            },
            { label: 'Farm Equipments', href: '/our-business/farm-equipment', children: [] },
            { label: 'Financial Services', href: '/our-business/financial-services' },
            {
              label: 'Technology Services',
              href: '/our-business/technology-services',
              children: [],
            },
            { label: 'Hospitality', href: '/our-business/hospitality' },
            { label: 'Logistics', href: '/our-business/logistics' },
            { label: 'Real Estate', href: '/our-business/real-estate' },
            { label: 'Renewables', href: '/our-business/renewable-energy' },
            {
              label: 'Other Emerging Businesses',
              href: '/our-business/emerging-equity-investments',
              children: [],
            },
          ],
        },
      ],
      [
        { label: 'Our Brands', href: '/our-brands' },
        { label: 'Global Presence', href: '/our-business/global-presence' },
        { label: 'Cultural Outreach', href: '/cultural-outreach' },
      ],
    ],
  },
  'Investor Relations': {
    sidebar: {
      heading: 'Investor Relations',
      subheading: 'Group Highlights - Q3 F26',
      stats: [
        { value: '20.1%', label: 'Consolidated ROE' },
        { value: 'Rs 52,100 cr', label: 'Revenue' },
        { value: 'Rs 4,675 cr', label: 'PAT' },
      ],
    },
    columns: [
      [
        { label: 'Disclosures Under Regulation 46 & 62', href: '/investor-relations/disclosures' },
      ],
      [
        { label: 'Reports', href: '/investor-relations/reports' },
        { label: 'Policies', href: '/investor-relations/policies-and-documents' },
      ],
      [
        { label: 'Regulatory Filings', href: '/investor-relations/regulatory-filings' },
        { label: 'Sustainability', href: '/investor-relations/sustainability' },
      ],
    ],
  },
  Newsroom: {
    sidebar: {
      heading: 'Newsroom',
      description: 'Stay updated with the latest press releases and news from Mahindra Group.',
    },
    columns: [
      [
        { label: 'Press Releases', href: '/newsroom/press-release' },
        { label: 'Media Resources', href: '/newsroom/corporate-doc' },
      ],
      [
        { label: 'In The News', href: '/newsroom#in-the-news' },
      ],
    ],
  },
  Careers: {
    sidebar: {
      heading: 'Careers',
      description: 'Committed to elevate the lives of communities, guided by our core behaviours and values.',
      tagline: 'Bold. Agile. Collaborative.',
    },
    columns: [
      [
        { label: 'Find A Job', href: 'https://jobs.mahindracareers.com/' },
        { label: 'SOAR', href: '/career/SOAR' },
        {
          label: 'Leadership Programs',
          href: '#',
          children: [
            { label: 'Mahindra Leaders Program', href: '/mahindra-leaders-program' },
            { label: 'Mahindra Accelerated Leadership Track', href: '/mahindra-accelerated-leadership-track' },
            { label: 'Mahindra Future Shapers', href: '/mahindra-future-shapers' },
            { label: 'Mahindra Leadership University', href: '/mahindra-leadership-university' },
          ],
        },
        {
          label: 'Tech Opportunities',
          href: '#',
          children: [
            { label: 'Mahindra AI', href: '/mahindra-ai' },
            { label: 'Mahindra Digital Engine', href: '/mahindra-digital-engine' },
          ],
        },
      ],
    ],
  },
};

/* ── Helpers ──────────────────────────────────────────────────────── */

function buildSidebar(data) {
  const aside = document.createElement('div');
  aside.className = 'mega-sidebar';

  let html = `<h3 class="mega-sidebar-heading">${data.heading}</h3>`;
  if (data.subheading) html += `<p class="mega-sidebar-subheading">${data.subheading}</p>`;
  if (data.description) html += `<p class="mega-sidebar-desc">${data.description}</p>`;
  if (data.tagline) html += `<p class="mega-sidebar-tagline">${data.tagline}</p>`;
  if (data.stats) {
    html += '<div class="mega-sidebar-stats">';
    data.stats.forEach((s) => {
      html += `<div class="mega-stat"><span class="mega-stat-value">${s.value}</span><span class="mega-stat-label">${s.label}</span></div>`;
    });
    html += '</div>';
  }
  aside.innerHTML = html;
  return aside;
}

function buildNavItems(items, depth = 0) {
  const ul = document.createElement('ul');
  ul.className = depth === 0 ? 'mega-link-list' : 'mega-sub-list';

  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'mega-link-item';

    const hasChildren = item.children && item.children.length > 0;

    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    if (hasChildren) a.classList.add('has-children');
    li.append(a);

    if (hasChildren) {
      const toggle = document.createElement('button');
      toggle.className = 'mega-expand-btn';
      toggle.setAttribute('aria-label', `Expand ${item.label}`);
      toggle.innerHTML = '<span class="mega-chevron"></span>';
      li.append(toggle);

      const subList = buildNavItems(item.children, depth + 1);
      subList.classList.add('mega-collapsed');
      li.append(subList);

      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !subList.classList.contains('mega-collapsed');
        subList.classList.toggle('mega-collapsed', isOpen);
        toggle.classList.toggle('mega-expanded', !isOpen);
        li.classList.toggle('mega-item-open', !isOpen);
      });
    }

    ul.append(li);
  });

  return ul;
}

function buildMegaPanel(key) {
  const data = MEGA_MENU_DATA[key];
  if (!data) return null;

  const panel = document.createElement('div');
  panel.className = 'mega-panel';
  panel.setAttribute('data-section', key);

  panel.append(buildSidebar(data.sidebar));

  const content = document.createElement('div');
  content.className = 'mega-content';

  data.columns.forEach((col) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'mega-column';
    colDiv.append(buildNavItems(col));
    content.append(colDiv);
  });

  panel.append(content);
  return panel;
}

/* ── Close helpers ────────────────────────────────────────────────── */

function closeAllPanels(nav) {
  nav.querySelectorAll('.mega-nav-item').forEach((item) => {
    item.classList.remove('mega-active');
    item.setAttribute('aria-expanded', 'false');
  });
  nav.querySelectorAll('.mega-panel-visible').forEach((p) => {
    p.classList.remove('mega-panel-visible');
  });
  const overlay = nav.querySelector('.mega-overlay');
  if (overlay) overlay.classList.remove('mega-overlay-visible');
}

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    if (nav) closeAllPanels(nav);
  }
}

/* ── Mobile menu ──────────────────────────────────────────────────── */

function buildMobileMenu() {
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mega-mobile-menu';

  const navKeys = Object.keys(MEGA_MENU_DATA);
  navKeys.forEach((key) => {
    const data = MEGA_MENU_DATA[key];
    const section = document.createElement('div');
    section.className = 'mobile-section';

    const btn = document.createElement('button');
    btn.className = 'mobile-section-toggle';
    btn.textContent = key;
    btn.innerHTML = `${key}<span class="mobile-chevron"></span>`;
    section.append(btn);

    const inner = document.createElement('div');
    inner.className = 'mobile-section-content mobile-collapsed';

    // sidebar info
    const sidebarInfo = document.createElement('div');
    sidebarInfo.className = 'mobile-sidebar-info';
    if (data.sidebar.description) {
      sidebarInfo.innerHTML = `<p>${data.sidebar.description}</p>`;
    }
    if (data.sidebar.stats) {
      let statsHtml = '<div class="mobile-stats">';
      data.sidebar.stats.forEach((s) => {
        statsHtml += `<span class="mobile-stat"><strong>${s.value}</strong> ${s.label}</span>`;
      });
      statsHtml += '</div>';
      sidebarInfo.innerHTML += statsHtml;
    }
    inner.append(sidebarInfo);

    // links
    data.columns.forEach((col) => {
      inner.append(buildNavItems(col));
    });

    section.append(inner);

    btn.addEventListener('click', () => {
      const isOpen = !inner.classList.contains('mobile-collapsed');
      // close others
      mobileMenu.querySelectorAll('.mobile-section-content').forEach((c) => c.classList.add('mobile-collapsed'));
      mobileMenu.querySelectorAll('.mobile-section-toggle').forEach((b) => b.classList.remove('mobile-open'));
      if (!isOpen) {
        inner.classList.remove('mobile-collapsed');
        btn.classList.add('mobile-open');
      }
    });

    mobileMenu.append(section);
  });

  // contact link
  const contactLink = document.createElement('a');
  contactLink.href = '/contact-us';
  contactLink.className = 'mobile-contact-link';
  contactLink.textContent = 'Contact Us';
  mobileMenu.append(contactLink);

  return mobileMenu;
}

/* ── Decorate (entry point) ──────────────────────────────────────── */

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-expanded', 'false');

  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  // Clean brand link
  const navBrand = nav.querySelector('.nav-brand');
  if (navBrand) {
    const brandLink = navBrand.querySelector('.button');
    if (brandLink) {
      brandLink.className = '';
      brandLink.closest('.button-container').className = '';
    }
  }

  // Clean tools link
  const navTools = nav.querySelector('.nav-tools');
  if (navTools) {
    navTools.querySelectorAll('.button').forEach((button) => {
      button.className = '';
      const bc = button.closest('.button-container');
      if (bc) bc.className = '';
    });
  }

  /* ── Build desktop mega-nav ─────────────────────────────────────── */

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    // Hide original section content, replace with custom mega-nav
    navSections.innerHTML = '';

    const megaBar = document.createElement('ul');
    megaBar.className = 'mega-bar';

    const overlay = document.createElement('div');
    overlay.className = 'mega-overlay';

    const navKeys = Object.keys(MEGA_MENU_DATA);
    let hoverTimer = null;

    navKeys.forEach((key) => {
      const li = document.createElement('li');
      li.className = 'mega-nav-item';
      li.setAttribute('aria-expanded', 'false');

      const btn = document.createElement('button');
      btn.className = 'mega-nav-btn';
      btn.textContent = key;
      li.append(btn);

      const panel = buildMegaPanel(key);
      overlay.append(panel);

      // Desktop: hover
      li.addEventListener('mouseenter', () => {
        if (!isDesktop.matches) return;
        clearTimeout(hoverTimer);
        closeAllPanels(nav);
        li.classList.add('mega-active');
        li.setAttribute('aria-expanded', 'true');
        panel.classList.add('mega-panel-visible');
        overlay.classList.add('mega-overlay-visible');
      });

      li.addEventListener('mouseleave', () => {
        if (!isDesktop.matches) return;
        hoverTimer = setTimeout(() => {
          li.classList.remove('mega-active');
          li.setAttribute('aria-expanded', 'false');
          panel.classList.remove('mega-panel-visible');
          overlay.classList.remove('mega-overlay-visible');
        }, 150);
      });

      // Keep panel open when hovering it
      overlay.addEventListener('mouseenter', () => {
        if (!isDesktop.matches) return;
        clearTimeout(hoverTimer);
      });

      overlay.addEventListener('mouseleave', () => {
        if (!isDesktop.matches) return;
        hoverTimer = setTimeout(() => {
          closeAllPanels(nav);
          overlay.classList.remove('mega-overlay-visible');
          overlay.querySelectorAll('.mega-panel-visible').forEach((p) => p.classList.remove('mega-panel-visible'));
        }, 150);
      });

      // Click (accessibility + mobile fallback)
      btn.addEventListener('click', () => {
        if (isDesktop.matches) {
          const isOpen = li.classList.contains('mega-active');
          closeAllPanels(nav);
          overlay.querySelectorAll('.mega-panel-visible').forEach((p) => p.classList.remove('mega-panel-visible'));
          if (!isOpen) {
            li.classList.add('mega-active');
            li.setAttribute('aria-expanded', 'true');
            panel.classList.add('mega-panel-visible');
            overlay.classList.add('mega-overlay-visible');
          }
        }
      });

      megaBar.append(li);
    });

    navSections.append(megaBar);
    navSections.append(overlay);
  }

  /* ── Mobile hamburger + menu ────────────────────────────────────── */

  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
    <span class="nav-hamburger-icon"></span>
  </button>`;

  const mobileMenu = buildMobileMenu();
  nav.append(mobileMenu);

  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    document.body.style.overflowY = expanded ? '' : 'hidden';
    hamburger.querySelector('button').setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  });

  nav.prepend(hamburger);

  // Escape key
  window.addEventListener('keydown', closeOnEscape);

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      closeAllPanels(nav);
    }
  });

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
