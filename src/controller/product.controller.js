const Category = require("../models/category.model.js");
const Product = require("../models/product.model.js");
const productService = require("../services/product.service.js");


// self code
// const createProduct = async (req, res) => {
//   console.log("create product called : ", req.body);
//   try {
//     // let product = req.body;
//     const product = await productService.createProduct(req.body);
//     // this will print product in console
//     console.log(product);
//     return res
//       .status(201)
//       .json({ product, message: "product created successfully" });
//   } catch (error) {
//     console.log("create product controller error : ", error);
//     return res.status(500).json({ error: error.message });
//   }
// };

// async function createProduct(req, res) {
//   try {
//     const product = await productService.createProduct(req.body);
//     return res.status(201).json(product);
//   } catch (err) {
//     console.log("crete product error : ",err)
//     return res.status(500).json({ error: err.message });
//   }
// }

// new code
async function createProduct(req, res) {
  // console.log("create product called 2 : ", req.body);
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (err) {
    console.log("crete product controller error : ", err);
    return res.status(500).json({ error: err.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const message = await productService.deleteProduct(productId);
    return res.json({ message });
  } catch (err) {
    colsole.log(err);
    return res.status(500).json({ error: err.message });
  }
}

// self code
// const updateProduct = async (req, res) => {
//   console.log("update product called : ");
//   const productId = req.params.id;
//   try {
//     const product = await productService.updateProduct(productId, req.body);
//     return res.status(201).send(product);
//   } catch (error) {
//     console.log("update product controller error : ", error);
//     return res.status(500).send({ error: error.message });
//   }
// };

// new code
async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const product = await productService.updateProduct(productId, req.body);
    return res.json(product);
  } catch (err) {
    console.log("update product controller error : ", err);
    res.status(500).json({ error: err.message });
  }
}

// this is for find product by the Id
const findProductById = async (req, res) => {
  const productId = req.params.id;
  // console.log("product Id : ", productId);
  try {
    const product = await productService.findProductById(productId);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// this is for the get All product for the user self code
// const getAllProducts = async (req, res) => {
//   // console.log("getAllProducts called is : ", req);
//   const productId = req.params.id;
//   try {
//     const products = await productService.getAllProducts(req.body);
//     // console.log("All Products is : ", products);

//     return res.status(201).send(products);
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };


async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts(req.query);
    return res.status(200).send(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// this is for the createMultipleProduct for the user
const createMultipleProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productService.createMultipleProduct(req.body);
    return res.status(201).send({ message: "Product Created succesfully " });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// working for category
async function findProductByCategory(req, res){
  try {
    const category = req.params.category;
    // const category = req.params.category;
    // console.log("category : ", category);
    const products = await productService.findProductByCategory(category);
    // console.log("products : ", products);
    return res.status(201).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}

// new code
// async function findProductByCategory(req, res) {
//   try {
//     // Extract the category from URL path parameter
//     const category = req.params.category;
//     console.log("category : ", category);
//     // Extract other query parameters
//     const {
//       color,
//       size,
//       minPrice,
//       maxPrice,
//       minDiscount,
//       sort,
//       stock,
//       pageNumber,
//       pageSize
//     } = req.query;
//       console.log("req.query : ", req.query);
//     // Combine the category with other query parameters
//     // Fetch products from the service
//     const products = await findProductByCategory(req.query);
//     // Respond with the found products
//     return res.status(200).json(products);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: error.message });
//   }
// }


// Search products by query
async function searchProduct(req, res) {
  try {
    const query = req.params.query;
    const products = await productService.searchProduct(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function findfilteredProducts(req, res) {
  try {
    const {
      color,
      minPrice,
      maxPrice,
      minDiscount,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = req.query;
    console.log("req.query : ", req.query);
    const product = await productService.getAllProducts(req.query);
    //     // Log the fetched data for debugging
    console.log("Fetched product data:", product);
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProduct,
  findProductByCategory,
  findfilteredProducts,
  searchProduct,
};
