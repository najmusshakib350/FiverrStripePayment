const path = require("path");

//config file
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();

//ejs template engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

const YOUR_DOMAIN = "https://fiverrstripe.herokuapp.com/";

//Frontend part code implementation

app.get("/", async function (req, res) {
  res.status(200).render("checkout");
});

app.post("/create-checkout-session", async function (req, res) {
  console.log("Create checkout session");
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // success_url:`${req.protocol}://${req.get('host')}/my-tours/?tour=${ req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    customer_email: "najmusshakib1997@gmail.com",
    // client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `Your product name that user want to purchase`,
        description: "Your product description",
        amount: 20 * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });
  // 3) Create session as response
  res.status(200).json({
    status: "success",
    session,
  });
});

let port = process.env.PORT;
app.listen(port, () => console.log("Running on port 4242"));
