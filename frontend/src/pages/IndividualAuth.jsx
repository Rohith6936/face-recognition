import { useState } from 'react';
import { Container, Paper, Typography, Button, Box, CircularProgress } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { toast } from 'react-toastify';

const IndividualAuth = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const response = await fetch('http://localhost:5000/api/face/authenticate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Authentication successful!');
      } else {
        toast.error(data.message || 'Authentication failed');
      }
    } catch (error) {
      toast.error('Error during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Individual Authentication
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Upload an image for individual face authentication
        </Typography>

        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}
        >
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
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
            <Box sx={{ mt: 2, mb: 2 }}>
              <img 
                src={preview} 
                alt="Preview" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '300px', 
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
            {loading ? <CircularProgress size={24} /> : 'Authenticate'}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default IndividualAuth;
