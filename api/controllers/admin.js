const jwt = require('jsonwebtoken')
const {decodeHash} = require("../../util/helper");
const atob = require("atob");
const {IslandGirlMethods} = require("../../service/contract");

const USER_TOKEN_EXPIRY_TIME = '80m'

/*
@desc     Reward User when Level Complete
@route    POST /api/admin/release
@access   Private
*/

const rewardRelease = async (req, res) => {
    try {
            let {address, sendCoin} = req.body;
        // let decodedString = decodeHash(token); // Base64 decode the String
        // console.log('decodedString', decodedString);
        // console.log('::::::::: ATOB :::::::::::::',atob(decodedString));
        // decodedString = JSON.parse(atob(decodedString)); // Base64 decode the String
        // console.log('decodedString', decodedString);
        // console.log(decodedString);

        let releaseFundResponse = false;
        // let sendCoin = decodedString.coin;

        if (sendCoin > 0 && sendCoin <= 190) {
            sendCoin = Number(sendCoin) * 10
            releaseFundResponse = await IslandGirlMethods.releaseFunds(address, sendCoin);
            if(releaseFundResponse.status)
                return res.status(200).send({ status: true,  message: 'Successfully Earned' })
        }

            res.status(400).send({ status: false,  message: releaseFundResponse.message })
    } catch (e) {
        console.log('Error occurred while releasing reward', e);
        res.status(400).send({status: false, message: e.message})
    }
};

/*
@desc     Check admin user
@route    POST /api/admin/checkUser
@access   Private
*/
const checkUser = async (req, res) => {
    res.json({success: true})
};

/*
@desc     generate JWT Token
@route    POST /api/admin/generateToken
@access   Public
*/
const generateToken = async (req, res) => {
    try {
        const token = jwt.sign({
            game: 'islandGirl',
        }, process.env.SECRET, {
            expiresIn: USER_TOKEN_EXPIRY_TIME,
        });

        res.json({
            success: true,
            token: token,
        })
    } catch (e) {
        console.log('Error occurred while generating token', e);
        res.status(400).send({status: false, message: e.message})
    }
};

/*
@desc     get Contract Methods
@route    POST /api/admin/getMethods
@access   Private
*/
const getMethods = async (req, res) => {
    try {
        let balanceOf = await IslandGirlMethods.getMethods();
        res.status(200).send({message: true });
    }catch (e) {
        console.log('Error occurred while get methods', e);
        res.status(400).send({status: false, message: e.message})
    }
};

/*
@desc     get Balance of Address
@route    POST /api/admin/balancOf
@access   Private
*/
const getBalanceOf = async (req, res) => {
    try {
        let address = req.query.address;
        console.log(address);
        let balanceOf = await IslandGirlMethods.balanceOf(address);
        res.status(200).send({
            message: balanceOf
        })
    }catch (e) {
        console.log('Error occurred while getting balance of address', e);
        res.status(400).send({status: false, message: e.message})
    }
};

module.exports = {rewardRelease, checkUser,generateToken, getMethods,getBalanceOf}