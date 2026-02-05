# APP de Gestion de Inventario – Prueba Técnica

Aplicación web para la **gestión de inventario** con control de usuarios y roles (Admin / User), desarrollada como parte de una **prueba técnica**.

El sistema permite:

* Autenticación con JWT
* Gestión de productos
* Historial de productos eliminados
* Gestión de usuarios
* Control de acceso por roles

---

## Tecnologías utilizadas

### Backend

* **ASP.NET Core**
* **Entity Framework Core**
* **SQL Server**
* **JWT Authentication**
* **BCrypt** (hash de contraseñas)

### Frontend

* **React + TypeScript**
* **Vite**
* **Axios**
* **React Router**
* **Material Icons**
* **CSS personalizado**

---

## Requisitos previos

Asegúrate de tener instalado:

* **.NET SDK 8 o superior**
* **Node.js 18 o superior**
* **SQL Server**
* **Visual Studio / VS Code**

---

## Instalación del proyecto

### 1-Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/inventory-app.git
cd inventory-app
```

---

## Backend – Configuración e inicio

### 2️-Configurar la base de datos

En el archivo `appsettings.json` del proyecto **InventoryApp.Api**, configura tu cadena de conexión:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=InventoryAppDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

Configura también el JWT:

```json
"Jwt": {
  "Key": "CLAVE_SECRETA",
  "Issuer": "https://localhost:7182",
  "Audience": "http://localhost:5173",
  "ExpireMinutes": 600
}
```

---

### 3️-Ejecutar migraciones

Desde la carpeta del backend en la consola de administracion de paquetes:
Selecciona como proyecto predeterminado inventoryapp.api


```bash
dotnet ef database update
```

Esto creará la base de datos y las tablas necesarias.

---

### 4️-Ejecutar el backend

```bash
dotnet run
```

El backend quedará disponible en:

```
https://localhost:7182
```

---

## Frontend – Configuración e inicio

### 5️-Instalar dependencias

Desde la consola del administrador de paqueteS:
Selecciona como  proyecto predeterminado inventoryapp.client

```bash
npm install
```

Dependencias principales:

* react
* react-router-dom
* axios
* @mui/icons-material

---

### 6️-Ejecutar el frontend

```bash
npm run dev
```

El frontend se ejecutará en:

```
http://localhost:5173
```

---

## Credenciales iniciales

### Usuario administrador por defecto

```txt
Usuario: admin
Contraseña: admin
Rol: Admin
```

> La contraseña se valida contra el hash almacenado en la base de datos.

---

## Roles del sistema

### Admin

* Crear, editar y eliminar productos
* Ver y vaciar historial
* Crear usuarios (Admin / User)
* Acceso total al panel administrativo

### User

* Iniciar sesión
* Ver listado de productos
* Acceso restringido (solo lectura)

---

## Estructura general

```text
InventoryApp/
│
├── InventoryApp.Api/      # Backend ASP.NET Core Api
│
└── inventoryapp.client/   # Frontend React + Vite
```

--
