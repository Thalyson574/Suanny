document.addEventListener('DOMContentLoaded', function() {
  // ========== ELEMENTOS FLUTUANTES MELHORADOS ==========
  const floatingContainer = document.getElementById('floating-elements');
  const elements = ['🐄', '💙', '🖤', '🤍', '✨', '🐮', '🌸', '💕'];
  const pngElements = ['imagem1.png', 'imagem2.png'];
  
  // Cria elementos flutuantes
  for (let i = 0; i < 20; i++) {
    const element = document.createElement(i % 2 === 0 ? 'div' : 'img');
    
    if (i % 2 === 0) {
      // Emojis
      element.className = 'floating';
      element.textContent = elements[Math.floor(Math.random() * elements.length)];
      element.style.fontSize = `${Math.random() * 1.5 + 1}em`;
    } else {
      // Imagens PNG
      element.className = 'floating-img';
      element.src = pngElements[Math.floor(Math.random() * pngElements.length)];
      element.style.width = `${Math.random() * 60 + 40}px`;
    }
    
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${Math.random() * 100}%`;
    element.style.animationDuration = `${Math.random() * 40 + 30}s`;
    element.style.animationDelay = `${Math.random() * 5}s`;
    element.style.opacity = '0.8';
    floatingContainer.appendChild(element);
  }

  // ========== SISTEMA DE CORAÇÕES ==========
  const heartsContainer = document.getElementById('hearts-container');
  
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${Math.random() * 1.2 + 0.8}em`;
    heart.style.animationDuration = `${Math.random() * 5 + 4}s`;
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 9000);
  }
  
  setInterval(createHeart, 1000);
  
  function createHeartExplosion(x, y) {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = ['❤️', '💙', '💜', '🧡', '💛'][Math.floor(Math.random() * 5)];
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = `${Math.random() * 1.5 + 0.8}em`;
        heart.style.animationDuration = `${Math.random() * 4 + 3}s`;
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
          heart.remove();
        }, 7000);
      }, i * 150);
    }
  }

  // ========== CONTROLE DO SLIDESHOW ==========
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const indicatorsContainer = document.querySelector('.indicators');
  let currentSlide = 0;
  let isAnimating = false;

  // Esconde todos os slides exceto o primeiro
  slides.forEach((slide, index) => {
    if (index !== 0) {
      slide.style.display = 'none';
    }
    
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  function updateSlidePosition() {
    slides.forEach((slide, index) => {
      slide.style.display = 'none';
      slide.classList.remove('prev', 'active', 'next');
      
      if (index === currentSlide) {
        slide.style.display = 'flex';
        slide.classList.add('active');
      }
    });
  }

  function goToSlide(n) {
    if (isAnimating) return;
    
    isAnimating = true;
    currentSlide = (n + slides.length) % slides.length;
    
    updateSlidePosition();
    updateIndicators();
    
    if (n > currentSlide) {
      createHeartExplosion(window.innerWidth / 2, window.innerHeight / 2);
    }
    
    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }

  function updateIndicators() {
    document.querySelectorAll('.indicator').forEach((ind, index) => {
      ind.classList.toggle('active', index === currentSlide);
    });
  }

  updateSlidePosition();

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      goToSlide(currentSlide + 1);
    } else if (touchEndX > touchStartX + 50) {
      goToSlide(currentSlide - 1);
    }
  }

  // ========== EFEITO DE DIGITAÇÃO ==========
  const typewriter = document.querySelector('.typewriter');
  if (typewriter) {
    const text = typewriter.textContent;
    typewriter.textContent = '';
    let i = 0;
    
    const typing = setInterval(() => {
      if (i < text.length) {
        typewriter.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 120);
  }

  // ========== CONTROLE DE ÁUDIO ==========
  const audio = document.getElementById('bgAudio');
  const audioControl = document.getElementById('audio-control');
  const enableAudioBtn = document.getElementById('enable-audio');
  let audioEnabled = false;

  function tryAutoplay() {
    audio.volume = 0.3;
    audio.play().then(() => {
      audioEnabled = true;
      audioControl.style.display = 'none';
    }).catch(error => {
      console.log("Autoplay bloqueado, aguardando interação:", error);
      audioControl.style.display = 'block';
    });
  }

  if (enableAudioBtn) {
    enableAudioBtn.addEventListener('click', () => {
      audio.volume = 0.3;
      audio.play().then(() => {
        audioEnabled = true;
        enableAudioBtn.innerHTML = '<i class="fas fa-volume-up"></i> Música Ativada!';
        setTimeout(() => {
          audioControl.style.opacity = '0';
          setTimeout(() => {
            audioControl.style.display = 'none';
          }, 300);
        }, 2000);
        createHeartExplosion(
          audioControl.offsetLeft + audioControl.offsetWidth / 2,
          audioControl.offsetTop + audioControl.offsetHeight / 2
        );
      });
    });
  }

  tryAutoplay();

  function enableAudioOnInteraction(e) {
    if (!audioEnabled) {
      tryAutoplay();
    }
    createHeartExplosion(e.clientX, e.clientY);
  }

  document.addEventListener('click', enableAudioOnInteraction);
  document.addEventListener('touchstart', enableAudioOnInteraction);
});