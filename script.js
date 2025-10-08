// Configuración de colores consistente con CSS
const colors = {
    success: '#10b981',
    danger: '#ef4444',
    pending: '#8b5cf6',
    primary: '#2563eb',
    warning: '#f59e0b'
};

// Datos de ejemplo para las pruebas
const testData = {
    projectInfo: {
        name: 'Building Block - Core',
        qaResponsible: 'María González',
        startDate: '01/09/2024',
        endDate: '30/09/2024',
        status: 'Pruebas QA',
        progress: 75
    },
    summary: {
        planned: 45,    // Pruebas aún por ejecutar
        successful: 85, // Pruebas completadas exitosamente
        failed: 15,     // Pruebas que fallaron
        pending: 5      // Pruebas en revisión/pendientes
        // Total: 150 pruebas planificadas originalmente
    },
    trend: [
        { date: '2024-09-01', planned: 150, successful: 0, failed: 0, pending: 0 },   // Día 1: Todo planificado
        { date: '2024-09-02', planned: 130, successful: 15, failed: 3, pending: 2 },  // Día 2: Empezando
        { date: '2024-09-03', planned: 110, successful: 28, failed: 6, pending: 6 },  // Día 3: Progresando
        { date: '2024-09-04', planned: 90, successful: 42, failed: 8, pending: 10 },  // Día 4: Avanzando
        { date: '2024-09-05', planned: 75, successful: 55, failed: 12, pending: 8 },  // Día 5: Más progreso
        { date: '2024-09-06', planned: 60, successful: 68, failed: 14, pending: 8 },  // Día 6: Continuando
        { date: '2024-09-07', planned: 50, successful: 75, failed: 15, pending: 10 }, // Día 7: Más avance
        { date: '2024-09-08', planned: 45, successful: 80, failed: 15, pending: 10 }, // Día 8: Estado actual
        { date: '2024-09-09', planned: 45, successful: 85, failed: 15, pending: 5 },  // Día 9: Hoy
    ],
    categories: [
        { date: '2024-09-28', planned: 128, successful: 102, failed: 11, pending: 5 },
        { date: '2024-09-29', planned: 130, successful: 105, failed: 8, pending: 7 },
        { date: '2024-09-30', planned: 132, successful: 108, failed: 12, pending: 4 }
    ],
    categories: [
        { escenario: 'API Tests', planned: 30, successful: 25, failed: 3, pending: 1 },
        { escenario: 'UI Tests', planned: 28, successful: 20, failed: 5, pending: 2 },
        { escenario: 'Integration', planned: 25, successful: 18, failed: 4, pending: 1 },
        { escenario: 'Performance', planned: 18, successful: 12, failed: 2, pending: 1 },
        { escenario: 'Security', planned: 12, successful: 10, failed: 1, pending: 0 }
    ],
    defects: {
        summary: { critical: 2, high: 5, medium: 8, low: 3 },
        details: [
            { id: 'DEF001', title: 'Sistema no responde después de login', severity: 'critical', status: 'open', escenario: 'API Tests', assignee: 'Ana García', dateFound: '18/09/2024' },
            { id: 'DEF002', title: 'Error de validación en formulario de registro', severity: 'critical', status: 'open', escenario: 'UI Tests', assignee: 'Carlos López', dateFound: '20/09/2024' },
            { id: 'DEF003', title: 'Timeout en procesamiento de pagos', severity: 'high', status: 'in-progress', escenario: 'Integration', assignee: 'María Rodríguez', dateFound: '19/09/2024' },
            { id: 'DEF004', title: 'Interfaz no responsive en móviles', severity: 'high', status: 'open', escenario: 'UI Tests', assignee: 'Pedro Ruiz', dateFound: '21/09/2024' },
            { id: 'DEF005', title: 'Performance lenta en búsquedas', severity: 'high', status: 'resolved', escenario: 'Performance', assignee: 'Laura Sánchez', dateFound: '17/09/2024' },
            { id: 'DEF006', title: 'Mensajes de error poco claros', severity: 'medium', status: 'open', escenario: 'UI Tests', assignee: 'José Martín', dateFound: '22/09/2024' },
            { id: 'DEF007', title: 'Falta validación de campos', severity: 'medium', status: 'in-progress', escenario: 'API Tests', assignee: 'Ana García', dateFound: '16/09/2024' },
            { id: 'DEF008', title: 'Inconsistencia en colores del tema', severity: 'low', status: 'open', escenario: 'UI Tests', assignee: 'Carlos López', dateFound: '23/09/2024' }
        ]
    },
    testDetails: [
        { id: 'T001', name: 'Login API Validation', escenario: 'API Tests', status: 'success', duration: '1.2 min', executor: 'Ana García' },
        { id: 'T002', name: 'User Registration Flow', escenario: 'UI Tests', status: 'success', duration: '3.5 min', executor: 'Carlos López' },
        { id: 'T003', name: 'Payment Processing', escenario: 'Integration', status: 'failure', duration: '2.1 min', executor: 'María Rodríguez' },
        { id: 'T004', name: 'Database Connection', escenario: 'Integration', status: 'success', duration: '0.8 min', executor: 'José Martín' },
        { id: 'T005', name: 'Load Testing', escenario: 'Performance', status: 'pending', duration: '-', executor: 'Laura Sánchez' },
        { id: 'T006', name: 'Search Functionality', escenario: 'UI Tests', status: 'failure', duration: '1.9 min', executor: 'Pedro Ruiz' },
        { id: 'T007', name: 'Email Notifications', escenario: 'API Tests', status: 'success', duration: '1.5 min', executor: 'Ana García' },
        { id: 'T008', name: 'Security Headers', escenario: 'Security', status: 'success', duration: '0.5 min', executor: 'Carlos López' }
    ]
};

//  Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    createCharts();
    populateTestTable();
    populateDefectsTable();
    setupEventListeners();
    setupFileUpload();
    setupEditorIntegration();
});

// Calcular progreso del proyecto basado en pruebas ejecutadas (exitosas + fallidas) sobre total planificado
function calculateProjectProgress() {
    const successful = testData.summary.successful || 0;
    const failed = testData.summary.failed || 0;
    const totalPlanned = testData.summary.planned + testData.summary.successful + 
                        testData.summary.failed + testData.summary.pending + 
                        (testData.summary.blocked || 0);
    
    if (totalPlanned === 0) {
        return 0.0;
    }
    
    // El progreso real incluye todas las pruebas ejecutadas (exitosas + fallidas)
    const executedTests = successful + failed;
    const progress = parseFloat(((executedTests / totalPlanned) * 100).toFixed(1));
    
    console.log(`📊 PROGRESO REAL DETALLADO:`);
    console.log(`   • Pruebas exitosas: ${successful}`);
    console.log(`   • Pruebas fallidas: ${failed}`);
    console.log(`   • Total ejecutadas: ${executedTests} (exitosas + fallidas)`);
    console.log(`   • Total planificadas: ${totalPlanned}`);
    console.log(`   • Progreso real: ${progress}% = (${executedTests}/${totalPlanned}) * 100`);
    
    return progress;
}

// Función para calcular el progreso planificado basado en fechas y tendencia
function calculatePlannedProgress() {
    try {
        // Obtener fechas del proyecto
        const startDateStr = testData.projectInfo.startDate;
        const endDateStr = testData.projectInfo.endDate;
        
        console.log(`Fechas recibidas: Start="${startDateStr}", End="${endDateStr}"`);
        
        if (!startDateStr || !endDateStr) {
            console.warn('Fechas del proyecto no disponibles');
            return 0;
        }
        
        // Función helper para parsear fechas DD/MM/YYYY o DD/MM/YYYY HH:MM
        function parseProjectDate(dateStr) {
            // Separar fecha y hora si existe
            const parts = dateStr.split(' ');
            const datePart = parts[0]; // DD/MM/YYYY
            
            const [day, month, year] = datePart.split('/').map(Number);
            
            if (isNaN(day) || isNaN(month) || isNaN(year)) {
                throw new Error(`Formato de fecha inválido: ${dateStr}`);
            }
            
            return new Date(year, month - 1, day);
        }
        
        const startDate = parseProjectDate(startDateStr);
        const endDate = parseProjectDate(endDateStr);
        const currentDate = new Date();
        
        // Validar fechas
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error('Fechas del proyecto inválidas');
        }
        
        // Calcular días totales del proyecto y días transcurridos
        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        const daysPassed = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        
        console.log(`Fechas parseadas: ${startDate.toDateString()} a ${endDate.toDateString()}`);
        console.log(`Días totales: ${totalDays}, Días transcurridos: ${daysPassed}`);
        
        // Si no hemos empezado, progreso planificado es 0
        if (daysPassed <= 0) {
            console.log('El proyecto aún no ha comenzado');
            return 0;
        }
        
        // Si ya terminó el proyecto, progreso planificado debería ser 100
        if (daysPassed >= totalDays) {
            console.log('El proyecto ya debería haber terminado');
            return 100.0;
        }
        
        // Calcular progreso planificado basado en distribución lineal
        let plannedProgress = parseFloat(((daysPassed / totalDays) * 100).toFixed(1));
        
        // Asegurar que el progreso planificado esté entre 0 y 100
        plannedProgress = Math.max(0, Math.min(100, plannedProgress));
        
        console.log(`Progreso planificado calculado: ${daysPassed} días de ${totalDays} = ${plannedProgress}%`);
        
        return plannedProgress;
        
    } catch (error) {
        console.error('Error calculando progreso planificado:', error);
        
        // En caso de error, usar fechas por defecto
        const startDate = new Date(2024, 8, 1); // 01/09/2024
        const endDate = new Date(2024, 8, 30);   // 30/09/2024
        const currentDate = new Date();
        
        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        const daysPassed = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        
        if (daysPassed <= 0) return 0.0;
        if (daysPassed >= totalDays) return 100.0;
        
        const fallbackProgress = Math.max(0, Math.min(100, parseFloat(((daysPassed / totalDays) * 100).toFixed(1))));
        console.log(`Usando progreso fallback: ${fallbackProgress}%`);
        
        return fallbackProgress;
    }
}

// Inicializar dashboard
function initializeDashboard() {
    // Mostrar fecha actual
    const currentDate = new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('currentDate').textContent = currentDate;

    // Actualizar información del proyecto
    document.getElementById('projectName').textContent = `Proyecto: ${testData.projectInfo.name}`;
    document.getElementById('projectNameDetail').textContent = testData.projectInfo.name;
    document.getElementById('qaResponsible').textContent = testData.projectInfo.qaResponsible;
    document.getElementById('projectStartDate').textContent = testData.projectInfo.startDate;
    document.getElementById('projectEndDate').textContent = testData.projectInfo.endDate;
    document.getElementById('projectStatusDetail').textContent = testData.projectInfo.status;
    document.getElementById('reportStartDate').textContent = testData.projectInfo.startDate;
    document.getElementById('reportEndDate').textContent = testData.projectInfo.endDate;
    
    // Actualizar progreso del proyecto con barras duales
    const realProgress = calculateProjectProgress();
    const plannedProgress = calculatePlannedProgress();
    
    console.log(`🔄 Actualizando barras: Planificado=${plannedProgress}%, Actual=${realProgress}%`);
    
    // Actualizar progreso real
    const realProgressElement = document.getElementById('realProgress');
    const realProgressText = document.getElementById('realProgressText');
    
    if (realProgressElement && realProgressText) {
        realProgressElement.style.width = realProgress + '%';
        realProgressText.textContent = realProgress.toFixed(1) + '%';
        console.log(`✅ Progreso real actualizado: ${realProgress}%`);
    } else {
        console.warn('⚠️ Elementos de progreso real no encontrados');
    }
    
    // Actualizar progreso planificado
    const plannedProgressElement = document.getElementById('plannedProgress');
    const plannedProgressText = document.getElementById('plannedProgressText');
    
    if (plannedProgressElement && plannedProgressText) {
        plannedProgressElement.style.width = plannedProgress + '%';
        plannedProgressText.textContent = plannedProgress.toFixed(1) + '%';
        console.log(`✅ Progreso planificado actualizado: ${plannedProgress}%`);
    } else {
        console.warn('⚠️ Elementos de progreso planificado no encontrados');
    }
    
    // Actualizar el progreso en testData para consistencia
    testData.projectInfo.progress = realProgress;
    testData.projectInfo.plannedProgress = plannedProgress;
    
    // Actualizar estado del reporte
    const reportStatus = document.getElementById('reportStatus');
    reportStatus.textContent = testData.projectInfo.status;
    
    // Aplicar estilos según el estado
    switch(testData.projectInfo.status) {
        case 'Finalizado':
            reportStatus.style.background = 'rgba(16, 185, 129, 0.2)';
            reportStatus.style.color = '#10b981';
            break;
        case 'Pruebas QA':
            reportStatus.style.background = 'rgba(59, 130, 246, 0.2)';
            reportStatus.style.color = '#3b82f6';
            break;
        case 'En Progreso':
        default:
            reportStatus.style.background = 'rgba(245, 158, 11, 0.2)';
            reportStatus.style.color = '#f59e0b';
            break;
    }

    // Calcular el total de pruebas (todos los estados)
    const blockedCount = testData.summary.blocked || 0;
    const totalTests = testData.summary.planned + testData.summary.successful + 
                      testData.summary.failed + testData.summary.pending + blockedCount;
    
    // Actualizar KPIs con la nueva lógica
    document.getElementById('plannedTests').textContent = testData.summary.planned;
    document.getElementById('successfulTests').textContent = testData.summary.successful;
    document.getElementById('failedTests').textContent = testData.summary.failed;
    document.getElementById('pendingTests').textContent = testData.summary.pending;
    
    // Actualizar pruebas bloqueadas
    document.getElementById('blockedTests').textContent = blockedCount;
    
    // Actualizar porcentajes basados en la nueva lógica de progreso
    updateKPIProgressPercentages(totalTests);
}

// Función para calcular y mostrar porcentajes de progreso basados en el total inicial
function updateKPIProgressPercentages(totalTests) {
    if (totalTests === 0) {
        hideAllPercentages();
        return;
    }
    
    // Calcular porcentajes del total para cada tipo
    const plannedPercentage = (testData.summary.planned / totalTests) * 100;
    const successfulPercentage = (testData.summary.successful / totalTests) * 100;
    const failedPercentage = (testData.summary.failed / totalTests) * 100;
    const pendingPercentage = (testData.summary.pending / totalTests) * 100;
    const blockedPercentage = ((testData.summary.blocked || 0) / totalTests) * 100;
    
    // Actualizar elementos en el DOM con la nueva lógica
    updateProgressPercentageElement('plannedTests', plannedPercentage, 'planned');
    updateProgressPercentageElement('successfulTests', successfulPercentage, 'successful');
    updateProgressPercentageElement('failedTests', failedPercentage, 'failed');
    updateProgressPercentageElement('pendingTests', pendingPercentage, 'pending');
    updateProgressPercentageElement('blockedTests', blockedPercentage, 'blocked');
}

