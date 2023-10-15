import mercadopago from 'mercadopago';
import { Request, Response, Router } from 'express';
import * as dotenv from 'dotenv';

export const paymentRouter = Router();

dotenv.config();

mercadopago.configure({
  access_token: 'TEST-3937778398142382-071515-fa3f0938b2bce15ba08f981bd7ec4395-820889614'
});

paymentRouter.post('/', async (req: Request, res: Response) => {
  try {
    const items = req.body;

    const preference = {
      items
    }

    mercadopago.preferences.create(preference).then(function (response) {
      res.json({
        id: response.body.id
      });
    }).catch(function (error) {
      console.log(error);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment preference' });
  }
});

paymentRouter.post('/test-payment', async (req: Request, res: Response) => {
  try {
    const items = req.body;

    const preference = {
      items,
    };

    const simulatedPayment = {
      status: 'approved',
    };

    const response = {
      preference,
      payment: simulatedPayment,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process test payment' });
  }
});