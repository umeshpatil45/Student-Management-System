/**
 * Dashboard logic for Student Management System
 */

document.addEventListener("DOMContentLoaded", () => {
    requireAuth();
    loadDashboardStats();
    loadRecentStudents();
});

async function loadDashboardStats() {
    try {
        const response = await authFetch("/api/students/stats");
        if (!response.ok) {
            throw new Error("Failed to fetch dashboard statistics");
        }

        const stats = await response.json();

        // Update stat counters
        document.getElementById("statTotalStudents").textContent = stats.totalStudents || 0;
        document.getElementById("statActiveStudents").textContent = stats.activeStudents || 0;
        document.getElementById("statTotalCourses").textContent = stats.totalCourses || 0;
        document.getElementById("statTotalDepartments").textContent = stats.totalDepartments || 0;

        // Render Department breakdown
        renderDepartmentDistribution(stats.studentsByDepartment || {});

    } catch (error) {
        console.error("Error loading stats:", error);
        showToast("Could not load dashboard statistics.", "error");
    }
}

function renderDepartmentDistribution(deptMap) {
    const container = document.getElementById("departmentStatsContainer");
    if (!container) return;

    const entries = Object.entries(deptMap);
    if (entries.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4 text-muted">
                <i class="bi bi-pie-chart fs-3"></i>
                <p class="mt-2 mb-0">No department data available</p>
            </div>
        `;
        return;
    }

    // Calculate total for percentages
    const total = entries.reduce((acc, [, count]) => acc + count, 0);

    const colors = ["#4f46e5", "#10b981", "#f59e0b", "#06b6d4", "#ec4899", "#8b5cf6"];

    let html = '<div class="row g-3">';
    entries.forEach(([dept, count], index) => {
        const color = colors[index % colors.length];
        const percent = total > 0 ? Math.round((count / total) * 100) : 0;
        
        html += `
            <div class="col-md-6">
                <div class="p-3 border rounded-3 bg-light">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="fw-semibold text-truncate" title="${dept}">${dept}</span>
                        <span class="badge" style="background-color: ${color}">${count} students</span>
                    </div>
                    <div class="progress" style="height: 7px;">
                        <div class="progress-bar" role="progressbar" style="width: ${percent}%; background-color: ${color};" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="text-end mt-1 text-muted small">${percent}% of total</div>
                </div>
            </div>
        `;
    });
    html += '</div>';

    container.innerHTML = html;
}

async function loadRecentStudents() {
    const tableBody = document.getElementById("recentStudentsTableBody");
    const loadingEl = document.getElementById("recentStudentsLoading");
    const emptyEl = document.getElementById("recentStudentsEmpty");

    if (!tableBody) return;

    try {
        if (loadingEl) loadingEl.style.display = "flex";
        if (emptyEl) emptyEl.style.display = "none";
        tableBody.innerHTML = "";

        const response = await authFetch("/api/students");
        if (!response.ok) {
            throw new Error("Failed to load students");
        }

        const students = await response.json();
        if (loadingEl) loadingEl.style.display = "none";

        if (!students || students.length === 0) {
            if (emptyEl) emptyEl.style.display = "block";
            return;
        }

        // Show latest 5 students
        const recent = [...students].reverse().slice(0, 5);

        recent.forEach(student => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>#${student.id}</strong></td>
                <td>
                    <div class="fw-bold">${escapeHtml(student.name)}</div>
                    <div class="text-muted small">${escapeHtml(student.email)}</div>
                </td>
                <td><span class="badge-dept">${escapeHtml(student.department)}</span></td>
                <td>${escapeHtml(student.course)}</td>
                <td><span class="badge-year">${escapeHtml(student.year)}</span></td>
                <td>
                    <span class="badge-status ${student.status === 'Active' ? 'badge-active' : 'badge-inactive'}">
                        ${escapeHtml(student.status || 'Active')}
                    </span>
                </td>
            `;
            tableBody.appendChild(tr);
        });

    } catch (error) {
        if (loadingEl) loadingEl.style.display = "none";
        console.error("Error loading recent students:", error);
    }
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
