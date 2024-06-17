import Router from "express"
import stripe from "stripe"
import cors from "cors";

const stripeInstance = stripe(process.env.STRIPE_KEY);

const router = Router();

const YOUR_DOMAIN = 'http://localhost:5173';

router.post('/create-checkout-session', cors(), async (req, res) => {
    try{
        const session = await stripeInstance.checkout.sessions.create({
            line_items: req.body.line_items,
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success`,
            cancel_url: `${YOUR_DOMAIN}`,
        });
       res.json(session.url);
    }
    catch(error){
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Enable CORS
router.use(cors());

export default router;