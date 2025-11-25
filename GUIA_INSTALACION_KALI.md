# Guía de Instalación - Orlando Cyber Seguridad
## Instalación Paso a Paso en Kali Linux

Esta guía te llevará a través de cada comando necesario para replicar el proyecto **Orlando Cyber Seguridad** en tu terminal de Kali Linux.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener:

- **Kali Linux** actualizado
- **Conexión a Internet** estable
- **Permisos de sudo** en tu sistema
- Al menos **2 GB de espacio libre** en disco

---

## Paso 1: Actualizar el Sistema

Primero, actualiza los repositorios y paquetes del sistema:

```bash
sudo apt update && sudo apt upgrade -y
```

**¿Qué hace este comando?**
- `apt update`: Actualiza la lista de paquetes disponibles
- `apt upgrade -y`: Actualiza todos los paquetes instalados (el `-y` confirma automáticamente)

---

## Paso 2: Instalar Node.js y npm

El proyecto requiere Node.js versión 18 o superior. Instalaremos la versión LTS:

```bash
# Instalar curl si no lo tienes
sudo apt install curl -y

# Descargar e instalar Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y

# Verificar la instalación
node --version
npm --version
```

**Salida esperada:**
```
v20.x.x
10.x.x
```

---

## Paso 3: Instalar pnpm (Gestor de Paquetes)

El proyecto utiliza `pnpm` en lugar de `npm` por su eficiencia:

```bash
# Instalar pnpm globalmente
npm install -g pnpm

# Verificar instalación
pnpm --version
```

**Salida esperada:**
```
9.x.x
```

---

## Paso 4: Instalar Git

Git es necesario para clonar el repositorio:

```bash
sudo apt install git -y

# Verificar instalación
git --version
```

---

## Paso 5: Clonar el Proyecto

Ahora descarga el proyecto desde el repositorio:

```bash
# Navegar al directorio donde quieres el proyecto
cd ~

# Crear directorio para proyectos (opcional)
mkdir -p ~/proyectos
cd ~/proyectos

# Clonar el repositorio
# (Reemplaza la URL con la URL real de tu repositorio)
git clone https://github.com/tu-usuario/orlandocyverseguridad.git

# Entrar al directorio del proyecto
cd orlandocyverseguridad
```

---

## Paso 6: Instalar Dependencias del Proyecto

Instala todas las dependencias necesarias:

```bash
pnpm install
```

**Este proceso puede tardar 2-5 minutos.** Verás una barra de progreso mientras se descargan los paquetes.

---

## Paso 7: Configurar Variables de Entorno

El proyecto necesita variables de entorno para funcionar. Crea un archivo `.env`:

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar el archivo con nano
nano .env
```

**Contenido mínimo del archivo `.env`:**

```env
# Base de datos
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/orlandocyber"

# JWT Secret (genera uno aleatorio)
JWT_SECRET="tu-secreto-super-seguro-aqui"

# OAuth (si usas Manus Auth)
VITE_APP_ID="tu-app-id"
OAUTH_SERVER_URL="https://api.manus.im"
VITE_OAUTH_PORTAL_URL="https://auth.manus.im"

# Información del propietario
OWNER_OPEN_ID="tu-open-id"
OWNER_NAME="Tu Nombre"

# Título de la aplicación
VITE_APP_TITLE="Orlando Cyber Seguridad"
VITE_APP_LOGO="/logo.png"
```

**Guardar y salir:**
- Presiona `Ctrl + O` para guardar
- Presiona `Enter` para confirmar
- Presiona `Ctrl + X` para salir

---

## Paso 8: Instalar y Configurar MySQL/MariaDB

El proyecto requiere una base de datos MySQL:

```bash
# Instalar MariaDB (compatible con MySQL)
sudo apt install mariadb-server mariadb-client -y

# Iniciar el servicio
sudo systemctl start mariadb
sudo systemctl enable mariadb

# Configuración segura (opcional pero recomendado)
sudo mysql_secure_installation
```

**Durante `mysql_secure_installation`:**
- Presiona `Enter` para la contraseña root actual (vacía por defecto)
- Escribe `Y` para establecer una contraseña root
- Ingresa una contraseña segura
- Responde `Y` a todas las demás preguntas

---

## Paso 9: Crear la Base de Datos

Crea la base de datos para el proyecto:

```bash
# Conectar a MySQL
sudo mysql -u root -p

# Dentro de MySQL, ejecuta estos comandos:
CREATE DATABASE orlandocyber CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'orlandouser'@'localhost' IDENTIFIED BY 'tu-contraseña-segura';
GRANT ALL PRIVILEGES ON orlandocyber.* TO 'orlandouser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

**Actualiza tu archivo `.env`** con las credenciales:

```bash
nano .env
```

Cambia la línea `DATABASE_URL`:

```env
DATABASE_URL="mysql://orlandouser:tu-contraseña-segura@localhost:3306/orlandocyber"
```

---

## Paso 10: Ejecutar Migraciones de Base de Datos

Crea las tablas necesarias en la base de datos:

```bash
pnpm db:push
```

