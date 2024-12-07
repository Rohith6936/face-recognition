import { Container, Grid, Paper, Typography, Button, Box, useTheme, Card, CardContent, IconButton, Divider } from '@mui/material';
import { Face, Group, PeopleAlt, Speed, Security, CloudUpload, Analytics, Timeline, Psychology, 
  Fingerprint, Camera, DataUsage, AccessTime, CheckCircle, Build, Code } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <Face sx={{ fontSize: 80 }} />,
      title: 'Individual Authentication',
      description: 'Secure individual authentication using advanced facial recognition',
      path: '/individual-auth',
      color: '#00bcd4'
    },
    {
      icon: <Group sx={{ fontSize: 80 }} />,
      title: 'Group Authentication',
      description: 'Authenticate multiple people simultaneously in a single image',
      path: '/group-auth',
      color: '#ff4081'
    },
    {
      icon: <PeopleAlt sx={{ fontSize: 80 }} />,
      title: 'Crowd Counting',
      description: 'Advanced crowd analytics and face counting for large gatherings',
      path: '/crowd-count',
      color: '#7c4dff'
    }
  ];

  const stats = [
    { icon: <Speed />, value: '99.9%', label: 'Accuracy Rate', color: '#00bcd4' },
    { icon: <AccessTime />, value: '<0.5s', label: 'Processing Time', color: '#ff4081' },
    { icon: <CheckCircle />, value: '1M+', label: 'Successful Scans', color: '#7c4dff' },
    { icon: <DataUsage />, value: '24/7', label: 'System Uptime', color: '#4caf50' }
  ];

  const techFeatures = [
    {
      icon: <Security />,
      title: 'Advanced Security',
      description: 'Multi-layer security with encryption and secure data handling',
      color: '#2196f3'
    },
    {
      icon: <Psychology />,
      title: 'Deep Learning',
      description: 'State-of-the-art neural networks for accurate face detection',
      color: '#e91e63'
    },
    {
      icon: <Analytics />,
      title: 'Real-time Analytics',
      description: 'Instant processing and analysis of facial data',
      color: '#9c27b0'
    },
    {
      icon: <CloudUpload />,
      title: 'Cloud Integration',
      description: 'Seamless cloud storage and processing capabilities',
      color: '#00bcd4'
    }
  ];

  const processSteps = [
    {
      icon: <Camera />,
      title: 'Image Capture',
      description: 'High-quality image capture with support for various formats'
    },
    {
      icon: <Fingerprint />,
      title: 'Feature Extraction',
      description: 'Advanced algorithms to extract unique facial features'
    },
    {
      icon: <Build />,
      title: 'Processing',
      description: 'Fast and accurate processing using deep learning models'
    },
    {
      icon: <Code />,
      title: 'Analysis',
      description: 'Comprehensive analysis and matching with existing database'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h1" 
            align="center" 
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              mb: 4
            }}
          >
            Face Recognition Dashboard
          </Typography>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={itemVariants}>
                  <Paper
                    elevation={0}
                    className="glass-effect card-hover"
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      background: 'rgba(17, 34, 64, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
                      }
                    }}
                    onClick={() => navigate(feature.path)}
                  >
                    <Box sx={{ color: feature.color, mb: 3 }}>{feature.icon}</Box>
                    <Typography 
                      variant="h4" 
                      component="h3" 
                      gutterBottom
                      sx={{
                        background: `linear-gradient(45deg, ${feature.color}, ${theme.palette.primary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography color="textSecondary" paragraph>{feature.description}</Typography>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(feature.path);
                      }}
                      sx={{
                        mt: 'auto',
                        background: `linear-gradient(45deg, ${feature.color}, ${theme.palette.primary.main})`,
                        '&:hover': {
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${feature.color})`,
                        }
                      }}
                    >
                      Get Started
                    </Button>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" align="center" gutterBottom className="gradient-text">
            System Performance
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  className="glass-effect"
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: 'rgba(17, 34, 64, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <IconButton sx={{ color: stat.color, mb: 2 }}>
                    {stat.icon}
                  </IconButton>
                  <Typography variant="h3" sx={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>

      {/* Technology Features */}
      <Box sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" align="center" gutterBottom className="gradient-text">
            Advanced Technology
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {techFeatures.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  elevation={0}
                  className="glass-effect card-hover"
                  sx={{
                    p: 4,
                    height: '100%',
                    background: 'rgba(17, 34, 64, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton sx={{ color: feature.color, mr: 2 }}>
                      {feature.icon}
                    </IconButton>
                    <Typography variant="h5" sx={{ color: feature.color }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography color="textSecondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>

      {/* Process Timeline */}
      <Box sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" align="center" gutterBottom className="gradient-text">
            How It Works
          </Typography>
          <Box sx={{ position: 'relative', mt: 8 }}>
            <Divider 
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                width: '100%',
                borderColor: 'rgba(255, 255, 255, 0.1)' 
              }} 
            />
            <Grid container spacing={4}>
              {processSteps.map((step, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Paper
                      elevation={0}
                      className="glass-effect"
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        background: 'rgba(17, 34, 64, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: -20,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 2,
                          height: 20,
                          background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1))',
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 20px',
                        }}
                      >
                        {step.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {step.title}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {step.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Box>

      {/* Call to Action */}
      <Box 
        sx={{ 
          py: 10,
          textAlign: 'center',
          background: 'linear-gradient(rgba(17, 34, 64, 0.8), rgba(17, 34, 64, 0.8))',
          borderRadius: 4,
          mb: 8
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h3" gutterBottom className="gradient-text">
            Ready to Get Started?
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Experience the power of advanced face recognition technology. Start using our system today.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              background: 'linear-gradient(45deg, #00bcd4, #ff4081)',
              px: 4,
              py: 2,
              fontSize: '1.2rem'
            }}
          >
            Sign Up Now
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Dashboard;