// Función para actualizar un elemento de porcentaje con lógica de progreso
function updateProgressPercentageElement(testType, percentage, category) {
    // Buscar el elemento de porcentaje correspondiente
    const numberElement = document.getElementById(testType);
    if (!numberElement) return;
    
    const kpiValue = numberElement.parentElement;
    let percentageElement = kpiValue.querySelector('.percentage');
    
    if (!percentageElement) {
        // Si no existe el elemento de porcentaje, crearlo
        percentageElement = document.createElement('span');
        percentageElement.className = 'percentage';
        kpiValue.appendChild(percentageElement);
    }
    
    // Formatear el porcentaje de progreso
    const formattedProgress = formatProgressPercentage(percentage, category);
    percentageElement.textContent = formattedProgress.text;
    
    // Actualizar clases para el color y tooltip
    percentageElement.className = 'percentage ' + formattedProgress.class;
    percentageElement.title = formattedProgress.tooltip;
    
    // Mostrar el elemento si estaba oculto
    percentageElement.style.display = '';
}

// Función para formatear porcentajes de progreso
function formatProgressPercentage(percentage, category) {
    const roundedPercentage = Math.round(percentage * 10) / 10; // Redondear a 1 decimal
    
    let text, cssClass, tooltip;
    
    switch(category) {
        case 'planned':
            text = `${roundedPercentage}%`;
            cssClass = percentage > 70 ? 'neutral' : percentage > 30 ? 'warning' : 'positive';
            tooltip = `${roundedPercentage}% del total aún por ejecutar`;
            break;
            
        case 'successful':
            text = `${roundedPercentage}%`;
            cssClass = percentage > 70 ? 'positive' : percentage > 30 ? 'neutral' : 'negative';
            tooltip = `${roundedPercentage}% del total completado exitosamente`;
            break;
            
        case 'failed':
            text = `${roundedPercentage}%`;
            cssClass = percentage > 15 ? 'negative' : percentage > 5 ? 'warning' : 'positive';
            tooltip = `${roundedPercentage}% del total con fallas`;
            break;
            
        case 'pending':
            text = `${roundedPercentage}%`;
            cssClass = percentage > 20 ? 'negative' : percentage > 10 ? 'warning' : 'neutral';
            tooltip = `${roundedPercentage}% del total en estado pendiente`;
            break;
            
        default:
            text = `${roundedPercentage}%`;
            cssClass = 'neutral';
            tooltip = `${roundedPercentage}% del total`;
    }
    
    return { text, class: cssClass, tooltip };
}

// Función para calcular y actualizar los porcentajes de cambio (función original mantenida para compatibilidad)
function updateKPIPercentages() {
    if (testData.trend && testData.trend.length >= 2) {
        // Obtener el día actual y el día anterior
        const currentDay = testData.trend[testData.trend.length - 1];
        const previousDay = testData.trend[testData.trend.length - 2];
        
        // Calcular cambios porcentuales
        const plannedChange = calculatePercentageChange(previousDay.planned, currentDay.planned);
        const successfulChange = calculatePercentageChange(previousDay.successful, currentDay.successful);
        const failedChange = calculatePercentageChange(previousDay.failed, currentDay.failed);
        const pendingChange = calculatePercentageChange(previousDay.pending, currentDay.pending);
        
        // Actualizar elementos en el DOM
        updatePercentageElement('plannedTests', plannedChange);
        updatePercentageElement('successfulTests', successfulChange);
        updatePercentageElement('failedTests', failedChange);
        updatePercentageElement('pendingTests', pendingChange);
    } else {
        // Si no hay datos suficientes, mostrar "N/A" o ocultar los porcentajes
        hideAllPercentages();
    }
}

// Función para calcular el cambio porcentual
function calculatePercentageChange(oldValue, newValue) {
    if (oldValue === 0) {
        return newValue > 0 ? 100 : 0; // Si el valor anterior era 0 y ahora hay algo, es 100% de incremento
    }
    return ((newValue - oldValue) / oldValue) * 100;
}

// Función para actualizar un elemento de porcentaje específico
function updatePercentageElement(testType, change) {
    // Buscar el elemento de porcentaje correspondiente
    const numberElement = document.getElementById(testType);
    if (!numberElement) return;
    
    const kpiValue = numberElement.parentElement;
    let percentageElement = kpiValue.querySelector('.percentage');
    
    if (!percentageElement) {
        // Si no existe el elemento de porcentaje, crearlo
        percentageElement = document.createElement('span');
        percentageElement.className = 'percentage';
        percentageElement.title = 'Cambio respecto al día anterior';
        kpiValue.appendChild(percentageElement);
    }
    
    // Formatear el porcentaje
    const formattedChange = formatPercentageChange(change, testType);
    percentageElement.textContent = formattedChange.text;
    
    // Actualizar clases para el color
    percentageElement.className = 'percentage ' + formattedChange.class;
    
    // Asegurar que el tooltip esté presente
    if (!percentageElement.title) {
        percentageElement.title = 'Cambio respecto al día anterior';
    }
    
    // Mostrar el elemento si estaba oculto
    percentageElement.style.display = '';
}

// Función para formatear el cambio porcentual
function formatPercentageChange(change, testType = '') {
    const absChange = Math.abs(change);
    const roundedChange = Math.round(absChange * 10) / 10; // Redondear a 1 decimal
    
    let text, cssClass;
    
    if (change > 0) {
        text = `+${roundedChange}%`;
        // Para pruebas fallidas, un aumento es malo (rojo)
        cssClass = (testType === 'failedTests') ? 'negative' : 'positive';
    } else if (change < 0) {
        text = `-${roundedChange}%`;
        // Para pruebas fallidas, una disminución es buena (verde)
        cssClass = (testType === 'failedTests') ? 'positive' : 'negative';
    } else {
        text = '0%';
        cssClass = 'neutral';
    }
    
    return { text, class: cssClass };
}

// Función para ocultar todos los porcentajes cuando no hay datos suficientes
function hideAllPercentages() {
    const percentageElements = document.querySelectorAll('.percentage');
    percentageElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Crear todas las gráficas
function createCharts() {
    createPieChart();
    createTrendChart();
    createCategoryChart();
    createDefectsChart();
    updateDefectCycleTimeChart(testData.defects);
    updateCoverageChart(testData.testDetails);
}

// Gráfica de pastel - Resumen de resultados
function createPieChart() {
    const values = [testData.summary.successful, testData.summary.failed, testData.summary.pending];
    const labels = ['Exitosas', 'Fallidas', 'Pendientes'];
    const chartColors = [colors.success, colors.danger, colors.pending];
    
    // Agregar planificadas si existe
    if (testData.summary.planned && testData.summary.planned > 0) {
        values.push(testData.summary.planned);
        labels.push('Planificadas');
        chartColors.push('#9CA3AF');
    }
    
    // Agregar bloqueadas si existe
    if (testData.summary.blocked && testData.summary.blocked > 0) {
        values.push(testData.summary.blocked);
        labels.push('Bloqueadas');
        chartColors.push('#6B7280');
    }
    
    const data = [{
        values: values,
        labels: labels,
        type: 'pie',
        hole: 0.4,
        marker: {
            colors: chartColors
        },
        textinfo: 'label+percent',
        textposition: 'outside',
        hovertemplate: '<b>%{label}</b><br>Cantidad: %{value}<br>Porcentaje: %{percent}<extra></extra>'
    }];

    const layout = {
        margin: { t: 20, b: 20, l: 20, r: 20 },
        showlegend: false,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        font: {
            family: 'Inter, sans-serif',
            size: 12,
            color: '#1e293b'
        }
    };

    const config = {
        responsive: true,
        displayModeBar: false
    };

    Plotly.newPlot('pieChart', data, layout, config);
}

// Gráfica de tendencia - Desde fecha de inicio hasta fecha de fin del proyecto
function createTrendChart() {
    // Convertir fechas del proyecto de DD/MM/YYYY a YYYY-MM-DD para comparación
    const projectStartDate = testData.projectInfo.startDate.split('/').reverse().join('-');
    const projectEndDate = testData.projectInfo.endDate.split('/').reverse().join('-');
    
    // Filtrar datos de tendencia según las fechas del proyecto
    const filteredTrendData = testData.trend.filter(d => {
        return d.date >= projectStartDate && d.date <= projectEndDate;
    });
    
    // Si no hay datos filtrados, usar todos los datos disponibles
    const trendData = filteredTrendData.length > 0 ? filteredTrendData : testData.trend;
    const dates = trendData.map(d => d.date);
    
    const plannedTrace = {
        x: dates,
        y: trendData.map(d => d.planned),
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Planificadas',
        line: { color: colors.warning, width: 2, dash: 'dash' },
        marker: { size: 5 }
    };
    
    const successTrace = {
        x: dates,
        y: trendData.map(d => d.successful),
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Exitosas',
        line: { color: colors.success, width: 3 },
        marker: { size: 6 }
    };

    const failureTrace = {
        x: dates,
        y: trendData.map(d => d.failed),
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Fallidas',
        line: { color: colors.danger, width: 3 },
        marker: { size: 6 }
    };

    const pendingTrace = {
        x: dates,
        y: trendData.map(d => d.pending),
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Pendientes',
        line: { color: colors.pending, width: 3 },
        marker: { size: 6 }
    };

    const data = [plannedTrace, successTrace, failureTrace, pendingTrace];

    const layout = {
        margin: { t: 20, b: 40, l: 40, r: 20 },
        showlegend: false,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
            gridcolor: '#e2e8f0',
            linecolor: '#e2e8f0',
            tickformat: '%m/%d'
        },
        yaxis: {
            gridcolor: '#e2e8f0',
            linecolor: '#e2e8f0'
        },
        font: {
            family: 'Inter, sans-serif',
            size: 11,
            color: '#64748b'
        }
    };

    const config = {
        responsive: true,
        displayModeBar: false
    };

    Plotly.newPlot('trendChart', data, layout, config);
}

// Gráfica de barras - Pruebas por escenario
function createCategoryChart() {
    const categories = testData.categories.map(c => c.escenario);
    
    const plannedTrace = {
        x: categories,
        y: testData.categories.map(c => c.planned),
        type: 'bar',
        name: 'Planificadas',
        marker: { 
            color: colors.warning,
            opacity: 0.3
        }
    };
    
    const successTrace = {
        x: categories,
        y: testData.categories.map(c => c.successful),
        type: 'bar',
        name: 'Exitosas',
        marker: { color: colors.success }
    };

    const failureTrace = {
        x: categories,
        y: testData.categories.map(c => c.failed),
        type: 'bar',
        name: 'Fallidas',
        marker: { color: colors.danger }
    };

    const pendingTrace = {
        x: categories,
        y: testData.categories.map(c => c.pending),
        type: 'bar',
        name: 'Pendientes',
        marker: { color: colors.pending }
    };

    const blockedTrace = {
        x: categories,
        y: testData.categories.map(c => c.blocked || 0),
        type: 'bar',
        name: 'Bloqueadas',
        marker: { color: '#6B7280' }
    };

    const data = [plannedTrace, successTrace, failureTrace, pendingTrace, blockedTrace];

    const layout = {
        barmode: 'stack',
        margin: { t: 20, b: 80, l: 40, r: 20 },
        showlegend: false,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
            gridcolor: '#e2e8f0',
            linecolor: '#e2e8f0',
            tickangle: -45
        },
        yaxis: {
            gridcolor: '#e2e8f0',
            linecolor: '#e2e8f0'
        },
        font: {
            family: 'Inter, sans-serif',
            size: 11,
            color: '#64748b'
        }
    };

    const config = {
        responsive: true,
        displayModeBar: false
    };

    Plotly.newPlot('categoryChart', data, layout, config);
}

// Gráfica de defectos por severidad
function createDefectsChart() {
    const defectsData = testData.defects.summary;
    
    // Actualizar contadores en el HTML
    document.getElementById('criticalDefects').textContent = defectsData.critical;
    document.getElementById('highDefects').textContent = defectsData.high;
    document.getElementById('mediumDefects').textContent = defectsData.medium;
    document.getElementById('lowDefects').textContent = defectsData.low;
    
    const data = [{
        y: ['Críticos', 'Altos', 'Medios', 'Bajos'],
        x: [defectsData.critical, defectsData.high, defectsData.medium, defectsData.low],
        type: 'bar',
        orientation: 'h',
        marker: {
            color: ['#dc2626', '#fb923c', '#f59e0b', '#22c55e'],
            line: {
                color: '#ffffff',
                width: 1
            }
        },
        text: [defectsData.critical, defectsData.high, defectsData.medium, defectsData.low],
        textposition: 'inside',
        textfont: {
            color: 'white',
            weight: 'bold'
        },
        hovertemplate: '<b>%{y}</b><br>Cantidad: %{x}<extra></extra>'
    }];

    const layout = {
        margin: { t: 20, b: 40, l: 80, r: 40 },
        showlegend: false,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        font: {
            family: 'Inter, sans-serif',
            size: 12,
            color: '#1e293b'
        },
        xaxis: {
            showgrid: true,
            gridcolor: 'rgba(148, 163, 184, 0.1)',
            zeroline: false,
            tickfont: { size: 11, color: '#64748b' },
            title: {
                text: 'Cantidad de Defectos',
                font: { size: 12, color: '#64748b' }
            }
        },
        yaxis: {
            showgrid: false,
            zeroline: false,
            tickfont: { size: 12, color: '#1e293b' },
            categoryorder: 'array',
            categoryarray: ['Bajos', 'Medios', 'Altos', 'Críticos']
        }
    };

    const config = {
        responsive: true,
        displayModeBar: false
    };

    Plotly.newPlot('defectsChart', data, layout, config);
}

