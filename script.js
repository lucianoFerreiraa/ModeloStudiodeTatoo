// ====== DADOS DA GALERIA ======
const galleryItems = [
    {
        id: 1,
        category: 'blackwork',
        src: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=800&q=80',
        title: 'Blackwork Geométrico',
        artist: 'Estilo Autoral'
    },
    {
        id: 2,
        category: 'fineline',
        src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80',
        title: 'Linha Fina Botânica',
        artist: 'Delicado'
    },
    {
        id: 3,
        category: 'realismo',
        src: 'https://images.unsplash.com/photo-1543059080-f9b1272213d5?w=800&q=80',
        title: 'Retrato Realismo',
        artist: 'Sombreamento PB'
    },
    {
        id: 4,
        category: 'blackwork',
        src: 'https://images.unsplash.com/photo-1530021232320-687d8e3dba54?w=800&q=80',
        title: 'Tribal Moderno',
        artist: 'Impacto Visual'
    },
    {
        id: 5,
        category: 'fineline',
        src: 'https://images.unsplash.com/photo-1598211686290-a8ef209d87c5?w=800&q=80',
        title: 'Minimalista Linear',
        artist: 'Elegância'
    },
    {
        id: 6,
        category: 'realismo',
        src: 'https://images.unsplash.com/photo-1611501662435-507daa950c2e?auto=format&fit=crop&w=800&q=80',
        title: 'Animal Realismo',
        artist: 'Detalhes Finos'
    },
    {
        id: 7,
        category: 'blackwork',
        src: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=800&q=80',
        title: 'Totalmente Preto Sleeve',
        artist: 'Cobertura Densa'
    },
    {
        id: 8,
        category: 'fineline',
        src: 'https://images.unsplash.com/photo-1542727365-19732a80dcfd?w=800&q=80',
        title: 'Escrita Autoral',
        artist: 'Traço Único'
    },
    {
        id: 9,
        category: 'realismo',
        src: 'https://images.unsplash.com/photo-1562962230-16e4623d36e6?w=800&q=80',
        title: 'Olho Hiper-Realista',
        artist: 'Alta Definição'
    }
];

// Renderizar galeria
function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = galleryItems.map(item => `
        <div class="gallery-card gallery-item aspect-square rounded" data-category="${item.category}" data-src="${item.src}">
            <img src="${item.src}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover" onerror="this.style.background='linear-gradient(135deg,#222,#111)';this.alt='Imagem indisponível';">
            <div class="gallery-overlay">
                <div>
                    <div class="font-stencil text-white text-sm tracking-wider">${item.title}</div>
                    <div class="text-xs text-[#E63946] mt-0.5">${item.artist}</div>
                </div>
                <div class="absolute top-3 right-3 w-8 h-8 bg-[#E63946] rounded-full flex items-center justify-center">
                    <i data-lucide="maximize-2" class="w-4 h-4 text-white"></i>
                </div>
            </div>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
    attachGalleryEvents();
}

function attachGalleryEvents() {
    document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', () => {
            const src = card.dataset.src;
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImg');
            if (lightboxImg) lightboxImg.src = src;
            if (lightbox) lightbox.classList.add('active');
        });
    });
}

// ====== FILTRO DE ABAS ======
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden-filter');
            } else {
                item.classList.add('hidden-filter');
            }
        });
    });
});

// ====== LIGHTBOX ======
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        if (lightbox) lightbox.classList.remove('active');
    });
}
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox) lightbox.classList.remove('active');
});

// ====== MENU MOBILE ======
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        if (mobileMenu) mobileMenu.classList.toggle('open');
    });
}
document.querySelectorAll('#mobileMenu a').forEach(a => {
    a.addEventListener('click', () => {
        if (mobileMenu) mobileMenu.classList.remove('open');
    });
});

// ====== RÓTULO DE UPLOAD DE ARQUIVO ======
const refFile = document.getElementById('referenceFile');
if (refFile) {
    refFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const label = document.getElementById('fileLabel');
        if (file && label) {
            label.textContent = `✓ ${file.name}`;
            label.style.color = '#E63946';
        } else if (label) {
            label.textContent = 'CLIQUE PARA ENVIAR OU ARRASTE UMA IMAGEM';
            label.style.color = '';
        }
    });
}

// ====== TOAST ======
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastText');
    if (toastText) toastText.textContent = message;
    if (toast) {
        toast.style.borderColor = isError ? '#ff4444' : '#E63946';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }
}

// ====== FADE IN ON SCROLL ======
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, {
    threshold: 0.1
});
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ====== GUIA DE DOWNLOAD (simulado) ======
const downloadBtn = document.getElementById('downloadGuide');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        const content = `GUIA DE CUIDADOS PÓS-TATTOO\n1. Mantenha o filme/bandagem pelas primeiras 2-4 horas\n2. Lave com água morna e sabão neutro 2-3x ao dia.\n3. Aplique pomada cicatrizante em camada fina.`;
        const blob = new Blob([content], {
            type: 'text/plain'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'guia-pos-tattoo.txt';
        a.click();
        URL.revokeObjectURL(url);
        showToast('GUIA BAIXADA COM SUCESSO!');
    });
}

// ====== CONFIGURAÇÃO PADRÃO ======
const defaultConfig = {
    logo_text: "SUA LOGO AQUI!",
    hero_title: "Sua pele, sua história, nossa arte.",
    hero_subtitle: "Especialistas em traços finos, realismo e blackwork. Segurança e arte em cada agulha.",
    hero_cta: "SOLICITAR ORÇAMENTO AGORA",
    portfolio_title: "Portfólio de Artista",
    portfolio_subtitle: "Explore nossos estilos autorais. Cada traço carrega uma assinatura.",
    form_title: "Monte Seu Projeto",
    form_subtitle: "Preencha os detalhes abaixo. Nosso tatuador analisará e enviará um retorno com valores e disponibilidade.",
    care_title: "Nossa biossegurança",
    care_text: "Materiais 100% descartáveis, aplicados em ambiente esterilizado. Seguimos rigorosamente a ANVISA RDC 55/08 e protocolos internacionais de controle de infecção.",
    whatsapp_number: "5569992892060",
    whatsapp_message: "Olá! Gostaria de tirar uma dúvida sobre como ter um site assim."
};

// ====== ATUALIZAR LINK DO WHATSAPP ======
function updateWhatsapp(config) {
    const number = (config.whatsapp_number || defaultConfig.whatsapp_number).replace(/\D/g, '');
    const msg = encodeURIComponent(config.whatsapp_message || defaultConfig.whatsapp_message);
    const waBtn = document.getElementById('whatsappBtn');
    if (waBtn) waBtn.href = `https://wa.me/${number}?text=${msg}`;
}

