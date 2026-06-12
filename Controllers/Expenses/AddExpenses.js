/**
 * @file AddExpenses.js
 * @description Controller for adding new expenses to the system
 * Handles expense creation with validation, activity logging, and error handling
 */

const Expenses = require('../../Model/Expenses');
const Admin = require('../../Model/Admin');
const ActivityLogs = require('../../Model/ActivityLogs');
const CheckField = require('../../utils/AllFieldRequired');
const asynchandler = require('express-async-handler');

/**
 * AddExpenses Controller
 * 
 * @description Creates a new expense record in the database
 * Validates all required fields (Amount and Description)
 * Logs the activity in ActivityLogs for audit trail
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {number} req.body.Amount - Amount of the expense (required)
 * @param {string} req.body.Description - Description of the expense (required)
 * @param {string} req.id - User ID from middleware verification
 * 
 * @param {Object} res - Express response object
 * 
 * @returns {Object} JSON response with status and message
 * 
 * @example
 * POST /api/expenses/add
 * {
 *   "Amount": 5000,
 *   "Description": "Office supplies purchase"
 * }
 * 
 * Response: {
 *   "message": "Expense added successfully",
 *   "status": false
 * }
 */
const AddExpenses = asynchandler(async (req, res) => {
  // Extract Amount and Description from request body
  const { Amount, Description ,category} = req.body;

  // Get user ID from verified token (set by middleware)
  const userId = req.id;

  // Validate that all required fields are present
  const Checklist = CheckField({ Amount, Description });
  if (!Checklist.success) {
    return res.status(400).json({
      message: `All Fields Are Required - ${Checklist.field} is missing`,
      field: Checklist.field
    });
  }

  // Find the admin user to get username for logging purposes
  const found = await Admin.findById(userId).lean();

  if (!found) {
    return res.status(400).json({
      message: 'User not found'
    });
  }

  // Create activity log entry for audit trail
  const Activity = await ActivityLogs.create({
    Username: found.Username,
    LogType: `Added new Expense: ${Description}`
  });

  // Create the new expense record with automatic time and date
  const ExpenseRecord = await Expenses.create({
    Amount,
    Description,
    category
    // Time and Date are automatically set by model defaults
  });

  // Send success response
  res.status(201).json({
    message: `Expense of ${Amount} has been added successfully`,
    status: false,
    data: ExpenseRecord
  });
});

module.exports = AddExpenses;
