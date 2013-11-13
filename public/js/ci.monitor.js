onmessage = function(event) {
    var data = event.data;
    updateUI(data);
}

function updateUI(data)
{
    postMessage(data);
}