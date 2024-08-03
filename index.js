import express from 'express';
import dotenv from 'dotenv'
import main from './src/db/db.config.js';

dotenv.config()
const app = express();

app.use(express.json());

/* app.use('api/v1/products', productRouter) */
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    main()
  console.log(`'Server Is Ruuning On Port ${PORT}'`);
})