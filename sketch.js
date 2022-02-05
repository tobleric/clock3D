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
    sphere(30, 200, 200)
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
    noStroke()

    /*Erstelle Radius für Stundekreis */
    let hourSize = 2
    let torusSize = 200

    /*Generiere Licht*/
    pointLight(255, 255, 255, 200, -200, 100)
    pointLight(25, 0, 0, -200, 200, -100)
    ambientMaterial(255, 255, 255)
    fill(255)

    /*Stelle Kamera*/
    // camera(0, 0, -300, 0, 0, 0, 0, 1, 0)

    //Erstelle Werte und Form Stundenkreis A
    push()
    let hourFact = cos((b) + 1) / 2
    let hourAPosX = map(hourFact, 1, -1, -torusSize, torusSize)
    translate(hourAPosX, 0, 0)
    torus(torusSize, hourSize, 170)
    pop()

    //Erstelle Werte und Form Stundenkreis B
    push()
    let hourBPosX = map(hourFact, -1, 1, -torusSize, torusSize)
    if (hourBPosX <= 1 || hourBPosX >= width) {
      pointLight(255, 0, 0, 600, 0, 600)
      pointLight(0, 250, 255, -600, 0, -600)
      fill(25, 250, 255)
    } 
    translate(hourBPosX, 0, -100)
    torus(torusSize, hourSize, 150)
    pop()

    //Erstelle Werte und Form Sekundenkreis
    push()
    translate(hourAPosX, 0, 0)
    let sekPosY = sin(a) * torusSize 
    let sekPosX = cos(a) * torusSize

    push()
    translate(sekPosX, sekPosY, 0)
    rotateX(90)

    rotateY(frameCount/1.6666666667)

    texture(texStars)
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

    /*Color changer*/
    function colorChange() {
      // console.log(hourBPosX)
    }
  }

