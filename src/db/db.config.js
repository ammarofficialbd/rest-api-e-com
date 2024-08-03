import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const main = async()=>{
 try {
    await prisma.$connect()
    console.log("Database Connection Succefully");
 } catch (error) {
    console.log(error);
 }
}

export default main