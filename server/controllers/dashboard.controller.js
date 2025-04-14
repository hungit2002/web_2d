const dashboardService = require('../services/dashboard.service');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ error: 'Failed to get dashboard statistics' });
  }
};

// Get revenue data for charts
const getRevenueData = async (req, res) => {
  try {
    const { period } = req.query;
    const data = await dashboardService.getRevenueData(period);
    res.json(data);
  } catch (error) {
    console.error('Error getting revenue data:', error);
    res.status(500).json({ error: 'Failed to get revenue data' });
  }
};

// Get user registration data for charts
const getUserRegistrationData = async (req, res) => {
  try {
    const { period } = req.query;
    const data = await dashboardService.getUserRegistrationData(period);
    res.json(data);
  } catch (error) {
    console.error('Error getting user registration data:', error);
    res.status(500).json({ error: 'Failed to get user registration data' });
  }
};

// Get order data for charts
const getOrderData = async (req, res) => {
  try {
    const { period } = req.query;
    const data = await dashboardService.getOrderData(period);
    res.json(data);
  } catch (error) {
    console.error('Error getting order data:', error);
    res.status(500).json({ error: 'Failed to get order data' });
  }
};

module.exports = {
  getDashboardStats,
  getRevenueData,
  getUserRegistrationData,
  getOrderData
};