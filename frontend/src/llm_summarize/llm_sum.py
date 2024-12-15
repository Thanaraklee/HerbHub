import openai
import requests

# ------------------------------ Prompt Template ----------------------------- #
prompt_template = """
### instruction:
Summarize the given text in a concise and easy-to-understand manner using bullet points:

### example input:
การศึกษาฤทธิ์ปกป้องเส้นผมจากแสงแดดของน้ำว่านหางจระเข้ ที่เตรียมด้วยวิธีการคั้นน้ำจากวุ้นว่านหางจระเข้ (ตัวอย่างพืชจากประเทศอินเดีย voucher no. 9029)
ทำการทดสอบฤทธิ์ปกป้องเส้นผมกับตัวอย่างเส้นผมที่ได้จากผู้หญิงชาวเอเชีย อายุ 25-40 ปี ที่มีสีผมต่างกัน ได้แก่ ผมสีดำ (ธรรมชาติ) ผมสีเทาจากการย้อมด้วยเฮนน่า และผมทำสีจากเคมี ด้วยการจุ่มเส้นผมในน้ำว่านหางจระเข้จากนั้นฉายรังสียูวีบีให้ผม
(ระยะห่างระหว่างโคมไฟและเส้นผม 20 ซม.) วันละ 4 ชม. ติดต่อกัน 25 วัน (รวมได้รับรังสียูวี 100 ชม.) ประเมินผลจากปริมาณกรดอะมิโนในเส้นผมและการสลายตัวของทริปโตเฟนซึ่งบ่งถึงความเสียหายของเส้นผมจากการได้รับรังสียูวี
ผลพบว่าระดับกรดอะมิโนในเส้นผมสีดำ สีเทา และผมทำสีหลังการได้รับรังสียูวีบี มีค่าลดลง 0.045, 0.029 และ 0.017 ก. ตามลำดับ เปอร์เซ็นต์การสลายตัวทริปโตเฟนในกลุ่มผมสีดำ
ผมสีเทา และผมทำสี เท่ากับ 20.42, 13.98 และ 6.98% ตามลำดับ ซึ่งมีค่าดีกว่ากลุ่มเปรียบเทียบที่ได้รับสารปกป้องเส้นผมตามท้องตลาด (Activaloe, UK) ที่พบการเปลี่ยนแปลงของกรดอะมิโนในเส้นผมสีดำ ผมสีเทา
และผมทำสี เท่ากับ 0.074, 0.037 และ 0.045 ก. และพบการสลายตัวของทริปโตเฟนเท่ากับ 45, 22 และ 20% ตามลำดับ แสดงให้เห็นว่าน้ำวุ้นว่านหางจระเข้มีฤทธิ์ปกป้องเส้นผมจากแสงแดด
โดยให้ผลดีกับผมทำที่ผ่านการสีมากกว่าผมดำตามธรรมชาติ (52)2 การศึกษาเกี่ยวกับผิวหน้า

### example output:
สรุป: ข้อดีของน้ำว่านหางจระเข้ต่อเส้นผม:
*   ช่วยปกป้องเส้นผมจากแสงแดด
*   มีประสิทธิภาพมากกว่าสารปกป้องเส้นผมตามท้องตลาด
*   ช่วยลดการสลายตัวของทริปโตเฟนในเส้นผมได้
*   มีผลดีกับผมทำสีมากกว่าผมดำตามธรรมชาติ

### input:
"{chunk}"

### output:
"""

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
