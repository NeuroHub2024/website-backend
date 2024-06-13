const nodemailer = require('nodemailer');

async  function sendResetCodeEmail(username, resetCode) {
    // Implement your nodemailer configuration
    let transporter = nodemailer.createTransport({
        // Configure your email service
        service: 'gmail',
        auth: {
            user: 'neurohub2024@gmail.com', 
            pass: 'hqirtuxxpjlwcjcg'
        }
    });
   console.log(resetCode)
    // Send email
    await transporter.sendMail({
        from: 'neurohub2024@gmail.com',
        to: username, // User's email address
        subject: 'Password Reset Code From the nureon hub',
        html:`<h2 style="color:Blue">Forgot your password?</h2>
            <h3>We received a request to reset the password for your account.</h3>
            <p style="color:red">Your password reset code is: ${resetCode}</p>
            <p>Best regards,<br>NeuronHub</p>`,
       
    });
}
module.exports=sendResetCodeEmail;