const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient({ authorizationToken: "dk_prod_T7B8H4GF734VV0M80631J33F2AQP" });

// Example: send a message supporting email & SMS
async function sendEmail() {
    const { messageId } = await courier.send({
    eventId: "2NSBNDAXS34DD0Q82BVT0JKDVRE8",
    recipientId: "d58048e1-9c3c-473a-83dd-e657d784dd06",
    profile: {
        email: "krish.chopra23@gmail.com",
    },
    data: {
    },
    override: {
    },
    });
}

sendEmail();