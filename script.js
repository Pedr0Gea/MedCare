// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on
    const currentPath = window.location.pathname;
    
    // Login Page
    if (currentPath.includes('index.html') || currentPath === '/' || currentPath === '') {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const senha = document.getElementById('senha').value;
                
                // Simple validation
                if (email && senha) {
                    // In a real app, you would validate credentials on the server
                    // For this demo, we'll just redirect to the agendamento page
                    window.location.href = 'agendamento.html';
                } else {
                    alert('Por favor, preencha todos os campos!');
                }
            });
        }
    }
    
    // Cadastro Page
    if (currentPath.includes('cadastro.html')) {
        const cadastroForm = document.getElementById('cadastroForm');
        const cancelarBtn = document.getElementById('cancelarBtn');
        
        if (cadastroForm) {
            cadastroForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const nomeCompleto = document.getElementById('nomeCompleto').value;
                const email = document.getElementById('email').value;
                const telefone = document.getElementById('telefone').value;
                const cpf = document.getElementById('cpf').value;
                const termsAgree = document.getElementById('termsAgree').checked;
                
                // Simple validation
                if (nomeCompleto && email && telefone && cpf && termsAgree) {
                    // In a real app, you would send this data to the server
                    // For this demo, we'll show a success message and redirect to login
                    alert('Cadastro realizado com sucesso!');
                    window.location.href = 'index.html';
                } else {
                    alert('Por favor, preencha todos os campos obrigatórios e aceite os termos!');
                }
            });
        }
        
        if (cancelarBtn) {
            cancelarBtn.addEventListener('click', function() {
                // Redirect back to login page
                window.location.href = 'index.html';
            });
        }
        
        // CEP auto-fill functionality (simulated)
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('blur', function() {
                const cep = cepInput.value.replace(/\D/g, '');
                
                if (cep.length === 8) {
                    // Simulate fetching address data
                    // In a real app, you would use an API like ViaCEP
                    setTimeout(() => {
                        document.getElementById('rua').value = 'Rua Exemplo';
                        document.getElementById('cidade').value = 'São Paulo';
                        document.getElementById('estado').value = 'SP';
                    }, 500);
                }
            });
        }
        
        // CPF formatting
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', function() {
                let cpf = cpfInput.value.replace(/\D/g, '');
                if (cpf.length > 11) cpf = cpf.slice(0, 11);
                
                if (cpf.length > 9) {
                    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                } else if (cpf.length > 6) {
                    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
                } else if (cpf.length > 3) {
                    cpf = cpf.replace(/(\d{3})(\d{3})/, '$1.$2');
                }
                
                cpfInput.value = cpf;
            });
        }
    }
    
    // Agendamento Page
    if (currentPath.includes('agendamento.html')) {
        // Calendar day selection
        const days = document.querySelectorAll('.day:not(.disabled)');
        days.forEach(day => {
            day.addEventListener('click', function() {
                // Remove selected class from all days
                days.forEach(d => d.classList.remove('selected'));
                // Add selected class to clicked day
                day.classList.add('selected');
            });
        });
        
        // Month navigation
        const prevMonthBtn = document.querySelector('.month-nav.prev');
        const nextMonthBtn = document.querySelector('.month-nav.next');
        const currentMonthDisplay = document.querySelector('.current-month');
        
        if (prevMonthBtn && nextMonthBtn && currentMonthDisplay) {
            let currentMonth = 2; // March (0-based)
            let currentYear = 2025;
            
            const months = [
                'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ];
            
            function updateMonthDisplay() {
                currentMonthDisplay.textContent = `${months[currentMonth]} ${currentYear}`;
            }
            
            prevMonthBtn.addEventListener('click', function() {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                updateMonthDisplay();
                // In a real app, you would regenerate the calendar days
            });
            
            nextMonthBtn.addEventListener('click', function() {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                updateMonthDisplay();
                // In a real app, you would regenerate the calendar days
            });
        }
        
        // Form submission for appointment
        const appointmentForm = document.querySelector('.appointment-details');
        const agendarBtn = appointmentForm ? appointmentForm.querySelector('.btn-primary') : null;
        const cancelarBtn = appointmentForm ? appointmentForm.querySelector('.btn-secondary') : null;
        
        if (agendarBtn) {
            agendarBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const especialidade = document.getElementById('especialidade').value;
                const medico = document.getElementById('medico').value;
                const plano = document.getElementById('plano').value;
                const horario = document.getElementById('horario').value;
                
                // Get selected date
                const selectedDay = document.querySelector('.day.selected');
                const selectedDate = selectedDay ? selectedDay.textContent : null;
                
                if (especialidade && medico && plano && horario && selectedDate) {
                    // In a real app, you would send this data to the server
                    // For this demo, we'll show a success message
                    alert(`Consulta agendada com sucesso!\nData: ${selectedDate}/${months[currentMonth]}/${currentYear}\nHorário: ${horario}\nMédico: ${medico}\nEspecialidade: ${especialidade}`);
                    
                    // You could redirect to a "my appointments" page
                    // window.location.href = 'meus-agendamentos.html';
                } else {
                    alert('Por favor, preencha todos os campos obrigatórios e selecione uma data!');
                }
            });
        }
        
        if (cancelarBtn) {
            cancelarBtn.addEventListener('click', function() {
                // Reset form
                const form = appointmentForm.closest('form');
                if (form) form.reset();
                
                // Deselect date
                const selectedDay = document.querySelector('.day.selected');
                if (selectedDay) selectedDay.classList.remove('selected');
            });
        }
        
        // Dynamic dropdowns (specialty affects available doctors)
        const especialidadeSelect = document.getElementById('especialidade');
        const medicoSelect = document.getElementById('medico');
        
        if (especialidadeSelect && medicoSelect) {
            especialidadeSelect.addEventListener('change', function() {
                const especialidade = especialidadeSelect.value;
                
                // Clear current options
                medicoSelect.innerHTML = '<option value="" disabled selected>Selecione um médico</option>';
                
                // Add new options based on specialty
                if (especialidade === 'clinico-geral') {
                    addOption(medicoSelect, 'dr-silva', 'Dr. Silva');
                    addOption(medicoSelect, 'dra-ferreira', 'Dra. Ferreira');
                } else if (especialidade === 'cardiologia') {
                    addOption(medicoSelect, 'dr-cardoso', 'Dr. Cardoso');
                    addOption(medicoSelect, 'dra-coração', 'Dra. Coração');
                } else if (especialidade === 'dermatologia') {
                    addOption(medicoSelect, 'dra-pele', 'Dra. Pele');
                } else if (especialidade === 'ortopedia') {
                    addOption(medicoSelect, 'dr-ossos', 'Dr. Ossos');
                    addOption(medicoSelect, 'dr-articulação', 'Dr. Articulação');
                } else if (especialidade === 'pediatria') {
                    addOption(medicoSelect, 'dra-criança', 'Dra. Criança');
                    addOption(medicoSelect, 'dr-infantil', 'Dr. Infantil');
                }
            });
            
            function addOption(select, value, text) {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = text;
                select.appendChild(option);
            }
        }
    }
});

