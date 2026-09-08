/**
 * Authentication and shared utilities for Student Management System
 */

// Automatically resolve API Base URL (if hosted on another port like 3000/5500, point to 8080)
const API_BASE_URL = (window.location.port === "8080" || window.location.port === "")
    ? window.location.origin
    : "http://localhost:8080";

const AUTH_TOKEN_KEY = "sms_jwt_token";
const AUTH_USER_KEY = "sms_user_data";

/**
 * Save authentication token and user details to localStorage
 */
function saveAuth(data) {
    if (data.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    }
    const user = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: data.role
    };
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

/**
 * Get the stored JWT token
 */
function getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Get the stored user object
 */
function getUser() {
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    try {
        return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
        return null;
    }
}

/**
 * Check if the user is currently authenticated
 */
function isAuthenticated() {
    const token = getToken();
    return !!token;
}

/**
 * Clear authentication data and logout
 */
function logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    window.location.href = "login.html";
}

/**
 * Guard protected pages - redirect to login if unauthenticated
 */
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = "login.html";
    }
}

/**
 * Guard login/public pages - redirect to dashboard if already authenticated
 */
function redirectIfAuth() {
    if (isAuthenticated()) {
        window.location.href = "dashboard.html";
    }
}

/**
 * Authenticated fetch helper that injects Bearer token and JSON headers
 */
async function authFetch(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        if (response.status === 401) {
            // Unauthorized / Token expired
            showToast("Session expired. Please log in again.", "error");
            setTimeout(() => {
                logout();
            }, 1200);
            throw new Error("Unauthorized");
        }

        return response;
    } catch (error) {
        if (error.message !== "Unauthorized") {
            console.error("Fetch error:", error);
        }
        throw error;
    }
}

/**
 * Display a modern toast notification
 */
function showToast(message, type = "success") {
    let container = document.getElementById("customToastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "customToastContainer";
        container.className = "toast-container-custom";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-custom toast-${type}`;
    const iconClass = (type === "success") ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill";
    
    toast.innerHTML = `
        <i class="bi ${iconClass} fs-5"></i>
        <div class="flex-grow-1">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

/**
 * Initialize navbar elements (User name, avatar, logout handlers, mobile sidebar)
 */
function initNavbarAndSidebar() {
    const user = getUser();
    const userNameElements = document.querySelectorAll(".user-name-text");
    const userAvatarElements = document.querySelectorAll(".user-avatar");

    if (user) {
        const displayName = user.username || "Admin";
        userNameElements.forEach(el => el.textContent = displayName);
        userAvatarElements.forEach(el => el.textContent = displayName.charAt(0).toUpperCase());
    }

    // Attach logout event listeners
    const logoutButtons = document.querySelectorAll(".btn-logout-action");
    logoutButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("Are you sure you want to log out?")) {
                logout();
            }
        });
    });

    // Mobile sidebar toggle
    const toggleBtn = document.getElementById("sidebarToggleBtn");
    const sidebar = document.getElementById("appSidebar");
    const backdrop = document.getElementById("sidebarBackdrop");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("show");
            if (backdrop) backdrop.classList.toggle("show");
        });
    }

    if (backdrop && sidebar) {
        backdrop.addEventListener("click", () => {
            sidebar.classList.remove("show");
            backdrop.classList.remove("show");
        });
    }
}

// Automatically bind navbar and sidebar if document is ready
document.addEventListener("DOMContentLoaded", () => {
    initNavbarAndSidebar();
});
