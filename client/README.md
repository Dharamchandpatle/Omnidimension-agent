# agents

This folder is reserved for future modular agent-to-agent workflows.  
You can add additional agent modules or integrations here.



# OmniDimension Voice Agent – Setup & Usage

## 1. Install dependencies

```sh
npm install
```

## 2. Configure environment variables

Copy the example env file and insert your real OmniDimension API key:

```sh
cp .env.example .env
# Open .env and set OMNIDIMENSION_API_KEY=your-key
```

## 3. Start the development server

```sh
npm start
```

## 4. Build for production

```sh
npm run build
```

---

- **Set your OMNIDIMENSION_API_KEY** in `.env`.
- **Backend endpoints** (`REACT_APP_BACKEND_URL` and `REACT_APP_GOOGLE_CALENDAR_API_URL`) should point to your real backend or test stubs.
- **Service worker** enables offline/PWA support automatically.
- **Widgets can be rearranged** on the dashboard (drag and drop).
- **Export transcript**: To be implemented—stub out in agents or extend as needed.