# 📱 Mini App Flutter + Node.js

## Estructura del proyecto

```
proyecto/
├── flutter_app/          ← Código Flutter
│   ├── pubspec.yaml
│   └── lib/
│       ├── main.dart
│       ├── screens/
│       │   ├── login_screen.dart
│       │   └── home_screen.dart
│       └── services/
│           └── auth_service.dart
│
└── backend/              ← Servidor Node.js
    ├── package.json
    └── server.js
```

---

## 🚀 1. Configurar el Backend (Node.js)

```bash
cd backend
npm install
npm start
```

El servidor corre en `http://localhost:3000`

**Usuarios de prueba:**
- `admin@demo.com` / `123456`
- `user@demo.com` / `123456`

---

## 📱 2. Configurar Flutter

### Prerrequisitos
- Flutter SDK instalado ([flutter.dev](https://flutter.dev))
- Android Studio + Android SDK
- JDK 17+

### Instalar dependencias
```bash
cd flutter_app
flutter pub get
```

### ⚙️ Configurar la URL del backend

Edita `lib/services/auth_service.dart`:

```dart
// Para emulador Android (localhost del PC):
static const String baseUrl = 'http://10.0.2.2:3000';

// Para dispositivo físico (usa la IP de tu PC en la red local):
static const String baseUrl = 'http://192.168.1.X:3000';

// Para producción:
static const String baseUrl = 'https://tu-dominio.com';
```

---

## 🏗️ 3. Compilar APK

### APK de debug (más rápido, para pruebas):
```bash
cd flutter_app
flutter build apk --debug
```

### APK de release (para distribución):
```bash
flutter build apk --release
```

### APK por arquitectura (más ligero):
```bash
flutter build apk --split-per-abi
```

**El APK queda en:**
```
flutter_app/build/app/outputs/flutter-apk/app-release.apk
```

---

## 📡 Red en Android físico

Si usas un dispositivo físico, asegúrate de:
1. Estar en la misma red WiFi que tu PC
2. Usar la IP local de tu PC: `http://192.168.X.X:3000`
3. Agregar permiso de internet en `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

---

## 🗂️ Funcionalidades incluidas

- ✅ Login con email y contraseña
- ✅ Token JWT guardado localmente
- ✅ Persistencia de sesión (al reiniciar la app)
- ✅ Home con navegación bottom bar
- ✅ Perfil de usuario
- ✅ Cerrar sesión con confirmación
- ✅ Manejo de errores de red
