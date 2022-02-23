const asyncHandler = require('express-async-handler');

const getClasses = asyncHandler(async (req, res) => {
  res.json({message: 'get classes'});
})
const setClass = asyncHandler(async (req, res) => {
  res.json({message: 'create a class'});
})
const updateClass = asyncHandler(async (req, res) => {
  res.json({message: 'edit class'});
})
const deleteClass = asyncHandler(async (req, res) => {
  res.json({message: 'delete class'});
})

module.exports = {
  getClasses,
  setClass,
  updateClass,
  deleteClass
}