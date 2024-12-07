import { Container, Paper, Typography, Box, Grid } from '@mui/material';
import { Face, Group, PeopleAlt } from '@mui/icons-material';

const AboutUs = () => {
  const features = [
    {
      icon: <Face sx={{ fontSize: 60 }} />,
      title: 'Individual Authentication',
      description: 'Advanced face recognition system for secure individual authentication with support for various lighting conditions and angles.'
    },
    {
      icon: <Group sx={{ fontSize: 60 }} />,
      title: 'Group Authentication',
      description: 'Powerful group authentication system capable of identifying multiple individuals in a single image using state-of-the-art MTCNN technology.'
    },
    {
      icon: <PeopleAlt sx={{ fontSize: 60 }} />,
      title: 'Crowd Counting',
      description: 'Real-time crowd counting and monitoring system using YOLO and MCNN for accurate face detection in large gatherings.'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h2" align="center" gutterBottom>
          About Our System
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Next-Generation Face Recognition & Authentication Platform
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="textSecondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={3} sx={{ mt: 6, p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Our Technology
          </Typography>
          <Typography paragraph>
            Our system utilizes cutting-edge deep learning technologies including Convolutional Neural Networks (CNN), 
            Multi-task Cascaded Convolutional Networks (MTCNN), and You Only Look Once (YOLO) algorithms to provide 
            highly accurate face detection and recognition capabilities.
          </Typography>
          <Typography paragraph>
            Built on the robust MERN (MongoDB, Express.js, React, Node.js) stack, our platform offers seamless 
            integration, high performance, and scalability to meet various authentication and monitoring needs.
          </Typography>
          <Typography>
            Whether you need individual authentication, group verification, or crowd monitoring, our system 
            provides reliable, secure, and efficient solutions for all your face recognition requirements.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AboutUs;