// Función para actualizar Burndown Chart
function updateDefectCycleTimeChart(defectsData) {
    if (!defectsData || !defectsData.details || defectsData.details.length === 0) {
        console.log('No hay datos de defectos para el cycle time chart');
        // Mostrar gráfico vacío
        const layout = {
            title: {
                text: '',
                font: { size: 14, color: '#1e293b' }
            },
            xaxis: {
                title: 'Fecha de Resolución',
                gridcolor: '#f1f5f9'
            },
            yaxis: {
                title: 'Tiempo de Ciclo (días)',
                gridcolor: '#f1f5f9'
            },
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'Inter, sans-serif', size: 12, color: '#64748b' },
            margin: { t: 30, r: 30, b: 80, l: 60 },
            annotations: [{
                text: 'No hay datos de defectos disponibles',
                x: 0.5,
                y: 0.5,
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                font: { size: 14, color: '#64748b' }
            }]
        };

        const config = {
            responsive: true,
            displayModeBar: false
        };

        Plotly.newPlot('burndownChart', [], layout, config);
        return;
    }

    console.log('� Datos de defectos para cycle time:', defectsData);

    // Función helper para parsear fechas de manera más robusta
    function parseExcelDate(dateStr) {
        if (!dateStr || dateStr === '') return null;
        
        let date;
        
        // Si es un número (fecha serial de Excel)
        if (typeof dateStr === 'number') {
            const excelEpoch = new Date(1900, 0, 1);
            const millisecondsPerDay = 24 * 60 * 60 * 1000;
            let adjustedDays = dateStr;
            if (dateStr > 59) {
                adjustedDays = dateStr - 1;
            }
            date = new Date(excelEpoch.getTime() + (adjustedDays - 1) * millisecondsPerDay);
        }
        // Si es un string
        else if (typeof dateStr === 'string') {
            // Formato DD/MM/AAAA HH:MM
            if (dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2}$/)) {
                const [datePart, timePart] = dateStr.split(/\s+/);
                const [day, month, year] = datePart.split('/').map(Number);
                const [hour, minute] = timePart.split(':').map(Number);
                date = new Date(year, month - 1, day, hour, minute);
            }
            // Formato DD/MM/AAAA
            else if (dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
                const [day, month, year] = dateStr.split('/').map(Number);
                date = new Date(year, month - 1, day);
            }
            else {
                // Intentar parsear directamente
                date = new Date(dateStr);
            }
        }
        else {
            date = new Date(dateStr);
        }
        
        // Validar que la fecha sea válida
        if (isNaN(date.getTime())) {
            console.warn('📊 No se pudo parsear la fecha:', dateStr);
            return null;
        }
        
        return date;
    }

    // Calcular cycle time para cada defecto resuelto
    const cycleTimeData = defectsData.details
        .filter(defect => {
            // Buscar tanto dateResolved como dateResolution para compatibilidad
            const resolvedDate = defect.dateResolved || defect.dateResolution;
            const foundDate = defect.dateFound;
            const hasResolved = resolvedDate && resolvedDate !== '';
            const hasFound = foundDate && foundDate !== '';
            
            console.log(`📊 Defecto ${defect.id}: dateFound="${foundDate}", dateResolved="${defect.dateResolved}", dateResolution="${defect.dateResolution}", incluir=${hasResolved && hasFound}`);
            return hasResolved && hasFound;
        }) // Solo defectos resueltos
        .map(defect => {
            const foundDate = parseExcelDate(defect.dateFound);
            // Usar dateResolved o dateResolution según esté disponible
            const resolvedDateStr = defect.dateResolved || defect.dateResolution;
            const resolvedDate = parseExcelDate(resolvedDateStr);
            
            // Validar que las fechas sean válidas antes de calcular
            if (!foundDate || !resolvedDate) {
                console.warn(`📊 Fechas inválidas para defecto ${defect.id}:`, {
                    dateFound: defect.dateFound,
                    dateResolvedUsed: resolvedDateStr,
                    foundDateValid: foundDate !== null,
                    resolvedDateValid: resolvedDate !== null
                });
                return null; // Retornar null para filtrar después
            }
            
            const cycleTimeDays = Math.ceil((resolvedDate - foundDate) / (1000 * 60 * 60 * 24));
            
            console.log(`📊 Cálculo cycle time para ${defect.id}:`, {
                dateFound: defect.dateFound,
                dateResolvedUsed: resolvedDateStr,
                foundDate: foundDate.toISOString(),
                resolvedDate: resolvedDate.toISOString(),
                cycleTimeDays: cycleTimeDays
            });
            
            return {
                id: defect.id,
                title: defect.title,
                severity: defect.severity,
                resolvedDate: resolvedDate,
                cycleTime: Math.max(0, cycleTimeDays), // Evitar valores negativos
                status: defect.status
            };
        })
        .filter(item => item !== null) // Filtrar defectos con fechas inválidas
        .sort((a, b) => a.resolvedDate - b.resolvedDate); // Ordenar por fecha de resolución

    console.log('� Datos de cycle time calculados:', cycleTimeData);

    if (cycleTimeData.length === 0) {
        // Mostrar gráfico indicando que no hay defectos resueltos
        const layout = {
            title: {
                text: '',
                font: { size: 14, color: '#1e293b' }
            },
            xaxis: {
                title: 'Fecha de Resolución',
                gridcolor: '#f1f5f9'
            },
            yaxis: {
                title: 'Tiempo de Ciclo (días)',
                gridcolor: '#f1f5f9'
            },
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            font: { family: 'Inter, sans-serif', size: 12, color: '#64748b' },
            margin: { t: 30, r: 30, b: 80, l: 60 },
            annotations: [{
                text: 'No hay defectos resueltos para mostrar',
                x: 0.5,
                y: 0.5,
                xref: 'paper',
                yref: 'paper',
                showarrow: false,
                font: { size: 14, color: '#64748b' }
            }]
        };

        const config = {
            responsive: true,
            displayModeBar: false
        };

        Plotly.newPlot('burndownChart', [], layout, config);
        return;
    }

    // Preparar datos para barras verticales
    const defectIds = cycleTimeData.map(item => item.id);
    const cycleTimes = cycleTimeData.map(item => item.cycleTime);
    
    // Colores basados en si cumple o no el objetivo de 3 días
    const colors = cycleTimeData.map(item => {
        if (item.cycleTime <= 3) {
            // Verde - Cumple el objetivo
            return '#10b981';
        } else if (item.cycleTime <= 5) {
            // Amarillo - Aceptable pero por encima del objetivo
            return '#f59e0b';
        } else {
            // Rojo - Muy por encima del objetivo
            return '#ef4444';
        }
    });

    // Textos hover con información detallada
    const hoverTexts = cycleTimeData.map(item => 
        `ID: ${item.id}<br>` +
        `Título: ${item.title.length > 40 ? item.title.substring(0, 40) + '...' : item.title}<br>` +
        `Severidad: ${item.severity}<br>` +
        `Cycle Time: ${item.cycleTime} días<br>` +
        `Estado: ${item.cycleTime <= 3 ? '✅ Dentro del objetivo' : '⚠️ Fuera del objetivo'}`
    );

    // Crear el trace para las barras
    const barTrace = {
        x: defectIds,
        y: cycleTimes,
        type: 'bar',
        name: 'Cycle Time',
        marker: {
            color: colors,
            line: {
                color: '#374151',
                width: 1
            }
        },
        text: hoverTexts,
        hovertemplate: '%{text}<extra></extra>',
        textposition: 'outside',
        texttemplate: '%{y}d'
    };

    // Línea horizontal para el objetivo de 3 días
    const objectiveLine = {
        x: defectIds,
        y: Array(defectIds.length).fill(3),
        type: 'scatter',
        mode: 'lines',
        name: 'Objetivo (3 días)',
        line: {
            color: '#dc2626',
            width: 2,
            dash: 'dash'
        },
        hovertemplate: 'Objetivo: 3 días<extra></extra>'
    };

    // Calcular estadísticas
    const averageCycleTime = cycleTimes.reduce((sum, time) => sum + time, 0) / cycleTimes.length;
    const defectsWithinObjective = cycleTimes.filter(time => time <= 3).length;
    const complianceRate = (defectsWithinObjective / cycleTimes.length * 100).toFixed(1);

    const layout = {
        title: {
            text: '',
            font: { size: 14, color: '#1e293b' }
        },
        xaxis: {
            title: 'Defectos',
            gridcolor: '#f1f5f9',
            tickangle: -45,
            type: 'category'
        },
        yaxis: {
            title: `Cycle Time (días) - Promedio: ${averageCycleTime.toFixed(1)} | Cumplimiento: ${complianceRate}%`,
            gridcolor: '#f1f5f9',
            zeroline: false
        },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter, sans-serif', size: 12, color: '#64748b' },
        margin: { t: 30, r: 30, b: 100, l: 80 },
        hovermode: 'closest',
        showlegend: true,
        legend: {
            x: 0,
            y: 1.1,
            orientation: 'h'
        },
        shapes: [{
            type: 'rect',
            xref: 'paper',
            yref: 'y',
            x0: 0,
            y0: 0,
            x1: 1,
            y1: 3,
            fillcolor: 'rgba(16, 185, 129, 0.1)',
            line: { width: 0 }
        }]
    };

    const config = {
        responsive: true,
        displayModeBar: false
    };

    console.log('📊 Renderizando gráfico de barras Defect Cycle Time');
    Plotly.newPlot('burndownChart', [barTrace, objectiveLine], layout, config);
}

// Función para actualizar Cobertura por Módulo
function updateCoverageChart(detailsData) {
    if (!detailsData || detailsData.length === 0) {
        console.log('No hay datos de detalles para cobertura por escenario');
        return;
    }

    console.log('🔍 Actualizando gráfico de cobertura con', detailsData.length, 'pruebas');

    // Agrupar por escenario/módulo
    const moduleStats = {};
    
    detailsData.forEach(test => {
        const module = test.escenario || test.categoria || test.modulo || 'Sin Escenario';
        
        if (!moduleStats[module]) {
            moduleStats[module] = {
                total: 0,
                completed: 0,
                planned: 0
            };
        }
        
        moduleStats[module].total++;
        
        // Usar el campo 'status' que es el estándar en todo el dashboard
        const status = test.status || '';
        if (status === 'success' || status === 'failure') {
            moduleStats[module].completed++;
        } else {
            moduleStats[module].planned++;
        }
        
        // Log para depuración
        if (moduleStats[module].total <= 3) {
            console.log(`📊 ${module}: Prueba "${test.name}" con status "${status}"`);
        }
    });

    console.log('📈 Estadísticas por escenario:', moduleStats);

    // Calcular porcentajes de cobertura
    const modules = Object.keys(moduleStats);
    const coveragePercentages = modules.map(module => {
        const stats = moduleStats[module];
        return Math.round((stats.completed / stats.total) * 100);
    });

    console.log('📊 Porcentajes de cobertura:', modules.map((m, i) => `${m}: ${coveragePercentages[i]}%`));

    // Actualizar estadísticas generales
    const totalModules = modules.length;
    const completeModules = coveragePercentages.filter(pct => pct === 100).length;
    const avgCoverage = coveragePercentages.length > 0 ? 
        Math.round(coveragePercentages.reduce((a, b) => a + b, 0) / coveragePercentages.length) : 0;

    // Actualizar elementos HTML
    const avgCoverageElement = document.getElementById('avgCoverage');
    const completeModulesElement = document.getElementById('completeModules');
    
    if (avgCoverageElement) {
        avgCoverageElement.textContent = `${avgCoverage}%`;
    }
    if (completeModulesElement) {
        completeModulesElement.textContent = completeModules;
    }

    console.log(`📊 Estadísticas generales: Promedio=${avgCoverage}%, Completos=${completeModules}/${totalModules}`);

    // Crear gráfico de barras horizontal
    const trace = {
        x: coveragePercentages,
        y: modules,
        type: 'bar',
        orientation: 'h',
        marker: {
            color: coveragePercentages.map(pct => {
                if (pct === 100) return '#10b981'; // Verde completo
                if (pct >= 80) return '#84cc16';   // Verde claro
                if (pct >= 60) return '#eab308';   // Amarillo
                if (pct >= 40) return '#f97316';   // Naranja
                return '#ef4444';                  // Rojo
            }),
            line: {
                color: '#e2e8f0',
                width: 1
            }
        },
        text: coveragePercentages.map(pct => `${pct}%`),
        textposition: 'inside',
        insidetextanchor: 'middle',
        textfont: {
            color: 'white',
            size: 12,
            family: 'Inter, sans-serif'
        }
    };

    const layout = {
        title: {
            text: '',
            font: { size: 14, color: '#1e293b' }
        },
        xaxis: {
            title: 'Porcentaje de Cobertura (%)',
            gridcolor: '#f1f5f9',
            range: [0, 100]
        },
        yaxis: {
            title: 'Módulos/Escenarios',
            gridcolor: '#f1f5f9'
        },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter, sans-serif', size: 12, color: '#64748b' },
        margin: { t: 30, r: 30, b: 60, l: 120 },
        showlegend: false
    };

    const config = {
        responsive: true,
        displayModeBar: false
    };

    Plotly.newPlot('coverageChart', [trace], layout, config);
}

// Variables para paginación
let currentPage = 1;
let itemsPerPage = 5;
let filteredTests = [];

// Variables para paginación de defectos
let defectsCurrentPage = 1;
let defectsItemsPerPage = 5;
let filteredDefects = [];

