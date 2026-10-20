/**
 * ============================================================================
 * Aarohi Sangeetalaya - Main Interactive Script
 * Features: Mobile Nav, Video Switcher, Gallery Lightbox,
 * Secure Admin Event Photo Uploader (with auto-compression & auto-fit),
 * Global Trial Class Modal & WhatsApp Direct Integration.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. ACADEMY CONFIGURATION (Easily customize here!)
// ----------------------------------------------------------------------------
const ACADEMY_CONFIG = {
  name: "Aarohi Sangeetalaya",
  phone: "+91 98765 43210",              // Display phone
  whatsappNumber: "919999999999",        // WhatsApp number for enquiries (Country code + 10 digits)
  email: "aarohisangeetalaya@gmail.com",
  youtubeChannelUrl: "https://www.youtube.com/@AarohiSangeetalaya",
  adminPin: "1212",                      // Secret Admin PIN to upload/manage photos (Change to any 4 digits!)
  
  // Curated Indian Classical Performances
  featuredVideos: [
    {
      id: "UBYqv21c0Yk",
      title: "Kathak Classical Dance Recital - Rhythm & Expressions",
      category: "Kathak Classical Dance",
      desc: "Graceful mudras, intricate tatkar footwork, and storytelling in traditional Kathak presentation."
    },
    {
      id: "FjHGZj2IjBk",
      title: "Tabla Solo in Teental - Taal & Laya Demonstration",
      category: "Tabla Percussion",
      desc: "Mastery of beats, relas, kaydas, and classical accompaniment on Indian tabla."
    },
    {
      id: "gNvy5y706aY",
      title: "Hindustani Classical Vocal - Raga Yaman & Swara Practice",
      category: "Classical Vocal",
      desc: "Soulful classical vocal training, voice culture, and alankars guided by our Gurus."
    },
    {
      id: "q_rQfP4-d_w",
      title: "Harmonium Lehra & Classical Compositions",
      category: "Harmonium & Keyboard",
      desc: "Authentic harmonium accompaniment for classical ragas, bhajans, and semi-classical melodies."
    }
  ]
};

// ----------------------------------------------------------------------------
// 2. DOCUMENT INITIALIZATION
// ----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initBookingModal();
  initVideoShowcase();
  initGallery();
  initFAQ();
  initContactForm();
  initScrollAnimations();
});

// ----------------------------------------------------------------------------
// 3. MOBILE NAVIGATION DRAWER & BACKDROP OVERLAY
// ----------------------------------------------------------------------------
function initMobileNav() {
  const toggleBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (!toggleBtn || !nav) return;

  // Create backdrop overlay element if not present
  let overlay = document.querySelector(".nav-backdrop-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "nav-backdrop-overlay";
    document.body.appendChild(overlay);
  }

  const openNav = () => {
    nav.classList.add("active");
    overlay.classList.add("active");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.innerHTML = "✕";
    document.body.style.overflow = "hidden";
  };

  const closeNav = () => {
    nav.classList.remove("active");
    overlay.classList.remove("active");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.innerHTML = "☰";
    document.body.style.overflow = "";
  };

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (nav.classList.contains("active")) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Prevent clicks inside the drawer from bubbling to the background overlay
  nav.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Close when clicking overlay
  overlay.addEventListener("click", (e) => {
    e.stopPropagation();
    closeNav();
  });

  // Close button inside the mobile drawer
  const drawerCloseBtn = nav.querySelector(".nav-drawer-close");
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeNav();
    });
  }

  // Close when clicking nav links
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      closeNav();
    }
  });
}

// ----------------------------------------------------------------------------
// 4. GLOBAL BOOK FREE TRIAL / ENQUIRY MODAL
// ----------------------------------------------------------------------------
function initBookingModal() {
  const modal = document.getElementById("bookingModal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".modal-close-icon");
  const form = document.getElementById("bookingForm");
  const courseSelect = document.getElementById("bookingCourseSelect");

  // Open modal buttons
  document.querySelectorAll(".btn-book-demo, .open-enquiry-modal").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const course = btn.getAttribute("data-course");
      if (course && courseSelect) {
        courseSelect.value = course;
      }
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (form) {
    // 1. Submit via WhatsApp
    const sendWhatsappBtn = document.getElementById("btnModalWhatsapp");
    if (sendWhatsappBtn) {
      sendWhatsappBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const name = document.getElementById("modalStudentName")?.value.trim() || "Student";
        const phone = document.getElementById("modalStudentPhone")?.value.trim() || "";
        const course = courseSelect ? courseSelect.value : "Indian Classical Arts";
        const timing = document.getElementById("modalPreferredTiming")?.value || "Flexible";
        const note = document.getElementById("modalNotes")?.value.trim() || "Interested in joining classes.";

        const message = `*Admission & Trial Class Enquiry - ${ACADEMY_CONFIG.name}*%0A%0A` +
          `👤 *Name:* ${encodeURIComponent(name)}%0A` +
          `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
          `🎨 *Course:* ${encodeURIComponent(course)}%0A` +
          `⏰ *Timing:* ${encodeURIComponent(timing)}%0A` +
          `💬 *Query:* ${encodeURIComponent(note)}`;

        window.open(`https://wa.me/${ACADEMY_CONFIG.whatsappNumber}?text=${message}`, "_blank");
        showToast("Opening WhatsApp with your enquiry...");
        closeModal();
        form.reset();
      });
    }

    // 2. Regular Form Submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thank you! Your trial request has been registered. Our Guruji/counselor will contact you shortly.");
      closeModal();
      form.reset();
    });
  }
}

// ----------------------------------------------------------------------------
// 5. YOUTUBE VIDEO SHOWCASE
// ----------------------------------------------------------------------------
function initVideoShowcase() {
  const playerFrame = document.getElementById("featuredVideoIframe");
  const videoTitle = document.getElementById("featuredVideoTitle");
  const videoDesc = document.getElementById("featuredVideoDesc");
  const playlistContainer = document.getElementById("videoPlaylistItems");

  if (!playerFrame || !playlistContainer) return;

  playlistContainer.innerHTML = "";
  ACADEMY_CONFIG.featuredVideos.forEach((video, idx) => {
    const itemBtn = document.createElement("button");
    itemBtn.className = `video-item-btn ${idx === 0 ? "active" : ""}`;
    itemBtn.setAttribute("data-id", video.id);
    itemBtn.setAttribute("aria-label", `Play video: ${video.title}`);
    itemBtn.innerHTML = `
      <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}" class="video-thumb-preview" onerror="this.src='images/hero-bg.jpg'">
      <div class="video-item-info">
        <h4>${video.title}</h4>
        <span>${video.category}</span>
      </div>
    `;

    itemBtn.addEventListener("click", () => {
      playlistContainer.querySelectorAll(".video-item-btn").forEach(b => b.classList.remove("active"));
      itemBtn.classList.add("active");

      playerFrame.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`;
      if (videoTitle) videoTitle.textContent = video.title;
      if (videoDesc) videoDesc.textContent = video.desc;
    });

    playlistContainer.appendChild(itemBtn);
  });
}

// ----------------------------------------------------------------------------
// 6. GALLERY, LIGHTBOX, AUTO-RESIZER & ADMIN PHOTO UPLOADER
// ----------------------------------------------------------------------------
function initGallery() {
  const galleryGrid = document.getElementById("galleryGrid");
  if (!galleryGrid) return;

  // Stored uploaded photos from localStorage
  loadCustomUploadedPhotos(galleryGrid);

  // Filter Buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      const items = galleryGrid.querySelectorAll(".gallery-card");

      items.forEach(item => {
        const category = item.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          item.style.display = "inline-block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Lightbox Logic
  initLightbox(galleryGrid);

  // Admin Photo Uploader & Passcode Logic
  initAdminPhotoUploader(galleryGrid);
}

function initLightbox(galleryGrid) {
  const modal = document.getElementById("lightboxModal");
  if (!modal) return;

  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCategory = document.getElementById("lightboxCategory");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  let currentIndex = 0;
  let visibleCards = [];

  const updateVisibleCards = () => {
    visibleCards = Array.from(galleryGrid.querySelectorAll(".gallery-card")).filter(
      card => card.style.display !== "none"
    );
  };

  const showImageAtIndex = (idx) => {
    updateVisibleCards();
    if (visibleCards.length === 0) return;

    if (idx < 0) idx = visibleCards.length - 1;
    if (idx >= visibleCards.length) idx = 0;

    currentIndex = idx;
    const card = visibleCards[currentIndex];
    const img = card.querySelector("img");
    const title = card.querySelector("h4")?.textContent || "Aarohi Sangeetalaya Performance";
    const category = card.querySelector("span")?.textContent || "Academy Event";

    lightboxImg.src = img.src;
    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category;
  };

  // Open Lightbox on card click (ignoring delete button clicks)
  galleryGrid.addEventListener("click", (e) => {
    if (e.target.closest(".delete-custom-photo-btn")) return;
    const card = e.target.closest(".gallery-card");
    if (!card) return;

    updateVisibleCards();
    currentIndex = visibleCards.indexOf(card);
    showImageAtIndex(currentIndex);
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  const closeLightbox = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });

  if (prevBtn) prevBtn.addEventListener("click", () => showImageAtIndex(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showImageAtIndex(currentIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "ArrowLeft") showImageAtIndex(currentIndex - 1);
    if (e.key === "ArrowRight") showImageAtIndex(currentIndex + 1);
    if (e.key === "Escape") closeLightbox();
  });
}

/**
 * Image Auto-Compressor & Auto-Fitter Utility
 * Automatically handles photos of ANY size (up to 40MB from phones or DSLRs),
 * scales them down to web standard 1200px max dimension, maintains aspect ratio,
 * and outputs a lightweight compressed JPEG.
 */
