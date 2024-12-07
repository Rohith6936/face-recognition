import { useState } from 'react';
import { Container, Paper, Typography, Button, Box, CircularProgress, Grid } from '@mui/material';
import { CloudUpload, PeopleAlt } from '@mui/icons-material';
import { toast } from 'react-toastify';

const CrowdCount = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      toast.error('Please select an image first');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/api/face/count-faces', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
        toast.success('Crowd counting completed!');
      } else {
        toast.error(data.message || 'Counting failed');
      }
    } catch (error) {
      toast.error('Error during crowd counting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Crowd Face Counter
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Upload an image to count faces in large gatherings
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4,
                height: '100%',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
              }}
            >
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <PeopleAlt sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Typography variant="h5">
                  Upload Crowd Image
                </Typography>
              </Box>

              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="crowd-image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="crowd-image-upload">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUpload />}
                  sx={{ mb: 3 }}
                >
                  Upload Image
                </Button>
              </label>

              {preview && (
                <Box sx={{ mt: 2, mb: 2, width: '100%' }}>
                  <img 
                    src={preview} 
                    alt="Preview" 
                    style={{ 
                      width: '100%',
                      maxHeight: '500px',
                      objectFit: 'contain',
                      borderRadius: '8px' 
                    }} 
                  />
                </Box>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!image || loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Count Faces'}
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h5" gutterBottom>
                Results
              </Typography>
              
              {results ? (
                <>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h3" color="primary" gutterBottom>
                      {results.faceCount}
                    </Typography>
                    <Typography variant="subtitle1">
                      Faces Detected
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="body1">
                      Crowd Density: {results.density}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      Analysis completed successfully
                    </Typography>
                  </Box>
                </>
              ) : (
                <Typography color="textSecondary">
                  Upload an image and click "Count Faces" to see the results
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CrowdCount;
