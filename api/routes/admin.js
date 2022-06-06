const router = require("express").Router();
const crypto = require("crypto");
const {
    decodeHash
} = require('../../util/helper')

const jwt = require("jsonwebtoken");
const USER_TOKEN_EXPIRY_TIME = '80m'

const atob = require("atob");

const {
    IslandGirlMethods
} = require("../../service/contract");



router.post("/admin/release", async function (req, res) {
    try {

        let token = req.body.token;

        var decodedString = decodeHash(token); // Base64 decode the String
        decodedString = JSON.parse(atob(decodedString)); // Base64 decode the String
        console.log(decodedString);
        let releaseFundResponse = false;
        let sendCoin = decodedString.coin;

        if (sendCoin > 0 && sendCoin <= 190) {
            sendCoin = sendCoin * 10
            releaseFundResponse = await IslandGirlMethods.releaseFunds(decodedString.address, sendCoin);
        }

        res.status(200).send({
            message: releaseFundResponse
        })
    } catch (e) {
        res.status(200).send({
            message: false
        })
    }
})

router.get("/admin/checkUser", async function (req, res) {
    res.json({
        success: true,
    })
})

router.get("/admin/generateToken", async function (req, res) {
    const token = jwt.sign({
        game: 'islandGirl',
    }, process.env.SECRET, {
        expiresIn: USER_TOKEN_EXPIRY_TIME,
    });

    res.json({
        success: true,
        token: token,
    })
})

router.get("/admin/getMethods", async function (req, res) {
    let balanceOf = await IslandGirlMethods.getMethods();
    res.status(200).send({
        message: true
    })
})

router.get("/admin/balancOf", async function (req, res) {
    let address = req.query.address;
    console.log(address);
    let balanceOf = await IslandGirlMethods.balanceOf(address);
    res.status(200).send({
        message: balanceOf
    })
})




module.exports = router;