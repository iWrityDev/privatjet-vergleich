import urllib.request
import json

key = "56927079f89b0a7fb2a5d801e11905dd"
urls = [
    "https://www.privatjet-vergleich.de/ratgeber/privatjet-hamburg-ibiza-kosten/",
    "https://www.privatjet-vergleich.de/ratgeber/privatjet-koeln-berlin-kosten/",
]

payload = {
    "host": "www.privatjet-vergleich.de",
    "key": key,
    "keyLocation": f"https://www.privatjet-vergleich.de/{key}.txt",
    "urlList": urls,
}

data = json.dumps(payload).encode("utf-8")
req = urllib.request.Request(
    "https://api.indexnow.org/IndexNow",
    data=data,
    headers={
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "PrivatjetVergleichSEO/1.0",
    },
    method="POST",
)

try:
    with urllib.request.urlopen(req, timeout=15) as resp:
        print(f"IndexNow status: {resp.status}")
        print(f"Response: {resp.read().decode('utf-8', errors='replace')}")
except Exception as e:
    print(f"IndexNow error: {e}")

# Also ping Bing
req_bing = urllib.request.Request(
    "https://www.bing.com/indexnow",
    data=data,
    headers={
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "PrivatjetVergleichSEO/1.0",
    },
    method="POST",
)
try:
    with urllib.request.urlopen(req_bing, timeout=15) as resp:
        print(f"\nBing IndexNow status: {resp.status}")
except Exception as e:
    print(f"\nBing IndexNow error: {e}")
