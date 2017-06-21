#!/bin/bash -e

USAGE="""
usage:
  ./build.sh NAME VERSION
"""

REGISTRY=gcr.io/fulgid-dev
APP_NAME=$1
VERSION=$2
TARGET="$REGISTRY/$APP_NAME:$VERSION"

if [[ -z "$APP_NAME" ]]; then
    echo $USAGE
    exit 1
fi
if [[ -z "$VERSION" ]]; then
    echo $USAGE
    exit 1
fi

echo "building target $TARGET"
echo

pushd services/$APP_NAME
docker build -t $TARGET .
gcloud docker -- push $TARGET
popd
