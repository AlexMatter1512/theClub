FROM node:18 AS run

ENV NODE_ENV=production

WORKDIR /app
COPY /build ./build
COPY /package.json ./package.json
COPY /node_modules ./node_modules
# COPY --from=build /app/prisma ./prisma
RUN ulimit -c unlimited
ENTRYPOINT ["node", "build"]