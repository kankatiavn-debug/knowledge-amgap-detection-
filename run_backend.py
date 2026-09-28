"""
CausalGap Server Runner.
Run with: python run_backend.py
"""

import sys
import os
import uvicorn
from pathlib import Path

# Add project root to sys.path
BASE_DIR = Path(__file__).resolve().parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    print("=" * 65)
    print(" 🚀 Launching CausalGap Backend Engine (SIH PS 210)")
    print(f" 🌐 Server URL:        http://127.0.0.1:{port}")
    print(f" 📖 Interactive Docs:  http://127.0.0.1:{port}/docs")
    print(f" 📑 Alternative Docs:  http://127.0.0.1:{port}/redoc")
    print(f" 🩺 Health Check:      http://127.0.0.1:{port}/health")
    print("=" * 65)
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)
