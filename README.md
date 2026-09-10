# SistemaParqueoFront
Vista y decoración del sistema.

Este proyecto web está construido utilizando **Next.js**.

## 🚀 Requisitos Previos

Asegúrate de tener instalado en tu máquina:
- [Node.js](https://nodejs.org/) (versión 18.17 o superior recomendada).
- Git.

## 🛠️ Instalación y Ejecución

Sigue estos pasos para clonar el repositorio y levantar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Farid324/SistemaParqueoFront.git
   cd SistemaParqueoFront
   ```

2. **Ingresar a la carpeta de la aplicación:**
   ```bash
   cd my-app
   ```

3. **Instalar las dependencias:**
   ```bash
   pnpm install
   ```

4. **Ejecutar el servidor de desarrollo:**
   ```bash
   pnpm dev
   ```

5. **Construir para producción (Build):**
   ```bash
   pnpm build
   ```
   Para iniciar el servidor en modo de producción una vez construido:
   ```bash
   pnpm start
   ```

6. **Ver la aplicación:**
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la página cargada.

---

## 📁 Estructura del Proyecto (`app/`)

Dentro del directorio `my-app/app/`, hemos organizado el proyecto con la siguiente estructura de carpetas para mantener un código limpio, modular y fácil de escalar:

- **`components/`**: Contiene todos los componentes visuales de React.
  - **`ui/`**: Componentes base, genéricos o de diseño (como botones, inputs, tarjetas, menús, etc.).
  - **`modals/`**: Componentes específicos para ventanas modales (cuadros de diálogo, alertas superpuestas).
- **`context/`**: Manejo del estado global de la aplicación. Aquí van los *Providers* de React Context (ej. datos del usuario logueado, carrito, etc.).
- **`hooks/`**: Custom Hooks de React. Funciones reutilizables que agrupan lógica de estado o efectos de React.
- **`services/`**: Lógica de integración y conexión con el Backend (APIs). Aquí se centralizan las peticiones HTTP (`fetch` o `axios`).
- **`types/`**: Archivos de definición de tipos e interfaces de TypeScript. Sirven para definir qué forma tendrán nuestros objetos y datos en todo el proyecto.
- **`utils/`**: Funciones auxiliares o de utilidad (helpers). Por ejemplo: funciones para dar formato a fechas, validaciones de texto, calculadoras, etc.

---

## 🐶 Husky (Git Hooks)

Este proyecto utiliza **Husky** para asegurar que el código cumpla con ciertos estándares antes de hacer commits o subir cambios al repositorio.

Dado que nuestro código principal se encuentra en la subcarpeta `my-app` pero el repositorio `.git` está en la raíz, Husky ha sido configurado para enlazar automáticamente los hooks desde el `package.json` de `my-app`.

### ¿Cómo configurarlo en tu máquina local?

Cuando clonaste el proyecto y corriste `pnpm install` dentro de `my-app`, el script `prepare` automáticamente configuró Husky en tu entorno local. Si alguna vez necesitas inicializarlo de nuevo manualmente, solo debes ejecutar:

```bash
cd my-app
pnpm run prepare
```

Esto generará/conectará la carpeta `.husky` y le indicará a Git dónde buscar los hooks (ej. pre-commit).
