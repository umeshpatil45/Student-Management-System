/**
 * Student Management Directory logic
 */

let allStudents = [];
let studentToDeleteId = null;

document.addEventListener("DOMContentLoaded", () => {
    requireAuth();
    loadStudents();
    setupFiltersAndSearch();
});

/**
 * Fetch all students from backend
 */
async function loadStudents() {
    const tableBody = document.getElementById("studentsTableBody");
    const loadingEl = document.getElementById("studentsLoading");
    const emptyEl = document.getElementById("studentsEmpty");

    try {
        if (loadingEl) loadingEl.style.display = "flex";
        if (emptyEl) emptyEl.style.display = "none";
        tableBody.innerHTML = "";

        const response = await authFetch("/api/students");
        if (!response.ok) {
            throw new Error("Failed to load students");
        }

        allStudents = await response.json();
        if (loadingEl) loadingEl.style.display = "none";

        populateDepartmentFilterOptions(allStudents);
        renderStudentsTable(allStudents);

    } catch (error) {
        if (loadingEl) loadingEl.style.display = "none";
        console.error("Error fetching students:", error);
        showToast("Failed to load student records.", "error");
    }
}

/**
 * Render the student records into the table
 */
function renderStudentsTable(students) {
    const tableBody = document.getElementById("studentsTableBody");
    const emptyEl = document.getElementById("studentsEmpty");
    const countBadge = document.getElementById("filteredCountBadge");

    tableBody.innerHTML = "";

    if (countBadge) {
        countBadge.textContent = `${students.length} student${students.length === 1 ? '' : 's'}`;
    }

    if (!students || students.length === 0) {
        if (emptyEl) emptyEl.style.display = "block";
        return;
    }

    if (emptyEl) emptyEl.style.display = "none";

    students.forEach(student => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>#${student.id}</strong></td>
            <td>
                <div class="fw-bold">${escapeHtml(student.name)}</div>
            </td>
            <td>${escapeHtml(student.email)}</td>
            <td>${escapeHtml(student.phone)}</td>
            <td>${escapeHtml(student.course)}</td>
            <td><span class="badge-dept">${escapeHtml(student.department)}</span></td>
            <td><span class="badge-year">${escapeHtml(student.year)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-action-view" onclick="openViewModal(${student.id})" title="View Details">
                        <i class="bi bi-eye"></i>
                    </button>
                    <a href="edit-student.html?id=${student.id}" class="btn-action btn-action-edit" title="Edit Student">
                        <i class="bi bi-pencil"></i>
                    </a>
                    <button class="btn-action btn-action-delete" onclick="promptDeleteStudent(${student.id}, '${escapeHtml(student.name)}')" title="Delete Student">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

/**
 * Filter students locally or via search API
 */
function setupFiltersAndSearch() {
    const searchInput = document.getElementById("studentSearchInput");
    const deptFilter = document.getElementById("departmentFilter");
    const yearFilter = document.getElementById("yearFilter");
    const clearBtn = document.getElementById("clearFiltersBtn");

    const applyFilter = () => {
        const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
        const selectedDept = (deptFilter ? deptFilter.value : "").trim();
        const selectedYear = (yearFilter ? yearFilter.value : "").trim();

        const filtered = allStudents.filter(student => {
            const matchesQuery = !query ||
                (student.name && student.name.toLowerCase().includes(query)) ||
                (student.email && student.email.toLowerCase().includes(query)) ||
                (student.phone && student.phone.toLowerCase().includes(query)) ||
                (student.course && student.course.toLowerCase().includes(query)) ||
                (student.department && student.department.toLowerCase().includes(query)) ||
                (student.year && student.year.toLowerCase().includes(query));

            const matchesDept = !selectedDept || student.department === selectedDept;
            const matchesYear = !selectedYear || student.year === selectedYear;

            return matchesQuery && matchesDept && matchesYear;
        });

        renderStudentsTable(filtered);
    };

    if (searchInput) {
        searchInput.addEventListener("input", applyFilter);
    }
    if (deptFilter) {
        deptFilter.addEventListener("change", applyFilter);
    }
    if (yearFilter) {
        yearFilter.addEventListener("change", applyFilter);
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            if (deptFilter) deptFilter.value = "";
            if (yearFilter) yearFilter.value = "";
            renderStudentsTable(allStudents);
        });
    }
}

/**
 * Populate department dropdown filter options dynamically
 */
function populateDepartmentFilterOptions(students) {
    const deptFilter = document.getElementById("departmentFilter");
    if (!deptFilter) return;

    const currentVal = deptFilter.value;
    const depts = Array.from(new Set(students.map(s => s.department).filter(Boolean))).sort();

    deptFilter.innerHTML = '<option value="">All Departments</option>';
    depts.forEach(dept => {
        const opt = document.createElement("option");
        opt.value = dept;
        opt.textContent = dept;
        if (dept === currentVal) opt.selected = true;
        deptFilter.appendChild(opt);
    });
}

/**
 * Open View Student Details modal
 */
async function openViewModal(id) {
    try {
        const response = await authFetch(`/api/students/${id}`);
        if (!response.ok) {
            throw new Error("Failed to load student details");
        }

        const student = await response.json();

        document.getElementById("viewStudentId").textContent = `#${student.id}`;
        document.getElementById("viewStudentName").textContent = student.name;
        document.getElementById("viewStudentEmail").textContent = student.email;
        document.getElementById("viewStudentPhone").textContent = student.phone;
        document.getElementById("viewStudentCourse").textContent = student.course;
        document.getElementById("viewStudentDepartment").textContent = student.department;
        document.getElementById("viewStudentYear").textContent = student.year;
        document.getElementById("viewStudentAddress").textContent = student.address;
        document.getElementById("viewStudentStatus").textContent = student.status || "Active";

        const editLink = document.getElementById("viewModalEditLink");
        if (editLink) {
            editLink.href = `edit-student.html?id=${student.id}`;
        }

        const modalEl = document.getElementById("viewStudentModal");
        const modal = new bootstrap.Modal(modalEl);
        modal.show();

    } catch (error) {
        console.error("Error viewing student:", error);
        showToast("Could not load student information.", "error");
    }
}

/**
 * Prompt confirmation modal for deleting a student
 */
function promptDeleteStudent(id, name) {
    studentToDeleteId = id;
    const nameEl = document.getElementById("deleteStudentName");
    if (nameEl) {
        nameEl.textContent = name;
    }

    const modalEl = document.getElementById("deleteConfirmModal");
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}

/**
 * Confirm and execute student deletion
 */
async function confirmDeleteStudent() {
    if (!studentToDeleteId) return;

    const deleteBtn = document.getElementById("btnConfirmDelete");
    if (deleteBtn) {
        deleteBtn.disabled = true;
        deleteBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Deleting...';
    }

    try {
        const response = await authFetch(`/api/students/${studentToDeleteId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.message || "Failed to delete student");
        }

        // Close modal
        const modalEl = document.getElementById("deleteConfirmModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();

        showToast("Student deleted successfully.", "success");

        // Reload students list
        await loadStudents();

    } catch (error) {
        console.error("Error deleting student:", error);
        showToast(error.message || "Failed to delete student.", "error");
    } finally {
        if (deleteBtn) {
            deleteBtn.disabled = false;
            deleteBtn.innerHTML = 'Delete Student';
        }
        studentToDeleteId = null;
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
