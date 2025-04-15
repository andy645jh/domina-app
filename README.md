
# Microfrontends: Host, Listado y Pagination

Este proyecto está compuesto por tres aplicaciones independientes:

- `host`: Aplicación principal que consume los microfrontends se ejecuta en el puerto **3000**.
- `listado`: Microfrontend que se ejecuta en el puerto **3001**.
- `pagination`: Microfrontend que se ejecuta en el puerto **3002**.

---

## 🚀 Instalación y ejecución

### 📁 Aplicación `listado`

    cd listado
    npm install
    npm run start-mf

ℹ️ Asegurate de que el puerto **3001** esté disponible antes de iniciar.

----------

### 📁 Aplicación `pagination`


	cd pagination
	npm install
	npm run start-mf

ℹ️ Asegurate de que el puerto **3002** esté disponible antes de iniciar.

----------

### 📁 Aplicación `host`

	cd host
	npm install
	npm run dev

🔗 Una vez iniciado, puded acceder al `host` en: [http://localhost:3000](http://localhost:3000)

----------

## 🧩 Notas adicionales

-   Cada microfrontend (`listado` y `pagination`) puede ejecutarse de forma independiente.

-   El `host` integra ambos microfrontends mediante **Module Federation**.
