const Category = require("../models/category.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

// self code
// create product method
// async function createProduct(reqDataArray) {

//   // first lavel
//   let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

//   if (!topLevel) {
//     const topLevel = new Category({
//       name: reqData.topLevelCategory,
//       level: 1,
//     });
//   }
//   //   second lavel
//   let secondLevel = await Category.findOne({
//     name: reqData.secondLavelCategory,
//     parentCategory: topLevel._id,
//   });

//   if (!secondLevel) {
//     secondLevel = new Category({
//       name: reqData.secondLavelCategory,
//       parentCategory: topLevel._id,
//       level: 2,
//     });
//   }

//   let thirdLevel = await Category({
//     name: reqData.thirdLevelCategory,
//     parentCategory: secondLevel._id,
//   });

//   if (!thirdLevel) {
//     thirdLevel = new Category({
//       name: thirdLevelCategory,
//       parentCategory: secondLavelCategory._id,
//       level: 3,
//     });
//   }

//   const product = new Product({
//     title: reqData.title,
//     color: reqData.color,
//     description: reqData.description,
//     discountedPrice: reqData.discountedPrice,
//     discountedPersent: reqData.discountedPersent,
//     imageUrl: reqData.imageUrl,
//     brand: reqData.brand,
//     price: reqData.price,
//     // sizes: reqData.size,
//     quantity: reqData.quantity,
//     category: thirdLevel,
//     // category: thirdLevel ? thirdLevel._id : null,
//   });

//   return await product.save();
// }


async function createProduct(reqData) {

  let topLevel = await Category.findOne({ name: reqData.topLavelCategory });

  if (!topLevel) {
    const topLavelCategory = new Category({
      name: reqData.topLavelCategory,
      level: 1,
    });

    topLevel = await topLavelCategory.save();
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLavelCategory,
    parentCategory: topLevel._id,
  });

  if (!secondLevel) {
    const secondLavelCategory = new Category({
      name: reqData.secondLavelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });

    secondLevel = await secondLavelCategory.save();
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLavelCategory,
    parentCategory: secondLevel._id,
  });

  if (!thirdLevel) {
    const thirdLavelCategory = new Category({
      name: reqData.thirdLavelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });

    thirdLevel = await thirdLavelCategory.save();
  }

  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPersent: reqData.discountPersent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    sizes: reqData.size,
    quantity: reqData.quantity,
    category: thirdLevel._id,
  });

  const savedProduct = await product.save();

  return savedProduct;
}
// async function createProduct(reqDataArray) {
//   // Extract the first element from the reqData array
//   const reqData = reqDataArray[0];
//   // Validate that required fields are present in reqData
//   const {
//     imageUrl,
//     brand,
//     title,
//     color,
//     discountedPrice,
//     price,
//     discountPersent,
//     quantity,
//     topLavelCategory,
//     secondLavelCategory,
//     thirdLavelCategory,
//     description,
//   } = reqData;
//   console.log("reqData : ", reqData);

//   // if (!title || !description || !quantity) {
//   //   throw new Error("Missing required fields: title, description, and quantity are required.");
//   // }

//   // Find or create top level category
//   let topLevel = await Category.findOne({ name: topLavelCategory });
//   console.log("top level : ", topLevel);

//   if (!topLevel) {
//     topLevel = new Category({
//       name: topLavelCategory,
//       level: 1,
//     });
//     topLevel = await topLevel.save();
//   }

//   // Find or create second level category
//   let secondLevel = await Category.findOne({
//     name: secondLavelCategory,
//     parentCategory: topLevel._id,
//   });
//   console.log("second level : ", secondLevel);

//   if (!secondLevel) {
//     secondLevel = new Category({
//       name: secondLavelCategory,
//       parentCategory: topLevel._id,
//       level: 2,
//     });
//     secondLevel = await secondLevel.save();
//   }

//   // Find or create third level category
//   let thirdLevel = await Category.findOne({
//     name: thirdLavelCategory,
//     parentCategory: secondLevel._id,
//   });
//   console.log("third level : ", thirdLevel);

//   if (!thirdLevel) {
//     thirdLevel = new Category({
//       name: thirdLavelCategory,
//       parentCategory: secondLevel._id,
//       level: 3,
//     });
//     thirdLevel = await thirdLevel.save();
//   }

//   // Create and save the product
//   const product = new Product({
//     title,
//     color,
//     description,
//     discountedPrice,
//     discountPersent,
//     imageUrl,
//     brand,
//     price,
//     quantity,
//     category: thirdLevel,
//   });
//   console.log("product : ", product);

