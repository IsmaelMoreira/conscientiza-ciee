document.getElementById("btnAceitar").addEventListener("click", async () => {
    try {
        const response = await fetch("/api/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ aceitou: true })
        });
        const data = await response.json();
        alert(data.status === "ok" ? "Registrado com sucesso!" : "Erro ao registrar");
    } catch (err) {
        alert("Erro na requisição");
        console.error(err);
    }
});

// ======= DADOS DOS TIPOS DE ASSÉDIO =======
const TIPOS = [
    {
        titulo: 'Assédio Sexual', icone: '🧩', etiqueta: 'Respeito',
        definicao: 'Qualquer abordagem, insinuação, comentário, chantagem ou toque de conotação sexual sem consentimento.',
        exemplos: [
            'Comentários, "cantadas" e piadas de teor sexual indesejadas',
            'Toques, beijos forçados, encostar sem permissão',
            'Propostas em troca de vantagens (quid pro quo)'
        ],
        comoAgir: [
            'Se for seguro, deixe claro que é indesejado',
            'Guarde mensagens/prints e procure apoio',
            'Denuncie a canais internos (empresa/escola) e oficiais (180/100)'
        ]
    },
    {
        titulo: 'Assédio Moral', icone: '🧠', etiqueta: 'Dignidade',
        definicao: 'Exposições e humilhações repetidas que afetem a dignidade, com cobranças abusivas, isolamento e ameaças.',
        exemplos: [
            'Gritar, ridicularizar em público, boatos',
            'Metas impossíveis, retirar tarefas pra isolar',
            'Ignorar, excluir de reuniões propositalmente'
        ],
        comoAgir: [
            'Registre fatos (datas, locais, pessoas)',
            'Procure RH/comissão de ética ou sindicato',
            'Busque orientação jurídica/psicológica'
        ]
    },
    {
        titulo: 'Assédio no Trabalho', icone: '🏢', etiqueta: 'Ambiente seguro',
        definicao: 'Conjunto de condutas abusivas (moral, sexual, intimidação) que criam ambiente hostil e inseguro no trabalho.',
        exemplos: [
            'Chantagens por promoção',
            'Humilhações recorrentes em reuniões',
            'Controle excessivo e invasivo da vida privada'
        ],
        comoAgir: [
            'Conheça as políticas internas e canais de denúncia',
            'Documente tudo, busque testemunhas',
            'Se necessário, apoio jurídico e órgãos fiscalizadores'
        ]
    },
    {
        titulo: 'Assédio em Espaços Públicos', icone: '📍', etiqueta: 'Consentimento',
        definicao: 'Abordagens invasivas, olhares insistentes, perseguição e toques sem consentimento em ambientes públicos.',
        exemplos: [
            'Cantadas insistentes, comentários sobre corpo',
            'Seguir a pessoa, bloquear passagem',
            'Aproximação e toque sem permissão'
        ],
        comoAgir: [
            'Busque locais movimentados e ajuda de terceiros',
            'Registre ocorrência quando possível',
            'Use aplicativos/botões de emergência se existir'
        ]
    },
    {
        titulo: 'Assédio Online (Cyberbullying/Stalking)', icone: '🌐', etiqueta: 'Segurança digital',
        definicao: 'Ameaças, perseguição, vazamento de dados/imagens, spam de mensagens hostis e humilhações em ambientes digitais.',
        exemplos: [
            'Mensagens abusivas e ataques em comentários',
            'Espionagem, perseguição e doxing',
            'Compartilhar nudes/imagens íntimas sem consentimento'
        ],
        comoAgir: [
            'Bloqueie, documente (prints, links, perfis) e reporte',
            'Ative autenticação de 2 fatores e revogue acessos',
            'Boletim de ocorrência; leis variam por estado/país'
        ]
    },
    {
        titulo: 'Assédio Escolar', icone: '🏫', etiqueta: 'Ambiente educativo',
        definicao: 'Ações repetidas de intimidação, humilhação ou constrangimento entre estudantes ou entre adulto e estudante.',
        exemplos: [
            'Apelidos pejorativos, exclusão, humilhação em sala',
            'Exposição de imagens sem consentimento',
            'Coerção para favores, inclusive de teor sexual'
        ],
        comoAgir: [
            'Procure orientação pedagógica/coordenação',
            'Acione responsáveis e rede de proteção',
            'Documente e solicite medidas protetivas'
        ]
    }
];

