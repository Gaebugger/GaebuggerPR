import React from 'react';
import Lottie from 'lottie-react';
import { CircularProgress, Typography, Box } from '@mui/material';
import scoreAnimationData from './path_to_your_lottie_score_animation.json';

const ScoreDisplay = ({ label, score }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6">{label}</Typography>
      <CircularProgress variant="determinate" value={score} style={{ marginBottom: 10 }} />
      <Lottie animationData={scoreAnimationData} />
      <Typography variant="h4">{score}</Typography>
    </Box>
  );
};

const ResultDisplay = ({ results }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      {results.map(result => (
        <ScoreDisplay key={result.label} label={result.label} score={result.score} />
      ))}
    </Box>
  );
};

export default ResultDisplay;
