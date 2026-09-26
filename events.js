/* =========================================================
   events.js — shared Local Storage data helpers
   ========================================================= */

function getEvents() {
  return JSON.parse(localStorage.getItem("ems_events") || "[]");
}
function saveEvents(events) {
  localStorage.setItem("ems_events", JSON.stringify(events));
}
function getEventById(id) {
  return getEvents().find(e => String(e.id) === String(id));
}

function getRegistrations() {
  return JSON.parse(localStorage.getItem("ems_registrations") || "[]");
}
function saveRegistrations(regs) {
  localStorage.setItem("ems_registrations", JSON.stringify(regs));
}

function isRegistered(userEmail, eventId) {
  return getRegistrations().some(r => r.userEmail === userEmail && String(r.eventId) === String(eventId));
}

function countRegistrations(eventId) {
  return getRegistrations().filter(r => String(r.eventId) === String(eventId)).length;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// Builds a single event card's HTML. `actionHtml` lets each page decide
// what button/link appears on the card (View Details, Registered badge, etc).
function renderEventCard(ev, actionHtml) {
  return `
    <div class="event-card">
      <div class="event-card-body">
        <span class="tag">${ev.category}</span>
        <h3>${ev.title}</h3>
        <div class="meta">📅 ${formatDate(ev.date)}</div>
        <div class="meta">📍 ${ev.location}</div>
        <p class="desc">${ev.description}</p>
        ${actionHtml}
      </div>
    </div>
  `;
}
