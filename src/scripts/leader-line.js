var linesMap = {};

$(document).ready(function() {
    document.addEventListener("mousemove", function(event) {
        if (event.target.classList.contains('apex-add')) {
            var idOfElementBeingMoved = event.target.id;
            if (linesMap[idOfElementBeingMoved]) {
                linesMap[idOfElementBeingMoved].forEach(function(lineInfo) {
                    if (lineInfo && lineInfo.line) {
                        lineInfo.line.position();
                    }
                });
            }
        }
    });
});