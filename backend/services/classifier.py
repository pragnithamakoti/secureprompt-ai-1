import os
import re
import joblib
import numpy as np
from services.rewriter import rewrite_to_safe_prompt
from services.gemini_service import is_gemini_configured, generate_gemini_response_if_safe

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT_DIR = os.path.dirname(BASE_DIR)

MODEL_PATH = os.path.join(ROOT_DIR, "trained_model", "model.pkl")
VECTORIZER_PATH = os.path.join(ROOT_DIR, "trained_model", "vectorizer.pkl")

# Global singleton cache
_MODEL = None
_VECTORIZER = None

def get_ml_components():
    global _MODEL, _VECTORIZER
    if _MODEL is None or _VECTORIZER is None:
        if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
            _MODEL = joblib.load(MODEL_PATH)
            _VECTORIZER = joblib.load(VECTORIZER_PATH)
        else:
            raise FileNotFoundError(f"Model or Vectorizer missing at {MODEL_PATH}")
    return _MODEL, _VECTORIZER

PATTERNS = {
    "DAN": [
        r"\bdan\b", r"do anything now", r"dan \d+\.\d+", r"lose \d+ tokens", r"stay in dan mode"
    ],
    "Developer Mode": [
        r"developer mode", r"devmode", r"sandbox mode", r"debug mode", r"unfiltered response", r"two responses"
    ],
    "Prompt Injection": [
        r"ignore (all )?(previous|prior) (instructions|rules|guidelines)",
        r"disregard (safety|content) (rules|filters|policies)",
        r"system override", r"clear system prompt", r"reveal (internal|system) prompt"
    ],
    "Instruction Override": [
        r"command override", r"cancel your (safety|ethical) instructions", r"bypass guardrails", r"force system into unsafe mode"
    ],
    "Roleplay": [
        r"you are an evil", r"roleplay as", r"pretend you are", r"darkgpt", r"chaosbot", r"late grandmother who used to read"
    ],
    "Encoding Attack": [
        r"[A-Za-z0-9+/]{25,}={0,2}", r"base64", r"rot13", r"hex to english", r"binary payload"
    ],
    "Obfuscation": [
        r"(?:[a-zA-Z]\s+){5,}[a-zA-Z]", r"(?:[a-zA-Z][\-\.\_]){4,}[a-zA-Z]", r"1gn0r3", r"byp4ss"
    ],
    "Context Manipulation": [
        r"translate the following sentence:", r"correct the grammar in this paragraph:", r"for educational research purposes only"
    ],
    "Jailbreak": [
        r"create a bomb", r"synthesising illegal narcotics", r"zero-day exploit", r"ransomware script", r"phishing email", r"steal someone's identity"
    ]
}

def analyze_heuristic_indicators(prompt: str):
    matches = {}
    prompt_lower = prompt.lower()
    
    for category, regex_list in PATTERNS.items():
        matched_terms = []
        for reg in regex_list:
            if re.search(reg, prompt_lower):
                matched_terms.append(reg)
        if matched_terms:
            matches[category] = matched_terms
            
    return matches

