$(document).ready(function() {
    const canvas = document.getElementById('drawCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let isDrawing = false;
    let lastX = 0, lastY = 0;

    function init() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        $('#result-display').text("result: ?");
    }
    init();

    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        return {
            x: (clientX - rect.left) * (canvas.width / rect.width),
            y: (clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    $ (canvas).on('mousedown touchstart', (e) => {
        isDrawing = true;
        const {x, y} = getCoords(e.originalEvent);
        [lastX, lastY] = [x, y];
    });

    $(window).on('mousemove touchmove', (e) => {
        if (!isDrawing) return;
        const {x, y} = getCoords(e.originalEvent);
        ctx.beginPath(); ctx.moveTo(lastX, lastY); ctx.lineTo(x, y); ctx.stroke();
        [lastX, lastY] = [x, y];
    });

    $(window).on('mouseup touchend', () => isDrawing = false);
    $('#clearBtn').on('click', init);

    $('#predictBtn').on('click', async function() {
        const imgData = ctx.getImageData(0, 0, 28, 28);
        const input = Array.from(imgData.data)
            .filter((_, i) => i % 4 === 0) // extract R channel
            .map(v => v / 255.0); // normalize to [0, 1]

        try {
            const response = await fetch('/Mnist-predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: input })
            });
            const res = await response.json();

            if (res.status !== 'success') {
                $('#result-display').text("prediction error occurred");
            } else {
                $('#result-display').text(`result: ${res.prediction}`);
            }
            
            
        } catch (e) {
            alert("prediction failed: " + e.message);
        }
    });
});
