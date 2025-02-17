// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY");
})();

async function sendEmail(event) {
    event.preventDefault();

    const submitBtn = document.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');

    // Show loading state
    btnText.style.display = 'none';
    spinner.style.display = 'block';
    submitBtn.disabled = true;

    try {
        const templateParams = {
            to_email: 'ziad.sakr40@gmail.com',
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        await emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            templateParams
        );

        // Show success message
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
    } finally {
        // Reset button state
        btnText.style.display = 'block';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }

    return false;
}
