# KRATOS — verificación de requisitos de la actividad

## Funcionalidades incorporadas o presentes en el proyecto

| Requisito | Implementación |
|---|---|
| Organización de carpetas, componentes y navegación | React + React Router; páginas y componentes en `src/pages` y `src/components`. |
| Diseño adaptable y animaciones | Tema oscuro con acento verde, estilos responsive y transiciones; carrusel destacado animado. |
| Modal, Tabs, Acordeón, Dropdown y Toast | Página `Componentes.jsx` con demostraciones funcionales. |
| Selección, validación, carga y vista previa de imagen | Formulario de Administración; acepta imagen, valida tipo/tamaño, optimiza y muestra preview. |
| Login | Usuarios de demostración definidos en `AuthContext.jsx`. |
| Roles y protección de vistas | `RutaProtegida.jsx`; `/admin` restringido al rol administrador. |
| Persistencia local | Sesión en `sessionStorage`; actividades personalizadas en `localStorage`. |
| Pruebas | Revisar manualmente los casos del checklist de sustentación. |
| Despliegue | Proyecto preparado para Vercel; publicar el repositorio y conectar Vercel como paso final. |

## Pruebas manuales sugeridas
- Abrir Inicio y confirmar que el carrusel avanza automáticamente cada 5 segundos.
- Usar anterior/siguiente, puntos y pausa/reanudación.
- Confirmar que Inicio no repite las mismas tarjetas debajo del carrusel.
- Entrar a Actividades y probar cada nivel del filtro.
- Iniciar sesión como usuario y confirmar que no puede entrar a Administración.
- Iniciar sesión como administrador y crear una actividad con imagen.
- Confirmar que la nueva actividad aparece en Inicio y Actividades.
- Recargar la página y comprobar que la actividad persiste.
- Eliminar la actividad personalizada y confirmar que desaparece.
- Probar Modal, Tabs, Acordeón, Dropdown y Toast en Componentes.

## Nota
La aplicación funciona con almacenamiento local y credenciales de demostración; no es una solución de autenticación de producción ni sincroniza datos entre dispositivos.