// ====== INICIALIZAÇÃO DO SDK DO ELEMENTO ======
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => {
            const get = (k) => config[k] || defaultConfig[k];
            document.getElementById('logoText').textContent = get('logo_text');
            document.getElementById('footerLogo').textContent = get('logo_text');

            const heroTitle = get('hero_title');
            const parts = heroTitle.split(',');
            if (parts.length >= 2) {
                const last = parts.pop().trim();
                document.getElementById('heroTitle').innerHTML = `${parts.join(',')},<br><span class="text-[#E63946]">${last}</span>`;
            } else {
                document.getElementById('heroTitle').textContent = heroTitle;
            }

            document.getElementById('heroSubtitle').textContent = get('hero_subtitle');
            document.querySelector('#heroCTA').innerHTML = `<i data-lucide="zap" class="w-4 h-4"></i> ${get('hero_cta')}`;
            document.getElementById('portfolioTitle').textContent = get('portfolio_title');
            document.getElementById('portfolioSubtitle').textContent = get('portfolio_subtitle');
            document.getElementById('formTitle').textContent = get('form_title');
            document.getElementById('formSubtitle').textContent = get('form_subtitle');
            document.getElementById('careTitle').textContent = get('care_title');
            document.getElementById('careText').textContent = get('care_text');
            updateWhatsapp(config);
            if (window.lucide) lucide.createIcons();
        },
        mapToCapabilities: (config) => ({
            recolorables: [],
            borderables: [],
            fontEditable: undefined,
            fontSizeable: undefined
        }),
        mapToEditPanelValues: (config) => new Map([
            ["logo_text", config.logo_text || defaultConfig.logo_text],
            ["hero_title", config.hero_title || defaultConfig.hero_title],
            ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
            ["hero_cta", config.hero_cta || defaultConfig.hero_cta],
            ["portfolio_title", config.portfolio_title || defaultConfig.portfolio_title],
            ["portfolio_subtitle", config.portfolio_subtitle || defaultConfig.portfolio_subtitle],
            ["form_title", config.form_title || defaultConfig.form_title],
            ["form_subtitle", config.form_subtitle || defaultConfig.form_subtitle],
            ["care_title", config.care_title || defaultConfig.care_title],
            ["care_text", config.care_text || defaultConfig.care_text],
            ["whatsapp_number", config.whatsapp_number || defaultConfig.whatsapp_number],
            ["whatsapp_message", config.whatsapp_message || defaultConfig.whatsapp_message]
        ])
    });
}

