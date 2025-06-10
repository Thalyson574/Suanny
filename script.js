document.addEventListener('DOMContentLoaded', function() {
  // ========== ELEMENTOS FLUTUANTES MELHORADOS ==========
  const floatingContainer = document.getElementById('floating-elements');
  const elements = ['🐄', '💙', '🖤', '🤍', '✨', '🐮', '🌸', '💕'];
  
  // Cria elementos flutuantes
  for (let i = 0; i < 20; i++) { // Reduzido de 30 para 20 elementos
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${Math.random() * 100}%`;
    element.style.fontSize = `${Math.random() * 1.5 + 1}em`; // Tamanho reduzido
    element.style.animationDuration = `${Math.random() * 40 + 30}s`; // Mais lento
    element.style.animationDelay = `${Math.random() * 5}s`;
    element.style.opacity = Math.random() * 0.5 + 0.3; // Opacidade reduzida
    floatingContainer.appendChild(element);
  }

  // ========== SISTEMA DE CORAÇÕES ==========
  const heartsContainer = document.getElementById('hearts-container');
  
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${Math.random() * 1.2 + 0.8}em`; // Tamanho reduzido
    heart.style.animationDuration = `${Math.random() * 5 + 4}s`; // Mais lento
    heartsContainer.appendChild(heart);
    
    // Remove o coração após a animação terminar
    setTimeout(() => {
      heart.remove();
    }, 9000); // Aumentado para combinar com animação mais lenta
  }
  
  // Cria corações periodicamente (intervalo aumentado)
  setInterval(createHeart, 1000);
  
  // Cria explosão de corações ao clicar (reduzida)
  function createHeartExplosion(x, y) {
    for (let i = 0; i < 10; i++) { // Reduzido de 15 para 10 corações
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = ['❤️', '💙', '💜', '🧡', '💛'][Math.floor(Math.random() * 5)];
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = `${Math.random() * 1.5 + 0.8}em`; // Tamanho reduzido
        heart.style.animationDuration = `${Math.random() * 4 + 3}s`; // Mais lento
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
          heart.remove();
        }, 7000); // Aumentado para combinar com animação mais lenta
      }, i * 150); // Intervalo aumentado
    }
  }

  // ========== CONTROLE DO SLIDESHOW ==========
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const indicatorsContainer = document.querySelector('.indicators');
  let currentSlide = 0;
  let isAnimating = false;

  // Cria indicadores
  slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  // Atualiza posição dos slides
  function updateSlidePosition() {
    slides.forEach((slide, index) => {
      slide.classList.remove('prev', 'active', 'next');
      
      if (index === currentSlide) {
        slide.classList.add('active');
      } else if (index < currentSlide) {
        slide.classList.add('prev');
      } else {
        slide.classList.add('next');
      }
    });
  }

  // Navegação
  function goToSlide(n) {
    if (isAnimating) return;
    
    isAnimating = true;
    currentSlide = (n + slides.length) % slides.length;
    
    updateSlidePosition();
    updateIndicators();
    
    // Cria explosão de corações ao mudar de slide (apenas quando avança)
    if (n > currentSlide) {
      createHeartExplosion(window.innerWidth / 2, window.innerHeight / 2);
    }
    
    setTimeout(() => {
      isAnimating = false;
    }, 1000); // Aumentado para combinar com transição mais lenta
  }

  function updateIndicators() {
    document.querySelectorAll('.indicator').forEach((ind, index) => {
      ind.classList.toggle('active', index === currentSlide);
    });
  }

  // Inicialização
  updateSlidePosition();

  // Event listeners
  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  // Controle por touch/swipe
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
    }, 120); // Velocidade reduzida
  }

  // ========== CONTROLE DE ÁUDIO ==========
  const audio = document.getElementById('bgAudio');
  const audioControl = document.getElementById('audio-control');
  const enableAudioBtn = document.getElementById('enable-audio');
  let audioEnabled = false;

  // Tenta autoplay
  function tryAutoplay() {
    audio.volume = 0.3; // Volume reduzido
    audio.play().then(() => {
      audioEnabled = true;
      audioControl.style.display = 'none';
    }).catch(error => {
      console.log("Autoplay bloqueado, aguardando interação:", error);
      audioControl.style.display = 'block';
    });
  }

  // Ativa com botão manual
  if (enableAudioBtn) {
    enableAudioBtn.addEventListener('click', () => {
      audio.volume = 0.3; // Volume reduzido
      audio.play().then(() => {
        audioEnabled = true;
        enableAudioBtn.innerHTML = '<i class="fas fa-volume-up"></i> Música Ativada!';
        setTimeout(() => {
          audioControl.style.opacity = '0';
          setTimeout(() => {
            audioControl.style.display = 'none';
          }, 300);
        }, 2000);
        // Cria explosão de corações ao ativar áudio
        createHeartExplosion(
          audioControl.offsetLeft + audioControl.offsetWidth / 2,
          audioControl.offsetTop + audioControl.offsetHeight / 2
        );
      });
    });
  }

  // Tenta autoplay inicial
  tryAutoplay();

  // Ativa com qualquer interação
  function enableAudioOnInteraction(e) {
    if (!audioEnabled) {
      tryAutoplay();
    }
    // Cria explosão de corações ao clicar em qualquer lugar
    createHeartExplosion(e.clientX, e.clientY);
  }

  document.addEventListener('click', enableAudioOnInteraction);
  document.addEventListener('touchstart', enableAudioOnInteraction);
});