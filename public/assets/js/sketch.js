 ///// INPUTS FOR SKETCH

    var inc;
    var z_inc;
    var scl = 10;
    var magnitude;
    var num_of_particles;
    var uniformity;




    ////  INPUTS FOR PARTICLE

    var max_speed;
    var stroke_weight;
    var red_num;
    var green_num;
    var blue_num;


    var zoff = 0;
    var cols, rows;
    var particles = [];
    var flowfield;


    function setup() {
        
        let canvas = createCanvas(windowWidth, windowHeight);
        canvas.position(0,0);
        canvas.style('z-index', '-1');
        inc = 0.08827827360815177;
        z_inc = 8.66418165524652e-06;
        scl = 10;
        magnitude = 0.179842054299564;
        num_of_particles = floor((width + height)/2);
        uniformity = 1.155224668828177;




        ////  INPUTS FOR PARTICLE

        max_speed = 2.033944321697334;
        stroke_weight = 1.9170756971027085;
        red_num = 226.0072007007642;
        green_num = 107.02555630947253;
        blue_num = 54.70138579314955;

        
        canvas.id('canvas')


        var random_color = [red_num, green_num, blue_num]
        var inverse_color = [255-random_color[0], 255-random_color[1], 255-random_color[2], 9]
        background(color(random_color));
        cols = floor(width / scl);
        rows = floor(height / scl);

        flowfield = new Array(cols * rows);

        for(var i=0; i < num_of_particles; i++){
            particles[i] = new Particle(max_speed, stroke_weight, inverse_color);
        }

    }

    function draw() {



        var yoff = 0;


        for (var y=0; y < rows; y++){
            var xoff = 0;
            for (var x=0; x < cols; x++){
                var index = (x + y * cols);
                var r = noise(xoff, yoff, zoff) * TWO_PI * uniformity;
                var v = p5.Vector.fromAngle(r);
                v.setMag(magnitude);
                flowfield[index] = v;
                xoff += inc;
            }
            yoff += inc;
            zoff += z_inc;
        }


    for(var i=0; i < num_of_particles; i++){
        particles[i].update();
        particles[i].edges();
        particles[i].show();
        particles[i].follow(flowfield);
    }

    if (frameCount > 1000){
        noLoop()
    }
    }