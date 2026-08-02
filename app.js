// =====================================================
// app.js - Main Application Logic
// =====================================================

// Telegram Bot Credentials
const BOT_TOKEN = "8930473093:AAFcb_mDHowfLzR9Eo0oqmGTks3kyXflBqU";
const ADMIN_CHAT_ID = "6444898588";

// Track Paid/Submitted Courses in Browser LocalStorage
const paidCourses = new Set(JSON.parse(localStorage.getItem('paidCourses') || '[]'));
let selectedCourseForPayment = null;
let selectedReceiptFile = null;

// 5-Minute Timer Controls (300 seconds)
const WAIT_TIME_SECONDS = 5 * 60; 
let countdownInterval = null;

// Initializer
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupSearchFilter();

  if (typeof coursesData !== "undefined") {
    renderCourses(coursesData);
  } else {
    console.error("[EDU Platform] Error: coursesData not loaded.");
  }
});

// Navigation Setup
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-item-link');
  const pageSections = document.querySelectorAll('.page-section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');

      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');

      pageSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === target) section.classList.add('active');
      });
    });
  });
}

// Live Search Filter
function setupSearchFilter() {
  const searchInput = document.getElementById("course-search-input");
  if (!searchInput || typeof coursesData === "undefined") return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = coursesData.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query)
    );
    renderCourses(filtered);
  });
}

// Render Software & AI Tools Grid
document.addEventListener("DOMContentLoaded", () => {
  renderSoftwareCatalog();
});

