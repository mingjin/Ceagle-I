var i = 0;

function scheduling(){
    i = ++i;
    postMessage(i);
    setTimeout("scheduling()", 180000);
}

scheduling();