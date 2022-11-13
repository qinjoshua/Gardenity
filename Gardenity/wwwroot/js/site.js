// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


class Garden {
    /**
     * */
    constructor() {
        this.plots = {}
    }

    addPlot(plot) {
        this.plots[plot.name] = plot;
    }
}

class Plot {
    /**
     * */
    constructor(x, y, width, height, name) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.name = name
        this.plants = Array(0)
    }

    changeName(name) {
        this.name = name
    }

    addPlants(plantsInPlot) {
        this.plants.push(plantsInPlot)
    }
}

class PlotOutline {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}


window.onload = function () {
    // Get the canvas and context
    var canvas = document.getElementById("canvas");
    var overlay = document.getElementById("overlay");
    var ctx = canvas.getContext("2d");
    //var ctxo = overlay.getContext("2d");
    var garden = new Garden();
    var outline = new PlotOutline();
    var keepAddingPlots = true;

    

    // calculate where the canvas is on the window
    // (used to help calculate mouseX/mouseY)
    var scanvas = $("#canvas");
    var canvasOffset = scanvas.offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var scrollX = scanvas.scrollLeft();
    var scrollY = scanvas.scrollTop();

    // this flage is true when the user is dragging the mouse
    var isDown = false;

    // these vars will hold the starting mouse position
    var startX;
    var startY;

    var prevStartX = 0;
    var prevStartY = 0;

    var prevWidth = 0;
    var prevHeight = 0;

    var plotNames = 0;

    function resize() {
        CANVAS_WIDTH = 750;
        CANVAS_HEIGHT = 500;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
    }

    resize();
    window.onresize = resize;

    // Timing and frames per second
    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;

    // Initialize the game
    function init() {
        // render initial background here (gorillas and buildings)


        // Enter main loop
        main(0);
    }

    // Main loop
    function main(tframe) {
        // Request animation frames
        window.requestAnimationFrame(main);

        // Update and render the game
        update(tframe);
        render();
    }

    // Update the game state
    function update(tframe) {
        var dt = (tframe - lastframe) / 1000;
        lastframe = tframe;

        // Update the fps counter
        updateFps(dt);
    }

    // Used exclusively to update the fps counter
    function updateFps(dt) {
        if (fpstime > 0.25) {
            // Calculate fps
            fps = Math.round(framecount / fpstime);

            // Reset time and framecount
            fpstime = 0;
            framecount = 0;
        }

        // Increase time and framecount
        fpstime += dt;
        framecount++;
    }

    // Render the game
    function render() {
        // Draw the frame
        drawFrame();
    }

    function drawFrame() {

        var background = new Image();
        background.src = "/images/grid.jpg";

        // Make sure the image is loaded first otherwise nothing will draw.
        //background.onload = function () {
        //    ctx.drawImage(background, 0, 0);
        //}

        background.addEventListener('load', () => {
            const ptrn = ctx.createPattern(background, 'repeat'); // Create a pattern with this image, and set it to "repeat".
            ctx.fillStyle = ptrn;
            ctx.fillRect(0, 0, canvas.width, canvas.height); // context.fillRect(x, y, width, height);
        })

        // style the context
        ctx.strokeStyle = "brown";
        ctx.fillStyle = "brown";
        ctx.lineWidth = 3;
        //ctxo.strokeStyle = "brown";
        //ctxo.fillStyle = "brown";
        //ctxo.lineWidth = 3;

        allPlotNames = Object.keys(garden.plots)
        for (let plot = 0; plot < allPlotNames.length; plot++) {
            plotToFill = allPlotNames[plot]
            ctx.fillRect(garden.plots[plotToFill].x, garden.plots[plotToFill].y, garden.plots[plotToFill].width, garden.plots[plotToFill].height);
        }
        if (keepAddingPlots) {
            ctx.strokeRect(outline.x, outline.y, outline.width, outline.height)
        }
    }

    function handleMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        // save the starting x/y of the rectangle
        startX = parseInt(e.clientX - offsetX);
        startY = parseInt(e.clientY - offsetY);

        // set a flag indicating the drag has begun
        isDown = true;

        if (!keepAddingPlots) {
            allPlotNames = Object.keys(garden.plots)
            for (let plot = 0; plot < allPlotNames.length; plot++) {
                plotToFill = allPlotNames[plot]
                specPlot = garden.plots[plotToFill]
                if (e.clientX - offsetX > specPlot.x && e.clientX - offsetX < specPlot.x + specPlot.width && e.clientY - offsetY > specPlot.y && e.clientY - offsetY < specPlot.y + specPlot.height) {
                    $('#largeModal').modal('show');

                }
            }

        }
    }

    function handleMouseUp(e) {
        e.preventDefault();
        e.stopPropagation();

        if (keepAddingPlots) {
            // the drag is over, clear the dragging flag
            isDown = false;
            //ctx.fillRect(prvStartX, prevStartY, prevWidth, prevHeight);
            garden.addPlot(new Plot(prevStartX, prevStartY, prevWidth, prevHeight, "plot" + plotNames));
            $('#myModal').modal('show')
            plotNames = plotNames + 1

        }
    }

    function handleMouseOut(e) {
        e.preventDefault();
        e.stopPropagation();

        // the drag is over, clear the dragging flag
        isDown = false;
    }

    function handleMouseMove(e) {
        e.preventDefault();
        e.stopPropagation();

        // if we're not dragging, just return
        if (!isDown) {
            return;
        }

        // get the current mouse position
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        // Put your mousemove stuff here



        // calculate the rectangle width/height based
        // on starting vs current mouse position
        var width = mouseX - startX;
        var height = mouseY - startY;

        // clear the canvas
        // ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw a new rect from the start position
        // to the current mouse position
        //ctx.strokeRect(startX, startY, width, height);
        outline.x = startX;
        outline.y = startY;
        outline.width = width;
        outline.height = height;

        prevStartX = startX;
        prevStartY = startY;

        prevWidth = width;
        prevHeight = height;
    }

    // listen for mouse events
    $("#canvas").mousedown(function (e) {
        handleMouseDown(e);
    });
    $("#canvas").mousemove(function (e) {
        handleMouseMove(e);
    });
    $("#canvas").mouseup(function (e) {
        handleMouseUp(e);
    });

    $("#canvas").mouseout(function (e) {
        handleMouseOut(e);
    });
    document.querySelector('#save').addEventListener('click', () => {
        keepAddingPlots = false;
    })
    

    // Call init to start the game
    init();
};

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

