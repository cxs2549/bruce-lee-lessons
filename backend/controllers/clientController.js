const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const Client = require("../models/clientModel")

// @desc   Register a client
// @route  POST /api/clients
// @access Public
const registerClient = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please provide all required fields")
  }
  // Check if client already exists
  const clientExists = await Client.findOne({ email })

  if (clientExists) {
    res.status(400)
    throw new Error("Client already exists")
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create client
  const client = await Client.create({
    name,
    email,
    password: hashedPassword,
  })

  if (client) {
    res.status(201).json({
      _id: client._id,
      name: client.name,
      email: client.email,
      token: generateToken(client._id),
    })
  } else {
    res.status(400)
    throw new Error("Client could not be created")
  }
})

// @desc   Authenticate a client
// @route  POST /api/clients/login
// @access Public
const loginClient = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  // Check if client exists
  const client = await Client.findOne({ email })

  if (client && (await bcrypt.compare(password, client.password))) {
    res.json({
      _id: client._id,
      name: client.name,
      email: client.email,
      token: generateToken(client._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = {
  registerClient,
  loginClient,
}
