import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const createAthelete = async (req, res) => {
  try {

    const {
      name,
      dob,
      age,
      weight,
      gender,
      weightCategory,
      aadharNumber,
      mobile,
      eventId,
      gymId
    } = req.body;

    const athlete = await prisma.athlete.create({
      data: {
        name,
        dob: new Date(dob),
        age,
        weight,
        gender,
        weightCategory,
        aadharNumber,
        mobile,
        eventId,
        gymId
      }
    });

    res.json(athlete);
  } catch (error) {
    console.error( error);
    res.json({ error: error.message });
  }
};
export const getAllAthlete= async (req, res) => {
  try {
    const athlete = await prisma.athlete.findMany({
      include: {
        organiserGym: true  
      },
    });
    res.json(athlete);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAthleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const athlete = await prisma.athlete.findUnique({
      where: { id: Number(id) },
      include: { organiserGym: true }
    });

    res.json(athlete);
  } catch (error) {
    res.json({ error: error.message });
  }
}
export const updateAthlete = async(req,res)=>{
    try {
        const { name, dob, age, weight, gender, weightCategory, aadharNumber, mobile, photoUrl, aadharUrl, eventId, gymId } = req.body;

        const athlete = await prisma.athlete.update({
            where: { id: Number(req.params.id) },
            data: {
                name,
                dob :new Date(dob),
                age,
                weight,
                gender,
                weightCategory,
                aadharNumber,
                mobile,
                eventId,
                gymId
                
            },
        });
        res.json(athlete);
    } catch (error) {
        res.json(error)
    }
}
export const deleteAthlete = async(req,res)=>{
    try {
  
        const athlete = await prisma.athlete.delete({
            where: { id: Number(id) }
        });
        res.json(athlete);
    } catch (error) {
        res.json({ error: error.message });
    }
}
export const athleteCategory = (age, gender, weight) => {
  if (typeof gender !== 'string') {
    return 'Invalid Gender';
  }

  gender = gender.toLowerCase();

  if (age >= 14 && age <= 18) {
    if ((gender === 'male' && weight <= 53) || (gender === 'female' && weight <= 43)) {
      return 'Sun Junior';
    }
  } else if (age >= 19 && age <= 23) {
    if ((gender === 'male' && weight >= 54 && weight <= 59) || (gender === 'female' && weight >= 44 && weight <= 47)) {
      return 'Junior';
    }
  } else if (age >= 24 && age <= 39) {
    if ((gender === 'male' && weight >= 60 && weight <= 66) || (gender === 'female' && weight >= 48 && weight <= 52)) {
      return 'Senior';
    }
  } else if (age >= 40 && age <= 49) {
    if ((gender === 'male' && weight >= 67 && weight <= 74) || (gender === 'female' && weight >= 53 && weight <= 57)) {
      return 'Master 1';
    }
  } else if (age >= 50 && age <= 59) {
    if ((gender === 'male' && weight >= 75 && weight <= 83) || (gender === 'female' && weight >= 58 && weight <= 63)) {
      return 'Master 2';
    }
  } else if (age >= 60 && age <= 69) {
    if ((gender === 'male' && weight >= 84 && weight <= 93) || (gender === 'female' && weight >= 64 && weight <= 69)) {
      return 'Master 3';
    }
  } else if (age >= 70 && age <= 79) {
    if ((gender === 'male' && weight >= 94 && weight <= 105) || (gender === 'female' && weight >= 70 && weight <= 76)) {
      return 'Master 4';
    }
  } else if (age >= 80 && age <= 99) {
    if ((gender === 'male' && weight >= 106) || (gender === 'female' && weight >= 77)) {
      return 'Master 5';
    }
  }

  return 'Uncategorized';
};
export const getAthleteCategory = (req, res) => {
  const { age, gender, weight } = req.body;

  const ageNum = Number(age);
  const weightNum = Number(weight);

  if (!ageNum || !gender || isNaN(weightNum)) {
    return res.status(400).json({ error: "Missing or invalid query parameters" });
  }

  const category = athleteCategory(ageNum, gender, weightNum);
  res.json({ category });
};

