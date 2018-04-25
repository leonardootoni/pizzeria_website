$(document).ready(function () {
    var value=document.getElementById("choseitem").value;

    show(value);
});


function show(val){
    if(val==="Pizza"){
        var htm="<table border='2px'><tr><th>Weight Per Slice (g)</th><td>77</td></tr><tr><th>Calories (kcals)</th><td>150</td></tr><tr><th>Protein (g)</th><td>11</td></tr><tr><th>Carbs (g)</th><td>16</td></tr><tr><th>Cholestrol (mg)</th><td>25</td></tr><tr><th>Vit A (% DV)</th><td>4</td></tr><tr><th>Vit C (% DV)</th><td>8</td></tr></table>";
        document.getElementById("det").innerHTML=htm;

    }
}

