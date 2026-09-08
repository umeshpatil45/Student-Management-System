/**
 * Add Student page logic
 */

document.addEventListener("DOMContentLoaded", () => {
    requireAuth();

    const form = document.getElementById("addStudentForm");
    if (form) {
        form.addEventListener("submit", handleAddStudentSubmit);
    }
});

async function handleAddStudentSubmit(e) {
    e.preventDefault();

    const submitBtn = document.getElementById("btnAddStudentSubmit");
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
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Adding Student...';
        }

        const response = await authFetch("/api/students", {
            method: "POST",
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.validationErrors) {
                const errorMessages = Object.values(data.validationErrors).join("; ");
                throw new Error(errorMessages);
            }
            throw new Error(data.message || "Failed to create student record.");
        }

        showToast("Student created successfully!", "success");

        // Clear/reset form
        document.getElementById("addStudentForm").reset();

        // Redirect to student list
        setTimeout(() => {
            window.location.href = "students.html";
        }, 800);

    } catch (error) {
        console.error("Error creating student:", error);
        showToast(error.message || "An error occurred while creating the student.", "error");
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-person-plus me-1"></i> Add Student';
        }
    }
}
