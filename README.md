# Athlete Management System - Frontend

A modern React.js frontend application for managing athletes in sports events with full CRUD operations.

## Features

- ✅ **Create Athletes**: Add new athletes with complete information
- ✅ **View Athletes**: Display all athletes in a responsive card layout
- ✅ **Edit Athletes**: Update athlete information
- ✅ **Delete Athletes**: Remove athletes with confirmation
- ✅ **Auto Category Detection**: Automatically categorize athletes based on age, gender, and weight
- ✅ **Auto Age Calculation**: Calculate age from date of birth
- ✅ **Form Validation**: Client-side validation with proper error handling
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices
- ✅ **Modern UI**: Beautiful gradient design with smooth animations

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- A running backend server with the athlete API endpoints

## Installation

1. **Clone or download the files:**
   ```bash
   # If you have the files, navigate to your project directory
   cd your-project-directory
   ```

2. **Install dependencies:**
   ```bash
   npm install axios react
   # or
   yarn add axios react
   ```

## Configuration

1. **Update API Base URL:**
   
   Open `athlete.js` and update the `API_BASE` constant to match your backend server:
   ```javascript
   const API_BASE = 'http://localhost:3000/api'; // Update this URL
   ```

2. **Backend Requirements:**
   
   Your backend should have these endpoints:
   - `GET /api/getAllAthlete` - Get all athletes
   - `POST /api/createAthelete` - Create new athlete
   - `PUT /api/updateAthlete/:id` - Update athlete
   - `DELETE /api/deleteAthlete/:id` - Delete athlete
   - `POST /api/athleteCategory` - Get athlete category
   - `GET /api/events` - Get all events (for dropdown)
   - `GET /api/gyms` - Get all gyms (for dropdown)

## Usage

1. **Import the component in your React app:**
   ```javascript
   import Athlete from './athlete';
   import './athlete.css';

   function App() {
     return (
       <div className="App">
         <Athlete />
       </div>
     );
   }
   ```

2. **Start your React application:**
   ```bash
   npm start
   # or
   yarn start
   ```

## Component Structure

```
athlete.js          # Main React component
athlete.css         # Styling for the component
backend-fixes.md    # Documentation of backend issues and fixes
README.md           # This file
```

## Key Features Explained

### Auto Age Calculation
When a user selects a date of birth, the age is automatically calculated and populated.

### Category Detection
Click the "Get Category" button after filling in age, gender, and weight to automatically determine the athlete's competition category based on the rules:

- **Sun Junior** (14-18 years)
- **Junior** (19-23 years)  
- **Senior** (24-39 years)
- **Master 1** (40-49 years)
- **Master 2** (50-59 years)
- **Master 3** (60-69 years)
- **Master 4** (70-79 years)
- **Master 5** (80-99 years)

### Form Validation
- Required fields are marked with *
- Aadhar number must be 12 digits
- Mobile number must be 10 digits
- Date validation for date of birth

### Responsive Design
The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Backend Issues Fixed

The following issues were found in your backend code:

1. **Missing parameter in deleteAthlete function**
2. **Missing route import for deleteAthlete**
3. **Incorrect route method for athleteCategory**

See `backend-fixes.md` for detailed fixes.

## Additional Backend Files Needed

To fully support this frontend, you'll need to create:

1. **Event Controller & Routes** (`/api/events`)
2. **Gym Controller & Routes** (`/api/gyms`)

Example for events:
```javascript
// events.controller.js
export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

## Styling Customization

The CSS file (`athlete.css`) uses modern design principles:
- CSS Grid for responsive layouts
- Flexbox for component alignment
- CSS custom properties for easy theming
- Smooth transitions and hover effects
- Mobile-first responsive design

To customize colors, update the CSS variables or gradient values in the CSS file.

## Troubleshooting

### Common Issues:

1. **"Failed to fetch athletes"**
   - Check if your backend server is running
   - Verify the API_BASE URL is correct
   - Check browser console for CORS errors

2. **Category button not working**
   - Ensure the `/api/athleteCategory` endpoint accepts POST requests
   - Check that age, gender, and weight are properly filled

3. **Form submission errors**
   - Verify all required fields are filled
   - Check backend validation rules
   - Look for console errors

### CORS Issues:
If you encounter CORS errors, add this to your backend:
```javascript
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

To contribute to this project:
1. Follow the existing code style
2. Test on multiple screen sizes
3. Ensure accessibility standards are met
4. Update documentation as needed

## License

This project is open source and available under the MIT License.
