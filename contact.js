const nodemailer = require('nodemailer');

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    let emailBody = '';
    
    for (const entry of formData.entries()) {
        emailBody += `${entry[0]}: ${entry[1]}\n`;
    }
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.example.com', // Your SMTP server host
        port: 587, // Your SMTP server port
        secure: false, // Set to true if your SMTP server requires TLS
        auth: {
            user: 'your_username', // Your SMTP username
            pass: 'your_password' // Your SMTP password
        }
    });
    
    const mailOptions = {
        from: 'your_email@example.com', // Sender's email address
        to: 'info@sproutlabs.co', // Recipient's email address
        subject: 'New Contact Form Submission',
        text: emailBody
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(error);
            alert('Error occurred while sending email. Please try again later.');
        } else {
            console.log('Email sent: ' + info.response);
            alert('Form submitted successfully! You will be contacted shortly.');
        }
    });
});
