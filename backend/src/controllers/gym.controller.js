import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createGym = async (req, res) => {
  try {
    const { name, ownerName, coachName, address, pincode, phone } = req.body;

    if (!name || !ownerName || !coachName || !address || !pincode || !phone) {
      return res.status(400).json({ 
        error: "All fields are required: name, ownerName, coachName, address, pincode, phone" 
      });
    }

    const gym = await prisma.gym.create({
      data: {
        name,
        ownerName,
        coachName,
        address,
        pincode,
        phone
      }
    });

    res.status(201).json(gym);
  } catch (error) {
    console.error("Error creating gym:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getGym = async (req, res) => {
  try {
    console.log("Fetching gyms from database...");
    const getGymdata = await prisma.gym.findMany({
      orderBy: {
        id: 'desc' 
      }
    });
    
    console.log(`Found ${getGymdata.length} gyms`);
    res.status(200).json(getGymdata); 
  } catch (error) {
    console.error("Error fetching gyms:", error);
    res.status(500).json({ error: error.message }); 
  }
};

export const gymUpdate = async (req, res) => {
  try {
    const gymId = Number(req.params.id);

    if (isNaN(gymId)) {
      return res.status(400).json({ error: "Invalid gym ID" });
    }

    const existingGym = await prisma.gym.findUnique({
      where: { id: gymId }
    });

    if (!existingGym) {
      return res.status(404).json({ error: "Gym not found" });
    }

    const update = await prisma.gym.update({
      where: { id: gymId },
      data: req.body
    });
    
    res.status(200).json(update);
  } catch (error) {
    console.error("Error updating gym:", error);
    res.status(500).json({ error: error.message }); 
  }
};

export const gymDelete = async (req, res) => {
  try {
    const gymId = Number(req.params.id);
    
    if (isNaN(gymId)) {
      return res.status(400).json({ error: "Invalid gym ID" });
    }
    const existingGym = await prisma.gym.findUnique({
      where: { id: gymId }
    });

    if (!existingGym) {
      return res.status(404).json({ error: "Gym not found" });
    }

    const deleteGym = await prisma.gym.delete({
      where: { id: gymId }
    });
    
    res.status(200).json({ 
      message: "Gym deleted successfully", 
      deletedGym: deleteGym 
    });
  } catch (error) {
    console.error("Error deleting gym:", error);
    res.status(500).json({ error: error.message });
  }
};