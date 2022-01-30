function setup() {
    angleMode(DEGREES)
    createCanvas(400, 400, WEBGL);
    frameRate(20)

  }

  /*Startwinkel für Sekundenkreis*/
  let a = 0;

   /*Startwinkel für StundenkreisA/B*/
  let b = 0;
  let blue = 255;
  
  function draw() {
    background(20)
    orbitControl()
    translate(-200, 0);
    noStroke()

    /*Erstelle Radius für Stundekreis */
    let diameter = width;
    let radius = diameter/2;

    /*Generiere Licht*/
    directionalLight(41, 0, 0, 0.5, 200, -200, -100)
    directionalLight(0, 49, 0, 0.5, 200, -200, -100)
    directionalLight(0, 0, 51, 0.5, 200, -200, -100)

    /*Stelle Kamera*/
    camera(0, 0, 250, width/2-100, 0, 0, 0, 1, 0)

    //Erstelle Werte und Form Stundenkreis A
    push()
    specularMaterial(41, 49, 51)
    let hourFact = cos(b)
    let hourAPosX = map(hourFact, 1, -1, width/4, width/2)
    translate(hourAPosX, 0, 0)
    torus(radius/2, 12, 50)
    pop()

    //Erstelle Werte und Form Stundenkreis B
    push()
    specularMaterial(41, 49, 51)
    let hourBPosX = map(hourFact, -1, 1, width/2, width-100)
    translate(hourBPosX, 0, -100)
    torus(radius/2, 12, 50)
    pop()

    //Erstelle Werte und Form Sekundenkreis
    push()
    directionalLight(0, 0, 50, 0.1, 200, -200, -100)
    directionalLight(20, 0, 0, 0.2, -200, 200, -100)
    specularMaterial(20, 0, 255)
    translate(hourAPosX, 0, 0)
    let sekPosY = sin(a) * radius / 2
    let sekPosX = cos(a) * radius / 2

    push()
    translate(sekPosX, sekPosY, 0)
    sphere(30)
    pop()
    pop()

    /*Speed von Sekundenkreis wird erstellt*/
    a += 360/600

    /*Speed von Stundenkreis wird erstellt*/
    b += 360/1200

    //console.log(hourFact)
  }