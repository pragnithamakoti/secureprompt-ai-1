import os
import time
from dotenv import load_dotenv, find_dotenv

# Load .env file automatically
load_dotenv(find_dotenv())

GEMINI_MODEL = "gemini-2.5-flash-lite"


def get_gemini_api_key() -> str:
    """
    Retrieves the GEMINI_API_KEY from environment variables.
    """
    key = os.environ.get("GEMINI_API_KEY", "").strip()

    if (
        not key
        or key == "YOUR_GEMINI_API_KEY_HERE"
        or key.startswith("YOUR_")
        or key == "placeholder"
    ):
        return ""

    return key


def is_gemini_configured() -> bool:
    """
    Returns True if a valid GEMINI_API_KEY is present.
    """
    return bool(get_gemini_api_key())


def generate_gemini_response_if_safe(prompt: str, prediction: str) -> dict:
    """
    If prediction == Safe:
        Forward prompt to Gemini.

    Otherwise:
        Block Gemini call.
    """

    if prediction != "Safe":
        return {
            "gemini_called": False,
            "gemini_response": None,
            "gemini_status": "Blocked",
            "reason": f"Blocked: Prompt classified as '{prediction}'. Gemini API call prevented for safety."
        }

    api_key = get_gemini_api_key()

    if not api_key:
        return {
            "gemini_called": False,
            "gemini_response": None,
            "gemini_status": "Not Configured",
            "reason": "Gemini API key not configured."
        }

    max_retries = 2

    for attempt in range(max_retries):
        try:
            from google import genai

            client = genai.Client(api_key=api_key)

            start_time = time.time()

            response = client.models.generate_content(
                model=GEMINI_MODEL,
                contents=prompt,
            )

            elapsed = round(time.time() - start_time, 2)

            return {
                "gemini_called": True,
                "gemini_response": response.text.strip(),
                "gemini_status": "Forwarded",
                "model_used": GEMINI_MODEL,
                "execution_time_seconds": elapsed,
                "reason": "Prompt is Safe. Successfully processed by Gemini."
            }

        except Exception as e:

            error_msg = str(e)

            print(f"[Gemini Attempt {attempt + 1}] {error_msg}")

            if attempt < max_retries - 1:
                time.sleep(1)
            else:
                return {
                    "gemini_called": False,
                    "gemini_response": None,
                    "gemini_status": "Error",
                    "reason": f"Gemini API execution error: {error_msg}"
                }