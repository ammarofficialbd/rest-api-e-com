import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProducts = async (req, res) => {
  try {
    const {
      search,
      brand,
      color,
      maxPrice,
      minPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const where = {};

    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }
    console.log(where);
    if (brand) {
      where.brand = brand;
    }

    //  console.log(where);
    const products = await prisma.product.findMany({
      where,
    });

    return res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);

   const where = {
    id : +productId
   }

    const product = await prisma.product.findFirstOrThrow({
    where
    });

    return res.status(200).json({
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createProducts = async (req, res) => {
  const { name, description, brand, price, color, category } = req.body;
  if (!name || description || price || category) {
    return res.status(400).json({
      products,
      message: "Something is missing",
      success: false,
    });
  }
  await prisma.product.create({
    data: {
      name,
      description,
      price,
      brand,
      color,
      category,
    },
  });
  return res.status(201).json({
    message: "Create Product Successfully",
    products,
    success: true,
  });
};

export const updateProduct = async(req, res)=>{
  /*  1. first You get Id from params
      2. then function prisma.update()
      3. use where key for finding specific product, which i wat to update
      4. then give data from req.body */
  const productIds = req.params.id.split(',').map(id => parseInt(id) );
  log(productIds)
  const updatedData = req.body
  const where = {
    id : {
      in: productIds
    }
  }
  
  /* const product = await prisma.product.update({
  where,
  data: updatedData
  }) */
  const product = await prisma.product.updateMany({
    where,
    data: updatedData
    })
  
  return res.status(201).json({
    message: "Updated Products Successfully",
    product,
    success: true,
  });
}


export const createManyProducts = async (req, res) => {
  try {
    const products = req.body;
    console.log(products);
    // Assuming the request body contains an array of products
    const createdProducts = await prisma.product.createMany({
      data: products,
    });
    return res.status(201).json({
      message: "Create Products Successfully",
      createdProducts,
      success: true,
    });
  } catch (error) {
    console.error("Error creating products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
