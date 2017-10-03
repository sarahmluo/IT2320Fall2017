$(document).ready(function ()
{
    var cells = $(".cell");
    var colorCount = 0;
    var highlightedCell = null;

    for (var i = 0; i < cells.length; i++)
    {
        var cell = $(cells[i]);
        var isDark = colorCount % 2 == 0;
        var isNextRow = (i + 1) % 8 == 0;
        colorCount += isNextRow ? 2 : 1;
        cell.css("background-color", isDark ? "navy" : "white");
        
        cell.click(function(){
    
    		// check if there is a cell already selected
    		if(highlightedCell != null){
    			// Check if second selected cell is a new cell
    			var color = "";
    			highlightedCell.hasClass("red") ? color = "red" : color = "black";
    			highlightedCell.removeClass(color);
    			highlightedCell.removeClass("highlight");
    			$(this).removeClass("red black").addClass(color);
    			$(this).addClass("piece");
    			highlightedCell = null;
    		}
    		else{
				// check if cell is not empty
				if($(this).hasClass("red") || $(this).hasClass("black")){
					// highlight the cell
					$(this).addClass("highlight");
					highlightedCell = $(this);
				} // end red/black if
        	}// end highlighted cell if
        
        });
    }
    
    
    
    
    
});