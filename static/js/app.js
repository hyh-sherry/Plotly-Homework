d3.json("./samples.json").then(function(d) {

    function init() {
        // Create a horizontal bar chart
        var sampleData = d.samples[0]
        var sampleValues = sampleData.sample_values;
        var otuIds = sampleData.otu_ids;
        var otuLabels = sampleData.otu_labels;
        //console.log(otuLabels);

        // Slice top 10
        var topTenValues = sampleValues.slice(0,10);
        var modifiedIds = otuIds.map(d => {return `OTU ${d}`});
        var topTenIds = modifiedIds.slice(0, 10);
        var topTenLabels = otuLabels.slice(0, 10);
        //console.log(topTenIds);

        var trace1 = {
            x: topTenValues.reverse(),
            y: topTenIds.reverse(),
            hovertext: topTenLabels.reverse(),
            type: "bar",
            orientation: "h"
        };

        var data = [trace1];

        var layout = {
            title: "Top 10 OTUs Found"
        };

        Plotly.newPlot("bar", data, layout);

        // Create a bubble chart
        var trace2 = {
            x: otuIds,
            y: sampleValues,
            hovertext: otuLabels,
            type: "scatter",
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds
            }
        };

        var data2 = [trace2];

        var layout2 = {
            xaxis: {title:"OTU ID"}
        };

        Plotly.newPlot("bubble", data2, layout2);

        // Display each key-value pair from the metadata JSON object somewhere on the page.   
        var sampleMetadata = [d.metadata[0]];
        console.log(sampleMetadata);
        var selection = d3.select("#sample-metadata").selectAll("ul")
        //console.log(selection)
        selection
            .data(sampleMetadata)
            .enter()
            .append("ul")
            .html(function(data) {
                return `<li>id: ${data.id}</li>
                    <li>ethnicity: ${data.ethnicity}</li>
                    <li>gender: ${data.gender}</li>
                    <li>age: ${data.age}</li>
                    <li>location: ${data.location}</li>
                    <li>bbtype: ${data.bbtype}</li>
                    <li>wfreq: ${data.wfreq}</li>`
            });
        selection.exit().remove(); 

    }

    init();

    // Loop through name in samples.json to fill in dropdown options
    var options = ""
    for(var i = 0; i < d.names.length; i++) {
        options += `<option value="${i}">`+ d.names[i] +"</option>";
      }
      document.getElementById("selDataset").innerHTML = options;
});