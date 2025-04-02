MedCare Clinic System - Project Structure

Files:
1. index.html - Login page
2. cadastro.html - Registration page
3. agendamento.html - Appointment scheduling page
4. meus_agendamentos.html - Page for viewing scheduled appointments
5. esqueceu_senha.html - Password recovery page
6. historico.html - Medical history page
7. perfil.html - User profile page
8. styles.css - Shared CSS styles
9. script.js - JavaScript functionality

Setup Instructions:
1. Save all files in the same directory
2. Open index.html to start the application
3. Use the navigation between pages:
   - Login → Cadastro (via "Cadastre-se" link)
   - Login → Agendamento (after successful login)
   - Cadastro → Login (after registration or clicking "Cancelar")
   - Login → Esqueceu Senha (for password recovery)
   - Agendamento → Meus Agendamentos (to check scheduled appointments)
   - Meus Agendamentos → Histórico (to view medical history)
   - Any Page → Perfil (to access user profile)

Flow of the Application:
1. Users start at the login screen (index.html)
2. New users can register (cadastro.html)
3. After logging in, users are directed to the appointment page (agendamento.html)
4. Users can view their scheduled appointments (meus_agendamentos.html)
5. Users can recover their password if needed (esqueceu_senha.html)
6. Users can access their medical history (historico.html)
7. Users can update their profile information (perfil.html)

Notes for Development:
- This is a front-end only implementation
- In a real application, you would connect this to a backend system
- All data is currently handled client-side with no persistence
- Future enhancements may include database integration and authentication system

