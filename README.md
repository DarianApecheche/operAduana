# OperAduana – Gestión de Planes Anuales y Mensuales  
**Aduana General de la República de Cuba – Matanzas**

Aplicación web full-stack que automatiza la creación, seguimiento y generación de informes de los planes anuales y mensuales.  

## Vista Previa


<img width="506" height="412" alt="imagen" src="https://github.com/user-attachments/assets/729ac838-6100-41b4-abb1-97657c239a44" />


<img width="1877" height="807" alt="Jefe Departamento vista" src="https://github.com/user-attachments/assets/0c098212-048e-4d86-9f46-0fe7f8ac13d4" />

<img width="1069" height="935" alt="Crear Actividad 1" src="https://github.com/user-attachments/assets/4687559f-2ec0-4d0c-a7fc-d5526cb4a3d3" />




### 🛠 Stack tecnológico
| Capa       | Tecnologías                          |
|------------|--------------------------------------|
| Frontend   | Angular 18, PrimeNG, TailwindCSS |
| Backend    | NestJS, TypeScript, Prisma, PostgreSQL       |
| Deploy     | Docker |
| Otros      | Git, GitHub, Postman |

### ✅ Características principales
- Creación y edición de planes anuales/mensuales con metodología ágil
- Asignación automática de actividades y responsables
- Generación de informes personalizados (Excel) en un clic
- Roles y permisos por usuario

### 📊 Impacto real conseguido
- Tiempo de elaboración de reportes: de 2 horas → 15 minutos
- Productividad del departamento: aumento del **30 %** (2024)
- Cumplimiento de metas mensuales: pasó del 68 % al 98 %

### 🏃‍♂️ Cómo ejecutarlo localmente (en menos de 5 minutos)

```bash
# 1. Clonar el repositorio
git clone https://github.com/DarianApecheche/operaduana.git
cd operaduana

# 2. Backend
cd backend
cp .env.example .env          # ← edita la URL de tu PostgreSQL
npm install
npm run start:dev

# 3. Frontend (otra terminal)
cd ../frontend
cp .env.example .env
npm install
npm start                     # → abre http://localhost:4200
