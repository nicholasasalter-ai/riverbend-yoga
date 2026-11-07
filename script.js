// Data Management: Objects to handle workshop details and client targets
const workshopDetails = {
    foundations: {
        price: "$35",
        duration: "120 minutes",
        focus: "Absolute beginners, busy professionals, and older adults looking for a slow pace."
    },
    restorative: {
        price: "$45",
        duration: "150 minutes",
        focus: "Deep relaxation, stress relief, and gentle posture support using props."
    },
    gentle: {
        price: "$120",
        duration: "4-Week Series",
        focus: "Progressive mobility tracking, muscle tone refinement, and alignment basics."
    },
    private: {
        price: "$75",
        duration: "60 minutes",
        focus: "One-on-one personal attention tailored entirely to your personal goals or injuries."
    }
};

const userPreferences = {
    currentSelection: "",
    timestamp: ""
};

// Initialize interactive features when DOM loads
document.addEventListener("DOMContentLoaded", function() {
    const eventSelect = document.getElementById("event-interest");
    const formElement = document.querySelector("form");

    if (eventSelect) {
        // Create dynamic display container block for the interactive feature
        const infoDisplay = document.createElement("div");
        infoDisplay.id = "workshop-preview-box";
        infoDisplay.style.marginTop = "15px";
        infoDisplay.style.padding = "15px";
        infoDisplay.style.borderRadius = "6px";
        infoDisplay.style.border = "1px solid #D88C5A";
        infoDisplay.style.backgroundColor = "#FFF8F0";
        infoDisplay.style.display = "none";
        eventSelect.parentNode.appendChild(infoDisplay);

        // Check LocalStorage to restore previous choices
        const savedWorkshop = localStorage.getItem("riverbend_saved_workshop");
        if (savedWorkshop) {
            eventSelect.value = savedWorkshop;
            updateWorkshopPreview(savedWorkshop, infoDisplay);
        }

        // Event listener for user drop-down interaction
        eventSelect.addEventListener("change", function() {
            const selectedValue = eventSelect.value;
            if (selectedValue) {
                localStorage.setItem("riverbend_saved_workshop", selectedValue);
                userPreferences.currentSelection = selectedValue;
                updateWorkshopPreview(selectedValue, infoDisplay);
            } else {
                infoDisplay.style.display = "none";
                localStorage.removeItem("riverbend_saved_workshop");
            }
        });
    }

    // Form Submission Custom Validation Processing
    if (formElement) {
        formElement.addEventListener("submit", function(event) {
            let isValid = true;
            
            // Clean up old error messages
            document.querySelectorAll(".js-error-msg").forEach(msg => msg.remove());

            const nameInput = document.getElementById("username");
            const emailInput = document.getElementById("useremail");

            // Validation Check 1: Name length verification
            if (nameInput.value.trim().length < 3) {
                isValid = false;
                showFieldError(nameInput, "Your full name must be at least 3 characters long.");
            }

            // Validation Check 2: Email format verification
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                isValid = false;
                showFieldError(emailInput, "Please enter a valid email address structure (e.g., name@domain.com).");
            }

            // Halt submission if any validation logic flags an error
            if (!isValid) {
                event.preventDefault();
            }
        });
    }
});

// Helper function to update the page display dynamically
function updateWorkshopPreview(value, container) {
    const details = workshopDetails[value];
    if (details) {
        container.innerHTML = `
            <h4 style="color: #6B3E26; margin-bottom: 5px;">Workshop Details:</h4>
            <p><strong>Investment:</strong> ${details.price} | <strong>Duration:</strong> ${details.duration}</p>
            <p style="font-size: 0.9rem; font-style: italic; margin-top: 5px;"><strong>Ideal For:</strong> ${details.focus}</p>
        `;
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
}

// Helper function to insert error alerts inline near fields
function showFieldError(inputField, errorMessage) {
    const errorSpan = document.createElement("span");
    errorSpan.className = "js-error-msg";
    errorSpan.style.color = "#cc0000";
    errorSpan.style.fontSize = "0.85rem";
    errorSpan.style.display = "block";
    errorSpan.style.marginTop = "5px";
    errorSpan.innerText = errorMessage;
    inputField.parentNode.appendChild(errorSpan);
}
