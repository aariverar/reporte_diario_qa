# Santander QA Dashboard - GitHub Pages

Este directorio contiene la configuración para el despliegue automático del Dashboard QA de Santander usando GitHub Actions.

## 🚀 Deployment Automático

El archivo `deploy.yml` configurará automáticamente:

### 📋 **Proceso de Build**
1. **Checkout** del código fuente
2. **Configuración** de Node.js para herramientas adicionales
3. **Creación** de configuración para GitHub Pages
4. **Ajuste** de rutas si es necesario
5. **Construcción** del sitio estático
6. **Upload** del artefacto

### 🌐 **Deployment**
1. **Configuración** del entorno GitHub Pages
2. **Despliegue** automático del sitio
3. **Notificación** de URL disponible

## 🔧 Configuración

### **Triggers del Workflow**
- ✅ Push a la rama `main`
- ✅ Pull requests a `main`
- ✅ Ejecución manual desde Actions

### **Permisos Configurados**
- ✅ `contents: read` - Leer contenido del repositorio
- ✅ `pages: write` - Escribir en GitHub Pages
- ✅ `id-token: write` - Tokens de identidad

### **URL del Sitio**
Una vez desplegado, el dashboard estará disponible en:
```
https://aariverar.github.io/reporte_diario_qa/
```

## 📁 Archivos Incluidos

El deployment incluirá automáticamente:
- `index.html` - Página principal
- `styles.css` - Estilos CSS
- `script.js` - Lógica JavaScript
- `README.md` - Documentación
- `*.xlsx` - Archivos de datos Excel
- `*.html` - Archivos HTML adicionales
- `*.md` - Archivos Markdown adicionales

## 🛠️ Mantenimiento

### **Activación Manual**
1. Ir a la pestaña **Actions** en GitHub
2. Seleccionar **Deploy QA Dashboard to GitHub Pages**
3. Hacer clic en **Run workflow**

### **Verificación de Status**
- ✅ **Badge de status**: Se puede agregar al README principal
- ✅ **Logs detallados**: Disponibles en la pestaña Actions
- ✅ **URL de resultado**: Se muestra al completar el deployment

## 🔍 Troubleshooting

### **Errores Comunes**
1. **Permisos**: Verificar que GitHub Pages esté habilitado
2. **Rutas**: Asegurar que no hay rutas absolutas problemáticas
3. **Archivos**: Confirmar que todos los assets están incluidos

### **Configuración GitHub Pages**
1. Ir a **Settings** > **Pages**
2. Seleccionar **Source**: GitHub Actions
3. Guardar configuración

---

**Configurado para Santander Consumer Bank - Equipo QA**