// Poblar tabla de detalles de pruebas con paginación
function populateTestTable() {
    // Si no hay filtro aplicado, usar todos los tests
    if (filteredTests.length === 0) {
        filteredTests = [...testData.testDetails];
    }
    
    const tableBody = document.getElementById('testTableBody');
    const totalItems = filteredTests.length;
    const totalPages = itemsPerPage === 100 ? 1 : Math.ceil(totalItems / itemsPerPage);
    
    // Calcular índices para la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = itemsPerPage === 100 ? totalItems : Math.min(startIndex + itemsPerPage, totalItems);
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Mostrar tests de la página actual
    const testsToShow = filteredTests.slice(startIndex, endIndex);
    
    testsToShow.forEach(test => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${test.id}</td>
            <td>${test.name}</td>
            <td>${test.escenario}</td>
            <td><span class="status-badge ${test.status}">${getStatusText(test.status)}</span></td>
            <td>${test.duration}</td>
            <td>${test.executor}</td>
        `;
        tableBody.appendChild(row);
    });
    
    // Actualizar controles de paginación
    updatePaginationControls(totalItems, totalPages);
}

// Actualizar controles de paginación
function updatePaginationControls(totalItems, totalPages) {
    const paginationInfo = document.getElementById('paginationInfo');
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pageNumbers = document.getElementById('pageNumbers');
    
    // Calcular rango actual
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
    
    // Actualizar información
    if (totalItems === 0) {
        paginationInfo.textContent = 'No hay registros para mostrar';
    } else {
        paginationInfo.textContent = `Mostrando ${startIndex}-${endIndex} de ${totalItems} registros`;
    }
    
    // Botones anterior/siguiente
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Generar números de página
    generatePageNumbers(pageNumbers, currentPage, totalPages);
}

// Generar números de página
function generatePageNumbers(container, current, total) {
    container.innerHTML = '';
    
    if (total <= 1) return;
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(total, startPage + maxVisiblePages - 1);
    
    // Ajustar si no hay suficientes páginas al final
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Botón primera página
    if (startPage > 1) {
        createPageButton(container, 1, '1');
        if (startPage > 2) {
            createPageButton(container, null, '...');
        }
    }
    
    // Páginas visibles
    for (let i = startPage; i <= endPage; i++) {
        createPageButton(container, i, i.toString());
    }
    
    // Botón última página
    if (endPage < total) {
        if (endPage < total - 1) {
            createPageButton(container, null, '...');
        }
        createPageButton(container, total, total.toString());
    }
}

// Crear botón de página
function createPageButton(container, pageNum, text) {
    const button = document.createElement('button');
    button.className = 'page-number';
    button.textContent = text;
    
    if (pageNum === null) {
        button.classList.add('ellipsis');
    } else {
        if (pageNum === currentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => goToPage(pageNum));
    }
    
    container.appendChild(button);
}

// Ir a una página específica
function goToPage(page) {
    currentPage = page;
    populateTestTable();
}

// Ir a página anterior
function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        populateTestTable();
    }
}

// Ir a página siguiente
function goToNextPage() {
    const totalPages = itemsPerPage === 100 ? 1 : Math.ceil(filteredTests.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        populateTestTable();
    }
}

// Cambiar elementos por página
function changeItemsPerPage(newItemsPerPage) {
    itemsPerPage = parseInt(newItemsPerPage);
    currentPage = 1; // Resetear a primera página
    populateTestTable();
}

// ===== FUNCIONES DE PAGINACIÓN PARA DEFECTOS =====

// Actualizar controles de paginación para defectos
function updateDefectsPaginationControls(totalItems, totalPages) {
    const paginationInfo = document.getElementById('defectsPaginationInfo');
    const prevBtn = document.getElementById('defectsPrevPageBtn');
    const nextBtn = document.getElementById('defectsNextPageBtn');
    const pageNumbers = document.getElementById('defectsPageNumbers');
    
    if (!paginationInfo || !prevBtn || !nextBtn || !pageNumbers) return;
    
    // Calcular rango actual
    const startIndex = (defectsCurrentPage - 1) * defectsItemsPerPage + 1;
    const endIndex = Math.min(defectsCurrentPage * defectsItemsPerPage, totalItems);
    
    // Actualizar información
    if (totalItems === 0) {
        paginationInfo.textContent = 'No hay registros para mostrar';
    } else {
        paginationInfo.textContent = `Mostrando ${startIndex}-${endIndex} de ${totalItems} registros`;
    }
    
    // Botones anterior/siguiente
    prevBtn.disabled = defectsCurrentPage === 1;
    nextBtn.disabled = defectsCurrentPage === totalPages || totalPages === 0;
    
    // Generar números de página
    generateDefectsPageNumbers(pageNumbers, defectsCurrentPage, totalPages);
}

// Generar números de página para defectos
function generateDefectsPageNumbers(container, current, total) {
    container.innerHTML = '';
    
    if (total <= 1) return;
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, current - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(total, startPage + maxVisiblePages - 1);
    
    // Ajustar si no hay suficientes páginas al final
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Botón primera página
    if (startPage > 1) {
        createDefectsPageButton(container, 1, '1');
        if (startPage > 2) {
            createDefectsPageButton(container, null, '...');
        }
    }
    
    // Páginas visibles
    for (let i = startPage; i <= endPage; i++) {
        createDefectsPageButton(container, i, i.toString());
    }
    
    // Botón última página
    if (endPage < total) {
        if (endPage < total - 1) {
            createDefectsPageButton(container, null, '...');
        }
        createDefectsPageButton(container, total, total.toString());
    }
}

// Crear botón de página para defectos
function createDefectsPageButton(container, pageNum, text) {
    const button = document.createElement('button');
    button.className = 'page-number';
    button.textContent = text;
    
    if (pageNum === null) {
        button.classList.add('ellipsis');
    } else {
        if (pageNum === defectsCurrentPage) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => goToDefectsPage(pageNum));
    }
    
    container.appendChild(button);
}

// Ir a una página específica de defectos
function goToDefectsPage(page) {
    defectsCurrentPage = page;
    populateDefectsTable();
}

// Ir a página anterior de defectos
function goToDefectsPrevPage() {
    if (defectsCurrentPage > 1) {
        defectsCurrentPage--;
        populateDefectsTable();
    }
}

// Ir a página siguiente de defectos
function goToDefectsNextPage() {
    const totalPages = defectsItemsPerPage === 100 ? 1 : Math.ceil(filteredDefects.length / defectsItemsPerPage);
    if (defectsCurrentPage < totalPages) {
        defectsCurrentPage++;
        populateDefectsTable();
    }
}

// Cambiar elementos por página para defectos
function changeDefectsItemsPerPage(newItemsPerPage) {
    defectsItemsPerPage = parseInt(newItemsPerPage);
    defectsCurrentPage = 1; // Resetear a primera página
    populateDefectsTable();
}

// Obtener texto del estado
function getStatusText(status) {
    switch(status) {
        case 'success': return 'Exitosa';
        case 'failure': return 'Fallida';
        case 'pending': return 'Pendiente';
        case 'blocked': return 'Bloqueada';
        case 'planned': return 'Planificada';
        default: return status;
    }
}

// Poblar tabla de defectos
function populateDefectsTable() {
    // Si no hay filtro aplicado, usar todos los defectos
    if (filteredDefects.length === 0) {
        filteredDefects = testData.defects && testData.defects.details ? [...testData.defects.details] : [];
    }
    
    const tableBody = document.getElementById('defectsTableBody');
    if (!tableBody) return;
    
    const totalItems = filteredDefects.length;
    const totalPages = defectsItemsPerPage === 100 ? 1 : Math.ceil(totalItems / defectsItemsPerPage);
    
    // Calcular índices para la página actual
    const startIndex = (defectsCurrentPage - 1) * defectsItemsPerPage;
    const endIndex = defectsItemsPerPage === 100 ? totalItems : Math.min(startIndex + defectsItemsPerPage, totalItems);
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Mostrar defectos de la página actual
    const defectsToShow = filteredDefects.slice(startIndex, endIndex);
    
    defectsToShow.forEach(defect => {
        const row = document.createElement('tr');
        const daysOpen = calculateDaysOpen(defect.dateFound);
        const severityClass = getSeverityClass(defect.severity);
        const statusClass = getStatusClass(defect.status);
        const daysOpenClass = getDaysOpenClass(daysOpen, defect.status);
        
        row.innerHTML = `
            <td><strong>${defect.id}</strong></td>
            <td>${defect.title}</td>
            <td><span class="defect-severity ${severityClass}">${defect.severity}</span></td>
            <td><span class="defect-status ${statusClass}">${defect.status}</span></td>
            <td>${defect.escenario}</td>
            <td>${defect.assignee}</td>
            <td>${formatDate(defect.dateFound)}</td>
            <td><span class="days-open ${daysOpenClass}">${daysOpen} días</span></td>
        `;
        tableBody.appendChild(row);
    });
    
    // Actualizar controles de paginación
    updateDefectsPaginationControls(totalItems, totalPages);
}

// Calcular días abierto
function calculateDaysOpen(dateFound) {
    const today = new Date();
    
    // Convertir fecha a objeto Date
    let foundDate;
    
    if (typeof dateFound === 'string') {
        // Formato DD/MM/AAAA HH:MM
        if (dateFound.match(/^\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2}$/)) {
            const [datePart, timePart] = dateFound.split(/\s+/);
            const [day, month, year] = datePart.split('/').map(Number);
            const [hour, minute] = timePart.split(':').map(Number);
            foundDate = new Date(year, month - 1, day, hour, minute);
        }
        // Formato DD/MM/AAAA (solo fecha)
        else if (dateFound.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
            const [day, month, year] = dateFound.split('/').map(Number);
            foundDate = new Date(year, month - 1, day);
        }
        // Formato YYYY-MM-DD HH:MM
        else if (dateFound.match(/^\d{4}-\d{1,2}-\d{1,2}\s+\d{1,2}:\d{2}$/)) {
            const [datePart, timePart] = dateFound.split(/\s+/);
            const [year, month, day] = datePart.split('-').map(Number);
            const [hour, minute] = timePart.split(':').map(Number);
            foundDate = new Date(year, month - 1, day, hour, minute);
        }
        // Formato YYYY-MM-DD (solo fecha)
        else if (dateFound.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
            const [year, month, day] = dateFound.split('-').map(Number);
            foundDate = new Date(year, month - 1, day);
        }
        else {
            // Intentar parsear directamente como último recurso
            foundDate = new Date(dateFound);
        }
    } else {
        // Si ya es un objeto Date o número
        foundDate = new Date(dateFound);
    }
    
    if (isNaN(foundDate.getTime())) {
        console.warn('Fecha inválida en calculateDaysOpen:', dateFound);
        return 0;
    }
    
    console.log(`Calculando días abiertos: Fecha encontrado=${dateFound}, Fecha parseada=${foundDate.toISOString()}, Hoy=${today.toISOString()}`);
    
    const diffTime = Math.abs(today - foundDate);
    const daysOpen = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    console.log(`Días abiertos calculados: ${daysOpen}`);
    
    return daysOpen;
}

// Obtener clase CSS de severidad
function getSeverityClass(severity) {
    switch(severity) {
        case 'Crítica': return 'critical';
        case 'Alta': return 'high';
        case 'Media': return 'medium';
        case 'Baja': return 'low';
        default: return 'medium';
    }
}

// Obtener clase CSS de estado
function getStatusClass(status) {
    switch(status) {
        case 'Abierto': return 'open';
        case 'En Progreso': return 'in-progress';
        case 'Resuelto': return 'resolved';
        case 'Cerrado': return 'closed';
        default: return 'open';
    }
}

// Obtener clase CSS para días abierto
function getDaysOpenClass(days, status) {
    if (status === 'Cerrado' || status === 'Resuelto') return 'normal';
    if (days > 30) return 'critical';
    if (days > 14) return 'warning';
    return 'normal';
}

// Formatear fecha
function formatDate(dateString) {
    if (!dateString) return '';
    
    let date;
    
    // Si está en formato DD/MM/AAAA HH:MM, extraer solo la fecha
    if (typeof dateString === 'string' && dateString.match(/^\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2}$/)) {
        const datePart = dateString.split(' ')[0]; // Tomar solo la parte de fecha
        return datePart; // Ya está en formato DD/MM/AAAA
    }
    
    // Si ya está en formato DD/MM/AAAA, retornarlo tal como está
    if (typeof dateString === 'string' && dateString.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
        return dateString;
    }
    
    // Si está en formato YYYY-MM-DD, convertirlo
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }
    
    // Si está en formato YYYY-MM-DD HH:MM, convertir solo la fecha
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}\s+\d{1,2}:\d{2}$/)) {
        const datePart = dateString.split(' ')[0]; // YYYY-MM-DD
        const [year, month, day] = datePart.split('-');
        return `${day}/${month}/${year}`;
    }
    
    // Intentar convertir si es un objeto Date o string parseeable
    try {
        date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString; // Si no se puede parsear, retornar el original
        }
        
        // Formatear como DD/MM/AAAA
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    } catch (error) {
        console.warn('Error formateando fecha:', dateString, error);
        return dateString;
    }
}

// Filtrar defectos
function filterDefects() {
    const searchTerm = document.getElementById('defectsSearchInput')?.value.toLowerCase() || '';
    const severityFilter = document.getElementById('severityFilter')?.value || '';
    const statusFilter = document.getElementById('statusFilter')?.value || '';
    
    if (!testData.defects || !testData.defects.details) {
        filteredDefects = [];
        defectsCurrentPage = 1;
        populateDefectsTable();
        return;
    }
    
    // Filtrar defectos basado en los criterios de búsqueda
    if (searchTerm === '' && severityFilter === '' && statusFilter === '') {
        filteredDefects = [...testData.defects.details];
    } else {
        filteredDefects = testData.defects.details.filter(defect => {
            const matchesSearch = defect.title.toLowerCase().includes(searchTerm) ||
                                defect.id.toLowerCase().includes(searchTerm) ||
                                defect.assignee.toLowerCase().includes(searchTerm);
            const matchesSeverity = !severityFilter || defect.severity === severityFilter;
            const matchesStatus = !statusFilter || defect.status === statusFilter;
            
            return matchesSearch && matchesSeverity && matchesStatus;
        });
    }
    
    // Resetear a la primera página y actualizar la tabla
    defectsCurrentPage = 1;
    populateDefectsTable();
}

// Exportar defectos
function exportDefects() {
    if (!testData.defects || !testData.defects.details) return;
    
    const csvContent = [
        ['ID', 'Título', 'Severidad', 'Estado', 'Escenario', 'Asignado a', 'Fecha Encontrado', 'Días Abierto'],
        ...testData.defects.details.map(defect => [
            defect.id,
            defect.title,
            defect.severity,
            defect.status,
            defect.escenario,
            defect.assignee,
            defect.dateFound,
            calculateDaysOpen(defect.dateFound)
        ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `defectos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Configurar event listeners
function setupEventListeners() {
    // Filtros de tiempo para el gráfico de pastel
    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Aquí podrías actualizar los datos según el filtro seleccionado
        });
    });

    // Búsqueda en la tabla de pruebas
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterTable(this.value);
        });
    }

    // Búsqueda y filtros en la tabla de defectos
    const defectsSearchInput = document.getElementById('defectsSearchInput');
    if (defectsSearchInput) {
        defectsSearchInput.addEventListener('input', filterDefects);
    }

    const severityFilter = document.getElementById('severityFilter');
    if (severityFilter) {
        severityFilter.addEventListener('change', filterDefects);
    }

    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterDefects);
    }

    // Exportar datos
    const exportButton = document.querySelector('.btn-export');
    exportButton.addEventListener('click', exportData);

    // Event listeners para paginación
    const prevPageBtn = document.getElementById('prevPageBtn');
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', goToPrevPage);
    }

    const nextPageBtn = document.getElementById('nextPageBtn');
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', goToNextPage);
    }

    const itemsPerPageSelect = document.getElementById('itemsPerPageSelect');
    if (itemsPerPageSelect) {
        itemsPerPageSelect.addEventListener('change', function() {
            changeItemsPerPage(this.value);
        });
    }

    // Event listeners para paginación de defectos
    const defectsPrevPageBtn = document.getElementById('defectsPrevPageBtn');
    if (defectsPrevPageBtn) {
        defectsPrevPageBtn.addEventListener('click', goToDefectsPrevPage);
    }

    const defectsNextPageBtn = document.getElementById('defectsNextPageBtn');
    if (defectsNextPageBtn) {
        defectsNextPageBtn.addEventListener('click', goToDefectsNextPage);
    }

    const defectsItemsPerPageSelect = document.getElementById('defectsItemsPerPageSelect');
    if (defectsItemsPerPageSelect) {
        defectsItemsPerPageSelect.addEventListener('change', function() {
            changeDefectsItemsPerPage(this.value);
        });
    }

    // Auto-actualización cada 5 minutos
    setInterval(updateDashboard, 300000);
}

