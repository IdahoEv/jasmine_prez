describe("Sprites", function(){

  var sprite;

  beforeEach(function(){
    sprite = new Sprite();
  });

  it("exists", function(){
    expect(sprite).toBeDefined();
  });

  describe("position", function(){
    it("is the origin for new sprites", function(){
      expect(sprite.position).toEqual({ x: 0.0, y: 0.0});
    });
    it("remembers updates to the position", function(){
      sprite.setPosition({x: 3, y: -3.5});
      expect(sprite.position).toEqual({ x: 3, y: -3.5});
    });
    it("handles updates for multiple sprites", function(){
       var sprite2 = new Sprite();
       var sprite3 = new Sprite();


       sprite.setPosition({x: 3, y: -3.5});
       sprite2.setPosition({x: 1, y: 1.5});

       expect(sprite3.position).toEqual({ x: 0.0, y: 0.0});  //==
       expect(sprite.position).toEqual({ x: 3, y: -3.5});
       expect(sprite2.position).toEqual({ x: 1, y: 1.5});
    });
  });

  describe("velocity", function(){
    it("is the origin for new sprites", function(){
      expect(sprite.velocity).toEqual({ x: 0.0, y: 0.0});
    });
    it("remembers updates to the velocity", function(){
      sprite.setVelocity({x: 3, y: -3.5});
      expect(sprite.velocity).toEqual({ x: 3, y: -3.5});
    });
  });

  describe("updates to position", function(){
    it("updates proportionally", function(){
      sprite.setVelocity({x: 1, y: -1.5});
      sprite.update(1000);
      expect(sprite.position).toEqual({ x: 1 , y:-1.5 });
    });
    it("updates proportionally even for small numbers", function(){
      sprite.setVelocity({x: 0.5, y: -.33});
      sprite.update(100);
      //expect(sprite.position).toEqual({ x: 0.005 , y:-0.0033 });
      expect(sprite.position.x).toBeCloseTo(0.05, 3);
      expect(sprite.position.y).toBeCloseTo(-0.033, 3);

    });
  });

  describe("naming", function(){
    it("should name them all with 'Sprite' by default", function(){
       var sprite2 = new Sprite();
       var sprite3 = new Sprite();

       expect(sprite.name).toMatch(/Sprite/);
       expect(sprite2.name).toMatch(/Sprite/);
       expect(sprite3.name).toMatch(/Sprite/);
    });
    it("should give them unique names", function(){
       var sprite2 = new Sprite();
       var sprite3 = new Sprite();
      expect(sprite.name).not.toEqual(sprite2.name);
      expect(sprite2.name).not.toEqual(sprite3.name);
      expect(sprite.name).not.toEqual(sprite3.name);
    });
  });

  describe("rotate", function(){

    beforeEach(function(){
      spyOn(sprite, 'setOrientation');  //.and.callThrough();
    });

    it("should result in a call to setOrientation", function(){
      sprite.rotate(1.0);
      expect(sprite.setOrientation).toHaveBeenCalledWith(1.0);
      sprite.rotate(1.0);
      sprite.rotate(1.0);
      sprite.rotate(1.0);
      expect(sprite.setOrientation.calls.count()).toBe(4);
    });
  });


  xdescribe("animate", function(){
    it("should update the position every 100ms", function(){
      sprite.setVelocity({x: 0.5, y: -0.5});
      jasmine.clock().install();
      sprite.animate();
      jasmine.clock().tick(101);
      //expect(sprite.position).toEqual({x: 0.05, y: -0.05});
      expect(sprite.position.x).toBeCloseTo(0.05, 3);
      expect(sprite.position.y).toBeCloseTo(-0.05, 3);
      jasmine.clock().tick(900);
      // wait a second
      //expect(sprite.position).toEqual({x: 0.5, y: -0.5});
      expect(sprite.position.x).toBeCloseTo(0.5, 3);
      expect(sprite.position.y).toBeCloseTo(-0.5, 3);
      jasmine.clock().uninstall();
    });
  });



});
