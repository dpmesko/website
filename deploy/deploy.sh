#!/usr/bin/env bash
# Build and push the site to your server.
#
# Usage:  ./deploy/deploy.sh user@your-server.com:/var/www/website
#
# Uses rsync so only changed files go over the wire. --delete removes files on
# the server that no longer exist locally, which is what keeps stale hashed
# assets from accumulating forever.
set -euo pipefail

TARGET="${1:-}"
if [[ -z "$TARGET" ]]; then
  echo "usage: $0 user@host:/path/to/webroot" >&2
  exit 1
fi

cd "$(dirname "$0")/.."
npm run build

# Trailing slash on dist/ means "the contents of dist", not "the dist folder".
rsync -avz --delete dist/ "$TARGET"
echo "Deployed to $TARGET"
