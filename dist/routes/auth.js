"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
// POST /api/signup
router.post('/signup', auth_1.signupUser);
// GET /api/verify/:uniqueIdentifier
router.get('/verify/:uniqueIdentifier', auth_1.verifyEmail);
// POST /api/signin
router.post('/signin', auth_1.signinUser);
// GET /api/signout
router.get('/signout', auth_1.signoutUser);
// POST /api/reset-password
router.post('/reset-password', auth_1.resetPassword);
exports.default = router;
