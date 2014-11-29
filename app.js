$(document).ready(function() 
{ 
  $.ajax({
        url: "https://teselagen.com/getSequence",
        type: "GET",
        crossDomain: true,
        dataType: "json",
        success:  visualizeTheSequence,
        error: function (xhr, status) {
            alert("error");
            $('#output').html("error");
        }
     });
});
   
var visualizeTheSequence = function(response)
{  
     var width = 1000,
         height = 1000,
         cx = 400,
         cy = 400,
         cr = 150;

    var svg = d3.select("body").append("svg")
         .attr("width", width)
         .attr("height", height);


    var circle = svg.append('circle')
                   .attr('cx', cx)
                   .attr('cy', cy)
                   .attr('r', cr)
                   .attr('stroke', 'black')
                   .attr('fill', 'white');

    var centerText = svg.append('text')
                    .attr('dx', cx - cr + 20 )
                    .attr('dy', cy - 10)
                    .text(function(){
                        return response.sequence;  
                    });
                svg.append('text')
                    .attr('dx', cx - cr + 40 )
                    .attr('dy', cy + 10)
                    .text(function(){
                        return "Sequence Length is : " + response.sequenceLength;  
                    });

    var baseLine = svg.append('line')
           .attr('x1', cx + cr- 12) 
           .attr('y1', cy)
           .attr('x2', cx + cr + 12)
           .attr('y2', cy)
           .attr("stroke", "black")
           .attr('transform', function(d)
           {
            return "rotate(-90 " + " " + cx + "," + cy + ")";
           });

    var baseText = svg.append('text')
                .attr('dx', cx + cr + 15 )
                .attr('dy', cy + 3)
                .attr("stroke", "blue")
                .text(function(){
                    return "0 bp - (Base Line  0 degrees)"  ;
                })
                .attr('transform', function(d)
                {
                    return "rotate(-90 " + " " + cx + "," + cy + ")";
                });


    /**
    * Using Basic SVG  syntax...

    for (var i = 0; i <response.features.length ; i++)                
    {

        var feature = response.features[i];
        var indicatorline = svg.append('line')
                           .attr('x1', cx + cr- 12) 
                           .attr('y1', cy)
                           .attr('x2', cx + cr + 12)
                           .attr('y2', cy)
                           .attr("stroke", "black")
                           .attr('transform', function(d)
                            {
                                return "rotate(" + (-90 + (feature.index/ response.sequenceLength) * 360) + " " +cx +"," + cy + ")";
                            });
       var text = svg.append('text')
                    .attr('dx', cx + cr + 15 )
                    .attr('dy', cy)
                    .text(function(){
                        return feature.name  ;
                    })
                    .attr('transform', function(d)
                        {
                            return "rotate(" + ( -90 + (feature.index/ response.sequenceLength) * 360) + " " +cx +"," + cy + ")";
                        });
    }

    **/


    // Using example shown at : http://bl.ocks.org/ChrisJamesC/4474971

    var elem = svg.selectAll("g myCircleText")
               .data(response.features);

    var transformGroup = elem.enter()
                .append("g")
                .attr("transform", function(data){
                    return "rotate(" + ( -90 + (data.index/ response.sequenceLength) * 360) + " " +cx +"," + cy + ")";
                });


    /* Create the "Line Indicator" and Text for each block */
    var line = transformGroup.append("line")
               .attr('x1', cx + cr- 12) 
               .attr('y1', cy)
               .attr('x2', cx + cr + 12)
               .attr('y2', cy)
               .attr("stroke", "black")
    transformGroup.append("text")
            .attr('dx', cx + cr + 15 )
            .attr('dy', cy + 3)
            .attr('fill', 'blue')  
            .text(function(data){
                return data.name  + " (Index :"+data.index+ ")";
            });
}
