<template>
  <div class="cv-page">

.period {
  font-size: 0.72rem;
  font-weight: 700;
  color: #6b2d00;
}

/* Skills */
.skills-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.skills-list li {
  font-size: 0.78rem;
  padding-left: 0.8rem;
  position: relative;
  color: #222;
}
.skills-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #6b2d00;
}

/* Timeline entries (jobs, projects) */
.timeline-entry {
  margin-bottom: 1rem;
}
.entry-header {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: baseline;
  margin-bottom: 0.15rem;
}
.entry-period {
  font-size: 0.72rem;
  font-weight: 700;
  color: #6b2d00;
  white-space: nowrap;
}
.entry-company {
  font-size: 0.82rem;
  font-weight: 700;
  color: #1a1a1a;
}
.entry-role {
  font-size: 0.78rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.3rem;
}
.entry-bullets {
  padding-left: 1.1rem;
  margin: 0;
}
.entry-bullets li {
  font-size: 0.76rem;
  color: #333;
  margin-bottom: 0.2rem;
  text-align: justify;
}

/* Contact list */
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.contact-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.77rem;
  color: #222;
}
.contact-list svg {
  flex-shrink: 0;
  color: #6b2d00;
}
.contact-list a {
  color: #222;
  text-decoration: none;
}
.contact-list a:hover {
  color: #6b2d00;
}

/* ─── Print / PDF styles ─────────────────────────────────────────────────── */
@media print {
  @page {
    size: A4;
    margin: 0;
  }

  /* Hide everything except the CV document */
  body * {
    visibility: hidden;
  }
  .cv-document,
  .cv-document * {
    visibility: visible;
  }
  .cv-document {
    position: fixed;
    top: 0;
    left: 0;
    width: 210mm;
    min-height: 297mm;
    box-shadow: none;
    border-radius: 0;
    font-size: 10.5px;
  }
  .no-print {
    display: none !important;
  }
  a {
    color: inherit !important;
    text-decoration: none !important;
  }
}

/* ─── Responsive (narrow screens) ───────────────────────────────────────── */
@media (max-width: 840px) {
  .cv-document {
    width: 100%;
    min-height: unset;
  }
  .cv-body {
    grid-template-columns: 1fr;
    min-height: unset;
  }
  .cv-sidebar {
    border-right: none;
    border-bottom: 1px solid #d0c8b8;
  }
}
</style>
