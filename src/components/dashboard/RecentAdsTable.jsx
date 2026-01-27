import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Paper,
  Typography,
} from "@mui/material";
import moment from "moment";

// Component: RecentAdsTable
// Props: ads (array of advertisement objects)
// Renders a MUI Table showing: Image (Avatar), Title, Category (Chip), Price, and Date (formatted with moment).
// Handle empty data gracefully.
const RecentAdsTable = ({ ads }) => {
  if (!ads || ads.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Recent Ads
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ py: 2 }}>
          No recent ads available
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Recent Ads
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ads.map((ad) => (
              <TableRow key={ad._id}>
                <TableCell>
                  <Avatar
                    src={ad.image && ad.image[0]}
                    alt={ad.title}
                    variant="rounded"
                    sx={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>{ad.title}</TableCell>
                <TableCell>
                  <Chip label={ad.category} size="small" color="primary" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    ₨ {ad.price?.toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell>{moment(ad.createdAt).fromNow()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecentAdsTable;
