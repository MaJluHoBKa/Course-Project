$(document).ready(function() {
    let isColour = false;
    let isChild = false;
    let isEdit = false;
    let isStyle = false;
    let divId;
    var subPosX, subPosY;

    $(document).on("contextmenu", ".apex-add", function(event) {
      event.preventDefault();
      var contextMenu = $(".contextMenu");
      var subMenu = $(".subMenu");
      var subMenuEdit = $(".subMenu-edit");
      var subMenuFigure = $(".subMenu-figure");
      var subMenuStyle = $(".subMenuStyle");
      var posX = event.pageX;
      var posY = event.pageY;
      subPosX = posX;
      subPosY = posY;
  
      var screenWidth = $(window).width();
      var screenHeight = $(window).height();
      var menuWidth = contextMenu.outerWidth();
      var menuHeight = contextMenu.outerHeight();
  
      if (posX + menuWidth > screenWidth) {
          posX = screenWidth - menuWidth - 10;
      }
  
      if (posY + menuHeight > screenHeight) {
          posY = screenHeight - menuHeight - 10;
      }
      
      divId = $(this).attr('id');
      console.log("Context menu for element: ", divId);
      contextMenu.css({
          display: "block",
          left: posX,
          top: posY
      });
      subMenu.hide();
      subMenuEdit.hide();
      subMenuFigure.hide();
      subMenuStyle.hide();
      isColour = false;
      isChild = false;
      isEdit = false;
      isStyle = false;
      $('#colourIcon').css({
        'transform': 'scaleX(1)'
      });
      $('#figureIcon').css({
        'transform': 'scaleX(1)'
      });
      $('#styleIcon').css({
        'transform': 'scaleX(1)'
      });
    });
    $(document).on("click", function(event) {
        if (!$(event.target).closest(".contextMenu, .apex-add").length) {
          $('.arrow-icon').css({
            'transform': 'scaleX(1)'
          })
          if(!isEdit){
              $(".contextMenu").hide();
              isColour = false;
          }
        }
    });
    
    $('#colour').on('click', function(event) {
      event.stopPropagation();
  
      var screenWidth = $(window).width();
      var screenHeight = $(window).height();
      var menuWidth = $(".contextMenu").outerWidth();
      var menuHeight = $(".contextMenu").outerHeight();
  
      if (subPosX + menuWidth + $(".subMenu").outerWidth() > screenWidth - 10) {
        $(".subMenu").css({
          left: -105
        });
      }
      else{
        $(".subMenu").css({
          left: 105
        });
      }
  
      if (subPosY + $(".subMenu").outerHeight() > screenHeight - 10) {
        $(".subMenu").css({
          top: -125
        });
      }
      else{
        $(".subMenu").css({
          top: 0
        });
      }

      if(isChild){
        $('#figureIcon').css({
          'transform': 'scaleX(1)'
        });
        $('#add-node').next('.subMenu-figure').fadeOut(300);
        isChild = false;
      }
      if(isStyle){
        $('#styleIcon').css({
          'transform': 'scaleX(1)'
        });
        $('#style-field').next('.subMenuStyle').fadeOut(300);
        isStyle = false;
      }

      if(!isColour){
        $('#colourIcon').css({
          'transform': 'scaleX(-1)'
        })
        $(this).next('.subMenu').fadeIn(300);
        isColour = true;
      }
      else{
        $('#colourIcon').css({
          'transform': 'scaleX(1)'
        })
        $(this).next('.subMenu').fadeOut(300);
        isColour = false;
      }
    });
    $("#redButton").on('click', function(){
        event.stopPropagation();
        $("#" + divId).css({
          "border": "3px solid red"
        })
        $("#" + divId).hover(
          function() {
              $(this).css("box-shadow", "0px 0px 10px red");
          },
          function() {
            $(this).css("box-shadow", "none");
          }
        );
    });
    $("#pinkButton").on('click', function(){
      event.stopPropagation();
      $("#" + divId).css({
        "border": "3px solid #ff00c8"
      })
      $("#" + divId).hover(
        function() {
            $(this).css("box-shadow", "0px 0px 10px #ff00c8");
        },
        function() {
          $(this).css("box-shadow", "none");
        }
      );
    });
    $("#purpleButton").on('click', function(){
      event.stopPropagation();
      $("#" + divId).css({
        "border": "3px solid #ae00ff"
      })
      $("#" + divId).hover(
        function() {
            $(this).css("box-shadow", "0px 0px 10px #ae00ff");
        },
        function() {
          $(this).css("box-shadow", "none");
        }
      );
    });
    $("#blueButton").on('click', function(){
      event.stopPropagation();
      $("#" + divId).css({
        "border": "3px solid #1500ff"
      })
      $("#" + divId).hover(
        function() {
            $(this).css("box-shadow", "0px 0px 10px #1500ff");
        },
        function() {
          $(this).css("box-shadow", "none");
        }
      );
    });
    $("#turquoiseButton").on('click', function(){
      event.stopPropagation();
      $("#" + divId).css({
        "border": "3px solid #00ffe1"
      })
      $("#" + divId).hover(
        function() {
            $(this).css("box-shadow", "0px 0px 10px #00ffe1");
        },
        function() {
          $(this).css("box-shadow", "none");
        }
      );
    });
    $("#greenButton").on('click', function(){
      event.stopPropagation();
      $("#" + divId).css({
        "border": "3px solid #00ff09"
      })
      $("#" + divId).hover(
        function() {
            $(this).css("box-shadow", "0px 0px 10px #00ff09");
        },
        function() {
          $(this).css("box-shadow", "none");
        }
      );
    });
    $("#yellowButton").on('click', function(){
      event.stopPropagation();
      $("#" + divId).css({
        "border": "3px solid #fbff00"
      })
      $("#" + divId).hover(
        function() {
            $(this).css("box-shadow", "0px 0px 10px #fbff00");
        },
        function() {
          $(this).css("box-shadow", "none");
        }
      );
    });
    $("#orangeButton").on('click', function(){
      event.stopPropagation();
      $("#" + divId).css({
        "border": "3px solid #ff7b00"
      })
      $("#" + divId).hover(
        function() {
            $(this).css("box-shadow", "0px 0px 10px #ff7b00");
        },
        function() {
          $(this).css("box-shadow", "none");
        }
      );
    });

    $('#edit').on('click', function() {
      event.stopPropagation();
      if(!isEdit){
        $(this).next('.subMenu-edit').fadeIn(100).next('.edit-button').fadeIn(100);
        var Apex = $("#" + divId);
        var textApex = Apex.find('span').first().text();
        $('#input-edit').val(textApex);
        isEdit = true;
      }
      else{
        $(this).next('.subMenu-edit').fadeOut(100).next('.edit-button').fadeOut(100);
        isEdit = false;
      }
    });
    $('#OK-edit').on('click', function() {
      event.stopPropagation();
      var Apex = $("#" + divId);
      var textApex = $('#input-edit').val();
      Apex.find('span').first().text(textApex);
      $('.contextMenu').fadeOut(100);
      isEdit = false;
      isColour = false;
    });
    $('#CANCEL-edit').on('click', function() {
      event.stopPropagation();
      $('.contextMenu').fadeOut(100);
      isEdit = false;
      isColour = false;
    });
    $('#input-edit').on('click', function(event) {
      event.stopPropagation();
    });

    $('#add-node').on('click', function(event) {
      event.stopPropagation();
      var screenWidth = $(window).width();
      var screenHeight = $(window).height();
      var menuWidth = $(".contextMenu").outerWidth();
      var menuHeight = $(".contextMenu").outerHeight();
  
      if (subPosX + menuWidth + $(".subMenu-figure").outerWidth() > screenWidth - 10) {
        $(".subMenu-figure").css({
          left: -105
        });
      }
      else{
        $(".subMenu-figure").css({
          left: 105
        });
      }
  
      if (subPosY + menuHeight > screenHeight) {
        $(".subMenu-figure").css({
          top: 0
        });
      }
      else{
        $(".subMenu-figure").css({
          top: 60
        });
      }

      if(isColour){
        $('#colourIcon').css({
          'transform': 'scaleX(1)'
        });
        $('#colour').next('.subMenu').fadeOut(300);
        isColour = false;
      }
      if(isStyle){
        $('#styleIcon').css({
          'transform': 'scaleX(1)'
        });
        $('#style-field').next('.subMenuStyle').fadeOut(300);
        isStyle = false;
      }

      if(!isChild){
        $('#figureIcon').css({
          'transform': 'scaleX(-1)'
        })
        $(this).next('.subMenu-figure').fadeIn(300);
        isChild = true;
      }
      else{
        $('#figureIcon').css({
          'transform': 'scaleX(1)'
        });
        $(this).next('.subMenu-figure').fadeOut(300);
        isChild = false;
      }
    });
    $('#default-figure').on('click', function(event) {
      event.stopPropagation();
      var apex = $("#" + divId);
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
    
        div.draggable({
            containment: "parent"
        });

        apex = document.getElementById(divId);
        var child = document.getElementById(ID);
        var line = new LeaderLine(
          apex,
          child,
          {
              color: "#b4b4b4"
          }
        );
        line.size = 3;
        linesMap[apex.id] = linesMap[apex.id] || [];
        linesMap[child.id] = linesMap[child.id] || [];

        linesMap[apex.id].push({
            id: apex.id,
            line: line,
            linkApex: child.id,
            start: true,
            typeLink: "arrow"
        });
        linesMap[child.id].push({
            id: child.id,
            line: line,
            linkApex: apex.id,
            start: false,
            typeLink: "arrow"
        });
        ID++;
    });
    $('#square').on('click', function(event) {
      event.stopPropagation();
      var apex = $("#" + divId);
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
    
      div.draggable({
          containment: "parent"
      });
    
      apex = document.getElementById(divId);
      var child = document.getElementById(ID);
      var line = new LeaderLine(
        apex,
        child,
        {
            color: "#b4b4b4"
        }
      );
      line.size = 3;
      linesMap[apex.id] = linesMap[apex.id] || [];
      linesMap[child.id] = linesMap[child.id] || [];
    
      linesMap[apex.id].push({
          id: apex.id,
          line: line,
          linkApex: child.id,
          start: true,
          typeLink: "arrow"
      });
      linesMap[child.id].push({
          id: child.id,
          line: line,
          linkApex: apex.id,
          start: false,
          typeLink: "arrow"
      });
      ID++;      
    });
    $('#circ').on('click', function(event) {
      event.stopPropagation();
      var apex = $("#" + divId);
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
    
      div.draggable({
          containment: "parent"
      });
    
      apex = document.getElementById(divId);
      var child = document.getElementById(ID);
      var line = new LeaderLine(
        apex,
        child,
        {
            color: "#b4b4b4"
        }
      );
      line.size = 3;
      linesMap[apex.id] = linesMap[apex.id] || [];
      linesMap[child.id] = linesMap[child.id] || [];
    
      linesMap[apex.id].push({
          id: apex.id,
          line: line,
          linkApex: child.id,
          start: true,
          typeLink: "arrow"
      });
      linesMap[child.id].push({
          id: child.id,
          line: line,
          linkApex: apex.id,
          start: false,
          typeLink: "arrow"
      });
      ID++;      
    });

    $('#add-field').on('click', function(event){
      div = $("#" + divId);
      div.css({
        'padding-top': '40px',
        'width': '150px',
        'height': '200px',
        'text-align': 'center', 
        'display': 'flex',           
        'align-items': 'flex-start',
      })
      $('<textarea>')
        .attr('id', 'input-field')
        .attr('type', 'text')
        .appendTo('#' + divId);

      div.find('span').css({
        'z-index': '2000',
        'position': 'absolute',
        'top': '10px',
        'align-self': 'center',
        'margin-bottom': '10px'
      });
    });

    $('#style-field').on('click', function(event){
      event.stopPropagation();
      var screenWidth = $(window).width();
      var screenHeight = $(window).height();
      var menuWidth = $(".contextMenu").outerWidth();
      var menuHeight = $(".contextMenu").outerHeight();
  
      if (subPosX + menuWidth + $(".subMenuStyle").outerWidth() > screenWidth - 10) {
        $(".subMenuStyle").css({
          left: -105
        });
      }
      else{
        $(".subMenuStyle").css({
          left: 105
        });
      }
  
      if (subPosY + menuHeight > screenHeight) {
        $(".subMenuStyle").css({
          top: 90
        });
      }
      else{
        $(".subMenuStyle").css({
          top: 120
        });
      }

      if(isColour){
        $('#colourIcon').css({
          'transform': 'scaleX(1)'
        });
        $('#colour').next('.subMenu').fadeOut(300);
        isColour = false;
      }
      if(isChild){
        $('#figureIcon').css({
          'transform': 'scaleX(1)'
        });
        $('#add-node').next('.subMenu-figure').fadeOut(300);
        isChild = false;
      }

      if(!isStyle){
        $('#styleIcon').css({
          'transform': 'scaleX(-1)'
        })
        $(this).next('.subMenuStyle').fadeIn(300);
        isStyle = true;
      }
      else{
        $('#styleIcon').css({
          'transform': 'scaleX(1)'
        });
        $(this).next('.subMenuStyle').fadeOut(300);
        isStyle = false;
      }
    });
    $('#array-type').on('click', function(){
      $('#' + divId).css({
        'flex-direction': 'row'
      });
    });
    $('#list-type').on('click', function(){
      $('#' + divId).css({
        'flex-direction': 'column'
      });
    })

    $('#delete-apex').on('click', function() {
      var div = document.getElementById(divId);
      var apexId = div.id;
      if (linesMap[apexId]) {
        var linesToRemove = linesMap[apexId].slice();

        linesToRemove.forEach(function(lineInfo) {
            if (lineInfo && lineInfo.line) {
                lineInfo.line.remove();

                var secondApexId = lineInfo.linkApex;
                if (linesMap[secondApexId]) {
                    linesMap[secondApexId] = linesMap[secondApexId].filter(function(lineInfoSecond) {
                        return lineInfoSecond.linkApex !== apexId || !lineInfoSecond.line;
                    });
                }
            }
        });
        
        delete linesMap[apexId];
      }
      apexArray = apexArray.filter(function(apex) {
        return apex.ApexID !== apexId;
      });
      div.parentNode.removeChild(div);
      $(".contextMenu").hide();
    });
});