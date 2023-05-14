// require("dotenv").config()
// import axios from 'axios';
// var request = require('request');

// class PaymentController {
//     static async payViaChapa(req, res) {
//         const {
//             email,
//             firstName,
//             lastName,
//             totalPendingDonations,
//           } = req.body

//         const txRef = `tx_WEGENE_${email}_${Date.now()}`;
//         // var options = {
//         //     'method': 'POST',
//         //     'url': 'https://api.chapa.co/v1/transaction/initialize',
//         //     'headers': {
//         //       'Authorization':  `Bearer ${process.env.CHAPA_PRIVATE_KEY}`,
//         //       'Content-Type': 'application/json'
//         //     },
//         //     body: JSON.stringify({
//         //       "amount": totalPendingDonations,
//         //       "currency": "ETB",
//         //       "email": email,
//         //       "first_name": firstName,
//         //       "last_name": lastName,
//         //       "tx_ref": txRef,
//         //       "return_url": "http://localhost:3000/payment-success/"
//         //     })
//         //   };
//           // request(options, function (error, response) {
//           //   if (error) throw new Error(error);
//           //   console.log(response.body);
//           // });
//           const config = {
//             headers: {
//                 Authorization: `Bearer ${process.env.CHAPA_PRIVATE_KEY}`
//             }
//           }

//           const data = {
//             amount: totalPendingDonations,
//             currency: "ETB",
//             email: email,
//             first_name: firstName,
//             last_name: lastName,
//             tx_ref: txRef,
//             return_url: "http://localhost:3000/payment-success/"
//         }
//           const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize";
//           await axios.post(CHAPA_URL, data, config)
//           .then((response) => {
//               console.log(response.data.message)
//               // res.redirect(response.data.data.checkout_url)
//           })
//           .catch((err) => console.log(err))
//     }
// }

// module.exports = PaymentController;

// // "callback_url": `https://api.chapa.co/v1/transaction/verify/${txRef}`,

/* 
    CHAPA API PAYMENT INTEGRATION TEST
    Required: Chapa secret key || GET THE KEY BY REGISTERING @ https://dashboard.chapa.co/register
*/

const express = require("express")
const app = express()
const axios = require("axios").default
require("dotenv").config()
const PORT = process.env.PORT || 3000

const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize"
const CHAPA_AUTH = process.env.CHAPA_PRIVATE_KEY// || register to chapa and get the key
app.set("view engine", "ejs")

// req header with chapa secret key
const config = {
    headers: {
        Authorization: `Bearer ${CHAPA_AUTH}`
    }
}

// entry for the front end
app.get('/', (req, res) => {
    res.render("index")
})

// initial payment endpoint
class PaymentController {
   // Payment Endpoint
    static async payViaChapa(req, res) {
         // chapa redirect you to this url when payment is successful
        const CALLBACK_URL = "http://localhost:5000/api/v1/verify-payment/"
        const RETURN_URL = "http://localhost:5000/api/v1/payment-success/"

        // a unique reference given to every transaction
        const TEXT_REF = `tx-myecommerce12345_${Date.now()}`
        const {
            email,
            firstName,
            lastName,
            totalPendingDonations,
          } = req.body
        // form data
        // const totalPendingDonationsString = totalPendingDonations.toString();
        // const emailString = email.toString();
        // const firstNameString = firstName.toString();
        // const lastNameString = lastName.toString();
        // const TEXT_REF_STRING = TEXT_REF.toString();
        // console.log("Im called", typeof totalPendingDonations)
        // console.log("Im called", typeof firstName)
        // console.log("Im called", typeof lastName)
        const data = {
            amount: totalPendingDonations,
            currency: "ETB",
            email: email,
            first_name: firstName,
            last_name: lastName,
            tx_ref: TEXT_REF,
            callback_url: CALLBACK_URL + TEXT_REF,
            return_url: RETURN_URL
        }

        // post request to chapa
        await axios.post(CHAPA_URL, data, config)
            .then((response) => {
                // res.header("Access-Control-Allow-Origin", "*");
                // res.redirect(response.data.data.checkout_url)
                return res.status(200).json(response.data.data.checkout_url)
            })
            .catch((err) => console.log(err))
    }

    // Verification endpoint
    static async verifyPayment(req, res) {
        //verify the transaction
        console.log(req.params.id)
        await axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config)
            .then((response) => {
                console.log("Payment was successfully verified")
            }) 
            .catch((err) => console.log("Payment can't be verfied", err))
    }

    static async paymentSuccess(req, res) {
      res.redirect("http://localhost:3000/userpendingdonations/")
    }
}
// app.listen(PORT, () => console.log("Server listening on port:", PORT))

module.exports = PaymentController;