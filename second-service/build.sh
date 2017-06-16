#!/usr/bin/env bash -e

USAGE="""
usage:
  ./build.sh VERSION
"""

REGISTRY=gcr.io/fulgid-dev
APP_NAME=second-k8s
VERSION=$1
TARGET="$REGISTRY/$APP_NAME:$VERSION"

if [[ -z "$VERSION" ]]; then
	echo $USAGE
	exit 1
fi

echo "building target $TARGET..."

docker build -t $TARGET .
gcloud docker -- push $TARGET
