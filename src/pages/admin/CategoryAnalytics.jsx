import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import axios from "axios";
import CategoryPieChart from "../../components/dashboard/CategoryPieChart";

const CategoryAnalytics = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/listings`,
      );
      const listingsData = response.data.listings || response.data || [];
      setListings(listingsData);

      // Calculate category statistics
      const categoryCount = {};
      listingsData.forEach((listing) => {
        const category = listing.category || "Other";
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });

      const data = Object.keys(categoryCount).map((key) => ({
        name: key,
        value: categoryCount[key],
      }));

      setCategoryData(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
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
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", p: 3 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Ads by Category
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Complete breakdown of advertisements across all categories
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Box sx={{ mb: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box display="flex" gap={4} flexWrap="wrap">
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Total Ads
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {listings.length}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Total Categories
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {categoryData.length}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Most Popular Category
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {categoryData.length > 0
                    ? categoryData.reduce((prev, current) =>
                        prev.value > current.value ? prev : current,
                      ).name
                    : "N/A"}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Full Screen Pie Chart */}
        <Box sx={{ height: "70vh", minHeight: 600 }}>
          <CategoryPieChart data={categoryData} />
        </Box>

        {/* Category Table */}
        <Box sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Category Details
            </Typography>
            <Box sx={{ mt: 2 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>
                      Category
                    </th>
                    <th style={{ padding: "12px", textAlign: "left" }}>
                      Total Ads
                    </th>
                    <th style={{ padding: "12px", textAlign: "left" }}>
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData
                    .sort((a, b) => b.value - a.value)
                    .map((category, index) => (
                      <tr
                        key={index}
                        style={{
                          borderBottom: "1px solid #e0e0e0",
                          backgroundColor:
                            index % 2 === 0 ? "#f9f9f9" : "white",
                        }}
                      >
                        <td style={{ padding: "12px" }}>{category.name}</td>
                        <td style={{ padding: "12px" }}>{category.value}</td>
                        <td style={{ padding: "12px" }}>
                          {((category.value / listings.length) * 100).toFixed(
                            1,
                          )}
                          %
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default CategoryAnalytics;
