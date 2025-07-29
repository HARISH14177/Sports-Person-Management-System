import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createScore = async (req, res) => {
  try {
    const {
      athleteId,
      disciplineId,
      eventId,
      trial1 = 0,
      trial2 = 0,
      trial3 = 0,
      maxLift = 0
    } = req.body;

    const score = await prisma.score.create({
      data: {
        athleteId,
        disciplineId,
        eventId,
        trial1,
        trial2,
        trial3,
        maxLift
      }
    });

    res.status(201).json({

      score
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllScores = async (req, res) => {
  try {
    const scores = await prisma.score.findMany({
      include: {
        athlete: true,
        discipline: true,
        event: true
      }
    });

    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getScoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const score = await prisma.score.findUnique({
      where: { id: Number(id) },
      include: {
        athlete: true,
        discipline: true,
        event: true
      }
    });

    if (!score) {
      return res.status(404).json({ error: 'Score not found' });
    }

    res.json(score);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateScore = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      trial1,
      trial2,
      trial3,
      maxLift
    } = req.body;

    const score = await prisma.score.update({
      where: { id: Number(id) },
      data: {
        trial1,
        trial2,
        trial3,
        maxLift
      }
    });

    res.json({
    
      score
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteScore = async (req, res) => {
  try {
    const { id } = req.params;
    const score = await prisma.score.delete({
      where: { id: Number(id) }
    });

    res.json({
      
      score
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