function renderSoftwareCatalog() {
  const container = document.getElementById("software-container");
  if (!container || typeof softwareData === "undefined") return;

  container.innerHTML = "";

  softwareData.forEach((item, index) => {
    const isPaid = paidCourses.has(item.id);
    const imagePath = item.image || `images/${(index % 12) + 1}.jpg`;

    const col = document.createElement("div");
    col.className = "col-6 col-md-4";

    col.innerHTML = `
      <div class="card h-100 border shadow-sm overflow-hidden d-flex flex-column justify-content-between rounded-3">
        <div>
          <div class="position-relative overflow-hidden bg-light course-img-box">
            <img 
              src="${imagePath}" 
              alt="${item.title}" 
              class="w-100 h-100 object-fit-cover d-block"
              style="height: 160px; object-fit: cover;"
              onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80'"
            />
            <span class="position-absolute top-0 end-0 m-2 badge bg-danger text-white extra-small">
              <i class="fa-solid fa-bolt me-1"></i>${item.badgeText}
            </span>
          </div>

          <div class="p-2 p-md-3">
            <h3 class="h6 fw-bold text-dark mb-1 text-truncate" style="font-size: 0.88rem;" title="${item.title}">
              ${item.title}
            </h3>
            <p class="text-muted extra-small mb-1 course-desc-clamp">
              ${item.description}
            </p>
          </div>
        </div>

        <div class="px-2 pb-2 px-md-3 pb-md-3">
          <button class="btn ${isPaid ? 'btn-info text-white' : 'btn-outline-primary'} btn-sm w-100 fw-semibold btn-compact" onclick="openSoftwareModal('${item.id}')">
            ${isPaid ? '<i class="fa-brands fa-telegram me-1"></i> ចូល Telegram Group' : `<i class="fa-solid fa-cart-shopping me-1"></i> ទិញ ${item.price}`}
          </button>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

// Render Software Catalog on Page Load
document.addEventListener("DOMContentLoaded", () => {
  renderSoftwareCatalog();
});

// Render Function for Software & AI Grid
function renderSoftwareCatalog() {
  const container = document.getElementById("software-container");
  if (!container || typeof softwareData === "undefined") return;

  container.innerHTML = "";

  softwareData.forEach((item, index) => {
    const isPaid = paidCourses.has(item.id);
    const imagePath = item.image || `images/${(index % 12) + 1}.jpg`;

    const col = document.createElement("div");
    col.className = "col-6 col-md-4";

    col.innerHTML = `
      <div class="card h-100 border shadow-sm overflow-hidden d-flex flex-column justify-content-between rounded-3">
        <div>
          <!-- Image Box -->
          <div class="position-relative overflow-hidden bg-light course-img-box">
            <img 
              src="${imagePath}" 
              alt="${item.title}" 
              class="w-500 object-fit-cover d-block"
              style="height: 100px; object-fit: cover;"
              onerror="this.src='https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80'"
            />
            <span class="position-absolute top-0 end-0 m-2 badge bg-danger text-white extra-small">
              <i class="fa-solid fa-bolt me-1"></i>${item.badgeText}
            </span>
          </div>

          <!-- Card Content -->
          <div class="p-2 p-md-3">
            <h3 class="h6 fw-bold text-dark mb-1 text-truncate" style="font-size: 0.88rem;" title="${item.title}">
              ${item.title}
            </h3>
            <p class="text-muted extra-small mb-1 course-desc-clamp">
              ${item.description}
            </p>
          </div>
        </div>

        <!-- Action Button -->
        <div class="px-2 pb-2 px-md-3 pb-md-3">
          <button class="btn ${isPaid ? 'btn-info text-white' : 'btn-outline-primary'} btn-sm w-100 fw-semibold btn-compact" onclick="openSoftwareModal('${item.id}')">
            ${isPaid ? '<i class="fa-brands fa-telegram me-1"></i> ចូល Telegram Group' : `<i class="fa-solid fa-cart-shopping me-1"></i> ទិញ ${item.price}`}
          </button>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

// Open Software Payment Modal
function openSoftwareModal(softwareId) {
  if (typeof softwareData === "undefined") return;
  const item = softwareData.find(s => s.id === softwareId);
  if (!item) return;

  selectedCourseForPayment = item;

  // If already paid in browser memory, directly open Telegram group
  if (paidCourses.has(softwareId)) {
    window.open(item.telegramLink || "https://t.me/YourDefaultTelegramGroup", "_blank");
    return;
  }

  showPaymentModal(item);
}

// Global scope export
window.openSoftwareModal = openSoftwareModal;

// Global Export
window.openSoftwareModal = openSoftwareModal;

// Render Courses Grid
function renderCourses(courses) {
  const container = document.getElementById("courses-container");
  if (!container) return;

  container.innerHTML = "";

  if (!courses || courses.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5 text-muted">
        <i class="fa-solid fa-magnifying-glass fs-2 mb-2"></i>
        <p>រកមិនឃើញវគ្គសិក្សាដែលត្រូវនឹងពាក្យស្វែងរករបស់អ្នកទេ។</p>
      </div>
    `;
    return;
  }

  courses.forEach((course, index) => {
    const isPaid = paidCourses.has(course.id);
    const imagePath = course.image || `images/${(index % 27) + 1}.jpg`;

    const col = document.createElement("div");
    col.className = "col-6 col-md-4";

    col.innerHTML = `
      <div class="card h-100 border shadow-sm overflow-hidden d-flex flex-column justify-content-between rounded-3">
        <div>
          <div class="position-relative overflow-hidden bg-light course-img-box">
            <img 
              src="${imagePath}" 
              alt="${course.title}" 
              class="w-50 h-50 object-fit-cover align-self-center d-block mx-auto"
              onerror="this.src='https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80'"
            />
            <span class="position-absolute top-0 end-0 m-1 m-md-2 badge bg-dark bg-opacity-75 extra-small">
              <i class="fa-solid ${course.icon || 'fa-book'} text-info me-1"></i>${course.badgeText || 'វគ្គសិក្សា'}
            </span>
          </div>

          <div class="p-2 p-md-3">
            <h3 class="h6 fw-bold text-dark mb-1 text-truncate" style="font-size: 0.88rem;" title="${course.title}">
              ${course.title}
            </h3>
            <p class="text-muted extra-small mb-1 course-desc-clamp">
              ${course.description}
            </p>
          </div>
        </div>

        <div class="px-2 pb-2 px-md-3 pb-md-3">
          <button class="btn ${isPaid ? 'btn-info text-white' : 'btn-primary'} btn-sm w-100 fw-semibold btn-compact" onclick="openCourse('${course.id}')">
            ${isPaid ? '<i class="fa-brands fa-telegram me-1"></i> ចូល Telegram Group' : '<i class="fa-solid fa-lock me-1"></i> បង់ $0.99'}
          </button>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

// Open Payment Modal or Redirect to Telegram
function openCourse(courseId) {
  if (typeof coursesData === "undefined") return;
  const course = coursesData.find(c => c.id === courseId);
  if (!course) return;

  selectedCourseForPayment = course;

  // If already paid and saved in browser memory, go directly to Telegram
  if (paidCourses.has(courseId)) {
    window.open(course.telegramLink || "https://t.me/YourDefaultTelegramGroup", "_blank");
    return;
  }

  showPaymentModal(course);
}

// Show Payment Modal
function showPaymentModal(course) {
  const modalTitle = document.getElementById('paymentModalTitle');
  if (modalTitle) modalTitle.textContent = `បង់ប្រាក់ដើម្បីចូលរៀន៖ ${course.title}`;

  // Reset File & Inputs
  const fileInput = document.getElementById('receipt-file-input');
  if (fileInput) {
    fileInput.value = "";
    fileInput.disabled = false;
  }
  selectedReceiptFile = null;

  // Reset Buttons
  const confirmBtn = document.getElementById('btn-confirm-payment');
  if (confirmBtn) {
    confirmBtn.classList.add('disabled');
    confirmBtn.classList.remove('d-none');
    confirmBtn.disabled = false;
    confirmBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-1"></i> ផ្ញើវិក្កយបត្រ / បង់ប្រាក់រួចរាល់';
  }

  const telegramBtn = document.getElementById('btn-telegram-group');
  if (telegramBtn) telegramBtn.classList.add('d-none');

  // Reset Timer Display
  const timerContainer = document.getElementById('payment-timer-container');
  if (timerContainer) timerContainer.classList.add('d-none');

  const alertBox = document.getElementById('receipt-upload-alert');
  if (alertBox) alertBox.classList.add('d-none');

  if (countdownInterval) clearInterval(countdownInterval);

  const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
  paymentModal.show();
}

// Handle File Selection
function handleReceiptFileSelect() {
  const fileInput = document.getElementById('receipt-file-input');
  const confirmBtn = document.getElementById('btn-confirm-payment');

  if (fileInput && fileInput.files.length > 0) {
    selectedReceiptFile = fileInput.files[0];
    confirmBtn?.classList.remove('disabled');
  } else {
    selectedReceiptFile = null;
    confirmBtn?.classList.add('disabled');
  }
}

// Submit Receipt to Telegram Bot & Trigger 5-Minute Timer
async function submitReceiptAndConfirm() {
  if (!selectedReceiptFile || !selectedCourseForPayment) return;

  const confirmBtn = document.getElementById('btn-confirm-payment');
  const fileInput = document.getElementById('receipt-file-input');
  const alertBox = document.getElementById('receipt-upload-alert');

  confirmBtn.disabled = true;
  confirmBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> កំពុងផ្ញើវិក្កយបត្រ...';

  // Prepare FormData for Telegram sendPhoto API
  const formData = new FormData();
  formData.append("chat_id", ADMIN_CHAT_ID);
  formData.append("photo", selectedReceiptFile);
  formData.append("caption", `
🧾 <b>វិក្កយបត្របង់ប្រាក់ថ្មី ($0.99)</b>

📚 <b>វគ្គសិក្សា៖</b> ${selectedCourseForPayment.title} (ID: ${selectedCourseForPayment.id})
⏰ <b>ម៉ោងផ្ញើ៖</b> ${new Date().toLocaleString('km-KH')}
ℹ️ <i>សូមពិនិត្យ និងរៀបចំទទួលសិស្សចូល Group។</i>
  `.trim());
  formData.append("parse_mode", "HTML");

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.ok) {
      // Hide submit button & disable file input
      confirmBtn.classList.add('d-none');
      if (fileInput) fileInput.disabled = true;

      if (alertBox) {
        alertBox.className = "alert alert-success py-2 extra-small mb-2";
        alertBox.innerHTML = '<i class="fa-solid fa-circle-check me-1"></i> បានផ្ញើវិក្កយបត្រជោគជ័យ! សូមរង់ចាំ Admin ពិនិត្យរយៈពេល <b>៥ នាទី</b>...';
        alertBox.classList.remove('d-none');
      }

      // Start 5-Minute Countdown
      start5MinuteCountdown();

    } else {
      throw new Error(data.description || "មិនអាចផ្ញើវិក្កយបត្របានទេ។");
    }
  } catch (error) {
    if (alertBox) {
      alertBox.className = "alert alert-danger py-2 extra-small mb-2";
      alertBox.textContent = "មានកំហុសក្នុងការផ្ញើវិក្កយបត្រ។ សូមព្យាយាមម្តងទៀត។";
      alertBox.classList.remove('d-none');
    }
    confirmBtn.disabled = false;
    confirmBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-1"></i> ផ្ញើវិក្កយបត្រ / បង់ប្រាក់រួចរាល់';
    console.error("Upload Error:", error);
  }
}

// 5-Minute Countdown Function
function start5MinuteCountdown() {
  const timerContainer = document.getElementById('payment-timer-container');
  const timerDisplay = document.getElementById('timer-countdown');
  const telegramBtn = document.getElementById('btn-telegram-group');

  if (timerContainer) timerContainer.classList.remove('d-none');

  let timeLeft = WAIT_TIME_SECONDS; // 300 seconds

  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    timeLeft--;

    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    if (timerDisplay) timerDisplay.textContent = `${minutes}:${seconds}`;

    // Timer Finished (5 Minutes Reached)
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);

      // Save course status to localStorage
      paidCourses.add(selectedCourseForPayment.id);
      localStorage.setItem('paidCourses', JSON.stringify(Array.from(paidCourses)));

      // Hide timer & show blue Telegram button
      if (timerContainer) timerContainer.classList.add('d-none');

      if (telegramBtn) {
        telegramBtn.href = selectedCourseForPayment.telegramLink || "https://t.me/YourDefaultTelegramGroup";
        telegramBtn.classList.remove('d-none');
      }

      // Update grid buttons
      renderCourses(coursesData);
    }
  }, 1000);
}

