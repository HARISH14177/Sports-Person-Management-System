import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEvent = async(req,res)=>{
    try {
        const {
      name,location,date,time,organiserGymId} = req.body;
       const gymExists = await prisma.gym.findUnique({
      where: { id: organiserGymId }
    });

    if (!gymExists) {
      return res.status(404).json({ error: 'Gym not found' });
    }
       const event = await prisma.event.create({
      data: {
        name,
        location,
        date: new Date(date),
        time,
        organiserGymId
      }
    });
    res.json(event);
  } catch (error) {
    res.json(error);
  }
}


export const getAllEvents = async (req, res) => {
  try {
    const event = await prisma.event.findMany({
      include: {
        organiserGym: true 
      }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEventById = async (req,res)=>{
    const {id} = req.params;
    try {
        const event = await prisma.event.findUnique({
            where: { id: Number(req.params.id) },
            include: { organiserGym: true }
        });
        if(!event){
            res.json({"error": "Event not found"})
        }
        res.json(event);
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const updateEvent = async (req, res) => {
    try {
        const { name, location, date, time, organiserGymId } = req.body;

        const event = await prisma.event.update({
            where: { id: Number(req.params.id) },
            data: {
                name,
                location,
                date: new Date(date),
                time,
                organiserGymId
            },
        });

        res.json(event);
    } catch (error) {
        res.json({ error: error.message });
    }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({
      where: { id: Number(id) }
    });

    res.json("sucessfully deleted");
  } catch (error) {
    res.json({ error: error.message });
  }
};

