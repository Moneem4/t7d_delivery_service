const express = require("express");
const router = express.Router();
const {
sendEmail,
sendSms,
sendManyMails,
sendManySms
} = require("../controllers/deliveryServiceController");
//send email take as body {email , text, subject}
router.post('/sendMAil',sendEmail)
//send sms take as body {phone , smsBody}
router.post('/sendSms',sendSms)
//send email take as body {emails (array of mails) , text, subject}
router.post('/sendManyMails',sendManyMails)
//send sms take as body {phones , smsBody}
router.post('/sendManySms',sendManySms)

module.exports = router;
