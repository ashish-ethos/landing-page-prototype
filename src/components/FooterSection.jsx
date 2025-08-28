
import { motion } from "framer-motion";
import ReactDOMServer from "react-dom/server";

function FooterSection() {
  const openPrivacyPage = () => {
    const html = ReactDOMServer.renderToStaticMarkup(
      <>
        <h1>Disclaimer</h1>
        <p>
          This website is only for the purpose of providing information regarding real estate projects in different regions...
        </p>
        {/* Full disclaimer and privacy content as before... */}
        <h1>Privacy Policy</h1>
        <p>
          In our endeavor and commitment of protecting your personal information, we have designed this comprehensive privacy policy. This is to keep your interests and information safe on our website.
        </p>

        <h2>Updation of privacy policy</h2>
        <p>
          This privacy policy is subject to undergo change and review without any prior notice or approval. So to keep yourself updated on the changes introduced, please keep visiting and reviewing the terms and conditions of this privacy policy.
        </p>
        <h2>User information</h2>
        <p>
          By using our website, you agree to abide by the rules laid out by us and consent to collection and use of all such information that you may furnish to, or through, our website. In some cases, while you visit our website, you may not need to provide any personal information. But in certain instances, we must have your personal information in order for us to grant you access to some of the links or sites.
        </p>
        <p>
          Such links/ pages may ask for your name, e-mail address, phone number etc. The information furnished by you is used to provide relevant products and services and to acknowledge receipt of your communication or to send out information and updates to you. You have the option of requesting removal from our mailing list. We do not give away your personal information to any third party.
        </p>

        <h2>Security</h2>
        <p>
          To ensure security while transferring sensitive information, all the ongoing transmissions between client and server are encrypted using advanced and standard protocols. We also practice restricted access by employees and hold them to high levels of confidentiality.
        </p>

        <h2>Use of cookies</h2>
        <p>
          We may use cookies for security, session continuity, and customization purposes. In case of a user opting to reject a cookie, he/ she may not be able to gain access to some of the limited services or use some features of the site.
        </p>
        <p>
          In case of any queries or suggestions regarding privacy statement or your dealings with this website, please contact us.         </p>
      </>
    );

    const newWindow = window.open("", "_blank");
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Disclaimer & Privacy Policy</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                max-width: 900px;
                margin: 40px auto;
                padding: 20px;
                line-height: 1.7;
                color: #333;
              }
              h1 {
                font-size: 1.8rem;
                margin-top: 2rem;
                color: #111;
              }
              h2 {
                font-size: 1.4rem;
                margin-top: 1.5rem;
                color: #222;
              }
              p {
                margin-bottom: 1rem;
              }
            </style>
          </head>
          <body>${html}</body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <footer className="py-8 px-4 bg-gray-800 text-white text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Company Copyright */}
        <div className=" text-xs col-gap-2 text-gray-400">
          <p>RERA No: <span className="text-white font-medium mb-2">GGM/927/659/2025/30</span></p>
          {/* <p>Agent Registration No: <span className="text-white mt-2 font-medium">AGENT/927/2025</span></p> */}
        </div>

        {/* Disclaimer + Privacy Policy */}
        <div className="mt-4 text-xs text-gray-300 max-w-6xl mx-auto">
          <p>
            The content provided on this website is for information purposes only and does not constitute an offer to avail any service. The prices mentioned are subject to change without prior notice, and the availability of properties mentioned is not guaranteed.

            The images displayed on the website are for representation purposes only and may not reflect the actual properties accurately. Please note that this is the official website of an authorized marketing partner. We may share data with Real Estate Regulatory Authority (RERA) registered brokers/companies for further processing as required. We may also send updates and information to the mobile number or email ID registered with us. All rights reserved. The content, design, and information on this website are protected by copyright and other intellectual property rights. Any unauthorized use or reproduction of the content may violate applicable laws. For accurate and up-to-date information regarding services, pricing, availability, and any other details, it is advisable to contact us directly through the provided contact information on this website. Thank you for visiting our website.

            Read less
          </p>
          <p className="mt-2 underline text-yellow-400 cursor-pointer hover:text-white">
            <span onClick={openPrivacyPage}>
              Read more — Disclaimer & Privacy Policy
            </span>
          </p>
        </div>

        {/* RERA and Agent Info */}

      </motion.div>
    </footer>
  );
}

export default FooterSection;
