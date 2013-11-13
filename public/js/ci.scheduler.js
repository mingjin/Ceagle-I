var i = 0;

function scheduling(){
    i = ++i;
    postMessage(i);
    setTimeout("scheduling()", 10000);
}

scheduling();