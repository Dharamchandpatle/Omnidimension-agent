# 🤖 AgentFlow - Multi-Agent Task Execution System

**AgentFlow** is an AI-powered automation platform that allows users to describe complex tasks in plain English (or voice) — and automatically executes them using modular agents that can call, book, schedule, and monitor without any manual steps.

> _“Find the best dentist near me, call to book an appointment, add it to my calendar, and keep checking for better slots.”_  
✅ That entire workflow? Automated.

---

## 🚀 Features

- 🧠 **Natural Language Understanding** with OpenAI GPT-4
- 🧩 **Multi-Agent Architecture** (Search, Call, Scheduler, Coordinator)
- 📞 **OmniDimension API** for real-time calling
- 📅 **Google Calendar API** for scheduling events
- 🗣️ **Voice Input + Feedback** (Speech-to-Text & Text-to-Speech)
- 🖥️ **Live Agent Dashboard** with execution logs
- 🧾 **Task History Viewer** for tracking outcomes
- 💻 Frontend in **TypeScript (React)**  
- ⚙️ Backend in **Python (FastAPI)**

---

## 🏗️ Architecture

```plaintext
User Input (Text/Voice)
     ↓
Planner (GPT-4)
     ↓
┌────────────┬────────────┬──────────────┐
│ Research   │ Calling    │ Scheduling   │
│ Agent      │ Agent      │ Agent        │
└────────────┴────────────┴──────────────┘
     ↓
Calendar + Notifications + Logs

📦 Tech Stack
Layer	Technology
Frontend	React + TypeScript + Tailwind
Backend	Python (FastAPI)
AI Planner	OpenAI GPT-4
Voice	Web Speech API (STT & TTS)
Scheduling	Google Calendar API
Calling	OmniDimension API
Deployment	Vercel (frontend), Render/EC2 (backend)

⚙️ Setup Instructions
📌 Prerequisites
Node.js + npm

Python 3.9+

OpenAI API key

Google Calendar API credentials

OmniDimension API access (or mock)

📥 Clone the Repository
bash
Copy
Edit
git clone https://github.com/Dharamchandpatle/Omnidimension-agent.git
cd Omnidimension-agent
🔧 Frontend Setup (React + TypeScript)
bash
Copy
Edit
cd frontend
npm install
npm run dev
⚙️ Backend Setup (FastAPI)
bash
Copy
Edit
cd backend
python -m venv venv
source venv/bin/activate  # or venv\\Scripts\\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
Set your .env:

env
Copy
Edit
OPENAI_API_KEY=your-openai-key
CALENDAR_API_URL=https://your-calendar-api.com
🧪 Example Prompt
text
Copy
Edit
"Book a dermatologist near me for tomorrow evening, call them, add to my calendar, and keep checking for earlier slots."
Response (JSON):

json
Copy
Edit
{
  "success": true,
  "providers": [...],
  "booking": {...},
  "calendar_event": {...}
}
🧠 Team ThrowException

🏆 CodeClash 2.0 Hackathon
Shortlisted for Round 2. Finalist pitch scheduled at Google Office, Gurugram (28 June 2025).
We’re excited to build the future of task automation!

📜 License
MIT License

📬 Contact
Feel free to reach out via LinkedIn or open an issue on GitHub.

Built with 💡 by Team ThrowException for CodeClash 2.0

yaml
Copy
Edit

---

Let me know if you'd like:
- A matching `logo.png` and banner
- Deploy instructions for Vercel + Render
- Badges (e.g., GPT-4, FastAPI, React)

Shall I generate the actual `README.md` file for GitHub too?
