/* Add Activity Helpers */

export const downloadFile = (blobContent, fileName) => {
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = fileName || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(blobContent);
};

export const _saveXML = (xml) => {
    const _xml = new Blob([xml], {
        type: 'text/plain'
    });
    downloadFile(_xml, 'modelo.xml');
};

export const _saveSVG = (e, modeler) => {
    modeler.saveSVG({ format: true }, function (err, svg) {
        if (!err) {
            var svgBlob = new Blob([svg], {
                type: 'image/svg+xml'
            });
            downloadFile(svgBlob, 'model.svg');    
        }
    });
};

//
export const importXML = (setDiagram, modeler, xml) => {

    setDiagram(xml);

    modeler.importXML(xml).then(({ warnings }) => {

        if (warnings.length) console.log("Warnings", warnings);

        const canvas = modeler.get("canvas");
        canvas.zoom("fit-viewport", 'auto');

    }).catch((err) => {
        console.log("error", err);
    });
}