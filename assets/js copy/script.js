// ==================== GLOBAL ARCHITECTURAL STATE & MATRIX ====================
let cart = [];
let currentPage = 1;
let selectedCategory = 'all';
let activeSeason = 'mawlid';
const PRODUCTS_PER_PAGE = 4;
const RESILIENT_FALLBACK_IMG = "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop";

const SEASON_CONTENT = {
  mawlid: {
    eyebrow: 'الرفاهية في كل تفصيلة',
    title: 'فخامة الحلويات',
    subtitle: 'بروح عصرية مبتكرة',
    story: 'نحتفل بذكرى المولد النبوي الشريف عبر تقديم تشكيلة ملكية حصرية تجمع عراقة التقاليد المصرية وسحر الابتكار الفرنسي. صناديق مخملية مصممة خصيصاً لتكون الهدية الأرقى لمن تحب.'
  },
  ramadan: {
    eyebrow: 'ليالي رمضان الفاخرة',
    title: 'سحر الفوانيس',
    subtitle: 'في كل قضمة نكهة',
    story: 'مع حلول الشهر الفضيل، نعيد تصميم أشهى الحلويات الشرقية بلمسة ملكية معاصرة، لتكون مائدة إفطارك وسحورك حكاية من الرفاهية الأصيلة.'
  },
  eid: {
    eyebrow: 'عيدكم أجمل مع ديسپاسيتو',
    title: 'احتفالية العيد',
    subtitle: 'هدايا تليق بالمناسبة',
    story: 'تشكيلة عيدية استثنائية صُممت لتكون أجمل هدية تُقدَّم للأحباب، حيث يلتقي فن التغليف الفاخر بأرقى مكونات الحلويات الشرقية والفرنسية.'
  }
};

// ==================== SYSTEM INTERFACES AND LOADING ENGINE ====================
window.addEventListener('DOMContentLoaded', () => {
    initPreloaderSequence();
    initLuxuryInteractionsCanvas();
    initAmbientAtmosphere();
});

