# React Express Stripe Payment Demo

A demonstration application showcasing Stripe payment integration using React frontend with Express.js backend. This project implements Stripe's custom UI checkout flow with payment confirmation and order status display.

## Project Structure

```
react-express-strip-payment/
├── backend/
│   ├── index.js              # Express server with Stripe integration
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables (not tracked)
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── CheckoutForm.tsx    # Payment form component
    │   ├── views/
    │   │   ├── CheckoutView.tsx    # Main checkout page
    │   │   └── SuccessView.tsx     # Payment success page
    │   ├── App.tsx                 # Main app with routing
    │   ├── main.tsx                # React app entry point
    │   └── index.css               # Basic styles
    ├── package.json                # Frontend dependencies
    └── vite.config.ts              # Vite configuration
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Stripe account with API keys

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   PORT=3000
   ```

4. Start the backend server:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```
   VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## How the Demo Works

### Step 1: Initial Page Load
- User visits `http://localhost:5173`
- Frontend makes a POST request to `/create-checkout-session`
- Backend creates a Stripe checkout session with custom UI mode with hardcoded purchase details
- Backend returns the client secret to the frontend
- Stripe Elements renders the payment form

### Step 2: Payment Form Interaction
- User sees payment options and selects "Card"
- User fills in card details (use Stripe test cards like `4242 4242 4242 4242`)
    - Test card details here (https://docs.stripe.com/testing)
- User optionally fills in email, phone number, and full name
- User clicks the "Submit" button

### Step 3: Payment Processing
- Frontend calls `checkout.confirm()` to process the payment
- Stripe processes the payment using the provided card details
- Upon successful payment, Stripe redirects to the return URL, which was defined in step 1 in the backend.

### Step 4: Payment Confirmation
- User is redirected to the return_url `http://localhost:5173/success?session_id=xxx`
- Frontend extracts the session ID from the URL parameters
- Frontend makes a GET request to `/session-status?session_id=xxx` where xxx is the stripe session ID
- Backend retrieves the session details from Stripe and sends them to frontend in the response
- Success page displays payment confirmation with order details

### API Endpoints

#### POST /create-checkout-session
Creates a new Stripe checkout session for a demo T-shirt purchase.
- Returns: `{ client_secret: "cs_xxx" }`
- Error handling: Returns 400 status with error message

#### GET /session-status
Retrieves the status of a completed checkout session.
- Query parameter: `session_id`
- Returns: Session details including payment status, amount, and customer email
- Error handling: Returns 400 status with error message

### Test Cards
Use these Stripe test card numbers for testing:
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002

For test cards, use any future expiry date, any 3-digit CVC, and any postal code.

## Key Features

- Custom UI checkout flow using Stripe Elements
- Proper error handling for API failures
- Payment status verification after completion
- Responsive design with inline styles
- React Router v7 for navigation
- TypeScript support
- Environment variable configuration

## Technologies Used

### Backend
- Express.js - Web framework
- Stripe Node.js SDK - Payment processing
- CORS - Cross-origin resource sharing
- dotenv - Environment variable management

### Frontend
- React 19 - UI framework
- TypeScript - Type safety
- Vite - Build tool and dev server
- React Router v7 - Client-side routing
- Stripe React SDK - Payment components