import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log:['query']
});

export const getAllProducts = async (req, res) => {
  try {
    const {
      search,
      brand,
      color,
      maxPrice,
      minPrice,
      sort,
      page = 1,
      limit = 5,
    } = req.query;

    const where = {};

    if (search) {
      where.OR = [
        {name: {contains: search}},
        {description:{contains: search}}
    ];
    }
    //console.log({where: where});
    if (brand) {
      where.brand = brand;
    }
    if (brand) {
      where.color = color;
    }
/* sort : 
   ***jokon sort kori tokon ekta problem hoy je puro products er upor sort hoy , kintu ami chai je specicfic page er moddhe sort hbe ?
*/
    const orderBy = {};
    if (sort) {
      switch (sort) {
        case 'newest':
          orderBy.createdAt = 'desc';
          break;
        case 'oldest':
          orderBy.createdAt = 'asc';
          break;
        case 'lowestPrice':
          orderBy.price = 'asc';
          break;
        case 'highestPrice':
          orderBy.price = 'desc';
          break;
        case 'trending':
          // Define what "trending" means in your context,  based on sales or views // slaes value beshi hle segulai trending a thakbe
          break;
      }
    }

 /* pagination :
    skip : 5,
    take : 5
    --------
    if page  1 , skip 0

 */ 

    const skip = (page - 1) * limit;
    const totalProducts = await prisma.product.count()
    const totalPages = Math.ceil(totalProducts/limit)
    console.log(totalPages);
//console.log(page , limit);
  
    const products = await prisma.product.findMany({
      where: where,
      orderBy,
      skip: +skip,
      take: +limit
    });


  
    return res.status(200).json({
      totalProducts,
      totalPages,
      currentPage : +page,
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

  // update many te update korar somoy data eki hbe sob id r jonno , vinno vinno data r jonno update krte hle onno function create krte hbe , ei function ti shudhu eki title vinno vinno id r jonno update hbe.

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


export const DeleteOpration = async(req,res)=>{
  try {
    const where ={
      id : req.params.id
    }
    const deletedProduct = await prisma.product.delete({
      where
    })
  
  return res.status(201).json({
        message: "delete Products Successfully",
        deletedProduct,
        success: true,
      });
  } catch (error) {
    
  }
  
}

export const DeleteAllProducts =async(req,res)=>{
  const count = await prisma.product.deleteMany({})
  res.send({
  })
  return res.status(201).json({
    message: "DELEETE ALL Products Successfully",
    count,
    success: true,
  });
}



