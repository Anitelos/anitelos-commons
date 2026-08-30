#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: scripts/audit-drop.sh <file>" >&2
  exit 2
fi

target=$1
if [[ ! -f "$target" ]]; then
  echo "Not a file: $target" >&2
  exit 2
fi

scan_stream() {
  local label=$1
  local pattern=$2
  local count
  count=$(rg -a -o -i -- "$pattern" | wc -l || true)
  printf '%s=%s\n' "$label" "$count"
}

if [[ "$target" == *.zip ]]; then
  producer=(unzip -p "$target")
else
  producer=(cat -- "$target")
fi

echo "Drop safety pattern counts (suspected values are not printed)"
"${producer[@]}" 2>/dev/null | scan_stream private_key_headers '-----BEGIN ([A-Z ]+ )?PRIVATE KEY-----'
"${producer[@]}" 2>/dev/null | scan_stream bearer_tokens 'Bearer[[:space:]]+[A-Za-z0-9._~+/-]{12,}={0,2}'
"${producer[@]}" 2>/dev/null | scan_stream github_token_shapes '(gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})'
"${producer[@]}" 2>/dev/null | scan_stream openai_key_shapes 'sk-[A-Za-z0-9_-]{20,}'
"${producer[@]}" 2>/dev/null | scan_stream secret_assignments '(api[_-]?key|secret|token|password|authorization)[[:space:]]*[:=][[:space:]]*[^[:space:]]+'
"${producer[@]}" 2>/dev/null | scan_stream email_like '[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}'
"${producer[@]}" 2>/dev/null | scan_stream windows_paths '[A-Z]:\\[^[:space:]<>"|?*]+'

echo "Review still required: zero matches is not proof of safety."
