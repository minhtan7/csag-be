let express = require("express");
let router = express.Router();

//shippingApi//

const shipmentApi = require("./shipment.api");
router.use("/shipment", shipmentApi);

/////// userApi
const userApi = require("./user.api");
router.use("/users", userApi);

/////// userApi
const itemApi = require("./item.api");
router.use("/item", itemApi);

/////// catagoryApi
const catagoryApi = require("./catagory.api");
router.use("/catagory", catagoryApi);
module.exports = router;
