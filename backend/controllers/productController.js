import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// ADD PRODUCT
const addProduct = async (req, res) => {
    try {
        console.log("========== ADD PRODUCT START ==========");

        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller
        } = req.body;

        // Validate fields
        if (!name || !description || !price || !category || !subCategory) {
            return res.status(400).json({
                success: false,
                message: "All product fields are required"
            });
        }

        if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product price"
            });
        }

        // Get images
        const files = req.files || {};

        const images = [
            files.image1?.[0],
            files.image2?.[0],
            files.image3?.[0],
            files.image4?.[0]
        ].filter(Boolean);

        if (images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please upload at least one image"
            });
        }

        // Upload images to Cloudinary
        const imageUrls = await Promise.all(
            images.map(async (file) => {

                console.log("Uploading:", file.path);

                const result = await cloudinary.uploader.upload(
                    file.path,
                    {
                        resource_type: "image"
                    }
                );

                console.log("Cloudinary URL:", result.secure_url);

                return result.secure_url;
            })
        );

        // Parse sizes
        let parsedSizes;

        try {
            parsedSizes = typeof sizes === "string"
                ? JSON.parse(sizes)
                : sizes;
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid sizes format"
            });
        }

        if (!Array.isArray(parsedSizes)) {
            return res.status(400).json({
                success: false,
                message: "Sizes must be an array"
            });
        }

        // Product data
        const productData = {
            name: name.trim(),
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: parsedSizes,
            bestseller: bestseller === "true" || bestseller === true,
            image: imageUrls,
            date: Date.now()
        };

        console.log("PRODUCT DATA:", productData);

        // Save product in MongoDB
        console.log("BEFORE MONGODB SAVE");

        const product = await productModel.create(productData);

        console.log("PRODUCT SAVED SUCCESSFULLY");
        console.log("PRODUCT ID:", product._id);
        console.log("DATABASE:", productModel.db.name);
        console.log("COLLECTION:", productModel.collection.name);

        // Verify saved product
        const checkProduct = await productModel.findById(product._id);

        console.log("MONGODB VERIFICATION:", checkProduct ? "SUCCESS" : "FAILED");

        return res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product: checkProduct
        });

    } catch (error) {

        console.error("PRODUCT SAVE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET ALL PRODUCTS
const listProducts = async (req, res) => {
    try {

        const products = await productModel.find({});

        return res.json({
            success: true,
            products
        });

    } catch (error) {

        console.error("LIST PRODUCT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// REMOVE PRODUCT
const removeProduct = async (req, res) => {
    try {

        const { id } = req.body;

        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.json({
            success: true,
            message: "Product Removed"
        });

    } catch (error) {

        console.error("REMOVE PRODUCT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET SINGLE PRODUCT
const singleProducts = async (req, res) => {
    try {

        const { productId } = req.body;

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.json({
            success: true,
            product
        });

    } catch (error) {

        console.error("SINGLE PRODUCT ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export {
    addProduct,
    listProducts,
    removeProduct,
    singleProducts
};