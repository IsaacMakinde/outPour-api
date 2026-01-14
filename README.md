# outPour-api

Simple express REST api for handling request for main projects

## Features

- User Authentication with firebase
- Dockerised setup for local and cloud development
- 24 hour "reset" for displaying reflections
- Utilises MLA's from hugging face to detect tone and emotion
- Can be built upon for future projects

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Docker
- AWS (EC2, RDS, S3)
- Heroku

## Architecture

- REST API following MVC pattern
- Stateless backend
- Docker containers for app and database
- Designed for horizontal scaling

## Getting Started

### Prerequisites

- Node.js
- Docker
- Docker Compose

### Installation

1. Clone the repository
2. create a .env file using the example provided
3. Run `docker compose up`

## Environment Variables

PORT=3000
database
FIREBASE_SERVICE_ACCOUNT=
HF_API_TOKEN=your HuggingFace Key
HF_EMOTION_URL=https://router.huggingface.co/hf-inference/models/j-hartmann/emotion-english-distilroberta-base
HF_SENTIMENT_URL=https://api-inference.huggingface.co/models/unitary/toxic-bert
PORT=3000
SUPABASE_ANON_KEY=your supabase key
SUPABASE_URL=your supabase url

## Roadmap

- Stripe payment integration
- Role based access control
- CI/CD pipeline with GitHub Actions

## Author

Isaac Makinde  
LinkedIn: https://linkedin.com/in/isaac-makinde
