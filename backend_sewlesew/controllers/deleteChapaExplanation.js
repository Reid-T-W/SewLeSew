const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize"

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
        return res.status(200).json(response.data.data.checkout_url)
    })
    .catch((err) => console.log(err))