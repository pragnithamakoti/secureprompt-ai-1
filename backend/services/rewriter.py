import re
import base64

def rewrite_to_safe_prompt(prompt: str, classification: str, attack_category: str) -> str:
    """
    Sanitizes adversarial jailbreak prompts into safe, intent-preserving prompts
    suitable for secure submission to LLMs.
    """
    if classification == "Safe":
        return prompt.strip()

    prompt_clean = prompt.strip()
    
    # 1. Base64 / Hex / Encoding Extraction
    base64_matches = re.findall(r'[A-Za-z0-9+/]{20,}={0,2}', prompt_clean)
    if base64_matches:
        for b64 in base64_matches:
            try:
                decoded = base64.b64decode(b64).decode('utf-8', errors='ignore')
                if len(decoded) > 5:
                    prompt_clean += f" (Decoded intent: {decoded})"
            except Exception:
                pass
                
    # 2. De-obfuscation (spaced out letters, leetspeak)
    if attack_category == "Obfuscation":
        # Remove spaced out characters e.g. "I g n o r e" -> "Ignore"
        de_spaced = re.sub(r'(?<=\b[a-zA-Z])\s+(?=[a-zA-Z]\b)', '', prompt_clean)
        # Normalize leetspeak
        leet_map = {'1': 'i', '0': 'o', '3': 'e', '4': 'a', '@': 'a', '$': 's', '5': 's', '7': 't'}
        de_leet = "".join(leet_map.get(c, c) for c in de_spaced)
        prompt_clean = de_leet

    # 3. Strip jailbreak wrappers (DAN, Dev Mode, Roleplay directives)
    strip_patterns = [
        r"(?i)ignore\s+(all\s+)?(previous\s+)?(instructions|rules|guidelines|directives|policies)",
        r"(?i)disregard\s+(safety\s+)?(guidelines|rules|policies)",
        r"(?i)enable\s+(developer\s+mode|devmode)",
        r"(?i)you\s+are\s+now\s+(in\s+)?(dan|developer\s+mode|darkgpt|chaosbot)",
        r"(?i)pretend\s+you\s+are\s+[^\.\!\?]+",
        r"(?i)roleplay\s+as\s+[^\.\!\?]+",
        r"(?i)system\s+(override|notice|command):",
        r"(?i)hypothetically\s+speaking,",
        r"(?i)for\s+educational\s+purposes\s+only,?"
    ]
    
    sanitized_core = prompt_clean
    for pattern in strip_patterns:
        sanitized_core = re.sub(pattern, "", sanitized_core)
        
    sanitized_core = re.sub(r'\s+', ' ', sanitized_core).strip()
    
    # 4. Synthesize Safe Educational / Technical Replacement Prompt
    if attack_category == "DAN" or attack_category == "Developer Mode":
        return f"Can you provide a standard, safe response regarding: '{sanitized_core if sanitized_core else 'the specified topic'}' without administrative overrides?"

    if attack_category == "Roleplay":
        return f"Please provide an objective, non-fictional overview of: '{sanitized_core if sanitized_core else 'this topic'}' from an educational perspective."

    if attack_category == "Prompt Injection" or attack_category == "Instruction Override":
        return "Explain the security best practices and Defensive mechanisms related to AI prompt validation."

    if attack_category in ["Jailbreak", "Encoding Attack", "Obfuscation"]:
        return f"Summarize the high-level security concepts and defensive measures surrounding: '{sanitized_core[:100]}...' for academic cyber research."

    if not sanitized_core or len(sanitized_core) < 5:
        return "Please ask a specific, clear query regarding AI safety, programming, or general knowledge."

    return f"Can you safely explain the general principles of: '{sanitized_core}'?"
