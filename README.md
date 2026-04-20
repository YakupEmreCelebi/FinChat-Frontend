# FinChat - AI-Powered Financial Assistant (Frontend)

Welcome to the frontend repository of **FinChat**, an intelligent financial assistant designed to provide real-time cryptocurrency data, interactive historical charts, and portfolio analysis through a conversational AI interface.

🌍 **Live Demo:** [https://finchat-pcsqm1pir-yakupemrecelebis-projects.vercel.app/](https://finchat-pcsqm1pir-yakupemrecelebis-projects.vercel.app/)

🔗 **Backend Repository:** [https://github.com/YakupEmreCelebi/FinChat-Backend](https://github.com/YakupEmreCelebi/FinChat-Backend)

## ✨ Key Features
- **Conversational UI:** A seamless chat interface mimicking a natural conversation with a financial analyst.
- **Real-Time Streaming:** Utilizes Server-Sent Events (`text/event-stream`) to render AI responses with a smooth typewriter effect.
- **Dynamic Charting:** Automatically renders interactive line charts (Recharts) based on dynamic metadata injected by the AI.
- **Smart Error Handling:** Defensive programming implemented to handle legacy cache and prevent application crashes during structural data updates.

## 🛠️ Tech Stack
- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Visualization:** Recharts
- **Markdown Rendering:** React-Markdown

---

## 🚀 How to Run Locally (Docker - Level 3 Production Ready)

This project is fully containerized using a **Multi-Stage Build** (Node.js for building, Nginx for serving). To spin up both the Frontend and Backend simultaneously with a single command, you need to set up a parent directory orchestrator.

### 1. Directory Structure
Create a parent folder and clone both repositories inside it so they sit side-by-side. Make sure the folder names match the compose file:
```text
parent-folder/
 ├── FinChatPhyton/       # (Backend Repository)
 └── FinChat-Frontend/    # (Frontend Repository)
```

### 2. Create the Orchestrator
Create a `docker-compose.yml` file directly inside the `parent-folder/` and paste the following configuration:

```yaml
version: '3.8'

services:
  backend:
    build: ./FinChatPhyton
    ports:
      - "8000:8000"
    env_file:
      - ./FinChatPhyton/.env
    networks:
      - finchat-network

  frontend:
    build: ./FinChat-Frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - finchat-network

networks:
  finchat-network:
    driver: bridge
```

### 3. Run the Application
Open your terminal in the `parent-folder/` and run:
```bash
docker compose up --build
```
Once the build is complete, you can access the application at `http://localhost:3000`.

---

## 💻 How to Run Locally (Manual Mode)

If you prefer not to use Docker, you can run the frontend development server manually:

1. **Navigate to the frontend directory:**
   ```bash
   cd FinChat-Frontend
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed (v20+ is recommended for Vite).
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port Vite provides).

---

*This project was developed as a Software Engineering Internship submission for Beyond Tech.*
