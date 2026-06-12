/**
 * @file GetExpenseById.js
 * @description Controller for retrieving a specific expense by ID
 * Handles fetching individual expense records with validation
 */

const Expenses = require('../../Model/Expenses');
const asynchandler = require('express-async-handler');
const CheckField = require('../../utils/AllFieldRequired');

/**
 * GetExpenseById Controller
 * 
 * @description Retrieves a single expense record by ID from the database
 * Validates that both user and expense ID are provided
 * Verifies the expense exists before returning
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.id - Expense ID to retrieve (required)
 * @param {string} req.id - User ID from verified token (set by middleware)
 * 
 * @param {Object} res - Express response object
 * 
 * @returns {Object} JSON response with expense data and status
 * 
 * @example
 * GET /api/expenses/getbyid?id=507f1f77bcf86cd799439011
 * 
 * Response: {
 *   "data": {
 *     "_id": "507f1f77bcf86cd799439011",
 *     "Amount": 5000,
 *     "Description": "Office supplies",
 *     "Time": "10:30:45 AM",
 *     "Date": "2026-06-06",
 *     "createdAt": "2026-06-06T10:30:45.000Z"
 *   },
 *   "status": true
 * }
 */
const GetExpenseById = asynchandler(async (req, res) => {
  // Get user ID from verified token (set by middleware)
  const userId = req.id;

  // Extract expense ID from query parameters
  const { id } = req.query;

  // Validate that both user ID and expense ID are provided
  const checkfield = CheckField({ userId, id });
  if (!checkfield.success) {
    return res.status(400).json({
      message: `${checkfield.field} is Required`
    });
  }

  // Find the expense by ID in the database
  const expenseFound = await Expenses.findById(id);

  // Return error if expense not found
  if (!expenseFound) {
    return res.status(404).json({
      status: false,
      message: 'Expense not found'
    });
  }

  // Return the found expense
  res.status(200).json({
    data: expenseFound,
    status: true
  });
});

module.exports = GetExpenseById;
