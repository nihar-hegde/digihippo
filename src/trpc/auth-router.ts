import { AuthCredentialsValidators } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidators)
    .mutation(async ({ input }) => {
      const { email, password } = input
      const payload = await getPayloadClient()
      // Check if user already exists (if they do they cannot signup again)
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          }
        }
      })
      if (users.length !== 0) throw new TRPCError({ code: 'CONFLICT' })

      await payload.create({
        collection: "users",
        data: {},
      })
    })
})
