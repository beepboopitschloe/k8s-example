#!/bin/bash -e

USAGE="""
usage:
  ./hotswap.sh NAME
"""

APP_NAME=$1
DEPLOYMENT_NAME=$APP_NAME-deployment
PORT=8080
TP_ARGS="${@:2}"

if [[ -z "$APP_NAME" ]]; then
    echo $USAGE
    exit 1
fi
shift 

echo "hotswapping $DEPLOYMENT_NAME"
echo ""

telepresence -m inject-tcp --swap-deployment $DEPLOYMENT_NAME --expose $PORT --run-shell $TP_ARGS
