// 1. Use the D3 library to read in `samples.json`.
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
d3.json("./samples.json").then(function(d) {
    var sampleData = d.samples[0]
    var sampleValues = sampleData.sample_values;
    var otuIds = sampleData.otu_ids;
    var otuLabels = sampleData.otu_labels;
    //console.log(otuLabels);

    // slice top 10
    var topTenValues = sampleValues.slice(0,10);
    otuIds.forEach(d => `"OTU ${d}`)
    var topTenIds = otuIds.slice(0, 10);
    var topTenLabels = otuLabels.slice(0, 10);
    console.log(topTenIds);

    var trace1 = {
        x: topTenValues,
        y: topTenIds,
        type: "bar",
        orientation: "h"
    };

    var data = [trace1];

    var layout = {
        title: "Top 10 OTUs Found"
    };

    Plotly.newPlot("bar", data, layout)
})