function initCarousel() {
  const allSlides = document.querySelector('.carousel__inner');
  const slide = document.querySelector('.carousel__slide');

  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');

  arrowLeft.style.display = 'none';

  const slideWidth = slide.offsetWidth;
  const slideCount = 4;
  let currentOffset = 0;

  arrowRight.addEventListener('click', (event) => {
    arrowLeft.style.display = '';

    currentOffset += slideWidth;

    if (currentOffset === slideWidth * (slideCount - 1)) 
      arrowRight.style.display = 'none';
    
    allSlides.style.transform = `translateX(-${currentOffset}px)`;
  });

  arrowLeft.addEventListener('click', (event) => {
    arrowRight.style.display = '';

    currentOffset -= slideWidth;
    
    if (currentOffset === 0){
      arrowLeft.style.display = 'none';
    }

    allSlides.style.transform = `translateX(-${currentOffset}px)`;
  });
}
