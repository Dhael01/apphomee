# 🏠 Nuestro Hogar

App de gestión del hogar compartido: cuentas, despensa, ahorros, quehaceres y más.  
Funciona en **Windows, macOS, Linux** (escritorio) y **Android** (móvil).

---

## Descargar e instalar

### Desde la pestaña Releases de GitHub

1. Ve a **Releases** (panel derecho en GitHub, o `github.com/TU_USUARIO/TU_REPO/releases`).
2. Expande la release más reciente y descarga el archivo para tu sistema:

| Sistema | Archivo a descargar |
|---|---|
| Windows | `Nuestro.Hogar_x.x.x_x64-setup.exe` o `.msi` |
| macOS | `Nuestro.Hogar_x.x.x_x64.dmg` |
| Linux | `nuestro-hogar_x.x.x_amd64.AppImage` |
| Android | `nuestro-hogar-android-debug.apk` |

---

## ⚠️ Advertencias de seguridad (instaladores sin firma)

Los instaladores son funcionales pero **no tienen firma de código de pago**. Cada sistema operativo mostrará una advertencia. Aquí cómo pasarla:

### Windows — "Windows protegió su equipo"
1. Haz clic en **"Más información"**.
2. Haz clic en **"Ejecutar de todas formas"**.
3. Completa la instalación normalmente.

> El instalador `.msi` es preferible al `.exe` en Windows si ves problemas.

### macOS — "no se puede abrir porque proviene de un desarrollador no identificado"
1. **No hagas doble clic** directamente sobre el `.dmg` o la app.
2. Haz **clic derecho** (o Control + clic) sobre el archivo → **Abrir**.
3. Haz clic en **Abrir** en el diálogo de confirmación.
4. Solo necesitas hacer esto la primera vez.

> Alternativa: en Preferencias del Sistema → Privacidad y seguridad → al final de la sección aparece un botón "Abrir igualmente".

### Linux — AppImage
```bash
chmod +x nuestro-hogar_*.AppImage
./nuestro-hogar_*.AppImage
```

### Android — APK fuera de Play Store
1. En tu teléfono, ve a **Ajustes → Seguridad** (o Aplicaciones → Instalar apps desconocidas).
2. Activa **"Instalar aplicaciones de fuentes desconocidas"** para tu navegador o administrador de archivos.
3. Abre el archivo `.apk` descargado y toca **Instalar**.
4. Puedes volver a desactivar la opción después de instalar.

> En Android 8+ la opción es por app: habilítala para el navegador con el que descargaste el APK.

---

## Qué se necesita para firmar de verdad (más adelante)

| Plataforma | Requisito | Costo aproximado |
|---|---|---|
| Windows | Certificado EV Code Signing (DigiCert, Sectigo…) | ~$300–500 USD/año |
| macOS | Cuenta Apple Developer + notarización | $99 USD/año |
| iOS | Misma cuenta Apple Developer (incluida) | incluido con macOS |
| Android (Play Store) | Cuenta Google Play Developer | $25 USD pago único |

Con esas credenciales, los sistemas operativos mostrarán el nombre del publicador en lugar de la advertencia, y la app puede publicarse en tiendas oficiales.

---

## Requisitos para usar la app

- **Siempre necesita internet**: la app se conecta a Supabase para sincronizar el hogar en tiempo real. No hay modo offline.
- **Supabase**: necesitas una cuenta gratuita en [supabase.com](https://supabase.com) con una tabla `hogares` creada.
- **Código de hogar**: todos los miembros de la familia usan el mismo código para compartir los datos.

---

## Estructura del proyecto

```
proyectoApphome/
├── www/                  # ← ÚNICA fuente de verdad del frontend
│   └── index.html        #   Tauri y Capacitor apuntan aquí
├── src-tauri/            # Configuración de Tauri (escritorio)
│   ├── tauri.conf.json
│   ├── Cargo.toml
│   ├── icons/
│   └── src/
├── android/              # Proyecto Android (generado por Capacitor)
├── ios/                  # Proyecto iOS (listo, sin compilar aún)
├── capacitor.config.json # Configuración de Capacitor
├── package.json
├── scripts/
│   └── generate-icons.mjs
└── .github/
    └── workflows/
        └── build.yml     # CI/CD automático
```

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Generar íconos (requiere sharp)
npm run icons

# Sincronizar Capacitor con el www/ actual
npm run cap:sync

# Abrir Android Studio (requiere Android Studio instalado)
npm run cap:android
```

Para **escritorio con Tauri**, necesitas Rust instalado:
```bash
# Instalar Rust (una sola vez)
# https://rustup.rs/

cargo install tauri-cli --version "^2.0"
cargo tauri dev
```
