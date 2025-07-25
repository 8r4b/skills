# Use Python base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Install build dependencies
RUN apt-get update && apt-get install -y build-essential python3-dev

# Copy the rest of the backend code
COPY . .

# Expose the application port
EXPOSE 8000

# Run the backend
CMD ["python", "main.py"]
