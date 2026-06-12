/**
 * @file GetExpenses.js
 * @description Controller for retrieving all expenses from the system
 * Handles fetching expense records with user verification
 */

const Expenses = require('../../Model/Expenses');
const asynchandler = require('express-async-handler');
const CheckField = require('../../utils/AllFieldRequired');

/**
 * GetExpenses Controller
 * 
 * @description Retrieves all expense records from the database
 * Verifies user authentication through middleware
 * Returns empty array if no expenses found
 * 
 * @param {Object} req - Express request object
 * @param {string} req.id - User ID from verified token (set by middleware)
 * 
 * @param {Object} res - Express response object
 * 
 * @returns {Object} JSON response with expense data and status
 * 
 * @example
 * GET /api/expenses/list
 * 
 * Response: {
 *   "data": [
 *     {
 *       "_id": "507f1f77bcf86cd799439011",
 *       "Amount": 5000,
 *       "Description": "Office supplies",
 *       "Time": "10:30:45 AM",
 *       "Date": "2026-06-06"
 *     }
 *   ],
 *   "status": true
 * }
 */
const GetExpenses = asynchandler(async (req, res) => {
  // Get user ID from verified token (set by middleware)
  const userId = req.id;

  // Validate that user ID is present
  const checkfield = CheckField({ userId });
  if (!checkfield.success) {
    return res.status(400).json({
      message: `${checkfield.field} is Required`
    });
  }

  // Fetch all expenses from the database, sorted by most recent first
  const expensesList = await Expenses.find().sort({ createdAt: -1 }).exec();

  // Return empty array if no expenses found (not an error)
  if (!expensesList.length) {
    return res.status(200).json({
      status: true,
      data: [],
      message: 'No expenses found'
    });
  }

  // Return all expenses found
  res.status(200).json({
    data: expensesList,
    status: true,
    count: expensesList.length
  });
});

module.exports = GetExpenses;
