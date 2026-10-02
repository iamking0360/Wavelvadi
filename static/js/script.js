/**
 * WAVELVADI (वावेलवाडी) VILLAGE WEBSITE INTERACTIVE CONTROLLER
 * Features: Language Switching, ADMIN Dashboard, Creator Approval,
 * Like/Dislike/Download, YouTube Links, Google Drive Cloud Storage, Mobile Responsive
 */

'use strict';

let currentLanguage = 'mr';
let currentUser = { logged_in: false, role: 'public', username: '', is_admin: false };
let currentActiveCategory = 'all';
let allPublishedContent = [];

// ==========================================
// TRANSLATIONS
// ==========================================
const translations = {
  mr: {
    heroTag: '• सह्याद्रीचा अभिमान •',
    heroTitle: 'आपले सहर्ष स्वागत! <span class="highlight">वावेलवाडी गाव</span>',
    heroDesc: 'सह्याद्रीच्या डोंगररांगांमध्ये वसलेले, निसर्गरम्य वातावरण, समृद्ध वारसा, सेंद्रिय शेती आणि एकोप्याची परंपरा जपणारे आदर्श महासंस्कृती गाव वावेलवाडी.',
    btnExplore: 'गाव भ्रमंती करा',
    btnCreatorReq: 'क्रिएटर बना (परवानगी अर्ज)',
    statPop: '१५०+', statPopLabel: 'ग्रामस्थ लोकसंख्या',
    statArea: '१,२०० हेक्टर', statAreaLabel: 'निसर्गरम्य परिसर',
    statHeritage: '३००+ वर्षे', statHeritageLabel: 'ऐतिहासिक परंपरा',
    historyTag: 'इतिहास आणि वारसा',
    historyTitle: 'वावेलवाडीचा देदीप्यमान इतिहास',
    historyDesc: 'सह्याद्रीच्या कुशीत ३०० हून अधिक वर्षांपासून वसलेल्या वावेलवाडी गावाला ऐतिहासिक बारव विहिरी, पराक्रमी पूर्वज आणि जलव्यवस्थापनाचा गौरवशाली वारसा लाभला आहे.',
    cultureTag: 'संस्कृती आणि वारसा', cultureTitle: 'वावेलवाडीची समृद्ध परंपरा',
    cultureDesc: 'पिढ्यानपिढ्या जपलेली लोककला, बैलपोळा सण, ग्रामदैवत जत्रा आणि पर्यावरणपूरक जीवनशैली.',
    vlogTag: 'ग्राम कथा व व्लॉग', vlogTitle: 'वावेलवाडीतील जीवन व व्लॉग',
    vlogDesc: 'आमच्या स्थानिक क्रिएटर मंडळींनी टिपलेले गावचे निसर्गरम्य व्हिडिओ आणि गोष्टी.',
    galleryTag: 'छायाचित्र दालन', galleryTitle: 'वावेलवाडी मीडिया गॅलरी',
    noticeTag: 'जाहीर बातमीपत्र', noticeTitle: 'ग्रामपंचायत सूचना फलक',
    devTag: 'सोशल मीडिया व Instagram', devTitle: 'वावेलवाडी प्रगती व Instagram',
    devDesc: 'गावातील सण, संस्कृती, निसर्ग, दैनिक व्लॉग आणि विकास प्रकल्पांचे रील्स पाहण्यासाठी आमचे इंस्टाग्राम पेज फॉलो करा.',
    devBadge: '📸 अधिकृत इंस्टाग्राम (Official Instagram)',
    devNotice: 'वावेलवाडीचे अधिकृत इंस्टाग्राम पेज फॉलो करा व विकासकामांशी जोडलेले रहा!',
    creatorTag: 'आमचे योगदानकर्ते', creatorTitle: 'वावेलवाडी लेखक व क्रिएटर',
    creatorDesc: 'ADMIN कडून मंजूर मिळालेले आणि गावाची माहिती समृद्ध करणारे अधिकृत क्रिएटर.',
    navHome: 'मुख्य पृष्ठ', navHistory: 'इतिहास', navCulture: 'संस्कृती',
    navVlogs: 'व्लॉग', navGallery: 'गॅलरी', navNotices: 'सूचना', navDev: 'विकास व Instagram',
    navLogin: 'प्रवेश (Login)',
    modalReqTitle: 'वावेलवाडी क्रिएटर नोंदणी अर्ज',
    modalReqDesc: 'गावाची संस्कृती, व्लॉग, फोटो अथवा बातमी प्रसिद्ध करण्यासाठी ADMIN कडून परवानगी मिळवा.[Note:-Unique User id you want for login give in "Name" field.]',
    lblFullName: 'नाव (or User ID)', lblEmail: 'ईमेल पत्ता (SMS पासकोड साठी)',
    lblPhone: 'मोबाईल नंबर',
    lblReason: 'आपण काय योगदान देऊ इच्छिता? (कारण)',
    btnSendReq: 'ADMIN कडे अर्ज पाठवा',
    modalLoginTitle: 'प्रवेश (ADMIN / Creator Authentication)',
    lblUsername: 'युजर आयडी', lblPassword: 'पासकोड (Passkey)',
    btnLoginSubmit: 'सुरक्षित प्रवेश करा',
    filterAll: 'सर्व', filterCulture: 'संस्कृती', filterVlog: 'व्लॉग',
    filterPhoto: 'फोटो', filterVideo: 'व्हिडिओ'
  },
  en: {
    heroTag: '• Sahyadri Pride •',
    heroTitle: 'Welcome to <span class="highlight">Wavelvadi Village</span>',
    heroDesc: 'Nestled in the Sahyadri mountains, Wavelvadi is a model Maharashtrian village celebrating nature, rich heritage, organic farming, and strong community unity.',
    btnExplore: 'Explore Village',
    btnCreatorReq: 'Become a Creator',
    statPop: '150+', statPopLabel: 'Village Population',
    statArea: '1,200 Hectares', statAreaLabel: 'Lush Green Area',
    statHeritage: '300+ Years', statHeritageLabel: 'Rich History',
    historyTag: 'History & Heritage', historyTitle: 'Glorious History of Wavelvadi',
    historyDesc: 'Inhabited for over 300 years in the lap of Sahyadris, Wavelvadi possesses ancient stepwells and water management systems.',
    cultureTag: 'Culture & Heritage', cultureTitle: 'Traditions of Wavelvadi',
    cultureDesc: 'Folk art, annual festivals, stepwells, and sustainable living passed down through generations.',
    vlogTag: 'Stories & Vlogs', vlogTitle: 'Wavelvadi Village Vlogs',
    vlogDesc: 'Immersive stories and video blogs captured by our approved local village creators.',
    galleryTag: 'Photo Gallery', galleryTitle: 'Wavelvadi Photo Collection',
    noticeTag: 'Announcements', noticeTitle: 'Village Noticeboard',
    devTag: 'Social Media & Instagram', devTitle: 'Wavelvadi Progress & Instagram',
    devDesc: 'Follow our official Instagram page for village vlogs, photos, cultural highlights, and reels.',
    devBadge: '📸 Official Instagram & Connect',
    devNotice: 'Follow and connect with Wavelvadi on our official Instagram page!',
    creatorTag: 'Contributors', creatorTitle: 'Wavelvadi Content Creators',
    creatorDesc: 'Approved local village contributors creating authentic cultural content under ADMIN administration.',
    navHome: 'Home', navHistory: 'History', navCulture: 'Culture',
    navVlogs: 'Vlogs', navGallery: 'Gallery', navNotices: 'Notices', navDev: 'Development & Instagram',
    navLogin: 'Login',
    modalReqTitle: 'Request Creator Permission',
    modalReqDesc: 'Request permission from ADMIN to publish articles, vlogs, and photos on Wavelvadi portal.[Note:-Unique User id you want for login give in "Name" field.]',
    lblFullName: ' Name (or User ID)', lblEmail: 'Email Address (For SMS Credentials)',
    lblPhone: 'Phone Number',
    lblReason: 'Why do you want creator access?',
    btnSendReq: 'Submit Request to ADMIN',
    modalLoginTitle: 'Portal Login (ADMIN / Creator)',
    lblUsername: 'User ID', lblPassword: 'Password / Passkey',
    btnLoginSubmit: 'Secure Login',
    filterAll: 'All', filterCulture: 'Culture', filterVlog: 'Vlogs',
    filterPhoto: 'Photos', filterVideo: 'Videos'
  }
};


// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  checkUserSession();
  loadPublicContent('all');
  initEventListeners();
  initMobileMenu();
  initMediaPreview();
});


// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navLinksMenu');
  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('nav-open');
    toggle.innerHTML = isOpen ? '✕' : '☰';
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('nav-open');
      toggle.innerHTML = '☰';
    });
  });
}


// ==========================================
// LANGUAGE SWITCHER
// ==========================================
function toggleLanguage() {
  currentLanguage = currentLanguage === 'mr' ? 'en' : 'mr';
  document.body.classList.toggle('en-mode', currentLanguage === 'en');
  document.getElementById('langToggleText').innerText = currentLanguage === 'mr' ? 'English' : 'मराठी';
  applyTranslations();
}

function initLanguage() {
  document.body.classList.toggle('en-mode', currentLanguage === 'en');
  applyTranslations();
}

function applyTranslations() {
  const dict = translations[currentLanguage];
  const setTxt = (id, key, isHTML = false) => {
    const el = document.getElementById(id);
    if (el && dict[key] !== undefined) {
      if (isHTML) el.innerHTML = dict[key];
      else el.innerText = dict[key];
    }
  };

  setTxt('heroTagText', 'heroTag');
  setTxt('heroTitleText', 'heroTitle', true);
  setTxt('heroDescText', 'heroDesc');
  setTxt('btnExploreText', 'btnExplore');
  setTxt('btnCreatorReqText', 'btnCreatorReq');
  setTxt('statPopText', 'statPop'); setTxt('statPopLabel', 'statPopLabel');
  setTxt('statAreaText', 'statArea'); setTxt('statAreaLabel', 'statAreaLabel');
  setTxt('statHeritageText', 'statHeritage'); setTxt('statHeritageLabel', 'statHeritageLabel');
  setTxt('historyTagText', 'historyTag'); setTxt('historyTitleText', 'historyTitle');
  setTxt('historyDescText', 'historyDesc');
  setTxt('cultureTagText', 'cultureTag'); setTxt('cultureTitleText', 'cultureTitle');
  setTxt('cultureDescText', 'cultureDesc');
  setTxt('vlogTagText', 'vlogTag'); setTxt('vlogTitleText', 'vlogTitle');
  setTxt('vlogDescText', 'vlogDesc');
  setTxt('galleryTagText', 'galleryTag'); setTxt('galleryTitleText', 'galleryTitle');
  setTxt('noticeTagText', 'noticeTag'); setTxt('noticeTitleText', 'noticeTitle');
  setTxt('devTagText', 'devTag'); setTxt('devTitleText', 'devTitle');
  setTxt('devDescText', 'devDesc'); setTxt('devBadgeText', 'devBadge');
  setTxt('devNoticeText', 'devNotice');
  setTxt('creatorTagText', 'creatorTag'); setTxt('creatorTitleText', 'creatorTitle');
  setTxt('creatorDescText', 'creatorDesc');
  setTxt('navHomeText', 'navHome'); setTxt('navHistoryText', 'navHistory');
  setTxt('navCultureText', 'navCulture'); setTxt('navVlogsText', 'navVlogs');
  setTxt('navGalleryText', 'navGallery'); setTxt('navNoticesText', 'navNotices');
  setTxt('navDevText', 'navDev'); setTxt('navLoginText', 'navLogin');
  setTxt('modalReqTitleText', 'modalReqTitle');
  setTxt('modalReqDescText', 'modalReqDesc');
  setTxt('lblFullNameText', 'lblFullName'); setTxt('lblEmailText', 'lblEmail');
  setTxt('lblPhoneText', 'lblPhone'); setTxt('lblReasonText', 'lblReason');
  setTxt('btnSendReqText', 'btnSendReq');
  setTxt('modalLoginTitleText', 'modalLoginTitle');
  setTxt('lblUsernameText', 'lblUsername'); setTxt('lblPasswordText', 'lblPassword');
  setTxt('btnLoginSubmitText', 'btnLoginSubmit');
  setTxt('filterAllBtn', 'filterAll'); setTxt('filterCultureBtn', 'filterCulture');
  setTxt('filterVlogBtn', 'filterVlog'); setTxt('filterPhotoBtn', 'filterPhoto');
  setTxt('filterVideoBtn', 'filterVideo');

  if (allPublishedContent.length > 0) {
    renderPublicContent();
  } else {
    loadPublicContent(currentActiveCategory || 'all');
  }
}


