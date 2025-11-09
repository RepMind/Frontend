import { useEffect, useState } from "react";
import axiosConfig from "./api";
import { useLocation } from 'react-router';
import { Box, Typography, Paper, Button, Divider } from "@mui/material";

export default function LogWorkout() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const user_id = params.get('user_id');

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(""); // store AI summary
  const [generating, setGenerating] = useState(false); // loading state for summary

  useEffect(() => {
    if (!user_id) return;

    axiosConfig.get(`/user/${user_id}/logs`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.logs || [];
        setLogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching logs:", err);
        setLoading(false);
      });
  }, [user_id]);

  const handleGenerateSummary = () => {
    if (!user_id) return;

    setGenerating(true);
    axiosConfig.get(`/api/progress/${user_id}`)
      .then(res => {
        // assuming res.data.progress_report contains the string report
        setSummary(res.data.progress_report || "No summary available.");
        setGenerating(false);
      })
      .catch(err => {
        console.error("Error generating summary:", err);
        setSummary("Failed to generate summary.");
        setGenerating(false);
      });
  };

  if (loading) return <p>Loading logs...</p>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>Workout Logs</Typography>

      {logs.length > 0 ? (
        logs.map((log, idx) => (
          <Paper key={idx} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1">
              <strong>Workout ID:</strong> {log.workout_id}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Completed At:</strong> {log.completed_at ? new Date(log.completed_at).toLocaleDateString() : "Not completed"}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Notes:</strong> {log.notes}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography>No logs found for this user.</Typography>
      )}

      {/* Generate Summary Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 2,
            boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
            ':hover': { backgroundColor: '#115293' }
          }}
          onClick={handleGenerateSummary}
          disabled={generating}
        >
          {generating ? "Generating..." : "Generate Summary"}
        </Button>
      </Box>

      {/* Display the summary */}
      {summary && (
        <Paper sx={{ p: 3, mt: 4, backgroundColor: '#f9f9f9' }}>
          <Typography variant="h5" mb={2}>AI Generated Summary</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography 
            variant="body1" 
            sx={{ whiteSpace: 'pre-line' }} // preserves line breaks in the report
          >
            {summary}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
