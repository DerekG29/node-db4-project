const defaultConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    }
  }
}

module.exports = {
  devlopment: {
    ...defaultConfig,
    connection: { filename: './data/recipes.db3' }
  }
}