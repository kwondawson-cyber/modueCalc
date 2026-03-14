#!/usr/bin/env python3
# remove_adslot.py
# 사용법: 저장소 루트 폴더에서 python3 remove_adslot.py

import os
import re

TARGET_DIR = "."  # 현재 폴더 (저장소 루트)

def remove_adslot(html):
    # 1. <div class="ad-slot"> ... </div> 블록 전체 제거
    html = re.sub(
        r'\n?\s*<div class="ad-slot">.*?</div>\s*\n?',
        '\n',
        html,
        flags=re.DOTALL
    )
    # 2. adsbygoogle push 스크립트 제거
    html = re.sub(
        r'\n?\s*<script>\s*\(adsbygoogle\s*=.*?</script>\s*\n?',
        '\n',
        html,
        flags=re.DOTALL
    )
    # 3. .ad-slot CSS 정의 제거
    html = re.sub(
        r'\s*\.ad-slot\{[^}]*\}\n?',
        '\n',
        html
    )
    return html

count = 0
for filename in os.listdir(TARGET_DIR):
    if not filename.endswith(".html"):
        continue
    filepath = os.path.join(TARGET_DIR, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        original = f.read()
    modified = remove_adslot(original)
    if modified != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(modified)
        print(f"✅ {filename}")
        count += 1
    else:
        print(f"⬜ {filename} (변경 없음)")

print(f"\n완료: {count}개 파일 수정됨")
