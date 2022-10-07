FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production

COPY prisma ./prisma/
COPY .env.example ./.env
COPY tsconfig.json ./
COPY . .

RUN npm install

# Initialize DB
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]