function compressAndResizeImage(file, maxWidth = 1200, maxHeight = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional dimensions
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        // High quality bicubic interpolation
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to web-friendly JPEG
        const compressedData = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedData);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function initAdminPhotoUploader(galleryGrid) {
  const uploadBtn = document.getElementById("btnOpenUploadModal");
  const uploadModal = document.getElementById("uploadModal");
  const pinModal = document.getElementById("adminPinModal");
  const pinForm = document.getElementById("adminPinForm");
  const pinInput = document.getElementById("adminPinInput");
  const statusBadge = document.getElementById("adminStatusBadge");
  const lockBtn = document.getElementById("btnLockAdmin");

  if (!uploadBtn) return;

  const isAdmin = () => sessionStorage.getItem("aarohi_admin_auth") === "true";

  const updateAdminUI = () => {
    const authed = isAdmin();
    if (statusBadge) statusBadge.style.display = authed ? "inline-flex" : "none";
    if (uploadBtn) {
      uploadBtn.innerHTML = authed ? "📸 Add Event Photos" : "🔒 Admin: Add Event Photos";
    }

    // Toggle delete buttons on custom photos
    document.querySelectorAll(".delete-custom-photo-btn").forEach(btn => {
      btn.style.display = authed ? "inline-flex" : "none";
    });
  };

  updateAdminUI();

  // Click on "Add Event Photos"
  uploadBtn.addEventListener("click", () => {
    if (isAdmin()) {
      if (uploadModal) {
        uploadModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    } else {
      if (pinModal) {
        pinModal.classList.add("active");
        if (pinInput) {
          pinInput.value = "";
          setTimeout(() => pinInput.focus(), 150);
        }
        document.body.style.overflow = "hidden";
      }
    }
  });

  // Admin PIN submission
  if (pinForm) {
    pinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredPin = pinInput.value.trim();
      if (enteredPin === ACADEMY_CONFIG.adminPin) {
        sessionStorage.setItem("aarohi_admin_auth", "true");
        pinModal.classList.remove("active");
        updateAdminUI();
        showToast("🔓 Admin Mode Unlocked! You can now upload and delete photos.");
        if (uploadModal) {
          uploadModal.classList.add("active");
        }
      } else {
        alert("Incorrect Admin PIN. Please try again. (Default PIN: 1212)");
        pinInput.focus();
      }
    });
  }

  // Lock admin mode
  if (lockBtn) {
    lockBtn.addEventListener("click", () => {
      sessionStorage.removeItem("aarohi_admin_auth");
      updateAdminUI();
      showToast("🔒 Admin Mode Locked.");
    });
  }

  // Close modals
  [pinModal, uploadModal].forEach(modal => {
    if (!modal) return;
    const closeBtn = modal.querySelector(".modal-close-icon");
    const closeModal = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    };
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  });

  // Photo File Input & Live Preview
  const fileInput = document.getElementById("photoFileInput");
  const previewImg = document.getElementById("uploadPhotoPreview");
  const uploadPhotoForm = document.getElementById("uploadPhotoForm");

  if (fileInput) {
    fileInput.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (file && previewImg) {
        try {
          const previewData = await compressAndResizeImage(file, 600, 450, 0.7);
          previewImg.src = previewData;
          previewImg.style.display = "block";
        } catch (err) {
          console.warn("Preview error", err);
        }
      }
    });
  }

  // Handle Photo Upload
  if (uploadPhotoForm) {
    uploadPhotoForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const file = fileInput.files[0];
      if (!file) {
        alert("Please select a photo to upload.");
        return;
      }

      const title = document.getElementById("photoTitleInput")?.value.trim() || "Academy Event Photo";
      const category = document.getElementById("photoCategoryInput")?.value || "events";

      showToast("Optimizing and fitting your photo...");

      try {
        // Auto-compress and auto-fit any photo size into optimal web dimensions
        const compressedBase64 = await compressAndResizeImage(file, 1280, 960, 0.85);

        const photoObj = {
          id: Date.now(),
          title: title,
          category: category,
          src: compressedBase64
        };

        saveCustomPhoto(photoObj);
        createGalleryCard(galleryGrid, photoObj, true);

        showToast("📸 Event photo uploaded and fitted into gallery!");
        if (uploadModal) uploadModal.classList.remove("active");
        document.body.style.overflow = "";
        uploadPhotoForm.reset();
        if (previewImg) previewImg.style.display = "none";
        updateAdminUI();
      } catch (err) {
        alert("Failed to process image: " + err);
      }
    });
  }
}

