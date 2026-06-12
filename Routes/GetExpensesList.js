/**
 * @file GetExpensesList.js
 * @description Routes for retrieving all expenses
 * GET / - Fetch all expenses from the system
 */

const express = require('express');
const GetExpenses = require('../Controllers/Expenses/GetExpenses');
const verify = require('../Middleware/Verify');

const route = express();

/**
 * Route: GET /expenses/list
 * Middleware: verify (authentication required)
 * Controller: GetExpenses
 * Description: Retrieves all expense records
 */
route.route('/')
  .get(verify, GetExpenses);

module.exports = route;