// ==========================================
// SESSION & AUTHENTICATION API
// ==========================================
async function checkUserSession() {
  try {
    const res = await fetch('/api/session');
    const data = await res.json();
    currentUser = data;

    const navLoginBtn = document.getElementById('navLoginBtn');
    const navDashboardBtn = document.getElementById('navDashboardBtn');
    const addContentBtn = document.getElementById('addContentBtn');
    const creatorsTabBtn = document.getElementById('creatorsTabBtn');
    const backupTabBtn = document.getElementById('backupTabBtn');
    const gscriptTabBtn = document.getElementById('gscriptTabBtn');

    if (data.logged_in) {
      if (navLoginBtn) navLoginBtn.style.display = 'none';
      if (navDashboardBtn) {
        navDashboardBtn.style.display = 'inline-flex';
        const roleLabel = data.is_admin ? 'ADMIN' : data.role.toUpperCase();
        navDashboardBtn.innerHTML = `🛡️ ${data.username} (${roleLabel})`;
      }
      // Creators and ADMIN can both upload/submit content
      if (addContentBtn) addContentBtn.style.display = 'inline-flex';

      const publishGroup = document.getElementById('publishNowGroup');
      const modalNote = document.getElementById('addContentModalNote');
      if (publishGroup) publishGroup.style.display = data.is_admin ? 'flex' : 'none';
      if (modalNote) {
        modalNote.innerHTML = data.is_admin
          ? '👑 <strong>ADMIN:</strong> आपण थेट प्रकाशित करू शकता किंवा ड्राफ्ट म्हणून ठेवू शकता.'
          : '✍️ <strong>क्रिएटर:</strong> आपला मजकूर मुख्य प्रशासक (ADMIN) कडे ईमेल परवानगीसाठी पाठवला जाईल. ईमेल मंजुरीनंतर प्रसिद्ध होईल.';
      }

      // Show admin-only tabs
      if (data.is_admin) {
        if (creatorsTabBtn) creatorsTabBtn.style.display = 'inline-block';
        if (backupTabBtn) backupTabBtn.style.display = 'inline-block';
        if (gscriptTabBtn) gscriptTabBtn.style.display = 'inline-block';
      }
    } else {
      if (navLoginBtn) navLoginBtn.style.display = 'inline-flex';
      if (navDashboardBtn) navDashboardBtn.style.display = 'none';
      if (addContentBtn) addContentBtn.style.display = 'none';
    }
  } catch (err) {
    console.error('Session check error:', err);
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const msgBox = document.getElementById('loginMsg');

  msgBox.style.color = '#B45309';
  msgBox.innerText = 'लॉगिन होत आहे...';

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();

    if (data.success) {
      msgBox.style.color = 'green';
      msgBox.innerText = data.message;
      setTimeout(() => {
        closeModal('loginModal');
        checkUserSession();
        if (data.role === 'ADMIN') {
          openAdminDashboard();
        }
      }, 900);
    } else {
      msgBox.style.color = 'red';
      msgBox.innerText = data.message;
    }
  } catch (err) {
    msgBox.style.color = 'red';
    msgBox.innerText = 'Login error. Please try again.';
  }
}

async function handleLogout() {
  await fetch('/api/logout', { method: 'POST' });
  closeModal('dashboardModal');
  currentUser = { logged_in: false, role: 'public', username: '', is_admin: false };
  checkUserSession();
  showToast('Logged out successfully.', 'info');
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}


// ==========================================
// CREATOR REQUEST API
// ==========================================
async function handleCreatorRequestSubmit(e) {
  e.preventDefault();
  const full_name = document.getElementById('reqFullName').value.trim();
  const email = document.getElementById('reqEmail').value.trim();
  const phone = document.getElementById('reqPhone').value.trim();
  const reason = document.getElementById('reqReason').value.trim();
  const msgBox = document.getElementById('reqMsg');

  msgBox.style.color = '#B45309';
  msgBox.innerText = 'ADMIN प्रशासकाकडे अर्ज सादर केला जात आहे...';

  try {
    const res = await fetch('/api/creator/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, phone, reason })
    });
    const data = await res.json();

    if (data.success) {
      msgBox.style.color = 'green';
      msgBox.innerHTML = `✅ ${data.message}`;
      document.getElementById('creatorRequestForm').reset();
    } else {
      msgBox.style.color = 'red';
      msgBox.innerText = data.message;
    }
  } catch (err) {
    msgBox.style.color = 'red';
    msgBox.innerText = 'Network error. Please try again later.';
  }
}


// ==========================================
// CONTENT DISPLAY API & RENDERING
// ==========================================
async function loadPublicContent(category = null) {
  if (category) {
    currentActiveCategory = category;
  }

  // Update filter buttons UI
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  const key = `filter${currentActiveCategory.charAt(0).toUpperCase() + currentActiveCategory.slice(1)}Btn`;
  const activeBtn = document.getElementById(key) || document.getElementById('filterAllBtn');
  if (activeBtn) activeBtn.classList.add('active');

  try {
    const res = await fetch('/api/content');
    const data = await res.json();
    if (!data.success) return;
    allPublishedContent = data.content || [];
    renderPublicContent();
  } catch (err) {
    console.error('Failed to load content:', err);
  }
}

