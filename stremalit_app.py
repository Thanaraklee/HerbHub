import streamlit as st
from langchain_ollama.llms import OllamaLLM
from langchain_ollama import ChatOllama
from langchain.docstore.document import Document
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains.summarize import load_summarize_chain

def generate_response(txt):
    # Instantiate the LLM model
    llm = OllamaLLM(model="llama3.1:8b", temperature=0)
    # Split text
    text_splitter = CharacterTextSplitter()
    texts = text_splitter.split_text(txt)
    # Create multiple documents
    docs = [Document(page_content=t) for t in texts]
    # Text summarization
    chain = load_summarize_chain(llm, chain_type='map_reduce')
    return chain.run(docs)

data = {
    "Aloe vera": {
        "pharmacological_studies":[
            {
                "pharmacological": "บำรุงเส้นผม",
                "text":"การศึกษาฤทธิ์ปกป้องเส้นผมจากแสงแดดของน้ำว่านหางจระเข้ ที่เตรียมด้วยวิธีการคั้นน้ำจากวุ้นว่านหางจระเข้ (ตัวอย่างพืชจากประเทศอินเดีย voucher no. 9029) ทำการทดสอบฤทธิ์ปกป้องเส้นผมกับตัวอย่างเส้นผมที่ได้จากผู้หญิงชาวเอเชีย อายุ 25-40 ปี ที่มีสีผมต่างกัน ได้แก่ ผมสีดำ (ธรรมชาติ) ผมสีเทาจากการย้อมด้วยเฮนน่า และผมทำสีจากเคมี ด้วยการจุ่มเส้นผมในน้ำว่านหางจระเข้จากนั้นฉายรังสียูวีบีให้ผม (ระยะห่างระหว่างโคมไฟและเส้นผม 20 ซม.) วันละ 4 ชม. ติดต่อกัน 25 วัน (รวมได้รับรังสียูวี 100 ชม.) ประเมินผลจากปริมาณกรดอะมิโนในเส้นผมและการสลายตัวของทริปโตเฟนซึ่งบ่งถึงความเสียหายของเส้นผมจากการได้รับรังสียูวี ผลพบว่าระดับกรดอะมิโนในเส้นผมสีดำ สีเทา และผมทำสีหลังการได้รับรังสียูวีบี มีค่าลดลง 0.045, 0.029 และ 0.017 ก. ตามลำดับ เปอร์เซ็นต์การสลายตัวทริปโตเฟนในกลุ่มผมสีดำ ผมสีเทา และผมทำสี เท่ากับ 20.42, 13.98 และ 6.98% ตามลำดับ ซึ่งมีค่าดีกว่ากลุ่มเปรียบเทียบที่ได้รับสารปกป้องเส้นผมตามท้องตลาด (Activaloe, UK) ที่พบการเปลี่ยนแปลงของกรดอะมิโนในเส้นผมสีดำ ผมสีเทา และผมทำสี เท่ากับ 0.074, 0.037 และ 0.045 ก. และพบการสลายตัวของทริปโตเฟนเท่ากับ 45, 22 และ 20% ตามลำดับ แสดงให้เห็นว่าน้ำวุ้นว่านหางจระเข้มีฤทธิ์ปกป้องเส้นผมจากแสงแดด โดยให้ผลดีกับผมทำที่ผ่านการสีมากกว่าผมดำตามธรรมชาติ (52)",
                "pharmacological_ref": [
                    "Daud FS, Kulkarni SB. Comparative evaluation of proto-protective effect of Aloe veraTourn. ex Linn. on UV damage in different Asian hair type. Ind J Nat Prod Res. 2011;2(2):179-83."
                ]
            },
            {
                "pharmacological": "ทำให้ผิวหน้าขาว",
                "text":"ยับยั้งเอนไซม์ไทโรซิเนสสารสกัด 95% เอทานอลจากว่านหางจระเข้ ที่เตรียมการสกัดด้วยวิธีแช่สกัดใน 95% เอทานอล เป็นเวลา 7 วัน วิเคราะห์องค์ประกอบทางเคมีที่พบในสารสกัดด้วย column chromatography พบสาร 9 ชนิด ได้แก่9-dihydroxyl-2′-O-(Z)-cinnamoyl-7-methoxy-aloesin, aloe-emodin, aloin A, aloin B, elgonica dimer A, feralolide, isoaloeresin D, aloeresin E และ 7-O-methylaloeresinA ทำการทดสอบฤทธิ์ต่อการทำงานของเอนไซม์ไทโรซิเนส พบว่าสารทั้ง 9 ชนิดที่ความเข้มข้น 100 ไมโครโมลาร์ ยับยั้งการทำงานของเอนไซม์ได้ 9.5, 21.5, 18.7, 23.1, 1.2, 1.5, 36.8, 18.1, และ 95.2% ตามลำดับ โดยสาร 7-O-methylaloeresinA มีฤทธิ์ดีที่สุดในการยับยั้งเอนไซม์ ด้วยค่า IC50เท่ากับ 9.8±0.9 ไมโครโมลาร์ และให้ผลใกล้เคียงกับการใช้กรดโคจิก (5) การศึกษาผลต่อเม็ดสีเมลานินของสารสกัดจากใบว่านหางจระเข้ (ตัวอย่างพืชจากประเทศอินเดีย voucher no: 284/BOT/Saifia/11) เตรียมสารสกัดว่านหางจระเข้ด้วยวิธีการสกัดแบบต่อเนื่องด้วย Soxlet extractor ที่มีเอทานอลเป็นตัวทำละลาย และทำให้สารสกัดแห้งด้วยวิธีทำแห้งแบบสุญญากาศ วิเคราะห์ปริมาณสารสำคัญด้วย HPTLCพบสาร aloinเป็นองค์ประกอบหลักทำการทดสอบฤทธิ์ต่อเมลานินในหางคางคกบ้าน (Bufomelanostictus) ในหลอดทดลอง ผลพบว่าเมื่อให้สารสกัดว่านหางจระเข้ที่ความเข้มข้น 1-64 มคก./มล. จะชักนำการเกาะกลุ่มของเมลานินได้ตามขนาดของสารสกัดที่ได้รับ โดยสารสกัดที่ขนาด 6.4 มคก./มล. มีค่าเฉลี่ยขนาดเซลล์เมลาโนฟอร์ (mean melanophore size index) เท่ากับ 0.82±0.5 ซึ่งน้อยกว่าเซลล์ปกติอย่างมีนัยสำคัญ (5.89±0.19) และมีค่าใกล้เคียงกับกลุ่มควบคุมบวกซึ่งได้รับ adrenaline และเมื่อใช้สารสกัดว่านหางจระเข้ร่วมกับ reserpine จะเสริมฤทธิ์ชักนำการเกาะกลุ่มได้ดีกว่าการใช้สารสกัดเดี่ยว นอกจากนี้ยังพบว่าฤทธิ์ของสารสกัดจากว่านหางจระเข้จะถูกยับยั้งเมื่อให้ร่วมกับ yohimbine (α2 adrenergic blocker) แสดงให้เห็นว่าสารสกัดเอทานอลวุ้นว่านหางจระเข้มีฤทธิ์ทำให้ผิวขาว ผ่านการชักนำการเกาะกลุ่มของเมลานิน โดยมีสาร aloinเป็นสารสำคัญในการออกฤทธิ์ (12) การทดสอบผลต่อเอนไซม์ไทโรซิเนสของสารสกัด 80% เอทานอลจากส่วนใบ วุ้น เปลือก และดอกว่านหางจระเข้อายุ 3 ปี (ตัวอย่างพืชจากประเทศโปรตุเกส) ที่สกัดด้วยวิธีsolid-liquid extraction โดยมีเอทานอล:น้ำ (อัตราส่วน 80:20 โดยปริมาตร) เป็นตัวทำละลาย พบว่าสารสกัดจากดอกยับยั้งการทำงานของเอนไซม์ดีที่สุดด้วย รองลงมาคือสารสกัดจากส่วนเปลือก และสารสกัดจากส่วนวุ้น ด้วยค่า IC50เท่ากับ 4.85, มก./มล. สารสกัดจากเปลือกและสารสกัดจากวุ้นมีฤทธิ์อย่างอ่อนในการยับยั้งเอนไซม์ โดยที่ขนาด 8 มก./มล. ยับยั้งการทำงานของเอนไซม์ได้ 27.2% และ 30.38% ตามลำดับ และในการศึกษานี้ไม่พบฤทธิ์ยับยั้งเอนไซม์ไทโรซิเนสของสารสกัดจากส่วนใบ (53)",
                "pharmacological_ref": [
                    "Kim JH, Yoon JY, Yang SY, Choi SK, Kwon SJ, Cho IS, et al. Tyrosinase inhibitory components from Aloe vera and their antiviral activity. J Enzyme Inhib Med Chem. 2017 Dec;32(1):78-83. doi: 10.1080/14756366.2016.1235568.",
                    "Ali SA, Galgut JM, Choudhary RK. On the novel action of melanolysis by a leaf extract of Aloe vera and its active ingredient aloin, potent skin depigmenting agents. Planta Med. 2012;78(8):767-71. doi: 10.1055/s-0031-1298406.",
                    "Añibarro-Ortega M, Pinela J, Barros L, Ćirić A, Silva SP, Coelho E, et al. Compositional features and bioactive properties of Aloe vera leaf (fillet, mucilage, and rind) and flower. Antioxidants (Basel). 2019;8(10):444. doi: 10.3390/antiox8100444."
                ]
            },
            {
                "pharmacological": "บำรุงผิว",
                "text":"การศึกษาพัฒนาครีมมาร์คหน้าว่านหางจระเข้ พบว่าตำรับที่ประกอบด้วยสารสกัดว่านหางจระเข้ 0.15%,polyvinylpyrrolidoneK307.55%, polyvinyl alcohol 1.51%, methylparaben 0.10%, propylparaben 0.10%, BHT 0.12% และน้ำ 90.61% มีความเหมาะสม ค่า pH 6.47 ความหนาแน่น 1.066 ก./มล. ความหนืด 24,000 ปาลคาส มีปริมาณวิตามินซี 2.2 ก. และมาร์กมีระยะเวลาแห้ง 25 นาที การทดสอบความพึงพอใจในอาสาสมัคร 20 ราย พบว่าอาสาสมัครามีความพึงพอใจในด้านกลิ่น ความรู้สึกอ่อนนุ่มของใบหน้า ความรู้สึกสะอาดของผิว และสีของผลิตภัณฑ์ (54)",
                "pharmacological_ref": [
                    "Hendrawati TY, Nugrahani RA, Utomo S, Ramadhan AI. Formulation process making of Aloe vera mask with variable percentage of Aloe vera gel extract. IOP Conf Ser Mater Sci Eng. 2018;403:012013. doi:10.1088/1757-899X/403/1/012013."
                ]
            },
        ]
    },
    "Curcuma longa": {}
}

st.title("GraphHerb")


# หน้าเลือกหัวข้อ
topic = st.selectbox("เลือกหัวข้อ", list(data.keys()))

# แสดงข้อมูลที่เกี่ยวข้องกับหัวข้อ
if topic:
    studies = data[topic]["pharmacological_studies"]
    study = st.selectbox("เลือกการศึกษาที่เกี่ยวข้อง", [s["pharmacological"] for s in studies])

    # กดปุ่ม chat เพื่อแสดงข้อความ
    if st.button("Chat"):
        # หาเนื้อหาของการศึกษา
        selected_study = next(s for s in studies if s["pharmacological"] == study)
        text_to_chat = selected_study["text"]
        
        # สร้างการตอบสนองจากข้อความ
        docs = generate_response(text_to_chat)
        
        # แสดงหน้าจอแชท
        chat = ChatOllama(llm=OllamaLLM(model="llama3.1:8b", temperature=0))
        response = chat.chat(docs)
        
        # แสดงผลการตอบสนอง
        st.write(response)