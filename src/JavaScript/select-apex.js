selectedApex = [];
let isSelectionEnabled = false;
let Link = false;
var linkType = 0;

$(document).ready(function() {
    $('#default-link').on('click', function(){
        $('.apex-add').css("opacity", "0.5");
        Link = true;
        isSelectionEnabled = true;
        linkType = 0;
    });
    $('#arrows-link').on('click', function(){
        $('.apex-add').css("opacity", "0.5");
        Link = true;
        isSelectionEnabled = true;
        linkType = 1;
    });
    $('#minus-link').on('click', function(){
        $('.apex-add').css("opacity", "0.5");
        Link = true;
        isSelectionEnabled = true;
        linkType = 2;
    });
    $('#ellipsis-link').on('click', function(){
        $('.apex-add').css("opacity", "0.5");
        Link = true;
        isSelectionEnabled = true;
        linkType = 3;
    });

    $('#button-swap').on('click', function() {
        Link = false;
        isSelectionEnabled = true;
        $('.apex-add').css("opacity", "0.5");
    });
});

function selectElement(event, element) {
    if (event.button === 0 && isSelectionEnabled) {
        if(selectedApex.length === 1 && element !== selectedApex[0]) {
            selectedApex.push(element);
        }
        else if(selectedApex.length === 0) {
            selectedApex.push(element);
        }

        if (selectedApex.length === 2) {
            if(Link){
                handleSelection();
            }
            else{
                swapApex();
            }
        }
    }
}

function handleSelection() {
    var firstApex = document.getElementById(selectedApex[0].id);
    var secondApex = document.getElementById(selectedApex[1].id);

    let check = true;
    if(linesMap[firstApex.id] && linesMap[secondApex.id]){
        var checkMap = linesMap[firstApex.id].slice();
        checkMap.forEach(function(lineInfo) {
            if(lineInfo.linkApex == secondApex.id && lineInfo.start == true){
                check = false;
            }
        });
    }

    if(check){
        var line;
        switch(linkType){
            case 0:
                line = new LeaderLine(
                    firstApex,
                    secondApex,
                    {
                        color: "#b4b4b4"
                    }
                );
                line.size = 3;
    
                linesMap[selectedApex[0].id] = linesMap[selectedApex[0].id] || [];
                linesMap[selectedApex[1].id] = linesMap[selectedApex[1].id] || [];
    
                linesMap[selectedApex[0].id].push({
                    id: firstApex.id,
                    line: line,
                    linkApex: secondApex.id,
                    start: true,
                    typeLink: "arrow"
                });
                linesMap[selectedApex[1].id].push({
                    id: secondApex.id,
                    line: line,
                    linkApex: firstApex.id,
                    start: false,
                    typeLink: "arrow"
                });
                break;
            case 1:
                line = new LeaderLine(
                    firstApex,
                    secondApex,
                    {
                        color: "#b4b4b4",
                        startPlug: 'arrow1', 
                        endPlug: 'arrow1'
                    }
                );
                line.size = 3;
    
                linesMap[selectedApex[0].id] = linesMap[selectedApex[0].id] || [];
                linesMap[selectedApex[1].id] = linesMap[selectedApex[1].id] || [];
    
                linesMap[selectedApex[0].id].push({
                    id: firstApex.id,
                    line: line,
                    linkApex: secondApex.id,
                    start: true,
                    typeLink: "double-arrow"
                });
                linesMap[selectedApex[1].id].push({
                    id: secondApex.id,
                    line: line,
                    linkApex: firstApex.id,
                    start: false,
                    typeLink: "double-arrow"
                });
                break;
            case 2:
                line = new LeaderLine(
                    firstApex,
                    secondApex,
                    {
                        color: "#b4b4b4",
                        startPlug: 'square', 
                        endPlug: 'square'
                    }
                );
                line.size = 3;
    
                linesMap[selectedApex[0].id] = linesMap[selectedApex[0].id] || [];
                linesMap[selectedApex[1].id] = linesMap[selectedApex[1].id] || [];
    
                linesMap[selectedApex[0].id].push({
                    id: firstApex.id,
                    line: line,
                    linkApex: secondApex.id,
                    start: true,
                    typeLink: "line"
                });
                linesMap[selectedApex[1].id].push({
                    id: secondApex.id,
                    line: line,
                    linkApex: firstApex.id,
                    start: false,
                    typeLink: "line"
                });
                break;
            case 3:
                line = new LeaderLine(
                    firstApex,
                    secondApex,
                    {
                        color: "#b4b4b4",
                        startPlug: 'square', 
                        endPlug: 'square',
                        dash: true
                    }
                );
                line.size = 3;
    
                linesMap[selectedApex[0].id] = linesMap[selectedApex[0].id] || [];
                linesMap[selectedApex[1].id] = linesMap[selectedApex[1].id] || [];
    
                linesMap[selectedApex[0].id].push({
                    id: firstApex.id,
                    line: line,
                    linkApex: secondApex.id,
                    start: true,
                    typeLink: "dash"
                });
                linesMap[selectedApex[1].id].push({
                    id: secondApex.id,
                    line: line,
                    linkApex: firstApex.id,
                    start: false,
                    typeLink: "dash"
                });
                break;
        }
    }

    $('.apex-add').css("opacity", "1");
    isSelectionEnabled = false;
    selectedApex.length = 0;
}

