onmessage = function(event) {
    var data = event.data;
    updateUI(data);
}

function updateUI(data)
{
    postMessage(data);
    // postMessage([{id: 1, state: data.result.toLowerCase()}, {id: 2, state: 'failed'}]);
}