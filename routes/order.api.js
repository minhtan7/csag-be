let express = require("express");
const authMiddleware = require("../middleweares/authentication");
const orderController = require("../controllers/order.controller");

let router = express.Router();

/**
 * @route Post api/orders/:userId
 * @description create orders
 * @access Login required
 */
router.post("/:id", authMiddleware.loginrequired, orderController.createOrder);

/**
 * @route get api/orders?page=1&limit=10
 * @description Get all orders news with pagination
 * @access Login required
 */

router.get("/", orderController.getAllOrders);

/**
 * @route get api/orders/:id
 * @description Get all orders news with pagination
 * @access Login required
 */

router.get("/:id", orderController.getSingleOrder);
/**
 * @route push api/orders
 * @description Update orders
 * @access Login required
 */

router.post("/", authMiddleware.loginrequired, orderController.updateOrder);
module.exports = router;
