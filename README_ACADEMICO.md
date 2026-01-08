
# Proyecto Académico: CRUD Clientes con Auditoría (PostgreSQL + Next.js)

Este proyecto cumple con los requerimientos técnicos de manejo de base de datos local y demostración de eventos.

## 1. Conexión a Base de Datos
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido, reemplazando tus credenciales:

```env
DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/gmail?schema=public"
```

## 2. Modelos Mapeados (Prisma)
Se ha configurado `schema.prisma` para conectarse a las tablas existentes sin destruirlas:
- Tabla: `clientes` (Mapeada al modelo `Cliente`)
- Tabla: `auditoria_cambios` (Mapeada al modelo `AuditoriaCambio`)

Para sincronizar Prisma con tu DB actual:
```bash
npx prisma generate
```

## 3. Demostración de los 20 Eventos
Se ha integrado una "Consola de Logs" visual a la derecha de la pantalla. Cada vez que interactúes con la aplicación, verás qué evento de React se disparó.

### Lista de eventos implementados:
1.  **onClick**: Al hacer clic en botones de edición, borrado o nuevo.
2.  **onMouseEnter**: Al pasar el mouse sobre el botón "Nuevo Cliente".
3.  **onMouseLeave**: Al retirar el mouse del botón "Nuevo Cliente".
4.  **onDoubleClick**: Al hacer doble clic en una fila de la tabla para editar.
5.  **onChange**: Al escribir en el buscador de la tabla.
6.  **onInput**: Al escribir en los campos del formulario (Nombre).
7.  **onFocus**: Al entrar en el campo de búsqueda.
8.  **onBlur**: Al salir del campo de búsqueda.
9.  **onKeyDown**: Al presionar una tecla en el buscador.
10. **onKeyUp**: Al soltar una tecla en el buscador.
11. **onSubmit**: Al enviar el formulario de cliente.
12. **onReset**: Al cancelar o limpiar el formulario.
13. **onCopy**: Al copiar texto en la zona de demo.
14. **onCut**: Al cortar texto en la zona de demo.
15. **onPaste**: Al pegar texto en la zona de demo.
16. **onSelect**: Al seleccionar texto dentro del área de demo.
17. **onScroll**: Al hacer scroll dentro de la consola de logs.
18. **onWheel**: Al usar la rueda del ratón sobre la consola de logs.
19. **onContextMenu**: Al hacer clic derecho sobre el indicador de información.
20. **onPointerDown**: Al hacer clic primario sobre cualquier fila de la tabla.
21. **onInvalid**: Al intentar enviar el formulario con campos requeridos vacíos.

## 4. Lógica de Auditoría
Dentro del componente, se simula la inserción en la tabla `auditoria_cambios` cada vez que se detecta una operación de edición (`Auditoría: Registro actualizado...`).
