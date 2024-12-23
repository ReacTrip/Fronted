import React, { useEffect, memo } from 'react';
import { 
  Box, 
  Typography, 
  Alert, 
  Tabs, 
  Tab,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CardMedia,
  Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Map as MapIcon, 
  Restaurant as RestaurantIcon,
  Hotel as HotelIcon,
  Place as PlaceIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';

const Container = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: '#f8f9fa',
  padding: theme.spacing(3)
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  padding: theme.spacing(4)
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
  }
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  backgroundColor: theme.palette.grey[100],
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)',
  }
}));

const CategoryTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1),
  marginBottom: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  '& .MuiTab-root': {
    minHeight: 60,
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0.5),
    transition: 'all 0.3s ease',
  }
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  '&.MuiTab-root': {
    color: theme.palette.text.primary,
    fontWeight: 500,
    opacity: 0.8,
    '&.Mui-selected': {
      opacity: 1,
      fontWeight: 600,
      backgroundColor: `${theme.palette.primary.light}40`,
      color: theme.palette.primary.main,
    }
  }
}));

export const CityResultSection = memo(({
  result,
  placeInfo,
  isLoading,
  error,
  activeCategory,
  onCategoryChange,
  onPlaceInfoRequest
}) => {
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (result && isMounted) {
        await onPlaceInfoRequest(result, activeCategory);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [result, activeCategory, onPlaceInfoRequest]);

  if (!result) return null;

  return (
    <Container>
      <ContentWrapper>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h1"
            sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            {result}
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            에 대한 검색 결과입니다.
          </Typography>
        </Box>

        <CategoryTabs
          value={activeCategory}
          onChange={(e, newValue) => onCategoryChange(newValue)}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <StyledTab 
            value="관광지" 
            label="관광지" 
            icon={<MapIcon />} 
            iconPosition="start"
          />
          <StyledTab 
            value="맛집" 
            label="맛집" 
            icon={<RestaurantIcon />} 
            iconPosition="start"
          />
          <StyledTab 
            value="숙박" 
            label="숙박" 
            icon={<HotelIcon />} 
            iconPosition="start"
          />
          <StyledTab 
            value="인기명소" 
            label="인기명소" 
            icon={<PlaceIcon />} 
            iconPosition="start"
          />
        </CategoryTabs>

        <Box sx={{ minHeight: 400 }}>
          {isLoading ? (
            <Grid container spacing={3}>
              {[...Array(6)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <StyledCard>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton variant="text" height={32} width="80%" />
                      <Skeleton variant="text" height={24} width="60%" />
                      <Skeleton variant="text" height={24} width="70%" />
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          ) : error ? (
            <Alert 
              severity="error" 
              sx={{ borderRadius: 2, boxShadow: 1 }}
            >
              정보를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
            </Alert>
          ) : !placeInfo?.length ? (
            <Alert 
              severity="info"
              sx={{ borderRadius: 2, boxShadow: 1 }}
            >
              해당 카테고리의 정보를 찾을 수 없습니다.
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {placeInfo.map((place) => (
                <Grid item xs={12} sm={6} md={4} key={place.id}>
                  <StyledCard>
                    {place.imageUrl ? (
                      <StyledCardMedia
                        image={place.imageUrl}
                        title={place.name}
                        sx={{
                          height: 200,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 200,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f5f5f5',
                          color: 'text.secondary',
                          borderBottom: '1px solid #eee'
                        }}
                      >
                        <Typography>이미지를 찾을 수 없습니다</Typography>
                      </Box>
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {place.name}
                      </Typography>
                      
                      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <LocationOnIcon color="action" sx={{ mt: 0.25 }} />
                          <Typography variant="body2" color="text.secondary">
                            {place.roadAddress || place.address}
                          </Typography>
                        </Box>
                        
                        {place.phone && (
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <PhoneIcon color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {place.phone}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </CardContent>

                    {place.url && (
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          endIcon={<OpenInNewIcon />}
                          href={place.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            color: 'white',
                            '&:hover': {
                              background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                            }
                          }}
                        >
                          상세정보 보기
                        </Button>
                      </CardActions>
                    )}
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </ContentWrapper>
    </Container>
  );
});

CityResultSection.displayName = 'CityResultSection';