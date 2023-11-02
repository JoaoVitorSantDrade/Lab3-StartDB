// npm install jest --save-dev
// npm install ts-jest --save-dev
// npm install @types/jest --save-dev

type xy = {
    x: number;
    y: number;
}

class Circle {
    coordinates:xy;
    radius:number;

    constructor(coordinates:xy, radius:number){
        this.coordinates = coordinates;
        this.radius = radius;
    }

    area():number{
        return 2*Math.PI*this.radius;
    }

    getX():number{
        return this.coordinates.x;
    }

    getY():number{
        return this.coordinates.y;
    }
    getDiameter():number{
        return this.radius*2
    }
}

export {Circle};