// ======= FUNÇÃO AUXILIAR =======
function el(tag, attrs = {}, children = []) {
    const n = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
        if (k === 'class') n.className = v;
        else if (k === 'html') n.innerHTML = v;
        else n.setAttribute(k, v)
    });
    children.forEach(c => n.appendChild(c));
    return n;
}

// ======= RENDER CARDS =======
const cardsWrap = document.getElementById('cardsTipos');
TIPOS.forEach((t, i) => {
    const card = el('article', { class: 'card', tabindex: '0', role: 'group', 'aria-labelledby': `h${i}` });
    card.append(
        el('div', { class: 'chip' }, [document.createTextNode(`${t.icone} ${t.etiqueta}`)]),
        el('h3', { id: `h${i}` }, [document.createTextNode(t.titulo)]),
        el('p', {}, [document.createTextNode(t.definicao)])
    );
    const d = el('details');
    d.append(
        el('summary', {}, [document.createTextNode('Exemplos e como agir')]),
        el('div', { style: 'display:grid; gap:.5rem; margin-top:.5rem' }, [
            el('div', {}, [document.createTextNode('Exemplos:')]),
            el('ul', {}, t.exemplos.map(x => el('li', {}, [document.createTextNode(x)]))),
            el('div', {}, [document.createTextNode('Como agir:')]),
            el('ul', {}, t.comoAgir.map(x => el('li', {}, [document.createTextNode(x)])))
        ])
    );
    card.append(d);
    cardsWrap.append(card);
});

// ======= QUIZ =======
const QUIZ = [
    { q: '“Se a pessoa não disse não, então está tudo bem.”', a: ['Mito', 'Verdade'], correct: 0, tip: 'Consentimento precisa ser claro, entusiástico e contínuo.' },
    { q: 'Assédio moral pode acontecer mesmo sem xingamentos.', a: ['Verdade', 'Mito'], correct: 0, tip: 'Humilhação, isolamento e metas abusivas também são assédio.' },
    { q: 'Compartilhar nudes de outra pessoa sem permissão é crime em muitos lugares.', a: ['Verdade', 'Mito'], correct: 0, tip: 'Além de imoral, pode ser ilegal. Busque apoio jurídico.' },
    { q: 'Cantadas insistentes em via pública podem ser assédio.', a: ['Verdade', 'Mito'], correct: 0, tip: 'Se há insistência e desconforto, há violação de limites.' }
];

const quizBox = document.getElementById('quizBox');
QUIZ.forEach((it, idx) => {
    const q = el('div', { class: 'q' });
    q.append(el('div', { style: 'font-weight:700' }, [document.createTextNode((idx + 1) + '. ' + it.q)]));
    const g = el('div', { role: 'radiogroup', 'aria-label': `Pergunta ${idx + 1}` });
    it.a.forEach((alt, i) => {
        const id = `q${idx}a${i}`;
        const label = el('label', { for: id, style: 'display:flex; align-items:center; gap:.5rem; margin:.35rem 0' });
        const input = el('input', { type: 'radio', name: `q${idx}`, id });
        label.append(input, document.createTextNode(alt));
        g.append(label);
    });
    q.append(g);
    quizBox.append(q);
});

document.getElementById('quizSubmit').addEventListener('click', () => {
    let score = 0;
    QUIZ.forEach((q, idx) => {
        const val = [...document.querySelectorAll(`input[name=q${idx}]`)].find(i => i.checked);
        if (!val) return;
        const chosen = parseInt(val.id.split('a')[1], 10);
        if (chosen === q.correct) score++;
    });
    const pct = Math.round((score / QUIZ.length) * 100);
    const msg = pct >= 75 ? `🎉 Muito bem! Você acertou ${score}/${QUIZ.length} (${pct}%).` : `Você acertou ${score}/${QUIZ.length} (${pct}%). Continue praticando.`;
    const dicas = '\nDicas: ' + QUIZ.map(q => '• ' + q.tip).join('\n');
    const out = document.getElementById('quizScore');
    out.textContent = msg + dicas;
    out.style.color = pct >= 75 ? 'var(--ok)' : 'var(--warn)';
});

