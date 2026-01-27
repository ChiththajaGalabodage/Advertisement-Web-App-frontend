import React from "react";
import { Paper, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

const ActiveViewsChart = ({ listings }) => {
  // Process listings data to create time series data
  const processListingsData = () => {
    if (!listings || listings.length === 0) return [];

    // Group listings by date and sum views
    const viewsByDate = {};

    listings.forEach((listing) => {
      const date = moment(listing.createdAt).format("MMM DD");
      const views = listing.views || 0;

      if (viewsByDate[date]) {
        viewsByDate[date] += views;
      } else {
        viewsByDate[date] = views;
      }
    });

    // Convert to array format for recharts
    const chartData = Object.keys(viewsByDate)
      .map((date) => ({
        date,
        views: viewsByDate[date],
      }))
      .slice(-10); // Show last 10 data points

    return chartData;
  };

  const data = processListingsData();

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Active Views Over Time
      </Typography>
      {data.length === 0 ? (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ py: 4, textAlign: "center" }}
        >
          No views data available
        </Typography>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#4caf50"
              strokeWidth={2}
              dot={{ fill: "#4caf50", r: 4 }}
              activeDot={{ r: 6 }}
              name="Views"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default ActiveViewsChart;
