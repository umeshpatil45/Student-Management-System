/**
 * Edit Student page logic
 */

let currentStudentId = null;

document.addEventListener("DOMContentLoaded", () => {
    requireAuth();

    // Extract student ID from query string ?id=...
    const urlParams = new URLSearchParams(window.location.search);
    currentStudentId = urlParams.get("id");

    if (!currentStudentId) {
        showToast("No student ID specified. Redirecting to student list...", "error");
        setTimeout(() => {
            window.location.href = "students.html";
        }, 1200);
        return;
    }

    loadStudentDetails(currentStudentId);

    const form = document.getElementById("editStudentForm");
    if (form) {
        form.addEventListener("submit", handleEditStudentSubmit);
    }
});

async function loadStudentDetails(id) {
    const loadingEl = document.getElementById("editStudentLoading");
    const formEl = document.getElementById("editStudentForm");

    try {
        if (loadingEl) loadingEl.style.display = "flex";
        if (formEl) formEl.style.display = "none";

        const response = await authFetch(`/api/students/${id}`);
        if (!response.ok) {
            throw new Error("Student not found or failed to load");
        }

        const student = await response.json();

        if (loadingEl) loadingEl.style.display = "none";
        if (formEl) formEl.style.display = "block";

        // Populate form inputs
        document.getElementById("editStudentIdDisplay").textContent = `#${student.id}`;
        document.getElementById("studentName").value = student.name || "";
        document.getElementById("studentEmail").value = student.email || "";
        document.getElementById("studentPhone").value = student.phone || "";
        document.getElementById("studentCourse").value = student.course || "";
        document.getElementById("studentDepartment").value = student.department || "";
        document.getElementById("studentYear").value = student.year || "";
        document.getElementById("studentAddress").value = student.address || "";
        
        const statusSelect = document.getElementById("studentStatus");
        if (statusSelect) {
            statusSelect.value = student.status || "Active";
        }

    } catch (error) {
        if (loadingEl) loadingEl.style.display = "none";
        console.error("Error loading student:", error);
        showToast("Could not load student information. Redirecting...", "error");
        setTimeout(() => {
            window.location.href = "students.html";
        }, 1500);
    }
}

async function handleEditStudentSubmit(e) {
    e.preventDefault();

    if (!currentStudentId) return;

    const submitBtn = document.getElementById("btnEditStudentSubmit");
    const nameInput = document.getElementById("studentName");
    const emailInput = document.getElementById("studentEmail");
    const phoneInput = document.getElementById("studentPhone");
    const courseInput = document.getElementById("studentCourse");
    const deptInput = document.getElementById("studentDepartment");
    const yearInput = document.getElementById("studentYear");
    const addressInput = document.getElementById("studentAddress");
    const statusInput = document.getElementById("studentStatus");

    // Client-side validation
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const course = courseInput.value.trim();
    const department = deptInput.value.trim();
    const year = yearInput.value.trim();
    const address = addressInput.value.trim();
    const status = statusInput ? statusInput.value : "Active";

    if (!name || !email || !phone || !course || !department || !year || !address) {
        showToast("Please fill in all required fields.", "error");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address.", "error");
        emailInput.focus();
        return;
    }

    const payload = {
        name,
        email,
        phone,
        course,
        department,
        year,
        address,
        status
    };

    try {
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Saving Changes...';
        }

        const response = await authFetch(`/api/students/${currentStudentId}`, {
            method: "PUT",
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.validationErrors) {
                const errorMessages = Object.values(data.validationErrors).join("; ");
                throw new Error(errorMessages);
            }
            throw new Error(data.message || "Failed to update student record.");
        }

        showToast("Student updated successfully!", "success");

        // Redirect to student list
        setTimeout(() => {
            window.location.href = "students.html";
        }, 800);

    } catch (error) {
        console.error("Error updating student:", error);
        showToast(error.message || "An error occurred while saving changes.", "error");
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-check2 me-1"></i> Update Student';
        }
    }
}
