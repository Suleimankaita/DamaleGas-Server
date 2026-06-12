/**
 * @file GetExpensesById.js
 * @description Routes for retrieving a specific expense by ID
 * GET /ById - Fetch a single expense by ID
 */

const express = require('express');
const GetExpenseById = require('../Controllers/Expenses/GetExpenseById');
const verify = require('../Middleware/Verify');

const route = express();

/**
 * Route: GET /expenses/getbyid?id=expenseId
 * Middleware: verify (authentication required)
 * Controller: GetExpenseById
 * Description: Retrieves a single expense record by ID
 * 
 * Query Parameters:
 * - id (required): The MongoDB ID of the expense to retrieve
 */
route.route('/ById')
  .get(verify, GetExpenseById);

module.exports = route;