function initPreloaderSequence() {
    const tl = gsap.timeline({
        onComplete: () => {
            const loader = document.getElementById('loader');
            if(loader) {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                setTimeout(() => loader.remove(), 800);
            }
            initApplicationCore();
        }
    });

    tl.to('.preloader-title', { opacity: 1, y: 0, duration: 1, ease: "power4.out" })
      .to('.preloader-bar', { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, "-=0.6");
}

function initApplicationCore() {
    initLenisHighPerfScroll();
    initScrollAnimationsMatrix();
    initMagneticNodeTranslators();
    initOrnamentDrawOnScroll();
    lazyLoadFallbackObserver();
    fetchStorefrontPayload();
    initDeliveryFields();
    initSeasonalSwitcher();
}

// ==================== HIGH PERFORMANCE ENGINE & INTERFACES ====================
function initLenisHighPerfScroll() {
    const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        orientation: 'vertical'
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

function initScrollAnimationsMatrix() {
    gsap.registerPlugin(ScrollTrigger);

    // Dynamic Micro Navbar Adaptations
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Premium Staggered Text Revelations
    gsap.to('.hero-reveal', {
        opacity: 1,
        y: 0,
        duration: 1.4,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Parallax Scrolling Matrix Adjustments
    gsap.utils.toArray('.gs-parallax').forEach(el => {
        gsap.to(el, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Text Content & Structural Elements Scroller Transitions
    gsap.utils.toArray('.text-scroller-fade, .img-reveal-wrapper').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Modern Counter Initialization Arrays
    gsap.utils.toArray('.counter-element').forEach(el => {
        const targetValue = parseInt(el.getAttribute('data-target'), 10);
        gsap.fromTo(el, { textContent: 0 }, {
            textContent: targetValue,
            duration: 2.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: el,
                start: "top 90%"
            }
        });
    });
}

function initMagneticNodeTranslators() {
    if (window.innerWidth < 1024) return; // Prevent performance strains on low-tier mobile processors
    const nodes = document.querySelectorAll('.magnetic-element');
    nodes.forEach(node => {
        node.addEventListener('mousemove', (e) => {
            const rect = node.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(node, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
        });
        node.addEventListener('mouseleave', () => {
            gsap.to(node, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        });
    });
}

// Draw-on-scroll circular ornament framing the hero product stack
function initOrnamentDrawOnScroll() {
    const strokes = document.querySelectorAll('.ornament-stroke');
    if (!strokes.length) return;
    strokes.forEach(path => {
        const length = path.getTotalLength ? path.getTotalLength() : 900;
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: '#hero',
                start: "top top",
                end: "bottom top",
                scrub: 0.6
            }
        });
    });
}

// 60FPS Hardware Accelerated Luxury Background Interactive Vector Canvas Ripple System
function initLuxuryInteractionsCanvas() {
    const canvas = document.getElementById('rippleCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let ripples = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('click', (e) => {
        ripples.push({
            x: e.clientX,
            y: e.clientY,
            r: 2,
            alpha: 0.35
        });
    });

    function renderLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ripples.forEach((ripple, index) => {
            ripple.r += 3.5;
            ripple.alpha -= 0.008;
            if(ripple.alpha <= 0) {
                ripples.splice(index, 1);
            } else {
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(199, 123, 135, ${ripple.alpha})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }
        });
        requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);
}

// ==================== AMBIENT ATMOSPHERE: STARS · SPARKLES · CLOUDS · LIGHT ====================
function initAmbientAtmosphere() {
    const starsLayer = document.getElementById('starsLayer');
    const sparkleLayer = document.getElementById('sparkleLayer');
    const glow = document.getElementById('mouseGlow');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Twinkling stars — scattered softly across the dark hero canopy
    if (starsLayer && !reduceMotion) {
        const starCount = window.innerWidth < 768 ? 18 : 34;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('span');
            star.className = 'star-twinkle';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 55}%`;
            star.style.animationDelay = `${Math.random() * 4}s`;
            star.style.animationDuration = `${3 + Math.random() * 3}s`;
            starsLayer.appendChild(star);
        }
    }

    // Drifting sparkles rising gently through the page
    if (sparkleLayer && !reduceMotion) {
        const sparkleCount = window.innerWidth < 768 ? 0 : 10;
        for (let i = 0; i < sparkleCount; i++) {
            const s = document.createElement('div');
            s.className = 'sparkle-drift';
            s.style.left = `${Math.random() * 100}%`;
            s.style.bottom = `-5%`;
            s.style.animationDuration = `${14 + Math.random() * 10}s`;
            s.style.animationDelay = `${Math.random() * 14}s`;
            s.innerHTML = `<svg width="${8 + Math.random()*8}" height="${8 + Math.random()*8}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>`;
            sparkleLayer.appendChild(s);
        }
    }

    // Mouse / touch reactive lighting
    if (glow && !reduceMotion) {
        window.addEventListener('mousemove', (e) => {
            const xPct = (e.clientX / window.innerWidth) * 100;
            const yPct = (e.clientY / window.innerHeight) * 100;
            glow.style.setProperty('--mx', `${xPct}%`);
            glow.style.setProperty('--my', `${yPct}%`);
        }, { passive: true });
    }
}

// ==================== SEASONAL COLLECTION SWITCHER ====================
function initSeasonalSwitcher() {
    const pills = document.querySelectorAll('.theme-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => window.setSeasonalTheme(pill.getAttribute('data-season')));
    });
}

