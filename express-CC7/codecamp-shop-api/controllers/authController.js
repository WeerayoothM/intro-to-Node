const { emit } = require('../models/user');
const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    //* validate
    if (password !== confirmPassword) return res.status(400).json({ message: "Password not match" })

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    await user.save()

    res.status(201).json({ user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email }).select('+password');
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    if (user.password !== password) return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
};