// Filtrar tabla con paginación
function filterTable(searchTerm) {
    const searchTermLower = searchTerm.toLowerCase();
    
    // Filtrar los tests basado en el término de búsqueda
    if (searchTerm === '') {
        filteredTests = [...testData.testDetails];
    } else {
        filteredTests = testData.testDetails.filter(test => {
            return test.id.toLowerCase().includes(searchTermLower) ||
                   test.name.toLowerCase().includes(searchTermLower) ||
                   test.escenario.toLowerCase().includes(searchTermLower) ||
                   getStatusText(test.status).toLowerCase().includes(searchTermLower) ||
                   test.executor.toLowerCase().includes(searchTermLower);
        });
    }
    
    // Resetear a la primera página y actualizar la tabla
    currentPage = 1;
    populateTestTable();
}

// Exportar datos
function exportData() {
    const data = testData.testDetails.map(test => ({
        ID: test.id,
        'Nombre de la Prueba': test.name,
        'Escenario': test.escenario,
        'Estado': getStatusText(test.status),
        'Duración': test.duration,
        'Ejecutor': test.executor
    }));

    const csv = convertToCSV(data);
    downloadCSV(csv, `reporte_qa_${new Date().toISOString().split('T')[0]}.csv`);
}

// Convertir a CSV
function convertToCSV(data) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return headers + '\n' + rows;
}

// Descargar CSV
function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Actualizar dashboard (simular datos en tiempo real)
function updateDashboard() {
    // Simular cambios menores en los datos
    testData.summary.planned += Math.floor(Math.random() * 5) - 2;
    testData.summary.successful += Math.floor(Math.random() * 3) - 1;
    testData.summary.failed += Math.floor(Math.random() * 2) - 1;
    testData.summary.pending += Math.floor(Math.random() * 2) - 1;
    
    // Asegurar que los números no sean negativos
    testData.summary.planned = Math.max(50, testData.summary.planned);
    testData.summary.successful = Math.max(0, testData.summary.successful);
    testData.summary.failed = Math.max(0, testData.summary.failed);
    testData.summary.pending = Math.max(0, testData.summary.pending);
    
    // Actualizar la interfaz
    initializeDashboard();
    createPieChart();
}

// Hacer las gráficas responsivas cuando cambie el tamaño de ventana
window.addEventListener('resize', function() {
    Plotly.Plots.resize('pieChart');
    Plotly.Plots.resize('trendChart');
    Plotly.Plots.resize('categoryChart');
    Plotly.Plots.resize('defectsChart');
    Plotly.Plots.resize('burndownChart');
    Plotly.Plots.resize('coverageChart');
});

// Configurar carga de archivos
function setupFileUpload() {
    const fileInput = document.getElementById('excelFile');
    fileInput.addEventListener('change', handleFileUpload);
}

// Manejar carga de archivos
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Limpiar estado anterior antes de cargar nuevo archivo
    resetDashboardState();

    const fileName = file.name.toLowerCase();
    
    if (fileName.endsWith('.csv')) {
        handleCSVFile(file);
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        handleExcelFile(file);
    } else {
        showNotification('Formato de archivo no soportado. Use .xlsx, .xls o .csv', 'error');
        // Limpiar el input del archivo
        event.target.value = '';
        return;
    }
}

// Función para resetear el estado del dashboard
function resetDashboardState() {
    // Resetear variables de paginación
    filteredTests = [];
    currentPage = 1;
    
    // Resetear variables de paginación de defectos
    filteredDefects = [];
    defectsCurrentPage = 1;
    
    // Limpiar selectores de proyectos activos si existen
    const existingModal = document.getElementById('projectSelectorModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Resetear valores de selector de items por página
    const itemsPerPageSelect = document.getElementById('itemsPerPageSelect');
    if (itemsPerPageSelect) {
        itemsPerPageSelect.value = '5';
        itemsPerPage = 5;
    }
    
    // Resetear valores de selector de items por página para defectos
    const defectsItemsPerPageSelect = document.getElementById('defectsItemsPerPageSelect');
    if (defectsItemsPerPageSelect) {
        defectsItemsPerPageSelect.value = '5';
        defectsItemsPerPage = 5;
    }
    
    // Limpiar campo de búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Limpiar filtros de defectos
    const defectsSearchInput = document.getElementById('defectsSearchInput');
    if (defectsSearchInput) {
        defectsSearchInput.value = '';
    }
    
    const severityFilter = document.getElementById('severityFilter');
    if (severityFilter) {
        severityFilter.value = '';
    }
    
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.value = '';
    }
    
    console.log('Dashboard state reset completed');
}

// Manejar archivos CSV
function handleCSVFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const csvData = e.target.result;
            const parsedData = parseCSV(csvData);
            
            if (isTestDetailsCSV(parsedData)) {
                updateDashboardWithCSVData(parsedData, 'details');
                showNotification('Datos de detalle de pruebas cargados exitosamente', 'success');
            } else if (isSummaryCSV(parsedData)) {
                updateDashboardWithCSVData(parsedData, 'summary');
                showNotification('Datos de resumen diario cargados exitosamente', 'success');
            } else if (isDefectsCSV(parsedData)) {
                updateDashboardWithCSVData(parsedData, 'defects');
                showNotification('Datos de defectos cargados exitosamente', 'success');
            } else {
                showNotification('Formato CSV no reconocido. Verifique las columnas.', 'error');
            }
        } catch (error) {
            console.error('Error procesando CSV:', error);
            showNotification('Error al procesar el archivo CSV: ' + error.message, 'error');
            // Resetear el input del archivo en caso de error
            const fileInput = document.getElementById('excelFile');
            if (fileInput) {
                fileInput.value = '';
            }
        }
    };
    
    reader.onerror = function() {
        showNotification('Error al leer el archivo CSV', 'error');
        const fileInput = document.getElementById('excelFile');
        if (fileInput) {
            fileInput.value = '';
        }
    };
    
    reader.readAsText(file);
}

// Manejar archivos Excel
function handleExcelFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Verificar si es formato multi-proyecto (sin necesidad de hojas Resumen_Pruebas ni Categorias_Pruebas)
            const expectedSheets = ['Proyectos', 'Tendencia_Historica', 'Detalle_Pruebas', 'Defectos'];
            const hasAllSheets = expectedSheets.every(sheet => workbook.SheetNames.includes(sheet));
            
            if (hasAllSheets) {
                handleMultiProjectExcel(workbook);
                showNotification('Archivo multi-proyecto cargado exitosamente', 'success');
            } else {
                // Formato legacy - procesar hojas individuales
                handleLegacyExcel(workbook);
            }
            
        } catch (error) {
            console.error('Error procesando Excel:', error);
            showNotification('Error al procesar el archivo Excel: ' + error.message, 'error');
            // Resetear el input del archivo en caso de error
            const fileInput = document.getElementById('excelFile');
            if (fileInput) {
                fileInput.value = '';
            }
        }
    };
    
    reader.onerror = function() {
        showNotification('Error al leer el archivo', 'error');
        const fileInput = document.getElementById('excelFile');
        if (fileInput) {
            fileInput.value = '';
        }
    };
    
    reader.readAsArrayBuffer(file);
}

// Manejar Excel multi-proyecto
function handleMultiProjectExcel(workbook) {
    try {
        // Leer todas las pestañas (sin Resumen_Pruebas ni Categorias_Pruebas, se calculan automáticamente)
        const proyectos = XLSX.utils.sheet_to_json(workbook.Sheets['Proyectos']);
        const tendenciaHistorica = XLSX.utils.sheet_to_json(workbook.Sheets['Tendencia_Historica']);
        const detallePruebas = XLSX.utils.sheet_to_json(workbook.Sheets['Detalle_Pruebas']);
        const defectos = XLSX.utils.sheet_to_json(workbook.Sheets['Defectos']);
        
        // Permitir seleccionar proyecto
        showProjectSelector(proyectos, {
            proyectos,
            tendenciaHistorica,
            detallePruebas,
            defectos
        });
        
    } catch (error) {
        console.error('Error procesando datos multi-proyecto:', error);
        showNotification('Error al procesar los datos del archivo', 'error');
    }
}

// Mostrar selector de proyecto
function showProjectSelector(proyectos, allData) {
    // Crear modal de selección
    const modal = document.createElement('div');
    modal.className = 'project-selector-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5); z-index: 1000;
        display: flex; align-items: center; justify-content: center;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white; padding: 2rem; border-radius: 12px; max-width: 500px; width: 90%;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    `;
    
    content.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: #1e293b;">Seleccionar Proyecto</h3>
        <p style="margin-bottom: 1.5rem; color: #64748b;">El archivo contiene ${proyectos.length} proyecto(s). Seleccione cuál desea cargar:</p>
        <div id="projectList" style="margin-bottom: 1.5rem;"></div>
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button id="cancelBtn" style="padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 6px; background: white; color: #374151; cursor: pointer;">Cancelar</button>
        </div>
    `;
    
    const projectList = content.querySelector('#projectList');
    proyectos.forEach((proyecto, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.style.cssText = `
            padding: 1rem; border: 2px solid #e5e7eb; border-radius: 8px; margin-bottom: 0.5rem; cursor: pointer;
            transition: all 0.2s ease; display: flex; justify-content: space-between; align-items: center;
        `;
        
        projectDiv.innerHTML = `
            <div>
                <strong style="color: #1e293b;">${proyecto.nombre_proyecto}</strong><br>
                <small style="color: #64748b;">ID: ${proyecto.proyecto_id} | Responsable: ${proyecto.responsable_qa}</small><br>
                <small style="color: #64748b;">Estado: ${proyecto.estado_proyecto}</small>
            </div>
        `;
        
        projectDiv.addEventListener('click', () => {
            loadProjectData(proyecto.proyecto_id, allData);
            document.body.removeChild(modal);
        });
        
        projectDiv.addEventListener('mouseover', () => {
            projectDiv.style.borderColor = '#3b82f6';
            projectDiv.style.backgroundColor = '#f8fafc';
        });
        
        projectDiv.addEventListener('mouseout', () => {
            projectDiv.style.borderColor = '#e5e7eb';
            projectDiv.style.backgroundColor = 'white';
        });
        
        projectList.appendChild(projectDiv);
    });
    
    content.querySelector('#cancelBtn').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.appendChild(content);
    document.body.appendChild(modal);
}

// Cargar datos del proyecto seleccionado
function loadProjectData(proyectoId, allData) {
    try {
        // Filtrar datos por proyecto
        const proyectoInfo = allData.proyectos.find(p => p.proyecto_id === proyectoId);
        const tendencia = allData.tendenciaHistorica.filter(t => t.proyecto_id === proyectoId);
        const pruebas = allData.detallePruebas.filter(p => p.proyecto_id === proyectoId);
        const defectos = allData.defectos.filter(d => d.proyecto_id === proyectoId);
        
        // CALCULAR AUTOMÁTICAMENTE LOS RESÚMENES BASÁNDOSE EN DETALLE_PRUEBAS
        const resumenCalculado = calculateSummaryFromDetails(pruebas);
        const categoriasCalculadas = calculateCategoriesFromDetails(pruebas);
        
        // Transformar a formato del dashboard
        const dashboardData = transformMultiProjectData({
            proyecto: proyectoInfo,
            resumen: resumenCalculado,
            tendencia,
            categorias: categoriasCalculadas,
            pruebas,
            defectos
        });
        
        // Actualizar dashboard
        updateDashboardWithTransformedData(dashboardData);
        showNotification(`Proyecto "${proyectoInfo.nombre_proyecto}" cargado exitosamente`, 'success');
        
    } catch (error) {
        console.error('Error cargando datos del proyecto:', error);
        showNotification('Error al cargar los datos del proyecto', 'error');
    }
}

// ========================================
// FUNCIONES PARA CALCULAR RESÚMENES AUTOMÁTICAMENTE
// ========================================

// Calcular resumen general basándose en los detalles de pruebas
function calculateSummaryFromDetails(pruebas) {
    const total = pruebas.length;
    let exitosas = 0;
    let fallidas = 0;
    let pendientes = 0;
    let bloqueadas = 0;
    let planificadas = 0;
    
    // Contar por estado
    pruebas.forEach(prueba => {
        const estado = prueba.estado?.toLowerCase();
        switch (estado) {
            case 'exitosa':
            case 'success':
                exitosas++;
                break;
            case 'fallida':
            case 'failed':
                fallidas++;
                break;
            case 'pendiente':
            case 'pending':
                pendientes++;
                break;
            case 'bloqueada':
            case 'blocked':
                bloqueadas++;
                break;
            case '':
            case undefined:
            case null:
                planificadas++; // Celdas vacías se consideran planificadas
                break;
            default:
                planificadas++; // Estados desconocidos se consideran planificadas
                break;
        }
    });
    
    console.log(`Resumen calculado - Total: ${total}, Planificadas: ${planificadas}, Exitosas: ${exitosas}, Fallidas: ${fallidas}, Pendientes: ${pendientes}, Bloqueadas: ${bloqueadas}`);
    
    return {
        proyecto_id: pruebas[0]?.proyecto_id || '',
        pruebas_planificadas: planificadas,
        pruebas_exitosas: exitosas,
        pruebas_fallidas: fallidas,
        pruebas_pendientes: pendientes,
        pruebas_bloqueadas: bloqueadas,
        fecha_actualizacion: new Date().toISOString().split('T')[0]
    };
}

// Calcular categorías/escenarios basándose en los detalles de pruebas
function calculateCategoriesFromDetails(pruebas) {
    const categorias = {};
    
    // Agrupar por escenario
    pruebas.forEach(prueba => {
        const escenario = prueba.escenario || prueba.categoria || 'Sin Categoría';
        
        if (!categorias[escenario]) {
            categorias[escenario] = {
                proyecto_id: prueba.proyecto_id,
                escenario: escenario,
                planificadas: 0,
                exitosas: 0,
                fallidas: 0,
                pendientes: 0,
                bloqueadas: 0,
                prioridad: 'Media',
                responsable: 'Equipo QA'
            };
        }
        
        // Contar por estado
        const estado = prueba.estado?.toLowerCase();
        switch (estado) {
            case 'exitosa':
            case 'success':
                categorias[escenario].exitosas++;
                break;
            case 'fallida':
            case 'failed':
                categorias[escenario].fallidas++;
                break;
            case 'pendiente':
            case 'pending':
                categorias[escenario].pendientes++;
                break;
            case 'bloqueada':
            case 'blocked':
                categorias[escenario].bloqueadas++;
                break;
            case '':
            case undefined:
            case null:
                categorias[escenario].planificadas++; // Celdas vacías se consideran planificadas
                break;
            default:
                categorias[escenario].planificadas++; // Estados desconocidos se consideran planificadas
                break;
        }
    });
    
    const resultado = Object.values(categorias);
    console.log('Categorías calculadas:', resultado);
    
    return resultado;
}