window.setSeasonalTheme = function(season) {
    if (!SEASON_CONTENT[season] || season === activeSeason) return;
    activeSeason = season;

    document.documentElement.setAttribute('data-theme', season);

    document.querySelectorAll('.theme-pill').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-season') === season);
    });

    const content = SEASON_CONTENT[season];
    const eyebrow = document.getElementById('heroEyebrow');
    const title = document.getElementById('heroTitle');
    const subtitle = document.getElementById('heroSubtitle');
    const story = document.getElementById('storyText');

    const targets = [eyebrow, title, subtitle, story].filter(Boolean);
    gsap.to(targets, {
        opacity: 0, y: -10, duration: .35, ease: "power2.in",
        onComplete: () => {
            if (eyebrow) eyebrow.textContent = content.eyebrow;
            if (title) title.textContent = content.title;
            if (subtitle) subtitle.textContent = content.subtitle;
            if (story) story.textContent = content.story;
            gsap.to(targets, { opacity: 1, y: 0, duration: .5, ease: "power2.out" });
        }
    });
};

// ==================== DYNAMIC DATA AND SECURE DATA HYDRATION ====================
async function fetchStorefrontPayload() {
    try {
        const response = await fetch('assets/data/data.json');
        if (!response.ok) throw new Error('Data payload link disrupted');
        const data = await response.json();
        window.allProducts = data.products;
    } catch (e) {
        console.error('❌ Failed to load products data:', e.message);
        const container = document.getElementById("mawlidProductsContainer");
        if(container) {
            container.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <p class="text-red-500 font-medium">⚠️ عذراً، حدث خطأ في تحميل المنتجات</p>
                    <p class="text-primary/40 text-sm mt-2">يرجى تحديث الصفحة أو المحاولة مرة أخرى</p>
                </div>
            `;
        }
        window.allProducts = [];
    }
    renderStorefrontGrid();
}

function renderStorefrontGrid() {
    const container = document.getElementById("mawlidProductsContainer");
    if (!container) return;

    if (!window.allProducts || window.allProducts.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-20">
                <p class="text-primary/40 font-light">لا توجد منتجات متوفرة حالياً.</p>
            </div>
        `;
        renderPaginationControls(0);
        return;
    }

    const filtered = window.allProducts.filter(p => selectedCategory === 'all' || p.category === selectedCategory);

    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginatedItems = filtered.slice(start, start + PRODUCTS_PER_PAGE);

    if(paginatedItems.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-20">
                <p class="text-primary/40 font-light">لا توجد منتجات متوفرة حالياً في هذا القسم.</p>
            </div>
        `;
        renderPaginationControls(filtered.length);
        return;
    }

    container.innerHTML = paginatedItems.map((item, idx) => `
        <article class="product-card seasonal-surface p-5 rounded-[2.5rem] border border-primary/5 flex flex-col h-full opacity-0 translate-y-8" style="animation-delay: ${idx * 60}ms">
            <div class="product-image-container relative aspect-[4/5] seasonal-bg mb-6 rounded-3xl overflow-hidden">
                ${item.badge ? `<span class="absolute top-4 right-4 z-20 seasonal-surface text-seasonal-gold text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-luxury-sm border border-seasonal-gold/20">${item.badge}</span>` : ''}
                <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3C/svg%3E"
                    data-src="${item.image}"
                    alt="${item.name}"
                    class="w-full h-full object-cover transition-transform duration-700 hover:scale-105 lazy-load opacity-0"
                    onload="handleImageCompletion(this)"
                    onerror="handleImageDisruption(this)"
                >
                <div class="absolute inset-0 skeleton-loader"></div>
                <button onclick="addToCart('${item.id}')" aria-label="Add ${item.name} to Cart"
                        class="absolute bottom-5 right-5 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-luxury-md hover:bg-seasonal-gold transition-colors duration-300 z-20">
                    <i class="fas fa-plus text-sm"></i>
                </button>
            </div>
            <div class="flex flex-col flex-1 px-2 text-center">
                <span class="text-seasonal-gold text-[10px] font-bold tracking-widest uppercase mb-2">اصدار ملكي فاخر</span>
                <h4 class="text-xl font-dmserif text-primary mb-2">${item.name}</h4>
                <div class="mt-auto pt-4 border-t border-primary/5">
                    <span class="text-base font-bold text-primary">${parseInt(item.price, 10).toLocaleString("ar-EG")} ج.م</span>
                </div>
            </div>
        </article>
    `).join("");

    gsap.to('.product-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out"
    });

    lazyLoadFallbackObserver();
    renderPaginationControls(filtered.length);
}

function renderPaginationControls(totalItems) {
    const container = document.getElementById("paginationContainer");
    if(!container) return;

    const pageCount = Math.ceil(totalItems / PRODUCTS_PER_PAGE);
    if(pageCount <= 1) {
        container.innerHTML = "";
        return;
    }

    let buttonsHtml = "";
    for(let i = 1; i <= pageCount; i++) {
        buttonsHtml += `
            <button onclick="changeStorePage(${i})" class="w-10 h-10 rounded-full font-bold text-xs border transition-all duration-300 ${currentPage === i ? 'bg-primary text-white border-primary' : 'bg-white text-primary/60 border-primary/10 hover:border-primary'}">
                ${i}
            </button>
        `;
    }
    container.innerHTML = buttonsHtml;
}

window.changeStorePage = (page) => {
    currentPage = page;
    renderStorefrontGrid();
    document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
};

window.filterCategory = (category, btn) => {
    selectedCategory = category;
    currentPage = 1;

    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    const target = btn || document.querySelector(`.category-btn[data-category="${category}"]`);
    if (target) target.classList.add('active');

    renderStorefrontGrid();
};

// ==================== ERROR-RESILIENT IMAGE HANDLING VECTORS ====================
function handleImageCompletion(img) {
    img.classList.remove('opacity-0');
    img.style.opacity = '1';
    const loader = img.parentElement.querySelector('.skeleton-loader');
    if(loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 600);
    }
}

function handleImageDisruption(img) {
    img.onerror = null;
    img.src = RESILIENT_FALLBACK_IMG;
    handleImageCompletion(img);
}

function lazyLoadFallbackObserver() {
    const lazyImages = document.querySelectorAll('img.lazy-load');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.remove('lazy-load');
                    obs.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => observer.observe(img));
    } else {
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.classList.remove('lazy-load');
        });
    }
}

// ==================== DELIVERY / PICKUP TOGGLE ====================
function initDeliveryFields() {
    const deliveryFields = document.getElementById('deliveryFields');
    if (deliveryFields) {
        deliveryFields.classList.add('hidden');
        deliveryFields.style.maxHeight = '0';
        deliveryFields.style.opacity = '0';
    }
    const pickupRadio = document.querySelector('input[name="orderType"][value="pickup"]');
    if (pickupRadio) pickupRadio.checked = true;
}

window.toggleDeliveryFields = function() {
    const deliveryFields = document.getElementById('deliveryFields');
    const selected = document.querySelector('input[name="orderType"]:checked');
    if (selected && selected.value === 'delivery') {
        deliveryFields.classList.remove('hidden');
        deliveryFields.style.maxHeight = '500px';
        deliveryFields.style.opacity = '1';
        document.getElementById('governorateSelect').setAttribute('required', 'required');
        document.getElementById('deliveryAddress').setAttribute('required', 'required');
    } else {
        deliveryFields.style.maxHeight = '0';
        deliveryFields.style.opacity = '0';
        setTimeout(() => {
            deliveryFields.classList.add('hidden');
        }, 300);
        document.getElementById('governorateSelect').removeAttribute('required');
        document.getElementById('deliveryAddress').removeAttribute('required');
    }
};

// ==================== LUXURY TRANSACTIONS CART DRAWERS ENGINE ====================
window.openCart = () => {
    const modal = document.getElementById("cartModal");
    const drawer = modal?.querySelector('.cart-drawer');
    if(!modal || !drawer) return;

    modal.classList.remove("hidden");
    modal.style.display = "flex";
    setTimeout(() => {
        drawer.classList.remove('translate-x-full');
    }, 20);
};

window.closeCart = () => {
    const modal = document.getElementById("cartModal");
    const drawer = modal?.querySelector('.cart-drawer');
    if(!modal || !drawer) return;

    drawer.classList.add('translate-x-full');
    setTimeout(() => {
        modal.classList.add("hidden");
        modal.style.display = "none";
    }, 500);
};

window.addToCart = (id) => {
    const product = window.allProducts.find(p => p.id == id);
    if (!product) return;

    const existingItem = cart.find(item => item.id == id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    syncCartUIMatrix();
    window.openCart();
};

function syncCartUIMatrix() {
    const countEl = document.getElementById('cartCount');
    const itemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const checkoutContainer = document.getElementById('cartCheckout');
    const totalEl = document.getElementById('cartTotal');
    const subtotalEl = document.getElementById('cartSubtotal');

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countEl) countEl.innerText = totalQuantity;

    if(countEl) gsap.fromTo(countEl, { scale: 1.4 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });

    if (cart.length === 0) {
        if(emptyCart) emptyCart.classList.remove('hidden');
        if(checkoutContainer) checkoutContainer.style.display = 'none';
        if(itemsContainer) itemsContainer.innerHTML = '';
        return;
    }

    if(emptyCart) emptyCart.classList.add('hidden');
    if(checkoutContainer) checkoutContainer.style.display = 'block';

    if(itemsContainer) {
        itemsContainer.innerHTML = cart.map((item, idx) => `
            <div class="flex items-center gap-4 seasonal-bg p-4 rounded-3xl border border-primary/5">
                <div class="w-20 h-20 rounded-2xl overflow-hidden bg-white flex-shrink-0 border border-primary/5">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" onerror="this.src=RESILIENT_FALLBACK_IMG" />
                </div>
                <div class="flex-1">
                    <h4 class="font-bold text-primary text-sm">${item.name}</h4>
                    <p class="text-seasonal-gold font-bold text-xs mt-1">${parseInt(item.price, 10).toLocaleString("ar-EG")} ج.م</p>
                    <div class="flex items-center gap-3 mt-3">
                        <button onclick="updateCartQuantity(${idx}, -1)" class="w-7 h-7 rounded-full bg-white text-primary border border-primary/10 hover:bg-primary hover:text-white transition-colors flex items-center justify-center font-bold text-xs">-</button>
                        <span class="font-bold text-xs w-4 text-center">${item.quantity}</span>
                        <button onclick="updateCartQuantity(${idx}, 1)" class="w-7 h-7 rounded-full bg-white text-primary border border-primary/10 hover:bg-primary hover:text-white transition-colors flex items-center justify-center font-bold text-xs">+</button>
                    </div>
                </div>
                <button onclick="removeFromCartModule(${idx})" class="text-primary/20 hover:text-red-600 transition-colors px-2" aria-label="Remove Item">
                    <i class="fas fa-trash-alt text-sm"></i>
                </button>
            </div>
        `).join('');
    }

    const aggregatedSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if(totalEl) totalEl.innerText = aggregatedSum.toLocaleString("ar-EG") + ' ج.م';
    if(subtotalEl) subtotalEl.innerText = aggregatedSum.toLocaleString("ar-EG") + ' ج.م';
}

window.updateCartQuantity = (index, delta) => {
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
        syncCartUIMatrix();
    }
};

window.removeFromCartModule = (index) => {
    cart.splice(index, 1);
    syncCartUIMatrix();
};

// ==================== TRANSACTION CHECKOUT & VALIDATION PROTOCOLS ====================
window.sendOrder = function() {
    const errorLog = document.getElementById('cartError');
    if (cart.length === 0) {
        if(errorLog) errorLog.innerText = 'عذراً، السلة فارغة! يرجى إضافة بعض المقتنيات أولاً لتفعيل الطلب.';
        return;
    }
    if(errorLog) errorLog.innerText = '';

    const orderType = document.querySelector('input[name="orderType"]:checked');
    if (orderType && orderType.value === 'delivery') {
        const governorate = document.getElementById('governorateSelect').value;
        const address = document.getElementById('deliveryAddress').value.trim();
        if (!governorate) {
            if(errorLog) errorLog.innerText = 'يرجى اختيار المحافظة للتوصيل.';
            return;
        }
        if (!address) {
            if(errorLog) errorLog.innerText = 'يرجى كتابة العنوان بالتفصيل للتوصيل.';
            return;
        }
    }

    const modal = document.getElementById('phoneModal');
    if(modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
};

window.closePhoneModal = (clearInputs = false) => {
    const modal = document.getElementById('phoneModal');
    if(modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
    if (clearInputs) {
        const nameNode = document.getElementById('customerNameInput');
        const phoneNode = document.getElementById('customerPhoneInput');
        const errNode = document.getElementById('phoneErrorMsg');
        if(nameNode) nameNode.value = '';
        if(phoneNode) phoneNode.value = '';
        if(errNode) errNode.classList.add('hidden');
    }
};

window.confirmPhoneAndSend = function() {
    const name = document.getElementById('customerNameInput')?.value.trim();
    const phone = document.getElementById('customerPhoneInput')?.value.trim();
    const errorMsg = document.getElementById('phoneErrorMsg');

    if (!name || !phone) {
        if(errorMsg) {
            errorMsg.classList.remove('hidden');
            errorMsg.innerText = 'يرجى ملء الحقول الإلزامية لتأكيد الهوية وعنوان الشحن الخاص بكم.';
        }
        return;
    }

    const cleanerPhoneRegex = /^01[0125][0-9]{8}$/;
    if (!cleanerPhoneRegex.test(phone)) {
        if(errorMsg) {
            errorMsg.classList.remove('hidden');
            errorMsg.innerText = 'رقم الجوال المدخل غير صحيح. يرجى إدخال رقم هاتف مصري فعال (مثال: 01012345678).';
        }
        return;
    }

    if(errorMsg) errorMsg.classList.add('hidden');

    const billingItemsPayload = cart.map(item =>
        `• ${item.name} [العدد: ${item.quantity}] = ${(item.price * item.quantity).toLocaleString("ar-EG")} ج.م`
    ).join('\n');

    const calculatedTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const contextNotes = document.getElementById('customerNotes')?.value.trim();

    const orderType = document.querySelector('input[name="orderType"]:checked');
    let deliveryInfo = '';
    if (orderType && orderType.value === 'delivery') {
        const governorate = document.getElementById('governorateSelect').value;
        const address = document.getElementById('deliveryAddress').value.trim();
        deliveryInfo = `🚚 *طريقة التوصيل:* توصيل\n📍 *المحافظة:* ${governorate}\n🏠 *العنوان:* ${address}\n`;
    } else {
        deliveryInfo = '🏢 *طريقة الاستلام:* استلام من الفرع (مقر الشركة)\n';
    }

    const dispatchTextPayload = `🛍️ *طلب شراء جديد - ديسپاسيتو باتيسري*\n\n` +
                                `👤 *اسم العميل الكريم:* ${name}\n` +
                                `📱 *رقم الجوال للتواصل:* ${phone}\n\n` +
                                `${deliveryInfo}\n` +
                                `📦 *تفاصيل المقتنيات:* \n${billingItemsPayload}\n\n` +
                                `💰 *الإجمالي الصافي للطلب:* ${calculatedTotal.toLocaleString("ar-EG")} ج.م\n` +
                                (contextNotes ? `📝 *ملاحظات إضافية:* ${contextNotes}` : '');

    const encryptedUriPayload = encodeURIComponent(dispatchTextPayload);
    const endpointWireDestination = `https://wa.me/201234567890?text=${encryptedUriPayload}`;

    window.closePhoneModal(true);
    window.closeCart();
    window.open(endpointWireDestination, '_blank');

    cart = [];
    syncCartUIMatrix();
};

// ==================== INTERACTIVE ACCORDION UX ACTIONS ====================
window.toggleFAQ = (button) => {
    const item = button.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.faq-answer').style.maxHeight = null;
    });

    if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
    }
};