class TodoRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS todo (
      id STRING PRIMARY KEY,
      description STRING ,
      complete BOOLEAN
    )`
    return this.dao.run(sql)
  }

  create(todoItem) {
    const { id, description, complete } = todoItem
    return this.dao.run(
      'INSERT INTO todo (id, description, complete) VALUES (?, ?, ?)',
      [id, description, complete])
  }

  update(todoItem) {
    const { id, description, complete } = todoItem
    return this.dao.run(
      `UPDATE todo SET description = ?, complete = ? WHERE id = ?`,
      [ description, complete, id]
    )
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM todo WHERE id = ?`,
      [id]
    )
  }

  getAll() {
    return this.dao.all(
      `SELECT * FROM todo`)
  }

  dropTable(){
    const sql = `DROP TABLE todo;`
    return this.dao.run(sql)
  }

}

module.exports = TodoRepository;