function swapApex(){
    var firstApex = document.getElementById(selectedApex[0].id);
    var secondApex = document.getElementById(selectedApex[1].id);

    if(linesMap[firstApex.id] && linesMap[secondApex.id]){
        var firstA = $("#" + firstApex.id);
        var secondA = $("#" + secondApex.id);

        var firstPos = firstA.offset();
        var secondPos = secondA.offset();

        firstA.css({
            'top': secondPos.top + 'px',
            'left': secondPos.left + 'px'
        });
        secondA.css({
            'top': firstPos.top + 'px',
            'left': firstPos.left + 'px'
        });

        var firstMap = linesMap[firstApex.id].slice();
        var secondMap = linesMap[secondApex.id].slice();

        if (linesMap[firstApex.id]) {
            var linesToRemove = linesMap[firstApex.id].slice();
            linesToRemove.forEach(function(lineInfo) {
                if (lineInfo && lineInfo.line) {
                    lineInfo.line.remove();
                    var secondApexId = lineInfo.linkApex;
                    if (linesMap[secondApexId]) {
                        linesMap[secondApexId] = linesMap[secondApexId].filter(function(lineInfoSecond) {
                            return lineInfoSecond.linkApex !== firstApex.id || !lineInfoSecond.line;
                        });
                    }
                }
            });
            delete linesMap[firstApex.id];
        } 
        if (linesMap[secondApex.id]) {
            var linesToRemove = linesMap[secondApex.id].slice();
            linesToRemove.forEach(function(lineInfo) {
                if (lineInfo && lineInfo.line) {
                    lineInfo.line.remove();
                    var secondApexId = lineInfo.linkApex;
                    if (linesMap[secondApexId]) {
                        linesMap[secondApexId] = linesMap[secondApexId].filter(function(lineInfoSecond) {
                            return lineInfoSecond.linkApex !== secondApex.id || !lineInfoSecond.line;
                        });
                    }
                }
            });
            delete linesMap[secondApex.id];
        }

        linesMap[selectedApex[0].id] = linesMap[selectedApex[0].id] || [];
        linesMap[selectedApex[1].id] = linesMap[selectedApex[1].id] || [];

        secondMap.forEach(function(lineInfo) {
            var linkForApex = document.getElementById(lineInfo.linkApex);
            var apex = document.getElementById(firstApex.id);
            if(apex.id == linkForApex.id){
                linkForApex = secondApex;
                equal = true;
            }
            if(lineInfo.start == true){
                console.log("1: " + apex.id + " " + linkForApex.id);
                switch(lineInfo.typeLink){
                    case "arrow": {
                        var line = new LeaderLine(
                            apex,
                            linkForApex,
                            {
                                color: "#b4b4b4"
                            }
                        );
                        line.size = 3;
            
                        linesMap[linkForApex.id].push({
                            line: line,
                            linkApex: apex.id,
                            start: false,
                            typeLink: 'arrow'
                        });
                        linesMap[apex.id].push({
                            line: line,
                            linkApex: linkForApex.id,
                            start: true,
                            typeLink: 'arrow'
                        });
                        line.position();
                        break;   
                    }
                    case "double-arrow": {
                        var line = new LeaderLine(
                            apex,
                            linkForApex,
                            {
                                color: "#b4b4b4",
                                startPlug: 'arrow1', 
                                endPlug: 'arrow1'
                            }
                        );
                        line.size = 3;
            
                        linesMap[linkForApex.id].push({
                            line: line,
                            linkApex: apex.id,
                            start: false,
                            typeLink: 'double-arrow'
                        });
                        linesMap[apex.id].push({
                            line: line,
                            linkApex: linkForApex.id,
                            start: true,
                            typeLink: 'double-arrow'
                        });
                        line.position();
                        break;
                    }
                    case "line": {
                        var line = new LeaderLine(
                            apex,
                            linkForApex,
                            {
                                color: "#b4b4b4",
                                startPlug: 'square', 
                                endPlug: 'square'
                            }
                        );
                        line.size = 3;
            
                        linesMap[linkForApex.id].push({
                            line: line,
                            linkApex: apex.id,
                            start: false,
                            typeLink: 'line'
                        });
                        linesMap[apex.id].push({
                            line: line,
                            linkApex: linkForApex.id,
                            start: true,
                            typeLink: 'line'
                        });
                        line.position();
                        break;
                    }
                    case "dash": {
                        var line = new LeaderLine(
                            apex,
                            linkForApex,
                            {
                                color: "#b4b4b4",
                                startPlug: 'square', 
                                endPlug: 'square',
                                dash: true
                            }
                        );
                        line.size = 3;
            
                        linesMap[linkForApex.id].push({
                            line: line,
                            linkApex: apex.id,
                            start: false,
                            typeLink: 'dash'
                        });
                        linesMap[apex.id].push({
                            line: line,
                            linkApex: linkForApex.id,
                            start: true,
                            typeLink: 'dash'
                        });
                        line.position();
                        break;
                    }
                }
            }
            else {
                console.log("2: " + apex.id + " " + linkForApex.id);
                switch(lineInfo.typeLink){
                    case "arrow": {
                        var line = new LeaderLine(
                            linkForApex,
                            apex,
                            {
                                color: "#b4b4b4"
                            }
                        );
                        line.size = 3;
            
                        linesMap[linkForApex.id].push({
                            line: line,
                            linkApex: apex.id,
                            start: true,
                            typeLink: 'arrow'
                        });
                        linesMap[apex.id].push({
                            line: line,
                            linkApex: linkForApex.id,
                            start: false,
                            typeLink: 'arrow'
                        });
                        line.position();
                        break;   
                    }
                    case "double-arrow": {
                        var line = new LeaderLine(
                            linkForApex,
                            apex,
                            {
                                color: "#b4b4b4",
                                startPlug: 'arrow1',
                                endPlug: 'arrow1'
                            }
                        );
                        line.size = 3;
            
                        linesMap[linkForApex.id].push({
                            line: line,
                            linkApex: apex.id,
                            start: true,
                            typeLink: 'double-arrow'
                        });
                        linesMap[apex.id].push({
                            line: line,
                            linkApex: linkForApex.id,
                            start: false,
                            typeLink: 'double-arrow'
                        });
                        line.position();
                        break;
                    }
                    case "line": {
                        var line = new LeaderLine(
                            linkForApex,
                            apex,
                            {
                                color: "#b4b4b4",
                                startPlug: 'square',
                                endPlug: 'square'
                            }
                        );
                        line.size = 3;
            
                        linesMap[linkForApex.id].push({
                            line: line,
                            linkApex: apex.id,
                            start: true,
                            typeLink: 'line'
                        });
                        linesMap[apex.id].push({
                            line: line,
                            linkApex: linkForApex.id,
                            start: false,
                            typeLink: 'line'
                        });
                        line.position();
                        break;
                    }
                    case "dash": {
                        var line = new LeaderLine(
                            linkForApex,
                            apex,
                            {
                                color: "#b4b4b4",
                                startPlug: 'square',
                                endPlug: 'square',
                                dash: true
                            }
                        );
                        line.size = 3;
            
                        linesMap[linkForApex.id].push({
                            line: line,
                            linkApex: apex.id,
                            start: true,
                            typeLink: 'dash'
                        });
                        linesMap[apex.id].push({
                            line: line,
                            linkApex: linkForApex.id,
                            start: false,
                            typeLink: 'dash'
                        });
                        line.position();
                        break;
                    }
                }
            }
        });
        firstMap.forEach(function(lineInfo) {
            var linkForApex = document.getElementById(lineInfo.linkApex);
            var apex = document.getElementById(secondApex.id);
            if(apex.id != linkForApex.id){
                if(lineInfo.start == true){
                    console.log("3: " + apex.id + " " + linkForApex.id);
                    switch(lineInfo.typeLink){
                        case "arrow": {
                            var line = new LeaderLine(
                                apex,
                                linkForApex,
                                {
                                    color: "#b4b4b4",
                                }
                            );
                            line.size = 3;
                
                            linesMap[linkForApex.id].push({
                                line: line,
                                linkApex: apex.id,
                                start: false,
                                typeLink: 'arrow'
                            });
                            linesMap[apex.id].push({
                                line: line,
                                linkApex: linkForApex.id,
                                start: true,
                                typeLink: 'arrow'
                            });
                            line.position();
                            break;   
                        }
                        case "double-arrow": {
                            var line = new LeaderLine(
                                apex,
                                linkForApex,
                                {
                                    color: "#b4b4b4",
                                    startPlug: 'arrow1',
                                    endPlug: 'arrow1'
                                }
                            );
                            line.size = 3;
                
                            linesMap[linkForApex.id].push({
                                line: line,
                                linkApex: apex.id,
                                start: false,
                                typeLink: 'double-arrow'
                            });
                            linesMap[apex.id].push({
                                line: line,
                                linkApex: linkForApex.id,
                                start: true,
                                typeLink: 'double-arrow'
                            });
                            line.position();
                            break;
                        }
                        case "line": {
                            var line = new LeaderLine(
                                apex,
                                linkForApex,
                                {
                                    color: "#b4b4b4",
                                    startPlug: 'square',
                                    endPlug: 'square'
                                }
                            );
                            line.size = 3;
                
                            linesMap[linkForApex.id].push({
                                line: line,
                                linkApex: apex.id,
                                start: false,
                                typeLink: 'line'
                            });
                            linesMap[apex.id].push({
                                line: line,
                                linkApex: linkForApex.id,
                                start: true,
                                typeLink: 'line'
                            });
                            line.position();
                            break;
                        }
                        case "dash": {
                            var line = new LeaderLine(
                                apex,
                                linkForApex,
                                {
                                    color: "#b4b4b4",
                                    startPlug: 'square',
                                    endPlug: 'square',
                                    dash: true
                                }
                            );
                            line.size = 3;
                
                            linesMap[linkForApex.id].push({
                                line: line,
                                linkApex: apex.id,
                                start: false,
                                typeLink: 'dash'
                            });
                            linesMap[apex.id].push({
                                line: line,
                                linkApex: linkForApex.id,
                                start: true,
                                typeLink: 'dash'
                            });
                            line.position();
                            break;
                        }
                    }
                }
                else {
                    console.log("4: " + apex.id + " " + linkForApex.id);
                    switch(lineInfo.typeLink){
                        case "arrow": {
                            var line = new LeaderLine(
                                linkForApex,
                                apex,
                                {
                                    color: "#b4b4b4"
                                }
                            );
                            line.size = 3;
                
                            linesMap[linkForApex.id].push({
                                line: line,
                                linkApex: apex.id,
                                start: true,
                                typeLink: 'arrow'
                            });
                            linesMap[apex.id].push({
                                line: line,
                                linkApex: linkForApex.id,
                                start: false,
                                typeLink: 'arrow'
                            });
                            line.position();
                            break;   
                        }
                        case "double-arrow": {
                            var line = new LeaderLine(
                                linkForApex,
                                apex,
                                {
                                    color: "#b4b4b4",
                                    startPlug: 'arrow1',
                                    endPlug: 'arrow1'
                                }
                            );
                            line.size = 3;
                
                            linesMap[linkForApex.id].push({
                                line: line,
                                linkApex: apex.id,
                                start: true,
                                typeLink: 'double-arrow'
                            });
                            linesMap[apex.id].push({
                                line: line,
                                linkApex: linkForApex.id,
                                start: false,
                                typeLink: 'double-arrow'
                            });
                            line.position();
                            break;
                        }
                        case "line": {
                            var line = new LeaderLine(
                                linkForApex,
                                apex,
                                {
                                    color: "#b4b4b4",
                                    startPlug: 'square',
                                    endPlug: 'square'
                                }
                            );
                            line.size = 3;
                
                            linesMap[linkForApex.id].push({
                                line: line,
                                linkApex: apex.id,
                                start: true,
                                typeLink: 'line'
                            });
                            linesMap[apex.id].push({
                                line: line,
                                linkApex: linkForApex.id,
                                start: false,
                                typeLink: 'line'
                            });
                            line.position();
                            break;
                        }
                        case "dash": {
                            var line = new LeaderLine(
                                linkForApex,
                                apex,
                                {
                                    color: "#b4b4b4",
                                    startPlug: 'square',
                                    endPlug: 'square',
                                    dash: true
                                }
                            );
                            line.size = 3;
                
                            linesMap[linkForApex.id].push({
                                line: line,
                                linkApex: apex.id,
                                start: true,
                                typeLink: 'dash'
                            });
                            linesMap[apex.id].push({
                                line: line,
                                linkApex: linkForApex.id,
                                start: false,
                                typeLink: 'dash'
                            });
                            line.position();
                            break;
                        }
                    }
                }
            }
        });
    }

    // var firstChild = firstApex.children();
    // var secondChild = secondApex.children();

    // var firstColor = firstApex.css('border-color');
    // var secondColor = secondApex.css('border-color');
    // var firsrBorder = firstApex.css('border-radius');
    // var secondBorder = secondApex.css('border-radius');

    // secondChild.appendTo(firstApex);
    // firstChild.appendTo(secondApex);

    // firstApex.css('border-color', secondColor);
    // firstApex.css('border-radius', secondBorder);
    // firstApex.hover(
    //     function(){
    //         firstApex.css('box-shadow', "0px 0px 10px " + secondColor);
    //     },
    //     function() {
    //         firstApex.css("box-shadow", "none");
    //     }
    // );
    // secondApex.css('border-color', firstColor);
    // secondApex.css('border-radius', firsrBorder);
    // secondApex.hover(
    //     function(){
    //         secondApex.css('box-shadow', "0px 0px 10px " + firstColor);
    //     },
    //     function() {
    //         secondApex.css("box-shadow", "none");
    //     }
    // );

    // var originalWidthFirstApex = firstApex.outerWidth();
    // var originalHeightFirstApex = firstApex.outerHeight();
    // var originalWidthSecondApex = secondApex.outerWidth();
    // var originalHeightSecondApex = secondApex.outerHeight();

    // firstApex.css({"width": originalWidthSecondApex + "px", "height": originalHeightSecondApex + "px"});
    // secondApex.css({"width": originalWidthFirstApex + "px", "height": originalHeightFirstApex + "px"});

    $('.apex-add').css("opacity", "1");
    isSelectionEnabled = false;
    selectedApex.length = 0;
}