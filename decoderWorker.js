var Module = {
    onRuntimeInitialized: function() {
        postMessage({ type: 'ready' });
    },
    print: function(text) {
        lastPrintedLine = text;
        if (text.includes('Processed')) {
            postMessage({ type: 'progress', message: text });
        }
        console.log(text);
    },
    printErr: function(text) {
        console.error(text);
    }
};

let lastPrintedLine = '';

importScripts('mpeghDecoder.js');

onmessage = function(e) {
    if (e.data.type === 'start') {
        var { inputFileName, outputFileName, data, args } = e.data;

        try {
            FS.writeFile(inputFileName, new Uint8Array(data));

            Module.callMain(args);

            var outputData = FS.readFile(outputFileName);

            postMessage({ type: 'complete', data: outputData }, [outputData.buffer]);
        } catch (error) {
            const errorMessage = error.message || lastPrintedLine;
            postMessage({ type: 'error', message: errorMessage });
        }
    }
};