function renderPublicContent() {
  // 1. Vlogs Section (always shows all published vlogs)
  const vlogsContainer = document.getElementById('vlogsContainer');
  if (vlogsContainer) {
    const vlogs = allPublishedContent.filter(item => item.category === 'vlog');
    vlogsContainer.innerHTML = vlogs.length > 0
      ? vlogs.map(item => createCardHTML(item)).join('')
      : '<p style="padding:1rem; color: var(--text-muted);">कोणतेही व्लॉग उपलब्ध नाहीत.</p>';
  }

  // 2. Gallery Section (filtered by currentActiveCategory)
  const galleryContainer = document.getElementById('galleryContainer');
  if (galleryContainer) {
    const gallery = (currentActiveCategory === 'all')
      ? allPublishedContent.filter(item => ['photo', 'culture', 'video', 'vlog'].includes(item.category))
      : allPublishedContent.filter(item => item.category === currentActiveCategory);
    galleryContainer.innerHTML = gallery.length > 0
      ? gallery.map(item => createCardHTML(item)).join('')
      : '<p style="padding:1rem; color: var(--text-muted);">या वर्गवारीत कोणतीही गॅलरी मीडिया उपलब्ध नाही.</p>';
  }

  // 3. Noticeboard Section (always shows all notices)
  const noticeContainer = document.getElementById('noticeContainer');
  if (noticeContainer) {
    const notices = allPublishedContent.filter(item => item.category === 'notice');
    noticeContainer.innerHTML = notices.length > 0 ? notices.map(item => {
      const nTitle = currentLanguage === 'mr' ? (item.title_mr || item.title_en) : (item.title_en || item.title_mr);
      const nDesc = currentLanguage === 'mr' ? (item.description_mr || item.description_en) : (item.description_en || item.description_mr);
      return `
        <div class="notice-item">
          <div class="notice-date">📢 सूचना</div>
          <div class="notice-content">
            <h4>${escapeHTML(nTitle)}</h4>
            <p>${escapeHTML(nDesc)}</p>
            <small style="color: var(--brand-gold);">प्रकाशक: ${escapeHTML(item.author_name || 'ADMIN')}</small>
          </div>
        </div>
      `;
    }).join('') : '<p style="padding:1rem; color: var(--text-muted);">सध्या कोणतीही जाहीर सूचना नाही.</p>';
  }
}

