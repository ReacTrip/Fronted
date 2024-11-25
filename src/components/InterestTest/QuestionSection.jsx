import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  LinearProgress,
  Paper 
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  '& .MuiLinearProgress-bar': {
    borderRadius: 5
  }
}));

const ProgressWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: 'rgba(0, 0, 0, 0.02)',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4)
}));

const QuestionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  backgroundColor: '#fff',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2)
  }
}));

const OptionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  justifyContent: 'flex-start',
  textAlign: 'left',
  transition: 'all 0.3s ease',
  borderWidth: '2px',
  '&:hover': {
    borderWidth: '2px',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  }
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  textAlign: 'right',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1)
}));

export const QuestionSection = ({ currentQuestion, progress, onAnswer }) => {
  return (
    <Box>
      <ProgressWrapper>
        <StyledProgress 
          variant="determinate" 
          value={progress}
          sx={{ mb: 1 }}
        />
        <ProgressText variant="body2">
          {Math.round(progress)}% 완료
        </ProgressText>
      </ProgressWrapper>

      <QuestionCard>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
            mb: 4
          }}
        >
          {currentQuestion.question}
        </Typography>

        <Grid container spacing={2}>
          {currentQuestion.options.map((option) => (
            <Grid item xs={12} key={option.value}>
              <OptionButton
                variant="outlined"
                fullWidth
                onClick={() => onAnswer(option.value)}
                sx={(theme) => ({
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText
                  }
                })}
              >
                <Typography 
                  variant="body1" 
                  component="span"
                  sx={{ 
                    pl: 1,
                    fontWeight: 500
                  }}
                >
                  {option.label}
                </Typography>
              </OptionButton>
            </Grid>
          ))}
        </Grid>
      </QuestionCard>
    </Box>
  );
};
