import { useState } from 'react';
import { Container, Paper, Typography, Button, Box, CircularProgress, List, ListItem, ListItemText, Divider } from '@mui/material';
import { CloudUpload, Group } from '@mui/icons-material';
import { toast } from 'react-toastify';

const GroupAuth = () => {
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
      const response = await fetch('http://localhost:5000/api/face/group-auth', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
        toast.success('Group authentication completed!');
      } else {
        toast.error(data.message || 'Authentication failed');
      }
    } catch (error) {
      toast.error('Error during group authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Group Authentication
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Upload an image for group face authentication
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
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <Group sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h5">
              Upload Group Photo
            </Typography>
          </Box>

          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="group-image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="group-image-upload">
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
                  maxHeight: '400px', 
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
            {loading ? <CircularProgress size={24} /> : 'Authenticate Group'}
          </Button>

          {results && (
            <Box sx={{ mt: 4, width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Authentication Results
              </Typography>
              <List>
                {results.authenticatedUsers.map((user, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText 
                        primary={user.name || `Person ${index + 1}`}
                        secondary={user.status || 'Authenticated'}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Total faces detected: {results.totalFaces}
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default GroupAuth;