//   const savedProduct = await product.save();
//   return savedProduct;
// }

async function deleteProduct(productId) {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error("product not found with id - : ", productId);
  }

  await Product.findByIdAndDelete(productId);

  return "Product deleted Successfully";
}

// self code
async function updateProduct(productId, reqData) {
  console.log("update product called : ", productId, reqData);
  const updateProduct = await Product.findByIdAndUpdate(productId, reqData);
  return updateProduct;
}

// find product id
async function findProductById(productId) {
  const product = await Product.findById(productId).populate("category").exec();
  // console.log("product is ___ ",product);
  if (!product) {
    throw new Error("Product Not Found With This Id " + productId);
  }
  return product;
}

// self code
// async function findProductByCategory(category){
//   console.log("Service page category is : ", category);
//   try {

//     // Find products by category
//     const products = await Product.find().populate("category");
//     console.log("find Product By Category : ",products);
//     return products;
//   } catch (error) {
//     console.error(`Unable to find products by category: ${error}`);
//     throw new Error(`Unable to find products by category: ${error.message}`);
//   }
// }


// new code
async function findProductByCategory(category) {
  console.log("Service page category is: ", category);
  try {
    // Find the category by its name
    const existCategory = await Category.findOne({ name: category });
    // If category exists, query products by the category ID
    if (existCategory) {
      const products = await Product.find({ category: existCategory._id }).populate('category');
      // Return the found products
      return { content: products, curentPage: 1, totalPage: 1 }; // For simplicity, assuming single page for now
    } else {
      return { content: [], curentPage: 1, totalPage: 0 };
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}



async function getAllProducts(reqQuery) {
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;
  (pageSize = pageSize || 10), (pageNumber = pageNumber || 1);
  let query = Product.find().populate("category");


  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (existCategory)
      query = query.where("category").equals(existCategory._id);
    else return { content: [], currentPage: 1, totalPages:1 };
  }

  if (color) {
    const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
    const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    query = query.where("color").regex(colorRegex);
    // query = query.where("color").in([...colorSet]);
  }

  if (sizes) {
    const sizesSet = new Set(sizes);
    
    query = query.where("sizes.name").in([...sizesSet]);
  }

  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
    query = query.where("discountPersent").gt(minDiscount);
  }

  if (stock) {
    if (stock === "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
      query = query.where("quantity").lte(0);
    }
  }

  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }
  // Apply pagination
  const totalProducts = await Product.countDocuments(query);

  const skip = (pageNumber - 1) * pageSize;

  query = query.skip(skip).limit(pageSize);
  const products = await query.exec();
  const totalPages = Math.ceil(totalProducts / pageSize);

  return { content: products, currentPage: pageNumber, totalPages:totalPages };
}

// self code 
// async function getAllProducts(reqQuery) {
//   let {
//     category,
//     color,
//     size,
//     minPrice,
//     maxPrice,
//     minDiscount,
//     sort,
//     stock,
//     pageNumber,
//     pageSize,
//   } = reqQuery;

//   pageSize = pageSize || 10;

//   let query = Product.find().populate("category");

//   if (category) {
//     const existCategory = await Category.findOne({ name: category });
//     if (existCategory) {
//       query = query.where("category").equals(existCategory._id);
//     } else {
//       return { content: [], curentPage: 1, totalPage: 0 };
//     }
//   }
//   if (color) {
//     const colorSet = new Set(
//       color.split(",").map((color) => color.trim().toLoweCare())
//     );

//     const colorRegex =
//       colorSet.size > 0 ? new RegExp([...colorSet].join(" | "), "i") : null;

//     query = query.where("color").regex(colorRegex);
//   }

//   if (size) {
//     const sizesSet = new Set(size);
//     query.query.where("sizes.name").in([...sizesSet]);
//   }

//   if (minPrice && maxPrice) {
//     query = query.where("discountedPrice").get(minPrice).lte(maxPrice);
//   }

//   if (minDiscount) {
//     query = query.where("discountPersent").gt(minDiscount);
//   }

//   if (stock) {
//     if (stock == "in_stock") {
//       query = query.where("quantity").gt(0);
//     } else if (stock == "out_of_stock") {
//       query = query.where("quantity").gt(1);
//     }
//   }

//   if (sort) {
//     const sortDirection = sort === "price_hight" ? -1 : 1;
//     query = query.sort({ discountedPrice: sortDirection });
//   }

//   const totalProducts = await Product.countDocuments(query);

//   const skip = (pageNumber - 1) * pageSize;
//   query = query.skip(skip).limit(pageSize);

//   const products = await query.exec();

