class StadiumsApp {
  constructor() {
    this.stadiums = [];
    this.filteredStadiums = [];
    this.searchTimeout = null;
    this.stadiumMatches = {}; // Store matches for each stadium
    
    // Israeli football clubs logos - using API-Sports with CORRECT team IDs
    this.teamLogos = {
      // Premier League teams
      'מכבי תל אביב': 'https://media.api-sports.io/football/teams/604.png',
      'מכבי תל-אביב': 'https://media.api-sports.io/football/teams/604.png',
      'מכבי חיפה': 'https://media.api-sports.io/football/teams/4195.png',
      'הפועל באר שבע': 'https://media.api-sports.io/football/teams/563.png',
      'בית״ר ירושלים': 'https://media.api-sports.io/football/teams/657.png',
      'בית"ר ירושלים': 'https://media.api-sports.io/football/teams/657.png',
      'ביתר ירושלים': 'https://media.api-sports.io/football/teams/657.png',
      'הפועל חיפה': 'https://media.api-sports.io/football/teams/2253.png',
      'בני סכנין': 'https://media.api-sports.io/football/teams/4481.png',
      'הפועל קטמון ירושלים': 'https://media.api-sports.io/football/teams/4486.png',
      'מכבי פתח תקווה': 'https://media.api-sports.io/football/teams/4495.png',
      'מכבי פתח-תקווה': 'https://media.api-sports.io/football/teams/4495.png',
      'הפועל חדרה': 'https://media.api-sports.io/football/teams/4500.png',
      'מכבי נתניה': 'https://media.api-sports.io/football/teams/4505.png',
      'מ.ס. אשדוד': 'https://media.api-sports.io/football/teams/4507.png',
      'עירוני קריית שמונה': 'https://media.api-sports.io/football/teams/4510.png',
      'הפועל קריית שמונה': 'https://media.api-sports.io/football/teams/4510.png',
      'עירוני טבריה': 'https://media.api-sports.io/football/teams/6181.png',
      'מכבי בני ריינה': 'https://media.api-sports.io/football/teams/6186.png',
      // Additional teams
      'הפועל תל אביב': 'https://media.api-sports.io/football/teams/4501.png',
      'הפועל תל-אביב': 'https://media.api-sports.io/football/teams/4501.png',
      'הפועל נוף הגליל': 'https://media.api-sports.io/football/teams/4487.png',
      'הפועל נוף-הגליל': 'https://media.api-sports.io/football/teams/4487.png',
      'הפועל רמת גן': 'https://media.api-sports.io/football/teams/4489.png',
      'הפועל רמת-גן': 'https://media.api-sports.io/football/teams/4489.png',
      'הפועל רעננה': 'https://media.api-sports.io/football/teams/4509.png',
      'בני יהודה': 'https://media.api-sports.io/football/teams/4508.png',
      'בני יהודה תל-אביב': 'https://media.api-sports.io/football/teams/4508.png',
      'הפועל כפר שלם': 'https://media.api-sports.io/football/teams/6160.png',
      'מכבי יפו': 'https://media.api-sports.io/football/teams/6192.png',
      'מ.ס. כפר קאסם': 'https://media.api-sports.io/football/teams/4493.png',
      'מ.ס. כפר קסאם': 'https://media.api-sports.io/football/teams/4493.png',
      'כפר קאסם': 'https://media.api-sports.io/football/teams/4493.png',
      'הפועל עפולה': '/images/logos/Hapoel_Afula.png',
      'הפועל ראשון לציון': 'https://media.api-sports.io/football/teams/4491.png',
      'הפועל ראשון-לציון': 'https://media.api-sports.io/football/teams/4491.png',
      'הפועל פתח תקווה': 'https://media.api-sports.io/football/teams/4488.png',
      'הפועל פתח-תקווה': 'https://media.api-sports.io/football/teams/4488.png',
      'הפועל ירושלים': 'https://media.api-sports.io/football/teams/4504.png',
      'הפועל עכו': 'https://media.api-sports.io/football/teams/4482.png',
      'מ.ס קריית ים': 'https://media.api-sports.io/football/teams/20105.png',
      'מ.ס. קריית ים': 'https://media.api-sports.io/football/teams/20105.png',
      'מ.ס. קריית-ים': 'https://media.api-sports.io/football/teams/20105.png',
      'הפועל כפר סבא': 'https://media.api-sports.io/football/teams/4497.png',
      'מכבי הרצליה': 'https://media.api-sports.io/football/teams/4503.png',
      'הפועל פתח תקווה': 'https://upload.wikimedia.org/wikipedia/en/0/09/Hapoel_Petah_Tikva_FC_logo.svg',
      'הפועל ראשון לציון': 'https://upload.wikimedia.org/wikipedia/en/6/6c/Hapoel_Rishon_LeZion_FC_logo.svg',
      'מכבי בן גוריון': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Soccer_ball.svg/50px-Soccer_ball.svg.png',
      'מכבי יבנה': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Soccer_ball.svg/50px-Soccer_ball.svg.png',
      'מכבי קבליו': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Soccer_ball.svg/50px-Soccer_ball.svg.png',
      'מכבי כפר קאסם': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Soccer_ball.svg/50px-Soccer_ball.svg.png',
      'אשקלון': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Soccer_ball.svg/50px-Soccer_ball.svg.png',
      'הפועל אום אל-פחם': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Soccer_ball.svg/50px-Soccer_ball.svg.png',
      'הפועל אשקלון': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Soccer_ball.svg/50px-Soccer_ball.svg.png',
      'הפועל קטמון ירושלים': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Soccer_ball.svg/50px-Soccer_ball.svg.png',
      'מכבי ראשון לציון': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Soccer_ball.svg/50px-Soccer_ball.svg.png',
      'בית״ר ירושלים': 'https://upload.wikimedia.org/wikipedia/en/d/d7/Beitar_Jerusalem_FC_logo.svg',
      'מכבי חדרה': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Soccer_ball.svg/50px-Soccer_ball.svg.png',
      'הפועל תל אביב / אלקטרה': 'https://upload.wikimedia.org/wikipedia/en/b/b7/Hapoel_Tel_Aviv_FC_logo.svg'
    };
    
    this.initializeElements();
    this.attachEventListeners();
    this.loadStadiums();
  }

  initializeElements() {
    this.elements = {
      searchInput: document.getElementById('searchInput'),
      searchBtn: document.getElementById('searchBtn'),
      searchSuggestions: document.getElementById('searchSuggestions'),
      sortSelect: document.getElementById('sortSelect'),
      loading: document.getElementById('loading'),
      errorMessage: document.getElementById('errorMessage'),
      resultsCount: document.getElementById('resultsCount'),
      countText: document.getElementById('countText'),
      stadiumsGrid: document.getElementById('stadiumsGrid'),
      stadiumModal: document.getElementById('stadiumModal'),
      closeModal: document.getElementById('closeModal'),
      modalContent: document.getElementById('modalContent')
    };
  }

