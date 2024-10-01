import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, Link, Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';


const Topics = ({ token, completedSubtopics, setCompletedSubtopics }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await axios.get(process.env.REACT_APP_BACKEND_BASE_URL + '/api/topics', {
        headers: { 'x-auth-token': token }
      });

      setTopics(response.data);
    };
    fetchTopics();
  }, [token]);

  const handleComplete = async (topicId, subtopicId) => {
    await axios.post(process.env.REACT_APP_BACKEND_BASE_URL + '/api/topics/mark-complete', {
      subtopicId
    }, {
      headers: { 'x-auth-token': token }
    });

    setCompletedSubtopics([...completedSubtopics, subtopicId]);
  };

  console.log(completedSubtopics);

  
  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        DSA Topics and Subtopics
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Topic Name</TableCell>
            <TableCell>Subtopic Name</TableCell>
            <TableCell>Difficulty</TableCell>
            <TableCell>Tutorial Links</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          (topics || []).map((topic) => (
            <React.Fragment key={topic._id}>
              {/* Topic Row */}
              <TableRow>
                <TableCell colSpan={5} style={{ backgroundColor: '#f0f0f0' }}>
                  <Typography variant="h6">{topic.name}</Typography>
                </TableCell>
              </TableRow>

              {/* Subtopic Rows */}
              {topic.subtopics.map((subtopic) => (
                <TableRow key={subtopic.id}>
                  <TableCell></TableCell>
                  <TableCell>{subtopic.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={subtopic.difficulty}
                      color={subtopic.difficulty === 'Easy' ? 'success' : subtopic.difficulty === 'Medium' ? 'warning' : 'error'}
                    />
                  </TableCell>
                  <TableCell>
                    <Link href={subtopic.youtubeLink} target="_blank" rel="noopener" underline="hover">YouTube</Link>
                    &nbsp;|&nbsp;
                    <Link href={subtopic.leetcodeLink} target="_blank" rel="noopener" underline="hover">LeetCode</Link>
                    &nbsp;|&nbsp;
                    <Link href={subtopic.articleLink} target="_blank" rel="noopener" underline="hover">Article</Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={completedSubtopics.includes(subtopic.id) ? 'success' : 'primary'}
                      startIcon={completedSubtopics.includes(subtopic.id) ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />}
                      onClick={() => handleComplete(topic._id, subtopic.id)}
                      disabled={completedSubtopics.includes(subtopic.id)}  // Disable if already completed
                    >
                      {
                      completedSubtopics.includes(subtopic.id) ? 'Completed' : 'Mark as Complete'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Topics;