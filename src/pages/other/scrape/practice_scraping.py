import requests
from bs4 import BeautifulSoup
import time

# 静的HTMLをホストしているURL (python3 -m http.server 8000 を実行していると想定)
BASE_URL = "http://localhost:8000"

def scrape_static_pages():
    for level in range(1, 6):
        url = f"{BASE_URL}/level{level}.html"
        try:
            response = requests.get(url)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                title = soup.find('h1').get_text()
                print(f"--- {title} ---")
                print(f"URL: {url} - 取得成功")
            else:
                print(f"URL: {url} - エラー {response.status_code}")
        except requests.exceptions.ConnectionError:
            print(f"エラー: {BASE_URL} に接続できません。'python3 -m http.server 8000' を実行してください。")
            break

def note_on_advanced_levels():
    print("\n--- Advanced Levels ---")
    print("Level 6 (Login) & Level 7 (Infinite Scroll) は、requests + BeautifulSoup だけでは困難です。")
    print("Selenium や Playwright などのブラウザ自動操作ライブラリの使用をお勧めします。")

if __name__ == "__main__":
    scrape_static_pages()
    note_on_advanced_levels()
