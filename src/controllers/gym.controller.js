import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createGym = async (req, res) => {
  try {
    const { name, ownerName, coachName, address, pincode, phone } = req.body;

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
    res.status(500).json({ error: error.message });
  }
};

export const getGym = async (req,res)=>{
    try {
        const getGymdata = await prisma.gym.findMany();
        res.json(getGymdata);
    } catch (error) {
        res.json({ error: error.message });
    }
} 
export const gymUpdate = async(req,res)=>{
    try {
        const update = await prisma.gym.update({
        where: { id: Number(req.params.id) },
        data: req.body
        })
        res.json(update);
        
    } catch (error) {
        res.json(error);
    }
}
export const gymDelete = async(req,res)=>{
    try {
        const deleteGym = await prisma.gym.delete({
            where: { id: Number(req.params.id) }
        });
        res.json(deleteGym);
    } catch (error) {
        res.json({ error: error.message });
    }
}
