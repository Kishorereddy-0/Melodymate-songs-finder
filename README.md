# 🎵 MelodyMate - Indian Songs Finder App

A modern, responsive single-page React application that allows users to search and discover Indian songs (Telugu, Hindi, Tamil, Kannada, Malayalam) using the iTunes Search API. Features beautiful UI with Material-UI, authentication flow, language filters, and smooth animations.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-5.14.20-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🔐 **Authentication System**: Login and Signup pages with form validation
- 🔍 **Song Search**: Search Indian songs by title, artist, or album using iTunes API
- 🌐 **Language Filter**: Filter songs by Telugu, Hindi, Tamil, Kannada, Malayalam, or All
- 🇮🇳 **Indian iTunes Store**: Searches specifically in the Indian iTunes catalog
- 🎨 **Modern UI**: Beautiful dark theme with gradient effects and animations
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎭 **Smooth Animations**: Fade-in effects, hover animations, and transitions
- 🎯 **Protected Routes**: Secure access to the songs finder page
- 💾 **Persistent Login**: User session stored in localStorage
- 🎵 **Rich Song Cards**: Display album art, artist, album name, duration, and price
- 📊 **Data Display Only**: Shows comprehensive song information without external redirects

## 🚀 Tech Stack

- **Frontend Framework**: React.js 18.2.0 (Functional Components & Hooks)
- **UI Library**: Material-UI (MUI) 5.14.20
- **Routing**: React Router DOM 6.20.0
- **HTTP Client**: Axios 1.6.2
- **Styling**: Custom CSS with animations + Material-UI theming
- **API**: iTunes Search API (public, no API key required)
- **Build Tool**: Create React App

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**

## 🛠️ Installation & Setup

1. **Clone or navigate to the project directory**:
   ```bash
   cd "c:/Users/kisho/OneDrive/projects/songs finder"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

4. **Open your browser**:
   The app will automatically open at [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Authentication Flow

1. **Sign Up**:
   - Navigate to the signup page
   - Enter your full name, email, and password
   - Password must be at least 6 characters
   - Click "Sign Up" to create an account

2. **Login**:
   - Enter your email and password
   - Click "Login" to access the app
   - Your session will be saved automatically

### Searching for Songs

1. After logging in, you'll see the main search interface
2. **Select a language** from the dropdown (Telugu is selected by default)
   - Telugu
   - Hindi
   - Tamil
   - Kannada
   - Malayalam
   - All Languages
3. Enter a song title, artist name, or album in the search bar
4. Press Enter to search
5. Browse through the results displayed as beautiful cards
6. View detailed information for each song including artwork, title, artist, album, duration, and price

**Note**: The app searches the Indian iTunes store and automatically adds the selected language keyword to your search for better results.

### Features in the Songs Page

- **Search Bar**: Real-time search with iTunes API
- **User Profile**: Your name displayed in the top bar
- **Logout**: Click logout to end your session
- **Song Cards**: Each card shows:
  - Album artwork
  - Song title
  - Artist name
  - Album name
  - Duration
  - Price

## 🎨 Styling Features

- **Gradient Backgrounds**: Beautiful purple gradient on auth pages
- **Dark Theme**: Modern dark mode throughout the app
- **Animations**:
  - Fade-in effects on page load
  - Card hover animations with lift effect
  - Smooth transitions on all interactive elements
  - Rotating music icon in the app bar
  - Floating welcome icon
  - Pulse effects on buttons
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Custom Scrollbar**: Styled scrollbar matching the theme
- **Material-UI Components**: Professional UI components

## 📁 Project Structure

```
songs finder/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.js           # Login page component
│   │   ├── Signup.js          # Signup page component
│   │   ├── SongsFinder.js     # Main songs search component
│   │   └── ProtectedRoute.js  # Route protection wrapper
│   ├── context/
│   │   └── AuthContext.js     # Authentication context & logic
│   ├── styles/
│   │   ├── Auth.css           # Authentication pages styling
│   │   └── SongsFinder.css    # Songs finder page styling
│   ├── App.js                 # Main app component with routing
│   ├── App.css                # Global app styles
│   ├── index.js               # React entry point
│   └── index.css              # Base styles
├── package.json
├── .gitignore
└── README.md
```

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🌐 API Information

**iTunes Search API**:
- Endpoint: `https://itunes.apple.com/search`
- Parameters:
  - `term`: Search query
  - `entity`: song
  - `limit`: 50 results
- No authentication required
- Free to use

## 🎯 Key Features Implemented

✅ React functional components with hooks  
✅ iTunes API integration with Axios  
✅ Material-UI for modern UI components  
✅ Responsive card layout for songs  
✅ Search functionality with real-time filtering  
✅ Authentication pages (Login/Signup)  
✅ Protected routes with React Router  
✅ Form validation  
✅ LocalStorage for session persistence  
✅ Custom CSS animations and transitions  
✅ Dark theme with gradient effects  
✅ Mobile-responsive design  
✅ Error handling  

## 🎨 Color Palette

- **Primary Green**: #1db954 (Spotify-inspired)
- **Light Green**: #1ed760
- **Dark Green**: #1aa34a
- **Secondary Red**: #ff6b6b
- **Background Dark**: #121212
- **Paper Dark**: #1e1e1e
- **Purple Gradient**: #667eea → #764ba2

## 📱 Responsive Breakpoints

- **Desktop**: > 960px
- **Tablet**: 600px - 960px
- **Mobile**: < 600px

## 🔒 Authentication Notes

- This is a **frontend-only** authentication simulation
- User data is stored in **localStorage**
- In a production app, implement proper backend authentication
- Passwords are not encrypted (demo purposes only)

## 🚀 Future Enhancements

- [ ] Add music preview playback (30-second clips)
- [ ] Implement favorites/playlist feature
- [ ] Add filters (genre, year, price range)
- [ ] Backend integration with real authentication
- [ ] User profile management
- [ ] Export song lists
- [ ] Advanced search options
- [ ] Dark/Light theme toggle
- [ ] Pagination for large result sets

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ using React.js and Material-UI

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support or questions, please open an issue in the repository.

---

**Happy Music Hunting! 🎵**
