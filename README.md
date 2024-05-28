# E-commerce Website Models (Schema) with Mongoose

This repository contains Mongoose models for an e-commerce website. These models include `User`, `Category`, `Order`, and `Product`, which define the schema for each entity in the application.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Schemas](#schemas)
  - [User Schema](#user-schema)
  - [Category Schema](#category-schema)
  - [Order Schema](#order-schema)
  - [Product Schema](#product-schema)

## Introduction

Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data. This README explains the schemas used in this e-commerce application, including their properties and configurations.

## Installation

To use these models, you need to have Node.js and MongoDB installed. Then, install Mongoose using npm:

```bash
npm install mongoose
```

## Schemas
### User Schema
The `User` schema defines the structure for user documents in the application.

```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
```

**Properties:**
- `username`: A unique, required string that is stored in lowercase and trimmed of whitespace.
- `email`: A unique, required string that is stored in lowercase and trimmed of whitespace.
- `password`: A required string to store the user's password.
- `timestamps`: Automatically adds createdAt and updatedAt fields.

### Category Schema
The `Category` schema defines the structure for product categories.

```javascript
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
```

**Properties:**
- `name`: A required string that represents the category name.
- `timestamps`: Automatically adds createdAt and updatedAt fields.

### Order Schema
The `Order` schema defines the structure for customer orders, including embedded order items.

```javascript
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true,
        }
    }
);

const orderSchema = new mongoose.Schema(
    {
        orderPrice: {
            type: Number,
            required: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        orderItems: [orderItemSchema],
        address: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "CANCELLED", "DELIVERED"],
            default: "PENDING",
        }
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
```

**Properties:**
- `orderPrice`: A required number representing the total price of the order.
- `customer`: A reference to the User who placed the order.
- `orderItems`: An array of orderItemSchema, each representing an item in the order.
- `address`: A required string for the delivery address.
- `status`: A string that can be PENDING, CANCELLED, or DELIVERED, with a default value of PENDING.
- `timestamps`: Automatically adds createdAt and updatedAt fields.

### Product Schema
The `Product` schema defines the structure for products available in the store.

```javascript
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        productImage: {
            type: String,
        },
        price: {
            type: Number,
            default: 0,
        },
        stock: {
            type: Number,
            default: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
```

**Properties:**
- `description`: A required string describing the product.
- `name`: A required string for the product name.
- `productImage`: An optional string for the URL of the product image.
- `price`: A number with a default value of 0 representing the product price.
- `stock`: A number with a default value of 0 representing the available stock.
- `category`: A required reference to the Category to which the product belongs.
- `owner`: A reference to the User who owns the product.
- `timestamps`: Automatically adds createdAt and updatedAt fields.


## Conclusion
These Mongoose schemas provide a robust foundation for the data model of an e-commerce website. Each schema is carefully designed with appropriate properties and constraints to ensure data integrity and consistency. By understanding and utilizing these schemas, you can effectively manage and interact with your application's data.
