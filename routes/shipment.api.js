let express = require("express");
const shipmentController = require("../controllers/shipment.controller");
let router = express.Router();

/**
 * @route GET api/shipping?page=1&limit=10
 * @description Get all shipping news with pagination
 * @access Public
 */
router.get("/", shipmentController.getShipment);

/**
 * @route Post api/shipping?page=1&limit=10
 * @description post all shipping news with pagination
 * @access Public
 */

module.exports = router;
