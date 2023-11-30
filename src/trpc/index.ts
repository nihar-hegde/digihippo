import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  anyApiRoute: publicProcedure.query(() => {
    return "hello from index.ts"
  })
})


export type AppRouter = typeof appRouter
