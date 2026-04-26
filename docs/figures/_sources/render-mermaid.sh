#!/usr/bin/env bash
# Render the 8 Mermaid figures to SVG + PNG using mmdc.
# Run from this directory.
#
# Requires: @mermaid-js/mermaid-cli installed globally (npm i -g @mermaid-js/mermaid-cli)

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

CONFIG="mermaid-config.json"
OUT="../"

FIGURES=(F-2.3 F-2.6 F-3.3 F-5.2 F-6.1 F-7.2 F-8.2 F-8.3)

for fid in "${FIGURES[@]}"; do
  echo "  rendering ${fid}..."
  mmdc -i "${fid}.mmd" -o "${OUT}${fid}.svg" -c "$CONFIG" -b "#0a0e1a" -q >/dev/null
  mmdc -i "${fid}.mmd" -o "${OUT}${fid}.png" -c "$CONFIG" -b "#0a0e1a" -s 2 -q >/dev/null
done

echo "Done — 8 Mermaid figures rendered."
