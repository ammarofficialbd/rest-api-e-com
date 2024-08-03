import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getAllProducts = (req, res)=>{
  const {search , brand, color, maxPrice, minPrice, page = 1, limit = 10 } = req.query

  if(search){

  }
}

const createProducts = async(req, res)=>{
    const { name, description, brand, price, color, category} = req.body

    await prisma.products.create({
        data:{
            name, description, price, brand, color, category
        }
    })
    return res.status(201).json({
        products,
        message: "Create Product Successfully",
        success: true
    })
}