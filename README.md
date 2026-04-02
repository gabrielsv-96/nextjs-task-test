# nextjs-task-test
Projeto criado em *Next.JS 15* junto do *tRPC 10* com o objetivo de cadastrar pequenas tarefas, persistindo os dados na memória enquanto faz comunicação tipada entre cliente e servidor, contando com listagem pré carregada em servidor via SSR e possibilidade de edição e exclusão de tarefas.

## Execução do Projeto
### Instalação de pré-requisitos:

[Node.js](https://nodejs.org/pt-br/download)

[Git](https://git-scm.com/install/)

### Clonagem do projeto:
Insira o seguinte comando no terminal:
```
git clone https://github.com/gabrielsv-96/nextjs-task-test.git
```

### Instalação das dependências do projeto:
Navegue até o diretório do projeto:
```
cd [diretório-do-projeto]
```
Faça a instalação das dependências do projeto:
```
npm install
```

### Execute o projeto em modo desenvolvimento:
No terminal, enquanto no diretório do projeto, insira:
```
npm run dev
```
Ao receber a mensagem *Ready* no terminal, já é possível acessar o projeto através da seguinte URL:

[*localhost:3000*](http://localhost:3000)

## Arquitetura e Estrutura
### Objetivo
O projeto foi concebido em uma interface simples para a criação e gerenciamento de tarefas curtas, garantindo a validação de dados, persistência em memória e integração do *Next.JS* com *tRPC*.

### Stack
| Tecnologia  | Versão | Responsabilidade |
| ------------- |:-------------:|:-------------:|
| *Next.JS* | 15 | Framework React com AppRouter e SSR|
| *tRPC* | 18 | API tipada sem geração de código |  
| *Bootstrap* | 5 | Framework para estilização responsiva |
| *Zod* | v3 | Validações e inferências de tipos |

### Diretórios
```
src/
    app/
        layout.tsx              -> Layout com providers na raíz do projeto
        page.tsx                -> Índice do projeto e também a listagem de tarefas carregadas em SSR
        new-task/
            page.tsx            -> Página de criação de tarefa
        update-task/
            page.tsx            -> Página de edição de tarefa
        api/
            trpc/
                [trpc]/
                    route.ts    -> Handler HTTP do tRPC
        components/
            task.form.tsx       -> Formulário compartilhado para criação/edição de tarefa
            task.table.tsx      -> Tabela de listagem de tarefas
        providers/
            trpc.tsx            -> Provider do tRPC + React
            bootstrap.tsx       -> Carregamento do JS do Boostrap
        server/
            schema.ts           -> Schema zod da tarefa
            task.router.ts      -> Router e procedutes do tRPC
        utils/
            trpc.ts             -> Cliente tipado do tRPC
```
### Entidade Tarefa
| Propriedade  | Descrição |
| ------------- |:-------------:|
| id      | Identificador numérico gerado automáticamente     |
| titulo      | Título da tarefa e campo obrigatório suportando até 50 caractéres     |
| descricao      | Descrição detalhada da tarefa e campo opcional suportando até 300 caractéres     |
| dataCriacao      | Data e hora da criação da tarefa, gerada automaticamente no formato ISO 8601     |

### Procedures
| Procedure  | Tipo | Comportamento |
| ------------- |:-------------:|:-------------:|
| *list* | *query* | Retorna a listagem de todas as tarefas |
| *create* | *mutation* | Cria uma nova tarefa auto-incrementando o id e gerando dataCriacao |  
| *update* | *mutation* | Atualiza uma tarefa existente preservando o id e dataCriacao originais |
| *delete* | *mutation* | Remove tarefa existente |