//   const totalPages = Math.ceil(totalProducts / pageSize);

//   return { content: products, curentPage: pageNumber, totalPages: totalPages };
// }

// async function getAllProducts(reqQuery) {
//   console.log("reqQuery : ", reqQuery);
//   let {
//     category,
//     color,
//     // sizes,
//     minPrice,
//     maxPrice,
//     minDiscount,
//     sort,
//     stock,
//     pageNumber,
//     pageSize,
//   } = reqQuery;
//   (pageSize = pageSize || 10), (pageNumber = pageNumber || 1);
//   let query = Product.find().populate("category");

//   if (category) {
//     const existCategory = await Category.findOne({ name: category });
//     if (existCategory)
//       query = query.where("category").equals(existCategory._id);
//     else return { content: [], currentPage: 1, totalPages: 1 };
//   }

//   if (color) {
//     const colorSet = new Set(
//       color.split(",").map((color) => color.trim().toLowerCase())
//     );
//     const colorRegex =
//       colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
//     query = query.where("color").regex(colorRegex);
//     // query = query.where("color").in([...colorSet]);
//   }

//   // if (sizes) {
//   //   const sizesSet = new Set(sizes);

//   //   query = query.where("sizes.name").in([...sizesSet]);
//   // }

//   if (minPrice && maxPrice) {
//     query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
//   }

//   if (minDiscount) {
//     query = query.where("discountPersent").gt(minDiscount);
//   }

//   // time 1:22:00
//   if (stock) {
//     if (stock === "in_stock") {
//       query = query.where("quantity").gt(0);
//     } else if (stock === "out_of_stock") {
//       query = query.where("quantity").lte(0);
//     }
//   }

//   if (sort) {
//     const sortDirection = sort === "price_high" ? -1 : 1;
//     query = query.sort({ discountedPrice: sortDirection });
//   }

//   // Apply pagination
//   const totalProducts = await Product.countDocuments(query);

//   const skip = (pageNumber - 1) * pageSize;

//   query = query.skip(skip).limit(pageSize);

//   const products = await query.exec();

//   const totalPages = Math.ceil(totalProducts / pageSize);

//   return { content: products, currentPage: pageNumber, totalPages: totalPages };
// }

// new code
// async function getAllProducts(reqQuery) {
//   let {
//     category,
//     color,
//     minPrice,
//     maxPrice,
//     minDiscount,
//     sort,
//     stock,
//     pageNumber,
//     pageSize,
//   } = reqQuery;

//   // Set defaults for pagination
//   pageSize = parseInt(pageSize, 10) || 10;
//   pageNumber = parseInt(pageNumber, 10) || 1;

//   // Start building the query
//   let query = Product.find().populate("category");

//   // Category filter
//   if (category) {
//     const existCategory = await Category.findOne({ name: category });
//     if (existCategory) {
//       query = query.where("category").equals(existCategory._id);
//     } else {
//       // If category doesn't exist, return empty result set
//       return { content: [], currentPage: 1, totalPages: 1 };
//     }
//   }

//   // Color filter
//   if (color) {
//     const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
//     const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
//     query = query.where("color").regex(colorRegex);
//   }

//   // Price filter
//   if (minPrice) minPrice = parseFloat(minPrice);
//   if (maxPrice) maxPrice = parseFloat(maxPrice);
//   if (minPrice && maxPrice) {
//     query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
//   } else if (minPrice) {
//     query = query.where("discountedPrice").gte(minPrice);
//   } else if (maxPrice) {
//     query = query.where("discountedPrice").lte(maxPrice);
//   }

//   // Discount filter
//   if (minDiscount) {
//     query = query.where("discountPercent").gt(minDiscount);
//   }

//   // Stock filter
//   if (stock) {
//     if (stock === "in_stock") {
//       query = query.where("quantity").gt(0);
//     } else if (stock === "out_of_stock") {
//       query = query.where("quantity").lte(0);
//     }
//   }

//   // Sorting
//   if (sort) {
//     const sortOrder = sort === "price_high" ? -1 : 1; // Descending for "price_high", ascending otherwise
//     query = query.sort({ discountedPrice: sortOrder });
//   }

//   // Apply pagination
//   const totalProducts = await Product.countDocuments(query);
//   const skip = (pageNumber - 1) * pageSize;
//   query = query.skip(skip).limit(pageSize);

//   // Execute query and get products
//   const products = await query.exec();
//   const totalPages = Math.ceil(totalProducts / pageSize);

//   return { content: products, currentPage: pageNumber, totalPages };
// }

async function createMultipleProduct(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProduct,
  findProductByCategory,
};
