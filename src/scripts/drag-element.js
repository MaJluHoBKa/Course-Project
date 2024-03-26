$(".apex-add").draggable({
    containment: "parent"
});

$("#desk-apex").on("mouseover", ".apex-add", function() {
    $(this).resizable({
        handles: "n, e, s, w, ne, se, sw, nw",
        minWidth: 50,
        minHeight: 50
    });
});