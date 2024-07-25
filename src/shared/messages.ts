// Com esse objeto, as mensagens ficam centralizadas e torna-se mais fácil possiveis alterações ou até mesmo mudança de idioma.
export const MESSAGE = {
    CATEGORY: {
        NOT_FOUND: 'Categoria não encontrada.',
        CREATE: 'Categoria cadastrada com sucesso.',
        UPDATE: 'Categoria atualizada com sucesso.',
        DELETE: 'Categoria removida com sucesso.',
        NAME_SHOULD_BE_STRING: 'Nome da categoria deve ser uma string.',
        DESCRIPTION_SHOULD_BE_STRING: 'Descrição da categoria deve ser uma string.',
        NAME_SHOULD_NOT_BE_EMPTY: 'Nome da categoria não pode ser vazio.',
        DESCRIPTION_SHOULD_NOT_BE_EMPTY: 'Descrição da categoria não pode ser vazio.',
        NAME_LENGHT: 'Nome da categoria deve ter entre 3 a 50 caracteres.',
        DESCRIPTION_LENGHT: 'Descrição da categoria deve ter entre 3 a 255 caracteres.',
        NAME_ALREADY_EXISTS: 'Já existe uma categoria com esse nome.',
    },
    PRODUCT: {
        NOT_FOUND: 'Prouduto não encontrado.',
        CREATE: 'Prouduto cadastrado com sucesso.',
        UPDATE: 'Prouduto atualizado com sucesso.',
        DELETE: 'Prouduto removido com sucesso.',
        NAME_SHOULD_BE_STRING: 'Nome do produto deve ser uma string.',
        NAME_NOT_EMPTY: 'Nome do produto não pode ser vazio.',
        DESCRIPTION_SHOULD_BE_STRING: 'Descrição do produto deve ser uma string.',
        DESCRIPTION_LENGHT: 'Descrição do produto deve ter entre 3 a 255 caracteres.',
        DESCRIPTION_NOT_EMPTY: 'Descrição do produto não pode ser vazia.',
        PRICE_SHOULD_BE_NUMBER: 'Preço do produto deve ser um número.',
        PRICE_NOT_EMPTY: 'Preço do produto não pode ser vazio.',
        PRICE_NOT_NEGATIVE: 'Preço do produto não pode ser negativo.',
        STOCK_NOT_NEGATIVE: 'Estoque não pode ser negativo.',
        STOCK_SHOULD_BE_NUMBER: 'Estoque do produto deve ser um número.',
        STOCK_NOT_EMPTY: 'Estoque do produto não pode ser vazio.',
        CATEGORY_NOT_EMPTY: 'Categoria não pode ser vazia.',
        CATEGORY_SHOULD_BE_NUMBER: 'ID da categoria deve ser um número',
        CATEGORY_NOT_NEGATIVE: 'ID da categoria inválido.',
        NAME_LENGHT: 'Nome do produto deve ter entre 3 a 255 caracteres.',
    },
    USER: {
        NOT_FOUND: 'Usuário não encontrado.',
        CREATE: 'Usuário cadastrado com sucesso.',
        UPDATE: 'Usuário atualizado com sucesso.',
        DELETE: 'Usuário removido com sucesso.'
    },
    PURCHASE: {
        NOT_FOUND: 'Compra não encontrada.',
        CREATE: 'Compra finalizada com sucesso.',
        UPDATE: 'Compra atualizada com sucesso.',
        DELETE: 'Compra removida com sucesso.'
    },
    HTTP_PARAMS: {
        NOT_FOUND: 'Parâmetros inválidos ou não fornecidos.',
        ID_SHOULD_BE_NUMBER: 'ID deve ser um número.',
        ID_SHOULD_NOT_BE_EMPTY: 'ID não pode ser vazio.',
        ID_SHOULD_BE_POSITIVE: 'ID deve ser um número positivo.',
        NAME_SHOULD_BE_STRING: 'Nome deve ser uma string.',
        NAME_SHOULD_NOT_BE_EMPTY: 'Nome não pode ser vazio.',
        NAME_SHOULD_NOT_BE_TOO_LONG: 'Nome deve ter menos de 50 caracteres.',
        DESCRIPTION_SHOULD_BE_STRING: 'Descrição deve ser uma string.',
        DESCRIPTION_SHOULD_NOT_BE_TOO_LONG: 'Descrição deve ter menos de 255 caracteres.',
        QUANTITY_SHOULD_BE_NUMBER: 'Quantidade deve ser um número.'
    },
    SERVER: {
        ERROR: 'Ocorreu um erro no servidor.',
        UNAUTHORIZED: 'Não autorizado.',
        FORBIDDEN: 'Você não tem permissão para realizar esta ação.',
        NOT_FOUND: 'Recurso não encontrado.',
        INTERNAL_SERVER_ERROR: 'Erro interno do servidor. Cheque os logs!',
        OK: 'Sucesso.'
    }

}