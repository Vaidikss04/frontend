/* =========================================================
   auth.js — signup / login / logout / session handling
   Everything persists in the browser's Local Storage.
   ========================================================= */

const ADMIN_EMAIL = "admin@campus.edu";
const ADMIN_PASSWORD = "admin123";

// ---------- Seed initial data (runs once) ----------
function initData() {
  if (!localStorage.getItem("ems_users")) {
    localStorage.setItem("ems_users", JSON.stringify([]));
  }
  if (!localStorage.getItem("ems_events")) {
    const seedEvents = [
      {
        id: 1,
        title: "Tech Fest 2026",
        date: "2026-10-10",
        location: "Main Auditorium, Vijayawada",
        category: "Technical",
        description: "A full-day celebration of student tech projects, robotics demos and a coding blitz. Open to all branches.",
        capacity: 200
      },
      {
        id: 2,
        title: "Hackathon 2026",
        date: "2026-10-15",
        location: "KL University Innovation Lab",
        category: "Technical",
        description: "24-hour team hackathon. Build a working prototype around this year's theme: sustainable campuses.",
        capacity: 120
      },
      {
        id: 3,
        title: "Cultural Night",
        date: "2026-11-02",
        location: "Open Air Theatre",
        category: "Cultural",
        description: "An evening of music, dance and drama performances by students across all departments.",
        capacity: 300
      },
      {
        id: 4,
        title: "Inter-College Sports Meet",
        date: "2026-11-18",
        location: "Sports Complex Ground",
        category: "Sports",
        description: "Athletics, cricket and badminton events with teams from six neighbouring colleges.",
        capacity: 250
      },
      {
        id: 5,
        title: "Placement Readiness Workshop",
        date: "2026-10-25",
        location: "Seminar Hall 2",
        category: "Workshop",
        description: "Resume reviews, mock interviews and aptitude test practice led by the placement cell.",
        capacity: 80
      }
    ];
    localStorage.setItem("ems_events", JSON.stringify(seedEvents));
  }
  if (!localStorage.getItem("ems_registrations")) {
    localStorage.setItem("ems_registrations", JSON.stringify([]));
  }
}
initData();

// ---------- Helpers ----------
function getUsers() {
  return JSON.parse(localStorage.getItem("ems_users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("ems_users", JSON.stringify(users));
}
function getSession() {
  return JSON.parse(localStorage.getItem("ems_session") || "null");
}
// returns "../" when called from inside /user or /admin, "" when at root
function rootPath() {
  return window.location.pathname.includes("/user/") || window.location.pathname.includes("/admin/") ? "../" : "";
}

// ---------- Signup ----------
function signupUser(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const errorEl = document.getElementById("error-msg");
  errorEl.textContent = "";

  if (email === ADMIN_EMAIL) {
    errorEl.textContent = "That email is reserved. Please use a different one.";
    return;
  }

  const users = getUsers();
  if (users.some(u => u.email === email)) {
    errorEl.textContent = "An account with this email already exists.";
    return;
  }

  users.push({ name, email, password });
  saveUsers(users);
  alert("Account created successfully! Please log in.");
  window.location.href = "login.html";
}

// ---------- Login ----------
function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const errorEl = document.getElementById("error-msg");
  errorEl.textContent = "";

  // Admin check
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    localStorage.setItem("ems_session", JSON.stringify({ email, name: "Admin", role: "admin" }));
    window.location.href = "admin/admin-dashboard.html";
    return;
  }

  // User check
  const users = getUsers();
  const found = users.find(u => u.email === email && u.password === password);
  if (found) {
    localStorage.setItem("ems_session", JSON.stringify({ email: found.email, name: found.name, role: "user" }));
    window.location.href = "user/user-dashboard.html";
  } else {
    errorEl.textContent = "Invalid email or password.";
  }
}

// ---------- Logout ----------
function logout() {
  localStorage.removeItem("ems_session");
  window.location.href = rootPath() + "login.html";
}

// ---------- Route guard ----------
// Call at the top of any protected page: requireRole('admin') or requireRole('user')
function requireRole(role) {
  const session = getSession();
  if (!session || session.role !== role) {
    window.location.href = rootPath() + "login.html";
    return null;
  }
  return session;
}
