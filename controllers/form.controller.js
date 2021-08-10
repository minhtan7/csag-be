const Form = require("../Models/Form");
const User = require("../Models/User");
const utilsHelper = require("../helpers/utils.helper");
const geolib = require("geolib");
const formController = {};

formController.createForm = async (req, res, next) => {
  try {
    const userId = req.userId;
    let { items, type } = req.body;

    let products = await Form.create({
      userId: userId,
      items,
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

formController.getSingleForm = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.userId;

    const user = await User.findById(userId);
    let form = await Form.findById(id).populate("userId").lean();
    console.log(form);
    form.distance = geolib.getDistance(form.userId.geocode, user.geocode);
    res.status(200).json({
      success: true,
      data: { form },
      message: `Get Single Form`,
    });
  } catch (err) {
    next(err);
  }
};

formController.matchingReceiver = async (req, res, next) => {
  try {
    const userId = req.userId;
    const formId = req.params.id;
    let { page, limit } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 20;

    const user = await User.findById(userId);
    let currentForm = await Form.findById(formId).lean();
    //choose all form that match district and big categories
    // const forms = await Form.aggregate([
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "userId",
    //       foreignField: "_id",
    //       as: "er",
    //     },
    //   },
    //   { $unwind: { path: "$items" } },
    //   { $unwind: { path: "$user" } },
    //   {
    //     $match: {
    //       user: {
    //         city: "Ho Chi Minh City",
    //       },
    //     },
    //   },
    // ]);
    const forms = await Form.find({ type: "need" }).populate("userId").lean();
    const sortingForm = forms.filter((form) => {
      if (form.userId.city === user.city) {
        let match;
        form.items.forEach((item) => {
          currentForm.items.forEach((current) => {
            if (item.name === current.name) {
              match = true;
            }
          });
        });
        if (match) return true;
      }
    });
    //calculate distance and sort
    let sortingReceiver = sortingForm.map((form) => {
      return {
        ...form,
        distance: geolib.getDistance(form.userId.geocode, user.geocode),
      };
    });

    sortingReceiver.sort((a, b) => a.distance - b.distance);
    const totalReceiver = sortingReceiver.length;
    const totalPage = Math.ceil(totalReceiver / limit);
    const offset = limit * (page - 1);

    sortingReceiver = sortingReceiver.slice(offset, limit);

    // console.log(sortingReceiver);
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { sortingReceiver, totalPage, totalReceiver, page, limit },
      null,
      "Matching form"
    );
  } catch (err) {
    next(err);
  }
};
module.exports = formController;
