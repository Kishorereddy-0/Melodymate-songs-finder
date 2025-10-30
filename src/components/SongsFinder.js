import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  Container,
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  InputAdornment,
  AppBar,
  Toolbar,
  Button,
  Chip,
  Fade,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider
} from '@mui/material';
import {
  Search,
  MusicNote,
  Logout,
  Person,
  Album,
  Close,
  AccessTime,
  AttachMoney,
  CalendarToday,
  Language as LanguageIcon,
  LibraryMusic
} from '@mui/icons-material';
import '../styles/SongsFinder.css';

const SongsFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [language, setLanguage] = useState('telugu');
  const [selectedSong, setSelectedSong] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('Search triggered!');
    console.log('Search term:', searchTerm);
    
    if (!searchTerm.trim()) {
      console.log('Search term is empty, returning...');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      // Add language keyword to search term for better results
      const languageKeyword = language !== 'all' ? ` ${language}` : '';
      const searchQuery = searchTerm + languageKeyword;
      
      console.log('Searching for:', searchQuery);
      
      // Search in Indian iTunes store with music entity
      let response = await axios.get(
        `https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&entity=song&country=IN&limit=50&media=music`
      );
      
      console.log('API Response:', response.data);
      console.log('Results count:', response.data.resultCount);
      
      // If no results found with language keyword, try without it
      if (response.data.resultCount === 0 && language !== 'all') {
        console.log('No results with language filter, trying without...');
        response = await axios.get(
          `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song&country=IN&limit=50&media=music`
        );
        console.log('Fallback results count:', response.data.resultCount);
      }
      
      setSongs(response.data.results || []);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const formatPrice = (price) => {
    return price ? `$${price}` : 'N/A';
  };

  const handleSongClick = (song) => {
    setSelectedSong(song);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSong(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="songs-finder-container">
      <AppBar position="sticky" className="app-bar">
        <Toolbar>
          <MusicNote className="app-bar-icon" />
          <Typography variant="h6" className="app-bar-title">
            MelodyMate
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Chip
            icon={<Person />}
            label={user?.name || 'User'}
            className="user-chip"
          />
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<Logout />}
            className="logout-button"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className="main-container">
        <Box className="search-section">
          <Typography variant="h3" className="main-title">
            Discover Your Favorite Songs
          </Typography>
          <Typography variant="body1" className="subtitle">
            Search for Telugu, Hindi, Tamil, and other Indian songs
          </Typography>

          <form onSubmit={handleSearch} className="search-form">
            <FormControl className="language-select">
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                label="Language"
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="telugu">Telugu</MenuItem>
                <MenuItem value="hindi">Hindi</MenuItem>
                <MenuItem value="tamil">Tamil</MenuItem>
                <MenuItem value="kannada">Kannada</MenuItem>
                <MenuItem value="malayalam">Malayalam</MenuItem>
                <MenuItem value="all">All Languages</MenuItem>
              </Select>
            </FormControl>
            
            <Box className="search-input-wrapper">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search for songs, artists, or albums..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch(e);
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className="search-icon" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="search-submit-button"
                disabled={!searchTerm.trim()}
              >
                Search
              </Button>
            </Box>
          </form>
        </Box>

        {loading && (
          <Box className="loading-container">
            <CircularProgress size={60} className="loading-spinner" />
            <Typography variant="h6" className="loading-text">
              Searching for songs...
            </Typography>
          </Box>
        )}

        {!loading && searched && songs.length === 0 && (
          <Box className="no-results">
            <Album className="no-results-icon" />
            <Typography variant="h5">No songs found</Typography>
            <Typography variant="body2" color="textSecondary">
              Try searching with different keywords
            </Typography>
          </Box>
        )}

        {!loading && songs.length > 0 && (
          <Fade in={true} timeout={800}>
            <Box className="results-section">
              <Typography variant="h5" className="results-title">
                Found {songs.length} songs
              </Typography>
              <Grid container spacing={3}>
                {songs.map((song, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={`${song.trackId}-${index}`}>
                    <Card className="song-card" onClick={() => handleSongClick(song)} style={{ cursor: 'pointer' }}>
                      <CardMedia
                        component="img"
                        image={song.artworkUrl100?.replace('100x100bb', '600x600bb') || song.artworkUrl100}
                        alt={song.trackName}
                        className="card-image"
                      />
                      <CardContent className="card-content">
                        <Typography
                          variant="h6"
                          className="song-title"
                          title={song.trackName}
                        >
                          {song.trackName}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="artist-name"
                          title={song.artistName}
                        >
                          {song.artistName}
                        </Typography>
                        <Typography
                          variant="caption"
                          className="album-name"
                          title={song.collectionName}
                        >
                          {song.collectionName}
                        </Typography>
                        <Box className="song-meta">
                          <Chip
                            label={formatDuration(song.trackTimeMillis)}
                            size="small"
                            className="meta-chip"
                          />
                          <Chip
                            label={formatPrice(song.trackPrice)}
                            size="small"
                            className="meta-chip"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        )}

        {!searched && !loading && (
          <Box className="welcome-section">
            <MusicNote className="welcome-icon" />
            <Typography variant="h4" className="welcome-title">
              Start Your Music Journey
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Search for your favorite songs and discover new music
            </Typography>
          </Box>
        )}
      </Container>

      {/* Song Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedSong && (
          <>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Song Details</Typography>
                <IconButton onClick={handleCloseDialog} size="small">
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box display="flex" flexDirection="column" gap={2}>
                {/* Album Artwork */}
                <Box display="flex" justifyContent="center">
                  <img
                    src={selectedSong.artworkUrl100?.replace('100x100bb', '600x600bb') || selectedSong.artworkUrl100}
                    alt={selectedSong.trackName}
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  />
                </Box>

                <Divider />

                {/* Song Information */}
                <Box>
                  <Typography variant="overline" color="textSecondary">
                    Track Name
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {selectedSong.trackName}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="overline" color="textSecondary">
                    Artist
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedSong.artistName}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="overline" color="textSecondary">
                    Album
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedSong.collectionName}
                  </Typography>
                </Box>

                <Divider />

                {/* Additional Details */}
                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTime fontSize="small" color="action" />
                  <Typography variant="body2">
                    <strong>Duration:</strong> {formatDuration(selectedSong.trackTimeMillis)}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <AttachMoney fontSize="small" color="action" />
                  <Typography variant="body2">
                    <strong>Price:</strong> {formatPrice(selectedSong.trackPrice)}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2">
                    <strong>Release Date:</strong> {formatDate(selectedSong.releaseDate)}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <LibraryMusic fontSize="small" color="action" />
                  <Typography variant="body2">
                    <strong>Genre:</strong> {selectedSong.primaryGenreName || 'N/A'}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <LanguageIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    <strong>Country:</strong> {selectedSong.country || 'N/A'}
                  </Typography>
                </Box>

                {selectedSong.trackNumber && (
                  <Box>
                    <Typography variant="body2">
                      <strong>Track Number:</strong> {selectedSong.trackNumber}
                    </Typography>
                  </Box>
                )}

                {selectedSong.trackCount && (
                  <Box>
                    <Typography variant="body2">
                      <strong>Total Tracks:</strong> {selectedSong.trackCount}
                    </Typography>
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="contained" color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default SongsFinder;
