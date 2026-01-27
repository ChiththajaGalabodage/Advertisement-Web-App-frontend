import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// Component: CategoryPieChart
// Props: data (array of objects with name and value)
// Renders a Recharts PieChart inside a ResponsiveContainer.
// Shows a Tooltip and Legend. Map through data to assign Cell colors from COLORS array.
const CategoryPieChart = ({ data }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        pb: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Ads by Category
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="40%"
            labelLine={true}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius="55%"
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            height={120}
            wrapperStyle={{ paddingTop: "10px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CategoryPieChart;
