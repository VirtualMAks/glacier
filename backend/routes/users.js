const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const csvtojson = require('csvtojson');

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/import", async (req,res)=>{

	csvtojson().fromFile("posts.csv").then(csvData =>{
		console.log(csvData);
		User.insertMany(csvData).then(function () {
			console.log("Data Inserted")
			res.json({success:'success'});

		}).catch(function (error){
			console.log("in catch router/users",error);
		});
	});
})

module.exports = router;