// Transformar datos multi-proyecto a formato dashboard
function transformMultiProjectData(data) {
    // Debug: mostrar fechas originales
    console.log('Fechas originales del Excel:', {
        fecha_inicio: data.proyecto.fecha_inicio,
        fecha_fin: data.proyecto.fecha_fin,
        tipo_inicio: typeof data.proyecto.fecha_inicio,
        tipo_fin: typeof data.proyecto.fecha_fin
    });
    
    const transformed = {
        projectInfo: {
            name: data.proyecto.nombre_proyecto,
            qaResponsible: data.proyecto.responsable_qa,
            startDate: formatDateForDashboard(data.proyecto.fecha_inicio),
            endDate: formatDateForDashboard(data.proyecto.fecha_fin),
            status: data.proyecto.estado_proyecto,
            progress: 0  // Se calculará automáticamente basado en pruebas exitosas
        },
        summary: {
            planned: data.resumen.pruebas_planificadas,
            successful: data.resumen.pruebas_exitosas,
            failed: data.resumen.pruebas_fallidas,
            pending: data.resumen.pruebas_pendientes,
            blocked: data.resumen.pruebas_bloqueadas || 0
        },
        trend: data.tendencia.map(t => ({
            date: formatDateForDashboard(t.fecha),
            planned: t.planificadas,
            successful: t.exitosas,
            failed: t.fallidas,
            pending: t.pendientes,
            blocked: t.bloqueadas || 0
        })),
        categories: data.categorias.map(c => ({
            escenario: c.escenario,
            planned: c.planificadas,
            successful: c.exitosas,
            failed: c.fallidas,
            pending: c.pendientes,
            blocked: c.bloqueadas || 0,
            priority: c.prioridad,
            responsible: c.responsable
        })),
        testDetails: (() => {
            // Debug: mostrar datos de pruebas originales
            console.log('=== DEBUG DETALLES DE PRUEBAS ===');
            console.log('Cantidad de pruebas en Excel:', data.pruebas.length);
            console.log('Muestra de pruebas originales:', data.pruebas.slice(0, 3));
            
            const mappedTests = data.pruebas.map(p => ({
                id: p.test_id,
                name: p.nombre_prueba,
                escenario: p.escenario,
                status: mapExcelStatusToDashboard(p.estado),
                duration: p.duracion_minutos ? p.duracion_minutos + ' min' : '-',
                executor: p.ejecutor,
                environment: p.ambiente,
                comments: p.comentarios
            }));
            
            console.log('Pruebas después de mapeo:', mappedTests.slice(0, 3));
            console.log('===============================');
            return mappedTests;
        })(),
        defects: {
            summary: calculateDefectsSummary(data.defectos),
            details: data.defectos.map(d => ({
                id: d.defecto_id,
                title: d.titulo,
                description: d.descripcion,
                severity: d.severidad,
                status: d.estado,
                escenario: d.escenario,
                assignee: d.asignado_a,
                reporter: d.reportado_por,
                dateFound: formatDateForDashboard(d.fecha_encontrado),
                dateAssigned: formatDateForDashboard(d.fecha_asignacion),
                dateResolved: formatDateForDashboard(d.fecha_resolucion),
                stepsToReproduce: d.pasos_reproducir,
                environment: d.ambiente_encontrado
            }))
        }
    };
    
    // Debug: mostrar fechas transformadas
    console.log('Fechas transformadas:', {
        startDate: transformed.projectInfo.startDate,
        endDate: transformed.projectInfo.endDate
    });
    
    return transformed;
}

// Calcular resumen de defectos
function calculateDefectsSummary(defects) {
    return {
        critical: defects.filter(d => d.severidad === 'Crítica').length,
        high: defects.filter(d => d.severidad === 'Alta').length,
        medium: defects.filter(d => d.severidad === 'Media').length,
        low: defects.filter(d => d.severidad === 'Baja').length
    };
}

// Formatear fecha para dashboard - maneja diferentes formatos de Excel
function formatDateForDashboard(dateValue) {
    if (!dateValue && dateValue !== 0) return '';
    
    console.log('formatDateForDashboard input:', dateValue, typeof dateValue);
    
    let date;
    
    // Si es un número (fecha serial de Excel)
    if (typeof dateValue === 'number') {
        // Excel fecha serial: días desde 1900-01-01
        // Excel considera 1900 como año bisiesto (bug histórico)
        const excelEpoch = new Date(1900, 0, 1);
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        
        // Ajustar por el bug del año bisiesto de Excel
        let adjustedDays = dateValue;
        if (dateValue > 59) {
            adjustedDays = dateValue - 1;
        }
        
        date = new Date(excelEpoch.getTime() + (adjustedDays - 1) * millisecondsPerDay);
        console.log('Excel serial convertido:', dateValue, '->', date);
    }
    // Si es un string
    else if (typeof dateValue === 'string') {
        // Formato DD/MM/AAAA HH:MM (con hora y minutos)
        if (dateValue.match(/^\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2}$/)) {
            const [datePart, timePart] = dateValue.split(/\s+/);
            const [day, month, year] = datePart.split('/').map(Number);
            const [hour, minute] = timePart.split(':').map(Number);
            
            date = new Date(year, month - 1, day, hour, minute);
            console.log('DD/MM/AAAA HH:MM convertido:', dateValue, '->', date);
        }
        // Formato DD/MM/AAAA (solo fecha)
        else if (dateValue.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
            const [day, month, year] = dateValue.split('/').map(Number);
            date = new Date(year, month - 1, day);
            console.log('DD/MM/AAAA convertido:', dateValue, '->', date);
        }
        // Formato DD-MM-AAAA HH:MM
        else if (dateValue.match(/^\d{1,2}-\d{1,2}-\d{4}\s+\d{1,2}:\d{2}$/)) {
            const [datePart, timePart] = dateValue.split(/\s+/);
            const [day, month, year] = datePart.split('-').map(Number);
            const [hour, minute] = timePart.split(':').map(Number);
            
            date = new Date(year, month - 1, day, hour, minute);
        }
        // Formato DD-MM-AAAA (solo fecha)
        else if (dateValue.match(/^\d{1,2}-\d{1,2}-\d{4}$/)) {
            const [day, month, year] = dateValue.split('-').map(Number);
            date = new Date(year, month - 1, day);
        }
        // Formato YYYY-MM-DD HH:MM
        else if (dateValue.match(/^\d{4}-\d{1,2}-\d{1,2}\s+\d{1,2}:\d{2}$/)) {
            const [datePart, timePart] = dateValue.split(/\s+/);
            const [year, month, day] = datePart.split('-').map(Number);
            const [hour, minute] = timePart.split(':').map(Number);
            
            date = new Date(year, month - 1, day, hour, minute);
        }
        // Formato YYYY-MM-DD (solo fecha)
        else if (dateValue.match(/^\d{4}-\d{1,2}-\d{1,2}$/)) {
            const [year, month, day] = dateValue.split('-').map(Number);
            date = new Date(year, month - 1, day);
        }
        else {
            // Intentar parsear directamente
            date = new Date(dateValue);
        }
        
        console.log('String convertido:', dateValue, '->', date);
    }
    // Si es ya un objeto Date
    else if (dateValue instanceof Date) {
        date = dateValue;
    }
    else {
        // Último intento
        date = new Date(dateValue);
    }
    
    // Validar que la fecha es válida
    if (isNaN(date.getTime())) {
        console.warn('Fecha inválida:', dateValue);
        return String(dateValue); // Devolver el valor original como string
    }
    
    // Formatear fecha
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    // Si la fecha original incluía hora, preservarla
    let formatted = `${day}/${month}/${year}`;
    
    // Verificar si hay componentes de hora en la fecha original
    if (typeof dateValue === 'string' && dateValue.includes(':')) {
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        formatted = `${day}/${month}/${year} ${hour}:${minute}`;
    } else if (typeof dateValue === 'number' || (date.getHours() !== 0 || date.getMinutes() !== 0)) {
        // Si es un número de Excel (que puede incluir tiempo) o si tiene hora/minuto no cero
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');
        // Solo agregar hora si no es medianoche (00:00)
        if (hour !== '00' || minute !== '00') {
            formatted = `${day}/${month}/${year} ${hour}:${minute}`;
        }
    }
    
    console.log('Fecha final formateada:', formatted);
    return formatted;
}

// Mapear estado de Excel a dashboard
function mapExcelStatusToDashboard(status) {
    const statusMap = {
        'Exitosa': 'success',
        'Fallida': 'failure',
        'Pendiente': 'pending',
        'Bloqueada': 'blocked'
    };
    return statusMap[status] || 'pending';
}

// Actualizar dashboard con datos transformados
function updateDashboardWithTransformedData(data) {
    try {
        // Actualizar datos globales
        Object.assign(testData, data);
        
        // Reiniciar variables de paginación
        filteredTests = [];
        currentPage = 1;
        
        // Reiniciar variables de paginación de defectos
        filteredDefects = [];
        defectsCurrentPage = 1;
        
        // Actualizar interfaz
        initializeDashboard();
        createCharts();
        populateTestTable();
        populateDefectsTable();
        
        // Guardar en localStorage para el editor
        localStorage.setItem('qaEditorData', JSON.stringify(data));
        
        console.log('Dashboard actualizado exitosamente');
    } catch (error) {
        console.error('Error actualizando dashboard:', error);
        showNotification('Error al actualizar el dashboard: ' + error.message, 'error');
    }
}

// Manejar Excel formato legacy
function handleLegacyExcel(workbook) {
    let hasDetailsSheet = false;
    let detailsData = [];
    
    // Procesar hoja de detalles primero si existe
    if (workbook.SheetNames.includes('Detalle_Pruebas')) {
        hasDetailsSheet = true;
        const worksheet = workbook.Sheets['Detalle_Pruebas'];
        detailsData = XLSX.utils.sheet_to_json(worksheet);
        updateDashboardWithExcelData(detailsData, 'details');
    }
    
    // Si existe la hoja de detalles, NO procesar la hoja de resumen (se calcula automáticamente)
    if (!hasDetailsSheet && workbook.SheetNames.includes('Resumen_Diario')) {
        const worksheet = workbook.Sheets['Resumen_Diario'];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        updateDashboardWithExcelData(jsonData, 'summary');
    }
    
    if (workbook.SheetNames.includes('Tendencia_Semanal')) {
        const worksheet = workbook.Sheets['Tendencia_Semanal'];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        updateDashboardWithExcelData(jsonData, 'trend');
    }
    
    // CALCULAR CATEGORÍAS AUTOMÁTICAMENTE desde Detalle_Pruebas en lugar de leer la hoja
    if (hasDetailsSheet && detailsData.length > 0) {
        const calculatedCategories = calculateCategoriesFromDetails(detailsData);
        updateDashboardWithExcelData(calculatedCategories, 'categories');
    } else if (workbook.SheetNames.includes('Categorias_Pruebas')) {
        // Solo usar la hoja si NO hay detalles (compatibilidad legacy)
        const worksheet = workbook.Sheets['Categorias_Pruebas'];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        updateDashboardWithExcelData(jsonData, 'categories');
    }
    
    showNotification('Archivo Excel cargado exitosamente', 'success');
}

// Parsear CSV
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        
        const values = lines[i].split(',');
        const row = {};
        
        headers.forEach((header, index) => {
            row[header] = values[index] ? values[index].trim() : '';
        });
        
        data.push(row);
    }
    
    return data;
}

// Verificar si es CSV de detalles de pruebas
function isTestDetailsCSV(data) {
    if (data.length === 0) return false;
    const firstRow = data[0];
    return firstRow.hasOwnProperty('ID_Prueba') && firstRow.hasOwnProperty('Nombre_Prueba');
}

// Verificar si es CSV de resumen
function isSummaryCSV(data) {
    if (data.length === 0) return false;
    const firstRow = data[0];
    return (firstRow.hasOwnProperty('Fecha') && firstRow.hasOwnProperty('Pruebas_Exitosas')) ||
           (firstRow.hasOwnProperty('Fecha') && firstRow.hasOwnProperty('Pruebas_Planificadas'));
}

// Verificar si es CSV de defectos
function isDefectsCSV(data) {
    if (data.length === 0) return false;
    const firstRow = data[0];
    return firstRow.hasOwnProperty('defecto_id') && firstRow.hasOwnProperty('titulo') && firstRow.hasOwnProperty('severidad');
}

// Actualizar dashboard con datos CSV
function updateDashboardWithCSVData(data, type) {
    if (type === 'details') {
        // Actualizar detalles de pruebas
        testData.testDetails = data.map(row => ({
            id: row.ID_Prueba || '',
            name: row.Nombre_Prueba || '',
            escenario: row.Escenario || '',
            status: mapStatus(row.Estado || ''),
            duration: row.Duracion_Minutos ? row.Duracion_Minutos + ' min' : '-',
            executor: row.Ejecutor || ''
        }));
        
        // Recalcular resumen basado en los detalles
        updateSummaryFromDetails();
        populateTestTable();
        
    } else if (type === 'summary') {
        // Actualizar datos de resumen
        const latestData = data[data.length - 1];
        if (latestData) {
            testData.summary = {
                planned: parseInt(latestData.Pruebas_Planificadas || testData.summary.planned || 100),
                successful: parseInt(latestData.Pruebas_Exitosas || 0),
                failed: parseInt(latestData.Pruebas_Fallidas || 0),
                pending: parseInt(latestData.Pruebas_Pendientes || 0)
            };
        }
        
        initializeDashboard();
    } else if (type === 'defects') {
        // Actualizar datos de defectos
        testData.defects = {
            summary: calculateDefectsSummary(data),
            details: data.map(row => ({
                id: row.defecto_id || '',
                title: row.titulo || '',
                description: row.descripcion || '',
                severity: row.severidad || '',
                status: row.estado || '',
                escenario: row.escenario || '',
                assignee: row.asignado_a || '',
                reporter: row.reportado_por || '',
                dateFound: formatDateForDashboard(row.fecha_encontrado || ''),
                dateAssigned: formatDateForDashboard(row.fecha_asignacion || ''),
                dateResolved: formatDateForDashboard(row.fecha_resolucion || ''),
                stepsToReproduce: row.pasos_reproducir || '',
                environment: row.ambiente_encontrado || ''
            }))
        };
        
        populateDefectsTable();
    }
    
    // Recrear gráficas
    createCharts();
}