// ====== SDK DE DADOS ======
let currentRecordCount = 0;
const dataHandler = {
    onDataChanged(data) {
        currentRecordCount = data.length;
    }
};

async function initDataSdk() {
    if (window.dataSdk) {
        const result = await window.dataSdk.init(dataHandler);
        if (!result.isOk) {
            console.error('Falha ao inicializar o SDK de dados');
        }
    }
}

// ====== ENVIO DO FORMULÁRIO ======
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (currentRecordCount >= 999) {
            showToast('LIMITE DE ORÇAMENTOS ATINGIDO.', true);
            return;
        }
        const btn = document.getElementById('submitBtn');
        const text = document.getElementById('submitText');
        if (btn) {
            btn.disabled = true;
            btn.style.opacity = '0.7';
        }
        if (text) text.innerHTML = '<span class="loader"></span> ENVIANDO...';

        const formData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            size: document.getElementById('size').value,
            bodyLocation: document.getElementById('bodyLocation').value,
            style: document.getElementById('style').value,
            description: document.getElementById('description').value || '',
            referenceUrl: document.getElementById('referenceFile').files[0]?.name || '',
            createdAt: new Date().toISOString()
        };

        if (window.dataSdk) {
            const result = await window.dataSdk.create(formData);
            if (result.isOk) {
                showToast('ORÇAMENTO ENVIADO COM SUCESSO!');
                quoteForm.reset();
                const fileLabel = document.getElementById('fileLabel');
                if (fileLabel) {
                    fileLabel.textContent = 'CLIQUE PARA ENVIAR OU ARRASTE UMA IMAGEM';
                    fileLabel.style.color = '';
                }
            } else {
                showToast('ERRO AO ENVIAR. TENTE NOVAMENTE.', true);
            }
        } else {
            showToast('ORÇAMENTO REGISTRADO!');
            quoteForm.reset();
        }
        if (btn) {
            btn.disabled = false;
            btn.style.opacity = '';
        }
        if (text) text.textContent = 'ENVIAR PARA ANÁLISE DO TATUADOR';
    });
}

// ====== INICIALIZAÇÃO ======
function initialize() {
    renderGallery();
    if (window.lucide) lucide.createIcons();
    updateWhatsapp(defaultConfig);
    initDataSdk();
}

document.addEventListener('DOMContentLoaded', initialize);
if (document.readyState !== 'loading') {
    initialize();
}

// Cloudflare helper
(function() {
    function c() {
        var b = a.contentDocument || a.contentWindow.document;
        if (b) {
            var d = b.createElement('script');
            d.innerHTML = "window.__CF$cv$params={r:'9f387e5507dc78c2',t:'MTc3NzQwNDc1Mi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
            b.getElementsByTagName('head')[0].appendChild(d);
        }
    }
    if (document.body) {
        var a = document.createElement('iframe');
        a.height = 1;
        a.width = 1;
        a.style.position = 'absolute';
        a.style.top = 0;
        a.style.left = 0;
        a.style.border = 'none';
        a.style.visibility = 'hidden';
        document.body.appendChild(a);
        if ('loading' !== document.readyState) c();
        else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c);
        else {
            var e = document.onreadystatechange || function() {};
            document.onreadystatechange = function(b) {
                e(b);
                'loading' !== document.readyState && (document.onreadystatechange = e, c());
            };
        }
    }

    window.onscroll = function() {
    checkScrollDepth();
};

(function() {
    const modal = document.getElementById('impulso-modal-container');
    const closeBtn = document.getElementById('impulso-close-x');

    // 1. Função para fechar
    function hideModal() {
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    }

    // 2. Evento de Clique no Botão de Fechar
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hideModal();
        });
    }

    // 3. Lógica de Scroll (50%)
    window.addEventListener('scroll', function() {
        if (!sessionStorage.getItem('impulso_popup_done')) {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrollPercent = (scrollTop / docHeight) * 100;

            if (scrollPercent >= 50) {
                if (modal) {
                    modal.classList.add('active');
                    sessionStorage.setItem('impulso_popup_done', 'true');
                }
            }
        }
    });
})();
})();