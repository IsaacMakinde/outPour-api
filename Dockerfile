# 1. Base image (Node runtime)
FROM node:20-alpine


# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package.json package-lock.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy application code
COPY . .

# 6. Expose application port
EXPOSE 3000

# 7. Start the application
CMD ["npm", "start"]