// Actualizar dashboard con datos Excel
function updateDashboardWithExcelData(data, type) {
    switch (type) {
        case 'details':
            testData.testDetails = data.map(row => ({
                id: row.ID_Prueba || '',
                name: row.Nombre_Prueba || '',
                escenario: row.Escenario || '',
                status: mapStatus(row.Estado || ''),
                duration: row.Duracion_Minutos ? row.Duracion_Minutos + ' min' : '-',
                executor: row.Ejecutor || ''
            }));
            updateSummaryFromDetails();
            populateTestTable();
            break;
            
        case 'summary':
            const latestData = data[data.length - 1];
            if (latestData) {
                testData.summary = {
                    planned: parseInt(latestData.Pruebas_Planificadas || testData.summary.planned || 100),
                    successful: parseInt(latestData.Pruebas_Exitosas || 0),
                    failed: parseInt(latestData.Pruebas_Fallidas || 0),
                    pending: parseInt(latestData.Pruebas_Pendientes || 0)
                };
            }
            initializeDashboard();
            break;
            
        case 'trend':
            testData.trend = data.map(row => ({
                date: row.Fecha || '',
                planned: parseInt(row.Planificadas || row.Planned || 0),
                successful: parseInt(row.Exitosas || 0),
                failed: parseInt(row.Fallidas || 0),
                pending: parseInt(row.Pendientes || 0)
            }));
            break;
            
        case 'categories':
            testData.categories = data.map(row => ({
                escenario: row.Escenario || '',
                planned: parseInt(row.Planificadas || row.Planned || 0),
                successful: parseInt(row.Exitosas || 0),
                failed: parseInt(row.Fallidas || 0),
                pending: parseInt(row.Pendientes || 0)
            }));
            break;
            
        case 'defects':
            testData.defects = {
                summary: calculateDefectsSummary(data),
                details: data.map(row => ({
                    id: row.defecto_id || '',
                    title: row.titulo || '',
                    description: row.descripcion || '',
                    severity: row.severidad || '',
                    status: row.estado || '',
                    escenario: row.escenario || '',
                    assignee: row.asignado_a || '',
                    reporter: row.reportado_por || '',
                    dateFound: formatDateForDashboard(row.fecha_encontrado || ''),
                    dateAssigned: formatDateForDashboard(row.fecha_asignacion || ''),
                    dateResolved: formatDateForDashboard(row.fecha_resolucion || ''),
                    stepsToReproduce: row.pasos_reproducir || '',
                    environment: row.ambiente_encontrado || ''
                }))
            };
            populateDefectsTable();
            break;
    }
    
    createCharts();
}

// Mapear estados del archivo a formato interno
function mapStatus(status) {
    const statusMap = {
        'Exitosa': 'success',
        'Fallida': 'failure',
        'Pendiente': 'pending',
        'Bloqueada': 'blocked',
        'Planificada': 'planned',
        'Success': 'success',
        'Failed': 'failure',
        'Pending': 'pending',
        'Blocked': 'blocked',
        'Planned': 'planned'
    };
    
    // Si el estado está vacío o es null/undefined, considerarlo como planificada
    if (!status || status.trim() === '') {
        return 'planned';
    }
    
    return statusMap[status] || 'planned';
}

// Actualizar resumen basado en detalles
function updateSummaryFromDetails() {
    const successful = testData.testDetails.filter(t => t.status === 'success').length;
    const failed = testData.testDetails.filter(t => t.status === 'failure').length;
    const pending = testData.testDetails.filter(t => t.status === 'pending').length;
    const blocked = testData.testDetails.filter(t => t.status === 'blocked').length;
    const planned = testData.testDetails.filter(t => t.status === 'planned').length;
    
    testData.summary = {
        planned,
        successful,
        failed,
        pending,
        blocked
    };
    
    // Actualizar la información del proyecto con el nuevo progreso calculado
    initializeDashboard();
    
    // Actualizar gráfico de cobertura con los nuevos datos
    updateCoverageChart(testData.testDetails);
    
    console.log('✅ Resumen y cobertura actualizados desde detalles');
}

// Mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Agregar estilos si no existen
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: white;
                font-size: 0.875rem;
                z-index: 1000;
                box-shadow: var(--shadow-lg);
                animation: slideIn 0.3s ease-out;
            }
            .notification-success { background: #10b981; }
            .notification-error { background: #ef4444; }
            .notification-info { background: #2563eb; }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0.25rem;
                opacity: 0.8;
            }
            .notification-close:hover { opacity: 1; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Configurar integración con el editor
function setupEditorIntegration() {
    // Escuchar mensajes del editor
    window.addEventListener('message', function(event) {
        if (event.data.type === 'QA_DATA_UPDATE') {
            updateDashboardWithEditorData(event.data.data);
        }
    });
    
    // Escuchar cambios en localStorage
    window.addEventListener('storage', function(event) {
        if (event.key === 'qaEditorData' && event.newValue) {
            try {
                const data = JSON.parse(event.newValue);
                updateDashboardWithEditorData(data);
            } catch (error) {
                console.error('Error procesando datos del localStorage:', error);
            }
        }
    });
    
    // Polling para detectar cambios en localStorage (fallback)
    setInterval(() => {
        loadEditorData();
    }, 2000);
    
    // Notificar que el dashboard está listo
    if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ type: 'DASHBOARD_READY' }, '*');
    }
    
    // Cargar datos del editor si están disponibles
    loadEditorData();
}

// Variable para rastrear la última actualización
let lastDataHash = '';

// Cargar datos del editor desde localStorage
function loadEditorData() {
    try {
        const savedData = localStorage.getItem('qaEditorData');
        if (savedData) {
            // Crear hash simple usando la longitud y algunos caracteres del string
            const currentHash = simpleHash(savedData);
            if (currentHash !== lastDataHash) {
                const data = JSON.parse(savedData);
                updateDashboardWithEditorData(data);
                lastDataHash = currentHash;
                console.log('Dashboard actualizado desde el editor');
            }
        }
    } catch (error) {
        console.error('Error cargando datos del editor:', error);
    }
}

// Función helper para crear un hash simple que soporte Unicode
function simpleHash(str) {
    let hash = 0;
    if (str.length === 0) return hash.toString();
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convertir a 32-bit integer
    }
    return hash.toString();
}

// Actualizar dashboard con datos del editor
function updateDashboardWithEditorData(data) {
    try {
        // Actualizar datos
        if (data.summary) {
            testData.summary = data.summary;
        }
        
        if (data.trend) {
            testData.trend = data.trend;
        }
        
        if (data.categories) {
            testData.categories = data.categories;
        }
        
        if (data.testDetails) {
            testData.testDetails = data.testDetails;
        }
        
        if (data.defects) {
            testData.defects = data.defects;
        }
        
        // Actualizar interfaz
        initializeDashboard();
        createCharts();
        populateTestTable();
        populateDefectsTable();
        
        console.log('Dashboard actualizado desde el editor');
    } catch (error) {
        console.error('Error actualizando dashboard:', error);
        showNotification('Error al actualizar desde el editor', 'error');
    }
}

// Abrir editor de datos
function openDataEditor() {
    const editorWindow = window.open('template_excel_modelo.html', 'dataEditor', 'width=1400,height=900');
    
    if (editorWindow) {
        // Enviar datos actuales al editor cuando se cargue
        editorWindow.addEventListener('load', function() {
            const currentData = {
                summary: testData.summary,
                trend: testData.trend,
                categories: testData.categories,
                testDetails: testData.testDetails
            };
            
            editorWindow.postMessage({
                type: 'LOAD_CURRENT_DATA',
                data: currentData
            }, '*');
        });
        
        showNotification('Editor de datos abierto en nueva ventana', 'success');
    } else {
        showNotification('No se pudo abrir el editor. Verifica los pop-ups bloqueados.', 'error');
    }
}

