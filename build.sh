OUTPUT_DIR=$(pwd)
pushd ../alchemy
GOOS=linux GOARCH=amd64 go build -ldflags="-X 'github.com/projectchip/alchemy/config.Tag=$(git describe --tags)'" -o ${OUTPUT_DIR}/alchemy-action-linux-x64 -tags github 
popd
