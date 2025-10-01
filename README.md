# 📊 Santander - Dashboard QA

**Sistema de monitoreo y reporte de pruebas de calidad para equipos de desarrollo**

Un dashboard interactivo y profesional diseñado para el seguimiento diario de la ejecución de casos de prueba en proyectos de desarrollo de software.

## 🎯 Características Principales

### 📈 **Visualización de Datos**
- **Gráficos interactivos** con Plotly.js
- **Métricas KPI** en tiempo real
- **Tablas dinámicas** con paginación y filtros
- **Gráficos de tendencias** de ejecución de pruebas

### 📊 **Tipos de Visualización**
- **Gráfico Circular**: Resumen de resultados de pruebas
- **Gráfico de Líneas**: Tendencia de ejecución de pruebas
- **Gráfico de Barras**: Cobertura de pruebas por módulo
- **KPIs**: Métricas clave (Exitosas, Fallidas, Pendientes, etc.)

### 📁 **Gestión de Datos**
- **Carga de archivos Excel** (.xlsx, .xls, .csv)
- **Procesamiento automático** de datos de pruebas
- **Datos de ejemplo** incluidos para demostración

### 🎨 **Diseño Corporativo**
- **Colores Santander** (Rojo #EC0000)
- **Diseño responsive** para desktop y móvil
- **Interfaz moderna** con animations y efectos
- **Footer corporativo** con información de contacto

## 🚀 Tecnologías Utilizadas

### **Frontend**
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS y gradientes
- **JavaScript ES6+** - Lógica de aplicación
- **Font Awesome 6.0** - Iconografía
- **Google Fonts (Inter)** - Tipografía

### **Librerías**
- **Plotly.js** - Gráficos interactivos
- **SheetJS (xlsx.js)** - Procesamiento de archivos Excel
- **CSS Grid & Flexbox** - Layout responsive

## 📁 Estructura del Proyecto

```
DASHBOARD QA REPORTE DIARIO/
├── index.html              # Página principal
├── styles.css              # Estilos CSS principales
├── script.js               # Lógica JavaScript
├── README.md               # Este archivo
```

## 🛠️ Instalación y Uso

### **Requisitos Previos**
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, pero recomendado)

### **Instalación**
1. **Clonar o descargar** el proyecto
```bash
git clone [URL_DEL_REPOSITORIO]
cd "DASHBOARD QA REPORTE DIARIO"
```

2. **Abrir en navegador**
   - Opción 1: Abrir `index.html` directamente
   - Opción 2: Usar servidor local (recomendado)
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server

# Con Live Server (VS Code)
# Clic derecho en index.html > "Open with Live Server"
```

3. **Acceder al dashboard**
   - Navegador: `http://localhost:8000`

## 📊 Uso del Dashboard

### **1. Información del Proyecto**
- Visualiza datos básicos del proyecto
- Nombre, responsable QA, fechas, estado y progreso

### **2. Métricas KPI**
- **Pruebas Exitosas**: Casos que pasaron correctamente
- **Pruebas Fallidas**: Casos que fallaron
- **Pruebas Pendientes**: Casos por ejecutar
- **Pruebas Bloqueadas**: Casos bloqueados por dependencias
- **Pruebas Planificadas**: Total de casos planificados

### **3. Gráficos Interactivos**
- **Resumen de Resultados**: Distribución porcentual de resultados
- **Tendencia de Ejecución**: Progreso diario de pruebas
- **Cobertura por Módulo**: Cobertura de testing por componente

### **4. Tabla de Detalles**
- Lista completa de casos de prueba
- Filtros por estado, módulo, responsable
- Paginación configurable
- Exportación de datos

### **5. Carga de Datos**
- Botón "Cargar Archivo" en el header
- Formatos soportados: Excel (.xlsx, .xls), CSV
- Procesamiento automático y actualización de gráficos

## 📋 Formato de Datos

### **Estructura Excel Requerida**
El archivo Excel debe contener las siguientes columnas:

| Columna | Descripción | Ejemplo |
|---------|-------------|---------|
| ID | Identificador único | TC001 |
| Caso de Prueba | Nombre descriptivo | Login con credenciales válidas |
| Módulo | Componente del sistema | Autenticación |
| Responsable | Encargado de la ejecución | Juan Pérez |
| Estado | Resultado de la prueba | Exitoso/Fallido/Pendiente |
| Fecha Ejecución | Fecha de última ejecución | 01/10/2024 |
| Prioridad | Nivel de importancia | Alta/Media/Baja |
| Observaciones | Comentarios adicionales | Error en validación |

## 🎨 Personalización

### **Colores Corporativos**
Los colores están definidos en `styles.css` usando variables CSS:

```css
:root {
    --primary-color: #EC0000;     /* Rojo Santander */
    --primary-dark: #C80000;      /* Rojo más oscuro */
    --primary-light: #FF3333;     /* Rojo más claro */
    --success-color: #28a745;     /* Verde éxito */
    --warning-color: #ffc107;     /* Amarillo advertencia */
    --danger-color: #dc3545;      /* Rojo error */
}
```

### **Configuración de Gráficos**
Los gráficos se pueden personalizar en `script.js`:

```javascript
const colors = {
    success: '#10b981',
    danger: '#ef4444',
    pending: '#8b5cf6',
    primary: '#2563eb',
    warning: '#f59e0b'
};
```

## 📱 Responsive Design

El dashboard está optimizado para:
- **Desktop**: Experiencia completa con todas las funcionalidades
- **Tablet**: Layout adaptado con grillas responsivas
- **Mobile**: Interfaz compacta con navegación optimizada

### **Breakpoints**
- **Desktop**: > 768px
- **Mobile**: ≤ 768px

## 🔧 Funcionalidades Técnicas

### **Interactividad**
- **Hover effects** en tarjetas y botones
- **Gráficos expandibles** en modal
- **Filtros dinámicos** en tabla
- **Paginación** configurable

### **Rendimiento**
- **CSS optimizado** con variables y reutilización
- **JavaScript modular** para fácil mantenimiento
- **Imágenes optimizadas** y iconos vectoriales
- **Carga asíncrona** de librerías externas

## 👥 Equipo de Desarrollo

### **Contacto y Soporte**
- **Email**: arivera_scb@santander.com.pe
- **Organización**: Santander Consumer Bank
- **Departamento**: Aseguramiento de Calidad

## 📄 Licencia

© 2025 Santander Consumer Bank - Aseguramiento de Calidad. Todos los derechos reservados.

---

## 🚀 Contribuciones

Para contribuir al proyecto:

1. **Fork** el repositorio
2. **Crear** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abrir** un Pull Request

## 📚 Documentación Adicional

- `GUIA_EXCEL_MULTI_PROYECTO.md` - Guía para manejo de múltiples proyectos
- `template_dashboard_completo.md` - Template completo del dashboard
- `generador_excel_template.html` - Generador de templates Excel

---

**Desarrollado con ❤️ para el equipo QA de Santander**