// Adicione este código ao arquivo script.js existente

document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    
    // Perfil Page
    if (currentPath.includes('perfil.html')) {
        const perfilForm = document.getElementById('perfilForm');
        const cancelarBtn = document.getElementById('cancelarBtn');
        
        if (perfilForm) {
            perfilForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simulação de salvamento dos dados
                alert('Dados atualizados com sucesso!');
            });
        }
        
        if (cancelarBtn) {
            cancelarBtn.addEventListener('click', function() {
                // Recarregar a página para cancelar as alterações
                window.location.reload();
            });
        }
        
        // Formatação de CPF
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', function() {
                let cpf = cpfInput.value.replace(/\D/g, '');
                if (cpf.length > 11) cpf = cpf.slice(0, 11);
                
                if (cpf.length > 9) {
                    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                } else if (cpf.length > 6) {
                    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
                } else if (cpf.length > 3) {
                    cpf = cpf.replace(/(\d{3})(\d{3})/, '$1.$2');
                }
                
                cpfInput.value = cpf;
            });
        }
        
        // Formatação de telefone
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function() {
                let telefone = telefoneInput.value.replace(/\D/g, '');
                if (telefone.length > 11) telefone = telefone.slice(0, 11);
                
                if (telefone.length > 10) {
                    telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (telefone.length > 6) {
                    telefone = telefone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else if (telefone.length > 2) {
                    telefone = telefone.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                }
                
                telefoneInput.value = telefone;
            });
        }
    }
    
    // Meus Agendamentos Page
    if (currentPath.includes('meus_agendamentos.html')) {
        // Botões de cancelar consulta
        const cancelarBtns = document.querySelectorAll('.btn-cancel');
        
        cancelarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.agendamento-card');
                const especialidade = card.querySelector('h3').textContent;
                
                if (confirm(`Deseja realmente cancelar esta consulta de ${especialidade}?`)) {
                    // Em um sistema real, enviaria uma requisição para o servidor
                    // Por enquanto, apenas removemos o card da interface
                    card.remove();
                    
                    // Verificar se ainda há agendamentos
                    const agendamentosList = document.querySelector('.agendamentos-list');
                    const emptyMessage = document.querySelector('.agendamento-empty');
                    
                    if (agendamentosList.children.length === 0 && emptyMessage) {
                        emptyMessage.style.display = 'block';
                    }
                }
            });
        });
        
        // Botões de reagendar
        const reagendarBtns = document.querySelectorAll('.btn-secondary:not(.btn-cancel)');
        
        reagendarBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.agendamento-card');
                const especialidade = card.querySelector('h3').textContent;
                
                alert(`Redirecionando para reagendamento da consulta de ${especialidade}`);
                // Em um sistema real, redirecionaria para a página de agendamento
                // com os dados pre-preenchidos
                window.location.href = 'agendamento.html';
            });
        });
    }
    
    // Histórico Page
    if (currentPath.includes('historico.html')) {
        // Pesquisa no histórico
        const pesquisaInput = document.getElementById('pesquisaHistorico');
        
        if (pesquisaInput) {
            pesquisaInput.addEventListener('input', function() {
                const termo = pesquisaInput.value.toLowerCase();
                const cards = document.querySelectorAll('.historico-card');
                
                cards.forEach(card => {
                    const texto = card.textContent.toLowerCase();
                    if (texto.includes(termo)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
        
        function aplicarFiltros() {
        const filtroAno = document.getElementById('filtroAno');
        const filtroEspecialidade = document.getElementById('filtroEspecialidade');
        
        function aplicarFiltros() {
            const ano = filtroAno.value;
            const especialidade = filtroEspecialidade.value;
            const cards = document.querySelectorAll('.historico-card');
            
            cards.forEach(card => {
                // Obter data e especialidade do card
                const dataText = card.querySelector('.historico-date').textContent;
                const especialidadeText = card.querySelector('h3').textContent.toLowerCase();
                
                // Extrair o ano da data (formato dd/mm/yyyy)
                const cardAno = dataText.split('/')[2];
                
                // Verificar se o card atende aos critérios de filtro
                const atendeAno = ano === 'todos' || cardAno === ano;
                const atendeEspecialidade = especialidade === 'todas' || 
                    especialidadeText.includes(especialidade.replace('-', ' '));
                
                // Mostrar ou esconder o card com base nos filtros
                if (atendeAno && atendeEspecialidade) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        // Aplicar filtros quando mudar a seleção
        if (filtroAno) {
            filtroAno.addEventListener('change', aplicarFiltros);
        }
        
        if (filtroEspecialidade) {
            filtroEspecialidade.addEventListener('change', aplicarFiltros);
        }
        
        // Implementar paginação
        const btnAnterior = document.querySelector('.pagination-btn:first-child');
        const btnProxima = document.querySelector('.pagination-btn:last-child');
        const paginationInfo = document.querySelector('.pagination-info');
        
        if (btnAnterior && btnProxima && paginationInfo) {
            let paginaAtual = 1;
            const totalPaginas = 3; // Em um sistema real, isso seria calculado
            const itensPorPagina = 3;
            
            function atualizarPaginacao() {
                paginationInfo.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
                
                // Desabilitar botões quando necessário
                btnAnterior.disabled = paginaAtual === 1;
                btnProxima.disabled = paginaAtual === totalPaginas;
                
                // Aplicar visuais para botões desabilitados
                if (btnAnterior.disabled) {
                    btnAnterior.classList.add('disabled');
                } else {
                    btnAnterior.classList.remove('disabled');
                }
                
                if (btnProxima.disabled) {
                    btnProxima.classList.add('disabled');
                } else {
                    btnProxima.classList.remove('disabled');
                }
                
                // Mostrar apenas os itens da página atual
                const cards = document.querySelectorAll('.historico-card');
                const inicio = (paginaAtual - 1) * itensPorPagina;
                const fim = inicio + itensPorPagina;
                
                cards.forEach((card, index) => {
                    if (index >= inicio && index < fim) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
            
            btnAnterior.addEventListener('click', function() {
                if (paginaAtual > 1) {
                    paginaAtual--;
                    atualizarPaginacao();
                }
            });
            
            btnProxima.addEventListener('click', function() {
                if (paginaAtual < totalPaginas) {
                    paginaAtual++;
                    atualizarPaginacao();
                }
            });
            
            // Inicializar paginação
            atualizarPaginacao();
        }
        
        // Botões de ação nos cards do histórico
        const detailButtons = document.querySelectorAll('.historico-actions .btn-secondary');
        
        detailButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.textContent.trim();
                const card = this.closest('.historico-card');
                const especialidade = card.querySelector('h3').textContent;
                const data = card.querySelector('.historico-date').textContent;
                const medico = card.querySelector('.detail-value').textContent;
                
                // Em um sistema real, redirecionaria para a página apropriada
                // Por enquanto, apenas mostramos um alerta
                if (action === 'Ver Detalhes') {
                    alert(`Detalhes da consulta de ${especialidade} com ${medico} em ${data}`);
                } else if (action === 'Receitas') {
                    alert(`Visualizando receitas da consulta de ${especialidade} em ${data}`);
                } else if (action === 'Exames') {
                    alert(`Visualizando exames da consulta de ${especialidade} em ${data}`);
                } else if (action === 'Solicitar Atestado') {
                    alert(`Solicitando atestado para a consulta de ${especialidade} em ${data}`);
                }
            });
        });
        
        // Implementar exportação de histórico (opcional)
        const btnExportar = document.createElement('button');
        btnExportar.className = 'btn-primary';
        btnExportar.textContent = 'Exportar Histórico';
        document.querySelector('.appointment-container h2').after(btnExportar);
        
        btnExportar.addEventListener('click', function() {
            alert('Exportando histórico de consultas para PDF...');
            // Em um sistema real, geraria um arquivo PDF com o histórico de consultas
        });
    }
}});

// Adicione este código ao seu arquivo script.js existente

document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    
    // Esqueceu Senha Page
    if (currentPath.includes('esqueceu_senha.html')) {
        const recuperacaoForm = document.getElementById('recuperacaoForm');
        const mensagemBox = document.getElementById('mensagem');
        
        if (recuperacaoForm) {
            recuperacaoForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                
                // Validar formato de e-mail
                if (!validarEmail(email)) {
                    exibirMensagem('Por favor, informe um endereço de e-mail válido.', 'erro');
                    return;
                }
                
                // Em um sistema real, enviaria uma requisição para o servidor
                // para processar a recuperação de senha
                
                // Simulando o processamento
                recuperacaoForm.reset();
                exibirMensagem(
                    'Instruções de recuperação de senha foram enviadas para o seu e-mail. ' +
                    'Por favor, verifique sua caixa de entrada.', 
                    'sucesso'
                );
            });
        }
        
        function validarEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        function exibirMensagem(texto, tipo) {
            mensagemBox.textContent = texto;
            mensagemBox.style.display = 'block';
            
            // Remover classes anteriores
            mensagemBox.classList.remove('mensagem-sucesso', 'mensagem-erro');
            
            // Adicionar classe baseada no tipo
            if (tipo === 'sucesso') {
                mensagemBox.classList.add('mensagem-sucesso');
            } else if (tipo === 'erro') {
                mensagemBox.classList.add('mensagem-erro');
            }
            
            // Scroll para a mensagem
            mensagemBox.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Adicione este código ao seu arquivo script.js existente

document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade do botão de acessibilidade
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    
    if (accessibilityToggle) {
        accessibilityToggle.addEventListener('click', function() {
            // Abrir menu de acessibilidade
            toggleAccessibilityMenu();
        });
    }
    
    function toggleAccessibilityMenu() {
        // Verifica se o menu já existe
        let accessMenu = document.getElementById('accessibility-menu');
        
        if (accessMenu) {
            // Se o menu já existe, apenas alterna sua visibilidade
            accessMenu.classList.toggle('open');
            return;
        }
        
        // Criar o menu de acessibilidade
        accessMenu = document.createElement('div');
        accessMenu.id = 'accessibility-menu';
        accessMenu.className = 'accessibility-menu open';
        
        // Opções de acessibilidade
        const options = [
            { id: 'increase-font', text: 'Aumentar Fonte', icon: '🔍+' },
            { id: 'decrease-font', text: 'Diminuir Fonte', icon: '🔍-' },
            { id: 'high-contrast', text: 'Alto Contraste', icon: '◐' },
            { id: 'read-screen', text: 'Ler Tela', icon: '🔊' },
            { id: 'reset-settings', text: 'Redefinir Configurações', icon: '↺' }
        ];
        
        // Criar botões para cada opção
        options.forEach(option => {
            const button = document.createElement('button');
            button.id = option.id;
            button.className = 'access-option';
            button.innerHTML = `<span class="access-icon">${option.icon}</span> ${option.text}`;
            
            // Adicionar event listener
            button.addEventListener('click', function() {
                handleAccessibilityOption(option.id);
            });
            
            accessMenu.appendChild(button);
        });
        
        // Adicionar botão para fechar o menu
        const closeButton = document.createElement('button');
        closeButton.className = 'close-access-menu';
        closeButton.textContent = '×';
        closeButton.addEventListener('click', function() {
            accessMenu.classList.remove('open');
        });
        
        accessMenu.appendChild(closeButton);
        
        // Adicionar menu ao body
        document.body.appendChild(accessMenu);
    }
    
    function handleAccessibilityOption(optionId) {
        // Implementar as funcionalidades de acessibilidade
        switch (optionId) {
            case 'increase-font':
                changeFontSize(1);
                break;
            case 'decrease-font':
                changeFontSize(-1);
                break;
            case 'high-contrast':
                toggleHighContrast();
                break;
            case 'read-screen':
                readScreen();
                break;
            case 'reset-settings':
                resetAccessibilitySettings();
                break;
        }
    }
    
    function changeFontSize(direction) {
        // Obter o tamanho atual da fonte
        const body = document.body;
        const currentSize = parseInt(window.getComputedStyle(body).fontSize);
        
        // Ajustar o tamanho (limitar entre 12px e 24px)
        const newSize = Math.max(12, Math.min(24, currentSize + direction * 2));
        
        // Aplicar o novo tamanho
        body.style.fontSize = newSize + 'px';
        
        // Salvar a preferência no localStorage
        localStorage.setItem('accessFontSize', newSize);
    }
    
    function toggleHighContrast() {
        // Alternar a classe de alto contraste no body
        document.body.classList.toggle('high-contrast');
        
        // Salvar a preferência no localStorage
        const isHighContrast = document.body.classList.contains('high-contrast');
        localStorage.setItem('accessHighContrast', isHighContrast);
    }
    
    function readScreen() {
        // Função básica para leitura de tela
        // Em uma implementação real, você usaria uma API de síntese de voz
        
        // Obter o texto visível principal da página
        const mainContent = document.querySelector('.login-card').textContent;
        
        alert('Função de leitura ativada. Em uma implementação real, o seguinte conteúdo seria lido: \n\n' + mainContent);
    }
    
    function resetAccessibilitySettings() {
        // Remover todas as personalizações
        document.body.style.fontSize = '';
        document.body.classList.remove('high-contrast');
        
        // Limpar as preferências salvas
        localStorage.removeItem('accessFontSize');
        localStorage.removeItem('accessHighContrast');
    }
    
    // Carregar configurações salvas ao iniciar
    function loadSavedAccessibilitySettings() {
        // Restaurar tamanho da fonte
        const savedFontSize = localStorage.getItem('accessFontSize');
        if (savedFontSize) {
            document.body.style.fontSize = savedFontSize + 'px';
        }
        
        // Restaurar alto contraste
        const savedHighContrast = localStorage.getItem('accessHighContrast');
        if (savedHighContrast === 'true') {
            document.body.classList.add('high-contrast');
        }
    }
    
    // Carregar configurações salvas
    loadSavedAccessibilitySettings();
});