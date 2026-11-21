const messages = {
  NETWORK_ERROR: 'Não foi possível conectar ao servidor.',
  EMAIL_ALREADY_IN_USE: 'Este e-mail já está sendo utilizado por outra conta.',
  INVALID_EMAIL: 'O formato do e-mail informado é inválido.',
  WEAK_PASSWORD: 'A senha é muito fraca. Use pelo menos 6 caracteres.',
  DUPLICATE_CPF_OR_EMAIL: 'Este CPF ou e-mail já está cadastrado no sistema.',
  CLIENT_NOT_FOUND: 'Cliente não encontrado.',
  DUPLICATE_PATRIMONY: 'Já existe um equipamento com esse patrimônio.',
  DUPLICATE_LOCATION: 'Já existe um local com essa descrição.',
  DUPLICATE_RECORD: 'Este registro já está cadastrado.',
  EMAIL_ALREADY_IN_USE: 'Este e-mail já está cadastrado.',
  RECORD_NOT_FOUND: 'Registro não encontrado.',
  RECORD_IN_USE: 'Este registro está em uso e não pode ser removido.',
  DUPLICATE_CEP: 'Já existe um local cadastrado com esse CEP.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/invalid-email': 'O formato do e-mail informado é inválido.',
  'auth/missing-password': 'Informe a sua senha.',
  'auth/user-disabled': 'Esta conta foi desativada.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde um pouco e tente novamente.',
  'auth/network-request-failed': 'Falha de conexão. Verifique sua internet.',
  'auth/user-not-found': 'Não encontramos uma conta com esse e-mail.',
  'auth/missing-email': 'Informe o seu e-mail.',
  'auth/user-token-expired': 'Sua sessão expirou. Faça login novamente.',
  'auth/requires-recent-login': 'Por segurança, faça login novamente para continuar.',
  'UNKNOWN_ERROR': 'Ocorreu um erro inesperado. Tente novamente.',
};

const DEFAULT_MESSAGE = 'Ocorreu um erro inesperado. Tente novamente.';

export function getFriendlyErrorMessage(code) {
  return messages[code] || DEFAULT_MESSAGE;
} 