// Contact Form Handler for Telegram Bot
async function sendTelegramMessage(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  
  const submitBtn = document.getElementById("btn-send-message");
  const alertBox = document.getElementById("telegram-alert");

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> កំពុងផ្ញើ...';

  const telegramMessage = `
📩 <b>សារថ្មីពីទម្រង់ទំនាក់ទំនង</b>

👤 <b>ឈ្មោះ៖</b> ${name}
📧 <b>អ៊ីមែល៖</b> ${email}
📝 <b>សារ៖</b>
${message}
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    });

    const data = await response.json();

    if (data.ok) {
      if (alertBox) {
        alertBox.className = "alert alert-success py-2 small";
        alertBox.textContent = "សាររបស់អ្នកត្រូវបានផ្ញើទៅកាន់ Telegram ដោយជោគជ័យ!";
        alertBox.classList.remove("d-none");
      }
      document.getElementById("contact-form").reset();
    } else {
      throw new Error(data.description || "បរាជ័យក្នុងការផ្ញើសារ។");
    }
  } catch (error) {
    if (alertBox) {
      alertBox.className = "alert alert-danger py-2 small";
      alertBox.textContent = "មានកំហុសក្នុងការផ្ញើសារ។ សូមព្យាយាមម្តងទៀត។";
      alertBox.classList.remove("d-none");
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane me-1"></i> ផ្ញើសារ';
  }
}

// Global Exports
window.openCourse = openCourse;
window.handleReceiptFileSelect = handleReceiptFileSelect;
window.submitReceiptAndConfirm = submitReceiptAndConfirm;
window.sendTelegramMessage = sendTelegramMessage;