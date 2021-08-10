const Form = require("../Models/Form");
const User = require("../Models/User");
const geolib = require("geolib");
const formController = {};

formController.createForm = async (req, res, next) => {
  try {
    const userId = req.userId;
    let { items, status, type } = req.body;

    let products = await Form.create({
      userId: userId,
      items,
      status,
      type,
    });
    res.status(200).json({
      success: true,
      data: products,
      message: `products list created`,
    });
  } catch (err) {
    next(err);
  }
};
formController.matchingReceiver = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const form = await Form.find({ userId });

    //choose all form that match district and big categories
    const forms = await Form.aggregate([
      {
        $lookup: {
          from: "User",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: {
          $and: [
            { "$user.city": user.city },
            { categories: { $in: form.categories } },
          ],
        },
      },
    ]);
    //calculate distance and sort
    const sortingReceiver = forms
      .map((f) => {
        return {
          ...r,
          distances: geolib.getDistance(r.user.geocode, user.geocode),
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20);

    utilsHelper.sendResponse(
      res,
      200,
      true,
      { sortingReceiver },
      null,
      "Matching form"
    );
  } catch (err) {
    next(err);
  }
};
module.exports = formController;
