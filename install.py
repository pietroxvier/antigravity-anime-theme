#!/usr/bin/env python3
"""
Nocturne Tactical · Antigravity Skin Installer (Dark & Light Mode + Quadradinhos)
Uso:
  python install.py              # Instala ou atualiza a skin no Antigravity
  python install.py --uninstall  # Restaura o app.asar original a partir do backup
"""

import argparse
import base64
import json
import os
import shutil
import struct
from pathlib import Path

DEFAULT_ASAR = Path(os.environ.get("LOCALAPPDATA", "")) / "Programs" / "antigravity" / "resources" / "app.asar"
REPO_DIR = Path(__file__).resolve().parent
DARK_IMG = REPO_DIR / "assets" / "nocturne_dark_bg.jpg"
LIGHT_IMG = REPO_DIR / "assets" / "nocturne_light_bg.jpg"


def uninstall(asar_path: Path):
    bak_path = asar_path.with_suffix(".asar.bak")
    if not bak_path.exists():
        print(f"[erro] Backup não encontrado em: {bak_path}")
        return
    shutil.copy2(bak_path, asar_path)
    print(f"[ok] Antigravity restaurado para o original a partir de {bak_path}")
    print("Pressione Ctrl + R no Antigravity (ou reinicie) para aplicar.")


def install(asar_path: Path):
    if not asar_path.exists():
        print(f"[erro] app.asar não encontrado em: {asar_path}")
        print("Use --asar <caminho> para especificar manualmente.")
        return

    bak_path = asar_path.with_suffix(".asar.bak")
    if not bak_path.exists():
        shutil.copy2(asar_path, bak_path)
        print(f"[ok] Backup criado em: {bak_path}")

    dark_b64 = base64.b64encode(DARK_IMG.read_bytes()).decode("ascii")
    light_b64 = base64.b64encode(LIGHT_IMG.read_bytes()).decode("ascii")

    # Ler preload original do backup
    with open(bak_path, "rb") as f:
        magic = f.read(4)
        u1, u2, header_len = struct.unpack("<III", f.read(12))
        header_json = f.read(header_len).decode("utf-8")
        header = json.loads(header_json)
        data_start = f.tell()
        curr = header["files"]["dist"]["files"]["preload.js"]
        f.seek(data_start + int(curr["offset"]))
        preload_orig = f.read(int(curr["size"])).decode("utf-8", errors="ignore")

    marker = "// --- NOCTURNE TACTICAL SKIN"
    idx = preload_orig.find(marker)
    vanilla_prefix = preload_orig[:idx] if idx != -1 else preload_orig + "\n"

    # Carregar template do skin.js
    skin_template = (REPO_DIR / "src" / "skin.js").read_text(encoding="utf-8")
    skin_code = skin_template.replace("__DARK_B64__", dark_b64).replace("__LIGHT_B64__", light_b64)

    new_preload_bytes = (vanilla_prefix + skin_code).encode("utf-8")

    # Reconstruir asar
    with open(bak_path, "rb") as f:
        magic = f.read(4)
        u1, u2, header_len = struct.unpack("<III", f.read(12))
        header = json.loads(f.read(header_len).decode("utf-8"))
        data_start = f.tell()

        file_entries = []

        def traverse(node, path=""):
            if "files" in node:
                for k, v in node["files"].items():
                    traverse(v, f"{path}/{k}" if path else k)
            elif "offset" in node and "size" in node:
                file_entries.append((path, node, int(node["offset"]), int(node["size"])))

        traverse(header)
        file_entries.sort(key=lambda x: x[2])

        file_data = []
        for path, node, offset, size in file_entries:
            if path == "dist/preload.js":
                file_data.append((path, node, new_preload_bytes))
            else:
                f.seek(data_start + offset)
                file_data.append((path, node, f.read(size)))

    curr_offset = 0
    for path, node, data in file_data:
        node["offset"] = str(curr_offset)
        node["size"] = len(data)
        curr_offset += len(data)

    new_header_json = json.dumps(header, separators=(",", ":")).encode("utf-8")
    new_header_len = len(new_header_json)
    new_u2 = new_header_len + 4
    new_u1 = new_u2 + 4

    with open(asar_path, "wb") as f:
        f.write(magic)
        f.write(struct.pack("<III", new_u1, new_u2, new_header_len))
        f.write(new_header_json)
        for _, _, data in file_data:
            f.write(data)

    print(f"[ok] Skin Nocturne Tactical (Dark + Light Mode) instalada com sucesso em {asar_path}!")
    print("Pressione Ctrl + R no Antigravity (ou reinicie) para visualizar.")


def main():
    parser = argparse.ArgumentParser(description="Instalador da Skin Nocturne Tactical para Antigravity")
    parser.add_argument("--asar", type=Path, default=DEFAULT_ASAR, help="Caminho para o app.asar do Antigravity")
    parser.add_argument("--uninstall", action="store_true", help="Restaura o app.asar original")
    args = parser.parse_args()

    if args.uninstall:
        uninstall(args.asar)
    else:
        install(args.asar)


if __name__ == "__main__":
    main()
