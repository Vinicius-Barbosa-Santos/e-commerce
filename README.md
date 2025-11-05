# E-commerce (Treinando React Query)

Projeto construído para treinar conceitos práticos de React Query em um fluxo de e-commerce: listagem de produtos, carrinho, atualização de quantidade e remoção de itens. O foco está em queries e mutations, gerenciamento de cache e invalidação.

## Objetivos
- Exercitar consultas de dados com `useQuery` (produtos e carrinho).
- Exercitar mutations com `useMutation` (adicionar, atualizar e remover itens).
- Atualizar o cache com `setQueryData` e controlar refetch com `invalidateQueries`.
- Implementar lógica de negócio no client (incremento de quantidade ao adicionar item já existente).

## Tecnologias
- React 19 + TypeScript + Vite
- React Query (`@tanstack/react-query` v5)
- Axios para requisições HTTP
- React Router para navegação
- Tailwind CSS para estilização e responsividade
- Json Server (API fake) servindo `data/db.json`
- Lucide Icons e Sonner (toasts)

## Como rodar
1. Instale dependências:
   - `npm install`
2. Inicie a API fake (porta 8080):
   - `npm run server`
3. Inicie o app em modo dev:
   - `npm run dev`
4. Acesse no navegador:
   - `http://localhost:5173/`

## API (json-server)
- `GET /products` → lista de produtos (`ProductResponse[]`)
- `GET /cart` → itens do carrinho (`CartResponse[]`)
- `POST /cart` → adiciona um item
- `PATCH /cart/:id` → atualiza um item (ex.: `quantity`)
- `DELETE /cart/:id` → remove um item

Tipos principais
```
// src/types/ProductResponse.ts
interface ProductResponse {
  id: number;
  name: string;
  price: number;
  image: string;
}

// src/types/CartResponse.ts
interface CartResponse {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
```

## Fluxo de dados (React Query)
- Queries:
  - `useGetProducts` → busca produtos.
  - `useGetCart` → busca carrinho.
- Mutations:
  - `useAddCart` → adiciona item. Se já existir (mesmo `productId`), incrementa a quantidade via `PATCH`.
  - `useUpdateCart` → atualiza quantidade (`PATCH /cart/:id`). Atualiza cache no `onSuccess` e invalida a lista.
  - `useDeleteCart` → remove item (`DELETE /cart/:id`). Atualiza cache filtrando por `id` e invalida a lista.
- Chaves:
  - `CartQueryKeys.getAll()` e `CartMutationKeys.*` centralizam os keys de cache para consistência.

### Estratégias de cache
- Atualização direta com `queryClient.setQueryData` após sucesso da mutation.
- `queryClient.invalidateQueries` para garantir dados sincronizados com a API.

## Principais componentes/páginas
- `src/pages/App.tsx` → grade de produtos (responsiva).
- `src/components/card-item.tsx` → card do produto com botão “Adicionar produto”.
- `src/pages/Cart.tsx` → carrinho com subtotal, total, e botões de `+/-` e remover.
- `src/components/cart-item-visual.tsx` → componente visual do item no carrinho.
- `src/layout/AppLayout.tsx` → layout base; fundo `bg-indigo-950` cobrindo a tela (`min-h-dvh`).

## Responsividade
- Tailwind CSS com breakpoints em grids e tipografia.
- Ajustes de layout para mobile (containers, header e itens do carrinho).

## Estrutura do projeto
```
src/
  components/
    card-item.tsx
    cart-item-visual.tsx
    header.tsx
    ui/ (Card, Button, etc.)
  context/
    global.tsx (expondo hooks: produtos, carrinho e mutations)
  hooks/
    data/
      products/use-get-products.ts
      cart/use-get-cart.ts
      cart/use-add-cart.ts
      cart/use-update-cart.ts
      cart/use-delete-cart.ts
  keys/
    cart/queries.ts, cart/mutations.ts
    products/queries.ts
  pages/
    App.tsx, Cart.tsx
  services/
    api.ts (Axios)
  types/
    CartResponse.ts, ProductResponse.ts
  data/db.json (API fake)
```

## Comportamentos de negócio
- Adicionar produto:
  - Se o `productId` já existir no carrinho, incrementa `quantity` via `PATCH`.
  - Caso contrário, cria o item via `POST`.
- Atualizar quantidade no carrinho:
  - Botões `+/-` disparam `useUpdateCart`; quantidade mínima é 1.
- Remover item:
  - Botão “Remover” usa `useDeleteCart` e atualiza o cache.

## Sugestões de extensão (para treino)
- Otimistic updates (usar `onMutate`/`onError` para rollback).
- Estados de loading/error por operação e desabilitar botões durante mutation.
- Mensagens de toast diferenciadas para “adicionado” vs “quantidade incrementada”.

## Licença
Projeto para fins educacionais/treino de React Query.
