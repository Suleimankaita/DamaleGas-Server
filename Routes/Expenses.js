/**
 * @file Expenses.js
 * @description Consolidated routes for all Expense operations
 * Handles: Add Expenses, Get All Expenses, Get Expense by ID
 */

const express = require('express');
const AddExpenses = require('../Controllers/Expenses/AddExpenses');
const GetExpenses = require('../Controllers/Expenses/GetExpenses');
const GetExpenseById = require('../Controllers/Expenses/GetExpenseById');
const verify = require('../Middleware/Verify');

const route = express();

/**
 * POST /api/expenses
 * Add new expense
 * Middleware: verify (authentication required)
 * Body: { Amount, Description }
 */
route.route('/')
  .post(verify, AddExpenses);

/**
 * GET /api/expenses/list
 * Get all expenses
 * Middleware: verify (authentication required)
 */
route.route('/list')
  .get(verify, GetExpenses);

/**
 * GET /api/expenses/getbyid?id=expenseId
 * Get expense by ID
 * Middleware: verify (authentication required)
 * Query: { id }
 */
route.route('/getbyid')
  .get(verify, GetExpenseById);

module.exports = route;