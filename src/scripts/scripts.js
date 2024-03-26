var ID = 1;
$(document).ready(function() {
    let isAdd = false;
    let isHide = false;
    let isLink = false;

    $('#button-add').on('click', function() {
        if(!isAdd){
            if(isLink){
                $('#arrow-link-main').css({
                    'transform': 'scaleX(1)'
                })
                $('#linkMenu').fadeOut(100);
                isLink = false;
            }
            $('#arrow-add-main').css({
                'transform': 'scaleX(-1)'
            })
            $('#addMenu').fadeIn(100);
            isAdd = true;
        }
        else{
            $('#arrow-add-main').css({
                'transform': 'scaleX(1)'
            })
            $('#addMenu').fadeOut(100);
            isAdd = false;
        }
    });
    $('#button-link').on('click', function(){
        if(!isLink){
            if(isAdd){
                $('#arrow-add-main').css({
                    'transform': 'scaleX(1)'
                })
                $('#addMenu').fadeOut(100);
                isAdd = false;
            }
            $('#arrow-link-main').css({
                'transform': 'scaleX(-1)'
            })
            $('#linkMenu').fadeIn(100);
            isLink = true;
        }
        else{
            $('#arrow-link-main').css({
                'transform': 'scaleX(1)'
            })
            $('#linkMenu').fadeOut(100);
            isLink = false;
        }
    });
    $('#button-delete-all').on('click', function(){
        linesMap = {};
        $('#desk-apex .apex-add').remove();
        $('body').find('svg').remove();
        ID = 1;
    });

    $('#default-node').on('click', function(){
        var div = $('<div>')
                .addClass('apex-add')
                .attr('draggable', 'true')
                .attr('id', ID)
                .css({
                    'position': 'absolute',
                    'z-index': '900'
                })
                .on('mousedown', function(event) {
                    selectElement(event, this);
                })
                .appendTo('#desk-apex');
    
        var textSpan = $('<span>').attr('id', 'text-apex');
        div.append(textSpan);
        var textAdd = $('#input').val();
        textSpan.text(textAdd);
        $('#input').val('');
        ID++;
    
        div.draggable({
            containment: "parent"
        });
    });
    $('#square-node').on('click', function(){
        var div = $('<div>')
                .addClass('apex-add')
                .attr('draggable', 'true')
                .attr('id', ID)
                .css({
                    'position': 'absolute',
                    'z-index': '900',
                    'width': '125px',
                    'height': '125px',
                    'border-radius': '0'
                })
                .on('mousedown', function(event) {
                    selectElement(event, this);
                })
                .appendTo('#desk-apex');
    
        var textSpan = $('<span>').attr('id', 'text-apex');
        div.append(textSpan);
        var textAdd = $('#input').val();
        textSpan.text(textAdd);
        $('#input').val('');
        ID++;
    
        div.draggable({
            containment: "parent"
        });
    });
    $('#circ-node').on('click', function(){
        var div = $('<div>')
                .addClass('apex-add')
                .attr('draggable', 'true')
                .attr('id', ID)
                .css({
                    'position': 'absolute',
                    'z-index': '900',
                    'width': '100px',
                    'height': '100px',
                    'border-radius': '50%'
                })
                .on('mousedown', function(event) {
                    selectElement(event, this);
                })
                .appendTo('#desk-apex');
        
            var textSpan = $('<span>').attr('id', 'text-apex');
            div.append(textSpan);
            var textAdd = $('#input').val();
            textSpan.text(textAdd);
            $('#input').val('');
            ID++;
                
            div.draggable({
                containment: "parent"
            });
    });
    

    $('#input').on('keypress', function(event) {
        if (event.which === 13) {
            event.preventDefault();
            var div = $('<div>')
            .addClass('apex-add')
            .attr('draggable', 'true')
            .attr('id', ID)
            .css({
                'position': 'absolute',
                'z-index': '900'
            })
            .on('mousedown', function(event) {
                selectElement(event, this);
            })
            .appendTo('#desk-apex');
    
            var textSpan = $('<span>').attr('id', 'text-apex');
            div.append(textSpan);
            var textAdd = $('#input').val();
            textSpan.text(textAdd);
            $('#input').val('');
            ID++;
    
            div.draggable({
                containment: "parent"
            });
        }
    });
    $('#button-hide').on('click', function(){
        if(isHide){
            $(".button").show();
            $("#input").show();
            $(".button").prop("disabled", false);
            $("#input").prop("disabled", false);
            $("#eye").removeClass("fa-eye-slash").addClass("fa-eye");
            isHide = false;
        }
        else{
            $(".button").hide();
            $("#input").hide();
            $(".button").prop("disabled", true);
            $("#input").prop("disabled", true);
            $("#eye").removeClass("fa-eye").addClass("fa-eye-slash");
            isHide = true;
        }
    });
});