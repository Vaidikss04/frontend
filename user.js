/* =========================================================
   user.js — logic for the User module pages
   ========================================================= */

// ---------- user-dashboard.html ----------
function loadUserDashboard(session) {
  document.getElementById("welcome-name").textContent = session.name;
  const events = getEvents();
  const regs = getRegistrations().filter(r => r.userEmail === session.email);

  document.getElementById("stat-total-events").textContent = events.length;
  document.getElementById("stat-my-regs").textContent = regs.length;

  const upcoming = events
    .filter(e => new Date(e.date) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const grid = document.getElementById("preview-grid");
  if (upcoming.length === 0) {
    grid.innerHTML = `<p class="empty-state">No upcoming events right now. Check back soon.</p>`;
    return;
  }
  grid.innerHTML = upcoming
    .map(ev => renderEventCard(ev, `<a href="event-details.html?id=${ev.id}" class="btn btn-primary btn-small">View Details</a>`))
    .join("");
}

// ---------- events.html ----------
function loadAllEvents() {
  renderFilteredEvents();
  document.getElementById("search-input").addEventListener("input", renderFilteredEvents);
  document.getElementById("category-filter").addEventListener("change", renderFilteredEvents);
}

function renderFilteredEvents() {
  const query = (document.getElementById("search-input").value || "").toLowerCase();
  const category = document.getElementById("category-filter").value;
  const grid = document.getElementById("events-grid");

  let events = getEvents();
  if (query) {
    events = events.filter(e => e.title.toLowerCase().includes(query) || e.location.toLowerCase().includes(query));
  }
  if (category !== "all") {
    events = events.filter(e => e.category === category);
  }
  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  if (events.length === 0) {
    grid.innerHTML = `<p class="empty-state">No events match your search.</p>`;
    return;
  }
  grid.innerHTML = events
    .map(ev => renderEventCard(ev, `<a href="event-details.html?id=${ev.id}" class="btn btn-primary btn-small">View Details</a>`))
    .join("");
}

// ---------- event-details.html ----------
function loadEventDetails(session) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const ev = getEventById(id);
  const wrap = document.getElementById("details-wrap");

  if (!ev) {
    wrap.innerHTML = `<p class="empty-state">Event not found.</p>`;
    return;
  }

  const registered = isRegistered(session.email, ev.id);
  const spotsTaken = countRegistrations(ev.id);
  const full = spotsTaken >= ev.capacity;

  let actionHtml;
  if (registered) {
    actionHtml = `<button class="btn btn-outline-dark" disabled>✓ You're registered</button>`;
  } else if (full) {
    actionHtml = `<button class="btn btn-danger" disabled>Event Full</button>`;
  } else {
    actionHtml = `<button class="btn btn-primary" onclick="registerForEvent('${ev.id}')">Register for this Event</button>`;
  }

  wrap.innerHTML = `
    <span class="tag">${ev.category}</span>
    <h1>${ev.title}</h1>
    <div class="meta">📅 ${formatDate(ev.date)} &nbsp;•&nbsp; 📍 ${ev.location}</div>
    <p class="desc" style="font-size:16px; margin:18px 0;">${ev.description}</p>
    <div class="meta">👥 ${spotsTaken} / ${ev.capacity} registered</div>
    <div style="margin-top:22px;">${actionHtml}</div>
  `;
}

function registerForEvent(eventId) {
  const session = getSession();
  const regs = getRegistrations();
  regs.push({ userEmail: session.email, eventId: eventId, registeredOn: new Date().toISOString() });
  saveRegistrations(regs);
  alert("You're registered! See it under 'My Registrations'.");
  loadEventDetails(session);
}

// ---------- my-events.html ----------
function loadMyRegistrations(session) {
  const myRegs = getRegistrations().filter(r => r.userEmail === session.email);
  const events = getEvents();
  const list = document.getElementById("my-events-list");

  if (myRegs.length === 0) {
    list.innerHTML = `<p class="empty-state">You haven't registered for any events yet. <a href="events.html" style="color:var(--amber-dark); font-weight:600;">Browse events →</a></p>`;
    return;
  }

  const myEvents = myRegs
    .map(r => events.find(e => String(e.id) === String(r.eventId)))
    .filter(Boolean)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  list.innerHTML = myEvents
    .map(ev => renderEventCard(ev, `<a href="event-details.html?id=${ev.id}" class="btn btn-outline-dark btn-small">View Details</a>`))
    .join("");
}
