const router = require("express").Router();

const postgresql = require("./postgresql");
const archivo = require("./archivo");

router.use("/postgresql", postgresql);
router.use("/archivo/:ori", archivo);

module.exports = router;