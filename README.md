### 📌 Nome do Projeto  
API de Gerenciamento de Equipes e Tarefas  

### 📖 Descrição  
Esta é uma API REST para gerenciar equipes, tarefas e membros de equipe. Permite autenticação de usuários, criação e gerenciamento de times, atribuição de tarefas e controle de membros dentro das equipes.  

### 🚀 Tecnologias Utilizadas  
- Node.js  
- Express.js  
- Banco de Dados: PostgreSQL
- JWT para autenticação
- ZOD
- Docker

### 📂 Estrutura do Banco de Dados  
A API utiliza um banco de dados relacional e contém as seguintes tabelas:  
- **users**: Armazena os usuários cadastrados na API.  
- **teams**: Contém os times criados.  
- **tasks**: Registra as tarefas atribuídas a cada time.  
- **team_members**: Relaciona os membros aos times.  

### ⚙️ Funcionalidades  
✅ Autenticação de usuários via JWT  
✅ Criação e gerenciamento de times  
✅ Gerenciamento de tarefas (Criar, Atualizar, Deletar)  
✅ Atribuição de membros a equipes  

### 👥 Roles e Permissões  
A API possui dois tipos de usuários:  
- **Admin**: Pode criar times, criar tarefas e visualizar todas as tarefas.  
- **Member**: Pode visualizar e atualizar apenas suas próprias tarefas.  

### 🛠️ Como Rodar o Projeto  

1. Instale as dependências:  
   ```bash
   npm install
   ```
2. Configure as variáveis de ambiente no arquivo `.env`:  
   ```
   DATABASE_URL=seu_banco_de_dados
   JWT_SECRET=sua_chave_secreta
   ```
3. Execute o servidor:  
   ```bash
   npm start
   ```

### 📌 Endpoints Principais  
| Método | Rota                 | Descrição |
|--------|----------------------|-----------|
| POST   | `/session`          | Autentica um usuário e retorna um token JWT |
| POST   | `/users`            | Cria um novo usuário |
| POST   | `/teams`            | Cria uma nova equipe |
| GET    | `/tasks`            | Lista todas as tarefas |
| POST   | `/tasks`            | Cria uma nova tarefa |
| GET    | `/tasks/:id`        | Retorna detalhes de uma tarefa |
| PUT    | `/tasks/:id`        | Atualiza informações de uma tarefa |
| PATCH    | `/team-members/:id`     | Lista todos os membros das equipes |
| POST   | `/team-members`     | Adiciona um membro a uma equipe |
| DELETE | `/team-members/:id` | Remove um membro da equipe |

### 📜 Licença  
Este projeto está sob a licença MIT.

