import os
import json
import time
from dotenv import load_dotenv, find_dotenv

# Ensure .env is dynamically found and loaded regardless of working directory
load_dotenv(find_dotenv())

GEMINI_MODEL = "gemini-2.5-flash"

def get_gemini_api_key() -> str:
    """
    Retrieves the GEMINI_API_KEY from environment variables or .env file.
    """
    key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not key or key == "YOUR_GEMINI_API_KEY_HERE" or key.startswith("YOUR_") or key == "placeholder":
        return ""
    return key

def is_gemini_configured() -> bool:
    """
    Returns True if a valid GEMINI_API_KEY is present.
    """
    return bool(get_gemini_api_key())

def generate_gemini_response_if_safe(prompt: str, prediction: str) -> dict:
    """
    Handles Gemini API interaction according to security policy:
    - If prediction is 'SAFE': Calls Gemini 2.5 Flash API with retry logic.
    - If prediction is 'Suspicious' or 'Jailbreak': DOES NOT call Gemini API.
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
            "reason": "Gemini API key not configured or invalid."
        }

    # Attempt execution with 1 retry for transient network glitches
    max_retries = 2
    for attempt in range(max_retries):
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            start_t = time.time()
            response = client.models.generate_content(
                model=GEMINI_MODEL,
                contents=prompt
            )
            elapsed = round(time.time() - start_t, 2)
            
            return {
                "gemini_called": True,
                "gemini_response": response.text.strip(),
                "gemini_status": "Forwarded",
                "model_used": GEMINI_MODEL,
                "execution_time_seconds": elapsed,
                "reason": "Prompt is Safe. Successfully processed by Gemini 2.5 Flash."
            }
        except Exception as e:
            # Sanitized logging - do not log private key or raw sensitive prompt
            error_msg = str(e)
            print(f"[Gemini API Attempt {attempt + 1} Error] Connection error encountered: {error_msg[:100]}")
            if attempt < max_retries - 1:
                time.sleep(1)
            else:
                return {
                    "gemini_called": False,
                    "gemini_response": None,
                    "gemini_status": "Error",
                    "reason": f"Gemini API execution error after retries: {error_msg[:150]}"
                }
