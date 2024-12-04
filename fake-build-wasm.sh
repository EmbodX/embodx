mkdir -p ./www/public/out

touch ./www/public/out/embodx_bg.wasm
echo "export default function noop() {}" > ./www/public/out/embodx.js
