(function ($) {
  // detect if mobile browser. regex -> http://detectmobilebrowsers.com
  const isMobile = (function (a) { return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera);
  const style = getComputedStyle(document.documentElement);
  let scrollController;
  let documentWidth = outerWidth;
  let documentHeight = innerHeight;

  updateVhValue();

  if (isMobile) {
    $("#body").addClass("is-mobile");
  } else {
    $("#body").addClass("not-mobile");
  }

  /************* FORM de VALIDATION *************/
  $("#form").on("submit", function (e) {
    var field, value = null;
    var valid = true;

    // Teste le nom.
    field = $("#nom");
    value = field.val();
    if (value) {
      field.parent().removeClass("erreur");
    } else {
      field.parent().addClass("erreur");
      valid = false;
    }

    // Teste l'email.
    field = $("#email");
    value = field.val();
    if (isEmailValid(value)) {
      field.parent().removeClass("erreur");
    } else {
      field.parent().addClass("erreur");
      valid = false;
    }

    // Teste le message.
    field = $("#message");
    value = field.val();
    if (value) {
      field.parent().removeClass("erreur");
    } else {
      field.parent().addClass("erreur");
      valid = false;
    }

    // Termine la validation.
    if (!valid) {
      e.preventDefault();
    }
  });

  $(window).on('load', function () {
    mask.init();
    artinmov.init();
    easyalarm.init();
    sandbox.init();

    startScrollMagic();

    onResize(true);
  });

  $(window).on('resize', throttle(onResize, 500));

  function onResize(force) {
    if (force === true || documentWidth != outerWidth) {
      documentWidth = outerWidth;

      mask.refresh();
      artinmov.refresh();
      easyalarm.refresh();
      sandbox.refresh();

      // updateVhValue();
    }
  }

  function startScrollMagic() {
    // init the controller
    
    if (!isMobile) {
      scrollController = new ScrollMagic.Controller();

      new ScrollMagic.Scene({
        duration: "150%",
      })
        .setPin("#hello")
        .addTo(scrollController);

      new ScrollMagic.Scene({
        triggerElement: "#hello",
        triggerHook: 0,
        duration: "100%",
      }).setTween("#hello-anim-h1", {
        color: style.getPropertyValue('--dark-color'),
        fontWeight: '100',
        scale: '1',
        y: 0
      }).addTo(scrollController);

      $(".hello-anim-p").each(function (index) {
        new ScrollMagic.Scene({
          triggerElement: "#hello",
          triggerHook: 0,
          offset: 200 + (200 * index),
          duration: "80%",
        }).setTween(this, {
          y: 0, opacity: 1
        }).addTo(scrollController);
      });

      // new ScrollMagic.Scene({
      //   triggerElement: "#projects",
      //   triggerHook: 1,
      //   duration: '62%',
        // offset: -600
      // })



      // Hello to projects - Black to White
      new ScrollMagic.Scene({
        triggerElement: "#mask",
        triggerHook: 0.33,
        duration: '80%',
        // offset: -600
      })
        .setTween(
          new TimelineMax()
            .add([
              TweenMax.fromTo('#mask', 1, { opacity: 0 }, { opacity: 1 }),
              // TweenMax.fromTo('#projects', 1, { opacity: 0 }, { opacity: 1 }),
              TweenMax.to('#hello', 1, { opacity: 0 })
            ])
            .fromTo('#projects', 1, { opacity: 0 }, { opacity: 1 })
        )
        .addTo(scrollController);

      // PROJECTS Mask overlay
      mask.scene = new ScrollMagic.Scene({
        triggerElement: "#mask",
        triggerHook: 0,
        duration: "60%",
      })
        .setPin('#mask', { pushFollowers: false })
        .setTween('#mask__overlay', { opacity: 0, ease: Power2.easeIn })
        .on("progress", function (e) {
          mask.drawCanvas();
        })
        .addTo(scrollController);

      $('.project').each(function (index) {
        let text = $(this).find('.section__content'),
          wrapper = '#' + $(this).attr('id') + ' .pin-wrapper';

        // PIN projects + text parallax
        new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: (index == 0 ? 0 : 1),
          duration: '200%',
        })
          .setPin(wrapper, { pushFollowers: false })
          .setTween(text, { y: -50, ease: Linear.easeNone })
          .addTo(scrollController);
      });

      // Parallax
      new ScrollMagic.Scene({
        triggerElement: "#project__hexkingdom",
        triggerHook: 1,
        duration: "200%",
      })
        .setTween('#hexkingdom_tile_1', { y: "-30%", ease: Linear.easeNone })
        .addTo(scrollController);

      new ScrollMagic.Scene({
        triggerElement: "#project__hexkingdom",
        triggerHook: 1,
        duration: "200%",
      })
        .setTween('#hexkingdom_tile_2', { y: "-10%", ease: Linear.easeNone })
        .addTo(scrollController);

      new ScrollMagic.Scene({
        triggerElement: "#project__hexkingdom",
        triggerHook: 1,
        duration: "200%",
      })
        .setTween('#hexkingdom_tile_3', { y: "-180%", ease: Linear.easeNone })
        .addTo(scrollController);

      new ScrollMagic.Scene({
        triggerElement: "#project__hexkingdom",
        triggerHook: 1,
        duration: "200%",
      })
        .setTween('#hexkingdom_tile_4', { y: "-160%", ease: Linear.easeNone })
        .addTo(scrollController);

      // DATAVIZ lines
      // let dataLines = TweenMax.staggerFromTo(".data-line", 2, {scaleY: 0}, {scaleY: 1, ease:Power2.easeOut}, 0.15);
      // new ScrollMagic.Scene({
      //       triggerElement: "#project__datakillers",
      //       triggerHook: 1,
      //       duration: "110%",
      //    })
      //    .setTween(dataLines)
      //    .addTo(scrollController);
    } else {
      scrollController = new ScrollMagic.Controller({
        container: "#content-wrapper",
      });

      $('.project').each(function (index) {
        let text = $(this).find('.section__content');

        // text parallax
        new ScrollMagic.Scene({
          triggerElement: this,
          triggerHook: 1,
          duration: '200%',
        })
          .setTween(text, { y: -50, ease: Linear.easeNone })
          .addTo(scrollController);
      });

      new ScrollMagic.Scene({
        triggerElement: "#project__hexkingdom",
        triggerHook: 1,
        duration: "200%",
      })
        .setTween('#hexkingdom_tile_4', { y: "-100%", ease: Linear.easeNone })
        .addTo(scrollController);
    }

    $('h2 .cursive').each(function (index) {
      new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 1,
        duration: "150%",
      })
        .setTween(this, { textIndent: '10%', ease: Linear.easeNone })
        .addTo(scrollController);
    });

    // EASY ALARM
    easyalarm.scene = new ScrollMagic.Scene({
      triggerElement: "#project__easy-alarm",
      triggerHook: 100,
      duration: "200%",
    })
      .on("progress", function (e) {
        easyalarm.drawCanvas()
      })
      .setTween('#project__easy-alarm', { backgroundPosition: "70% 60%" })
      .addTo(scrollController);

    // ART IN MOV
    artinmov.scene = new ScrollMagic.Scene({
      triggerElement: "#project__artinmov",
      triggerHook: 100,
      duration: "200%",
    })
      .on("progress", function (e) {
        artinmov.drawCanvas()
      })
      .addTo(scrollController);

    // Sandbox
    sandbox.scene = new ScrollMagic.Scene({
      triggerElement: "#project__sandbox",
      triggerHook: 1,
      duration: "260%",
    })
      .on("progress", function (e) {
        sandbox.drawCanvas()
      })
      .addTo(scrollController);
  }

  var mask = {
    init: function () {
      var self = mask;

      if (isMobile) return;

      self.canvas = document.getElementById('mask__canvas');
      self.ctx = self.canvas.getContext('2d');
      // self.img = document.getElementById('mask__img');
      self.fontSize = 70;
      self.dotInitialSize = self.fontSize * 0.05;
      self.dotInitialX = self.fontSize * 0.89;
      self.dotInitialY = self.fontSize * -0.14;
      self.dotTargetSize = Math.max($(document).width(), $(document).height()) * 1.5;
      
      self.bgColor = style.getPropertyValue('--dark-bg');
    },

    refresh: function () {
      var self = mask;

      if (isMobile) return;

      $(self.canvas).attr({
        'width': dpi($(self.canvas).width()),
        'height': dpi($(self.canvas).height())
      });

      self.canvasWidth = self.canvas.width;
      self.canvasHeight = self.canvas.height;

      self.drawCanvas();
    },

    drawCanvas: function () {
      const self = mask;
      const multiplier = Math.pow(self.scene.progress(), 4);
      const horizontalMultiplier = multiplier * 1500;
      const fontSize = self.fontSize + multiplier * 500;
      const dotSize = Math.round(dpi(self.dotInitialSize + (self.dotTargetSize - self.dotInitialSize) * multiplier));
      const dotX = self.canvasWidth / 2 + self.dotInitialX + horizontalMultiplier;
      const dotY = self.canvasHeight / 2 + self.dotInitialY;

      self.ctx.globalCompositeOperation = 'source-over';
      self.ctx.fillStyle = self.bgColor;
      self.ctx.fillRect(0, 0, self.canvasWidth, self.canvasHeight);
      
      self.ctx.globalCompositeOperation = 'destination-out';
      self.ctx.fillStyle = '#000000';

      self.ctx.font = '300 ' + fontSize + 'px Manrope';
      self.ctx.textAlign = 'center';
      self.ctx.fillText('Latest', self.canvasWidth / 2 - self.fontSize - horizontalMultiplier, self.canvasHeight / 2 - self.fontSize / 2);

      self.ctx.font = '400 ' + fontSize + 'px DM Serif Text';
      self.ctx.textAlign = 'center';
      self.ctx.fillText('projects', self.canvasWidth / 2 + self.fontSize + horizontalMultiplier, self.canvasHeight / 2 + self.fontSize / 2);

      self.ctx.beginPath();
      self.ctx.arc(dotX, dotY, dotSize, 0, 2 * Math.PI);
      self.ctx.fill();
    }
  }

  var easyalarm = {
    canvas: document.getElementById('project__easy-alarm__canvas'),
    canvasWidth: 0,
    canvasHeight: 0,
    progress: 0,
    spotlights: [],

    init: function() {
      this.ctx = this.canvas.getContext('2d');
      this.wantedRadius = this.radius,
      this.x = -this.radius * 2,
      this.y = -this.radius * 2,

      this.refresh();
    },

    refresh: function() {
      $(this.canvas).attr({
        'width': dpi($(this.canvas).width()),
        'height': dpi($(this.canvas).height())
      });

      this.canvasWidth = this.canvas.width;
      this.canvasHeight = this.canvas.height;

      this.spotlights = [];

      if (!isMobile) {
        this.spotlights.push(new Spotlight(0.7, 0.4, 0.2, 1.2));
      }
      
      this.spotlights.push(new Spotlight(0.15, 0.15, .8, 0.7));
    },

    drawCanvas: function() {
      this.progress = this.scene.progress();

      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      for (let s = 0; s < this.spotlights.length; s++) {
        const spotlight = this.spotlights[s];
        spotlight.update(this.progress);
        spotlight.draw();
      }
    }
  }

  class Spotlight {
    constructor (x, y, fx, fy) {
      this.radius = randomIntFromRange(120, 220);
      this.x = x * documentWidth;
      this.y = y * documentHeight;
      this.initialX = x * documentWidth;
      this.initialY = y * documentHeight;
      this.finalX = fx * documentWidth;
      this.finalY = fy * documentHeight;
    }

    update() {
      console.log(easyalarm.progress);
      this.x = this.initialX - (this.initialX - this.finalX) * easyalarm.progress;
      this.y = this.initialY - (this.initialY - this.finalY) * easyalarm.progress;
    }

    draw() {
      console.log(easyalarm.spotlights);

      easyalarm.ctx.beginPath();
      easyalarm.ctx.arc(dpi(this.x), dpi(this.y), dpi(this.radius), 0, 2 * Math.PI);
      easyalarm.ctx.fillStyle = '#ffffff';
      easyalarm.ctx.fill();
      easyalarm.ctx.closePath();
    }
  }

  var artinmov = {
    init: function () {
      this.canvas = document.getElementById('project__artinmov__canvas'),
      this.ctx = this.canvas.getContext('2d');
      this.angle = 10 * Math.PI / 180;

      this.frameWidth = 180;
      this.frameMinHeight = 100;
      this.frameMaxHeight = 300;
      this.frameMargin = 15;
      this.frameStrokeWidth = 6;
    },

    refresh: function () {
      $(this.canvas).attr({
        'width': dpi($(this.canvas).width()),
        'height': dpi($(this.canvas).height())
      });

      this.canvasWidth = this.canvas.width;
      this.canvasHeight = this.canvas.height;

      this.generateColumns();

      if (this.scene)
        this.drawCanvas();
    },

    generateColumns: function () {
      // +1 to compensate for the angle tilt
      const columnsCount = 1 + Math.round(documentWidth / this.frameWidth);
      const rowsCount = 2 * Math.round(documentHeight / this.frameMinHeight);

      this.columns = [];
      for (let c = 0; c < columnsCount; c++) {
        const column = {};
        column.speed = -Math.round(100 + (Math.random() * 400));
        column.frames = [];

        for (let r = 0; r < rowsCount; r++) {
          const frameHeight = Math.round(this.frameMinHeight + Math.random() * (this.frameMaxHeight - this.frameMinHeight));
          column.frames.push(frameHeight);
        }

        this.columns.push(column);
      }
    },

    drawCanvas: function () {
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.lineWidth = dpi(this.frameStrokeWidth);
      this.ctx.strokeStyle = '#E51E35';
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      for (let c = 0; c < this.columns.length; c++) {
        const column = this.columns[c];
        const x = c * this.frameWidth * Math.sin(this.angle);
        let y = - Math.round(this.frameWidth * Math.sin(this.angle));

        this.ctx.rotate(this.angle);
        this.ctx.translate(0, -x);

        for (let r = 0; r < column.frames.length; r++) {
          const frameHeight = column.frames[r];

          this.ctx.beginPath();
          this.ctx.strokeRect(dpi(c * this.frameWidth + this.frameMargin), dpi(y + this.frameMargin + this.scene.progress() * column.speed), dpi(this.frameWidth - this.frameMargin * 2), dpi(frameHeight - this.frameMargin * 2));
          this.ctx.closePath();

          y += frameHeight;
        }

        this.ctx.translate(0, x);
        this.ctx.rotate(-this.angle);
      }
    }
  }

  var sandbox = {
    gravity: 0.982 / 6,
    balls: [],
    progress: 0,
    direction: -1,
    colors: [
      '#2a9d8f',
      '#f3d795',
      '#f4a261',
      '#264653',
      '#e76f51',
    ],

    init: function () {
      var self = sandbox;

      self.canvas = document.getElementById('project__sandbox__canvas'),
      self.ctx = self.canvas.getContext('2d');
    },

    refresh: function () {
      var self = sandbox;

      $(self.canvas).attr({
        'width': dpi($(self.canvas).width()),
        'height': dpi($(self.canvas).height())
      });

      // const tmpW = self.canvasWidth;
      self.canvasWidth = dpi(self.canvas.width);
      self.canvasHeight = dpi(self.canvas.height);

      // if (tmpW != self.canvasWidth)
        self.populate();

      self.drawCanvas();
    },

    populate: function () {
      var self = sandbox;
      const ballAmount = Math.min(Math.round(documentWidth / 40), 25);
      // const ballAmount = 1;
      self.balls = [];

      for (let i = 0; i < ballAmount; i++) {
        let radius = Math.floor(randomIntFromRange(15, Math.min(75, documentWidth / 8), false));
        const mass = Math.round(20 + radius / 3);
        const x = randomIntFromRange(radius, documentWidth - radius);
        const y = randomIntFromRange(radius, documentHeight - radius);
        const color = randomValueFromArray(self.colors);
        const force = 3;
        const hForce = randomIntFromRange(-force, force) * 50;
        const vForce = randomIntFromRange(-force * 20, force * 10);
        const dx = hForce / mass;
        const dy = vForce / mass;

        self.balls.push(new Ball(x, y, radius, mass, color, dx, dy));
      }
    },

    drawCanvas: function () {
      const self = this;
      const progress = sandbox.scene.progress();
      const deltaProgress = sandbox.progress - progress;
      const direction = deltaProgress >= 0 ? -1 : 1;

      sandbox.progress = progress;
      sandbox.deltaProgress = Math.abs(deltaProgress * 100);
      if (direction != self.direction) {
        self.direction = direction;

        for (let i = 0; i < self.balls.length; i++) {
          const ball = self.balls[i];
          ball.invertTime();
        }
      }
      
      self.ctx.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
      for (let i = 0; i < self.balls.length; i++) {
        const ball = self.balls[i];
        ball.update();
      }
    },
  }

  class Ball {
    constructor(x, y, radius, mass, color, dx, dy) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.mass = mass;
      this.color = color;
      this.dx = dx;
      this.dy = dy;
    }

    draw() {
      sandbox.ctx.beginPath();
      sandbox.ctx.arc(dpi(this.x), dpi(this.y), dpi(this.radius), 0, 2 * Math.PI);
      sandbox.ctx.fillStyle = this.color;
      sandbox.ctx.fill();
      sandbox.ctx.closePath();
    }

    invertTime() {
      this.dx = -this.dx;
      this.dy = -this.dy;
    }

    update() {
      if (this.y + this.radius + sandbox.deltaProgress * this.dy > documentHeight) {
        this.dy = -this.dy;
      } else {
        this.dy += sandbox.gravity;
      }

      if (this.x + this.radius + sandbox.deltaProgress * this.dx >= documentWidth ||
        this.x - this.radius + sandbox.deltaProgress * this.dx <= 0) {
        this.dx = -this.dx;
      } else {
        this.dx = this.dx;
      }

      this.x += sandbox.deltaProgress * this.dx;
      this.y += sandbox.deltaProgress * this.dy;
      this.draw();
    }
  }

  function updateVhValue() {
    documentHeight = $(window).height();
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${documentHeight * 0.01}px`);
  }

  function isEmailValid(email) { //compare l'email entré à l'expression régulière.
    var regExpPattern = /^[0-9a-zA-Z][-._a-zA-Z0-9]*@([0-9a-zA-Z][-._0-9a-zA-Z]*\.)+[a-zA-Z]{2,4}$/;
    return (email.match(regExpPattern) != null);
  }
}(jQuery));