**Salida esperada:**
```
✓ Migrations applied successfully
```

---

## Paso 11: Iniciar el Servidor de Desarrollo

Ahora puedes iniciar la aplicación:

```bash
pnpm dev
```

**Salida esperada:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

---

## Paso 12: Acceder a la Aplicación

Abre tu navegador y visita:

```
http://localhost:3000
```

Deberías ver la página de inicio de **Orlando Cyber Seguridad** con:
- Interfaz futurista cyber/neon
- Animaciones de partículas
- Efectos glow en los títulos
- Navegación funcional

---

## Comandos Útiles

### Detener el servidor
Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

### Compilar para producción
```bash
pnpm build
```

### Previsualizar la versión de producción
```bash
pnpm preview
```

### Ejecutar tests
```bash
pnpm test
```

### Ver logs de la base de datos
```bash
pnpm db:studio
```

### Limpiar caché y reinstalar dependencias
```bash
rm -rf node_modules .pnpm-store
pnpm install
```

---

## Solución de Problemas Comunes

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules
pnpm install
```

### Error: "Port 3000 already in use"
```bash
# Encontrar el proceso usando el puerto
sudo lsof -i :3000

# Matar el proceso (reemplaza PID con el número mostrado)
kill -9 PID

# O usar un puerto diferente
pnpm dev --port 3001
```

### Error de conexión a la base de datos
```bash
# Verificar que MySQL esté corriendo
sudo systemctl status mariadb

# Si no está corriendo, iniciarlo
sudo systemctl start mariadb

# Verificar credenciales en .env
cat .env | grep DATABASE_URL
```

### Error: "Permission denied"
```bash
# Dar permisos al directorio del proyecto
sudo chown -R $USER:$USER ~/proyectos/orlandocyverseguridad
```

---

## Estructura del Proyecto

```
orlandocyverseguridad/
├── client/                 # Frontend React
│   ├── public/            # Archivos estáticos
│   │   └── images/        # Imágenes del proyecto
│   └── src/
│       ├── pages/         # Páginas de la aplicación
│       │   ├── Home.tsx          # Página de inicio
│       │   ├── Gallery.tsx       # Galería de archivos
│       │   ├── Upload.tsx        # Subida de archivos
│       │   └── Reportaje.tsx     # Reportaje de microprocesadores
│       ├── components/    # Componentes reutilizables
│       ├── lib/          # Utilidades y configuración
│       └── index.css     # Estilos globales (tema cyber)
├── server/                # Backend Express + tRPC
│   ├── routers.ts        # Rutas de la API
│   ├── db.ts             # Funciones de base de datos
│   └── _core/            # Configuración del servidor
├── drizzle/              # Esquema de base de datos
│   └── schema.ts         # Definición de tablas
├── shared/               # Código compartido
├── package.json          # Dependencias del proyecto
└── .env                  # Variables de entorno (crear manualmente)
```

---

## Características Implementadas

✅ **Interfaz Futurista**
- Tema cyber/neon con colores vibrantes
- Animaciones de partículas flotantes
- Efectos glow y scanlines
- Gradientes animados

✅ **Sistema de Archivos**
- Subida de imágenes, videos y documentos
- Drag & drop para subir archivos
- Galería con filtros por tipo
- Búsqueda de archivos
- Sistema de likes y comentarios

✅ **Autenticación**
- Login con Manus OAuth
- Perfiles de usuario
- Control de acceso a funciones

✅ **Reportaje de Microprocesadores**
- Análisis completo de AMD vs Intel 2025
- Top 5 procesadores para gaming
- Guías de compra
- Imágenes y especificaciones técnicas

✅ **Base de Datos**
- MySQL/MariaDB
- Tablas: users, files, comments, fileLikes
- Migraciones con Drizzle ORM

---

## Próximos Pasos

Una vez que tengas el proyecto corriendo, puedes:

1. **Personalizar el diseño**: Edita `client/src/index.css` para cambiar colores
2. **Agregar más reportajes**: Crea nuevas páginas en `client/src/pages/`
3. **Subir archivos de prueba**: Usa la función "Subir Archivo" para probar la galería
4. **Modificar la base de datos**: Edita `drizzle/schema.ts` y ejecuta `pnpm db:push`

---

## Despliegue en Producción

Para desplegar la aplicación en un servidor real:

```bash
# 1. Compilar el proyecto
pnpm build

# 2. El resultado estará en dist/
# 3. Usa un servidor web como Nginx o Apache
# 4. Configura variables de entorno en el servidor
# 5. Usa PM2 para mantener el servidor corriendo

# Instalar PM2
npm install -g pm2

# Iniciar con PM2
pm2 start dist/server/index.js --name orlandocyber

# Guardar configuración
pm2 save
pm2 startup
```

---

## Soporte y Recursos

- **Documentación de React**: https://react.dev
- **Documentación de tRPC**: https://trpc.io
- **Documentación de Drizzle ORM**: https://orm.drizzle.team
- **Tailwind CSS**: https://tailwindcss.com

---

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

**¡Disfruta construyendo con Orlando Cyber Seguridad!** 🚀🔐
