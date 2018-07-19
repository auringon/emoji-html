var date;
var emojis = [];
$.getJSON("emoji.json", function (result) {
       
    $.each(result, function (i, field) {
        date = (field.date.substring(0, 4));
        if (date <= 2010) {
            emojis.push(field);
            //$("#emojiContainer").append('<button style="float:left; margin:5px" type="button" class="btn btn-light"  onclick="setToCopy(\'' + field.code+ '\')">' + field.char + " " + '</button>');

        }

    });
    buscarEmoji();
});
$(function () {
    FastClick.attach(document.body);

    
  
    $("#searchInputID").on('keyup', function (event) {
        if(event.key === 'Enter') {
            buscarEmoji();    
        }
    });  
    $("#searchButtonID").on('click', function () {
        buscarEmoji();
    }); 
    $("#cleanField").on('click', function () {
        $("#resultContainer").empty();
        $("#resultCodeContainer").empty();
    });    
      
});

function buscarEmoji() {
    var searchTerm = $("#searchInputID").val();
    var new_li = "";
    $("#emojiContainer").empty();
    var groupedByDate = {};
    if (searchTerm) {
        $.each(emojis, function (index, field) {
            if (containsIgnoreCase(field.keywords, searchTerm)) {
                $("#emojiContainer").append('<button style="float:left; margin:5px" type="button" class="btn btn-light"  onclick="setToCopy(\'' + field.code+ '\')">' + field.char + " " + '</button>');
            }
        });
    } else {
        $.each(emojis, function (index, field) {
            $("#emojiContainer").append('<button style="float:left; margin:5px" type="button" class="btn btn-light"  onclick="setToCopy(\'' + field.code+ '\')">' + field.char + " " + '</button>');
        });        
    }
    
   
}

function containsIgnoreCase(src, value) {
    return (src.toUpperCase()).indexOf(value.toUpperCase()) != -1;
}

function setToCopy(code) {
    console.log("entre")
    var newArray = emojis.filter(function (el) {
		return code == el.code
    });
    var lastValue =$("#resultCodeContainer").val()
    $("#resultContainer").append(newArray[0].char);
    $("#resultCodeContainer").append(lastValue+"&#x"+newArray[0].code.replace(/\s/g, "&#x"));
    
}