function saveCustomPhoto(photoObj) {
  try {
    const existing = JSON.parse(localStorage.getItem("aarohi_custom_photos") || "[]");
    existing.unshift(photoObj);
    localStorage.setItem("aarohi_custom_photos", JSON.stringify(existing));
  } catch (err) {
    console.warn("Storage quota exceeded or storage error", err);
  }
}

function loadCustomUploadedPhotos(galleryGrid) {
  try {
    const existing = JSON.parse(localStorage.getItem("aarohi_custom_photos") || "[]");
    existing.forEach(photo => {
      createGalleryCard(galleryGrid, photo, false);
    });
  } catch (err) {
    console.error("Failed to load custom photos", err);
  }
}

function createGalleryCard(galleryGrid, photoObj, prepend = false) {
  const card = document.createElement("div");
  card.className = "gallery-card";
  card.setAttribute("data-category", photoObj.category);
  card.setAttribute("data-id", photoObj.id);

  const isAdmin = sessionStorage.getItem("aarohi_admin_auth") === "true";

  card.innerHTML = `
    <button class="delete-custom-photo-btn" title="Delete this photo" style="display: ${isAdmin ? 'inline-flex' : 'none'};">
      🗑️ Delete
    </button>
    <img src="${photoObj.src}" alt="${photoObj.title}" loading="lazy">
    <div class="gallery-card-overlay">
      <h4>${photoObj.title}</h4>
      <span>${formatCategoryName(photoObj.category)}</span>
    </div>
  `;

  // Delete button logic
  const deleteBtn = card.querySelector(".delete-custom-photo-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm(`Are you sure you want to delete "${photoObj.title}" from the gallery?`)) {
        removeCustomPhoto(photoObj.id);
        card.remove();
        showToast("Photo removed from gallery.");
      }
    });
  }

  if (prepend && galleryGrid.firstChild) {
    galleryGrid.insertBefore(card, galleryGrid.firstChild);
  } else {
    galleryGrid.appendChild(card);
  }
}

