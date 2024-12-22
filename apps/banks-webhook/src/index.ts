import express from "express";
import { z } from "zod";
import prisma from "@repo/db/client";
const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async(req, res) => {

    const paymentSchema = z.object({
        token: z.string(),
        userId: z.string(),
        amount: z.number(),
    });

    const Payment = paymentSchema.parse(req.body);

    const PaymentInformation = {
        token: Payment.token,
        userId: Payment.userId,
        amount: Payment.amount,
    }

    try {
        const isPending = await prisma.onRampTransaction.findFirst({
            where:{
                token:PaymentInformation.token,
                status:"Pending"
            }
        });
        if(isPending){
            await prisma.$transaction([
                prisma.balance.updateMany({
                    where:{
                        userId:Number(PaymentInformation.userId)
                    },
                    data:{
                        amount:{
                            increment:Number(PaymentInformation.amount)
                        }
                    }
                }),
                prisma.onRampTransaction.updateMany({
                    where:{
                        token:PaymentInformation.token
                    },
                    data:{
                        status:"Completed"
                    }
                })
            ])
            res.status(200).json({
                message:"Payment successful",
                PaymentInformation
            })
        }
        else{
            res.status(400).json({
                message:"Payment already processed"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(411).json({
            message:"Error while processing webhook"
        })
    }
    
});

app.get('/', (req,res) =>{
    res.status(200).json({
        message:"Helllo from webhook"
    })
})

app.listen(3003);