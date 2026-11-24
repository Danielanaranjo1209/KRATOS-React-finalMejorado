# KRATOS React — versión preparada para sustentación

## Ejecutar el proyecto
1. Descomprime la carpeta.
2. Abre la carpeta `KRATOS-React-final` en Visual Studio Code.
3. En la terminal ejecuta `npm install`.
4. Ejecuta `npm run dev`.
5. Abre la dirección local que indique Vite.

## Acceso de demostración
- Administrador: `kratosadmin` / `Admin123`
- Usuario: `kratosuser` / `User123`

El panel de administración está protegido por rol. Inicia sesión como administrador y entra en **Administración** desde la navegación.

## Crear una actividad
En Administración:
1. Escribe nombre, nivel, duración y descripción.
2. Selecciona una imagen de referencia (PNG, JPG o WEBP).
3. Revisa la vista previa.
4. Pulsa **Guardar actividad**.

La imagen se optimiza y la actividad se guarda en `localStorage`. Las actividades personalizadas aparecen en el catálogo y en el carrusel de Inicio. Puedes eliminar las actividades personalizadas desde el mismo panel.

## Persistencia y alcance
- La sesión se conserva en `sessionStorage`.
- Las actividades creadas y sus imágenes se conservan en `localStorage` de ese navegador.
- No se requiere backend ni API externa para la demostración.
- Los datos locales no se sincronizan entre navegadores ni equipos y pueden borrarse si se limpia el almacenamiento del navegador.
- Las credenciales son de demostración académica; no deben usarse como autenticación de producción.

## Cambios visuales y funcionales
- Inicio utiliza un carrusel destacado único con avance automático cada 5 segundos, controles anterior/siguiente, indicadores y pausa/reanudación.
- Se eliminó la repetición del mismo catálogo en Inicio: las actividades no aparecen duplicadas debajo del carrusel.
- Actividades conserva el filtro por nivel y muestra una cuadrícula independiente.
- Las imágenes mantienen su proporción con `object-fit: contain` para evitar recortes de los banners ilustrados.
- Administración permite agregar actividades con imagen de referencia, vista previa, validación, optimización y almacenamiento local.
