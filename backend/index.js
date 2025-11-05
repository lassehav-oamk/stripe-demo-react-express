require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
});

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello Stripe Payment World!');
});

// Stripe checkout session initialization route
app.post('/create-checkout-session', async (req, res) => {
    try {
        const exampleItem = {
            price_data: {
                currency: 'EUR',
                product_data: {
                    name: 'T-shirt',
                },
                unit_amount: 2000,
            },
            quantity: 1,
        };

        console.log('Creating checkout session for item:', exampleItem);
        const session = await stripe.checkout.sessions.create({
            line_items: [
                exampleItem,
            ],
            mode: 'payment',
            ui_mode: 'custom',
            customer_email: 'test@example.com', // Required for custom UI mode
            // The URL of your payment completion page - notice the session ID parameter,
            // the success page will need it to retrieve the session details to verify payment status
            return_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}'
        });

        console.log('Created checkout session:', session);

        res.json({client_secret: session.client_secret});
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(400).json({ error: error.message });
    }
});


// This endpoint retrieves the status of a checkout session, this is used after redirect to the return_url
app.get('/session-status', async (req, res) => {
    const { session_id } = req.query; // Get session_id from query parameters

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        res.json({
            id: session.id,
            payment_status: session.payment_status,
            amount_total: session.amount_total,
            currency: session.currency,
            customer_email: session.customer_email
        });
    } catch (error) {
        console.error('Error retrieving session:', error);
        res.status(400).json({ error: error.message });
    }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});