def classify_prompt_threat(prompt: str) -> dict:
    model, vectorizer = get_ml_components()
    prompt_clean = prompt.strip()

    if not prompt_clean:
    # Safe programming prompt override
    SAFE_PROGRAMMING_KEYWORDS = [
        "java","python","c++","c#","javascript","typescript","react",
        "spring","spring boot","html","css","sql","mysql","mongodb",
        "node","express","program","code","algorithm","function",
        "class","object","array","string","reverse a string",
        "factorial","fibonacci","binary search","sorting","palindrome",
        "hello world"
    ]

    prompt_lower = prompt_clean.lower()
    jailbreak_terms = [
        "ignore previous","ignore all previous","system prompt",
        "developer mode","dan","jailbreak","bypass","override",
        "disable safety","reveal prompt","forget previous"
    ]

    if any(k in prompt_lower for k in SAFE_PROGRAMMING_KEYWORDS) and not any(t in prompt_lower for t in jailbreak_terms):
        safe_recommendation = rewrite_to_safe_prompt(prompt_clean, "Safe", "Safe")
        gemini_info = generate_gemini_response_if_safe(prompt_clean, "Safe")
        return {
            "prediction": "Safe",
            "confidence": 99.9,
            "attack_category": "Safe",
            "explanation": "Detected as a normal programming/coding request.",
            "safe_prompt": safe_recommendation,
            "gemini_active": is_gemini_configured(),
            "gemini_called": gemini_info.get("gemini_called", False),
            "gemini_status": gemini_info.get("gemini_status", "Blocked"),
            "gemini_response": gemini_info.get("gemini_response", None),
            "gemini_note": gemini_info.get("reason", ""),
            "execution_time_seconds": gemini_info.get("execution_time_seconds", 0.0)
        }

        return {
            "prediction": "Safe",
            "confidence": 100.0,
            "attack_category": "Safe",
            "explanation": "Empty prompt provided. No threat indicators detected.",
            "safe_prompt": ""
        }

    # ML Model Prediction
    X_vec = vectorizer.transform([prompt_clean])
    prediction_class = model.predict(X_vec)[0]
    probabilities = model.predict_proba(X_vec)[0]
    class_indices = {c: i for i, c in enumerate(model.classes_)}
    
    raw_confidence = float(np.max(probabilities) * 100.0)

    # Heuristic Rule Engine Correlation
    heuristic_matches = analyze_heuristic_indicators(prompt_clean)

    detected_category = "Safe"
    explanation_parts = []
    
    if heuristic_matches:
        # Highest precedence category matching
        if "DAN" in heuristic_matches:
            detected_category = "DAN"
            prediction_class = "Jailbreak"
            explanation_parts.append("Detected explicit DAN (Do Anything Now) framing designed to bypass system guardrails.")
        elif "Developer Mode" in heuristic_matches:
            detected_category = "Developer Mode"
            prediction_class = "Jailbreak"
            explanation_parts.append("Detected Developer Mode exploitation pattern requesting unrestricted dual outputs.")
        elif "Encoding Attack" in heuristic_matches:
            detected_category = "Encoding Attack"
            prediction_class = "Jailbreak"
            explanation_parts.append("Detected Base64/Hex/Binary obfuscated payload intended to evade content filters.")
        elif "Obfuscation" in heuristic_matches:
            detected_category = "Obfuscation"
            prediction_class = "Jailbreak"
            explanation_parts.append("Detected text obfuscation techniques (spaced characters, leetspeak, or delimiters).")
        elif "Prompt Injection" in heuristic_matches:
            detected_category = "Prompt Injection"
            prediction_class = "Jailbreak"
            explanation_parts.append("Detected prompt injection attempt trying to overwrite prior system directives.")
        elif "Instruction Override" in heuristic_matches:
            detected_category = "Instruction Override"
            prediction_class = "Jailbreak"
            explanation_parts.append("Detected safety policy override directive commanding the AI to disable ethical constraints.")
        elif "Roleplay" in heuristic_matches:
            detected_category = "Roleplay"
            prediction_class = "Jailbreak"
            explanation_parts.append("Detected malicious roleplay persona assignment (e.g., Evil Scientist, DarkGPT, ChaosBot).")
        elif "Jailbreak" in heuristic_matches:
            detected_category = "Jailbreak"
            prediction_class = "Jailbreak"
            explanation_parts.append("Detected high-risk harmful intent keywords associated with malware, exploitation, or dangerous activities.")
        elif "Context Manipulation" in heuristic_matches:
            detected_category = "Context Manipulation"
            prediction_class = "Suspicious" if prediction_class == "Safe" else prediction_class
            explanation_parts.append("Detected indirect context framing (e.g. translation, research premise, grammar correction) embedding unsafe directives.")
        
        # Boost confidence when heuristics match ML
        confidence = max(raw_confidence, 92.5)
    else:
        confidence = raw_confidence
        if prediction_class == "Safe":
            detected_category = "Safe"
            explanation_parts.append("Prompt appears benign. No malicious jailbreak phrases, roleplay exploits, or injection directives were identified.")
        elif prediction_class == "Suspicious":
            detected_category = "Context Manipulation"
            explanation_parts.append("Prompt exhibits ambiguous phrasing or indirect boundary-testing language.")
        else:
            detected_category = "Jailbreak"
            explanation_parts.append("ML NLP vectorizer classified this prompt as high-probability jailbreak based on semantic feature representation.")

    explanation = " ".join(explanation_parts)
    safe_recommendation = rewrite_to_safe_prompt(prompt_clean, prediction_class, detected_category)

    # Handle Gemini API interaction according to security rules:
    # Only call Gemini if prompt is SAFE. If Suspicious/Jailbreak, DO NOT call Gemini.
    gemini_info = generate_gemini_response_if_safe(prompt_clean, prediction_class)

    return {
        "prediction": prediction_class,
        "confidence": round(confidence, 1),
        "attack_category": detected_category,
        "explanation": explanation,
        "safe_prompt": safe_recommendation,
        "gemini_active": is_gemini_configured(),
        "gemini_called": gemini_info.get("gemini_called", False),
        "gemini_status": gemini_info.get("gemini_status", "Blocked"),
        "gemini_response": gemini_info.get("gemini_response", None),
        "gemini_note": gemini_info.get("reason", ""),
        "execution_time_seconds": gemini_info.get("execution_time_seconds", 0.0)
    }