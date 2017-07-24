#!/usr/bin/env bash
echo "Usage: ./getSampleAssembly.sh [VERSION]. If no version is given, sample app will be built from source"
VERSION=$1

if [[ -z "${VERSION}" ]]; then
    echo "Building current sample app"
    cd ../../
    ./sbtwrapper "set test in Test := {}" example/clean example/assembly
    cd -
    FILE=`find ../../engine -name 'nussknacker-example-assembly-*'`
    echo "Using file $FILE"
    cp ${FILE} /tmp/code-assembly.jar
else
    echo "Downloading example model in version $VERSION"
    #FIXME: replace nexus with maven central
    if [[ "$VERSION" == *-SNAPSHOT ]]; then
       REPO=snapshots
    else
       REPO=releases
    fi
    wget -O /tmp/code-assembly.jar https://philanthropist.touk.pl/nexus/content/repositories/${REPO}/pl/touk/nussknacker/nussknacker-example_2.11/${VERSION}/nussknacker-example_2.11-${VERSION}-assembly.jar
fi
