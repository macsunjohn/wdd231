// scripts/contact.js

document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");
    
    if (timestampField) {
        // Creates a string like "2026-04-06T14:30:00"
        const now = new Date().toISOString();
        timestampField.value = now;
        console.log("Form load timestamp recorded:", now);
    }
});