  attachEventListeners() {
    // Search functionality
    this.elements.searchInput.addEventListener('input', (e) => {
      this.performSearch(e.target.value);
      this.handleSearch(e.target.value);
    });

    this.elements.searchBtn.addEventListener('click', () => {
      this.performSearch(this.elements.searchInput.value);
      this.hideSuggestions();
    });

    // Sort functionality
    this.elements.sortSelect.addEventListener('change', () => {
      this.sortAndRenderStadiums();
    });

    // Modal functionality
    this.elements.closeModal.addEventListener('click', () => {
      this.hideModal();
    });

    this.elements.stadiumModal.addEventListener('click', (e) => {
      if (e.target === this.elements.stadiumModal) {
        this.hideModal();
      }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.elements.searchInput.contains(e.target) && 
          !this.elements.searchSuggestions.contains(e.target)) {
        this.hideSuggestions();
      }
    });

    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.elements.stadiumModal.classList.contains('hidden')) {
        this.hideModal();
      }
    });

    // League table toggle handlers
    this.attachTableToggleHandlers();
  }

  async loadStadiums() {
    this.showLoading();
    try {
      const response = await fetch('/api/stadiums');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.stadiums = await response.json();
      this.filteredStadiums = [...this.stadiums];
      
      this.sortAndRenderStadiums();
      this.loadStandings(); // Load league standings
      this.hideLoading();
    } catch (error) {
      console.error('Error loading stadiums:', error);
      this.showError();
    }
  }

  showLoading() {
    this.elements.loading.classList.remove('hidden');
    this.elements.errorMessage.classList.add('hidden');
    this.elements.stadiumsGrid.innerHTML = '';
    this.elements.resultsCount.classList.add('hidden');
  }

  hideLoading() {
    this.elements.loading.classList.add('hidden');
  }

  showError() {
    this.elements.loading.classList.add('hidden');
    this.elements.errorMessage.classList.remove('hidden');
    this.elements.resultsCount.classList.add('hidden');
  }

  handleSearch(query) {
    clearTimeout(this.searchTimeout);
    
    if (query.length >= 2) {
      this.searchTimeout = setTimeout(() => {
        this.showSuggestions(query);
      }, 300);
    } else {
      this.hideSuggestions();
    }
  }

  showSuggestions(query) {
    const suggestions = this.stadiums.filter(stadium => 
      (stadium.name_hebrew && stadium.name_hebrew.includes(query)) ||
      (stadium.name_english && stadium.name_english.toLowerCase().includes(query.toLowerCase())) ||
      (stadium.city && stadium.city.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 5);

    if (suggestions.length === 0) {
      this.hideSuggestions();
      return;
    }

    const suggestionsHTML = suggestions.map(stadium => `
      <div class="suggestion-item" data-stadium-id="${stadium.id}">
        <strong>${stadium.name_hebrew}</strong> - ${stadium.city}
      </div>
    `).join('');

    this.elements.searchSuggestions.innerHTML = suggestionsHTML;
    this.elements.searchSuggestions.classList.remove('hidden');

    // Add click handlers for suggestions
    this.elements.searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const stadiumId = parseInt(item.dataset.stadiumId);
        this.showStadiumModal(stadiumId);
        this.hideSuggestions();
      });
    });
  }

  hideSuggestions() {
    this.elements.searchSuggestions.classList.add('hidden');
    this.elements.searchSuggestions.innerHTML = '';
  }

  performSearch(query) {
    if (!query.trim()) {
      this.filteredStadiums = [...this.stadiums];
    } else {
      this.filteredStadiums = this.stadiums.filter(stadium =>
        (stadium.name_hebrew && stadium.name_hebrew.includes(query)) ||
        (stadium.name_english && stadium.name_english.toLowerCase().includes(query.toLowerCase())) ||
        (stadium.city && stadium.city.toLowerCase().includes(query.toLowerCase())) ||
        (stadium.clubs_playing && stadium.clubs_playing.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    this.sortAndRenderStadiums();
  }

  sortAndRenderStadiums() {
    const sortBy = this.elements.sortSelect.value;
    
    // Create a copy to sort
    let sorted = [...this.filteredStadiums];
    
    switch (sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name_hebrew.localeCompare(b.name_hebrew, 'he'));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name_hebrew.localeCompare(a.name_hebrew, 'he'));
        break;
      case 'location-south':
        // South to North (lower latitude to higher latitude)
        sorted.sort((a, b) => (a.latitude || 0) - (b.latitude || 0));
        break;
      case 'location-north':
        // North to South (higher latitude to lower latitude)
        sorted.sort((a, b) => (b.latitude || 0) - (a.latitude || 0));
        break;
      case 'capacity-desc':
        sorted.sort((a, b) => (b.capacity || 0) - (a.capacity || 0));
        break;
      case 'capacity-asc':
        sorted.sort((a, b) => (a.capacity || 0) - (b.capacity || 0));
        break;
    }
    
    this.filteredStadiums = sorted;
    this.renderStadiums();
    this.updateResultsCount();
  }

  renderStadiums() {
    if (this.filteredStadiums.length === 0) {
      this.elements.stadiumsGrid.innerHTML = `
        <div class="text-center" style="grid-column: 1 / -1; padding: 3rem;">
          <h3>No stadiums found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      `;
      return;
    }

    const stadiumsHTML = this.filteredStadiums.map(stadium => this.createStadiumCard(stadium)).join('');
    this.elements.stadiumsGrid.innerHTML = stadiumsHTML;
    
    // Add click handlers to stadium cards
    this.attachStadiumCardHandlers();
  }

  attachStadiumCardHandlers() {
    // Add click handlers to team logos to open fixtures filtered by team
    this.elements.stadiumsGrid.querySelectorAll('.clickable-logo').forEach(logo => {
      logo.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click
        const teamName = logo.dataset.teamName;
        const stadiumId = parseInt(logo.dataset.stadiumId);
        this.showStadiumModalWithTeamFilter(stadiumId, teamName);
      });
    });
    
    // Add click handlers to all stadium cards
    this.elements.stadiumsGrid.querySelectorAll('.stadium-card').forEach(card => {
      card.addEventListener('click', () => {
        const stadiumId = parseInt(card.dataset.stadiumId);
        this.showStadiumModal(stadiumId);
      });
    });
  }
  
  showStadiumModalWithTeamFilter(stadiumId, teamName) {
    // Store the team filter to apply after modal loads
    this.pendingTeamFilter = { stadiumId, teamName };
    
    // Show the modal (it will stay on overview tab)
    this.showStadiumModal(stadiumId);
    
    // Wait for modal content to load, then apply team filter
    setTimeout(() => {
      this.applyTeamFilterInOverview(stadiumId, teamName);
    }, 500);
  }
  
  applyTeamFilterInOverview(stadiumId, teamName) {
    // Uncheck all team checkboxes except the selected one
    const checkboxes = document.querySelectorAll(`.team-checkbox[data-stadium-id="${stadiumId}"]`);
    
    checkboxes.forEach(checkbox => {
      if (checkbox.value === teamName) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });
    
    // Apply the filter
    this.filterMatchesByTeams(stadiumId);
    
    // Keep the team filter dropdown collapsed, but add a highlight message
    const filterContainer = document.getElementById(`team-filter-${stadiumId}`);
    if (filterContainer) {
      // Keep it collapsed (don't expand it)
      filterContainer.style.display = 'none';
      const toggleIcon = document.getElementById(`filter-toggle-${stadiumId}`);
      if (toggleIcon) toggleIcon.textContent = '▼';
      
      // Add highlight message above the collapsed filter
      const filterHeader = filterContainer.parentElement?.querySelector('.team-filter-header');
      if (filterHeader && !filterHeader.querySelector('.team-filter-highlight')) {
        const highlight = document.createElement('div');
        highlight.className = 'team-filter-highlight';
        highlight.style.cssText = 'background: var(--accent-color); color: white; padding: 8px 12px; border-radius: 6px; margin-top: 8px; text-align: center; font-weight: 600; animation: fadeIn 0.3s;';
        highlight.innerHTML = `מציג רק משחקים של ${teamName} <button onclick="window.stadiumsApp.clearTeamFilter(${stadiumId})" style="background: white; color: var(--accent-color); border: none; padding: 4px 10px; border-radius: 4px; margin-right: 8px; cursor: pointer; font-weight: 600;">הצג הכל</button>`;
        filterHeader.after(highlight);
        
        // Auto-remove highlight after 5 seconds
        setTimeout(() => {
          highlight.style.animation = 'fadeOut 0.3s';
          setTimeout(() => highlight.remove(), 300);
        }, 5000);
      }
    }
    
    // Clear the pending filter
    this.pendingTeamFilter = null;
  }
  
  filterFixturesByTeam(teamName) {
    const fixturesContainer = document.querySelector('.tab-content[data-tab="fixtures"]');
    if (!fixturesContainer) return;
    
    const allFixtures = fixturesContainer.querySelectorAll('.fixture-item');
    allFixtures.forEach(fixture => {
      const homeTeam = fixture.querySelector('.fixture-team.home')?.textContent || '';
      const awayTeam = fixture.querySelector('.fixture-team.away')?.textContent || '';
      
      if (homeTeam.includes(teamName) || awayTeam.includes(teamName)) {
        fixture.style.display = '';
      } else {
        fixture.style.display = 'none';
      }
    });
    
    // Show a message about the filter
    const existingMessage = fixturesContainer.querySelector('.team-filter-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = 'team-filter-message';
    message.innerHTML = `
      <div style="background: var(--accent-color); color: white; padding: 12px; border-radius: 8px; margin-bottom: 16px; text-align: center;">
        מציג משחקים של <strong>${teamName}</strong>
        <button onclick="app.clearFixturesFilter()" style="background: white; color: var(--accent-color); border: none; padding: 4px 12px; border-radius: 4px; margin-right: 12px; cursor: pointer; font-weight: 600;">נקה סינון</button>
      </div>
    `;
    fixturesContainer.insertBefore(message, fixturesContainer.firstChild);
  }
  
  clearFixturesFilter() {
    this.selectedTeamForFixtures = null;
    const fixturesContainer = document.querySelector('.tab-content[data-tab="fixtures"]');
    if (!fixturesContainer) return;
    
    // Show all fixtures
    const allFixtures = fixturesContainer.querySelectorAll('.fixture-item');
    allFixtures.forEach(fixture => {
      fixture.style.display = '';
    });
    
    // Remove filter message
    const existingMessage = fixturesContainer.querySelector('.team-filter-message');
    if (existingMessage) {
      existingMessage.remove();
    }
  }

  createStadiumCard(stadium) {
    // Create teams list with logos from API-Sports
    const teamsList = stadium.clubs_playing.split(', ').map(team => team.trim());
    const logosHTML = teamsList.map(team => {
      const logoUrl = this.getTeamLogo(team);
      return `<img src="${logoUrl}" class="team-logo-icon clickable-logo" data-team-name="${team}" data-stadium-id="${stadium.id}" alt="${team}" title="לחץ כדי לראות משחקי ${team}">`;
    }).join('');
    
    const teamsHTML = teamsList.map(team => {
      return `<span class="team-name-item">${team}</span>`;
    }).join('');
    
    return `
      <div class="stadium-card" data-stadium-id="${stadium.id}">
        <div class="stadium-card__logos">
          ${logosHTML}
        </div>
        <div class="stadium-card__content">
          <h3 class="stadium-card__title">${stadium.name_hebrew}</h3>
          <div class="stadium-card__info">
            <div class="stadium-card__info-item">
              <span class="stadium-card__info-label">עיר</span>
              <span class="stadium-card__info-value">${stadium.city || 'N/A'}</span>
            </div>
            <div class="stadium-card__info-item">
              <span class="stadium-card__info-label">קבוצות (${stadium.teams_count || teamsList.length})</span>
              <div class="stadium-card__teams-list">${teamsHTML}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  updateResultsCount() {
    const count = this.filteredStadiums.length;
    const text = count === 1 ? '1 אצטדיון נמצא' : `${count} אצטדיונים נמצאו`;
    this.elements.countText.textContent = text;
    this.elements.resultsCount.classList.remove('hidden');
  }

  async showStadiumModal(stadiumId) {
    try {
      // Show modal and loading state
      this.elements.stadiumModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      this.elements.modalContent.innerHTML = '<div class="loading-spinner">טוען פרטי אצטדיון...</div>';
      
      // Get enhanced stadium details
      const response = await fetch(`/api/stadiums/${stadiumId}/details`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const stadium = await response.json();
      this.renderEnhancedStadiumModal(stadium, stadiumId);
      
    } catch (error) {
      console.error('Error loading stadium details:', error);
      this.elements.modalContent.innerHTML = `
        <div class="error-state" style="text-align: center; padding: 40px;">
          <p>שגיאה בטעינת פרטי האצטדיון</p>
          <button onclick="location.reload()">נסה שוב</button>
        </div>
      `;
    }
  }

  renderEnhancedStadiumModal(stadium, stadiumId) {
    // Parse teams list for better display
    const teamsList = stadium.clubs_playing ? stadium.clubs_playing.split(', ').map(team => team.trim()) : [];
    const teamsHTML = teamsList.length > 0 
        ? teamsList.map(team => `<span class="team-tag">${team}</span>`).join('')
        : 'N/A';

    // Create enhanced modal with tabs
    const modalHTML = `
      <div class="modal-stadium">
        <div class="modal-stadium__header">
          <h2 class="modal-stadium__title">${stadium.name_hebrew}</h2>
        </div>
        
        <!-- Tab Navigation -->
        <div class="tab-buttons">
          <button class="tab-button active" data-tab="overview">סקירה כללית</button>
          <button class="tab-button" data-tab="dining">מסעדות וברים</button>
          <button class="tab-button" data-tab="parking">חניה ותחבורה ציבורית</button>
        </div>
        
        <!-- Overview Tab -->
        <div class="tab-content active" id="overview-tab">
          <div class="detail-row">
            <span class="detail-label">📍 עיר:</span>
            <span class="detail-value">${stadium.city || 'N/A'}</span>
          </div>

          ${stadium.latitude && stadium.longitude ? `
          <div style="margin: 15px 0;">
            <button class="compact-map-btn" onclick="window.stadiumsApp.openInMaps(${stadium.latitude}, ${stadium.longitude})">
              🧭 נווט לאצטדיון
            </button>
          </div>
          ` : ''}

          ${teamsList.length > 1 ? `
          <div class="team-filter">
            <div class="team-filter-header" onclick="window.stadiumsApp.toggleTeamFilter(${stadiumId})">
              <label style="cursor: pointer;">
                <span class="filter-toggle-icon" id="filter-toggle-${stadiumId}">▼</span>
                סנן לפי קבוצות <span class="team-count" id="team-count-${stadiumId}">(${teamsList.length}/${teamsList.length})</span>
              </label>
              <button class="filter-clear-btn" onclick="event.stopPropagation(); window.stadiumsApp.clearTeamFilter(${stadiumId})">
                <span>🔄</span> איפוס
              </button>
            </div>
            <div class="team-filter-checkboxes" id="team-filter-${stadiumId}" style="display: none;">
              ${teamsList.map(team => {
                const logoUrl = this.getTeamLogo(team);
                return `
                <label class="team-checkbox-label">
                  <input type="checkbox" 
                         class="team-checkbox" 
                         value="${team}" 
                         data-stadium-id="${stadiumId}"
                         data-total-teams="${teamsList.length}"
                         checked
                         onchange="window.stadiumsApp.filterMatchesByTeams(${stadiumId})">
                  <img src="${logoUrl}" alt="${team}" class="team-logo">
                  <span class="checkbox-text">${team}</span>
                </label>
              `}).join('')}
            </div>
          </div>
          ` : ''}
          
          <div class="matches-section">
            <div class="matches-section-header" onclick="window.stadiumsApp.toggleMatches(${stadiumId})">
              <h3>⚽ משחקים קרובים</h3>
              <span class="toggle-icon" id="toggle-icon-${stadiumId}">🔽</span>
            </div>
            <div id="upcoming-matches-${stadiumId}" class="matches-container" data-stadium-id="${stadiumId}">
              <div class="loading-spinner">טוען משחקים...</div>
            </div>
          </div>
          
          <div class="stats-grid">
            <div class="stat-card clickable" data-category="restaurants" onclick="window.stadiumsApp.switchToNearbyCategory('restaurants')">
              <span class="stat-icon">🍽️</span>
              <span class="stat-number">...</span>
              <div class="stat-label">מסעדות</div>
            </div>
            <div class="stat-card clickable" data-category="bars" onclick="window.stadiumsApp.switchToNearbyCategory('bars')">
              <span class="stat-icon">🍺</span>
              <span class="stat-number">...</span>
              <div class="stat-label">ברים</div>
            </div>
            <div class="stat-card clickable" data-category="parking" onclick="window.stadiumsApp.switchToNearbyCategory('parking')">
              <span class="stat-icon">🅿️</span>
              <span class="stat-number">...</span>
              <div class="stat-label">חניות</div>
            </div>
            <div class="stat-card clickable" data-category="transit" onclick="window.stadiumsApp.switchToNearbyCategory('transit')">
              <span class="stat-icon">🚌</span>
              <span class="stat-number">...</span>
              <div class="stat-label">תחבורה ציבורית</div>
            </div>
          </div>
        </div>
        
        <!-- Dining Tab (Restaurants & Bars Combined) -->
        <div class="tab-content" id="dining-tab">
          <button class="refresh-btn" onclick="window.stadiumsApp.refreshDining(${stadiumId})">
            🔄 רענן נתונים מ-Google Places
          </button>
          
          <div class="dining-section">
            <h3>🍽️ מסעדות וברים בסביבה</h3>
            <div id="nearby-dining" class="nearby-places nearby-places-grid">
              <div class="loading-spinner">טוען מקומות אוכל ושתייה מ-Google Places...</div>
            </div>
          </div>
        </div>
        
        <!-- Parking and Public Transport Tab -->
        <div class="tab-content" id="parking-tab">
          <button class="refresh-btn" onclick="window.stadiumsApp.refreshParking(${stadiumId})">
            🔄 רענן נתונים מ-Google Places
          </button>
          
          <div class="parking-section collapsible-section">
            <h3 class="collapsible-title collapsed">🅿️ חניות בסביבה</h3>
            <div class="collapsible-content collapsed" id="nearby-parking">
              <div class="loading-spinner">טוען חניות מ-Google Places...</div>
            </div>
          </div>
          
          <div class="transit-section collapsible-section" style="margin-top: 30px;">
            <h3 class="collapsible-title collapsed">🚌 תחבורה ציבורית</h3>
            <div class="collapsible-content collapsed">
              <button class="action-btn secondary" onclick="window.stadiumsApp.loadTransitInfo(${stadiumId})" style="margin-bottom: 15px;">
                טען תחנות אוטובוס ורכבת
              </button>
              <div id="transit-info-parking" class="nearby-places">
                <div class="no-data">לחץ על הכפתור לקבלת מידע על תחנות אוטובוס ורכבת בקרבת מקום</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.elements.modalContent.innerHTML = modalHTML;
    
    // Add tab switching functionality
    this.setupTabs();
    
    // Load upcoming matches
    this.loadUpcomingMatches(stadiumId);
    
    // Load nearby places - now works with mock data for all stadiums
    console.log(`About to load nearby places for stadium ${stadiumId}`);
    this.loadNearbyPlaces(stadiumId);
    console.log(`Called loadNearbyPlaces for stadium ${stadiumId}`);
  }

  setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');
      });
    });
  }

  async loadUpcomingMatches(stadiumId) {
    console.log(`Loading upcoming matches for stadium ${stadiumId}`);
    const container = document.getElementById(`upcoming-matches-${stadiumId}`);
    console.log('Container found:', container);
    
    if (!container) {
      console.error(`Container not found: upcoming-matches-${stadiumId}`);
      return;
    }

    try {
      console.log('Fetching matches from API...');
      const response = await fetch(`/api/stadiums/${stadiumId}/matches`);
      const data = await response.json();
      console.log('Matches data received:', data);
      
      if (!data.matches || data.matches.length === 0) {
        console.log('No matches found');
        container.innerHTML = '<div class="no-data">אין משחקים קרובים מתוכננים</div>';
        return;
      }

      console.log(`Found ${data.matches.length} matches`);
      
      // Store matches for this stadium
      this.stadiumMatches[stadiumId] = {
        allMatches: data.matches,
        teams: data.teams
      };
      
      // Render all matches initially
      this.renderMatches(stadiumId, data.matches);

    } catch (error) {
      console.error('Error loading matches:', error);
      container.innerHTML = '<div class="no-data">שגיאה בטעינת משחקים</div>';
    }
  }

  renderMatches(stadiumId, matches) {
    const container = document.getElementById(`upcoming-matches-${stadiumId}`);
    if (!container) return;

    if (!matches || matches.length === 0) {
      container.innerHTML = '<div class="no-data">אין משחקים קרובים מתוכננים</div>';
      return;
    }

    const matchesHTML = matches.map(match => {
        const matchDate = new Date(match.date);
        const dateStr = matchDate.toLocaleDateString('he-IL', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        const timeStr = matchDate.toLocaleTimeString('he-IL', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });

        // Calculate days until match - fix timezone issues
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const matchDay = new Date(matchDate.getFullYear(), matchDate.getMonth(), matchDate.getDate());
        const daysUntil = Math.round((matchDay - today) / (1000 * 60 * 60 * 24));
        const daysText = daysUntil === 0 ? 'היום' : daysUntil === 1 ? 'מחר' : `בעוד ${daysUntil} ימים`;

        // Check if match is live or has live data
        const isLive = match.status?.short === 'LIVE' || match.status?.short === '1H' || match.status?.short === '2H' || match.status?.short === 'HT';
        const hasScore = match.goals && (match.goals.home !== null || match.goals.away !== null);
        
        return `
          <div class="match-card ${isLive ? 'live' : 'upcoming'}" data-match-id="${match.id}">
            <div class="match-header">
              <span class="match-league">${match.league.name}</span>
              ${isLive ? 
                `<span class="match-status status-live">🔴 ${match.status.elapsed || 0}'</span>` :
                `<span class="match-status status-upcoming">${daysText}</span>`
              }
            </div>
            <div class="match-teams">
              <div class="match-team home">
                <img src="${match.home.logo}" alt="${match.home.name}" class="team-logo">
                <span class="team-name">${match.home.name}</span>
              </div>
              <div class="match-score">
                ${hasScore ? 
                  `<span class="score">${match.goals.home || 0} - ${match.goals.away || 0}</span>` :
                  `<span class="match-vs">VS</span>`
                }
              </div>
              <div class="match-team away">
                <span class="team-name">${match.away.name}</span>
                <img src="${match.away.logo}" alt="${match.away.name}" class="team-logo">
              </div>
            </div>
            ${this.renderMatchEvents(match)}
            <div class="match-info">
              <span class="match-date">📅 ${dateStr}</span>
              <span class="match-time">🕐 ${timeStr}</span>
            </div>
            <div class="match-actions">
              <button class="btn-add-calendar" data-match-id="${match.id}" title="הוסף ליומן">
                📅 הוסף ליומן
              </button>
            </div>
          </div>
        `;
      }).join('');

      container.innerHTML = matchesHTML;
      
      // Add event listeners to calendar buttons
      container.querySelectorAll('.btn-add-calendar').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const matchId = parseInt(btn.dataset.matchId);
          const match = matches.find(m => m.id === matchId);
          if (match) {
            this.addToCalendar(match);
          }
        });
      });
  }

  filterMatchesByTeams(stadiumId) {
    console.log(`Filtering matches for stadium ${stadiumId}`);
    const matchesData = this.stadiumMatches[stadiumId];
    if (!matchesData) {
      console.error('No matches data found for stadium', stadiumId);
      return;
    }

    // Get all checked team checkboxes
    const filterContainer = document.getElementById(`team-filter-${stadiumId}`);
    if (!filterContainer) return;

    const allCheckboxes = filterContainer.querySelectorAll('.team-checkbox');
    const checkboxes = filterContainer.querySelectorAll('.team-checkbox:checked');
    const selectedTeams = Array.from(checkboxes).map(cb => cb.value);

    // Update counter
    const counter = document.getElementById(`team-count-${stadiumId}`);
    if (counter) {
      counter.textContent = `(${selectedTeams.length}/${allCheckboxes.length})`;
      counter.style.color = selectedTeams.length === allCheckboxes.length ? 'var(--secondary-color)' : 'var(--primary-color)';
    }

    console.log('Selected teams:', selectedTeams);

    // Filter matches based on selected teams
    let filteredMatches;
    if (selectedTeams.length === 0) {
      // No teams selected - show message
      const container = document.getElementById(`upcoming-matches-${stadiumId}`);
      if (container) {
        container.innerHTML = '<div class="no-data">בחר לפחות קבוצה אחת</div>';
      }
      return;
    } else {
      // Filter by selected teams
      filteredMatches = matchesData.allMatches.filter(match => 
        selectedTeams.includes(match.home.nameHebrew)
      );
    }

    console.log(`Filtered ${filteredMatches.length} matches`);
    this.renderMatches(stadiumId, filteredMatches);
  }

  renderMatchEvents(match) {
    // Check if match has live events (goals, cards, etc.)
    if (!match.events || match.events.length === 0) {
      return '';
    }

    const events = match.events
      .filter(event => ['Goal', 'Card'].includes(event.type))
      .slice(0, 5) // Show max 5 events
      .map(event => {
        const icon = event.type === 'Goal' ? '⚽' : (event.detail === 'Red Card' ? '🟥' : '🟨');
        const time = event.time?.elapsed || '';
        return `<span class="match-event">${icon} ${event.player?.name || ''} ${time}'</span>`;
      })
      .join('');

    return events ? `<div class="match-events">${events}</div>` : '';
  }

  addToCalendar(match) {
    // Create ICS calendar file
    const matchDate = new Date(match.date);
    const endDate = new Date(matchDate.getTime() + (2 * 60 * 60 * 1000)); // 2 hours duration

    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const homeTeam = match.home.nameHebrew || match.home.name;
    const awayTeam = match.away.nameHebrew || match.away.name;
    const venue = match.venue || 'אצטדיון';
    
    const title = `${homeTeam} נגד ${awayTeam}`;
    const location = venue;
    const description = `משחק כדורגל: ${homeTeam} מארח את ${awayTeam}\nליגה: ${match.league.name}`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Israeli Football Stadiums//Stadium App//HE',
      'BEGIN:VEVENT',
      `UID:match-${match.id}@fanstadiums.com`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(matchDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'DESCRIPTION:תזכורת למשחק',
      'ACTION:DISPLAY',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    // Create download link
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `match-${homeTeam}-vs-${awayTeam}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show success message
    this.showMessage('✓ הקובץ הורד! פתח אותו כדי להוסיף את המשחק ליומן', 'success');
  }

  showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `app-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#4caf50' : '#2196F3'};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(messageDiv);
    setTimeout(() => {
      messageDiv.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
  }

  clearTeamFilter(stadiumId) {
    const filterContainer = document.getElementById(`team-filter-${stadiumId}`);
    if (!filterContainer) return;

    const checkboxes = filterContainer.querySelectorAll('.team-checkbox');
    checkboxes.forEach(cb => cb.checked = true);
    
    // Remove highlight message if present
    const highlight = document.querySelector('.team-filter-highlight');
    if (highlight) highlight.remove();
    
    this.filterMatchesByTeams(stadiumId);
  }

  toggleMatches(stadiumId) {
    const container = document.getElementById(`upcoming-matches-${stadiumId}`);
    const icon = document.getElementById(`toggle-icon-${stadiumId}`);
    
    if (container && icon) {
      const isCollapsed = container.style.display === 'none';
      container.style.display = isCollapsed ? 'flex' : 'none';
      icon.textContent = isCollapsed ? '🔽' : '🔼';
    }
  }

  toggleOpeningHours(event, placeId) {
    event.preventDefault();
    event.stopPropagation();
    
    const hoursDiv = document.getElementById(`hours-${placeId}`);
    const arrow = event.currentTarget.querySelector('.toggle-arrow');
    
    if (hoursDiv && arrow) {
      const isHidden = hoursDiv.style.display === 'none';
      hoursDiv.style.display = isHidden ? 'block' : 'none';
      arrow.textContent = isHidden ? '▲' : '▼';
    }
  }

  toggleTeamFilter(stadiumId) {
    const filterCheckboxes = document.getElementById(`team-filter-${stadiumId}`);
    const toggleIcon = document.getElementById(`filter-toggle-${stadiumId}`);
    
    if (filterCheckboxes && toggleIcon) {
      const isCollapsed = filterCheckboxes.style.display === 'none';
      filterCheckboxes.style.display = isCollapsed ? 'block' : 'none';
      toggleIcon.textContent = isCollapsed ? '▲' : '▼';
    }
  }

  async loadNearbyPlaces(stadiumId) {
    console.log(`Loading nearby places for stadium ${stadiumId}`);
    // Load both dining and parking
    await Promise.all([
      this.loadDining(stadiumId),
      this.loadParking(stadiumId)
    ]);
  }

  async loadDining(stadiumId) {
    try {
      // Load restaurants
      console.log('Fetching restaurants...');
      const restaurants = await this.fetchNearbyPlaces(stadiumId, 'restaurant');
      console.log('Got restaurants:', restaurants);
      
      // Load bars
      console.log('Fetching bars...');
      const bars = await this.fetchNearbyPlaces(stadiumId, 'bar');
      console.log('Got bars:', bars);
      
      // Combine restaurants and bars
      const dining = [...restaurants, ...bars];
      console.log('Combined dining:', dining);
      
      // Render combined dining
      this.renderNearbyPlaces('nearby-dining', dining, 'מסעדות וברים');
      
      // Update statistics
      const parkingContainer = document.getElementById('nearby-parking');
      const parkingCount = parkingContainer ? 
        (parkingContainer.querySelectorAll('.place-card').length || 0) : 0;
      this.updateStatistics(restaurants.length, bars.length, parkingCount, 0);
      
    } catch (error) {
      console.error('Error loading dining:', error);
    }
  }

  async loadParking(stadiumId) {
    try {
      // Load parking
      console.log('Fetching parking...');
      const parking = await this.fetchNearbyPlaces(stadiumId, 'parking');
      console.log('Got parking:', parking);
      this.renderNearbyPlaces('nearby-parking', parking, 'חניות');
      
      // Update statistics
      const diningContainer = document.getElementById('nearby-dining');
      const diningCount = diningContainer ? 
        (diningContainer.querySelectorAll('.place-card').length || 0) : 0;
      this.updateStatistics(0, 0, parking.length, 0);
      
    } catch (error) {
      console.error('Error loading parking:', error);
    }
  }

  async fetchNearbyPlaces(stadiumId, type) {
    try {
      const response = await fetch(`/api/stadiums/${stadiumId}/nearby/${type}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.places || [];
    } catch (error) {
      console.error(`Error fetching ${type} places:`, error);
      return [];
    }
  }

  renderNearbyPlaces(containerId, places, category) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (places.length === 0) {
      container.innerHTML = `
        <div class="no-data">
          <p>לא נמצאו ${category} בסביבת האצטדיון</p>
        </div>
      `;
      return;
    }
    
    // Check if this is parking (no rating needed for parking)
    const isParking = containerId === 'nearby-parking';
    const isDining = containerId === 'nearby-dining';
    
    // Get stadium ID from container or current modal
    const stadiumId = container.closest('.modal-content')?.querySelector('[data-stadium-id]')?.dataset.stadiumId;
    const nextMatch = stadiumId && this.stadiumMatches[stadiumId]?.allMatches?.[0];
    
    // Add sort controls and match filter for dining
    let sortControlsHTML = '';
    if (isParking) {
      sortControlsHTML = `
        <div class="sort-controls">
          <label>מיין לפי:</label>
          <button class="sort-btn active" data-sort="distance" data-container="${containerId}">
            📍 מרחק מהאצטדיון
          </button>
        </div>
      `;
    } else if (isDining && nextMatch) {
      const matchDate = new Date(nextMatch.date);
      const matchTime = matchDate.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
      const matchDay = matchDate.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' });
      
      sortControlsHTML = `
        <div class="dining-filters">
          <div class="sort-controls">
            <label>מיין לפי:</label>
            <button class="sort-btn active" data-sort="distance" data-container="${containerId}">
              📍 מרחק מהאצטדיון
            </button>
            <button class="sort-btn" data-sort="rating" data-container="${containerId}">
              ⭐ דירוג גבוה לנמוך
            </button>
          </div>
          <div class="match-filter">
            <label class="match-filter-toggle">
              <input type="checkbox" id="open-before-match-${containerId}" data-container="${containerId}" onchange="window.stadiumsApp.filterByMatchTime('${containerId}')">
              <span>⚽ הצג רק מקומות פתוחים לפני המשחק הבא</span>
            </label>
            <div class="match-time-info">
              ${matchDay}, ${matchTime}
            </div>
          </div>
        </div>
      `;
    } else {
      sortControlsHTML = `
        <div class="sort-controls">
          <label>מיין לפי:</label>
          <button class="sort-btn active" data-sort="distance" data-container="${containerId}">
            📍 מרחק מהאצטדיון
          </button>
          <button class="sort-btn" data-sort="rating" data-container="${containerId}">
            ⭐ דירוג גבוה לנמוך
          </button>
        </div>
      `;
    }
    
    const placesHTML = places.map(place => {
      // Format distance properly
      let distanceText = '';
      if (place.distance_meters) {
        if (place.distance_meters >= 1000) {
          distanceText = `${(place.distance_meters / 1000).toFixed(1)} ק"מ`;
        } else {
          distanceText = `${Math.round(place.distance_meters)} מ'`;
        }
      }
      
      // Create clickable name with link
      const placeNameHTML = place.website || place.google_maps_url ? 
        `<a href="${place.website || place.google_maps_url}" target="_blank" rel="noopener noreferrer">${place.name}</a>` : 
        place.name;
      
      // Create navigation link for address
      const navigationURL = place.latitude && place.longitude 
        ? `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`
        : place.address 
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`
        : null;
      
      const addressHTML = navigationURL
        ? `<a href="${navigationURL}" target="_blank" rel="noopener noreferrer" class="address-link" title="נווט עם Google Maps">📍 ${place.address || 'כתובת לא זמינה'}</a>`
        : `<p>${place.address || 'כתובת לא זמינה'}</p>`;
      
      // Format opening hours
      let openingHoursHTML = '';
      if (place.opening_hours && place.opening_hours.length > 0) {
        const today = new Date().getDay(); // 0=Sunday, 1=Monday, etc.
        const dayMapping = [6, 0, 1, 2, 3, 4, 5]; // Convert JS day (Sun=0) to weekday index (Sun=6 in many systems)
        const todayIndex = dayMapping[today];
        const todayHours = place.opening_hours[todayIndex] || place.opening_hours[0];
        
        openingHoursHTML = `
          <div class="opening-hours-toggle" onclick="window.stadiumsApp.toggleOpeningHours(event, '${place.place_id}')">
            <span class="hours-indicator ${place.open_now ? 'open' : 'closed'}">
              ${place.open_now ? '🟢 פתוח עכשיו' : '🔴 סגור עכשיו'}
            </span>
            <span class="today-hours">${todayHours}</span>
            <span class="toggle-arrow">▼</span>
          </div>
          <div class="full-hours" id="hours-${place.place_id}" style="display: none;">
            ${place.opening_hours.map(day => `<div class="hours-day">${day}</div>`).join('')}
          </div>
        `;
      }
      
      return `
      <div class="place-item">
        <div class="place-info">
          <h4>${placeNameHTML}</h4>
          ${addressHTML}
          ${openingHoursHTML}
        </div>
        <div class="place-meta">
          ${!isParking && place.rating ? `<span class="rating">★ ${place.rating}</span>` : ''}
          ${distanceText ? `<span class="distance">${distanceText}</span>` : ''}
        </div>
      </div>
    `}).join('');
    
    container.innerHTML = sortControlsHTML + '<div class="places-list">' + placesHTML + '</div>';
    
    // Store places data on container for sorting
    container.dataset.places = JSON.stringify(places);
    
    // Attach sort handlers
    this.attachSortHandlers(container);
  }

  attachSortHandlers(container) {
    const sortButtons = container.querySelectorAll('.sort-btn');
    sortButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sortType = e.currentTarget.dataset.sort;
        const containerId = e.currentTarget.dataset.container;
        
        // Update active button
        sortButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Get stored places and sort
        const places = JSON.parse(container.dataset.places);
        this.sortPlaces(places, sortType);
        
        // Re-render just the list
        this.renderPlacesList(container, places);
      });
    });
  }

  sortPlaces(places, sortType) {
    if (sortType === 'distance') {
      places.sort((a, b) => (a.distance_meters || 999999) - (b.distance_meters || 999999));
    } else if (sortType === 'rating') {
      places.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  }
  
  filterByMatchTime(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const checkbox = document.getElementById(`open-before-match-${containerId}`);
    const allPlaces = JSON.parse(container.dataset.places || '[]');
    
    if (!checkbox.checked) {
      // Show all places
      this.renderPlacesList(container, allPlaces);
      return;
    }
    
    // Get next match time
    const stadiumId = container.closest('.modal-content')?.querySelector('[data-stadium-id]')?.dataset.stadiumId;
    const nextMatch = stadiumId && this.stadiumMatches[stadiumId]?.allMatches?.[0];
    
    if (!nextMatch) {
      this.renderPlacesList(container, allPlaces);
      return;
    }
    
    const matchDate = new Date(nextMatch.date);
    const matchDay = matchDate.getDay(); // 0 = Sunday
    const matchHour = matchDate.getHours();
    const matchMinute = matchDate.getMinutes();
    const matchTimeInMinutes = matchHour * 60 + matchMinute;
    
    // Filter places that are open before the match
    const filteredPlaces = allPlaces.filter(place => {
      return this.isOpenBeforeMatch(place, matchDay, matchTimeInMinutes);
    });
    
    // Render filtered places
    this.renderPlacesList(container, filteredPlaces);
    
    // Show count of filtered places
    const placesList = container.querySelector('.places-list');
    if (placesList && filteredPlaces.length < allPlaces.length) {
      const filterInfo = document.createElement('div');
      filterInfo.className = 'filter-info';
      filterInfo.style.cssText = 'background: #e3f2fd; padding: 10px; border-radius: 6px; margin-bottom: 12px; text-align: center; color: #1565c0; font-weight: 600;';
      filterInfo.textContent = `מציג ${filteredPlaces.length} מתוך ${allPlaces.length} מקומות`;
      placesList.insertBefore(filterInfo, placesList.firstChild);
    }
  }
  
  isOpenBeforeMatch(place, matchDay, matchTimeInMinutes) {
    if (!place.opening_hours || place.opening_hours.length === 0) {
      return true; // If no hours data, include it
    }
    
    // Map JS day (0=Sun) to opening_hours array index
    // Assuming opening_hours is: [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
    const dayMapping = [0, 1, 2, 3, 4, 5, 6]; // Sun=0, Mon=1, etc.
    const dayIndex = dayMapping[matchDay];
    const dayHours = place.opening_hours[dayIndex];
    
    if (!dayHours || dayHours.includes('סגור') || dayHours.includes('Closed')) {
      return false; // Closed on match day
    }
    
    // Parse opening hours (e.g., "09:00–22:00" or "09:00-22:00")
    const timePattern = /(\d{1,2}):(\d{2})/g;
    const times = [...dayHours.matchAll(timePattern)];
    
    if (times.length < 2) {
      return true; // Can't parse, include it to be safe
    }
    
    const openHour = parseInt(times[0][1]);
    const openMinute = parseInt(times[0][2]);
    const openTimeInMinutes = openHour * 60 + openMinute;
    
    // Check if place opens before the match (with 30min buffer)
    return openTimeInMinutes <= (matchTimeInMinutes - 30);
  }

  renderPlacesList(container, places) {
    const placesList = container.querySelector('.places-list');
    if (!placesList) return;
    
    // Check if this is parking (no rating/hours for parking)
    const isParking = container.id === 'nearby-parking';
    
    const placesHTML = places.map(place => {
      let distanceText = '';
      if (place.distance_meters) {
        if (place.distance_meters >= 1000) {
          distanceText = `${(place.distance_meters / 1000).toFixed(1)} ק"מ`;
        } else {
          distanceText = `${Math.round(place.distance_meters)} מ'`;
        }
      }
      
      const placeNameHTML = place.website || place.google_maps_url ? 
        `<a href="${place.website || place.google_maps_url}" target="_blank" rel="noopener noreferrer">${place.name}</a>` : 
        place.name;
      
      // Create navigation link for address
      const navigationURL = place.latitude && place.longitude 
        ? `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`
        : place.address 
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`
        : null;
      
      const addressHTML = navigationURL
        ? `<a href="${navigationURL}" target="_blank" rel="noopener noreferrer" class="address-link" title="נווט עם Google Maps">📍 ${place.address || 'כתובת לא זמינה'}</a>`
        : `<p>${place.address || 'כתובת לא זמינה'}</p>`;
      
      // Format opening hours
      let openingHoursHTML = '';
      if (!isParking && place.opening_hours && place.opening_hours.length > 0) {
        const today = new Date().getDay();
        const dayMapping = [6, 0, 1, 2, 3, 4, 5];
        const todayIndex = dayMapping[today];
        const todayHours = place.opening_hours[todayIndex] || place.opening_hours[0];
        
        openingHoursHTML = `
          <div class="opening-hours-toggle" onclick="window.stadiumsApp.toggleOpeningHours(event, '${place.place_id}')">
            <span class="hours-indicator ${place.open_now ? 'open' : 'closed'}">
              ${place.open_now ? '🟢 פתוח עכשיו' : '🔴 סגור עכשיו'}
            </span>
            <span class="today-hours">${todayHours}</span>
            <span class="toggle-arrow">▼</span>
          </div>
          <div class="full-hours" id="hours-${place.place_id}" style="display: none;">
            ${place.opening_hours.map(day => `<div class="hours-day">${day}</div>`).join('')}
          </div>
        `;
      }
      
      return `
      <div class="place-item">
        <div class="place-info">
          <h4>${placeNameHTML}</h4>
          ${addressHTML}
          ${openingHoursHTML}
        </div>
        <div class="place-meta">
          ${!isParking && place.rating ? `<span class="rating">★ ${place.rating}</span>` : ''}
          ${distanceText ? `<span class="distance">${distanceText}</span>` : ''}
        </div>
      </div>
    `}).join('');
    
    placesList.innerHTML = placesHTML;
  }

  updateStatistics(restaurantCount, barCount, parkingCount, transitCount) {
    // Find all stat-number elements in the stats-grid and update them
    const statCards = document.querySelectorAll('.stats-grid .stat-card');
    if (statCards.length >= 4) {
      statCards[0].querySelector('.stat-number').textContent = restaurantCount;
      statCards[1].querySelector('.stat-number').textContent = barCount;
      statCards[2].querySelector('.stat-number').textContent = parkingCount;
      statCards[3].querySelector('.stat-number').textContent = transitCount;
    }
  }

  async refreshDining(stadiumId) {
    try {
      // Show loading state
      const container = document.getElementById('nearby-dining');
      if (container) {
        container.innerHTML = '<div class="loading-spinner">מעדכן נתונים...</div>';
      }

      // Refresh data from Google Places API
      const response = await fetch(`/api/stadiums/${stadiumId}/nearby?refresh=true`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reload dining with fresh data
      setTimeout(() => {
        this.loadDining(stadiumId);
      }, 2000);
      
    } catch (error) {
      console.error('Error refreshing dining:', error);
      alert('שגיאה ברענון הנתונים. נסה שוב מאוחר יותר.');
    }
  }

  async refreshParking(stadiumId) {
    try {
      // Show loading state
      const container = document.getElementById('nearby-parking');
      if (container) {
        container.innerHTML = '<div class="loading-spinner">מעדכן נתונים...</div>';
      }

      // Refresh data from Google Places API
      const response = await fetch(`/api/stadiums/${stadiumId}/nearby?refresh=true`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reload parking with fresh data
      setTimeout(() => {
        this.loadParking(stadiumId);
      }, 2000);
      
    } catch (error) {
      console.error('Error refreshing parking:', error);
      alert('שגיאה ברענון הנתונים. נסה שוב מאוחר יותר.');
    }
  }

  openInMaps(lat, lng) {
    // Open Google Maps with directions from user's current location
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  }

  async loadTransitInfo(stadiumId) {
    // Check for the container in the parking tab
    const transitContainer = document.getElementById('transit-info-parking');
    if (!transitContainer) return;

    transitContainer.innerHTML = '<div class="loading-spinner">טוען מידע תחבורה...</div>';
    
    try {
      const transitData = await this.fetchNearbyPlaces(stadiumId, 'transit_station');
      this.renderNearbyPlaces('transit-info-parking', transitData, 'תחבורה ציבורית');
    } catch (error) {
      console.error('Error loading transit info:', error);
      transitContainer.innerHTML = '<div class="no-data">שגיאה בטעינת מידע תחבורה</div>';
    }
  }

  renderStadiumModal(stadium) {
    // This method is kept for backwards compatibility but redirects to the enhanced version
    this.renderEnhancedStadiumModal(stadium, stadium.id);
  }

  switchToNearbyCategory(category) {
    // Switch to the nearby tab
    const nearbyButton = document.querySelector('.tab-button[data-tab="nearby"]');
    if (nearbyButton) {
      nearbyButton.click();
    }
    
    // Scroll to the specific category section
    setTimeout(() => {
      let sectionId;
      switch(category) {
        case 'restaurants':
          sectionId = 'nearby-restaurants';
          break;
        case 'bars':
          sectionId = 'nearby-bars';
          break;
        case 'parking':
          sectionId = 'nearby-parking';
          break;
        case 'transit':
          sectionId = 'transit-info';
          break;
      }
      
      if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Add a brief highlight effect
          section.style.transition = 'background-color 0.3s';
          section.style.backgroundColor = 'rgba(74, 144, 226, 0.1)';
          setTimeout(() => {
            section.style.backgroundColor = '';
          }, 1000);
        }
      }
    }, 100);
  }

  openStadiumByVenue(venueName) {
    console.log('Opening stadium by venue:', venueName);
    
    // First try to map the venue name using our mapping
    let searchName = venueName;
    if (this.venueNameMap && this.venueNameMap[venueName]) {
      searchName = this.venueNameMap[venueName];
      console.log('Mapped venue name:', venueName, '→', searchName);
    }
    
    // Find the stadium that matches this venue name
    const stadium = this.allStadiums.find(s => {
      // Try exact match with mapped name first
      if (s.name === searchName || s.name_en === searchName) return true;
      
      // Try exact match with original venue name
      if (s.name === venueName || s.name_en === venueName) return true;
      
      // Try partial match with mapped name
      const nameMatch = s.name.includes(searchName) || searchName.includes(s.name);
      const enNameMatch = s.name_en && (s.name_en.includes(searchName) || searchName.includes(s.name_en));
      
      // Try partial match with original venue name
      const origNameMatch = s.name.includes(venueName) || venueName.includes(s.name);
      const origEnNameMatch = s.name_en && (s.name_en.includes(venueName) || venueName.includes(s.name_en));
      
      return nameMatch || enNameMatch || origNameMatch || origEnNameMatch;
    });

    if (stadium) {
      console.log('✓ Found stadium:', stadium.name);
      this.renderEnhancedStadiumModal(stadium, stadium.id);
    } else {
      console.warn('✗ Stadium not found for venue:', venueName);
      console.log('Available stadiums:', this.allStadiums.map(s => s.name).join(', '));
      // Show a message to the user
      alert(`לא נמצא אצטדיון עבור: ${venueName}`);
    }
  }

  hideModal() {
    this.elements.stadiumModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  getTeamLogo(teamName) {
    // Try exact match first
    if (this.teamLogos[teamName]) {
      return this.teamLogos[teamName];
    }
    
    // Try partial match (for teams with variations)
    for (const [key, logo] of Object.entries(this.teamLogos)) {
      if (teamName.includes(key) || key.includes(teamName)) {
        return logo;
      }
    }
    
    // Log missing team for debugging
    console.log('No logo found for team:', teamName, 'Chars:', [...teamName].map(c => c.charCodeAt(0)).join(','));
    
    // Default football icon
    return 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Soccer_ball.svg/50px-Soccer_ball.svg.png';
  }

  async loadStandings() {
    console.log('🔄 Loading standings...');
    try {
      const response = await fetch('/api/standings');
      console.log('📡 API response status:', response.status);
      if (!response.ok) {
        throw new Error('Failed to load standings');
      }

      const data = await response.json();
      console.log('📊 Data received - Ligat Haal:', data.ligatHaal?.length, 'teams, Liga Leumit:', data.ligaLeumit?.length, 'teams');
      this.renderStandings('ligatHaalTable', data.ligatHaal, 'Ligat Ha\'al');
      this.renderStandings('ligaLeumitTable', data.ligaLeumit, 'Liga Leumit');
      console.log('✅ Standings rendered');
    } catch (error) {
      console.error('❌ Error loading standings:', error);
      document.getElementById('ligatHaalTable').innerHTML = '<div class="table-loading">שגיאה בטעינת הנתונים</div>';
      document.getElementById('ligaLeumitTable').innerHTML = '<div class="table-loading">שגיאה בטעינת הנתונים</div>';
    }
    
    // Load fixtures after standings
    this.loadFixtures();
  }

  async enrichFixturesWithEvents(fixtures) {
    // Get only finished matches
    const finishedMatches = fixtures.filter(f => 
      ['FT', 'AET', 'PEN'].includes(f.fixture.status.short)
    );
    
    console.log(`🔍 Enriching ${finishedMatches.length} finished matches with event data...`);
    
    // Fetch detailed info for each finished match (limit to avoid too many requests)
    const detailPromises = finishedMatches.slice(0, 20).map(async (match) => {
      try {
        const response = await fetch(`/api/fixture/${match.fixture.id}`);
        if (response.ok) {
          const detailed = await response.json();
          // Copy events to the original match object
          match.events = detailed.events || [];
          console.log(`✓ Match ${match.fixture.id}: ${detailed.events?.length || 0} events`);
        }
      } catch (error) {
        console.error(`Error loading events for match ${match.fixture.id}:`, error);
      }
    });
    
    await Promise.all(detailPromises);
  }

  async loadFixtures() {
    console.log('🔄 Loading fixtures...');
    try {
      // Load venue name mapping first
      const venueMapResponse = await fetch('/api/venue-map');
      this.venueNameMap = await venueMapResponse.json();
      console.log('📍 Venue name map loaded:', Object.keys(this.venueNameMap).length, 'venues');
      
      const response = await fetch('/api/fixtures');
      if (!response.ok) {
        throw new Error('Failed to load fixtures');
      }

      const data = await response.json();
      console.log('⚽ Fixtures received - Ligat Haal:', data.ligatHaal?.length, 'matches, Liga Leumit:', data.ligaLeumit?.length, 'matches');
      
      // Fetch detailed info for finished matches to get events
      await this.enrichFixturesWithEvents(data.ligatHaal);
      await this.enrichFixturesWithEvents(data.ligaLeumit);
      
      // Store fixtures data for navigation
      this.fixturesData = {
        ligatHaal: data.ligatHaal || [],
        ligaLeumit: data.ligaLeumit || []
      };
      
      // Render with matchweek navigation
      this.renderFixturesWithNavigation('ligatHaalFixtures', this.fixturesData.ligatHaal, 'ליגת העל', 'ligatHaal');
      this.renderFixturesWithNavigation('ligaLeumitFixtures', this.fixturesData.ligaLeumit, 'ליגה לאומית', 'ligaLeumit');
      console.log('✅ Fixtures rendered');
    } catch (error) {
      console.error('❌ Error loading fixtures:', error);
      document.getElementById('ligatHaalFixtures').innerHTML = '<div class="table-loading">שגיאה בטעינת המשחקים</div>';
      document.getElementById('ligaLeumitFixtures').innerHTML = '<div class="table-loading">שגיאה בטעינת המשחקים</div>';
    }
  }

  renderFixturesWithNavigation(containerId, fixtures, leagueName, leagueKey) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('❌ Container not found:', containerId);
      return;
    }
    
    if (!fixtures || fixtures.length === 0) {
      console.warn('⚠️ No fixtures data for:', containerId);
      container.innerHTML = '<div class="table-loading">אין משחקים קרובים</div>';
      return;
    }

    // Group fixtures by matchweek
    const matchweekGroups = {};
    fixtures.forEach(match => {
      const round = match.league.round || 'N/A';
      if (!matchweekGroups[round]) {
        matchweekGroups[round] = [];
      }
      matchweekGroups[round].push(match);
    });

    // Sort matchweeks and filter out empty ones
    const sortedMatchweeks = Object.keys(matchweekGroups)
      .filter(round => matchweekGroups[round] && matchweekGroups[round].length > 0)
      .sort((a, b) => {
        // Extract numbers from round strings for proper sorting
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });

    // Debug: Log all matchweeks found
    const allRounds = Object.keys(matchweekGroups);
    console.log(`\n📊 ${leagueName} - RAW DATA`);
    console.log(`   Total matchweeks: ${allRounds.length}`);
    console.log(`   Matchweeks:`, allRounds.sort());
    console.log(`\n📊 ${leagueName} - COUNTS`);
    Object.entries(matchweekGroups).sort((a,b) => {
      const numA = parseInt(a[0].match(/\d+/)?.[0] || '0');
      const numB = parseInt(b[0].match(/\d+/)?.[0] || '0');
      return numA - numB;
    }).forEach(([round, matches]) => {
      console.log(`   ${round}: ${matches.length} matches`);
    });
    console.log(`\n📊 ${leagueName} - AFTER FILTERING`);
    console.log(`   Sorted matchweeks:`, sortedMatchweeks);

    // Validate we have matchweeks
    if (sortedMatchweeks.length === 0) {
      console.warn('⚠️ No valid matchweeks found for:', containerId);
      container.innerHTML = '<div class="table-loading">אין משחקים קרובים</div>';
      return;
    }

    // Find current or next matchweek (first upcoming or in progress)
    let defaultMatchweek = sortedMatchweeks[0];
    for (const round of sortedMatchweeks) {
      const hasUpcoming = matchweekGroups[round].some(m => 
        ['NS', 'TBD', '1H', '2H', 'HT', 'LIVE', 'ET', 'P', 'BT'].includes(m.fixture.status.short)
      );
      if (hasUpcoming) {
        defaultMatchweek = round;
        break;
      }
    }

    // Initialize current matchweek if not set
    if (!this.currentMatchweek) {
      this.currentMatchweek = {};
    }
    
    // Validate the stored matchweek still exists in the data
    const storedMatchweek = this.currentMatchweek[leagueKey];
    if (!storedMatchweek || !sortedMatchweeks.includes(storedMatchweek)) {
      this.currentMatchweek[leagueKey] = defaultMatchweek;
    } else {
      this.currentMatchweek[leagueKey] = storedMatchweek;
    }

    const currentRound = this.currentMatchweek[leagueKey];
    const currentIndex = sortedMatchweeks.indexOf(currentRound);
    const matchesToShow = matchweekGroups[currentRound] || [];

    // Double-check we have matches to show
    if (matchesToShow.length === 0) {
      console.warn(`⚠️ No matches found for matchweek: ${currentRound}`);
      container.innerHTML = '<div class="table-loading">אין משחקים במחזור זה</div>';
      return;
    }

    // Render navigation and fixtures
    const html = `
      <div class="matchweek-navigation">
        <button class="matchweek-nav-btn ${currentIndex === 0 ? 'disabled' : ''}" 
                onclick="window.stadiumsApp.changeMatchweek('${leagueKey}', -1)" 
                ${currentIndex === 0 ? 'disabled' : ''}>
          מחזור קודם
        </button>
        <div class="matchweek-title">${currentRound}</div>
        <button class="matchweek-nav-btn ${currentIndex === sortedMatchweeks.length - 1 ? 'disabled' : ''}" 
                onclick="window.stadiumsApp.changeMatchweek('${leagueKey}', 1)" 
                ${currentIndex === sortedMatchweeks.length - 1 ? 'disabled' : ''}>
          מחזור הבא
        </button>
      </div>
      <div class="matchweek-fixtures">
        ${this.renderMatchweekFixtures(matchesToShow)}
      </div>
    `;

    container.innerHTML = html;
  }

  changeMatchweek(leagueKey, direction) {
    const fixtures = this.fixturesData[leagueKey];
    if (!fixtures) return;

    // Group fixtures by matchweek
    const matchweekGroups = {};
    fixtures.forEach(match => {
      const round = match.league.round || 'N/A';
      if (!matchweekGroups[round]) {
        matchweekGroups[round] = [];
      }
      matchweekGroups[round].push(match);
    });

    // Sort matchweeks and filter out empty ones
    const sortedMatchweeks = Object.keys(matchweekGroups)
      .filter(round => matchweekGroups[round] && matchweekGroups[round].length > 0)
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.match(/\d+/)?.[0] || '0');
      return numA - numB;
    });

    const currentRound = this.currentMatchweek[leagueKey];
    const currentIndex = sortedMatchweeks.indexOf(currentRound);
    
    console.log(`🔄 Changing matchweek for ${leagueKey}:`);
    console.log(`   Current: "${currentRound}" (index ${currentIndex})`);
    console.log(`   Direction: ${direction > 0 ? 'next' : 'previous'}`);
    console.log(`   Available matchweeks:`, sortedMatchweeks);
    
    // Validate current matchweek exists in sorted list
    if (currentIndex === -1) {
      console.warn(`⚠️ Current matchweek "${currentRound}" not found in available matchweeks`);
      // Reset to first available matchweek
      this.currentMatchweek[leagueKey] = sortedMatchweeks[0];
      const containerId = leagueKey === 'ligatHaal' ? 'ligatHaalFixtures' : 'ligaLeumitFixtures';
      const leagueName = leagueKey === 'ligatHaal' ? 'ליגת העל' : 'ליגה לאומית';
      this.renderFixturesWithNavigation(containerId, fixtures, leagueName, leagueKey);
      return;
    }
    
    const newIndex = currentIndex + direction;
    console.log(`   New index: ${newIndex}, New matchweek: "${sortedMatchweeks[newIndex] || 'N/A'}"`);

    if (newIndex >= 0 && newIndex < sortedMatchweeks.length) {
      this.currentMatchweek[leagueKey] = sortedMatchweeks[newIndex];
      console.log(`✅ Changed to: "${this.currentMatchweek[leagueKey]}"`);
      
      // Re-render the specific league
      const containerId = leagueKey === 'ligatHaal' ? 'ligatHaalFixtures' : 'ligaLeumitFixtures';
      const leagueName = leagueKey === 'ligatHaal' ? 'ליגת העל' : 'ליגה לאומית';
      this.renderFixturesWithNavigation(containerId, fixtures, leagueName, leagueKey);
    }
  }

  renderMatchweekFixtures(matches) {
    if (!matches || matches.length === 0) {
      return '<div class="table-loading">אין משחקים במחזור זה</div>';
    }

    return matches.map(match => {
      const date = new Date(match.fixture.date);
      const dateStr = date.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const timeStr = date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
      const isLive = ['1H', '2H', 'HT', 'LIVE', 'ET', 'P', 'BT'].includes(match.fixture.status.short);
      const isFinished = ['FT', 'AET', 'PEN', 'PST', 'CANC', 'ABD', 'AWD', 'WO'].includes(match.fixture.status.short);
      
      // Debug: log first finished match to see structure
      if (isFinished && !this._debugLogged) {
        console.log('Debug finished match:', match);
        console.log('Has events?', !!match.events);
        console.log('Events:', match.events);
        this._debugLogged = true;
      }
      
      // Get scorers if available
      let scorersHtml = '';
      if (isFinished && match.events && match.events.length > 0) {
        const goals = match.events.filter(e => 
          e.type === 'Goal' && e.detail !== 'Own Goal'
        );
        
        if (goals.length > 0) {
          const homeScorers = goals
            .filter(g => g.team.id === match.teams.home.id)
            .map(g => {
              const penalty = g.detail === 'Penalty' ? ' (פנדל)' : '';
              return `${g.player.name} ${g.time.elapsed}'${penalty}`;
            })
            .join(', ');
          
          const awayScorers = goals
            .filter(g => g.team.id === match.teams.away.id)
            .map(g => {
              const penalty = g.detail === 'Penalty' ? ' (פנדל)' : '';
              return `${g.player.name} ${g.time.elapsed}'${penalty}`;
            })
            .join(', ');
          
          if (homeScorers || awayScorers) {
            // Swap for RTL display - away team appears on left visually in the teams display
            scorersHtml = `
              <div class="fixture-scorers">
                <div class="scorer-side away">${awayScorers || '-'}</div>
                <div class="scorer-divider">⚽</div>
                <div class="scorer-side home">${homeScorers || '-'}</div>
              </div>
            `;
          }
        }
      }
      
      // Prepare venue name for both data attribute and onclick
      const venueNameForData = match.fixture.venue.name.replace(/"/g, '&quot;');
      const venueNameForJs = match.fixture.venue.name.replace(/'/g, "\\'");
      
      return `
        <div class="fixture-item ${isLive ? 'live' : ''} ${isFinished ? 'finished' : ''}" 
             data-venue-name="${venueNameForData}" 
             data-clickable="true"
             data-fixture-id="${match.fixture.id}"
             onclick="if(window.stadiumsApp){window.stadiumsApp.openStadiumByVenue('${venueNameForJs}');event.preventDefault();event.stopPropagation();}"
             style="cursor: pointer;">
          <div class="fixture-header">
            <div class="fixture-date">
              <div class="date">${dateStr}</div>
              <div class="time">${timeStr}</div>
              ${isLive ? '<div class="live-badge">🔴 LIVE</div>' : ''}
              ${isFinished ? '<div class="finished-badge">נגמר</div>' : ''}
            </div>
            <div class="fixture-status-info">
              ${isLive ? `<span class="match-minute">${match.fixture.status.elapsed}'</span>` : ''}
            </div>
          </div>
          <div class="fixture-teams">
            <div class="fixture-team">
              <img src="${match.teams.home.logo}" alt="${match.teams.home.name}" class="team-logo-small">
              <span class="team-name">${match.teams.home.name}</span>
            </div>
            <div class="fixture-score">
              ${isLive || match.goals.home !== null ? 
                `<span class="score">${match.goals.home} - ${match.goals.away}</span>` : 
                '<span class="vs">vs</span>'}
            </div>
            <div class="fixture-team">
              <span class="team-name">${match.teams.away.name}</span>
              <img src="${match.teams.away.logo}" alt="${match.teams.away.name}" class="team-logo-small">
            </div>
          </div>
          ${scorersHtml}
          <div class="fixture-venue">📍 ${match.fixture.venue.name}</div>
        </div>
      `;
    }).join('');
  }

  renderFixtures(containerId, fixtures, leagueName) {
    console.log('🎨 Rendering fixtures for:', containerId, 'with', fixtures?.length, 'matches');
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error('❌ Container not found:', containerId);
      return;
    }
    
    if (!fixtures || fixtures.length === 0) {
      console.warn('⚠️ No fixtures data for:', containerId);
      container.innerHTML = '<div class="table-loading">אין משחקים קרובים</div>';
      return;
    }

    const html = fixtures.slice(0, 10).map(match => {
      const date = new Date(match.fixture.date);
      const dateStr = date.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const timeStr = date.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
      const isLive = ['1H', '2H', 'HT', 'LIVE', 'ET', 'P', 'BT'].includes(match.fixture.status.short);
      const matchday = match.league.round || 'N/A';
      
      return `
        <div class="fixture-item ${isLive ? 'live' : ''}" data-venue-name="${match.fixture.venue.name}" onclick="window.stadiumsApp.openStadiumByVenue('${match.fixture.venue.name}')" style="cursor: pointer;">
          <div class="fixture-header">
            <div class="fixture-date">
              <div class="date">${dateStr}</div>
              <div class="time">${timeStr}</div>
              ${isLive ? '<div class="live-badge">🔴 LIVE</div>' : ''}
            </div>
            <div class="fixture-matchday">מחזור ${matchday}</div>
          </div>
          <div class="fixture-teams">
            <div class="fixture-team">
              <img src="${match.teams.home.logo}" alt="${match.teams.home.name}" class="team-logo-small">
              <span class="team-name">${match.teams.home.name}</span>
            </div>
            <div class="fixture-score">
              ${isLive || match.goals.home !== null ? 
                `<span class="score">${match.goals.home} - ${match.goals.away}</span>` : 
                '<span class="vs">vs</span>'}
              ${isLive ? `<div class="match-status">${match.fixture.status.elapsed}'</div>` : ''}
            </div>
            <div class="fixture-team">
              <span class="team-name">${match.teams.away.name}</span>
              <img src="${match.teams.away.logo}" alt="${match.teams.away.name}" class="team-logo-small">
            </div>
          </div>
          <div class="fixture-venue">📍 ${match.fixture.venue.name}</div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  }

  renderStandings(containerId, standings, leagueName) {
    console.log('🎨 Rendering standings for:', containerId, 'with', standings?.length, 'teams');
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error('❌ Container not found:', containerId);
      return;
    }
    
    if (!standings || standings.length === 0) {
      console.warn('⚠️ No standings data for:', containerId);
      container.innerHTML = '<div class="table-loading">אין נתונים זמינים</div>';
      return;
    }

    const html = `
      <table class="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>קבוצה</th>
            <th>משחקים</th>
            <th>נצחונות</th>
            <th>תיקו</th>
            <th>הפסד</th>
            <th>יחס</th>
            <th>נקודות</th>
          </tr>
        </thead>
        <tbody>
          ${standings.map((team, index) => {
            const position = index + 1;
            const isTop3 = position <= 3;
            const isBottom3 = position > standings.length - 3;
            const rowClass = isTop3 ? 'top-3' : isBottom3 ? 'bottom-3' : '';
            const gdClass = team.goalsDiff > 0 ? 'gd-positive' : team.goalsDiff < 0 ? 'gd-negative' : '';

            return `
              <tr class="${rowClass}">
                <td class="rank-cell">${position}</td>
                <td>
                  <div class="team-cell">
                    <img src="${team.team.logo}" alt="${team.team.name}" class="team-logo" onerror="this.src='https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Soccer_ball.svg/50px-Soccer_ball.svg.png'">
                    <span class="team-name">${team.team.name}</span>
                  </div>
                </td>
                <td>${team.all.played}</td>
                <td>${team.all.win}</td>
                <td>${team.all.draw}</td>
                <td>${team.all.lose}</td>
                <td class="${gdClass}">${team.goalsDiff > 0 ? '+' : ''}${team.goalsDiff}</td>
                <td class="points-cell">${team.points}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    container.innerHTML = html;
  }

  attachTableToggleHandlers() {
    // Store reference to this for use in event handler
    const self = this;
    
    // Use event delegation to handle clicks even if tables are loaded later
    document.addEventListener('click', (e) => {
      // Handle league tables (standings)
      const tableTitle = e.target.closest('.league-table__title');
      if (tableTitle) {
        console.log('Table title clicked:', tableTitle.textContent);
        const table = tableTitle.closest('.league-table');
        if (table) {
          console.log('Toggling collapsed class. Current state:', table.classList.contains('collapsed'));
          table.classList.toggle('collapsed');
          console.log('New state:', table.classList.contains('collapsed'));
        }
      }
      
      // Handle fixtures
      const fixturesTitle = e.target.closest('.league-fixtures__title');
      if (fixturesTitle) {
        console.log('Fixtures title clicked:', fixturesTitle.textContent);
        const fixtures = fixturesTitle.closest('.league-fixtures');
        if (fixtures) {
          console.log('Toggling fixtures collapsed class. Current state:', fixtures.classList.contains('collapsed'));
          fixtures.classList.toggle('collapsed');
          console.log('Fixtures new state:', fixtures.classList.contains('collapsed'));
        }
      }
      
      // Handle league tab switching
      const leagueTab = e.target.closest('.league-tab');
      if (leagueTab) {
        const tabName = leagueTab.dataset.tab;
        console.log('League tab clicked:', tabName);
        
        // Remove active from all tabs and contents
        document.querySelectorAll('.league-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.league-tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active to clicked tab and corresponding content
        leagueTab.classList.add('active');
        document.getElementById(`${tabName}-content`).classList.add('active');
      }
      
      // Handle collapsible sections (parking/transit)
      const collapsibleTitle = e.target.closest('.collapsible-title');
      if (collapsibleTitle) {
        console.log('Collapsible section clicked:', collapsibleTitle.textContent);
        collapsibleTitle.classList.toggle('collapsed');
        const content = collapsibleTitle.nextElementSibling;
        if (content && content.classList.contains('collapsible-content')) {
          content.classList.toggle('collapsed');
        }
      }
      
      // Handle fixture item clicks to open stadium
      const fixtureItem = e.target.closest('.fixture-item[data-clickable="true"]');
      if (fixtureItem) {
        console.log('🎯 Fixture item clicked!', fixtureItem);
        const venueName = fixtureItem.dataset.venueName;
        console.log('Venue name from data attribute:', venueName);
        if (venueName) {
          e.preventDefault();
          e.stopPropagation();
          console.log('✓ Opening stadium for venue:', venueName);
          self.openStadiumByVenue(venueName);
        } else {
          console.error('❌ No venue name found in data attribute');
        }
      }
    });
    
    console.log('✓ Event delegation attached for fixture clicks');
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.stadiumsApp = new StadiumsApp();
});