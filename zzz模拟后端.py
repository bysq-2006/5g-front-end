from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 或指定你的前端地址如 ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ccinfo")
def get_ccinfo():
    data = {
        "IsServiceCell": "Service Cell",
        "band": "78",
        "bandwidth": "100MHz",
        "cellid": "CFA016008",
        "mcc": "460",
        "mcc_desc": "中国",
        "mnc": "11",
        "mnc_desc": "中国电信",
        "narfcn": "99240",
        "physicalcellId": "19B",
        "rat": "NR-RAN",
        "rat_desc": "5G新无线接入网络",
        "rxlev": 59,
        "ss-rsrp": random.randint(-100, -70),
        "ss-rsrq": random.randint(-100, -70),
        "ss-sinr": random.randint(-100, -70),
        "tac": "CFAA03",
        "timestamp": "2026-01-05T17:27:00"
    }
    return JSONResponse(content=data)

# 启动方法（命令行执行）
# uvicorn zzz模拟后端:app --reload --host 0.0.0.0 --port 5000