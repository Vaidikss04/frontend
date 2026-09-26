/* =========================================================
   admin.js — logic for the Admin module pages
   ========================================================= */

// ---------- admin-dashboard.html ----------
function loadAdminDashboard() {
  const events = getEvents();
  const users = getUsers();
  const regs = getRegistrations();
  const upcoming = events.filter(e => new Date(e.date) >= new Date(new Date().toDateString()));

  document.getElementById("stat-total-events").textContent = events.length;
  document.getElementById("stat-total-users").textContent = users.length;
  document.getElementById("stat-total-regs").textContent = regs.length;
  document.getElementById("stat-upcoming").textContent = upcoming.length;

  const recent = [...events].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 5);
  const list = document.getElementById("recent-events-table");
  list.innerHTML = recent
    .map(
      ev => `
      <tr>
        <td>${ev.title}</td>
        <td>${formatDate(ev.date)}</td>
        <td>${ev.category}</td>
        <td>${countRegistrations(ev.id)} / ${ev.capacity}</td>
      </tr>`
    )
    .join("");
}

// ---------- manage-events.html ----------
function loadManageEvents() {
  const events = [...getEvents()].sort((a, b) => new Date(a.date) - new Date(b.date));
  const tbody = document.getElementById("manage-events-table");

  if (events.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="empty-state">No events yet. Add your first event.</td></tr>`;
    return;
  }

  tbody.innerHTML = events
    .map(
      ev => `
      <tr>
        <td>${ev.title}</td>
        <td>${formatDate(ev.date)}</td>
        <td>${ev.location}</td>
        <td>${ev.category}</td>
        <td>${countRegistrations(ev.id)} / ${ev.capacity}</td>
        <td class="actions-cell">
          <button class="btn btn-outline-dark btn-small" onclick="startEditEvent('${ev.id}')">Edit</button>
          <button class="btn btn-danger btn-small" onclick="deleteEvent('${ev.id}')">Delete</button>
        </td>
      </tr>`
    )
    .join("");
}

function deleteEvent(id) {
  if (!confirm("Delete this event? This also removes its registrations.")) return;
  const events = getEvents().filter(e => String(e.id) !== String(id));
  saveEvents(events);
  const regs = getRegistrations().filter(r => String(r.eventId) !== String(id));
  saveRegistrations(regs);
  loadManageEvents();
}

// Inline edit: fills the add-event style modal/form on the same page
function startEditEvent(id) {
  const ev = getEventById(id);
  if (!ev) return;
  document.getElementById("edit-panel").style.display = "block";
  document.getElementById("edit-id").value = ev.id;
  document.getElementById("edit-title").value = ev.title;
  document.getElementById("edit-date").value = ev.date;
  document.getElementById("edit-location").value = ev.location;
  document.getElementById("edit-category").value = ev.category;
  document.getElementById("edit-capacity").value = ev.capacity;
  document.getElementById("edit-description").value = ev.description;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelEdit() {
  document.getElementById("edit-panel").style.display = "none";
}

function saveEditedEvent(e) {
  e.preventDefault();
  const id = document.getElementById("edit-id").value;
  const events = getEvents().map(ev => {
    if (String(ev.id) !== String(id)) return ev;
    return {
      ...ev,
      title: document.getElementById("edit-title").value.trim(),
      date: document.getElementById("edit-date").value,
      location: document.getElementById("edit-location").value.trim(),
      category: document.getElementById("edit-category").value,
      capacity: Number(document.getElementById("edit-capacity").value),
      description: document.getElementById("edit-description").value.trim()
    };
  });
  saveEvents(events);
  cancelEdit();
  loadManageEvents();
}

// ---------- add-event.html ----------
function addEvent(e) {
  e.preventDefault();
  const events = getEvents();
  const newEvent = {
    id: Date.now(),
    title: document.getElementById("title").value.trim(),
    date: document.getElementById("date").value,
    location: document.getElementById("location").value.trim(),
    category: document.getElementById("category").value,
    capacity: Number(document.getElementById("capacity").value),
    description: document.getElementById("description").value.trim()
  };
  events.push(newEvent);
  saveEvents(events);
  alert("Event added successfully!");
  window.location.href = "manage-events.html";
}

// ---------- users.html ----------
function loadUsersList() {
  const users = getUsers();
  const regs = getRegistrations();
  const tbody = document.getElementById("users-table");

  if (users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="empty-state">No users have signed up yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = users
    .map(u => {
      const count = regs.filter(r => r.userEmail === u.email).length;
      return `
        <tr>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${count} event(s)</td>
        </tr>`;
    })
    .join("");
}
