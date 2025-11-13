FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx prisma generate || true
COPY . .
EXPOSE 3002
CMD ["npm", "run", "dev"]
