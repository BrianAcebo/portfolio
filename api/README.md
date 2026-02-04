# Portfolio API (Python)

Small FastAPI backend for the portfolio frontend.

## Setup

```bash
cd api-python
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn main:app --reload --port 3000
```

- API: http://localhost:3000
- OpenAPI docs: http://localhost:3000/docs

Set `VITE_API_URL=http://localhost:3000` in the frontend `.env` so the app uses this backend.
