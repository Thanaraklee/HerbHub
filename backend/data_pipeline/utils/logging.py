import logging

logger = logging.getLogger(__name__)
# -------------------------- set level for terminal -------------------------- #
logger.setLevel(logging.WARNING)

formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

file_handler = logging.FileHandler(r'C:\Users\bzank\Desktop\chatbot314\backend\data_pipeline\pipeline\tmp\error.log')
file_handler.setLevel(logging.ERROR)
file_handler.setFormatter(formatter)

stream_handler = logging.StreamHandler()

logger.addHandler(file_handler)
logger.addHandler(stream_handler)