// Función para editar información del proyecto
function editProjectInfo() {
    // Verificar que testData.projectInfo existe
    if (!testData.projectInfo) {
        console.error('No hay datos de proyecto disponibles');
        showNotification('Error: No se encontraron datos del proyecto', 'error');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); display: flex; align-items: center;
        justify-content: center; z-index: 1000; backdrop-filter: blur(4px);
    `;
    
    // Función para convertir fecha DD/MM/YYYY a YYYY-MM-DD
    function convertDateForInput(dateStr) {
        if (!dateStr || !dateStr.includes('/')) return '';
        const parts = dateStr.split('/');
        if (parts.length !== 3) return '';
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    
    const form = document.createElement('div');
    form.className = 'modal-content';
    form.style.cssText = `
        background: #ffffff; border-radius: 12px; padding: 2rem;
        max-width: 500px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        max-height: 80vh; overflow-y: auto; border: 1px solid #e2e8f0;
        color: #1e293b;
    `;
    
    // Detectar modo oscuro
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' || 
                      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (isDarkMode) {
        form.style.background = '#1e293b';
        form.style.color = '#f8fafc';
        form.style.border = '1px solid #475569';
    }
    
    form.innerHTML = `
        <h3 style="margin: 0 0 1.5rem 0; font-size: 1.25rem; font-weight: 600; color: inherit;">
            Información del Proyecto
        </h3>
        
        <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 14px; color: inherit;">
                Nombre del Proyecto:
            </label>
            <select id="editProjectName" style="width: 100%; padding: 0.75rem; border: 1px solid ${isDarkMode ? '#475569' : '#d1d5db'}; 
                                               border-radius: 6px; background: ${isDarkMode ? '#0f172a' : '#ffffff'}; 
                                               color: ${isDarkMode ? '#f8fafc' : '#1e293b'}; font-size: 14px; 
                                               box-sizing: border-box; transition: border-color 0.3s ease;"
                    onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                    onblur="this.style.borderColor='${isDarkMode ? '#475569' : '#d1d5db'}'; this.style.boxShadow='none'">
                <option value="">Seleccionar proyecto...</option>
                <option value="Building Block - Aplicaciones de Soporte" ${testData.projectInfo.name === 'Building Block - Aplicaciones de Soporte' ? 'selected' : ''}>Building Block - Aplicaciones de Soporte</option>
                <option value="Building Block - Canales Asistidos" ${testData.projectInfo.name === 'Building Block - Canales Asistidos' ? 'selected' : ''}>Building Block - Canales Asistidos</option>
                <option value="Building Block - Canales Digitales" ${testData.projectInfo.name === 'Building Block - Canales Digitales' ? 'selected' : ''}>Building Block - Canales Digitales</option>
                <option value="Building Block - Cards" ${testData.projectInfo.name === 'Building Block - Cards' ? 'selected' : ''}>Building Block - Cards</option>
                <option value="Building Block - Ciberseguridad" ${testData.projectInfo.name === 'Building Block - Ciberseguridad' ? 'selected' : ''}>Building Block - Ciberseguridad</option>
                <option value="Building Block - Core" ${testData.projectInfo.name === 'Building Block - Core' ? 'selected' : ''}>Building Block - Core</option>
                <option value="Building Block - Data" ${testData.projectInfo.name === 'Building Block - Data' ? 'selected' : ''}>Building Block - Data</option>
                <option value="Building Block - Integración" ${testData.projectInfo.name === 'Building Block - Integración' ? 'selected' : ''}>Building Block - Integración</option>
                <option value="Building Block - Payments" ${testData.projectInfo.name === 'Building Block - Payments' ? 'selected' : ''}>Building Block - Payments</option>
                <option value="Building Block - Procesos" ${testData.projectInfo.name === 'Building Block - Procesos' ? 'selected' : ''}>Building Block - Procesos</option>
            </select>
        </div>
        
        <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 14px; color: inherit;">
                Responsable QA:
            </label>
            <input type="text" id="editQAResponsible" value="${testData.projectInfo.qaResponsible || ''}" 
                   style="width: 100%; padding: 0.75rem; border: 1px solid ${isDarkMode ? '#475569' : '#d1d5db'}; 
                          border-radius: 6px; background: ${isDarkMode ? '#0f172a' : '#ffffff'}; 
                          color: ${isDarkMode ? '#f8fafc' : '#1e293b'}; font-size: 14px; 
                          box-sizing: border-box; transition: border-color 0.3s ease;"
                   onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                   onblur="this.style.borderColor='${isDarkMode ? '#475569' : '#d1d5db'}'; this.style.boxShadow='none'" />
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 14px; color: inherit;">
                    Fecha Inicio:
                </label>
                <input type="date" id="editStartDate" value="${convertDateForInput(testData.projectInfo.startDate)}" 
                       style="width: 100%; padding: 0.75rem; border: 1px solid ${isDarkMode ? '#475569' : '#d1d5db'}; 
                              border-radius: 6px; background: ${isDarkMode ? '#0f172a' : '#ffffff'}; 
                              color: ${isDarkMode ? '#f8fafc' : '#1e293b'}; font-size: 14px; 
                              box-sizing: border-box; transition: border-color 0.3s ease;"
                       onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                       onblur="this.style.borderColor='${isDarkMode ? '#475569' : '#d1d5db'}'; this.style.boxShadow='none'" />
            </div>
            <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 14px; color: inherit;">
                    Fecha Fin:
                </label>
                <input type="date" id="editEndDate" value="${convertDateForInput(testData.projectInfo.endDate)}" 
                       style="width: 100%; padding: 0.75rem; border: 1px solid ${isDarkMode ? '#475569' : '#d1d5db'}; 
                              border-radius: 6px; background: ${isDarkMode ? '#0f172a' : '#ffffff'}; 
                              color: ${isDarkMode ? '#f8fafc' : '#1e293b'}; font-size: 14px; 
                              box-sizing: border-box; transition: border-color 0.3s ease;"
                       onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                       onblur="this.style.borderColor='${isDarkMode ? '#475569' : '#d1d5db'}'; this.style.boxShadow='none'" />
            </div>
        </div>
        
        <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 14px; color: inherit;">
                Progreso (%):
            </label>
            <input type="number" id="editProgress" value="${testData.projectInfo.progress || 0}" min="0" max="100"
                   style="width: 100%; padding: 0.75rem; border: 1px solid ${isDarkMode ? '#475569' : '#d1d5db'}; 
                          border-radius: 6px; background: ${isDarkMode ? '#0f172a' : '#ffffff'}; 
                          color: ${isDarkMode ? '#f8fafc' : '#1e293b'}; font-size: 14px; 
                          box-sizing: border-box; transition: border-color 0.3s ease;"
                   onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                   onblur="this.style.borderColor='${isDarkMode ? '#475569' : '#d1d5db'}'; this.style.boxShadow='none'" />
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; font-size: 14px; color: inherit;">
                Estado:
            </label>
            <select id="editStatus" style="width: 100%; padding: 0.75rem; border: 1px solid ${isDarkMode ? '#475569' : '#d1d5db'}; 
                                           border-radius: 6px; background: ${isDarkMode ? '#0f172a' : '#ffffff'}; 
                                           color: ${isDarkMode ? '#f8fafc' : '#1e293b'}; font-size: 14px; 
                                           box-sizing: border-box; transition: border-color 0.3s ease;"
                    onfocus="this.style.borderColor='#3b82f6'; this.style.boxShadow='0 0 0 3px rgba(59, 130, 246, 0.1)'"
                    onblur="this.style.borderColor='${isDarkMode ? '#475569' : '#d1d5db'}'; this.style.boxShadow='none'">
                <option value="Planificación" ${testData.projectInfo.status === 'Planificación' ? 'selected' : ''}>Planificación</option>
                <option value="Análisis" ${testData.projectInfo.status === 'Análisis' ? 'selected' : ''}>Análisis</option>
                <option value="Diseño" ${testData.projectInfo.status === 'Diseño' ? 'selected' : ''}>Diseño</option>
                <option value="Preparación" ${testData.projectInfo.status === 'Preparación' ? 'selected' : ''}>Preparación</option>
                <option value="Pruebas QA" ${testData.projectInfo.status === 'Pruebas QA' ? 'selected' : ''}>Pruebas QA</option>
                <option value="Cierre" ${testData.projectInfo.status === 'Cierre' ? 'selected' : ''}>Cierre</option>
            </select>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
            <button type="button" onclick="closeModal()" 
                    style="padding: 0.75rem 1.5rem; border: 1px solid ${isDarkMode ? '#475569' : '#d1d5db'}; 
                           background: transparent; color: ${isDarkMode ? '#f8fafc' : '#1e293b'}; 
                           border-radius: 6px; cursor: pointer; font-size: 14px; 
                           transition: all 0.3s ease;"
                    onmouseover="this.style.background='${isDarkMode ? '#374151' : '#f3f4f6'}'"
                    onmouseout="this.style.background='transparent'">
                Cancelar
            </button>
            <button type="button" onclick="saveProjectInfo()" 
                    style="padding: 0.75rem 1.5rem; border: none; background: #3b82f6; color: white; 
                           border-radius: 6px; cursor: pointer; font-size: 14px; 
                           transition: all 0.3s ease;"
                    onmouseover="this.style.background='#2563eb'; this.style.transform='translateY(-1px)'"
                    onmouseout="this.style.background='#3b82f6'; this.style.transform='translateY(0)'">
                Guardar
            </button>
        </div>
    `;
    
    modal.appendChild(form);
    document.body.appendChild(modal);
    
    // Funciones del modal
    window.closeModal = function() {
        modal.remove();
        delete window.closeModal;
        delete window.saveProjectInfo;
    };
    
    window.saveProjectInfo = function() {
        updateProjectInfo();
    };
}

// Función para actualizar información del proyecto
function updateProjectInfo() {
    try {
        // Función para convertir fecha YYYY-MM-DD a DD/MM/YYYY
        function convertDateFromInput(dateStr) {
            if (!dateStr) return '';
            const parts = dateStr.split('-');
            if (parts.length !== 3) return dateStr;
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        
        // Validar campos requeridos
        const projectName = document.getElementById('editProjectName').value;
        const qaResponsible = document.getElementById('editQAResponsible').value.trim();
        
        if (!projectName || projectName === '' || !qaResponsible) {
            showNotification('Por favor complete todos los campos requeridos', 'error');
            return;
        }
        
        // Actualizar datos del proyecto
        testData.projectInfo = {
            name: projectName,
            qaResponsible: qaResponsible,
            startDate: convertDateFromInput(document.getElementById('editStartDate').value),
            endDate: convertDateFromInput(document.getElementById('editEndDate').value),
            progress: parseInt(document.getElementById('editProgress').value) || 0,
            status: document.getElementById('editStatus').value
        };
        
        // Guardar en localStorage
        localStorage.setItem('qaTestData', JSON.stringify(testData));
        
        // Actualizar la vista
        initializeDashboard();
        
        // Cerrar modal
        if (window.closeModal) {
            window.closeModal();
        }
        
        // Mostrar confirmación
        showNotification('Información del proyecto actualizada correctamente', 'success');
        
    } catch (error) {
        console.error('Error actualizando información del proyecto:', error);
        showNotification('Error al actualizar la información del proyecto', 'error');
    }
}

// ========================================
// FUNCIONES PARA AMPLIFICAR GRÁFICOS
// ========================================

// Variable para guardar el gráfico actual en el modal
let currentExpandedChart = null;

// Función para expandir un gráfico específico
function expandChart(chartType, title) {
    const modal = document.getElementById('chartModal');
    const modalTitle = document.getElementById('chartModalTitle');
    const modalContainer = document.getElementById('chartModalContainer');
    
    // Limpiar el contenedor del modal
    modalContainer.innerHTML = '';
    
    // Establecer el título
    modalTitle.textContent = title;
    
    // Crear el contenedor para el gráfico ampliado
    const expandedChartDiv = document.createElement('div');
    expandedChartDiv.id = `expanded${chartType}Chart`;
    expandedChartDiv.style.width = '100%';
    expandedChartDiv.style.height = '100%';
    modalContainer.appendChild(expandedChartDiv);
    
    // Mostrar el modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Obtener el gráfico original y copiarlo ampliado
    setTimeout(() => {
        copyAndExpandExistingChart(chartType, expandedChartDiv.id);
    }, 100);
}

// Función para copiar y ampliar gráficos existentes
function copyAndExpandExistingChart(chartType, containerId) {
    const container = document.getElementById(containerId);
    let sourceChartId, newLayout;
    
    // Mapear tipos de gráfico a sus IDs originales
    const chartIdMap = {
        'pie': 'pieChart',
        'trend': 'trendChart', 
        'category': 'categoryChart',
        'defects': 'defectsChart',
        'burndown': 'burndownChart',
        'coverage': 'coverageChart'
    };
    
    sourceChartId = chartIdMap[chartType];
    const sourceElement = document.getElementById(sourceChartId);
    
    if (!sourceElement || !sourceElement.data || !sourceElement.layout) {
        console.error('No se pudo encontrar el gráfico fuente:', sourceChartId);
        return;
    }
    
    // Copiar datos del gráfico original
    const originalData = JSON.parse(JSON.stringify(sourceElement.data));
    const originalLayout = JSON.parse(JSON.stringify(sourceElement.layout));
    
    // Ajustar layout para el modal ampliado
    newLayout = {
        ...originalLayout,
        width: undefined,
        height: undefined,
        autosize: true,
        margin: { t: 60, b: 60, l: 60, r: 60 },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',
        font: {
            ...originalLayout.font,
            size: 16, // Aumentar el tamaño de fuente para mejor legibilidad
            color: '#374151' // Color de texto más oscuro para mejor contraste
        }
    };
    
    // Configuración específica para gráfico circular
    if (chartType === 'pie') {
        newLayout.showlegend = true;
        newLayout.legend = {
            orientation: 'v',
            x: 1.05,
            y: 0.5,
            font: { size: 14 }
        };
        // Hacer texto más grande en el gráfico circular
        if (originalData[0]) {
            originalData[0].textfont = { size: 16 };
        }
    }
    
    // Configuración específica para gráfico de tendencia
    if (chartType === 'trend') {
        newLayout.xaxis = {
            ...originalLayout.xaxis,
            tickfont: { size: 14 }
        };
        newLayout.yaxis = {
            ...originalLayout.yaxis,
            tickfont: { size: 14 }
        };
    }
    
    // Configuración específica para gráfico burndown
    if (chartType === 'burndown') {
        newLayout.xaxis = {
            ...originalLayout.xaxis,
            tickfont: { size: 14 }
        };
        newLayout.yaxis = {
            ...originalLayout.yaxis,
            tickfont: { size: 14 }
        };
        newLayout.legend = {
            ...originalLayout.legend,
            font: { size: 14 }
        };
    }
    
    // Configuración específica para gráfico de cobertura
    if (chartType === 'coverage') {
        newLayout.xaxis = {
            ...originalLayout.xaxis,
            tickfont: { size: 14 }
        };
        newLayout.yaxis = {
            ...originalLayout.yaxis,
            tickfont: { size: 14 }
        };
        newLayout.margin = { t: 60, b: 60, l: 150, r: 60 }; // Más espacio para etiquetas de módulos
    }
    
    // Crear el gráfico ampliado con los datos originales
    Plotly.newPlot(containerId, originalData, newLayout, {
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d'],
        responsive: true
    });
}

// Crear gráfico circular ampliado
function createExpandedPieChart(container) {
    const data = testData.summary;
    
    const values = [data.successful, data.failed, data.pending];
    const labels = ['Exitosas', 'Fallidas', 'Pendientes'];
    const colors = ['#10B981', '#EF4444', '#F59E0B'];
    
    // Agregar planificadas si existe
    if (data.planned && data.planned > 0) {
        values.push(data.planned);
        labels.push('Planificadas');
        colors.push('#9CA3AF');
    }
    
    // Agregar bloqueadas si existe
    if (data.blocked && data.blocked > 0) {
        values.push(data.blocked);
        labels.push('Bloqueadas');
        colors.push('#6B7280');
    }
    
    const chartData = [{
        values: values,
        labels: labels,
        type: 'pie',
        marker: {
            colors: colors
        },
        textinfo: 'label+percent+value',
        textfont: {
            size: 16,
            color: '#374151'
        },
        hovertemplate: '<b>%{label}</b><br>' +
                      'Cantidad: %{value}<br>' +
                      'Porcentaje: %{percent}<br>' +
                      '<extra></extra>'
    }];

    const layout = {
        title: {
            text: 'Resumen de Resultados de Pruebas',
            font: { size: 24, color: '#374151' }
        },
        font: { size: 14 },
        showlegend: true,
        legend: {
            orientation: "h",
            yanchor: "bottom",
            y: -0.1,
            xanchor: "center",
            x: 0.5,
            font: { size: 16 }
        },
        margin: { t: 80, b: 80, l: 40, r: 40 },
        height: null,
        autosize: true
    };

    const config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToAdd: ['downloadSVG'],
        modeBarButtonsToRemove: ['autoScale2d', 'resetScale2d']
    };

    currentExpandedChart = Plotly.newPlot(container, chartData, layout, config);
}

// Crear gráfico de tendencias ampliado
function createExpandedTrendChart(container) {
    const categories = testData.categories.map(c => c.escenario);
    
    const plannedTrace = {
        x: categories,
        y: testData.categories.map(c => c.planned),
        name: 'Planificadas',
        type: 'bar',
        marker: { color: '#6B7280' },
        hovertemplate: '<b>%{x}</b><br>Planificadas: %{y}<extra></extra>'
    };

    const successfulTrace = {
        x: categories,
        y: testData.categories.map(c => c.successful),
        name: 'Exitosas',
        type: 'bar',
        marker: { color: '#10B981' },
        hovertemplate: '<b>%{x}</b><br>Exitosas: %{y}<extra></extra>'
    };

    const failedTrace = {
        x: categories,
        y: testData.categories.map(c => c.failed),
        name: 'Fallidas',
        type: 'bar',
        marker: { color: '#EF4444' },
        hovertemplate: '<b>%{x}</b><br>Fallidas: %{y}<extra></extra>'
    };

    const pendingTrace = {
        x: categories,
        y: testData.categories.map(c => c.pending),
        name: 'Pendientes',
        type: 'bar',
        marker: { color: '#F59E0B' },
        hovertemplate: '<b>%{x}</b><br>Pendientes: %{y}<extra></extra>'
    };

    const blockedTrace = {
        x: categories,
        y: testData.categories.map(c => c.blocked || 0),
        name: 'Bloqueadas',
        type: 'bar',
        marker: { color: '#6B7280' },
        hovertemplate: '<b>%{x}</b><br>Bloqueadas: %{y}<extra></extra>'
    };

    const layout = {
        title: {
            text: 'Pruebas por Escenario - Vista Detallada',
            font: { size: 24, color: '#374151' }
        },
        xaxis: { 
            title: 'Escenarios de Prueba',
            titlefont: { size: 16 },
            tickfont: { size: 14 }
        },
        yaxis: { 
            title: 'Cantidad de Pruebas',
            titlefont: { size: 16 },
            tickfont: { size: 14 }
        },
        barmode: 'group',
        legend: {
            orientation: "h",
            yanchor: "bottom",
            y: -0.2,
            xanchor: "center",
            x: 0.5,
            font: { size: 16 }
        },
        margin: { t: 80, b: 120, l: 60, r: 40 },
        height: null,
        autosize: true
    };

    const config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToAdd: ['downloadSVG'],
        modeBarButtonsToRemove: ['autoScale2d', 'resetScale2d']
    };

    currentExpandedChart = Plotly.newPlot(container, [plannedTrace, successfulTrace, failedTrace, pendingTrace, blockedTrace], layout, config);
}

// Crear gráfico de categorías ampliado (mismo que trend pero con diferente título)
function createExpandedCategoryChart(container) {
    createExpandedTrendChart(container);
    // Actualizar el título después de crear el gráfico
    setTimeout(() => {
        Plotly.relayout(container, {
            'title.text': 'Distribución de Pruebas por Escenario'
        });
    }, 100);
}

// Crear gráfico de defectos ampliado
function createExpandedDefectsChart(container) {
    const defectsData = testData.defects.summary;
    
    const chartData = [{
        values: [defectsData.critical, defectsData.high, defectsData.medium, defectsData.low],
        labels: ['Críticos', 'Altos', 'Medios', 'Bajos'],
        type: 'pie',
        marker: {
            colors: ['#DC2626', '#F59E0B', '#3B82F6', '#10B981']
        },
        textinfo: 'label+percent+value',
        textfont: {
            size: 16,
            color: '#374151'
        },
        hovertemplate: '<b>%{label}</b><br>' +
                      'Cantidad: %{value}<br>' +
                      'Porcentaje: %{percent}<br>' +
                      '<extra></extra>'
    }];

    const layout = {
        title: {
            text: 'Distribución de Defectos por Severidad',
            font: { size: 24, color: '#374151' }
        },
        font: { size: 14 },
        showlegend: true,
        legend: {
            orientation: "h",
            yanchor: "bottom",
            y: -0.1,
            xanchor: "center",
            x: 0.5,
            font: { size: 16 }
        },
        margin: { t: 80, b: 80, l: 40, r: 40 },
        height: null,
        autosize: true
    };

    const config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToAdd: ['downloadSVG'],
        modeBarButtonsToRemove: ['autoScale2d', 'resetScale2d']
    };

    currentExpandedChart = Plotly.newPlot(container, chartData, layout, config);
}

// Función para cerrar el modal de gráficos
function closeChartModal(event) {
    // Si se hace click en el overlay (no en el contenido), cerrar el modal
    if (event && event.target.id !== 'chartModal') {
        return;
    }
    
    const modal = document.getElementById('chartModal');
    const modalContainer = document.getElementById('chartModalContainer');
    
    // Limpiar el gráfico
    if (currentExpandedChart) {
        currentExpandedChart = null;
    }
    
    // Limpiar el contenedor
    modalContainer.innerHTML = '';
    
    // Ocultar el modal
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Manejar el redimensionamiento de ventana para gráficos ampliados
window.addEventListener('resize', function() {
    if (currentExpandedChart) {
        setTimeout(() => {
            const modalContainer = document.getElementById('chartModalContainer');
            if (modalContainer.firstChild) {
                Plotly.Plots.resize(modalContainer.firstChild);
            }
        }, 100);
    }
});

// Manejar el cierre del modal con la tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeChartModal();
    }
});

