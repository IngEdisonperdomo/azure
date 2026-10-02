# Prueba de Azure Key Vault

Proyecto pequeño para verificar el acceso y leer los secretos de Azure Key Vault.

## Requisitos

- Node.js 18 o posterior.
- Una aplicación de Microsoft Entra ID con acceso de lectura a los secretos del Key Vault. Con RBAC, asigna el rol `Key Vault Secrets User`.

## Configuración

```powershell
Copy-Item .env.example .env
npm install
```

Edita `.env` y reemplaza los valores de ejemplo de `AZURE_TENANT_ID`, `AZURE_CLIENT_ID` y `AZURE_CLIENT_SECRET` por las credenciales de tu aplicación. No compartas ni subas `.env` al repositorio.

## Ejecutar

```powershell
npm start
```

El programa enumera los secretos del Key Vault y registra cada nombre junto con su valor en la terminal. Los valores son credenciales sensibles: evita guardar, compartir o enviar estos logs a sistemas a los que no deban tener acceso.
