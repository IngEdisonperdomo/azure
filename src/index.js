require("dotenv").config();

const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

async function probarKeyVault() {
  const vaultName = process.env.AZURE_KEYVAULT_NAME;

  if (!vaultName) {
    console.error("Falta configurar AZURE_KEYVAULT_NAME en el archivo .env.");
    process.exitCode = 1;
    return;
  }

  const url = `https://${vaultName}.vault.azure.net`;

  console.log(`Intentando conectar a: ${url}`);

  try {
    const credential = new DefaultAzureCredential();
    const client = new SecretClient(url, credential);

    let cantidadSecretos = 0;
    for await (const propiedades of client.listPropertiesOfSecrets()) {
      if (!propiedades.name) {
        continue;
      }

      const secreto = await client.getSecret(propiedades.name);
      console.log(
        JSON.stringify({
          nombre: propiedades.name,
          valor: secreto.value ?? null,
        }),
      );
      cantidadSecretos += 1;
    }

    if (cantidadSecretos === 0) {
      console.log("Conexión exitosa. No se encontraron secretos en el Key Vault.");
      return;
    }

    console.log(`Conexión exitosa. Se registraron ${cantidadSecretos} secretos.`);
  } catch (error) {
    console.error("Error al conectar con Key Vault o al leer sus secretos:");
    console.error(error.message || error);
    process.exitCode = 1;
  }
}

probarKeyVault();
