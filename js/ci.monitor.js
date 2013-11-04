onmessage = function(event) {
    var data = event.data;
    persist(data);
    updateUI(data);
}

function persist(data) {
    
}

function updateUI(data)
{
    postMessage([{id: 1, state: data.result.toLowerCase()}, {id: 2, state: 'failed'}]);
}