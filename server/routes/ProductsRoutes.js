const express = require("express");
const router = express.Router();
const productsControllers = require("../controllers/productsControllers");
const multer = require("multer");
require("../models/database");
const Product = require("../models/Product");
const fs = require("fs");

router.get("/", productsControllers.adminDashboard);
router.get("/product/submit-product", productsControllers.submitProduct);
router.get("/product/update/:id", productsControllers.updateProduct);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/image1");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });
var uploadMultiple = upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
]);

//submit products

router.post(
  "/product/submit-product",
  uploadMultiple,
  function (req, res, next) {
    // if (req.files) {
    //   console.log(req.files);

    //   console.log("files uploaded");
    // }
    const product = new Product({
      name: req.body.name,
      gid: req.body.gid,
      designer: req.body.designer,
      description: req.body.description,
      description2: req.body.description2,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image1: req.files.image1,
      image2: req.files.image2,
      image3: req.files.image3,
      image4: req.files.image4,
    });
    product.save((err) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        req.session.message = {
          type: "success",
          message: "product added successgully",
        };
        res.redirect("/admin");
      }
    });
  }
);

// router.post("/product/submit-product", upload, (req, res) => {
//   const product = new Product({
//     name: req.body.name,
//     gid: req.body.gid,
//     designer: req.body.designer,
//     description: req.body.description,
//     description2: req.body.description2,
//     ingredients: req.body.ingredients,
//     category: req.body.category,
//     image1: req.file.filename,
//   });
//   product.save((err) => {
//     if (err) {
//       res.json({ message: err.message, type: "danger" });
//     } else {
//       req.session.message = {
//         type: "success",
//         message: "product added successgully",
//       };
//       res.redirect("/admin");
//     }
//   });
// });

// edit products
router.post("/product/update/:id", uploadMultiple, function (req, res, next) {
  let id = req.params.id;
  // let new_image = [];

  // if (req.file) {
  //   new_image = req.files.image1;
  //   try {
  //     fs.unlinkSync(
  //       "./public/uploads/image1/" + req.body.old_image1[0].filename
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // } else {
  //   new_image = req.body.old_image1;
  // }

  Product.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      gid: req.body.gid,
      designer: req.body.designer,
      description: req.body.description,
      description2: req.body.description2,
      ingredients: req.body.ingredients,
      category: req.body.category,
      // image1: new_image,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        req.session.message = {
          type: "success",
          message: "Usser " + req.body.name + " Updated Sucessfully",
        };
        res.redirect("/admin");
      }
    }
  );
});

router.get("/product/delete/:id", (req, res) => {
  let id = req.params.id;
  Product.findByIdAndRemove(id, (err, result) => {
    if (
      result.image1 ||
      result.image2 ||
      result.image3 ||
      result.image4 != ""
    ) {
      try {
        fs.unlinkSync("./public/uploads/image1/" + result.image1[0].filename);
        fs.unlinkSync("./public/uploads/image1/" + result.image2[0].filename);
        fs.unlinkSync("./public/uploads/image1/" + result.image3[0].filename);
        fs.unlinkSync("./public/uploads/image1/" + result.image4[0].filename);
      } catch (err) {
        console.log(err);
      }
    }
    if (err) {
      res.json({ message: err.message });
    } else {
      req.session.message = {
        type: "success",
        message: "Usser  " + req.body.name + "  Deleted Sucessfully",
      };
      res.redirect("/admin");
    }
  });
});
module.exports = router;
