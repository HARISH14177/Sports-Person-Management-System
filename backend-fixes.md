# Backend Code Issues and Fixes

## Issues Found in athlete.controller.js:

### 1. Missing import in deleteAthlete function
The `deleteAthlete` function uses `id` variable but it should use `req.params.id`

**Fix:**
```javascript
export const deleteAthlete = async(req,res)=>{
    try {
        const athlete = await prisma.athlete.delete({
            where: { id: Number(req.params.id) } // Changed from 'id' to 'req.params.id'
        });
        res.json(athlete);
    } catch (error) {
        res.json({ error: error.message });
    }
}
```

### 2. Missing deleteAthlete import in routes
The route file doesn't import the `deleteAthlete` function

**Fix athlete.route.js:**
```javascript
import express from 'express';
import {
    createAthelete,
    getAllAthlete,
    getAthleteById,
    updateAthlete,
    deleteAthlete, // Add this import
    getAthleteCategory // Changed from athleteCategory to getAthleteCategory
} from '../controllers/athlete.controller.js'

const router = express.Router();
router.post('/createAthelete', createAthelete);
router.get('/getAllAthlete', getAllAthlete);
router.get('/getAthleteById/:id', getAthleteById);
router.put('/updateAthlete/:id', updateAthlete);
router.delete('/deleteAthlete/:id', deleteAthlete); // Add this route
router.post('/athleteCategory', getAthleteCategory); // Changed to POST and correct function name
export default router;
```

### 3. Inconsistent error handling
Some functions return different status codes for errors. Should be consistent.

### 4. Missing validation
Consider adding input validation for better security and data integrity.

## Additional Backend Files Needed:

You'll also need controllers and routes for:
- Events (`/api/events`)
- Gyms (`/api/gyms`)

These are referenced in the frontend but not provided in your backend code.