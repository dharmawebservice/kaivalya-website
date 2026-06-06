/* =====================================================
   CONTACT FORM + EMAILJS + FAQ JS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // Initialize EmailJS
    emailjs.init({
        publicKey: "_1IaYlkI-4P3bR8mg"
    });

    // Auto-open first FAQ
    const firstFaq = document.querySelector(".faq-q");

    if (firstFaq) {
        firstFaq.classList.add("open");
        firstFaq.nextElementSibling.classList.add("open");
    }
});


function handleSubmit(e) {

    e.preventDefault();

    const formContent = document.getElementById("formContent");
    const success = document.getElementById("formSuccess");
    const btn = e.target.querySelector("button[type='submit']");

    btn.innerHTML = "Sending...";
    btn.disabled = true;

    const templateParams = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        interest: document.getElementById("interest").value,
        budget: document.getElementById("budget").value,
        location: document.getElementById("location").value,
        message: document.getElementById("message").value
    };

    emailjs.send(
        "service_4xoqted",
        "template_blur3a9",
        templateParams
    )
    .then(function () {

        formContent.style.display = "none";
        success.classList.add("show");

        success.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    })
    .catch(function (error) {

        console.error("EmailJS Error:", error);

        alert("Failed to send enquiry.");
        btn.innerHTML = "Send Enquiry →";
        btn.disabled = false;

    });
}


function toggleFaq(btn) {

    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains("open");

    document.querySelectorAll(".faq-q.open").forEach(q => {
        q.classList.remove("open");
        q.nextElementSibling.classList.remove("open");
    });

    if (!isOpen) {
        btn.classList.add("open");
        answer.classList.add("open");
    }
}