import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createDiscipline = async (req, res) => {
  try {
    const { name } = req.body;

    const discipline = await prisma.discipline.create({
      data: { name },
    });

    res.json({
      discipline
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};


export const getAllDisciplines = async (req, res) => {
  try {
    const disciplines = await prisma.discipline.findMany({
      include: {
        events: true,
        athletes: true,
      },
    });
    res.json(disciplines);
  } catch (error) {
    res.json({ error });
  }
};


export const getDisciplineById = async (req, res) => {
  try {
    const { id } = req.params;
    const discipline = await prisma.discipline.findUnique({
      where: { id: Number(id) },
      include: {
        events: true,
        athletes: true,
      },
    });


    res.json(discipline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDiscipline = async (req, res) => {
  try {
    const { name } = req.body;

    const discipline = await prisma.discipline.update({
      where: { id: Number(req.params.id) },
      data: { name },
    });

    res.json({
      discipline
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDiscipline = async (req, res) => {
  try {
    const { id } = req.params;

    const discipline = await prisma.discipline.delete({
      where: { id: Number(id) },
    });

    res.json({
      discipline
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};
