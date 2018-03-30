var pyodide = {}

{
    let wasmURL = 'pyodide.asm.wasm';
    let wasmXHR = new XMLHttpRequest();
    wasmXHR.open('GET', wasmURL, true);
    wasmXHR.responseType = 'arraybuffer';
    wasmXHR.onload = function() {
        if (wasmXHR.status === 200 || wasmXHR.status === 0) {
            pyodide.wasmBinary = wasmXHR.response;
        } else {
            var wasmURLBytes = tryParseAsDataURI(wasmURL);
            if (wasmURLBytes) {
                pyodide.wasmBinary = wasmURLBytes.buffer;
            }
        }

        var script = document.createElement('script');
        script.src = "pyodide.asm.js";
        document.body.appendChild(script);

    };
    wasmXHR.send(null);
}
