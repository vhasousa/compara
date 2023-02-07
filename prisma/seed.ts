import { PrismaClient } from "@prisma/client";

import { measurementUnits } from "../src/config/prisma/seed/measurementUnitData";

const prisma = new PrismaClient();

export async function main() {
  for(let i = 0; i < measurementUnits.length - 1; i++) {
    const { name, abbreviation } = measurementUnits[i];
    
    const createdUnit = await prisma.measurementUnit.create({
      data: {
        name,
        abbreviation
      }
    });

    console.log(createdUnit)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
