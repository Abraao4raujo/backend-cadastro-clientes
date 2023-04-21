const usuarios = []

class Pessoa {
  constructor(nome, sobrenome, idade) {
    this.nome = nome || 'Sem nome';
    this.sobrenome = sobrenome || 'Sem sobrenome';
    this.idade = idade || 'Sem idade';
  }
}

function addUser(nome, sobrenome, idade, cb) {
  const fs = require('fs');

  // Ler o arquivo JSON existente
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      throw err;
    }

    let usuarios = [];
    if (!err) {
      // Se o arquivo JSON existe, converte o conteúdo para um array de usuários
      usuarios = JSON.parse(data);
    }

    const pessoa = new Pessoa(nome, sobrenome, idade);
    usuarios.push(pessoa);

    // Escrever o array de usuários atualizado no arquivo JSON
    fs.writeFile('user.json', JSON.stringify(usuarios), (err) => {
      if (err) {
        throw err;
      }
      console.log('usuario adicionado');
      if (typeof cb === 'function') {
        cb(); // Call cb() only if it is a valid function
      }
    });
  });
}
addUser('pedro', 'silva', 31)
