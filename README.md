# TareaFácil — versión inicial

Aplicación web instalable (PWA) para ayudar a organizar tareas escolares. Incluye selector de materia y nivel, cuadro para instrucciones, respuesta de demostración, botón de copiar y caché offline básica.

## Importante sobre la IA
Esta primera versión **no está conectada a una IA real**. El modo de demostración muestra una guía general, no una solución inventada. Para activar IA hay que configurar un backend seguro y un proveedor de modelos. No incluyas una clave secreta en `app.js`, HTML o archivos públicos.

## Publicar gratis desde Android
1. Descarga y descomprime `tareafacil.zip`.
2. Crea una cuenta en GitHub si deseas usar GitHub Pages, o usa un proveedor de hosting estático que admita PWA.
3. Sube todos los archivos manteniendo su estructura.
4. Activa el alojamiento HTTPS. La instalación PWA y el service worker requieren HTTPS (o localhost).
5. Abre la URL en Chrome para Android. En el menú ⋮, selecciona **Instalar aplicación** o **Añadir a pantalla de inicio**.

## Activar IA real (siguiente etapa)
- Desplegar una función backend en un servicio compatible.
- Guardar la API key en las variables de entorno secretas del servidor.
- El backend debe aceptar POST JSON `{ "subject": "...", "level": "...", "task": "..." }` y devolver `{ "answer": "..." }`.
- En `app.js`, asignar la URL HTTPS del backend a `API_ENDPOINT`.
- Añadir límites de uso, validación de entradas, protección contra abuso y una política de privacidad antes de compartir la app públicamente.

## Pruebas básicas
- Abrir `index.html` desde un servidor HTTPS.
- Probar cada selector, envío vacío, texto largo, copiar y modo offline tras la primera carga.
- Probar en Chrome Android y confirmar que se puede instalar.
