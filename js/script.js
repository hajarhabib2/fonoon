// ============================================
// Configuration - EmailJS Credentials
// ============================================
const EMAILJS_PUBLIC_KEY = "ksmlMnP2AdvOZSgf1";
const EMAILJS_SERVICE_ID = "service_s7zncnw";
const EMAILJS_TEMPLATE_ID = "template_w1gotjm";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // DOM Elements
  // ============================================
  const contactForm = document.getElementById("contact-form");
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const formInputs = contactForm.querySelectorAll(".form-control");

  // ============================================
  // Initialize EmailJS
  // ============================================
  emailjs.init(EMAILJS_PUBLIC_KEY);

  // ============================================
  // Responsive Input Sizing
  // ============================================
  function handleResize() {
    const isMobile = window.innerWidth < 768;
    formInputs.forEach((input) => {
      input.style.fontSize = isMobile ? "16px" : "";
    });
  }

  window.addEventListener("resize", handleResize);
  handleResize();

  // ============================================
  // Validation Functions
  // ============================================
  function showError(input, message) {
    removeError(input);
    input.classList.add("is-invalid");
    const errorDiv = document.createElement("div");
    errorDiv.className = "invalid-feedback d-block";
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
  }

  function removeError(input) {
    input.classList.remove("is-invalid");
    const existingError =
      input.parentElement.querySelector(".invalid-feedback");
    existingError?.remove();
  }

  function validateField(input) {
    const value = input.value.trim();

    if (input.type === "text" && !value) {
      showError(input, "This field is required");
      return false;
    }
    if (input.type === "email") {
      if (!value) {
        showError(input, "This field is required");
        return false;
      }
      if (!EMAIL_REGEX.test(value)) {
        showError(input, "Please enter a valid email");
        return false;
      }
    }
    if (input.tagName === "TEXTAREA" && !value) {
      showError(input, "This field is required");
      return false;
    }

    removeError(input);
    return true;
  }

  function validateForm() {
    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector("textarea");

    const fields = [nameInput, emailInput, messageInput];
    const isValid = fields.every(validateField);

    if (!isValid) {
      fields.find((f) => f.classList.contains("is-invalid"))?.focus();
    }

    return isValid;
  }

  // ============================================
  // Alert Functions
  // ============================================
  function showAlert(type, message, duration = 5000) {
    const selector = `.alert-${type}`;
    document.querySelector(selector)?.remove();

    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.setAttribute("role", "alert");
    alertDiv.innerHTML = `
      <i class="fa-solid fa-${type === "success" ? "check-circle" : "circle-exclamation"} me-2"></i>
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    contactForm.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), duration);
  }

  // ============================================
  // Form Submission
  // ============================================
  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector("textarea");

    const templateParams = {
      from_name: nameInput.value.trim(),
      from_email: emailInput.value.trim(),
      message: messageInput.value.trim(),
    };
    console.log("Checking captured data:", templateParams);
    // Loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
    submitBtn.disabled = true;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
      );
      contactForm.reset();
      showAlert(
        "success",
        "Message sent successfully! We'll get back to you soon.",
      );
    } catch (error) {
      console.error("EmailJS Error:", error);
      showAlert("danger", "Failed to send message. Please try again later.");
    } finally {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  }

  // ============================================
  // Event Listeners
  // ============================================
  // Real-time validation
  formInputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => removeError(input));
  });

  // Form submission
  contactForm.addEventListener("submit", handleSubmit);

  // Smooth scroll for contact links
  document.querySelectorAll('a[href="#contact"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
