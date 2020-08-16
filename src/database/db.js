// Chama o sqlite-async para ser usado na criação do banco de dados
const Database = require('sqlite-async')


//Criarção da função execute que está sendo chamada logo após a abertura
// ou criação do banco de dados.
function execute(db) {

    // criar as tabelas do banco de dados com seus respectivos valores
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );
        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );
        CREATE TABLE IF NOT EXISTS class_schedule (
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

// Usa o sqlite-async para criar o banco de dados ou abrir,
// passando o diretório mais o nome do arquivo que quer
//que seja criado ou aberto. Logo após ele criar ou abrir,
// executa a função execute
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)