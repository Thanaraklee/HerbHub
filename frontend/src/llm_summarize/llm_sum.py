import openai
import requests

def summarize_chunk_pharma(chunk, prompt_template, api_keys):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "model": "meta-llama/llama-3.1-70b-instruct:free",
        "messages": [{"role": "user", "content": prompt_template.format(chunk=chunk)}],
        "max_tokens": 1000
    }

    for api_key in api_keys:
        try:
            headers["Authorization"] = f"Bearer {api_key}"
            response = requests.post(url, headers=headers, json=data)

            if response.status_code != 200:
                raise Exception(f"Request failed with status code {response.status_code}: {response.text}")

            response_json = response.json()

            if "choices" not in response_json:
                raise KeyError(f"'choices' key not found in the response: {response_json}")

            summary = response_json["choices"][0]["message"]["content"].strip()
            return summary

        except Exception as e:
            print(f"Error with API key {api_key}: {e}")

    raise Exception("All API keys failed. Unable to complete the request.")

def summarize_chunk_clinical(chunk, prompt_template, api_keys):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "model": "meta-llama/llama-3.1-70b-instruct:free",
        "messages": [{"role": "user", "content": prompt_template.format(chunk=chunk)}],
        "max_tokens": 5000
    }

    for api_key in api_keys:
        try:
            headers["Authorization"] = f"Bearer {api_key}"
            response = requests.post(url, headers=headers, json=data)

            if response.status_code != 200:
                raise Exception(f"Request failed with status code {response.status_code}: {response.text}")

            response_json = response.json()

            if "choices" not in response_json:
                raise KeyError(f"'choices' key not found in the response: {response_json}")

            summary = response_json["choices"][0]["message"]["content"].strip()
            return summary

        except Exception as e:
            print(f"Error with API key {api_key}: {e}")

    raise Exception("All API keys failed. Unable to complete the request.")

def split_text(text, chunk_size=1000):
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

def clean_text(text):
    # Remove any unwanted characters or text artifacts
    cleaned_text = text.replace('\n', ' ').replace('\r', ' ').strip()
    return cleaned_text

def summarize_text_pharma(text: str, api_keys: list) -> str:
    # ------------------------------ Prompt Template ----------------------------- #
    prompt_template = """
    โปรดสรุปข้อความต่อไปนี้ในรูปแบบที่กระชับและเข้าใจง่าย เป็น bullet point:
    "{chunk}"
    """
    # Split the text into chunks
    chunks = split_text(text)

    # Summarize each chunk
    summaries = [summarize_chunk_pharma(chunk, prompt_template, api_keys) for chunk in chunks]

    # Combine the summaries into a single text
    combined_summary = " ".join(summaries)

    # Clean the combined summary
    cleaned_summary = clean_text(combined_summary)

    # Summarize the combined summary to get the final summary
    final_summary = summarize_chunk_pharma(cleaned_summary, prompt_template, api_keys)
    return final_summary

def summarize_text_clinical(text: str, api_keys: list) -> str:
    # ------------------------------ Prompt template ----------------------------- #
    prompt_template = """
    โปรดสรุปบทความวิจัยต่อไปนี้ในรูปแบบที่กระชับและเข้าใจง่ายครบถ้วน เป็น bullet point:
    "{chunk}"
    """

    # Split the text into chunks
    chunks = split_text(text)

    # Summarize each chunk
    summaries = [summarize_chunk_clinical(chunk, prompt_template, api_keys) for chunk in chunks]

    # Combine the summaries into a single text
    combined_summary = " ".join(summaries)

    # Clean the combined summary
    cleaned_summary = clean_text(combined_summary)

    # Summarize the combined summary to get the final summary
    final_summary = summarize_chunk_clinical(cleaned_summary, prompt_template, api_keys)
    return final_summary
