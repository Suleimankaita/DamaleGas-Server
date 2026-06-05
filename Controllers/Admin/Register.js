const Admin = require('../../Model/Admin');
const Profile = require('../../Model/Profile');
const bcrypt = require('bcryptjs');
const CheckField = require('../../utils/AllFieldRequired');
const asynchandler = require('express-async-handler');

const RegisterAdmin = asynchandler(async (req, res) => {

    const { Username, FirstName, LastName, Password } = req.body;

if (!CheckField(req.body)) {
    return res.status(400).json({
        message: "All fields are required"
    });
}
    const foundAdmin = await Admin.findOne({ Username }).exec();

    if (foundAdmin) {
        return res.status(409).json({
            message: `${Username} already exists`
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const profile = await Profile.create({
        FirstName,
        LastName,
        Password:hashedPassword
    });

    await Admin.create({
        Username,
        Profile: profile._id
    });

    res.status(201).json({
        message: `${Username} created successfully`
    });
});

module.exports = RegisterAdmin;