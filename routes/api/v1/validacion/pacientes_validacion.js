const { check } = require("express-validator");
const { validateResult } = require("./validateHelper");

const validateCreate = [
    check('nombres')
    .exists()
    .not()
    .isEmpty(),
    (req, res, next)=>{
        validateResult(req, res, next)
    }
]

const validatenew = [
    check('nombres')
        .exists()
        .not()
        .isEmpty(),
    check('apellidos')
        .exists()
        .not()
        .isEmpty(),
    check('identidad')
        .exists()
        .not()
        .isEmpty(),
    check('email')
        .exists()
        .not()
        .isEmpty(),
    check('telefono')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]
const validateupdate = [
    check('nombres')
        .exists()
        .not()
        .isEmpty(),
    check('apellidos')
        .exists()
        .not()
        .isEmpty(),
    check('identidad')
        .exists()
        .not()
        .isEmpty(),
    check('email')
        .exists()
        .not()
        .isEmpty(),
    check('telefono')
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) =>{
        validateResult(req, res, next)
    }
]


module.exports = { validateCreate, validatenew, validateupdate }