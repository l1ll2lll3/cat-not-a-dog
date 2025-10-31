// 전역 변수
let currentFilter = 'all';
let catCount = 0;

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadCats('all');
    updateHeroImage();
    setupNavigation();
});

// 네비게이션 설정
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // 활성 클래스 제거 및 추가
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // 해당 섹션으로 스크롤
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 스크롤 시 네비게이션 활성화 업데이트
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

// 스크롤 위치에 따라 네비게이션 활성화
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// 갤러리로 스크롤
function scrollToGallery() {
    const gallerySection = document.getElementById('gallery');
    gallerySection.scrollIntoView({ behavior: 'smooth' });
}

// 히어로 이미지 업데이트
function updateHeroImage() {
    const heroImage = document.getElementById('heroImage');
    setInterval(() => {
        heroImage.src = `https://cataas.com/cat/cute?${new Date().getTime()}`;
    }, 5000); // 5초마다 이미지 변경
}

// 고양이 이미지 로드
function loadCats(filter) {
    currentFilter = filter;
    const galleryGrid = document.getElementById('galleryGrid');

    // 필터 버튼 활성화 상태 업데이트
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // 갤러리 초기화
    galleryGrid.innerHTML = '<div class="loading">귀여운 고양이들을 불러오는 중...</div>';

    // 잠시 후 고양이 이미지 로드
    setTimeout(() => {
        galleryGrid.innerHTML = '';
        catCount = 0;
        addCatsToGallery(9);
    }, 500);
}

// 갤러리에 고양이 추가
function addCatsToGallery(count) {
    const galleryGrid = document.getElementById('galleryGrid');

    for (let i = 0; i < count; i++) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        const img = document.createElement('img');
        const tag = currentFilter === 'all' ? '' : `/${currentFilter}`;
        img.src = `https://cataas.com/cat${tag}?${catCount + i}_${new Date().getTime()}`;
        img.alt = '귀여운 고양이';
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'gallery-item-overlay';

        const description = document.createElement('p');
        const descriptions = [
            '너무 귀여워요!',
            '사랑스러운 고양이',
            '완벽한 모델 자세',
            '매력적인 눈빛',
            '포근한 털뭉치',
            '장난기 넘치는',
            '우아한 포즈',
            '천사같은 고양이'
        ];
        description.textContent = descriptions[Math.floor(Math.random() * descriptions.length)];

        overlay.appendChild(description);
        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);

        // 클릭 시 새 탭에서 크게 보기
        galleryItem.addEventListener('click', function() {
            window.open(img.src, '_blank');
        });

        galleryGrid.appendChild(galleryItem);
    }

    catCount += count;
}

// 더 많은 고양이 로드
function loadMoreCats() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    loadMoreBtn.textContent = '로딩 중...';
    loadMoreBtn.disabled = true;

    setTimeout(() => {
        addCatsToGallery(6);
        loadMoreBtn.textContent = '더 보기';
        loadMoreBtn.disabled = false;
    }, 800);
}

// 이미지 로드 에러 처리
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.log('이미지 로드 실패, 재시도 중...');
        setTimeout(() => {
            e.target.src = e.target.src.split('?')[0] + '?' + new Date().getTime();
        }, 1000);
    }
}, true);