function createCardHTML(item) {
  const title = (currentLanguage === 'mr' ? (item.title_mr || item.title_en) : (item.title_en || item.title_mr)) || 'वावेलवाडी';
  const desc = (currentLanguage === 'mr' ? (item.description_mr || item.description_en) : (item.description_en || item.description_mr)) || '';
  const hasYoutube = item.youtube_url && item.youtube_url.trim() !== '';
  const hasDrive = item.google_drive_url && item.google_drive_url.trim() !== '';

  let mediaEl = '';
  if (hasYoutube) {
    const ytId = extractYouTubeId(item.youtube_url);
    if (ytId) {
      mediaEl = `
        <div class="card-media-wrapper yt-wrapper">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1"
            title="${escapeHTML(title)}"
            loading="lazy"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
            style="width:100%; height:100%; border:none;"></iframe>
          <span class="media-badge yt-badge">▶ YouTube</span>
        </div>`;
    }
  } else if (item.media_type === 'video') {
    let videoSrc = item.media_url || item.google_drive_url;
    if (videoSrc && (videoSrc.includes('drive.google.com') || hasDrive)) {
      let dUrl = item.google_drive_url || videoSrc;
      let fileIdMatch = dUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || dUrl.match(/id=([a-zA-Z0-9_-]+)/);
      let embedUrl = fileIdMatch ? `https://drive.google.com/file/d/${fileIdMatch[1]}/preview` : dUrl;
      mediaEl = `
        <div class="card-media-wrapper yt-wrapper">
          <iframe src="${embedUrl}" allow="autoplay; fullscreen" style="width:100%; height:100%; border:none;"></iframe>
          <span class="media-badge">${item.category ? item.category.toUpperCase() : 'MEDIA'}</span>
        </div>`;
    } else if (videoSrc && videoSrc.startsWith('/uploads/')) {
      mediaEl = `
        <div class="card-media-wrapper">
          <video src="${videoSrc}" controls preload="metadata" style="width:100%; height:100%; object-fit:cover;"></video>
          <span class="media-badge">${item.category ? item.category.toUpperCase() : 'MEDIA'}</span>
        </div>`;
    } else {
      mediaEl = `
        <div class="card-media-wrapper">
          <img src="/static/images/video_plantation.svg" alt="${escapeHTML(title)}" loading="lazy" />
          <span class="media-badge">${item.category ? item.category.toUpperCase() : 'MEDIA'}</span>
        </div>`;
    }
  } else {
    let imgSrc = item.media_url || '/static/images/vlog_farm.svg';
    if (hasDrive && (!item.media_url || item.media_url === '/static/images/vlog_farm.svg')) {
      let fileIdMatch = item.google_drive_url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || item.google_drive_url.match(/id=([a-zA-Z0-9_-]+)/);
      if (fileIdMatch) {
        imgSrc = `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
      }
    }
    mediaEl = `
      <div class="card-media-wrapper">
        <img src="${imgSrc}" alt="${escapeHTML(title)}" loading="lazy" onerror="this.src='/static/images/vlog_farm.svg'" />
        <span class="media-badge">${item.category ? item.category.toUpperCase() : 'MEDIA'}</span>
      </div>`;
  }

  const ytId = hasYoutube ? extractYouTubeId(item.youtube_url) : '';
  const youtubeWatchUrl = ytId ? `https://www.youtube.com/watch?v=${ytId}` : item.youtube_url;
  const youtubeLinkBtn = hasYoutube
    ? `<a href="${youtubeWatchUrl}" target="_blank" rel="noopener noreferrer" class="card-yt-link">
        <span>▶</span> YouTube वर पाहा
       </a>`
    : '';

  const driveLinkBtn = hasDrive
    ? `<a href="${item.google_drive_url}" target="_blank" rel="noopener noreferrer" class="card-drive-link">
        ☁️ Drive
       </a>`
    : '';

  return `
    <div class="content-card" data-id="${item.id}">
      ${mediaEl}
      <div class="card-body">
        <div class="card-meta">
          <span>📅 ${item.created_at ? item.created_at.substring(0, 10) : '२०२६'}</span>
          <span>🛡️ ADMIN Verified</span>
        </div>
        <h3 class="card-title">${escapeHTML(title)}</h3>
        <p class="card-text">${escapeHTML(desc)}</p>

        <div class="card-links">
          ${youtubeLinkBtn}
          ${driveLinkBtn}
        </div>

        <div class="card-author">
          <span>✍️ ${escapeHTML(item.author_name || 'वावेलवाडी क्रिएटर')}</span>
        </div>
      </div>
    </div>
  `;
}

function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return '';
  const str = url.trim();
  // Robust match for watch?v=, youtu.be/, shorts/, embed/, live/, etc.
  const regExp = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/;
  const match = str.match(regExp);
  if (match && match[1]) return match[1];

  try {
    const u = new URL(str.startsWith('http') ? str : 'https://' + str);
    if (u.searchParams.get('v')) return u.searchParams.get('v');
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length > 0) {
      const last = parts[parts.length - 1];
      if (last.length === 11) return last;
    }
  } catch {}
  return '';
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


// ==========================================
// ADMIN DASHBOARD & APPROVAL WORKFLOW
// ==========================================
async function openAdminDashboard() {
  if (!currentUser.logged_in) return;
  openModal('dashboardModal');
  await checkUserSession();
  loadAdminTab('drafts');
}

async function loadAdminTab(tab) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  const container = document.getElementById('dashboardContent');
  container.innerHTML = '<div class="loading-spinner">⏳ माहिती लोड होत आहे...</div>';

  if (tab === 'drafts') {
    setActiveTab(0);
    await loadContentDatabase(container);
  } else if (tab === 'requests') {
    setActiveTab(1);
    await loadCreatorRequests(container);
  } else if (tab === 'creators') {
    setActiveTab(2);
    await loadCreatorsManagement(container);
  } else if (tab === 'backup') {
    setActiveTab(3);
    await loadBackupStorage(container);
  } else if (tab === 'googlescript') {
    setActiveTab(4);
    await loadGoogleScriptInfo(container);
  }
}

function setActiveTab(index) {
  const tabs = document.querySelectorAll('.admin-tab');
  if (tabs[index]) tabs[index].classList.add('active');
}

// ------------------------------------------
// CONTENT DATABASE TAB
// ------------------------------------------
async function loadContentDatabase(container) {
  try {
    const res = await fetch('/api/admin/content');
    const data = await res.json();

    if (!data.success || data.content.length === 0) {
      container.innerHTML = '<p style="padding:1rem; color: var(--text-muted);">कोणतेही कंटेंट उपलब्ध नाही.</p>';
      return;
    }

    container.innerHTML = `
      <div style="overflow-x: auto;">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>शीर्षक (Title)</th>
              <th>प्रकार</th>
              <th>लेखक</th>
              <th>स्थिती</th>
              <th>कृती (Action)</th>
            </tr>
          </thead>
          <tbody>
            ${data.content.map(item => `
              <tr>
                <td>${item.id}</td>
                <td>
                  <strong>${escapeHTML(item.title_mr)}</strong>
                  ${item.youtube_url ? '<br/><small style="color:red;">▶ YouTube</small>' : ''}
                  ${item.google_drive_url ? '<small style="color:blue;"> ☁️ Drive</small>' : ''}
                </td>
                <td><span class="badge badge-pending">${item.category}</span></td>
                <td>${escapeHTML(item.author_name)}</td>
                <td>
                  <span class="badge ${item.status === 'published' ? 'badge-published' : (item.status === 'pending' ? 'badge-pending' : (item.status === 'rejected' ? 'badge-danger' : 'badge-draft'))}">
                    ${item.status === 'pending' ? '⏳ Email Pending' : (item.status === 'published' ? '✅ Published' : (item.status === 'rejected' ? '❌ Rejected' : '📝 Draft'))}
                  </span>
                </td>
                <td class="action-cell">
                  ${currentUser.is_admin && item.status !== 'published' ? `<button onclick="publishContentItem(${item.id})" class="btn btn-gold btn-sm">✅ Approve</button>` : ''}
                  ${currentUser.is_admin && item.status === 'pending' ? `<button onclick="rejectContentItem(${item.id})" class="btn btn-danger btn-sm" style="background:#DC2626;">❌ Reject</button>` : ''}
                  ${currentUser.is_admin ? `<button onclick="deleteContentItem(${item.id})" class="btn btn-danger btn-sm">🗑 Delete</button>` : ''}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<p style="color:red; padding:1rem;">Error: ${err.message}</p>`;
  }
}

// ------------------------------------------
// CREATOR REQUESTS TAB
// ------------------------------------------
async function loadCreatorRequests(container) {
  if (!currentUser.is_admin) {
    container.innerHTML = '<p style="padding:1rem; color: var(--text-muted);">फक्त ADMIN प्रशासक क्रिएटर अर्ज पाहू शकतात.</p>';
    return;
  }

  try {
    const res = await fetch('/api/admin/creator-requests');
    const data = await res.json();

    if (!data.success || data.requests.length === 0) {
      container.innerHTML = '<p style="padding:1rem; color: var(--text-muted);">कोणताही प्रलंबित क्रिएटर अर्ज नाही.</p>';
      return;
    }

    container.innerHTML = `
      <div style="overflow-x: auto;">
        <table class="data-table">
          <thead>
            <tr>
              <th>नाव (Name)</th>
              <th>ईमेल / मोबाईल</th>
              <th>कारण (Reason)</th>
              <th>स्थिती</th>
              <th>ADMIN Action</th>
            </tr>
          </thead>
          <tbody>
            ${data.requests.map(req => `
              <tr>
                <td><strong>${escapeHTML(req.full_name)}</strong></td>
                <td>${escapeHTML(req.email)}<br/><small style="color:var(--brand-brown);">${req.phone || ''}</small></td>
                <td style="max-width: 200px; word-wrap: break-word;">${escapeHTML(req.reason)}</td>
                <td>
                  <span class="badge ${req.status === 'approved' ? 'badge-published' : (req.status === 'pending' ? 'badge-pending' : 'badge-draft')}">${req.status}</span>
                </td>
                <td class="action-cell">
                  ${req.status === 'pending' ? `
                    <button onclick="openApproveModal(${req.id})" class="btn btn-primary btn-sm">✅ Approve</button>
                    <button onclick="processCreatorReq(${req.id}, 'reject')" class="btn btn-danger btn-sm">❌ Reject</button>
                  ` : ''}
                  <button onclick="deleteCreatorRequest(${req.id})" class="btn btn-sm" style="background:#FEE2E2; color:#991B1B;">🗑 Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<p style="color:red; padding:1rem;">Error: ${err.message}</p>`;
  }
}

// ------------------------------------------
// CREATORS MANAGEMENT TAB
// ------------------------------------------
async function loadCreatorsManagement(container) {
  if (!currentUser.is_admin) return;

  try {
    const res = await fetch('/api/admin/creators');
    const data = await res.json();

    if (!data.success || data.creators.length === 0) {
      container.innerHTML = '<p style="padding:1rem; color: var(--text-muted);">कोणतेही क्रिएटर नाहीत.</p>';
      return;
    }

    container.innerHTML = `
      <div style="overflow-x: auto;">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${data.creators.map(c => `
              <tr>
                <td>${c.id}</td>
                <td><strong>${escapeHTML(c.username)}</strong></td>
                <td>${escapeHTML(c.email)}</td>
                <td>${c.role}</td>
                <td><span class="badge ${c.status === 'approved' ? 'badge-published' : 'badge-draft'}">${c.status}</span></td>
                <td>
                  <button onclick="deleteCreator(${c.id}, '${escapeHTML(c.username)}')" class="btn btn-danger btn-sm">🗑 Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<p style="color:red; padding:1rem;">Error: ${err.message}</p>`;
  }
}

// ------------------------------------------
// BACKUP STORAGE TAB
// ------------------------------------------
async function loadBackupStorage(container) {
  if (!currentUser.is_admin) return;

  try {
    const res = await fetch('/api/admin/backup-storage');
    const data = await res.json();

    if (!data.success || data.backups.length === 0) {
      container.innerHTML = `
        <div style="padding:1.5rem;">
          <p style="color: var(--text-muted); margin-bottom: 1rem;">कोणतेही बॅकअप डेटा नाही.</p>
          <div class="info-box">
            <h4>📖 Google Apps Script Integration</h4>
            <p>Google Drive स्टोरेज सेट करण्यासाठी:</p>
            <ol style="padding-left: 1.25rem; color: var(--text-muted); font-size: 0.9rem;">
              <li>Google Apps Script Editor उघडा (script.google.com)</li>
              <li>नवीन Project तयार करा आणि खालील code paste करा</li>
              <li>Deploy → Web App म्हणून प्रकाशित करा</li>
              <li>Generated URL .env मध्ये GOOGLE_SCRIPT_URL म्हणून save करा</li>
            </ol>
          </div>
        </div>
      `;
      return;
    }

    const formatSize = (bytes) => {
      if (!bytes) return 'N/A';
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1048576).toFixed(1) + ' MB';
    };

    container.innerHTML = `
      <div style="overflow-x: auto;">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Content</th>
              <th>File</th>
              <th>Size</th>
              <th>Backup Status</th>
              <th>Google Drive</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${data.backups.map(b => `
              <tr>
                <td>${b.id}</td>
                <td>
                  <strong style="font-size:0.85rem;">${escapeHTML(b.title_mr || 'N/A')}</strong>
                  <br/><small style="color: var(--text-light);">${b.category || ''}</small>
                </td>
                <td style="font-size:0.8rem; word-break:break-all;">${escapeHTML(b.original_filename)}</td>
                <td>${formatSize(b.file_size)}</td>
                <td>
                  <span class="badge ${b.backup_status === 'synced' ? 'badge-published' : 'badge-pending'}">
                    ${b.backup_status === 'synced' ? '✅ Synced' : '🔄 Local Only'}
                  </span>
                </td>
                <td>
                  ${b.google_drive_url ? `<a href="${b.google_drive_url}" target="_blank" class="btn btn-sm" style="background:#E8F0FE; color:#1967D2; font-size:0.75rem;">☁️ View Drive</a>` : `
                    <button onclick="syncBackupToDrive(${b.id})" class="btn btn-sm btn-gold" style="font-size:0.75rem;">☁️ Sync to Drive</button>
                  `}
                </td>
                <td>
                  <button onclick="deleteBackupRecord(${b.id})" class="btn btn-danger btn-sm">🗑</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<p style="color:red; padding:1rem;">Error: ${err.message}</p>`;
  }
}

// ------------------------------------------
// GOOGLE SCRIPT INFO & TEST TAB
// ------------------------------------------
async function loadGoogleScriptInfo(container) {
  if (!currentUser.is_admin) return;

  try {
    const res = await fetch('/api/admin/google-script-config');
    const data = await res.json();

    container.innerHTML = `
      <div style="padding: 1rem;">
        <div class="info-box" style="margin-bottom: 1.5rem;">
          <h3 style="color: var(--brand-brown); margin-bottom: 0.5rem;">🔗 Google Apps Script & Cloud Storage Status</h3>
          <p><strong>Configured URL:</strong> ${data.configured ? `<a href="${data.script_url}" target="_blank" style="word-break:break-all;">${data.script_url}</a>` : '<span style="color:red;">❌ Not configured in .env</span>'}</p>
          
          <div style="margin-top: 1rem;">
            <button onclick="testGoogleScriptConnection()" class="btn btn-primary" id="btnTestGScript">
              🧪 Test Connection Now (कनेक्शन तपासा)
            </button>
            <span id="gscriptTestResult" style="margin-left: 1rem; font-weight: bold;"></span>
          </div>
        </div>

        <div class="info-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.75rem; flex-wrap:wrap; gap:0.5rem;">
            <h4 style="color: var(--brand-brown); margin: 0;">📋 Complete Google Apps Script Code (Code.gs)</h4>
            <button onclick="copyAppsScriptCode()" class="btn btn-sm btn-gold">📋 Copy Code</button>
          </div>
          <p style="font-size:0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
            हा संपूर्ण कोड तुमच्या Google Apps Script (<a href="https://script.google.com" target="_blank">script.google.com</a>) मध्ये पेस्ट करा:
          </p>
          <pre id="appsScriptCodeBlock" style="background: #1C1917; color: #FBBF24; padding: 1rem; border-radius: 8px; font-family: monospace; font-size: 0.78rem; overflow-x: auto; white-space: pre-wrap; max-height: 250px;">${escapeHTML(data.script_code || '// google_apps_script.js')}</pre>

          <h5 style="color: var(--brand-brown); margin: 1.25rem 0 0.5rem 0;">🚀 स्टेप-बाय-स्टेप कनेक्शन सूचना (Step-by-Step Instructions):</h5>
          <ol style="color: var(--text-muted); font-size: 0.85rem; padding-left: 1.25rem; line-height: 1.8;">
            <li><strong>script.google.com</strong> उघडा आणि <strong>New project</strong> वर क्लिक करा.</li>
            <li>वरील कोड संपूर्ण कॉपी करून <code>Code.gs</code> मधील जुना मजकूर काढून तिथे पेस्ट करा.</li>
            <li>वर <strong>Save (💾)</strong> आयकॉनवर क्लिक करा.</li>
            <li>उजव्या कोपऱ्यात <strong>Deploy</strong> → <strong>New deployment</strong> निवडा.</li>
            <li>गियर (⚙️) चिन्हावर क्लिक करून <strong>Web app</strong> निवडा.</li>
            <li><strong>Execute as:</strong> मध्ये <strong>"Me (your_email@gmail.com)"</strong> निवडा. (अत्यंत महत्त्वाचे!)</li>
            <li><strong>Who has access:</strong> मध्ये <strong>"Anyone"</strong> निवडा. (महत्त्वाचे!)</li>
            <li><strong>Deploy</strong> वर क्लिक करा. पहिल्या वेळी <em>Authorize access</em> विचारल्यास <em>Advanced → Go to project (unsafe) → Allow</em> करा.</li>
            <li>तयार झालेली <strong>Web App URL</strong> कॉपी करा.</li>
            <li><code>.env</code> फाईलमध्ये <code>GOOGLE_SCRIPT_URL=&lt;तुमची-URL&gt;</code> जोडा.</li>
            <li>येथे येऊन <strong>Test Connection Now</strong> बटण दाबून खात्री करा!</li>
          </ol>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<p style="color:red; padding:1rem;">Error loading config: ${err.message}</p>`;
  }
}


// ==========================================
// APPROVE CREATOR MODAL
// ==========================================
function openApproveModal(reqId) {
  document.getElementById('approveReqId').value = reqId;
  document.getElementById('customUsername').value = '';
  document.getElementById('customPassword').value = '';
  document.getElementById('approveMsg').innerText = '';
  openModal('approveCreatorModal');
}

async function handleApproveCreatorSubmit(e) {
  e.preventDefault();
  const reqId = document.getElementById('approveReqId').value;
  const custom_username = document.getElementById('customUsername').value.trim();
  const custom_password = document.getElementById('customPassword').value.trim();
  const msgBox = document.getElementById('approveMsg');

  msgBox.style.color = '#B45309';
  msgBox.innerText = 'मंजुरी दिली जात आहे...';

  try {
    const res = await fetch(`/api/admin/creator-requests/${reqId}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'approve', custom_username, custom_password })
    });
    const data = await res.json();

    if (data.success) {
      msgBox.style.color = 'green';
      let emailStatus = data.email_dispatched
        ? `✅ ईमेल पाठवला (${data.credentials.email})`
        : `⚠️ ईमेल: ${data.email_info}`;

      msgBox.innerHTML = `✅ मंजुरी यशस्वी!<br/>
        <strong>Username:</strong> ${data.credentials.username}<br/>
        <strong>Password:</strong> ${data.credentials.temporary_password}<br/>
        ${emailStatus}`;

      setTimeout(() => {
        closeModal('approveCreatorModal');
        loadAdminTab('requests');
      }, 3000);
    } else {
      msgBox.style.color = 'red';
      msgBox.innerText = data.message;
    }
  } catch (err) {
    msgBox.style.color = 'red';
    msgBox.innerText = `Error: ${err.message}`;
  }
}

async function processCreatorReq(reqId, action) {
  if (action === 'approve') {
    openApproveModal(reqId);
    return;
  }

  if (!confirm(`आपण हा क्रिएटर अर्ज ${action} करू इच्छिता?`)) return;

  try {
    const res = await fetch(`/api/admin/creator-requests/${reqId}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    });
    const data = await res.json();
    showToast(data.message, data.success ? 'success' : 'error');
    loadAdminTab('requests');
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}

async function deleteCreatorRequest(reqId) {
  if (!confirm('हा क्रिएटर अर्ज कायमचा हटवायचा आहे का?')) return;

  try {
    const res = await fetch(`/api/admin/creator-requests/${reqId}/delete`, { method: 'POST' });
    const data = await res.json();
    showToast(data.message, data.success ? 'success' : 'error');
    if (data.success) loadAdminTab('requests');
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}

async function deleteCreator(creatorId, username) {
  if (!confirm(`क्रिएटर "${username}" ला कायमचे हटवायचे आहे का? हे पूर्ववत होणार नाही.`)) return;

  try {
    const res = await fetch(`/api/admin/creators/${creatorId}/delete`, { method: 'POST' });
    const data = await res.json();
    showToast(data.message, data.success ? 'success' : 'error');
    if (data.success) loadAdminTab('creators');
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}


// ==========================================
// CONTENT PUBLISH & DELETE
// ==========================================
async function publishContentItem(id) {
  if (!confirm('आपण हे कंटेंट सार्वजनिक (Public) करू इच्छिता?')) return;
  try {
    const res = await fetch(`/api/admin/content/${id}/publish`, { method: 'POST' });
    const data = await res.json();
    showToast(data.message, data.success ? 'success' : 'error');
    if (data.success) { loadAdminTab('drafts'); loadPublicContent(); }
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}

async function deleteContentItem(id) {
  if (!confirm('आपण हे कंटेंट कायमचे हटवू (Delete) इच्छिता? बॅकअप स्टोरेजमधून पण हटेल.')) return;
  try {
    const res = await fetch(`/api/admin/content/${id}/delete`, { method: 'POST' });
    const data = await res.json();
    showToast(data.message, data.success ? 'success' : 'error');
    if (data.success) { loadAdminTab('drafts'); loadPublicContent(); }
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}

async function rejectContentItem(id) {
  if (!confirm('आपण हा मजकूर नाकारू (Reject) इच्छिता?')) return;
  try {
    const res = await fetch(`/api/admin/content/${id}/reject`, { method: 'POST' });
    const data = await res.json();
    showToast(data.message, data.success ? 'success' : 'error');
    if (data.success) { loadAdminTab('drafts'); loadPublicContent(); }
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}


// ==========================================
// BACKUP STORAGE ACTIONS & DRIVE SYNC
// ==========================================
async function syncBackupToDrive(backupId) {
  showToast('Google Drive वर अपलोड सुरू आहे...', 'info');
  try {
    const res = await fetch(`/api/admin/backup-storage/${backupId}/sync-drive`, { method: 'POST' });
    const data = await res.json();
    showToast(data.message, data.success ? 'success' : 'error');
    if (data.success) loadAdminTab('backup');
  } catch (err) {
    showToast('Sync error: ' + err.message, 'error');
  }
}

async function testGoogleScriptConnection() {
  const resultSpan = document.getElementById('gscriptTestResult');
  const btn = document.getElementById('btnTestGScript');
  if (resultSpan) {
    resultSpan.style.color = '#B45309';
    resultSpan.innerText = 'कनेक्शन तपासत आहे... कृपया थांबा...';
  }
  if (btn) btn.disabled = true;

  try {
    const res = await fetch('/api/admin/google-script/test');
    const data = await res.json();
    if (data.success) {
      if (resultSpan) {
        resultSpan.style.color = '#059669';
        resultSpan.innerHTML = `✅ ${data.message}`;
      }
      showToast('Google Apps Script & Google Drive यशस्वीरित्या जोडले गेले आहे!', 'success');
    } else {
      if (resultSpan) {
        resultSpan.style.color = '#DC2626';
        resultSpan.innerHTML = `❌ ${data.message}`;
      }
      showToast('कनेक्शन त्रुटी: ' + data.message, 'error');
    }
  } catch (err) {
    if (resultSpan) {
      resultSpan.style.color = '#DC2626';
      resultSpan.innerText = '❌ Error: ' + err.message;
    }
  } finally {
    if (btn) btn.disabled = false;
  }
}

function copyAppsScriptCode() {
  const codeEl = document.getElementById('appsScriptCodeBlock');
  if (!codeEl) return;
  navigator.clipboard.writeText(codeEl.innerText).then(() => {
    showToast('Google Apps Script कोड क्लिपबोर्डवर कॉपी केला!', 'success');
  }).catch(() => {
    showToast('कृपया मॅन्युअली कोड कॉपी करा.', 'warning');
  });
}

async function updateDriveUrl(backupId) {
  const input = document.getElementById(`driveUrl-${backupId}`);
  if (!input || !input.value.trim()) {
    showToast('कृपया Google Drive URL टाका.', 'warning');
    return;
  }

  try {
    const res = await fetch(`/api/admin/backup-storage/${backupId}/update-drive-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ google_drive_url: input.value.trim() })
    });
    const data = await res.json();
    showToast(data.message, data.success ? 'success' : 'error');
    if (data.success) loadAdminTab('backup');
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}

async function deleteBackupRecord(backupId) {
  if (!confirm('हा बॅकअप रेकॉर्ड हटवायचा आहे का? स्थानिक फाइल पण हटेल.')) return;

  try {
    const res = await fetch(`/api/admin/backup-storage/${backupId}/delete`, { method: 'POST' });
    const data = await res.json();
    showToast(data.message, data.success ? 'success' : 'error');
    if (data.success) loadAdminTab('backup');
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  }
}


// ==========================================
// CONTENT SUBMISSION (ADMIN ONLY)
// ==========================================
async function handleContentSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('addContentForm');
  const formData = new FormData(form);
  const msgBox = document.getElementById('submitMsg');

  // Add publish_now from checkbox
  const publishCheck = document.getElementById('publishNowCheck');
  if (publishCheck && publishCheck.checked) {
    formData.set('publish_now', 'true');
  }

  msgBox.style.color = '#B45309';
  msgBox.innerText = 'कंटेंट अपलोड होत आहे...';

  try {
    const res = await fetch('/api/content/submit', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();

    if (data.success) {
      msgBox.style.color = 'green';
      msgBox.innerText = data.message;
      form.reset();
      document.getElementById('uploadPreview').style.display = 'none';
      setTimeout(() => {
        closeModal('addContentModal');
        loadPublicContent();
      }, 1500);
    } else {
      msgBox.style.color = 'red';
      msgBox.innerText = data.message;
    }
  } catch (err) {
    msgBox.style.color = 'red';
    msgBox.innerText = 'Error uploading content. Please try again.';
  }
}

// Media file preview
function initMediaPreview() {
  const fileInput = document.getElementById('mediaFileInput');
  const preview = document.getElementById('uploadPreview');
  if (!fileInput || !preview) return;

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) { preview.style.display = 'none'; return; }

    preview.style.display = 'block';
    preview.innerHTML = '';

    if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.style.cssText = 'max-width:100%; max-height:200px; border-radius:8px; border:1px solid var(--brand-border);';
      img.src = URL.createObjectURL(file);
      preview.appendChild(img);
    } else if (file.type.startsWith('video/')) {
      const vid = document.createElement('video');
      vid.controls = true;
      vid.style.cssText = 'max-width:100%; max-height:200px; border-radius:8px;';
      vid.src = URL.createObjectURL(file);
      preview.appendChild(vid);
    } else {
      preview.innerHTML = `<p style="color: var(--brand-brown);">📄 ${file.name} (${(file.size/1024/1024).toFixed(2)} MB)</p>`;
    }
  });
}


// ==========================================
// MODAL CONTROLLERS
// ==========================================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}


// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'info') {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.style.cssText = `
      position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9999;
      padding: 0.9rem 1.5rem; border-radius: 12px; font-size: 0.9rem;
      font-weight: 600; max-width: 320px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      transition: all 0.3s ease; transform: translateY(100px); opacity: 0;
    `;
    document.body.appendChild(toast);
  }

  const colors = {
    success: { bg: '#DCFCE7', color: '#166534' },
    error: { bg: '#FEE2E2', color: '#991B1B' },
    warning: { bg: '#FEF3C7', color: '#92400E' },
    info: { bg: '#EFF6FF', color: '#1E40AF' }
  };

  const style = colors[type] || colors.info;
  toast.style.background = style.bg;
  toast.style.color = style.color;
  toast.innerText = message;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 3500);
}


// ==========================================
// EVENT LISTENERS INIT
// ==========================================
function initEventListeners() {
  document.getElementById('langToggleBtn')?.addEventListener('click', toggleLanguage);
  document.getElementById('creatorRequestForm')?.addEventListener('submit', handleCreatorRequestSubmit);
  document.getElementById('loginForm')?.addEventListener('submit', handleLoginSubmit);
  document.getElementById('addContentForm')?.addEventListener('submit', handleContentSubmit);
  document.getElementById('approveCreatorForm')?.addEventListener('submit', handleApproveCreatorSubmit);

  // Close modal when clicking overlay background
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Smooth scroll active nav highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
}
