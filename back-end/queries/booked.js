const db = require("../db/dbConfig.js");

DROP TABLE IF EXISTS booked CASCADE;
CREATE TABLE booked (
    -- user_id FOREIGN KEY REFERENCES users(user_id)(ON UPDATE CASCADE ON DELETE CASCADE),
    -- event_id FOREIGN KEY REFERENCES events(event_id)(ON UPDATE CASCADE ON DELETE CASCADE),
    -- task_id FOREIGN KEY REFERENCES tasklist(task_id),
    user_id  SERIAL, CONSTRAINT fk_booked_users FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    event_id SERIAL, CONSTRAINT fk_booked_events FOREIGN KEY(event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    task_id SERIAL, CONSTRAINT fk_booked_tasklist FOREIGN KEY(task_id) REFERENCES tasklist(task_id) ON DELETE CASCADE,
    vendor_name VARCHAR (255) NOT NULL, 
    vendor_address VARCHAR (255) NOT NULL,
    vendor_phone_number VARCHAR (10) NOT NULL,
    amount INTEGER
);

//index
const getAllBooked = async () => {
  try {
    const allBooked = await db.any(
      "SELECT * FROM booked ORDER BY name ASC"
    );
    return allProducts;
  } catch (err) {
    return err;
  }
};
//Show
const getProduct = async (id) => {
  try {
    const oneProduct = await db.one("SELECT * FROM products WHERE id=$1", id);
    return oneProduct;
  } catch (err) {
    return err;
  }
};
//create
const createProduct = async (product) => {
  try {
    const newProduct = await db.one(
      "INSERT INTO products (name, price, category, is_popular, img) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        product.name,
        product.price,
        product.category,
        product.is_popular,
        product.img,
      ]
    );
    return newProduct;
  } catch (err) {
    return err;
  }
};

//delete
const deleteProduct = async (id) => {
  try {
    const deletedProduct = await db.one(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      id
    );
    return deletedProduct;
  } catch (err) {
    return err;
  }
};

//update
const updateProduct = async (id, product) => {
  try {
    const updatedProduct = await db.one(
      "UPDATE products SET name=$1, price=$2, category=$3, is_popular=$4, img=$5 WHERE id=$6 RETURNING *",
      [
        product.name,
        product.price,
        product.category,
        product.is_popular,
        product.img,
        id,
      ]
    );
    return updatedProduct;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
};
