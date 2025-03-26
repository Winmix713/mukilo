  // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    mobileMenuButton.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      if (mobileNav.classList.contains('open')) {
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
      } else {
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    });
    
    // Search overlay toggle
    const searchButton = document.getElementById('search-button');
    const searchOverlay = document.getElementById('search-overlay');
    
    searchButton.addEventListener('click', () => {
      if (searchOverlay.style.display === 'none') {
        searchOverlay.style.display = 'block';
      } else {
        searchOverlay.style.display = 'none';
      }
    });
    
    // Close search overlay when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchButton.contains(e.target) && !searchOverlay.contains(e.target)) {
        searchOverlay.style.display = 'none';
      }
    });
    
    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    // Check for saved user preference
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      document.documentElement.classList.remove('dark');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
    
    themeToggle.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
    });
    
    // Tab switching in sandboxes
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(tab => {
      tab.addEventListener('click', () => {
        const parent = tab.closest('.sandbox-tabs');
        const tabContents = parent.nextElementSibling.querySelectorAll('.tab-content');
        const tabName = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs
        parent.querySelectorAll('.tab-item').forEach(t => {
          t.classList.remove('active');
        });
        
        // Hide all tab contents
        tabContents.forEach(content => {
          content.classList.remove('active');
        });
        
        // Activate selected tab and content
        tab.classList.add('active');
        document.getElementById(`${tabName}-content`) && document.getElementById(`${tabName}-content`).classList.add('active');
      });
    });
    
    // Prompt examples
    const improvedPrompts = {
      1: "Készíts egy reszponzív bejelentkező felületet tech startup cégeknek. A felhasználók email címmel vagy Google/GitHub fiókkal regisztrálhatnak. Legyen lehetőség jelszó visszaállítására és a bejelentkezési adatok megjegyzésére. A dizájn legyen minimalista, letisztult, világos színekkel és könnyen átlátható elrendezéssel. Legyen kompatibilis mobileszközökkel is.",
      2: "Készíts egy főoldalt egy egészségügyi alkalmazáshoz idősebb (65+ éves) felhasználók számára, akik számára fontos a könnyű használhatóság és az olvashatóság. Az alkalmazás fő célja, hogy segítsen a gyógyszerek időben történő bevételében és az orvosi időpontok nyomon követésében. A funkciók között legyen található: gyógyszeremlékeztető, időpontfoglalás, videó konzultáció és egészségügyi cikkek. A dizájn legyen könnyen olvasható nagy betűméretekkel, kontrasztos színekkel és egyértelmű ikonokkal.",
      3: "Készíts egy modern termékoldalt egy prémium vezeték nélküli fülhallgatóhoz, glassmorphism dizájn stílusban. A termék fekete és ezüst színben kapható, 24 órás akkumulátor-élettartammal, aktív zajszűréssel és vízálló kialakítással. Az oldal tartalmazzon: nagy termékképeket, technikai specifikációkat, vásárlói véleményeket, gyakran ismételt kérdéseket és egy vásárlási szekciót. Inspiráció: Apple.com termékoldalak letisztultsága és az átlátszó üveg hatás."
    };
    
    // Reset prompts
    const defaultPrompts = {
      1: "Kérek egy bejelentkező felületet.",
      2: "Készíts egy főoldalt egy egészségügyi alkalmazáshoz.",
      3: "Készíts egy modern termékoldalt."
    };
    
    // Handle prompt buttons for all examples
    for (let i = 1; i <= 3; i++) {
      const promptTextarea = document.getElementById(`prompt-${i}`);
      const resetButton = document.getElementById(`reset-prompt-${i}`);
      const improvedButton = document.getElementById(`use-improved-${i}`);
      const copyButton = document.getElementById(`copy-prompt-${i}`);
      
      if (promptTextarea && resetButton && improvedButton && copyButton) {
        resetButton.addEventListener('click', () => {
          promptTextarea.value = defaultPrompts[i];
        });
        
        improvedButton.addEventListener('click', () => {
          promptTextarea.value = improvedPrompts[i];
        });
        
        copyButton.addEventListener('click', () => {
          promptTextarea.select();
          document.execCommand('copy');
          copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Másolva`;
          setTimeout(() => {
            copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Másolás`;
          }, 2000);
        });
      }
    }
    
    // Mistakes filtering and search
    const mistakes = [
      {
        id: 'mistake-1',
        problem: 'Túl tág prompt',
        solution: 'Pontosabb követelményekkel javítsd! Adj meg konkrét funkciókat, stílust, méretet.',
        category: 'prompt'
      },
      {
        id: 'mistake-2',
        problem: 'Nem megfelelő stílus',
        solution: 'Adj vizuális referenciát! Hivatkozz konkrét stílusokra vagy küldj képet.',
        category: 'design'
      },
      {
        id: 'mistake-3',
        problem: 'Túl komplex UI',
        solution: 'Komponens alapú megközelítéssel oldd meg! Bontsd kisebb, kezelhetőbb egységekre.',
        category: 'complexity'
      },
      {
        id: 'mistake-4',
        problem: 'Inkonzisztens dizájn',
        solution: 'Használj stílus rendszert! Definiálj színeket, tipográfiát és komponenseket.',
        category: 'design'
      },
      {
        id: 'mistake-5',
        problem: 'Hiányos felhasználói folyamat',
        solution: 'Definiáld részletesen a lépéseket! Írd le az összes állapotot és interakciót.',
        category: 'ux'
      },
      {
        id: 'mistake-6',
        problem: 'Nem megfelelő visszajelzés',
        solution: 'Légy konkrét és konstruktív! Pontosan írd le, mit szeretnél változtatni.',
        category: 'feedback'
      },
      {
        id: 'mistake-7',
        problem: 'Nehezen módosítható kód',
        solution: 'Kérj moduláris struktúrát! Határozd meg, hogy mely részeket szeretnéd később módosítani.',
        category: 'code'
      },
      {
        id: 'mistake-8',
        problem: 'Nem reszponzív dizájn',
        solution: 'Határozd meg a breakpointokat! Adj meg legalább 3 képernyőméretet, amire optimalizálni szeretnéd.',
        category: 'design'
      }
    ];
    
    const mistakesGrid = document.getElementById('mistakes-grid');
    const searchInput = document.getElementById('mistakes-search');
    const filterItems = document.querySelectorAll('.filter-item');
    let activeFilter = 'mind';
    
    // Filter by category and search term
    function filterMistakes() {
      const searchTerm = searchInput.value.toLowerCase();
      
      // Clear the grid
      mistakesGrid.innerHTML = '';
      
      // Filter and create mistake cards
      const filteredMistakes = mistakes.filter(mistake => {
        const matchesSearch = 
          mistake.problem.toLowerCase().includes(searchTerm) || 
          mistake.solution.toLowerCase().includes(searchTerm);
        
        const matchesFilter = activeFilter === 'mind' || mistake.category === activeFilter;
        
        return matchesSearch && matchesFilter;
      });
      
      if (filteredMistakes.length === 0) {
        mistakesGrid.innerHTML = '<div class="text-center py-12"><p>Nincsenek találatok a keresési feltételeknek megfelelően.</p></div>';
        return;
      }
      
      // Add filtered mistakes to grid
      filteredMistakes.forEach(mistake => {
        const mistakeCard = document.createElement('div');
        mistakeCard.className = 'glass-card mistake-card';
        mistakeCard.dataset.category = mistake.category;
        
        mistakeCard.innerHTML = `
          <div class="mistake-header">
            <div class="mistake-header-content">
              <h3 class="mistake-title">${mistake.problem}</h3>
              <span class="category-badge">${getCategoryName(mistake.category)}</span>
            </div>
          </div>
          
          <div class="mistake-body">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <p class="mistake-solution">${mistake.solution}</p>
          </div>
        `;
        
        mistakesGrid.appendChild(mistakeCard);
      });
    }
    
    function getCategoryName(categoryId) {
      const categories = {
        'mind': 'Mind',
        'prompt': 'Prompt',
        'design': 'Dizájn',
        'ux': 'UX',
        'code': 'Kód',
        'complexity': 'Komplexitás',
        'feedback': 'Visszajelzés',
        'assets': 'Assetok'
      };
      
      return categories[categoryId] || categoryId;
    }
    
    // Event listeners for filtering
    searchInput.addEventListener('input', filterMistakes);
    
    filterItems.forEach(item => {
      item.addEventListener('click', () => {
        activeFilter = item.dataset.category;
        
        // Update active filter display
        filterItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        document.getElementById('filter-button').querySelector('span').textContent = `Szűrés: ${getCategoryName(activeFilter)}`;
        
        filterMistakes();
      });
    });
    
    // Initial load
    filterMistakes();
    
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();