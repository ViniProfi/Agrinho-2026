// Aguarda o carregamento completo do DOM para evitar erros de execução
document.addEventListener("DOMContentLoaded", () => {
    
    // VARIÁVEIS DE SELEÇÃO DOS ELEMENTOS DO DOM
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    
    const themeToggleBtn = document.getElementById("theme-toggle");
    const btnFontIncrease = document.getElementById("btn-font-increase");
    const btnFontDecrease = document.getElementById("btn-font-decrease");
    
    const btnCalcular = document.getElementById("btn-calcular");
    const selectRegiao = document.getElementById("select-regiao");
    const inputTecnologias = document.getElementById("input-tecnologias");
    const boxResultado = document.getElementById("resultado-simulacao");
    const txtResultado = document.getElementById("texto-resultado");

    let currentFontSize = 16; // Guarda o estado do tamanho da fonte em px

    // ==========================================
    // 1. FUNÇÃO PARA SISTEMA DE ABAS (REGIÕES)
    // ==========================================
    tabButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            // Remove estados ativos anteriores
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active-content"));

            // Ativa o botão selecionado
            e.target.classList.add("active");
            
            // Determina o ID do conteúdo correspondente com base no botão clicado
            let targetId = "";
            if (e.target.id === "tab-co") targetId = "content-co";
            else if (e.target.id === "tab-se") targetId = "content-se";
            else if (e.target.id === "tab-ne") targetId = "content-ne";
            else if (e.target.id === "tab-su") targetId = "content-su";

            document.getElementById(targetId).classList.add("active-content");
        });
    });

    // ==========================================
    // 2. FUNÇÃO PARA ALTERNAR TEMA (CLARO/ESCURO)
    // ==========================================
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        
        if (currentTheme === "dark") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
    });

    // Carrega a preferência de tema gravada no navegador do usuário
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    // ==========================================
    // 3. FUNÇÃO PARA CONTROLE DE ACESSIBILIDADE (FONTE)
    // ==========================================
    btnFontIncrease.addEventListener("click", () => {
        if (currentFontSize < 22) { // Limite máximo seguro
            currentFontSize += 1;
            document.documentElement.style.setProperty('--base-font-size', currentFontSize + 'px');
        }
    });

    btnFontDecrease.addEventListener("click", () => {
        if (currentFontSize > 14) { // Limite mínimo seguro
            currentFontSize -= 1;
            document.documentElement.style.setProperty('--base-font-size', currentFontSize + 'px');
        }
    });

    // ==========================================
    // 4. FUNÇÃO DO SIMULADOR (CÁLCULO E MANIPULAÇÃO DO DOM)
    // ==========================================
    btnCalcular.addEventListener("click", () => {
        const regiaoSelecionada = selectRegiao.value;
        const qtdTecnologias = parseInt(inputTecnologias.value);

        if (!regiaoSelecionada || isNaN(qtdTecnologias)) {
            alert("Por favor, preencha todos os campos do simulador!");
            return;
        }

        let nivelResiliencia = "";
        let mensagemAdicional = "";

        if (qtdTecnologias <= 1) {
            nivelResiliencia = "BAIXO";
            mensagemAdicional = "Atenção! Sua propriedade está muito vulnerável aos impactos climáticos regionais. Considere implementar o Plantio Direto ou consórcios de culturas.";
        } else if (qtdTecnologias >= 2 && qtdTecnologias <= 4) {
            nivelResiliencia = "MÉDIO";
            mensagemAdicional = "Bom caminho! Você já adota práticas sustentáveis do Plano ABC+, porém a resiliência pode ser ampliada instalando sistemas agroflorestais ou ILPF.";
        } else {
            nivelResiliencia = "ALTO (Excelente)";
            mensagemAdicional = "Parabéns! Sua propriedade aplica múltiplos pilares sustentáveis, garantindo estabilidade produtiva e conservação ambiental severa.";
        }

        txtResultado.innerHTML = `<strong>Região Analisada:</strong> ${regiaoSelecionada.toUpperCase()}<br>
                                  <strong>Nível de Adaptação:</strong> ${nivelResiliencia}<br><br>
                                  <em>${mensagemAdicional}</em>`;
        
        boxResultado.classList.remove("hidden");
    });
});