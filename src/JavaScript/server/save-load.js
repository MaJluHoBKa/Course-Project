var apexArray = [{
  ApexID: String,
  posX: Number,
  posY: Number,
  Figure: String,
  Height: Number,
  Width: Number,
  Text: String,
  Color: String,
  Style: String,
  Field: [{
    Text: String
  }]
}];

var nameStructure = '';
var prevChangeLoad = null;
let loadStructureName = '';

$(document).ready(function() {
    $('.button-save').on('click', async function(){
      $(".name-structure").fadeIn(200);
    });
    $("#button-name-structure-ok").on('click', function(){
      if($("#name-structure-input").val().length > 0){
        nameStructure = $("#name-structure-input").val();
        $("#name-structure-input").val('')
        var arrayAllApex = $('div.apex-add');
        arrayAllApex.each(function(index, element) {
          var existingApex = apexArray.find(function(apex) {
            return apex.ApexID === element.id;
          });
          if (existingApex) {
            existingApex.posX = $(element).offset().left;
            existingApex.posY = $(element).offset().top;
            existingApex.Figure = $(element).css('border-radius');
            existingApex.Height = $(element).outerHeight();
            existingApex.Width = $(element).outerWidth();
            existingApex.Text = $(element).find('span').first().text();
            existingApex.Color = $(element).css('border');
            existingApex.Style = $(element).css('flex-direction');
          } else {
            var pushApex = {
                ApexID: element.id,
                posX: $(element).offset().left,
                posY: $(element).offset().top,
                Figure: $(element).css('border-radius'),
                Height: $(element).outerHeight(),
                Width: $(element).outerWidth(),
                Text: $(element).find('span').first().text(),
                Color: $(element).css('border'),
                Style: $(element).css('flex-direction'),
                Field: $(element).find('textarea').map(function() {
                  return {
                      Text: $(this).val()
                  };
              }).get()
            };
            apexArray.push(pushApex);
          }
        });
        apexArray.forEach(function(element, index) {
          console.log("Element " + index + ": ", element);
        });
  

        $.ajax({
          url: 'http://localhost:3000/some-route',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ linesMap: linesMap, apexArray: apexArray, currentUsername: currentUsername, nameStructure: nameStructure }),
          success: function(response) {
            $('#save-successful').fadeIn(200);
            var li = $('<li>')
              .addClass('loadItem')
              .appendTo('.loadList');
            var div = $('<div>')
              .addClass('div-load-window');
            var text = $('<a>').text(nameStructure);
            div.append(text);
            li.append(div);
            console.log(response.message);
          },
          error: function(xhr, status, error) {
            console.error('Failed to save data:', error);
          }
        });        
      }
    });
    $("#button-name-structure-cancel").on('click', function(){
      $(".name-structure").fadeOut(200);
    });
    $('#button-save-successful-ok').on('click', function(){
      $('#save-successful').fadeOut(200);
    });
    $('.button-load').on('click', function(){
      $('.load-structure').fadeIn(200);
    });
    $('#button-load-structure').on('click', async function(){
      let structureName = loadStructureName;
      console.log(structureName);
      try {
        const response = await fetch(`http://localhost:3000/getApexArray/${currentUsername}/${structureName}`);
        if (response.ok) {
          const {apexArray, newLinesMap} = await response.json();
          if (apexArray) {
            $('#desk-apex .apex-add').remove();
            $('body').find('svg').remove();
            linesMap = {};
            newlinesMap = newLinesMap;
            //-----Создаю все ячейки------------------------
            apexArray.slice(1).forEach((apex, index) => {
              var div = $('<div>')
                .addClass('apex-add')
                .attr('draggable', 'true')
                .attr('id', apex.ApexID)
                .css({
                    'position': 'absolute',
                    'z-index': '900',
                    'top': apex.posY,
                    'left': apex.posX,
                    'border-radius': apex.Figure,
                    'height': apex.Height,
                    'width': apex.Width,
                    'border': apex.Color,
                    'flex-direction': apex.Style
                })
                .on('mousedown', function(event) {
                    selectElement(event, this);
                })
                .appendTo('#desk-apex');

                var rgbIndex = apex.Color.indexOf('rgb');
                var rgbColor = apex.Color.substring(rgbIndex);             
          
                $("#" + apex.ApexID).hover(
                  function() {
                      $(this).css("box-shadow", "0px 0px 10px " + rgbColor);
                  },
                  function() {
                      $(this).css("box-shadow", "none");
                  }
                );

                var textSpan = $('<span>').attr('id', 'text-apex');
                div.append(textSpan);
                var textAdd = apex.Text;
                textSpan.text(textAdd);
                console.log(apex);
                div.draggable({
                  containment: "parent"
                });

                apex.Field.forEach(field => {
                  div.css({
                    'padding-top': '40px',
                    'text-align': 'center', 
                    'display': 'flex',           
                    'align-items': 'flex-start',
                  })
                  $('<textarea>')
                    .attr('id', 'input-field')
                    .attr('type', 'text')
                    .val(field.Text)
                    .appendTo("#" + apex.ApexID);

                  div.find('span').css({
                    'z-index': '2000',
                    'position': 'absolute',
                    'top': '10px',
                    'align-self': 'center',
                    'margin-bottom': '10px'
                  });
                });

                if(index === apexArray.length - 2){
                  ID = parseInt(apex.ApexID) + 1;
                }
            });
            if(newLinesMap){
              //-----Восстанавливаю связи---------------------
              for (let key in newlinesMap) {
                var node = document.getElementById(key);
                var linesToCreate = newlinesMap[key].slice();
                linesToCreate.forEach(function(lineInfo) {
                    linkNode = document.getElementById(lineInfo.linkApex);
                    console.log(node.id);
                    console.log(linkNode.id);
                    if(lineInfo.start){
                      if(lineInfo.typeLink === 'arrow'){
                        line = new LeaderLine(
                          node,
                          linkNode,
                          {
                              color: "#b4b4b4",
                          }
                        );
                        line.size = 3;
                        linesMap[node.id] = linesMap[node.id] || [];
                        linesMap[linkNode.id] = linesMap[linkNode.id] || [];
            
                        linesMap[node.id].push({
                            id: node.id,
                            line: line,
                            linkApex: linkNode.id,
                            start: true,
                            typeLink: "arrow"
                        });
                        linesMap[linkNode.id].push({
                            id: linkNode.id,
                            line: line,
                            linkApex: node.id,
                            start: false,
                            typeLink: "arrow"
                        });
                      }
                      else if(lineInfo.typeLink === 'double-arrow'){
                        line = new LeaderLine(
                          node,
                          linkNode,
                          {
                              color: "#b4b4b4",
                              startPlug: 'arrow1', 
                              endPlug: 'arrow1'
                          }
                        );
                        line.size = 3;
                        linesMap[node.id] = linesMap[node.id] || [];
                        linesMap[linkNode.id] = linesMap[linkNode.id] || [];
            
                        linesMap[node.id].push({
                            id: node.id,
                            line: line,
                            linkApex: linkNode.id,
                            start: true,
                            typeLink: "double-arrow"
                        });
                        linesMap[linkNode.id].push({
                            id: linkNode.id,
                            line: line,
                            linkApex: node.id,
                            start: false,
                            typeLink: "double-arrow"
                        });
                      }
                      else if(lineInfo.typeLink === 'line'){
                        line = new LeaderLine(
                          node,
                          linkNode,
                          {
                              color: "#b4b4b4",
                              startPlug: 'square', 
                              endPlug: 'square'
                          }
                        );
                        line.size = 3;  
                        linesMap[node.id] = linesMap[node.id] || [];
                        linesMap[linkNode.id] = linesMap[linkNode.id] || [];
            
                        linesMap[node.id].push({
                            id: node.id,
                            line: line,
                            linkApex: linkNode.id,
                            start: true,
                            typeLink: "line"
                        });
                        linesMap[linkNode.id].push({
                            id: linkNode.id,
                            line: line,
                            linkApex: node.id,
                            start: false,
                            typeLink: "line"
                        });                 
                      }
                      else if(lineInfo.typeLink === 'dash'){
                        line = new LeaderLine(
                          node,
                          linkNode,
                          {
                              color: "#b4b4b4",
                              startPlug: 'square', 
                              endPlug: 'square',
                              dash: true
                          }
                        );
                        line.size = 3;  
                        linesMap[node.id] = linesMap[node.id] || [];
                        linesMap[linkNode.id] = linesMap[linkNode.id] || [];
            
                        linesMap[node.id].push({
                            id: node.id,
                            line: line,
                            linkApex: linkNode.id,
                            start: true,
                            typeLink: "dash"
                        });
                        linesMap[linkNode.id].push({
                            id: linkNode.id,
                            line: line,
                            linkApex: node.id,
                            start: false,
                            typeLink: "dash"
                        });                      
                      }
                    }
                });
              }              
            }
          } else {
            console.log('Структура не найдена');
          }
        } else {
          console.log('Ошибка при получении структуры');
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    });
    $('#button-load-structure-cancel').on('click', function(){
      $('.load-structure').fadeOut(200);
    });
    $(document).on('click', '.div-load-window', function(){
      if (prevChangeLoad != null) {
          prevChangeLoad.find('a').css('color', '#b4b4b4');
      }
      $(this).find('a').css('color', '#30d5c8');
      prevChangeLoad = $(this);
      loadStructureName = $(this).find('a').text();
  });
});