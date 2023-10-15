import { Application } from 'express';
import { productsRouter } from '../controllers/products.controller';
import { categoryRouter } from '../controllers/category.controller';
import { userRouter } from '../controllers/users.controller';
import { adminRouter } from '../controllers/admin.controller';
import { paymentRouter } from '../controllers/payment.controller';

export function initRoutes(app: Application) {
  app.use('/api/products', productsRouter);
  app.use('/api/categories', categoryRouter);
  app.use('/api/users', userRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/payment', paymentRouter)
}
