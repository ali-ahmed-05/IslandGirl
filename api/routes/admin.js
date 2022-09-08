const adminRouter = require("express").Router();

const {rewardRelease, checkUser, generateToken, getMethods, getBalanceOf} = require("../controllers/admin");

adminRouter.post("/release", rewardRelease);

adminRouter.get("/checkUser", checkUser);

adminRouter.get("/generateToken", generateToken);

adminRouter.get("/getMethods", getMethods);

adminRouter.get("/balancOf", getBalanceOf)

module.exports = adminRouter;