function removeCustomPhoto(id) {
  try {
    const existing = JSON.parse(localStorage.getItem("aarohi_custom_photos") || "[]");
    const filtered = existing.filter(p => p.id !== id);
    localStorage.setItem("aarohi_custom_photos", JSON.stringify(filtered));
  } catch (err) {
    console.error("Failed to remove photo", err);
  }
}

function formatCategoryName(cat) {
  const map = {
    events: "Stage Events & Annual Day",
    kathak: "Kathak Classical Dance",
    tabla: "Tabla & Percussion",
    vocal: "Vocal & Harmonium",
    arts: "Fine Arts & Drawing"
  };
  return map[cat] || "Academy Special";
}

// ----------------------------------------------------------------------------
// 7. FAQ ACCORDION
// ----------------------------------------------------------------------------
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach(i => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });
}

// ----------------------------------------------------------------------------
// 8. CONTACT FORM HANDLER
// ----------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const phone = document.getElementById("phone")?.value.trim() || "";
    const subject = document.getElementById("subject")?.value.trim() || "General Admission Enquiry";
    const message = document.getElementById("message")?.value.trim() || "";

    const fullText = `*New Website Enquiry - ${ACADEMY_CONFIG.name}*%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(name)}%0A` +
      `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
      `✉️ *Email:* ${encodeURIComponent(email)}%0A` +
      `🎯 *Subject:* ${encodeURIComponent(subject)}%0A` +
      `📝 *Message:* ${encodeURIComponent(message)}`;

    const waUrl = `https://wa.me/${ACADEMY_CONFIG.whatsappNumber}?text=${fullText}`;
    window.open(waUrl, "_blank");

    showToast("Thank you! Opening WhatsApp to send your message directly to our admissions team.");
    form.reset();
  });
}

// ----------------------------------------------------------------------------
// 9. SCROLL ANIMATIONS
// ----------------------------------------------------------------------------
function initScrollAnimations() {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".course-card, .feature-box, .testimonial-card, .stat-item").forEach(el => {
    observer.observe(el);
  });
}

// ----------------------------------------------------------------------------
// 10. TOAST NOTIFICATION UTILITY
// ----------------------------------------------------------------------------
function showToast(message) {
  let toast = document.getElementById("globalToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "globalToast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span> <div>${message}</div>`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}