// ======= HISTÓRIA INTERATIVA =======
const STORY = {
    start: {
        text: 'Você presencia um colega fazendo "piadas" constrangedoras com outra pessoa no trabalho. O clima fica tenso. O que você faz?',
        choices: [
            { label: 'Ignorar, não é problema meu', to: 'ignorar' },
            { label: 'Chamar a pessoa de canto e oferecer apoio', to: 'apoio' },
            { label: 'Intervir com segurança e dizer que a piada é inadequada', to: 'intervir' }
        ]
    },
    ignorar: {
        text: 'A situação se repete e piora. A vítima se afasta e a equipe perde confiança. O que você poderia fazer diferente?',
        choices: [
            { label: 'Oferecer apoio e registrar o ocorrido', to: 'apoio' }
        ]
    },
    apoio: {
        text: 'Você valida o sentimento da pessoa e pergunta como pode ajudar. Vocês registram data e local do ocorrido. Próximo passo?',
        choices: [
            { label: 'Sugerir buscar RH/comissão de ética', to: 'rh' },
            { label: 'Conversar com o autor da piada, se for seguro', to: 'dialogo' }
        ]
    },
    intervir: {
        text: 'Com calma, você diz: "Esses comentários são inadequados." A conversa muda de tom. Depois, você oferece apoio à vítima. Próximo passo?',
        choices: [
            { label: 'Registrar o ocorrido e acionar canais internos', to: 'rh' }
        ]
    },
    rh: {
        text: 'O caso é formalizado. A empresa orienta toda a equipe e reforça políticas. Ambiente mais seguro.',
        choices: [{ label: 'Recomeçar', to: 'start' }]
    },
    dialogo: {
        text: 'Você explica o impacto das "piadas". A pessoa reconhece e se compromete a mudar. Ainda assim, registre o caso.',
        choices: [{ label: 'Recomeçar', to: 'start' }]
    }
};

function renderStory(node = 'start') {
    const n = STORY[node];
    document.getElementById('storyNode').textContent = n.text;
    const choices = document.getElementById('storyChoices');
    choices.innerHTML = '';
    n.choices.forEach(c => {
        const b = el('button', { class: 'btn ghost' });
        b.textContent = c.label;
        b.addEventListener('click', () => renderStory(c.to));
        choices.append(b);
    });
}
renderStory('start');

// ======= ACESSIBILIDADE: TECLADO ABRE <details> =======
document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && document.activeElement && document.activeElement.matches('article.card')) {
        const det = document.activeElement.querySelector('details');
        if (det) det.open = !det.open;
    }
});

// ======= MENU MOBILE =======
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
        });
    });
}

// ======= MODAL DE CONTEÚDO SENSÍVEL =======
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalTrigger");
    const acceptBtn = document.getElementById("acceptBtn");
    const exitBtn = document.getElementById("exitBtn");

    if (!modal || !acceptBtn || !exitBtn) return;

    if (!localStorage.getItem("contentConsent")) {
        modal.style.display = "flex";
    }

    acceptBtn.addEventListener("click", async () => {
        localStorage.setItem("contentConsent", "true");
        modal.style.display = "none";

        let ip = "não detectado";

        try {
            const res = await fetch("https://api.ipify.org?format=json");
            if (res.ok) {
                const data = await res.json();
                ip = data.ip || ip;
            }
        } catch (e) {
            console.warn("Não foi possível obter o IP:", e);
        }

        try {
            fetch('/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aceitou: true })
            });
            console.log("Dados enviados com sucesso:", { aceitou: true, ip });
        } catch (e) {
            console.warn("Não foi possível enviar os dados para o backend:", e);
        }
    });

    exitBtn.addEventListener("click", () => {
        window.location.href = "https://www.google.com";
    });
});
