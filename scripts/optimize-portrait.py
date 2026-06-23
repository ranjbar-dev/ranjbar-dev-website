#!/usr/bin/env python3
"""Optimize the portrait for the web.

Usage:
    python scripts/optimize-portrait.py amir.jpg

Reads a source image (e.g. amir.jpg in the repo root), crops it to a 4:5
portrait, resizes to 720x900 and writes an optimized WebP to public/amir.jpg
(the path the Hero references). Run this after dropping in the real photo.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

TARGET_W, TARGET_H = 720, 900  # 4:5
OUT = Path(__file__).resolve().parent.parent / "public" / "amir.jpg"


def main() -> None:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("amir.jpg")
    if not src.exists():
        sys.exit(f"Source not found: {src}")

    img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    img = ImageOps.fit(img, (TARGET_W, TARGET_H), method=Image.LANCZOS, centering=(0.5, 0.4))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "WEBP", quality=82, method=6)
    kb = OUT.stat().st_size / 1024
    print(f"Wrote {OUT} ({TARGET_W}x{TARGET_H}, {kb:.0f} KB)")


if __name__ == "__main__":
    main()
