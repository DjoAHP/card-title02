$(document).ready(function () {
    const cardWrap = $('.card-wrap');
    const card = $('.card');
    const borderWrap = $('.border-wrap');
    let cardBounds = null;
  
    function onMouseEnter() {
      cardBounds = cardWrap[0].getBoundingClientRect();
      $(document).on('mousemove', rotateToMouse);
    }
  
    function onMouseLeave() {
      $(document).off('mousemove', rotateToMouse);
      card.css('transform', '');
      borderWrap.css('background-image', '');
    }
  
    function rotateToMouse(e) {
      if (!cardBounds) return;
  
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - cardBounds.left;
      const topY = mouseY - cardBounds.top;
      const center = {
        x: leftX - cardBounds.width / 2,
        y: topY - cardBounds.height / 2,
      };
      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
  
      card.css('transform', `
          scale3d(1.0, 1.0, 1.0)
          perspective(800px)
          rotate3d(
            ${-center.y / 100},
            ${center.x / 100},
            0,
            ${Math.log(distance) * 0.8}deg
          )
        `);
  
      borderWrap.css('background-image', `
          radial-gradient(
            circle at
            ${center.x * 2 + cardBounds.width / 2 - 30}px
            ${center.y * 2 + cardBounds.height / 2 - 30}px,
            #ffffff3e,
            #0000000f
          )
        `);
    }
  
    cardWrap.on('mouseenter', onMouseEnter);
    cardWrap.on('mouseleave', onMouseLeave);
  });