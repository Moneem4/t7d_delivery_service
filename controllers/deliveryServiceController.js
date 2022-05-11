const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendEmail = async (req, res) => {
  try {
    const { email, subject, text } = req.body;
    const msg = {
      to: email, // Change to your recipient
      from: "ta7adi@galactechstudio.com",
      subject: subject,
      text: text,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        res.status(500).json({
          message: "Mail sg error .",
          error,
        });
      });
    res.status(200).json({
      message:
        "An email has been sent to your email address, please check it before it expires .",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error .",
      error,
    });
  }
};
exports.sendSms = (req, res) => {
  const { smsBody, phone } = req.body;
  client.messages
    .create({
      body: smsBody,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_ID,
      to: phone,
    })
    .then((msg) => {
      console.log("sms sent");
      res.send(phone);
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.sendManyMails = (req, res) => {
  try {
    const { emails, subject, text } = req.body;
    const msg = {
      to: emails,
      from: "ta7adi@galactechstudio.com",
      subject: subject,
      text: text,
      // html: "<p>Fresh donuts are out of the oven. Get them while they’re <em>hot!</em></p>",
    };

    sgMail
      .sendMultiple(msg)
      .then(() => {
        console.log("emails sent successfully!");
        res.send(emails);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error .",
      error,
    });
  }
};
exports.sendManySms = (req, res) => {
  const { smsBody, phones } = req.body;
  Promise.all(
    phones.map(number => {
      return client.messages.create({
        to: number,
        messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_ID,
        body: smsBody
      });
    })
  )
    .then(messages => {
      console.log('Messages sent!');
      res.send(phones)
    })
    .catch(err => console.error(err));
};
