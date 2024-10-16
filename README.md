![Header](./docs/der-logo.png)

# Reconoceme

![License](https://img.shields.io/github/license/DemocraciaEnRed/reconoceme)

Reconoceme es un proyecto que busca concientizar sobre los SRF, sobre los derechos civiles, la privacidad de las personas y la necesidad de ponerle límites al Estado en su uso. Este sistema ha demostrado tener falencias y es objeto de discusiones en todo el mundo por los riesgos que implica.

También busca, a escala local, enfatizar la importancia de que el Estado rinda cuentas del uso de estas tecnologías y la importancia de contar con un marco regulatorio para su uso.

Queremos instalar el debate público sobre estos sistemas.

## 👷‍♀️ Cómo colaborar

Las contribuciones siempre son bienvenidas. Si te interesa contribuir a este proyecto y no estás seguro de por dónde empezar, preparamos esta [guía de colaboración](https://github.com/DemocraciaEnRed/.github/blob/main/docs/CONTRIBUTING.md).

## ⚖️ Licencia

El software se encuentra licensiado bajo [GPL-v3](./LICENSE). Creemos en la importancia del código abierto para la transformación social y fomentamos que la comunidad aporte de manera activa.

---

## 🚀 Desarrollo

### Requisitos

- [Node.js](https://nodejs.org/en/download/) >= 20

### Instalación

Para instalar las dependencias del proyecto, se debe ejecutar el siguiente comando:

```bash
# Usar la versión de Node.js del proyecto, >= 20
nvm use
# Instalar dependencias
npm install
```

Para levantar el proyecto en un local server, se puede usar el Live Server de Visual Studio Code. Automaticamente, el root del proyecto apuntará a la carpeta `public`.

El proyecto utiliza SASS/SCSS, si se quieren cambiar o actualizar, se debe modificar el archivo `style-classes.scss` o `style.scss`.

Durante development se puede usar el siguiente comando para compilar los estilos en tiempo real:

```bash
npm run start
```

Para compilar los estilos para producción, se puede usar el siguiente comando:

```bash
npm run build-bulma
```
### Deploy

Para deployear cambios del proyecto, se debe ejecutar el siguiente comando:

```bash
npm run deploy
```

Este comando compilará los estilos y subirá los archivos al branch `gh-pages`.

---

⌨️ con ❤️ por [DER](https://github.com/DemocraciaEnRed/)
