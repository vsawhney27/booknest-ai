#!/bin/bash

# Forbidden Terms Guardrail Script
# Scans repository for vendor-specific terms that should not be included
# Exits with non-zero code if any forbidden terms are found

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Read forbidden terms from taskmaster.yaml
FORBIDDEN_TERMS=(
  "Retell"
  "Retell AI" 
  "ElevenLabs"
  "11labs"
  "Eleven Labs"
)

echo "🔍 Scanning for forbidden vendor terms..."
echo "Project root: $PROJECT_ROOT"
echo ""

# Files and directories to scan
SCAN_PATHS=(
  "full/public/index.html"
  "full/public/assets/css/"
  "full/public/assets/js/"
  "tests/"
  "README.md"
)

# Files to exclude from scan
EXCLUDE_PATTERNS=(
  "node_modules"
  ".git"
  "package-lock.json"
  "lighthouse-audit"
  "taskmaster.yaml"  # Exclude the config file itself
  "check-forbidden-terms.sh"  # Exclude this script itself
  "PRD.md"  # Exclude project documentation that mentions the rule
  "forbidden-scan.mjs"  # Exclude old forbidden scan script
)

VIOLATIONS_FOUND=0
TOTAL_MATCHES=0

# Function to scan for a specific term
scan_term() {
  local term="$1"
  echo "Scanning for: '$term'"
  
  # Build grep exclude pattern
  local exclude_args=""
  for pattern in "${EXCLUDE_PATTERNS[@]}"; do
    exclude_args="$exclude_args --exclude-dir=$pattern --exclude=*$pattern*"
  done
  
  # Search for the term (case insensitive)
  local matches=$(grep -r -i -n $exclude_args "$term" "$PROJECT_ROOT" 2>/dev/null || true)
  
  if [ ! -z "$matches" ]; then
    echo "❌ VIOLATION: Found '$term' in:"
    echo "$matches"
    echo ""
    VIOLATIONS_FOUND=$((VIOLATIONS_FOUND + 1))
    TOTAL_MATCHES=$((TOTAL_MATCHES + $(echo "$matches" | wc -l)))
  else
    echo "✅ Clean: No instances of '$term' found"
  fi
  echo ""
}

# Scan for each forbidden term
for term in "${FORBIDDEN_TERMS[@]}"; do
  scan_term "$term"
done

# Summary
echo "📊 SCAN SUMMARY"
echo "==============="
echo "Forbidden terms checked: ${#FORBIDDEN_TERMS[@]}"
echo "Violations found: $VIOLATIONS_FOUND"
echo "Total matches: $TOTAL_MATCHES"
echo ""

if [ $VIOLATIONS_FOUND -eq 0 ]; then
  echo "🎉 SUCCESS: No forbidden terms found in repository"
  echo "Repository is clean and ready for deployment"
  exit 0
else
  echo "🚨 FAILURE: Found $VIOLATIONS_FOUND forbidden term(s) with $TOTAL_MATCHES total matches"
  echo "Please remove all vendor-specific terms before deployment"
  exit 1
fi