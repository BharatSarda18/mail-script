const nodemailer = require('nodemailer');
const { emails } = require('./emailsDeatils');
const { user } = require('./userDetails');

const transporter = nodemailer.createTransport({
  pool: true,
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'sardabharat71@gmail.com',
    pass: 'wmoq sfnw npqg mmpf',
  },
});

const sendEmail = async (userDetail) => {
  const { yourName, currentCompany, role, targetCompany, resumeLink, linkedIn, jobLink } = user;

  const mailOptions = {
    from: `${yourName} <sardabharat71@gmail.com>`,
    to: userDetail.email,
    subject: `Request for an Interview Opportunity - ${role} at ${targetCompany}`,
    html: `<p>Hi ${userDetail.name},</p>

<p>I hope you're doing well.</p>

<p>
I came across an exciting opportunity for <b>${role}</b>. at <b>${targetCompany}</b> and wanted to express my keen interest in it.
</p>
<p>
I bring 3 years of experience as a frontend developer, working extensively with React.js Currently, I’m working at ${currentCompany} as a Full Stack Developer with a frontend focus, where I've built and maintained complex UI components and enterprise-grade applications.
</p>

<p>
I would love the opportunity to contribute to ${targetCompany} mission and would appreciate it if you could consider my profile for the role.
</p>

<p>
I’ve attached my <a href="${resumeLink}"><b>Resume</b></a> and <a href="${linkedIn}"><b>LinkedIn</b></a>${jobLink ? `, along with the <a href="${jobLink}"><b>Job Opening</b></a>` : ''} for your quick reference.
</p>

<p>
Thank you for your time and consideration. Looking forward to hearing from you!
</p>

<p>
Warm regards,<br>
<b>${yourName}</b><br>
Frontend Developer<br>
${linkedIn}<br>
https://my-portfolio-git-main-bharatsarda18s-projects.vercel.app/<br>
7627064727 | sardabharat71@gmail.com

</p> `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${userDetail.email}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${userDetail.email}:`, error.message);
  }
};

const sendEmails = async () => {
  for (const email of emails) {
    await sendEmail(email);
    const wait = Math.random() * 40000 + 10000; // Wait 10s to 50s
    await new Promise((resolve) => setTimeout(resolve, wait));
  }
  console.log('✅ All emails sent!');
};

sendEmails();
