import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { People, Category, ViewList, TrendingUp } from "@mui/icons-material";
import axios from "axios";

// Import child components
import CategoryPieChart from "../../components/dashboard/CategoryPieChart";
import RecentUsersTable from "../../components/dashboard/RecentUsersTable";
import RecentAdsTable from "../../components/dashboard/RecentAdsTable";

// Component: StatCard
// Props: title, count, icon, color
// Renders a Material UI Card displaying the icon, title, and count number
const StatCard = ({ title, count, icon: Icon, color }) => {
  return (
    <Card sx={{ height: "100%", boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {count}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: "50%",
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon sx={{ color: "white", fontSize: 30 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Component: Dashboard
// 1. State for 'stats' (null) and 'loading' (true)
// 2. useEffect to fetch data from '/api/dashboard/stats' using axios.
//    Include Authorization header with Bearer token from localStorage.
// 3. Render a responsive MUI Grid layout:
//    - Top row: 4 StatCards (Total Users, Total Ads, Categories, Active Views)
//    - Middle row: CategoryPieChart (xs=12, md=4) and RecentUsersTable (xs=12, md=8)
//    - Bottom row: RecentAdsTable (xs=12)
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // Fetch listings
      const listingsResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/listings`,
      );
      const listings =
        listingsResponse.data.listings || listingsResponse.data || [];

      // Fetch users
      const usersResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
        { headers },
      );
      const users = Array.isArray(usersResponse.data)
        ? usersResponse.data
        : usersResponse.data.users || [];

      // Calculate stats from fetched data
      const categoryCount = {};
      listings.forEach((listing) => {
        const category = listing.category || "Other";
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });

      const categoryData = Object.keys(categoryCount).map((key) => ({
        name: key,
        value: categoryCount[key],
      }));

      // Sort and get recent items
      const recentListings = listings
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      const recentUsers = users
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({
        totalUsers: users.length,
        totalAds: listings.length,
        totalCategories: Object.keys(categoryCount).length,
        activeViews: listings.reduce(
          (sum, listing) => sum + (listing.views || 0),
          0,
        ),
        categoryData: categoryData,
        recentUsers: recentUsers,
        recentAds: recentListings,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        width: "100%",
        minHeight: "100vh",
        p: 0,
        overflowX: "hidden",
      }}
    >
      {/* Header - Reduced margin to save space */}
      <Box sx={{ mb: 2, p: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Welcome back! Here's what's happening with your platform today.
        </Typography>
      </Box>

      {/* Top row: 4 StatCards */}
      {/* Added 'px: 2' to keep content slightly off the absolute edge if desired, or remove for total flush */}
      <Box sx={{ px: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Users"
              count={stats?.totalUsers || 0}
              icon={People}
              color="#3f51b5"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Ads"
              count={stats?.totalAds || 0}
              icon={ViewList}
              color="#f50057"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Categories"
              count={stats?.totalCategories || 0}
              icon={Category}
              color="#ff9800"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Views"
              count={stats?.activeViews || 0}
              icon={TrendingUp}
              color="#4caf50"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Middle row: CategoryPieChart on left, RecentUsersTable and RecentAdsTable on right */}
      <Box sx={{ px: 2, mb: 3 }}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} md={6}>
            {/* Removed minHeight fixed pixel constraint to let it fit naturally if needed */}
          {/* <Box sx={{ height: "100%", minHeight: 400 }}>
              <CategoryPieChart data={stats?.categoryData || []} />
            </Box>
          </Grid> */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <RecentUsersTable users={stats?.recentUsers || []} />
              <RecentAdsTable ads={stats?.recentAds || []} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
