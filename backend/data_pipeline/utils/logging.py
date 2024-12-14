import logging
import os

logger = logging.getLogger(__name__)
# -------------------------- set level for terminal -------------------------- #
logger.setLevel(logging.WARNING)

formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

# กำหนด path สำหรับ log file
log_directory = os.path.join(os.getcwd(), 'backend', 'data_pipeline', 'pipeline', 'tmp')
log_file = os.path.join(log_directory, 'error.log')

# ตรวจสอบและสร้าง directory หากไม่มีอยู่
if not os.path.exists(log_directory):
    os.makedirs(log_directory)
    print(f"Directory '{log_directory}' created.")

file_handler = logging.FileHandler(log_file)
file_handler.setLevel(logging.ERROR)
file_handler.setFormatter(formatter)

stream_handler = logging.StreamHandler()

logger.addHandler(file_handler)
logger.addHandler(stream_handler)