import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Slider,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

interface SearchResult {
  metadata: {
    adaptive_irt: string;
    assessment_length: string;
    description: string;
    full_link: string;
    id: string;
    job_levels: string[];
    languages: string[];
    name: string;
    remote_testing: string;
    test_type: string[];
  };
}

const SearchInterface: React.FC = () => {
  const [query, setQuery] = useState("");
  const [time, setTime] = useState<number>(70);
  const [topK, setTopK] = useState<number>(10);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://3.7.71.10/search",
        {
          query,
          time,
          top_k: topK,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ6b3JhZ2UiLCJleHAiOjE3NDM5ODU2Mjh9.hB_PlsbD2W1_uoHMTLLwAkx19oinMWOBayV6Y79P_jQ",
          },
        }
      );
      setResults(response.data.matches);
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          border: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#1976d2", mb: 4, fontWeight: 600 }}
        >
          Assessment Search
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search Query"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              multiline
              rows={3}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8f9fa",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom sx={{ fontWeight: 500 }}>
              Maximum Time for Assessment (minutes)
            </Typography>
            <TextField
              type="number"
              value={time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTime(Math.min(200, Math.max(30, Number(e.target.value))))
              }
              inputProps={{ min: 30, max: 200 }}
              sx={{
                width: 120,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8f9fa",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography gutterBottom sx={{ fontWeight: 500 }}>
              Number of Assessments to View
            </Typography>
            <TextField
              type="number"
              value={topK}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTopK(Math.min(10, Math.max(1, Number(e.target.value))))
              }
              inputProps={{ min: 1, max: 10 }}
              sx={{
                width: 120,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#f8f9fa",
                  "&:hover": {
                    backgroundColor: "#fff",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "#fff",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !query.trim()}
              sx={{
                mt: 2,
                py: 1.5,
                px: 4,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: 500,
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Search Assessments"}
            </Button>

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      {results.map((result) => (
        <Paper
          key={result.metadata.id}
          elevation={2}
          sx={{
            mb: 3,
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <TableContainer>
            <Table
              sx={{
                "& td, & th": {
                  borderColor: "rgba(0, 0, 0, 0.12)",
                  borderStyle: "solid",
                  borderWidth: "1px",
                },
              }}
            >
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{
                      fontWeight: "600",
                      width: "200px",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell>
                    <a
                      href={result.metadata.full_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "#1976d2",
                        fontWeight: 500,
                      }}
                    >
                      {result.metadata.name}
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{
                      fontWeight: "600",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    Assessment Length
                  </TableCell>
                  <TableCell>
                    {result.metadata.assessment_length} minutes
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{
                      fontWeight: "600",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    Remote Testing
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        result.metadata.remote_testing === "Yes" ? "✔" : "✖"
                      }
                      color={
                        result.metadata.remote_testing === "Yes"
                          ? "success"
                          : "default"
                      }
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{
                      fontWeight: "600",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    Adaptive/IRT
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={result.metadata.adaptive_irt === "Yes" ? "✔" : "✖"}
                      color={
                        result.metadata.adaptive_irt === "Yes"
                          ? "success"
                          : "default"
                      }
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{
                      fontWeight: "600",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    Job Levels
                  </TableCell>
                  <TableCell>
                    {result.metadata.job_levels.map((level) => (
                      <Chip
                        key={level}
                        label={level}
                        sx={{
                          mr: 1,
                          mb: 1,
                          backgroundColor: "#e3f2fd",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{
                      fontWeight: "600",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    Test Types
                  </TableCell>
                  <TableCell>
                    {result.metadata.test_type.map((type) => (
                      <Chip
                        key={type}
                        label={type}
                        sx={{
                          mr: 1,
                          mb: 1,
                          backgroundColor: "#f3e5f5",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{
                      fontWeight: "600",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    Languages
                  </TableCell>
                  <TableCell>
                    {result.metadata.languages.map((lang) => (
                      <Chip
                        key={lang}
                        label={lang}
                        sx={{
                          mr: 1,
                          mb: 1,
                          backgroundColor: "#e8f5e9",
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    component="th"
                    sx={{
                      fontWeight: "600",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "pre-wrap", py: 3 }}>
                    {result.metadata.description}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ))}
    </Box>
  );
};

export default SearchInterface;
