window.onload = () => {
    getContext();
}

function getContext() {
    var c = document.getElementById('game');
    console.log(c);

    c.getContext('2d');
    
}