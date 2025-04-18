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
I’m <b>${yourName}</b>, a Frontend Developer at <b>${currentCompany}</b>, reaching out after learning that <b>${targetCompany}</b> may be hiring for a <b>${role}</b>. I'm currently exploring new opportunities and wanted to briefly introduce myself.
</p>

<p>
With over <b>3 years of experience</b> in frontend development, I’ve worked extensively with technologies like <b>JavaScript, TypeScript, React, and Next.js</b>. At <a href="https://lumiq.ai/">${currentCompany}</a>, I’ve built and scaled products used by <b>25M+ monthly users</b>, and I’ve been deeply involved in <b>design systems, performance optimizations, and test-driven development</b> using tools like <b>Jest</b> and <b>React Testing Library</b>.
</p>

<p>
I hold a <b>B.Tech in Computer Science</b> from <b>IIIT Gwalior (2022)</b>, and I enjoy solving algorithmic problems (Codeforces rating: <b>1645</b>).
</p>

<p>
Currently, I’m in my notice period and available to join within <b>15 days</b>. I’d be thrilled to explore a suitable opportunity at <b>${targetCompany}</b> and contribute to your team.
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
📞 +91 9876543210<br>
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
