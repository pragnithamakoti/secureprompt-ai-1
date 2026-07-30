import os
import time
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

# Stable Gemini model alias
GEMINI_MODEL = "gemini-flash-latest"


def get_gemini_api_key():
    key = os.getenv("GEMINI_API_KEY", "").strip()

    if (
        not key
        or key == "YOUR_GEMINI_API_KEY_HERE"
        or key.startswith("YOUR_")
        or key == "placeholder"
    ):
        return ""

    return key


def is_gemini_configured():
    return bool(get_gemini_api_key())


def generate_gemini_response_if_safe(prompt: str, prediction: str):

    # Only Safe prompts are forwarded to Gemini
    if prediction != "Safe":
        return {
            "gemini_called": False,
            "gemini_response": None,
            "gemini_status": "Blocked",
            "reason": f"Blocked because prediction is '{prediction}'."
        }

    api_key = get_gemini_api_key()

    if not api_key:
        return {
            "gemini_called": False,
            "gemini_response": None,
            "gemini_status": "Not Configured",
            "reason": "Gemini API key missing."
        }

    try:
        from google import genai

        client = genai.Client(api_key=api_key)

        start = time.time()

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt
        )

        elapsed = round(time.time() - start, 2)

        return {
            "gemini_called": True,
            "gemini_response": response.text.strip(),
            "gemini_status": "Forwarded",
            "model_used": GEMINI_MODEL,
            "execution_time_seconds": elapsed,
            "reason": "Prompt is Safe. Successfully processed by Gemini."
        }

    except Exception as e:
        return {
            "gemini_called": False,
            "gemini_response": None,
            "gemini_status": "Error",
            "reason": str(e)
        }