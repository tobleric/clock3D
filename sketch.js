class Sphere {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

  }

  show() {
    push()
    translate(this.x, this.y, this.z)
    texture(texStars)
    sphere(20)
    pop()
  }

}

/*Startwinkel für Sekundenkreis*/
let a = 0;

/*Startwinkel für StundenkreisA/B*/
let b = 0;

/*Array Sterne generieren */
let stars = [];
let texStars;

function setup() {
    angleMode(DEGREES)
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(20)

    texStars = loadImage("assets/texStars.png")

    for (let i = 0; i < 20; i++) {
      let starX = Math.floor(Math.random() * window.innerWidth)
      let starY = Math.floor((Math.random() * window.innerHeight) - window.innerHeight/2)
      let starZ = Math.floor((Math.random() * window.innerWidth) - 200)
      stars.push(new Sphere(starX, starY, starZ))
    }

  }
  
  function draw() {
    background(0)
    // orbitControl()
    translate(-windowWidth/2, 0);
    noStroke()

    /*Erstelle Radius für Stundekreis */
    let diameter = width;
    let radius = diameter/2;
    let hourSize = 2
    let sekSize = 20

    /*Generiere Licht*/
    pointLight(255, 255, 255, 200, -200, 100)
    pointLight(25, 0, 0, -200, 200, -100)
    ambientMaterial(255, 255, 255)
    fill(255)

    /*Stelle Kamera*/
    // camera(0, 0, -300, 0, 0, 0, 0, 1, 0)

    //Erstelle Werte und Form Stundenkreis A
    push()
    let hourFact = cos(b)
    let hourAPosX = map(hourFact, 1, -1, width/4, width/2)
    translate(hourAPosX, 0, 0)
    torus(radius/2, hourSize, 70)
    pop()

    //Erstelle Werte und Form Stundenkreis B
    push()
    let hourBPosX = map(hourFact, -1, 1, width/2, width-100)
    translate(hourBPosX, 0, -100)
    torus(radius/2, hourSize, 50)
    pop()

    //Erstelle Werte und Form Sekundenkreis
    push()
    translate(hourAPosX, 0, 0)
    let sekPosY = sin(a) * radius / 2
    let sekPosX = cos(a) * radius / 2

    push()
    translate(sekPosX, sekPosY, 0)
    rotateX(90)

    rotateY(frameCount/1.6666666667)

    ambientMaterial(255)
    torus(40)
    /*Torus Light */
  
    pop()
    pop()

    /*Speed von Sekundenkreis wird erstellt*/
    a += 360/600

    /*Speed von Stundenkreis wird erstellt*/
    b += 360/1200

    /*Stars generieren*/
    for (let i = 0; i < stars.length; i++) {
      stars[i].show()
    }
  

  }

